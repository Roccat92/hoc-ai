# Học AI Việt — ghi chú cho Claude Code

Thư viện mở dạy lập trình với AI cho người Việt. Toàn bộ nội dung là file markdown trong các thư mục đánh số `00-` → `10-` (xem `CONTEXT.md` để biết bối cảnh đầy đủ và lộ trình tương lai — **đọc file đó trước** khi làm bất kỳ việc gì). Website đọc được dựng từ chính các file đó bằng VitePress (cấu hình ở `.vitepress/config.mts`), deploy miễn phí trên Cloudflare Pages. Người duy trì repo không phải dân kỹ thuật — giải thích ngắn gọn, tránh thuật ngữ khi không cần.

`09-du-an-thuc-hanh/` khác cấu trúc các phần còn lại: mỗi thư mục con `du-an-NN-*/` chứa đúng 4 file (`spec.md`, `backlog.md`, `CLAUDE.md`, `huong-dan.md`), không phải bài học phẳng — sidebar có nhánh dựng riêng cho trường hợp này trong `config.mts` (hàm `projectGroupsOf`), tự nhận diện qua tên thư mục con.

## Quy tắc nội dung (bắt buộc với mọi bài)

- Giọng "bạn - mình", thân thiện, thực chiến, tiếng Việt.
- Dịch vụ trả phí: luôn có bảng giá VND *ước lượng* kèm "giá có thể thay đổi, kiểm tra trang chủ". Không bịa số chính xác; không chắc thì ghi khoảng.
- Lệnh terminal để trong code block, giải thích từng dòng ngay bên dưới.
- Mỗi bài: mở đầu nói "dành cho ai / học xong làm được gì", kết thúc bằng `## Bước tiếp theo` link sang bài kế tiếp.
- Trung lập, ưu tiên công cụ miễn phí/open source, không quảng cáo trá hình.

## Khi thêm hoặc sửa bài

- Tên file: `NN-ten-khong-dau.md` trong đúng thư mục. Sidebar web tự sinh từ tên file và dòng `# Tiêu đề` đầu tiên, không cần sửa cấu hình — trừ khi thêm hẳn một **phần mới** (thư mục cấp cao mới), lúc đó phải thêm vào mảng `sections` trong `config.mts`.
- Thêm bài mới vào danh sách trong `README.md` của thư mục đó, và **nối lại chuỗi "Bước tiếp theo"** cho khớp — đây là chỗ dễ tạo lỗ hổng nhất khi chèn một bài vào giữa một chuỗi đã có: bài trước phải trỏ đúng sang bài mới, bài mới phải trỏ tiếp sang đúng bài kế tiếp cũ. Sau khi sửa, chạy thử script dò toàn bộ chuỗi "Bước tiếp theo" từ bài đầu tiên (`00-ban-do-gioi-ai/01-ai-la-gi.md`) xem có bài nào bị "rớt" khỏi đường đi chính không — từng xảy ra thật một lần khi một bài giữa chừng bị nối tắt sang phần khác, làm rớt mất 5 phần liền sau nó.
- `README.md` ở gốc và trong mỗi thư mục được VitePress ánh xạ thành trang `index` (xem `rewrites` trong config).
- File nội bộ (không public) ở gốc repo: mọi `.md` ở gốc **trừ** `README.md`/`CONTRIBUTING.md` tự động bị loại khỏi bản build (xem `PUBLIC_ROOT_DOCS` trong `config.mts`) — không cần sửa gì khi thêm file nội bộ mới, chỉ cần KHÔNG thêm tên nó vào whitelist đó.
- Kiểm tra link nội bộ bằng `npm run docs:build` — build thất bại nếu có link chết.

## Lệnh

- `npm run docs:dev` — xem web ở máy (http://localhost:5173)
- `npm run docs:build` — build ra `.vitepress/dist` và kiểm tra link
