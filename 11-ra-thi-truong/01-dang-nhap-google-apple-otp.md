# Đăng nhập bằng Google, Apple, OTP email và Zalo

Bài này dành cho người sắp cho người dùng thật đăng nhập vào sản phẩm và muốn dùng các cách đăng nhập quen thuộc (bấm "Đăng nhập bằng Google", nhận mã OTP...) thay vì bắt người dùng tự tạo mật khẩu mới. Học xong bạn sẽ biết các lựa chọn đăng nhập phổ biến, cách bật nhanh, và những rào cản thực tế của từng cách - đặc biệt là chuyện Zalo OTP ở Việt Nam tốn tiền và phải chờ duyệt mà ít ai nói trước.

Bài này nối tiếp [`10-bao-mat/05-dang-nhap-va-mat-khau.md`](../10-bao-mat/05-dang-nhap-va-mat-khau.md) - nếu chưa đọc, xem qua trước để hiểu vì sao không nên tự chế phần đăng nhập.

## Vì sao dùng đăng nhập của bên thứ ba?

Cho người dùng đăng nhập bằng tài khoản có sẵn (Google, Apple) hoặc bằng mã OTP có mấy cái lợi:
- **Người dùng đỡ ngại**: không phải nghĩ thêm một mật khẩu mới, bấm một nút là xong - tỷ lệ đăng ký thành công cao hơn.
- **Bạn đỡ rủi ro**: không phải tự lưu và bảo vệ mật khẩu người dùng (phần dễ sai và nguy hiểm nhất - xem lại [bài đăng nhập & mật khẩu](../10-bao-mat/05-dang-nhap-va-mat-khau.md)).
- **Tin cậy hơn**: người dùng tin "Đăng nhập bằng Google" hơn là gõ mật khẩu vào một web lạ.

**Cách nhanh nhất cho người mới:** các dịch vụ đăng nhập có sẵn như **Clerk, Supabase Auth, Firebase Auth** (đã giới thiệu ở [bài đăng nhập & mật khẩu](../10-bao-mat/05-dang-nhap-va-mat-khau.md)) đều bật Google/Apple/OTP email chỉ với vài cú click cấu hình - không phải tự tích hợp từng cái. Chỉ khi cần kênh đặc thù (như Zalo) mới phải tự làm nhiều hơn.

## Đăng nhập bằng Google

Đây là cách phổ biến và dễ nhất. Về kỹ thuật nó dùng chuẩn **OAuth** (một giao thức cho phép một ứng dụng xin phép truy cập tài khoản của bạn ở dịch vụ khác mà không cần biết mật khẩu). Các bước chung:
1. Vào **Google Cloud Console**, tạo một "OAuth credential" cho ứng dụng của bạn (lấy được Client ID và Client Secret).
2. Nếu app công khai cho nhiều người dùng, Google có thể yêu cầu **xác minh ứng dụng** (verification) - khai báo trang chính sách bảo mật, phạm vi dữ liệu xin truy cập.
3. Gắn Client ID/Secret vào dịch vụ auth (Clerk/Supabase/Firebase) hoặc code của bạn.

Nhờ Claude Code làm giúp phần tích hợp: "hướng dẫn tôi bật đăng nhập Google cho dự án dùng [Supabase/Clerk/...], tôi đã có Client ID và Secret."

## Đăng nhập bằng Apple ("Sign in with Apple")

Tương tự Google về ý tưởng, nhưng có **một lưu ý bắt buộc quan trọng**: nếu app của bạn **lên App Store và đã có đăng nhập bằng mạng xã hội khác** (Google, Facebook...), Apple **bắt buộc** bạn phải có thêm "Sign in with Apple" - đây là quy định trong nguyên tắc duyệt app của Apple, thiếu là bị từ chối. Để dùng Apple Sign In cần có **tài khoản Apple Developer** (xem [bài đưa app lên store](02-dua-app-len-store.md)).

Nếu app chỉ chạy trên web (không lên App Store), bạn không bắt buộc phải có Apple Sign In - nhưng thêm vào cũng tốt cho người dùng iPhone.

## OTP qua email

OTP (One-Time Password - mã dùng một lần) qua email: người dùng nhập email, hệ thống gửi một mã 6 số (hoặc một "magic link" bấm vào là vào thẳng) tới email đó. Ưu điểm: gần như miễn phí, ai cũng có email.

