# Thanh toán, email và vận hành sau ra mắt


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người muốn thu tiền hoặc duy trì sản phẩm sau bản demo. Học xong bạn sẽ hiểu sandbox, webhook, hoàn tiền, email giao dịch và checklist vận hành cơ bản ở Việt Nam.

## Đừng tự xử lý dữ liệu thẻ

Ưu tiên cổng thanh toán hoặc chuyển khoản QR có tài liệu chính thức. Ứng dụng chỉ lưu mã giao dịch và trạng thái, không lưu số thẻ/CVV. Dùng sandbox để thử success, fail, timeout, thanh toán trùng và hoàn tiền.

Webhook phải xác thực chữ ký, xử lý lặp an toàn và ghi idempotency key. Không cấp quyền sử dụng dịch vụ chỉ vì trình duyệt báo “thanh toán thành công”.

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

Ghi chi phí và bài học vào [case study](../07-case-study/README.md), để người học sau thấy cả phần vận hành chứ không chỉ ảnh demo.
