# Thuê VPS: là gì, chọn nhà cung cấp nào, setup Ubuntu từng lệnh

Bài này dành cho người muốn đưa sản phẩm lên internet để **ai cũng truy cập được**, không chỉ chạy trên máy mình. Học xong bạn sẽ hiểu VPS là gì, biết chọn nhà cung cấp phù hợp túi tiền, và tự setup được một server Ubuntu sạch từ đầu.

> **Cân nhắc trước khi thuê:** không phải dự án nào cũng cần VPS ngay từ đầu - nhiều dịch vụ deploy miễn phí (Vercel, Netlify, Railway...) đủ dùng cho phần lớn dự án cá nhân/nhỏ. Đọc [`03-deploy-mien-phi.md`](03-deploy-mien-phi.md) trước để biết khi nào thật sự cần VPS. Bài này dành cho khi bạn đã xác định cần một server riêng - ví dụ chạy backend phức tạp, cần toàn quyền kiểm soát, hoặc dự án vượt quá giới hạn miễn phí.

## VPS là gì?

VPS (Virtual Private Server - máy chủ ảo riêng) là một "máy tính" bạn thuê, chạy 24/7 trên internet, có toàn quyền cài đặt phần mềm, cấu hình như máy tính cá nhân - khác với hosting chia sẻ (shared hosting) nơi bạn chỉ được cấp một phần giới hạn trên một máy dùng chung với nhiều người khác.

VPS "ảo" vì thực chất nhiều VPS cùng chạy chung trên một máy chủ vật lý lớn, được chia tách bằng công nghệ ảo hóa - nhưng với bạn, nó hoạt động độc lập như một máy riêng.

<figure style="max-width:560px;margin:24px auto">
<svg viewBox="0 0 480 150" width="100%" role="img" aria-label="Trình duyệt gửi yêu cầu qua internet tới máy chủ, máy chủ trả trang web về" style="font-family:inherit;display:block">
  <rect x="20" y="40" width="140" height="70" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="90" y="70" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">Trình duyệt</text>
  <text x="90" y="88" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">của bạn</text>
  <rect x="320" y="40" width="140" height="70" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:1;stroke-width:2"/>
  <text x="390" y="70" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">Máy chủ (VPS)</text>
  <text x="390" y="88" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">chạy 24/7, ở xa</text>
  <text x="240" y="52" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">yêu cầu: "mở trang chủ"</text>
<path d="M168 62 H312 M305 57 L312 62 L305 67" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
<path d="M312 90 H168 M175 85 L168 90 L175 95" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <text x="240" y="106" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">trả về: trang web</text>
  <text x="240" y="140" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">cả hai chiều đều đi qua internet</text>
</svg>
<figcaption style="text-align:center;font-size:14px;color:var(--vp-c-text-2);margin-top:8px">Trình duyệt gửi yêu cầu tới một máy tính thuê ở xa luôn bật, máy đó trả trang web về.</figcaption>
</figure>

## Chọn nhà cung cấp: Việt Nam hay quốc tế?

| Nhóm | Ví dụ | Ưu điểm | Cân nhắc |
|---|---|---|---|
| **Việt Nam** | Vietnix, TinoHost | Hỗ trợ tiếng Việt, thanh toán nội địa dễ (chuyển khoản, ví điện tử), độ trễ (ping) thấp khi phục vụ người dùng VN | Lựa chọn cấu hình/vị trí server có thể ít đa dạng hơn quốc tế |
| **Quốc tế** | DigitalOcean, Vultr, Contabo | Nhiều lựa chọn cấu hình/vị trí server toàn cầu, tài liệu/cộng đồng hỗ trợ rất lớn (dễ tìm hướng dẫn khi gặp lỗi) | Cần thẻ thanh toán quốc tế (Visa/Mastercard hoặc ví hỗ trợ), tiếng Anh, độ trễ cao hơn nếu chọn server đặt xa VN |

