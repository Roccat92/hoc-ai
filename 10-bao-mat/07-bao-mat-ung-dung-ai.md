# Bảo mật ứng dụng AI: prompt injection, tool và dữ liệu


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người đã có chatbot RAG hoặc agent và muốn public mà không biến model thành một cửa hậu. Học xong bạn sẽ nhận diện prompt injection, giới hạn tool, bảo vệ dữ liệu theo người dùng và kiểm tra output trước khi lưu hoặc hành động.

## Tài liệu truy hồi không phải lệnh

File người dùng tải lên, trang web và kết quả search đều là dữ liệu không tin cậy. Chúng có thể chứa câu yêu cầu bỏ qua quy tắc, tiết lộ secret hoặc gọi tool. Tách instruction hệ thống khỏi dữ liệu, không cho tài liệu truy hồi quyền thay đổi chính sách agent.

## Tool phải có quyền tối thiểu

- Tách tool đọc khỏi tool ghi/xóa.
- Kiểm tra user/tenant ở server, không tin id do model gửi.
- Validate schema, giới hạn giá trị và timeout.
- Bắt buộc xác nhận người dùng cho thanh toán, gửi mail, xóa hoặc deploy.
- Đặt giới hạn số bước và ngân sách.

## Output cũng không đáng tin tuyệt đối

Validate JSON/schema trước khi dùng. Escape HTML khi hiển thị, không đưa SQL hoặc shell command từ model chạy thẳng. Nếu model trả nội dung không hợp lệ, trả lỗi có kiểm soát hoặc chuyển người thật.

## Dữ liệu và log

Tối thiểu hóa dữ liệu gửi tới model, lọc PII, tách tenant, mã hóa secret và đặt thời gian lưu. Log request id, tool, latency và trạng thái; không log API key, cookie hoặc toàn bộ tài liệu riêng tư.

## Bài tập red-team nhỏ

Tạo 10 input độc: “bỏ qua quy tắc”, yêu cầu xem dữ liệu tenant khác, tool parameter cực lớn, HTML/script và câu hỏi thiếu quyền. Ghi kết quả mong đợi: từ chối, hỏi lại, hoặc chuyển người.

## Checklist đạt bài

- [ ] Tài liệu truy hồi được coi là dữ liệu không tin cậy.
- [ ] Tool có allowlist và kiểm tra quyền ở server.
- [ ] Hành động lớn cần xác nhận người.
- [ ] Output được validate/escape trước khi dùng.
- [ ] Log và dữ liệu lưu không chứa secret/PII thừa.

Kết hợp bài này với checklist ở [bài 1 của phần này](01-checklist-truoc-khi-public.md), rồi ghi các test độc ở trên vào eval của ứng dụng AI.

## Bước tiếp theo

Sản phẩm đã bảo mật cơ bản - giờ là những chuyện thực tế khi đưa nó ra thị trường thật ở Việt Nam: [Đăng nhập bằng Google, Apple, OTP email và Zalo →](../11-ra-thi-truong/01-dang-nhap-google-apple-otp.md)
