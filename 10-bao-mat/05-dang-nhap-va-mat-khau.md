# Đăng nhập và mật khẩu: đừng tự chế, dùng thư viện/dịch vụ chuẩn

Bài này dành cho người sắp thêm chức năng đăng nhập vào sản phẩm của mình. Học xong bạn sẽ biết vì sao tuyệt đối không nên tự viết cơ chế mã hóa mật khẩu từ đầu, và có phương án thay thế phù hợp với người mới.

## Vì sao không tự chế

Đây là một trong số ít quy tắc bảo mật mà giới chuyên môn đồng thuận gần như tuyệt đối: **không tự viết hàm mã hóa/lưu mật khẩu của riêng bạn**, kể cả khi bạn thấy mình "hiểu" mã hóa là gì. Vài lý do:

- **Không bao giờ được lưu mật khẩu dạng plaintext** (chữ thường, đọc được trực tiếp) trong database - nếu database bị lộ (rất nhiều vụ rò rỉ dữ liệu thật đã xảy ra vì lý do này), toàn bộ mật khẩu người dùng lộ theo, và vì nhiều người **dùng lại cùng một mật khẩu ở nhiều nơi**, hậu quả lan sang cả các tài khoản khác của họ (email, ngân hàng...) - không chỉ sản phẩm của bạn.
- Mã hóa mật khẩu đúng cách (hashing với "salt" - một chuỗi ngẫu nhiên trộn thêm để chống các kiểu tấn công đã biết trước bảng tra cứu) là lĩnh vực có rất nhiều chi tiết dễ sai mà người không chuyên khó lường hết, trong khi các thư viện/dịch vụ chuẩn đã được hàng nghìn chuyên gia rà soát qua nhiều năm.

## Lựa chọn 1: dùng thư viện chuẩn nếu tự viết backend

Nếu bạn tự viết backend (Node.js, Python...), dùng thư viện mã hóa mật khẩu đã được kiểm chứng rộng rãi - phổ biến nhất là **bcrypt** hoặc **argon2** - thay vì tự viết. Việc của bạn là gọi đúng hàm có sẵn, không phải tự thiết kế thuật toán:

```
Nhờ Claude Code: "thêm chức năng đăng ký/đăng nhập cho backend Node.js
của tôi, dùng thư viện bcrypt để mã hóa mật khẩu, không tự viết hàm
mã hóa riêng."
```

## Lựa chọn 2 (khuyên dùng với người mới): dịch vụ đăng nhập có sẵn

Nhanh hơn, an toàn hơn cho người chưa có nhiều kinh nghiệm backend - các dịch vụ này lo toàn bộ phần đăng nhập/mật khẩu (kể cả đăng nhập qua Google/Facebook, xác thực 2 lớp, quên mật khẩu...) để bạn không phải tự xử lý phần nhạy cảm nhất:

| Dịch vụ | Đặc điểm | Free tier |
|---|---|---|
| **Clerk** | Giao diện đăng nhập dựng sẵn đẹp, tích hợp nhanh với React/Next.js | Có gói miễn phí cho dự án nhỏ, giới hạn theo số người dùng hoạt động hàng tháng |
| **Supabase Auth** | Đi kèm luôn database (Postgres) nếu bạn cũng cần lưu dữ liệu khác | Có gói miễn phí khá hào phóng, phù hợp dự án cá nhân |
| **Firebase Auth** | Của Google, tích hợp tốt nếu sản phẩm đã dùng hệ sinh thái Firebase | Có gói miễn phí cho lượng người dùng nhỏ-vừa |

> Hạn mức free tier cụ thể (số người dùng, số lượt xác thực) thay đổi theo thời gian - kiểm tra trang giá chính thức của từng dịch vụ để có số mới nhất trước khi chọn.

**Gợi ý:** nếu dự án của bạn cũng cần một database nói chung (không chỉ đăng nhập), Supabase Auth đáng cân nhắc trước vì đi kèm sẵn database. Nếu chỉ cần đăng nhập nhanh gọn cho một dự án React/Next.js, Clerk có trải nghiệm tích hợp mượt nhất.

## Việc bạn vẫn nên tự làm dù dùng dịch vụ có sẵn

- **Giới hạn số lần đăng nhập sai** (đã nhắc ở checklist) - hầu hết các dịch vụ trên đã có sẵn cơ chế này, kiểm tra tài liệu để bật/cấu hình đúng, tránh bị dò mật khẩu hàng loạt (brute-force).
- **Không tự ý lộ thông tin qua thông báo lỗi** - ví dụ khi đăng nhập sai, đừng hiện "Email này không tồn tại" (giúp kẻ xấu dò ra email nào đã đăng ký) - nên hiện chung chung "Email hoặc mật khẩu không đúng".

## Bước tiếp theo

Đã xong 5 hạng mục thực hành trong checklist, bài cuối cùng nói về giới hạn của việc tự làm bảo mật một mình - và cách dùng AI hỗ trợ rà soát: [Nhờ AI rà soát bảo mật](06-nho-ai-ra-soat-bao-mat.md)