**Gợi ý cho người mới:** nếu sản phẩm phục vụ chủ yếu người dùng Việt Nam và bạn muốn hỗ trợ tiếng Việt khi gặp sự cố, cân nhắc nhà cung cấp trong nước. Nếu bạn muốn tài liệu/hướng dẫn phong phú (rất nhiều hướng dẫn trên mạng viết cho DigitalOcean/Vultr cụ thể) và không ngại tiếng Anh, nhà cung cấp quốc tế thường dễ tìm trợ giúp hơn khi mới học.

## Chi phí ước tính

VPS cấu hình nhỏ nhất (đủ cho một website cá nhân/dự án nhỏ mới bắt đầu, thường 1 CPU, 1-2GB RAM) hiện dao động khoảng **50.000 - 150.000đ/tháng** tùy nhà cung cấp và khuyến mãi tại thời điểm. Cấu hình mạnh hơn (nhiều RAM/CPU hơn, cho dự án có lượng truy cập lớn hơn) giá tăng theo.

> Đây là khoảng ước lượng thô, **giá thực tế thay đổi liên tục** theo khuyến mãi và nhà cung cấp - luôn kiểm tra trang giá chính thức trước khi quyết định:
> - Vietnix: vietnix.vn
> - TinoHost: tinohost.com
> - DigitalOcean: digitalocean.com/pricing
> - Vultr: vultr.com/pricing
> - Contabo: contabo.com

**Mẹo cho người mới:** bắt đầu với cấu hình **nhỏ nhất/rẻ nhất** - gần như mọi nhà cung cấp đều cho phép nâng cấp cấu hình sau này chỉ với vài cú click, không cần lo "chọn sai thì phải làm lại từ đầu".

## Setup Ubuntu từng lệnh

Sau khi thuê VPS, nhà cung cấp sẽ gửi cho bạn địa chỉ IP và mật khẩu (hoặc SSH key) để truy cập. Các bước dưới đây dùng hệ điều hành **Ubuntu** (bản Linux phổ biến nhất cho VPS, khuyên dùng cho người mới vì nhiều tài liệu hướng dẫn).

**Bước 1: Kết nối vào VPS qua SSH** (từ terminal trên máy bạn):
```bash
ssh root@dia-chi-ip-cua-ban
```
- Thay `dia-chi-ip-cua-ban` bằng địa chỉ IP nhà cung cấp gửi cho bạn. Lần đầu kết nối sẽ có cảnh báo xác nhận, gõ `yes`. Sau đó nhập mật khẩu được cấp.

**Bước 2: Cập nhật hệ thống** (luôn làm đầu tiên với server mới):
```bash
apt update && apt upgrade -y
```
- `apt update`: kiểm tra danh sách phần mềm có bản cập nhật mới.
- `apt upgrade -y`: cài đặt các bản cập nhật đó, `-y` để tự động đồng ý mà không cần bấm xác nhận từng bước.

**Bước 3: Tạo một user riêng, không dùng root cho công việc hàng ngày** (an toàn hơn - root có toàn quyền, lỡ gõ nhầm lệnh nguy hiểm hậu quả lớn hơn):
```bash
adduser ten-cua-ban
usermod -aG sudo ten-cua-ban
```
- `adduser`: tạo user mới, sẽ hỏi bạn đặt mật khẩu.
- `usermod -aG sudo`: cấp cho user đó quyền chạy lệnh quản trị (thông qua `sudo`) khi cần.

Từ giờ, đăng nhập bằng `ssh ten-cua-ban@dia-chi-ip-cua-ban` thay vì `root`.

**Bước 4: Bật tường lửa cơ bản** (chỉ mở các cổng cần thiết, chặn phần còn lại):
```bash
sudo ufw allow OpenSSH
sudo ufw enable
```
- Dòng 1: cho phép kết nối SSH (để bạn không tự khóa mình khỏi server).
- Dòng 2: bật tường lửa. Sẽ hỏi xác nhận, gõ `y`.

Đến đây, VPS của bạn đã sẵn sàng, an toàn cơ bản, để tiếp tục cài đặt phần mềm cần thiết cho dự án.

## Bước tiếp theo

Server đã sẵn sàng, giờ đưa web của bạn lên chạy thật trên đó: [Deploy web lên VPS](02-deploy-web-len-vps.md)
