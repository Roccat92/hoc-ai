# Chống bot và spam: Cloudflare Turnstile, rate limiting, DDoS

Bài này dành cho người có một form công khai trên web (liên hệ, đăng ký, đặt hàng...) và muốn nó không ngập trong tin rác sau vài ngày public. Học xong bạn sẽ gắn được Cloudflare Turnstile vào form, hiểu rate limiting cơ bản, và biết mình đã được bảo vệ DDoS miễn phí mà không cần làm gì thêm.

## Vấn đề: form công khai luôn bị bot tìm tới

Bất kỳ form nào để công khai trên internet, sớm hay muộn cũng bị bot tự động quét thấy và gửi spam — quảng cáo, link độc hại, hoặc chỉ đơn giản là rác làm đầy hộp thư/database của bạn. Không phải vì sản phẩm bạn "nổi tiếng" gì cả — bot quét toàn bộ internet không phân biệt.

## Cloudflare Turnstile: thay CAPTCHA, miễn phí

**Turnstile** là giải pháp "xác minh không phải bot" của Cloudflare — thay thế cho CAPTCHA truyền thống (loại bắt bạn chọn ảnh "có đèn giao thông" khó chịu). Điểm khác biệt: Turnstile phần lớn chạy **ẩn**, tự động phân tích hành vi trình duyệt, người dùng thật thường không cần thao tác gì cả (không như reCAPTCHA hay bắt tick "Tôi không phải robot" rồi chọn ảnh). Turnstile **miễn phí** không giới hạn số lượt xác minh.

### Cài đặt từng bước

**Bước 1 — Tạo site trong Cloudflare Dashboard:**
Đăng nhập [dash.cloudflare.com](https://dash.cloudflare.com), vào mục **Turnstile**, bấm **Add site**, nhập domain của bạn. Cloudflare cấp cho bạn hai key:
- **Site key** — công khai, nhúng vào code phía trình duyệt (frontend).
- **Secret key** — bí mật, dùng ở phía server để xác thực — **giữ trong `.env`**, đúng nguyên tắc đã học ở [bài trước](03-giau-api-key-va-secret.md).

**Bước 2 — Nhúng widget vào form (frontend):**
```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

<form action="/submit-form" method="POST">
  <input type="text" name="ten" required>
  <input type="email" name="email" required>
  <div class="cf-turnstile" data-sitekey="SITE_KEY_CUA_BAN"></div>
  <button type="submit">Gửi</button>
</form>
```
- Dòng `<script>`: tải script Turnstile từ Cloudflare.
- `<div class="cf-turnstile" data-sitekey="...">`: nơi widget xác minh hiện ra, thay `SITE_KEY_CUA_BAN` bằng site key thật ở bước 1. Khi người dùng submit form, một token xác minh được tự động gửi kèm.

**Bước 3 — Xác thực token ở phía server (bắt buộc, đừng bỏ qua):**
Chỉ nhúng widget ở frontend là **chưa đủ** — bot vẫn có thể gửi thẳng request tới server mà bỏ qua form. Server phải tự gọi API Cloudflare để xác nhận token thật:

```
POST https://challenges.cloudflare.com/turnstile/v0/siteverify
Body: secret=SECRET_KEY_CUA_BAN&response=TOKEN_NHAN_TU_FORM
```

Nhờ Claude Code viết đoạn code xác thực này bằng ngôn ngữ backend bạn đang dùng: "viết cho tôi hàm xác thực Turnstile token phía server, gọi API siteverify của Cloudflare, dùng [Node.js/Python/...]." Chỉ khi kết quả trả về `success: true`, server mới xử lý tiếp dữ liệu form.

## Rate limiting cơ bản

Rate limiting = giới hạn số lượt truy cập/gửi request từ một nguồn (thường theo địa chỉ IP) trong một khoảng thời gian — chặn kiểu tấn công gửi form liên tục hàng trăm lần/giây.

- **Nếu domain đã qua Cloudflare** (proxy bật, xem [bài SSL](02-ssl-va-https.md)): vào mục **Security → WAF → Rate limiting rules**, tạo rule đơn giản kiểu "IP nào gửi quá N request/phút tới `/submit-form` thì chặn tạm". Gói miễn phí của Cloudflare đã có một số quyền hạn cơ bản cho việc này — kiểm tra dashboard hiện tại để biết chính xác giới hạn gói free.
- **Ở tầng code (không qua Cloudflare):** dùng thư viện có sẵn, ví dụ với Node.js/Express là `express-rate-limit` — nhờ Claude Code cài và cấu hình: "thêm rate limiting cho route /submit-form, giới hạn 5 request/phút mỗi IP."

## Bảo vệ DDoS — đã có sẵn, không cần làm gì thêm

Nếu domain của bạn đã trỏ qua Cloudflare (bất kỳ gói nào, kể cả miễn phí), bạn **đã tự động được bảo vệ DDoS** ở tầng hạ tầng của Cloudflare — đây là một trong những lý do khiến việc dùng Cloudflare (cho DNS, hoặc deploy qua Cloudflare Pages) là lựa chọn hợp lý mặc định cho người mới, không cần cấu hình phức tạp gì thêm.

## Bước tiếp theo

Form đã an toàn, giờ tới phần đăng nhập — nơi dễ mắc lỗi bảo mật nghiêm trọng nhất nếu tự làm sai cách: [Đăng nhập và mật khẩu](05-dang-nhap-va-mat-khau.md)
