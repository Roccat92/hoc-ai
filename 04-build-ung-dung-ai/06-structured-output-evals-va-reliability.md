# Structured output, function calling và reliability

Bài này dành cho người đã gọi được API ở [bài trước](01-goi-api-llm.md) và muốn kết quả đủ ổn định để app xử lý tiếp, không phải đọc bằng mắt rồi copy tay. Học xong bạn sẽ tự viết được code lấy JSON có cấu trúc từ model, thiết kế một function tool an toàn, và thêm timeout/retry để app không sập khi API chập chờn.

## Đừng parse văn bản tự do khi dữ liệu quan trọng

Nếu app cần `category`, `confidence` và `reason`, đừng yêu cầu model "trả JSON cho đẹp" trong một câu trả lời dạng văn bản rồi tự tách chuỗi bằng tay - model thỉnh thoảng thêm giải thích thừa, đổi định dạng, hoặc quên dấu ngoặc, và code tách chuỗi tay sẽ vỡ ngay khi gặp trường hợp đó. Dùng **tool use** (cách SDK của Anthropic gọi tính năng structured output) để ép model trả đúng hình dạng dữ liệu bạn khai báo trước:

```python
import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

phan_loai_tool = {
    "name": "phan_loai_yeu_cau",
    "description": "Phân loại một yêu cầu của khách hàng",
    "input_schema": {
        "type": "object",
        "properties": {
            "category": {"type": "string", "enum": ["doi_tra", "hoi_gia", "khieu_nai", "khac"]},
            "confidence": {"type": "number", "description": "Độ tin cậy từ 0 đến 1"},
            "reason": {"type": "string", "description": "Lý do ngắn gọn"}
        },
        "required": ["category", "confidence", "reason"]
    }
}

response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=1024,
    tools=[phan_loai_tool],
    tool_choice={"type": "tool", "name": "phan_loai_yeu_cau"},
    messages=[{"role": "user", "content": "Tôi mua áo size M nhưng bị lỗi chỉ may, muốn đổi cái khác"}]
)

ket_qua = response.content[0].input
print(ket_qua)  # {'category': 'doi_tra', 'confidence': 0.92, 'reason': '...'}
```

- `input_schema`: khai báo trước đúng các trường bạn cần và kiểu dữ liệu của chúng - model bị ràng buộc phải trả đúng hình dạng này.
- `tool_choice={"type": "tool", "name": "..."}`: bắt buộc model dùng đúng tool này, không để nó tự quyết định trả lời tự do.
- `response.content[0].input`: chỗ chứa dữ liệu có cấu trúc model trả về - đã là dict Python, không cần tự tách chuỗi.

Tên tham số chính xác có thể đổi nhỏ theo phiên bản SDK - luôn đối chiếu với [tài liệu Anthropic mới nhất](https://developers.anthropic.com) khi code không chạy như ví dụ. Và nhớ: schema không làm model đúng tuyệt đối, nó chỉ đảm bảo *hình dạng* dữ liệu kiểm tra được - vẫn phải validate giá trị bên dưới (`confidence` có nằm trong 0-1 không, `category` có đúng một trong bốn giá trị cho phép không).

## Function calling là đề xuất, không phải quyền

Model có thể "đề xuất" gọi `tra_cuu_don_hang`, nhưng **server mới là nơi quyết định có thực thi hay không**. Một tool đọc dữ liệu an toàn cần kiểm tra ở phía server, không tin bất cứ gì model tự gửi kèm:

```python
def tra_cuu_don_hang(don_hang_id: str, nguoi_dung_hien_tai: str) -> dict:
    don = database.lay_don_hang(don_hang_id)
    if don is None:
        return {"loi": "khong_tim_thay"}
    if don["chu_don"] != nguoi_dung_hien_tai:
        return {"loi": "khong_co_quyen"}  # chặn dù model "quên" không hỏi quyền
    return {"trang_thai": don["trang_thai"], "ngay_giao": don["ngay_giao"]}
```

`nguoi_dung_hien_tai` phải lấy từ phiên đăng nhập thật (session/token đã xác thực ở server), **không bao giờ** lấy từ tham số model tự điền - nếu không, ai đó chỉ cần khéo léo yêu cầu chatbot "tra đơn của user khác" là xem được dữ liệu không phải của mình. Tool mô tả rõ khi nào dùng, side effect gì (đọc/ghi/xóa) và lỗi nào có thể trả, để model biết dừng khi gặp lỗi thay vì tự bịa kết quả.

## Reliability tối thiểu

- **Timeout** cho request tới model và tool - đừng để một request treo vô thời hạn làm nghẽn cả luồng xử lý.
- **Retry có giới hạn và backoff** - thử lại khi lỗi tạm thời, nhưng dừng sau vài lần, mỗi lần chờ lâu hơn:

```python
import time

def goi_co_retry(ham_goi_api, so_lan_toi_da=3):
    for lan in range(so_lan_toi_da):
        try:
            return ham_goi_api()
        except Exception as loi:
            if lan == so_lan_toi_da - 1:
                raise  # đã thử hết số lần cho phép, báo lỗi thật cho tầng trên xử lý
            cho = 2 ** lan  # backoff theo cấp số nhân: 1s, 2s, 4s...
            time.sleep(cho)
```

- **Idempotency** cho thao tác tạo, thanh toán hoặc gửi mail - nếu retry vô tình gọi hai lần, không được tạo hai đơn hàng hay gửi hai email giống nhau (thường làm bằng cách gửi kèm một mã "idempotency key" duy nhất cho mỗi lần thử gốc).
- **Fallback** sang model rẻ hơn hoặc luồng thủ công khi lỗi tạm thời kéo dài, thay vì để người dùng thấy trang trắng.
- **Log** request id, latency, token/cost và trạng thái; không log secret hay nội dung riêng tư (xem lại [log, monitoring](../03-ha-tang-thuc-chien/08-log-monitoring-va-chi-phi.md)).

## Bài tập

Sửa chatbot phân loại đơn hàng của bạn (hoặc viết mới, dựa trên ví dụ ở trên) để trả schema gồm `category`, `confidence` và `reason`. Với `confidence` dưới 0.6, trả trạng thái "cần người xem" thay vì tự động xử lý tiếp. Viết tool giả `tra_cuu_don_hang` chỉ đọc theo đúng mẫu ở trên, tự kiểm tra: gọi thử với `nguoi_dung_hien_tai` không khớp chủ đơn, xác nhận bị chặn đúng như thiết kế.

## Checklist đạt bài

- [ ] Output quan trọng lấy qua structured output/tool use, không parse chuỗi tay.
- [ ] Đã validate lại giá trị (không chỉ hình dạng) ở phía server.
- [ ] Tool kiểm tra quyền bằng dữ liệu phiên đăng nhập thật, không tin tham số model tự điền.
- [ ] Có retry giới hạn kèm backoff, không retry vô hạn.
- [ ] Log đủ để chẩn đoán nhưng không lộ dữ liệu nhạy cảm.

## Bước tiếp theo

Đầu ra đã có hình dạng và đường lỗi, giờ đo chất lượng bằng bộ ví dụ cố định: [Evals và prompt versioning →](07-evals-va-prompt-versioning.md)
