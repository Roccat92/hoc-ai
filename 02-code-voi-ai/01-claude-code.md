# Claude Code: cài đặt, đăng nhập, lệnh cơ bản, CLAUDE.md, chi phí

Bài này dành cho người đã cài xong Node.js ([bài trước](../01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md)) và muốn bắt đầu code cùng AI thật sự. Học xong bạn sẽ cài được Claude Code, biết các lệnh cơ bản, hiểu file `CLAUDE.md` dùng để làm gì, và biết các mức chi phí để chọn gói phù hợp túi tiền.

## Claude Code là gì?

Claude Code là công cụ dòng lệnh (CLI — xem lại ở [từ điển thuật ngữ](../00-ban-do-gioi-ai/06-tu-dien-thuat-ngu.md)) của Anthropic, chạy ngay trong terminal, cho phép bạn **mô tả yêu cầu bằng ngôn ngữ tự nhiên** (kể cả tiếng Việt) và Claude sẽ trực tiếp đọc, viết, sửa file code trong dự án của bạn, chạy lệnh terminal thay bạn (cài thư viện, chạy test, khởi động server...). Đây chính là công cụ chính mà toàn bộ phần thực hành trong repo này dùng.

## Cài đặt

Đảm bảo bạn đã cài Node.js (kiểm tra bằng `node --version` — xem lại [bài cài môi trường](../01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md) nếu chưa). Mở terminal, gõ:

```bash
npm install -g @anthropic-ai/claude-code
```

- `npm install`: lệnh cài một gói (package) thông qua npm.
- `-g`: cài "global" — nghĩa là cài một lần, dùng được từ bất kỳ thư mục nào trên máy, không phải cài lại cho từng dự án.
- `@anthropic-ai/claude-code`: tên gói chính thức của Claude Code trên npm.

**Kiểm tra cài thành công:**
```bash
claude --version
```
Hiện ra số phiên bản là ổn.

## Đăng nhập lần đầu

Vào thư mục dự án bạn muốn làm việc (hoặc tạo thư mục mới), gõ:

```bash
cd duong-dan-den-thu-muc-du-an
claude
```

- Dòng 1: di chuyển vào thư mục dự án (thay `duong-dan-den-thu-muc-du-an` bằng đường dẫn thật, ví dụ `cd Documents/du-an-cua-toi`).
- Dòng 2: khởi động Claude Code.

Lần đầu chạy, Claude Code sẽ hỏi bạn muốn đăng nhập theo cách nào — thường có lựa chọn đăng nhập bằng tài khoản Claude.ai (nếu bạn có gói Pro/Max) hoặc bằng API key riêng (xem cách lấy API key ở [`04-build-ung-dung-ai/01-goi-api-llm.md`](../04-build-ung-dung-ai/01-goi-api-llm.md)). Làm theo hướng dẫn trên màn hình — thường sẽ mở trình duyệt để bạn xác nhận đăng nhập.

## Các lệnh cơ bản

Sau khi khởi động (`claude`), bạn chỉ cần **gõ yêu cầu bằng tiếng Việt bình thường**, ví dụ:

```
Tạo cho tôi một trang HTML đơn giản có tiêu đề "Xin chào" và một nút bấm
```

Claude Code sẽ đọc yêu cầu, tạo/sửa file, và báo lại đã làm gì.

Một số lệnh đặc biệt bắt đầu bằng dấu `/` (gọi là slash command) hữu ích khi mới bắt đầu:

| Lệnh | Tác dụng |
|---|---|
| `/help` | Hiện danh sách lệnh có sẵn |
| `/init` | Tạo file `CLAUDE.md` cho dự án (xem mục dưới) |
| `/clear` | Xóa lịch sử hội thoại hiện tại, bắt đầu phiên làm việc mới sạch sẽ |
| `/exit` hoặc `Ctrl+C` (bấm 2 lần) | Thoát Claude Code |

## File CLAUDE.md là gì?

`CLAUDE.md` là một file văn bản đặc biệt bạn đặt ở thư mục gốc dự án, chứa **thông tin/quy tắc riêng của dự án** mà bạn muốn Claude luôn nhớ mỗi khi làm việc trong thư mục đó — ví dụ: "Dự án này dùng React và TypeScript", "Luôn viết comment bằng tiếng Việt", "Không được tự ý xóa file trong thư mục `data/`".

Bạn có thể tự tạo file này bằng tay, hoặc gõ lệnh `/init` trong Claude Code để nó tự quét dự án và tạo một bản `CLAUDE.md` gợi ý ban đầu, sau đó bạn chỉnh sửa lại theo ý mình.

**Ví dụ nội dung CLAUDE.md đơn giản:**
```markdown
# Dự án: Trang web bán hàng cá nhân

- Dùng HTML/CSS/JavaScript thuần, chưa dùng framework.
- Tông màu chính: trắng - đen - be.
- Luôn giải thích ngắn gọn bằng tiếng Việt khi sửa code.
```

## Chi phí

Claude Code dùng được theo hai hình thức, và chi phí phụ thuộc vào hình thức bạn chọn:

| Hình thức | Phù hợp với ai | Cách tính chi phí |
|---|---|---|
| **Gói thuê bao Claude.ai** (Free / Pro / Max) | Người muốn chi phí cố định hàng tháng, dễ dự trù ngân sách | Trả cố định theo tháng, có giới hạn mức sử dụng theo gói |
| **API key trả theo dùng** | Người muốn linh hoạt, chỉ trả đúng số đã dùng, hoặc dùng cho nhiều công cụ AI khác nhau | Trả theo số token thực tế đã dùng (xem [`04-build-ung-dung-ai/01-goi-api-llm.md`](../04-build-ung-dung-ai/01-goi-api-llm.md)) |

Có bản miễn phí/dùng thử để trải nghiệm trước khi quyết định nâng cấp. **Giá các gói và hạn mức thay đổi theo thời gian — kiểm tra trực tiếp tại anthropic.com/pricing hoặc trong claude.ai để có số chính xác tại thời điểm bạn đọc**, đừng tin vào một con số VND cố định ghi trong bài viết bất kỳ.

**Lời khuyên cho người mới:** bắt đầu với gói/bản miễn phí hoặc dùng thử, làm quen công cụ trước, chỉ nâng cấp khi bạn thực sự chạm giới hạn sử dụng.

## Bước tiếp theo

Đã biết dùng Claude Code, giờ xem qua các lựa chọn AI IDE khác để biết công cụ nào hợp với bạn: [Cursor, Windsurf, Copilot — so sánh](02-cursor-windsurf-copilot.md)
