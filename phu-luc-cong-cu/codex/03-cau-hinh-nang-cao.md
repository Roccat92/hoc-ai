# Codex: cấu hình nâng cao (AGENTS.md, MCP, tự động hóa)

Trang này gom cú pháp cấu hình cụ thể của Codex mà lộ trình chính chỉ nhắc ở mức khái niệm, để phần đó không phình thành một bài dài riêng cho Codex. Đọc khi bạn đã hiểu khái niệm ở các bài tương ứng trong lộ trình chính và cần ví dụ cụ thể để làm theo.

## AGENTS.md đầy đủ

Khái niệm chung (file hướng dẫn agent, đặt ở thư mục gốc) nằm ở [bài prompt và ngữ cảnh](../../02-code-voi-ai/12-codex-prompt-ngu-canh-va-agents-md.md). Codex tự đọc `AGENTS.md` mỗi phiên. Ví dụ cho một web app quản lý đơn hàng:

```markdown
# AGENTS.md - quy ước cho agent

## Stack
- Next.js + TypeScript, database Supabase.

## Lệnh kiểm tra (chạy trước khi coi là xong)
- Cài: `npm install`
- Chạy test: `npm test`
- Build: `npm run build`

## Quy ước
- Tên biến/hàm bằng tiếng Anh, comment giải thích "vì sao" bằng tiếng Việt.
- Tiền luôn lưu bằng số nguyên (đơn vị đồng), không dùng số thực.

## Khu vực nhạy cảm - hỏi trước khi đụng
- Thư mục `migrations/`: đổi schema database.
- File `.env`: biến môi trường và secret.

## Cấm
- Không commit khi test đang đỏ.
- Không thêm dependency mới nếu chưa hỏi.
```

Để ngắn và cụ thể. Một `AGENTS.md` 10-20 dòng agent đọc hết còn hơn 200 dòng nó bỏ qua nửa chừng. Nếu một thư mục con có quy ước riêng, đặt một `AGENTS.md` nhỏ ngay trong thư mục đó cho phạm vi hẹp.

## MCP: khai báo trong file cấu hình

Khái niệm chung và checklist năm câu trước khi cài nằm ở [bài skills, plugins, MCP](../../02-code-voi-ai/15-codex-skills-plugins-mcp.md). Về mặt cấu hình, MCP được khai báo trong file cấu hình của Codex (tên MCP + lệnh chạy + tham số) - sơ đồ đại khái:

```text
[mcp_servers.tai-lieu]
command = "lệnh-khởi-động-mcp"
args = ["--doc", "duong-dan-hoac-url"]
```

> Đây là sơ đồ để bạn hình dung, **không phải cú pháp copy-paste**. Vị trí file cấu hình và cú pháp chính xác đổi theo phiên bản Codex - luôn lấy từ [tài liệu chính thức](https://developers.openai.com/codex) hoặc `codex --help`, đừng chép nguyên từ đây.

## `codex exec`: chạy không tương tác

Khái niệm chung (khi nào tự động hóa, hợp đồng input/output) nằm ở [bài subagent và tự động hóa](../../02-code-voi-ai/16-codex-subagent-va-tu-dong-hoa.md). Cú pháp cụ thể:

```bash
codex exec "Rà tất cả file Markdown trong docs/, liệt kê link chết theo dạng bảng. Chỉ đọc, không sửa file."
```
- `codex exec`: chạy Codex một lượt rồi thoát, hợp cho script/CI (khác `codex` bản tương tác ngồi hỏi đáp).
- Chuỗi trong ngoặc kép: prompt - phải tự chứa đủ input, output mong muốn và giới hạn, vì không có ai ngồi làm rõ giữa chừng.
- Xem `codex exec --help` để biết các cờ hiện có (chọn model, thư mục làm việc, định dạng đầu ra...) - tên cờ đổi theo phiên bản nên đừng chép từ bài cũ.

Dùng trong GitHub Actions, ví dụ rà link mỗi khi có pull request:

```yaml
name: Rà link tài liệu
on: [pull_request]
jobs:
  ra-link:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g @openai/codex
      - run: codex exec "Rà link chết trong docs/, in báo cáo. Không sửa file."
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```
- `secrets.OPENAI_API_KEY`: khóa để trong GitHub Secrets, **không** viết thẳng vào file - xem [giấu API key](../../10-bao-mat/03-giau-api-key-va-secret.md).
- Job này chỉ đọc và in báo cáo; commit hay deploy thì tách bước riêng có phê duyệt.

## Xem thêm

[Cài đặt và lệnh cơ bản](01-cai-dat-va-lenh-co-ban.md) - [Chi phí và các gói](02-chi-phi-cac-goi.md) - [Cấu hình Claude Code tương đương](../claude-code/03-cau-hinh-nang-cao.md).
