# Deploy miễn phí: Vercel, Netlify, Cloudflare Pages, Railway — khi nào chưa cần VPS

Bài này dành cho người vừa đọc qua hai bài thuê VPS/deploy VPS và nghĩ "nhiều bước vậy, có cách nào nhanh hơn không?" — có, và với phần lớn dự án cá nhân/nhỏ, đây mới là lựa chọn nên thử **trước tiên**. Học xong bạn sẽ deploy được một website lên internet chỉ trong vài phút, miễn phí, không cần đụng tới VPS hay lệnh Linux nào.

## Vì sao có lựa chọn "miễn phí, không cần VPS"?

Các nền tảng dưới đây (gọi chung là PaaS — Platform as a Service) tự lo toàn bộ phần hạ tầng (server, SSL, mạng lưới phân phối nội dung toàn cầu...) cho bạn — bạn chỉ cần kết nối repo GitHub, họ tự động build và deploy mỗi khi bạn đẩy code mới lên. Đổi lại, bạn có ít quyền tuỳ biến sâu hơn so với tự quản lý VPS, và có giới hạn tài nguyên ở gói miễn phí.

## Bốn nền tảng phổ biến

### Vercel

Do đội ngũ đứng sau framework Next.js phát triển, tối ưu đặc biệt tốt cho các dự án React/Next.js, nhưng cũng deploy được nhiều loại dự án web khác. Rất phổ biến trong cộng đồng frontend hiện nay, có gói miễn phí hào phóng cho dự án cá nhân.

### Netlify

Một trong những nền tảng deploy miễn phí lâu đời và phổ biến nhất, mạnh về các trang tĩnh (static site) và JAMstack, cũng hỗ trợ hàm serverless (chạy code backend nhỏ mà không cần quản lý server riêng).

### Cloudflare Pages

Của Cloudflare — công ty sở hữu một trong những mạng lưới máy chủ phân phối nội dung (CDN) lớn nhất thế giới, nên tốc độ tải trang thường rất nhanh ở nhiều khu vực địa lý khác nhau, gói miễn phí thường có băng thông rộng rãi.

### Railway

Khác nhóm với ba cái trên — Railway không chỉ deploy frontend tĩnh mà hỗ trợ tốt cả **backend cần chạy liên tục và database** (PostgreSQL, MySQL...), gần với trải nghiệm "VPS đơn giản hoá" hơn là chỉ deploy static site. Phù hợp khi dự án của bạn có phần backend thật sự (không chỉ là các hàm serverless nhỏ lẻ).

## Bảng so sánh nhanh

| Nền tảng | Mạnh nhất cho | Hỗ trợ backend/database? |
|---|---|---|
| Vercel | React/Next.js, frontend hiện đại | Có (serverless functions) |
| Netlify | Static site, JAMstack | Có (serverless functions) |
| Cloudflare Pages | Static site, cần tốc độ CDN toàn cầu | Có (Cloudflare Workers) |
| Railway | Backend chạy liên tục + database | Có (đầy đủ, gần giống VPS) |

Cả bốn đều có **gói miễn phí** cho dự án cá nhân, kèm **gói trả phí** khi vượt giới hạn (băng thông, số lượt build, tài nguyên...). Giới hạn cụ thể và giá gói trả phí thay đổi khá thường xuyên — kiểm tra trực tiếp trang giá từng nền tảng (vercel.com/pricing, netlify.com/pricing, pages.cloudflare.com, railway.app/pricing) để có số mới nhất.

## Cách deploy nhanh (ví dụ với Vercel)

1. Đẩy dự án lên GitHub (xem lại [Git/GitHub cơ bản](../02-code-voi-ai/05-git-github-co-ban.md) nếu chưa làm).
2. Vào [vercel.com](https://vercel.com), đăng nhập bằng tài khoản GitHub.
3. Bấm **"Add New" → "Project"**, chọn repo GitHub của bạn.
4. Vercel tự nhận diện loại dự án (Next.js, React, static HTML...) và điền sẵn cấu hình build — thường chỉ cần bấm **"Deploy"**.
5. Sau vài chục giây tới vài phút, bạn nhận được một link dạng `ten-du-an.vercel.app` — website đã chạy thật trên internet.

Từ giờ, **mỗi lần bạn `git push` code mới lên GitHub, Vercel tự động build và deploy lại** — không cần lặp lại các bước thủ công.

Gắn domain riêng thay vì dùng `.vercel.app`: vào phần cài đặt project trên Vercel, thêm domain, làm theo hướng dẫn trỏ DNS (tương tự cách trỏ DNS đã học ở [bài deploy VPS](02-deploy-web-len-vps.md), nhưng Vercel/Netlify/Cloudflare Pages đều tự lo phần SSL, không cần tự cài Certbot).

## Vậy khi nào thật sự cần VPS?

| Tình huống | Nên dùng |
|---|---|
| Website/app cá nhân, portfolio, dự án nhỏ-vừa | Deploy miễn phí (Vercel/Netlify/Cloudflare Pages) |
| Cần backend đơn giản kèm database | Railway, hoặc vẫn thử serverless functions của Vercel/Netlify trước |
| Cần chạy tiến trình dài hạn đặc biệt (ví dụ: bot Discord chạy liên tục, xử lý nền phức tạp), cần cài phần mềm hệ thống riêng, hoặc cần toàn quyền kiểm soát hệ điều hành | VPS ([xem lại](01-thue-vps.md)) |
| Lượng truy cập cực lớn, chi phí free tier trở nên tốn kém hơn tự quản lý | Cân nhắc VPS hoặc gói trả phí của nền tảng deploy |

**Lời khuyên:** người mới nên bắt đầu với deploy miễn phí — chỉ chuyển sang VPS khi thật sự chạm giới hạn hoặc có nhu cầu kỹ thuật cụ thể mà deploy miễn phí không đáp ứng được.

## Bước tiếp theo

Đã biết đưa sản phẩm web lên internet, giờ tìm hiểu hạ tầng cho một nhu cầu khác — chạy AI cần sức mạnh tính toán lớn: [Thuê cloud GPU](04-thue-cloud-gpu.md)
