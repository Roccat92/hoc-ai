# SSL và HTTPS: bật miễn phí trên Cloudflare hoặc VPS

Bài này dành cho người muốn hiểu ổ khóa nhỏ cạnh địa chỉ web nghĩa là gì, và đảm bảo sản phẩm của mình luôn có nó trước khi cho người khác dùng. Học xong bạn sẽ hiểu SSL/HTTPS bảo vệ điều gì, và biết cách kiểm tra/bật nó tùy theo cách bạn đang deploy.

## SSL là gì - ví dụ đời thường

Hình dung bạn gửi một lá thư. **HTTP** (không có SSL) giống như gửi một tấm **bưu thiếp** - ai cầm nó trên đường đi (nhân viên bưu điện, người giao hàng, bất kỳ ai) đều đọc được nội dung. **HTTPS** (có SSL) giống như gửi thư trong một **phong bì niêm phong**, chỉ người nhận đúng địa chỉ mới mở ra đọc được - ai chặn giữa đường cũng chỉ thấy phong bì kín, không đọc được nội dung bên trong.

Khi bạn gõ mật khẩu, số điện thoại, hay bất kỳ thông tin gì vào một trang web **không có HTTPS**, dữ liệu đó truyền đi ở dạng gần như "bưu thiếp" - ai đứng giữa đường truyền (ví dụ cùng mạng Wi-Fi công cộng với bạn) về lý thuyết có thể đọc được. HTTPS mã hóa toàn bộ nội dung đó, biến nó thành "phong bì niêm phong".

## Vì sao bắt buộc phải có

- **Bảo vệ dữ liệu người dùng** - lý do quan trọng nhất, đặc biệt với form đăng nhập, form nhập thông tin cá nhân.
- **Trình duyệt cảnh báo thẳng** - không có HTTPS, Chrome/Firefox/Safari hiện chữ "Không an toàn" (Not Secure) ngay cạnh địa chỉ web, khiến người dùng bỏ chạy ngay khi thấy.
- **Ảnh hưởng SEO** - Google xếp hạng ưu tiên các trang có HTTPS.

## Cách 1: Deploy qua Cloudflare Pages / Vercel / Netlify - đã tự động có sẵn

Nếu bạn deploy theo [`03-ha-tang-thuc-chien/03-deploy-mien-phi.md`](../03-ha-tang-thuc-chien/03-deploy-mien-phi.md), tin vui: **HTTPS đã được bật tự động, miễn phí, không cần làm gì thêm** - các nền tảng này tự cấp và gia hạn chứng chỉ SSL cho mọi domain (kể cả domain phụ `.pages.dev`/`.vercel.app` lẫn domain riêng bạn gắn thêm). Việc của bạn chỉ là **kiểm tra**: mở trang web, nhìn cạnh địa chỉ có ổ khóa không.

## Cách 2: Tự deploy trên VPS - dùng Let's Encrypt (Certbot)

Đã hướng dẫn chi tiết từng bước ở [`03-ha-tang-thuc-chien/02-deploy-web-len-vps.md`](../03-ha-tang-thuc-chien/02-deploy-web-len-vps.md) (mục "Cài SSL miễn phí với Certbot"). Nhắc lại lệnh cốt lõi:

```bash
sudo certbot --nginx -d domain-cua-ban.com
```

Certbot tự lo luôn việc gia hạn (chứng chỉ Let's Encrypt hết hạn sau 90 ngày, tự gia hạn định kỳ, bạn không cần nhớ làm lại).

## Cách 3: Domain đi qua Cloudflare (proxy) trước khi tới VPS

Nếu bạn dùng Cloudflare để quản lý DNS cho domain trỏ về VPS riêng (bật "proxy" - biểu tượng đám mây màu cam trong Cloudflare dashboard, thay vì màu xám), Cloudflare sẽ đứng giữa người dùng và VPS của bạn - vừa cấp SSL, vừa cho luôn khả năng chống DDoS miễn phí ([xem bài chống bot/spam](04-chong-bot-va-spam.md)).

**Lưu ý dễ sai:** trong mục SSL/TLS của Cloudflare có 4 chế độ (Off / Flexible / Full / Full strict). Chọn nhầm **"Flexible"** khi VPS của bạn *đã* có SSL riêng (qua Certbot ở cách 2) là lỗi phổ biến nhất, thường gây ra lỗi **"quá nhiều lần chuyển hướng"** (redirect loop) trên trình duyệt. Nếu VPS đã có Certbot, chọn **"Full"** hoặc **"Full (strict)"**. Nếu VPS chưa có SSL riêng, chọn "Flexible" tạm thời (kém an toàn hơn - đoạn Cloudflare-tới-VPS không được mã hóa) trong lúc chờ cài Certbot.

## Kiểm tra trang của bạn đã cấu hình SSL đúng chưa

Ngoài việc nhìn ổ khóa trên trình duyệt, có công cụ kiểm tra chi tiết hơn, miễn phí: [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/) - dán domain vào, chờ vài phút, nó chấm điểm và chỉ ra lỗi cấu hình cụ thể nếu có.

## Bước tiếp theo

Hạng mục tiếp theo trong checklist - và cũng là lỗi gây thiệt hại tiền bạc thật nhiều nhất: [Giấu API key và secret](03-giau-api-key-va-secret.md)
