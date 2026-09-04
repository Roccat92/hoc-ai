# Nhờ AI rà soát bảo mật trước khi deploy

Bài cuối cùng của phần bảo mật, dành cho người đã đi qua 5 hạng mục checklist và muốn có thêm một lớp kiểm tra trước khi chính thức public. Học xong bạn sẽ biết cách nhờ Claude Code tự audit bảo mật dự án, và quan trọng không kém - biết rõ giới hạn của việc này.

## Prompt mẫu: nhờ Claude Code tự audit

Trước khi deploy phiên bản public đầu tiên (hoặc bất kỳ lúc nào định kỳ sau đó), thử prompt:

```
Rà soát bảo mật toàn bộ dự án này trước khi tôi deploy công khai. Kiểm tra:
1. Có API key, mật khẩu, hay secret nào bị hardcode trong code không (thay vì
   đọc từ biến môi trường)?
2. Các form/API endpoint nhận input từ người dùng có validate/làm sạch dữ liệu
   đầu vào chưa (chống SQL injection, XSS)?
3. File .gitignore đã chặn đúng các file nhạy cảm (.env, file cấu hình có
   secret) chưa?
4. Có endpoint nào lẽ ra cần xác thực đăng nhập nhưng đang để mở công khai không?
5. Các thư viện/dependency đang dùng có phiên bản nào được biết là có lỗ hổng
   bảo mật đã công bố không?

Liệt kê từng vấn đề tìm thấy, mức độ nghiêm trọng, và cách sửa.
```

Nếu bạn dùng Claude Code, cũng có thể thử lệnh có sẵn `/security-review` (nếu phiên bản bạn đang dùng hỗ trợ) - chạy một lượt rà soát bảo mật theo quy trình dựng sẵn cho các thay đổi trong nhánh code hiện tại, nhanh hơn tự viết prompt từ đầu.

## AI rà được gì, và không rà được gì

**AI làm tốt việc phát hiện:**
- Các lỗi phổ biến, có khuôn mẫu rõ ràng: secret hardcode, thiếu validate input cơ bản, thiếu `.gitignore` cho file nhạy cảm, cấu hình CORS quá lỏng lẻo, dependency có lỗ hổng đã được công khai biết tới.
- Các lỗi mà bản thân nó (hoặc các phiên bản AI khác) đã từng viết ra trong chính dự án - tự rà lại code do AI viết là một cách kiểm tra chéo hữu ích.

**AI có giới hạn với:**
- **Lỗ hổng logic nghiệp vụ đặc thù** - ví dụ một quy trình thanh toán có kẽ hở cho phép đặt hàng với giá 0 đồng trong một tình huống cụ thể của riêng sản phẩm bạn - loại lỗi này cần hiểu sâu nghiệp vụ, không phải mẫu lỗi phổ biến AI đã "thấy" nhiều lần.
- **Lỗ hổng mới, chưa được biết rộng rãi** (zero-day) - AI dựa trên kiến thức đã học, không thể phát hiện những gì chưa từng được ghi nhận ở đâu.
- **Đánh giá tổng thể kiến trúc bảo mật** ở mức hệ thống lớn, nhiều thành phần tương tác phức tạp - cần kinh nghiệm và bối cảnh rộng hơn những gì nằm gọn trong một lần rà soát.

## Khi nào cần người có chuyên môn, không chỉ dừng ở AI

Rà soát bằng AI + checklist trong phần này là mức **"đủ an toàn để public"** cho dự án cá nhân, dự án nhỏ, không xử lý tiền thật hay dữ liệu đặc biệt nhạy cảm. Nhưng nếu sản phẩm của bạn:
- **Xử lý thanh toán/tiền thật** trực tiếp (không qua cổng thanh toán bên thứ ba đã được chứng nhận như Stripe, VNPay...).
- **Lưu trữ dữ liệu nhạy cảm** - y tế, tài chính cá nhân, thông tin định danh (CMND/CCCD, số tài khoản ngân hàng).
- **Có lượng người dùng lớn**, việc rò rỉ dữ liệu ảnh hưởng tới nhiều người.

→ Hãy tìm một người có chuyên môn bảo mật (freelancer chuyên security audit, hoặc dịch vụ pentest) để review thêm trước khi ra mắt chính thức. Chi phí thuê audit chuyên nghiệp không nhỏ, nhưng vẫn rẻ hơn nhiều so với hậu quả của một vụ rò rỉ dữ liệu thật.

## Tổng kết phần 10

Sáu bài trong phần này ([1](01-checklist-truoc-khi-public.md) đến bài này) cho bạn một checklist thực dụng - không phải để biến bạn thành chuyên gia bảo mật, mà để tránh những lỗi phổ biến nhất khiến sản phẩm của người mới dễ bị tấn công nhất. Áp dụng đều đặn trước mỗi lần public sản phẩm mới, và đừng ngại nhờ AI kiểm tra lại - hỏi thêm một lần không bao giờ thừa.
