# Gọi API Claude/OpenAI/Gemini bằng code, tính chi phí token

Bài này dành cho người đã build xong dự án web đầu tiên (chạy hoàn toàn trên trình duyệt) và muốn học bước tiếp theo: cho code của mình **tự gọi tới AI** để xử lý gì đó (trả lời câu hỏi, tóm tắt văn bản, phân loại nội dung...) thay vì bạn tự chat thủ công trên claude.ai. Học xong bạn sẽ tự gọi được API LLM bằng code, và tính được chi phí thực tế theo token.

## Vì sao cần gọi API thay vì chỉ dùng chatbot?

Chatbot (claude.ai, chatgpt.com) là giao diện **dành cho người dùng cuối trò chuyện trực tiếp**. Còn khi bạn muốn AI trở thành **một phần của sản phẩm** — ví dụ website tự động trả lời câu hỏi khách hàng, app tự tóm tắt tài liệu người dùng tải lên — bạn cần code của bạn tự gửi yêu cầu tới AI và nhận kết quả về, xử lý tiếp trong luồng chương trình. Đó là lúc cần **API**.

## Bước 1: Lấy API key

Mỗi hãng có trang quản lý API riêng — tạo tài khoản (nếu chưa có), vào mục API keys, tạo key mới:

| Hãng | Nơi lấy API key |
|---|---|
| Anthropic (Claude) | console.anthropic.com |
| OpenAI (GPT) | platform.openai.com |
| Google (Gemini) | aistudio.google.com |

Mỗi hãng thường yêu cầu **nạp một khoản tín dụng tối thiểu** hoặc liên kết phương thức thanh toán trước khi API key hoạt động thật (khác với gói thuê bao chat — đây là mô hình trả theo lượng dùng). Kiểm tra hướng dẫn cụ thể trên từng trang tại thời điểm bạn đăng ký.

**Tuyệt đối không chia sẻ API key công khai** — key này gắn với tài khoản thanh toán của bạn, ai có key đều gọi được API và tính phí vào tài khoản bạn.

## Bước 2: Lưu API key an toàn

Không bao giờ gõ thẳng API key vào code. Tạo file `.env` ở thư mục gốc dự án:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

Và đảm bảo file `.env` đã nằm trong `.gitignore` (xem lại [bài Git/GitHub](../02-code-voi-ai/05-git-github-co-ban.md)) — tuyệt đối không đẩy file này lên GitHub.

## Bước 3: Gọi API bằng code

Cách nhanh nhất: mở Claude Code, mô tả yêu cầu bằng tiếng Việt, ví dụ:

```
Viết cho tôi một file Python nhỏ gọi API Claude, đọc API key từ file .env
(dùng thư viện python-dotenv), gửi câu hỏi "Việt Nam có bao nhiêu tỉnh thành?"
và in ra câu trả lời.
```

Để hình dung cấu trúc code trông như thế nào (không cần tự gõ, chỉ để hiểu), ví dụ minh họa bằng Python với SDK chính thức của Anthropic:

```python
import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()  # đọc file .env vào biến môi trường
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

response = client.messages.create(
    model="claude-sonnet-4-5",   # tên model — kiểm tra tên mới nhất trên docs.anthropic.com
    max_tokens=1024,
    messages=[{"role": "user", "content": "Việt Nam có bao nhiêu tỉnh thành?"}]
)

print(response.content[0].text)
```

- `load_dotenv()`: đọc các biến trong file `.env` để dùng trong code.
- `Anthropic(api_key=...)`: khởi tạo kết nối tới API bằng key của bạn.
- `client.messages.create(...)`: gửi yêu cầu — `model` chọn phiên bản model, `max_tokens` giới hạn độ dài tối đa câu trả lời, `messages` chứa nội dung hội thoại.
- `response.content[0].text`: lấy phần văn bản trả lời ra để in.

> **Tên model cụ thể thay đổi theo thời gian** khi các hãng ra bản mới — luôn kiểm tra tên model mới nhất tại docs.anthropic.com (hoặc platform.openai.com/docs, ai.google.dev/docs tương ứng) thay vì chép nguyên tên trong bài viết bất kỳ.

## Cách tính chi phí theo token

Nhắc lại từ [bài LLM là gì](../00-ban-do-gioi-ai/02-llm-la-gi.md): giá API được tính theo **số token**, thường tách riêng giá cho token đầu vào (input — gồm câu hỏi của bạn, system prompt, lịch sử hội thoại) và token đầu ra (output — câu trả lời AI tạo ra), với **giá output thường cao hơn giá input** ở hầu hết các hãng.

**Công thức chung:**
```
Chi phí = (số token input × giá input mỗi token) + (số token output × giá output mỗi token)
```

Ví dụ minh họa cách tính (dùng số giả định để hiểu công thức, không phải giá thật):
- Input: 500 token, Output: 300 token
- Nếu giá input là X đồng/1000 token và giá output là Y đồng/1000 token
- Chi phí = (500/1000 × X) + (300/1000 × Y)

<iframe src="/minh-hoa/token-chi-phi.html" title="Minh họa tương tác: Token và chi phí API" loading="lazy" style="width:100%; height:420px; border:1px solid var(--vp-c-divider); border-radius:8px;"></iframe>

**Giá thật của từng model thay đổi thường xuyên** — luôn tra trực tiếp trang pricing chính thức của hãng (đã liệt kê ở [`00-ban-do-gioi-ai/03-cac-cong-ty-va-model.md`](../00-ban-do-gioi-ai/03-cac-cong-ty-va-model.md)) để tính chi phí thật cho dự án của bạn, đừng dựa vào con số cố định trong bài viết bất kỳ.

**Mẹo kiểm soát chi phí:**
- Luôn đặt `max_tokens` hợp lý — đừng để mặc định quá cao nếu câu trả lời của bạn thực sự chỉ cần ngắn.
- Với các tác vụ đơn giản, cân nhắc dùng model "hạng nhẹ" (mini/flash/haiku-tier) của hãng — rẻ hơn model đầu bảng đáng kể mà vẫn đủ dùng.
- Theo dõi usage/billing dashboard của hãng thường xuyên khi mới bắt đầu, để không bị bất ngờ.

## Bước tiếp theo

Gọi API đơn lẻ chỉ là bước đầu — giờ học cách cho AI "đọc" tài liệu riêng của bạn để trả lời chính xác hơn: [RAG là gì và cách build](02-rag-la-gi-va-build.md)
