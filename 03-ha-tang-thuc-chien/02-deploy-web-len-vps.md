# Deploy web lên VPS: Nginx, PM2, domain, SSL miễn phí

::: warning Bài này ở mức nhập môn
Đủ để bạn bắt đầu, chưa phải kinh nghiệm vận hành chuyên sâu. Người viết chủ yếu deploy bằng dịch vụ miễn phí (Vercel/Cloudflare) và mới thử nghiệm cloud GPU. Nếu bạn có kinh nghiệm thực chiến mảng này, rất mong bạn đóng góp - xem [CONTRIBUTING.md](../CONTRIBUTING.md).
:::

Bài này dành cho người đã có VPS Ubuntu sẵn sàng ([bài trước](01-thue-vps.md)) và một dự án đã đẩy lên GitHub ([xem lại Git/GitHub](../02-code-voi-ai/05-git-github-co-ban.md)). Học xong bạn sẽ có website chạy thật trên internet, có domain riêng, có ổ khóa HTTPS (SSL) miễn phí.

## Ba mảnh ghép cần hiểu trước khi bắt đầu

- **PM2**: giữ cho ứng dụng Node.js của bạn **luôn chạy**, kể cả khi bạn đóng SSH, và **tự khởi động lại** nếu app bị crash.
- **Nginx**: đứng giữa internet và ứng dụng của bạn - nhận yêu cầu từ người dùng ở cổng 80 (HTTP)/443 (HTTPS) tiêu chuẩn, rồi chuyển tiếp vào cổng nội bộ mà app của bạn đang chạy (ví dụ cổng 3000). Cách làm này gọi là "reverse proxy".
- **SSL/HTTPS**: mã hóa dữ liệu giữa người dùng và server - trình duyệt hiện ổ khóa thay vì cảnh báo "không an toàn". Miễn phí nhờ Let's Encrypt.

```
Người dùng → internet → Nginx (cổng 80/443) → ứng dụng của bạn (PM2 giữ chạy, cổng 3000)
```

## Bước 1: Cài Node.js trên VPS

SSH vào VPS (dùng user đã tạo ở bài trước, không dùng root), rồi:
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```
- Dòng 1: tải script cài đặt Node.js bản LTS chính thức.
- Dòng 2: cài Node.js từ script đó.

Kiểm tra: `node --version`

## Bước 2: Đưa code lên VPS bằng Git

```bash
git clone https://github.com/ten-cua-ban/ten-du-an.git
cd ten-du-an
npm install
```
- `git clone`: tải dự án từ GitHub về VPS (thay link bằng link repo thật của bạn).
- `cd ten-du-an`: vào thư mục dự án.
- `npm install`: cài các thư viện dự án cần, dựa theo file `package.json`.

## Bước 3: Cài PM2, chạy ứng dụng

```bash
sudo npm install -g pm2
pm2 start npm --name "ten-du-an" -- start
pm2 save
pm2 startup
```
- Dòng 1: cài PM2 toàn cục.
- Dòng 2: khởi động ứng dụng qua PM2, đặt tên để dễ quản lý (thay `npm -- start` bằng lệnh khởi động thật của dự án bạn nếu khác).
- Dòng 3: lưu lại danh sách app đang chạy.
- Dòng 4: thiết lập để PM2 tự khởi động lại app mỗi khi server reboot (lệnh này sẽ in ra một dòng lệnh khác, copy và chạy dòng đó để hoàn tất).

**Kiểm tra:** `pm2 list` - thấy app ở trạng thái "online" là ổn.

## Bước 4: Cài và cấu hình Nginx

```bash
sudo apt install -y nginx
```

Tạo file cấu hình cho site (thay `ten-du-an` và domain thật của bạn):
```bash
sudo nano /etc/nginx/sites-available/ten-du-an
```
- Lệnh này mở trình soạn thảo văn bản đơn giản trong terminal. Dán nội dung sau vào (thay `domain-cua-ban.com` bằng domain thật, thay `3000` bằng cổng app bạn thật sự đang chạy):

```nginx
server {
    listen 80;
    server_name domain-cua-ban.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }
}
```

Lưu file (trong `nano`: `Ctrl+O` rồi Enter để lưu, `Ctrl+X` để thoát). Kích hoạt cấu hình:
```bash
sudo ln -s /etc/nginx/sites-available/ten-du-an /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```
- Dòng 1: tạo liên kết để Nginx nhận diện file cấu hình này là đang hoạt động.
- Dòng 2: kiểm tra cú pháp cấu hình có lỗi không trước khi áp dụng.
- Dòng 3: khởi động lại Nginx để áp dụng thay đổi.

## Bước 5: Trỏ domain về VPS

Nếu bạn đã mua domain (từ nhà đăng ký như Namecheap, Mắt Bão, PA Vietnam...), vào trang quản lý DNS của domain đó, tạo một bản ghi (DNS record):

| Loại | Tên | Giá trị |
|---|---|---|
| A | `@` (hoặc để trống - nghĩa là domain gốc) | Địa chỉ IP của VPS |

Việc này có thể mất từ vài phút đến vài giờ để có hiệu lực trên toàn cầu (gọi là "DNS propagation") - nếu chưa vào được ngay, hãy kiên nhẫn chờ.

## Bước 6: Cài SSL miễn phí (HTTPS) với Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d domain-cua-ban.com
```
- Dòng 1: cài Certbot - công cụ tự động lấy chứng chỉ SSL miễn phí từ Let's Encrypt.
- Dòng 2: yêu cầu Certbot lấy chứng chỉ và **tự động cấu hình Nginx** để dùng HTTPS. Sẽ hỏi email (để nhận thông báo khi chứng chỉ sắp hết hạn) và vài câu xác nhận.

Certbot cũng tự thiết lập gia hạn chứng chỉ tự động (chứng chỉ Let's Encrypt có hạn 90 ngày, tự gia hạn nên bạn không cần nhớ làm lại).

## Kiểm tra cuối cùng

Mở trình duyệt, vào `https://domain-cua-ban.com` - thấy ổ khóa và website của bạn chạy đúng là thành công. Nếu có lỗi, kiểm tra theo thứ tự: `pm2 list` (app có đang chạy không) → `sudo nginx -t` (cấu hình Nginx có lỗi cú pháp không) → `sudo systemctl status nginx` (Nginx có đang chạy không).

## Bước tiếp theo

Deploy lên VPS khá nhiều bước - với dự án nhỏ, có cách nhanh hơn nhiều. Xem: [Deploy miễn phí - khi nào chưa cần VPS](03-deploy-mien-phi.md)