- Các dịch vụ auth (Supabase/Clerk/Firebase) có sẵn OTP email / magic link, bật là dùng.
- Nếu tự làm, bạn cần một **dịch vụ gửi email giao dịch** (transactional email) để email không rơi vào spam - ví dụ **Resend, SendGrid, Mailgun, Amazon SES**. Phần lớn có gói miễn phí cho lượng nhỏ, trả phí khi gửi nhiều (kiểm tra giá trên trang từng dịch vụ).

## OTP qua SMS

Gửi mã qua tin nhắn điện thoại. Khác với email, **SMS tốn tiền cho mỗi tin gửi đi**, và ở Việt Nam thường cần đăng ký **brandname** (tên người gửi) với nhà mạng.
- Quốc tế: Twilio, Vonage...
- Việt Nam: các nhà cung cấp SMS như eSMS, SpeedSMS, VietGuys... (kiểm tra giá mỗi tin và điều kiện đăng ký brandname trên trang của họ - thường tính theo từng tin, có phí thiết lập brandname).

## OTP qua Zalo (ZNS) - đọc kỹ phần này vì nhiều rào cản

Ở Việt Nam, Zalo là kênh nhắn tin rất phổ biến, nên gửi OTP/thông báo qua Zalo (dịch vụ tên là **ZNS - Zalo Notification Service**) có tỷ lệ người dùng đọc và tin tưởng cao. Nhưng rào cản cao hơn hẳn email/SMS thường, và đây là điều **ít ai nói trước**:

1. **Phải có Zalo Official Account (OA):** không dùng Zalo cá nhân được. Bạn cần đăng ký một OA cho doanh nghiệp/thương hiệu.
2. **Phải trả tiền/nạp gói:** để gửi ZNS bạn cần mua gói dịch vụ hoặc nạp tiền theo bảng giá trên trang Zalo - **gói dành cho doanh nghiệp có thể lên tới vài triệu đồng**, cộng phí theo từng tin gửi. (Giá và cách tính thay đổi theo thời gian - kiểm tra trang chính thức của Zalo OA / ZNS để có số mới nhất.)
3. **Mỗi mẫu tin (template) phải viết trước và chờ Zalo duyệt:** bạn không tự do gửi nội dung tùy ý. Phải soạn sẵn mẫu tin (ví dụ: "Mã xác thực của bạn là {mã}, hiệu lực 5 phút"), gửi lên chờ Zalo xét duyệt, được duyệt mới gửi được cho người dùng. Duyệt có thể mất thời gian và có thể bị từ chối nếu nội dung không đúng quy định.

**Tóm lại:** Zalo ZNS **không phải thứ nên làm đầu tiên**. Với sản phẩm mới/thử nghiệm, bắt đầu bằng đăng nhập Google + OTP email (nhanh, gần như miễn phí). Chỉ đầu tư vào Zalo ZNS khi bạn đã chắc chắn cần kênh Zalo (ví dụ khách hàng của bạn chủ yếu dùng Zalo, không hay mở email) và chấp nhận chi phí + quy trình duyệt.

## Nên chọn cách nào?

| Cách đăng nhập | Chi phí | Độ khó bật | Khi nào dùng |
|---|---|---|---|
| Google | Gần như miễn phí | Dễ (qua dịch vụ auth) | Nên có - phổ biến nhất |
| Apple | Cần Apple Developer (~99 USD/năm) | Vừa | Bắt buộc nếu lên App Store và đã có login mạng xã hội khác |
| OTP email | Gần như miễn phí | Dễ | Nên có - ai cũng có email |
| OTP SMS | Tốn tiền mỗi tin | Vừa | Khi cần xác thực số điện thoại thật |
| OTP Zalo (ZNS) | Vài triệu + phí/tin, phải chờ duyệt | Khó | Chỉ khi thật sự cần kênh Zalo ở VN |

**Lời khuyên:** người mới bắt đầu với **Google + OTP email** qua một dịch vụ auth có sẵn - đủ cho hầu hết sản phẩm giai đoạn đầu, gần như miễn phí, bật nhanh. Thêm các kênh khác khi có nhu cầu thật.

## Bước tiếp theo

Đăng nhập xong, nếu sản phẩm của bạn là app di động và muốn lên chợ ứng dụng - có một chuyện tiền bạc quan trọng cần biết trước để khỏi mất oan mấy chục triệu: [Đưa app lên App Store & Google Play](02-dua-app-len-store.md)
