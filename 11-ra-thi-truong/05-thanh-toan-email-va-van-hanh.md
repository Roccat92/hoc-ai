# Thanh toán, email và vận hành sau ra mắt

Bài này dành cho người muốn thu tiền hoặc duy trì sản phẩm sau bản demo. Học xong bạn sẽ hiểu sandbox, webhook, hoàn tiền, email giao dịch và checklist vận hành cơ bản ở Việt Nam.

## Đừng tự xử lý dữ liệu thẻ

Ưu tiên cổng thanh toán hoặc chuyển khoản QR có tài liệu chính thức. Ứng dụng chỉ lưu mã giao dịch và trạng thái, không lưu số thẻ/CVV. Dùng sandbox để thử success, fail, timeout, thanh toán trùng và hoàn tiền.

Webhook phải xác thực chữ ký, xử lý lặp an toàn và ghi idempotency key. Không cấp quyền sử dụng dịch vụ chỉ vì trình duyệt báo “thanh toán thành công”.

Vì sao: trình duyệt của khách có thể bị làm giả trang “thành công”, nhưng **webhook đi thẳng từ cổng thanh toán tới server** của bạn và được ký bằng một secret chỉ hai bên biết. Đây là nguồn sự thật, không phải màn hình khách thấy.

```python
import hmac, hashlib

def chu_ky_hop_le(body_thô: bytes, chu_ky_nhan_duoc: str, secret: str) -> bool:
    # Tự tính lại chữ ký từ nội dung thô và secret, rồi so khớp
    chu_ky_dung = hmac.new(secret.encode(), body_thô, hashlib.sha256).hexdigest()
    return hmac.compare_digest(chu_ky_dung, chu_ky_nhan_duoc)

# Trong handler webhook:
if not chu_ky_hop_le(request.body, request.headers[“X-Signature”], WEBHOOK_SECRET):
    return 400  # chữ ký sai -> có thể là giả mạo, từ chối ngay
```
- Tính chữ ký trên **body thô** (bytes gốc), không phải bản đã parse JSON - parse rồi tính lại thường ra chuỗi khác, làm chữ ký luôn sai.
- `hmac.compare_digest`: so sánh an toàn, chống dò từng ký tự theo thời gian phản hồi.
- `WEBHOOK_SECRET` để trong biến môi trường, xem [giấu API key](../10-bao-mat/03-giau-api-key-va-secret.md). Mỗi cổng có tên header và cách ký **riêng** - lấy đúng thuật toán từ tài liệu cổng bạn dùng, đoạn trên là khung chung.

Chống xử lý trùng (idempotency): cổng có thể gửi cùng một webhook nhiều lần. Ghi lại id giao dịch đã xử lý, gặp lại thì bỏ qua:

```python
def xu_ly_thanh_toan(su_kien):
    if da_xu_ly(su_kien[“id”]):     # đã ghi nhận id này rồi
        return 200                  # trả OK nhưng không làm gì thêm
    danh_dau_da_xu_ly(su_kien[“id”])
    cap_quyen_cho_don(su_kien[“ma_don”])
```
- Không có bước này, một webhook gửi hai lần có thể cộng tiền hai lần hoặc mở khóa hai lần.

## Email giao dịch

Tách email giao dịch khỏi email marketing. Ghi rõ người gửi, nội dung, link hỗ trợ và cách hủy. Dùng biến môi trường cho SMTP/API key, giới hạn tốc độ và theo dõi tỷ lệ gửi lỗi. Khi gửi từ domain riêng, đọc hướng dẫn SPF/DKIM/DMARC của nhà cung cấp.

## Runbook sau ra mắt

- Ai nhận cảnh báo và trong bao lâu?
- Nếu thanh toán thành công nhưng webhook chậm thì làm gì?
- Nếu database mất dữ liệu thì khôi phục bản nào?
- Nếu lộ key thì thu hồi ở đâu?
- Nếu cần rollback thì phiên bản nào an toàn?

Chi phí cổng thanh toán, email, domain và hosting thay đổi theo nhà cung cấp; dùng free tier/sandbox trước, ghi ước tính VND và kiểm tra trang giá chính thức trước khi chọn.

## Bài tập

Viết runbook một trang cho dự án có form liên hệ: email lỗi, spam tăng, webhook trùng, domain hết hạn và backup không khôi phục được. Chạy thử ít nhất một kịch bản trên staging.

## Checklist đạt bài

- [ ] Dùng sandbox và không lưu dữ liệu thẻ.
- [ ] Webhook xác thực và idempotent.
- [ ] Email giao dịch có kênh gửi và log lỗi.
- [ ] Có runbook rollback, lộ key và khôi phục dữ liệu.
- [ ] Chi phí được kiểm tra theo trang chính thức.

## Bước tiếp theo

Ghi chi phí và bài học vào [case study](../07-case-study/), để người học sau thấy cả phần vận hành chứ không chỉ ảnh demo.
