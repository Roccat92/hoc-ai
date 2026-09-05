# Học AI Việt - ghi chú cho Claude Code

## Hồ sơ dự án cần đọc trước khi làm

Đọc theo thứ tự sau trước khi sửa hoặc thêm nội dung:

1. [`spec.md`](spec.md) — đặc tả cấp dự án: mục tiêu, phạm vi, lộ trình và tiêu chí hoàn thành.
2. [`CONTEXT.md`](CONTEXT.md) — bối cảnh, triết lý biên tập và các quy tắc nội dung chi tiết.
3. [`BACKLOG.md`](BACKLOG.md) — việc đã xong, việc đang làm và ưu tiên tiếp theo; cập nhật file này
   sau mỗi hạng mục lớn để Claude có thể tiếp tục mà không mất trạng thái.

`spec.md` là đặc tả tổng thể của thư viện. Các `spec.md` nằm trong
`09-du-an-thuc-hanh/du-an-*/` là đặc tả riêng của từng dự án và có hiệu lực trong phạm vi dự án đó.

Thư viện mở dạy lập trình với AI cho người Việt. Toàn bộ nội dung là file markdown trong các thư mục đánh số `00-` → `11-` (xem `spec.md` và `CONTEXT.md` để biết đặc tả, bối cảnh đầy đủ và lộ trình tương lai). Website đọc được dựng từ chính các file đó bằng VitePress (cấu hình ở `.vitepress/config.mts`), deploy miễn phí lên Cloudflare qua Workers static assets (cấu hình ở `wrangler.jsonc`, không phải Cloudflare Pages - hai sản phẩm khác nhau, đừng nhầm khi viết hướng dẫn deploy). Người duy trì repo không phải dân kỹ thuật - giải thích ngắn gọn, tránh thuật ngữ khi không cần.

`09-du-an-thuc-hanh/` khác cấu trúc các phần còn lại: mỗi thư mục con `du-an-NN-*/` chứa đúng 4 file (`spec.md`, `backlog.md`, `CLAUDE.md`, `huong-dan.md`), không phải bài học phẳng - sidebar gộp các nhóm dự án đó với mọi file bài học phẳng còn lại trong cùng thư mục (ví dụ `04-rubric-va-capstone.md`) trong `config.mts` (hàm `projectGroupsOf` và khối `flatLessonFiles` trong `buildSidebar`), tự nhận diện qua tên thư mục con.

Có script `scripts/kiem-tra-chuoi.mjs` (`npm run kiem-tra-chuoi`, hoặc `npm run docs:check` để chạy kèm build) dò chuỗi "Bước tiếp theo" từ bài đầu tiên - chạy trước khi commit nếu vừa thêm/sửa/sắp xếp lại bài, và luôn chạy trong CI (`.github/workflows/kiem-tra.yml`) trên mọi PR.

## Quy tắc nội dung (bắt buộc với mọi bài)

- Giọng "bạn - mình", thân thiện, thực chiến, tiếng Việt.
- Dịch vụ trả phí: luôn có bảng giá VND *ước lượng* kèm "giá có thể thay đổi, kiểm tra trang chủ". Không bịa số chính xác; không chắc thì ghi khoảng.
- Thông tin dễ đổi khác (giá, tên model, giới hạn gói...) thêm mốc `*(kiểm tra: DD/MM/YYYY)*` ngay sau câu chứa nó - định dạng cố định, xem chi tiết và lý do ở `CONTEXT.md` mục 3.
- Lệnh terminal để trong code block, giải thích từng dòng ngay bên dưới.
- Mỗi bài: mở đầu nói "dành cho ai / học xong làm được gì", một dòng **"Một câu để nhớ:"** trước khi kết thúc bằng `## Bước tiếp theo` link sang bài kế tiếp (bỏ qua với bài tham khảo dạng danh sách/từ điển).
- Trung lập, ưu tiên công cụ miễn phí/open source, không quảng cáo trá hình.

## Khi thêm hoặc sửa bài

- Tên file: `NN-ten-khong-dau.md` trong đúng thư mục. Sidebar web tự sinh từ tên file và dòng `# Tiêu đề` đầu tiên, không cần sửa cấu hình - trừ khi thêm hẳn một **phần mới** (thư mục cấp cao mới), lúc đó phải thêm vào mảng `sections` trong `config.mts`.
- Thêm bài mới vào danh sách trong `README.md` của thư mục đó, và **nối lại chuỗi "Bước tiếp theo"** cho khớp - đây là chỗ dễ tạo lỗ hổng nhất khi chèn một bài vào giữa một chuỗi đã có: bài trước phải trỏ đúng sang bài mới, bài mới phải trỏ tiếp sang đúng bài kế tiếp cũ. Sau khi sửa, chạy thử script dò toàn bộ chuỗi "Bước tiếp theo" từ bài đầu tiên (`00-ban-do-gioi-ai/00-ai-lam-duoc-gi.md`) xem có bài nào bị "rớt" khỏi đường đi chính không - từng xảy ra thật một lần khi một bài giữa chừng bị nối tắt sang phần khác, làm rớt mất 5 phần liền sau nó.
- `README.md` ở gốc và trong mỗi thư mục được VitePress ánh xạ thành trang `index` (xem `rewrites` trong config).
- File nội bộ (không public) ở gốc repo: mọi `.md` ở gốc **trừ** `README.md`/`CONTRIBUTING.md` tự động bị loại khỏi bản build (xem `PUBLIC_ROOT_DOCS` trong `config.mts`) - không cần sửa gì khi thêm file nội bộ mới, chỉ cần KHÔNG thêm tên nó vào whitelist đó.
- Kiểm tra link nội bộ bằng `npm run docs:build` - build thất bại nếu có link chết.

## Nhận diện (logo, favicon)

Hình gốc là chữ "ô" (vòng tròn + dấu mũ) trong `public/logo.svg`, `logo-dark.svg` (thanh menu, sáng/tối) và `favicon.svg` (huy hiệu nền màu). Các file PNG (`favicon-32.png`, `apple-touch-icon.png`, `og.png`) KHÔNG sửa tay - sinh lại bằng `powershell -ExecutionPolicy Bypass -File scripts/tao-icon.ps1` sau khi đổi SVG. Màu dùng đúng màu brand mặc định của VitePress, không thêm màu riêng; không dùng emoji làm icon.

## Lệnh

- `npm run docs:dev` - xem web ở máy (http://localhost:5173)
- `npm run docs:build` - build ra `.vitepress/dist` và kiểm tra link
