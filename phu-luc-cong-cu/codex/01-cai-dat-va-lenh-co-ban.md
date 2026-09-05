# Cài đặt và chọn đúng nơi làm việc với coding agent

Bài này dành cho người đã build được dự án đầu tiên với [Claude Code](../claude-code/01-cai-dat-va-lenh-co-ban.md) và muốn biết dùng Codex - hoặc một coding agent khác - có gì khác không. Học xong bạn sẽ cài được Codex CLI, phân biệt desktop/web, CLI và IDE extension, chọn local hay cloud, đăng nhập đúng cách và thực hiện một task chỉ đọc an toàn. Toàn bộ luồng tư duy trong bài áp dụng y hệt cho Claude Code - chỉ đổi tên lệnh.

## Codex có những bề mặt nào?

| Bề mặt | Hợp với | Đặc điểm |
|---|---|---|
| **CLI** | Người thích terminal, script và CI | Đọc/sửa file, chạy lệnh, có `codex exec` cho workflow không tương tác (script/CI) - Claude Code gọi tương ứng là `claude` (tương tác) và `claude -p` (không tương tác) |
| **IDE extension** | Người muốn thấy code và diff cạnh nhau | Dùng file đang mở hoặc đoạn code được chọn làm ngữ cảnh - cả Codex lẫn Claude Code đều có extension cho VS Code |
| **Desktop/web/cloud** | Task dài, cần giao diện hoặc môi trường từ xa | Có thể làm việc với project và tích hợp cloud tùy gói |

Nguyên lý giống nhau dù dùng agent nào: nhận mục tiêu, đọc ngữ cảnh được phép, đề xuất hoặc thực hiện thay đổi và trả bằng chứng. Khác nhau chủ yếu là nơi code chạy, quyền truy cập và tên lệnh gõ trên terminal. Bài này tập trung vào CLI vì đó là bề mặt dùng được ngay trên máy bạn, không cần chờ mời tham gia bản cloud.

## Cài đặt

Cách phổ biến nhất là qua npm (đã cài Node.js ở [bài cài môi trường](../../01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md)):

```bash
npm install -g @openai/codex
```

- `npm install`: lệnh cài một gói (package) thông qua npm.
- `-g`: cài "global" - cài một lần, dùng được từ bất kỳ thư mục nào, không phải cài lại cho từng dự án.
- `@openai/codex`: tên gói chính thức của Codex CLI trên npm.

**Kiểm tra cài thành công:**
```bash
codex --version
```
Hiện ra số phiên bản là ổn. Nếu bạn không quen npm hoặc muốn cài theo cách khác (Homebrew, tải bản cài sẵn), xem [Codex CLI chính thức](https://learn.chatgpt.com/docs/codex/cli) - trang này luôn có hướng dẫn mới nhất, không phụ thuộc bài viết có thể đã cũ theo thời gian.

## Đăng nhập lần đầu

Vào thư mục dự án bạn muốn làm việc, gõ:

```bash
cd duong-dan-den-thu-muc-du-an
codex
```

- Dòng 1: di chuyển vào thư mục dự án (thay `duong-dan-den-thu-muc-du-an` bằng đường dẫn thật).
- Dòng 2: khởi động Codex, mở phiên tương tác trong thư mục hiện tại.

Lần đầu chạy, Codex sẽ hỏi bạn đăng nhập bằng tài khoản ChatGPT (nếu bạn có gói Plus/Pro/Team - xem [chi phí các gói Codex](02-chi-phi-cac-goi.md)) hoặc bằng API key riêng. Làm theo hướng dẫn trên màn hình - thường sẽ mở trình duyệt để bạn xác nhận. **Đừng dán API key trực tiếp vào chat** với Codex, và đừng commit key vào repo - xem lại [giấu API key và secret](../../10-bao-mat/03-giau-api-key-va-secret.md).

## Chọn local, worktree hay cloud

- **Local:** Codex dùng file và công cụ đã cài trên máy; hợp với task nhỏ, dữ liệu riêng và cần kiểm soát trực tiếp. Bắt đầu ở đây.
- **Worktree:** tách một bản làm việc Git riêng (`git worktree`) để thay đổi không làm bẩn thư mục chính đang mở trong IDE - hữu ích khi muốn chạy hai task Codex song song mà không đè lên nhau.
- **Cloud:** hợp với task dài hoặc cần môi trường từ xa; đọc kỹ file nào được gửi đi và kết quả được lưu ở đâu trước khi dùng với dữ liệu nhạy cảm.

Trước task đầu tiên, tạo checkpoint Git hoặc ít nhất kiểm tra working tree bằng `git status` - nếu đang có thay đổi chưa commit, commit hoặc stash trước. Đừng bắt agent sửa khi bạn chưa biết thay đổi cũ trong thư mục thuộc về ai.

## Task chỉ đọc đầu tiên

Việc đầu tiên nên làm với một dự án lạ: yêu cầu Codex chỉ đọc, chưa sửa gì, để tự bạn kiểm tra nó hiểu đúng cấu trúc dự án trước khi giao việc thật:

```text
Hãy chỉ đọc, chưa sửa file nào.
1. Tóm tắt cấu trúc thư mục.
2. Chỉ ra file khởi động và lệnh test hiện có.
3. Nêu ba điều bạn chưa chắc về dự án này.
```

Với dự án landing page ở [phần 09](../../09-du-an-thuc-hanh/du-an-01-landing-page/spec.md), câu trả lời hợp lý sẽ nêu đúng: đây là trang tĩnh HTML/CSS/JS thuần không cần bước build, form gửi qua Formspree, chưa có test tự động. Nếu Codex trả lời sai cấu trúc cơ bản này, dừng lại và hỏi thêm trước khi giao task sửa code.

## Bài tập

Cài Codex, đăng nhập, mở thử thư mục dự án landing page (hoặc bất kỳ dự án nào bạn đang có), chạy đúng prompt chỉ đọc ở trên. So sánh câu trả lời với thực tế dự án - ghi lại chỗ nào Codex hiểu đúng, chỗ nào chưa chắc mà nó tự nhận.

## Checklist đạt bài

- [ ] Cài được Codex CLI và kiểm tra được phiên bản.
- [ ] Mở được Codex trong đúng thư mục dự án.
- [ ] Biết code đang chạy local, worktree hay cloud.
- [ ] Đăng nhập mà không làm lộ API key.
- [ ] Thực hiện được task chỉ đọc và đối chiếu câu trả lời với thực tế.
- [ ] Có checkpoint Git (`git status` sạch hoặc đã commit) trước khi cho agent sửa.

## Xem thêm

Đây là trang phụ lục, không nằm trong lộ trình chính. Cấu hình nâng cao (AGENTS.md, MCP, tự động hóa) nằm ở [bài cấu hình nâng cao](03-cau-hinh-nang-cao.md). Cách giao task và kiểm soát quyền - dùng chung cho mọi coding agent - nằm trong lộ trình chính ở [Task đầu tiên và quyền hạn an toàn](../../02-code-voi-ai/11-codex-task-dau-tien-va-quyen-han.md).
