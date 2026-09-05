# Cài một coding agent và chạy task đầu tiên

Bài này dành cho người đã cài xong Node.js ([bài trước](../01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md)) và muốn bắt đầu code cùng AI thật sự. Học xong bạn sẽ cài được một coding agent (công cụ dòng lệnh đọc/sửa file, chạy lệnh thay bạn), đăng nhập, và tự tay chạy một task chỉ đọc đầu tiên để thấy nó hoạt động ra sao trước khi giao việc thật.

## Chọn Claude Code hay Codex?

Cả hai làm cùng một việc: nhận yêu cầu bằng tiếng Việt, đọc và sửa file trong dự án, chạy lệnh terminal thay bạn. Khác nhau chủ yếu ở hãng đứng sau (Anthropic và OpenAI) và cách tính phí. Dùng cái nào không quan trọng bằng việc hiểu đúng cách làm việc với nó - toàn bộ phần còn lại của mục này viết chung cho cả hai, chỉ đổi tên lệnh gõ trên terminal.

| | Claude Code | Codex |
|---|---|---|
| Cài | `npm install -g @anthropic-ai/claude-code` | `npm install -g @openai/codex` |
| Kiểm tra | `claude --version` | `codex --version` |
| Mở phiên | `claude` | `codex` |

Chưa chắc chọn cái nào? Cứ chọn một cái, làm quen, đổi sau cũng không mất gì - cách làm việc học được ở đây dùng chung cho cả hai. Lệnh cài đặt có thể đổi theo phiên bản; nếu báo lỗi, xem [phụ lục Claude Code](../phu-luc-cong-cu/claude-code/01-cai-dat-va-lenh-co-ban.md) hoặc [phụ lục Codex](../phu-luc-cong-cu/codex/01-cai-dat-va-lenh-co-ban.md) - nơi có hướng dẫn đầy đủ và bảng giá quy ra VND cho từng công cụ.

## Đăng nhập lần đầu

Vào thư mục dự án, gõ đúng tên lệnh của công cụ bạn chọn (`claude` hoặc `codex`). Lần đầu chạy, nó sẽ hỏi đăng nhập bằng tài khoản (Claude.ai / ChatGPT) hoặc bằng API key riêng. Làm theo hướng dẫn trên màn hình - thường mở trình duyệt để bạn xác nhận. **Đừng dán API key trực tiếp vào chat**, và đừng commit key vào repo - xem [giấu API key và secret](../10-bao-mat/03-giau-api-key-va-secret.md).

## Task chỉ đọc đầu tiên

Với một dự án còn lạ, việc đầu tiên nên làm là yêu cầu agent chỉ đọc, chưa sửa gì - để bạn kiểm tra nó hiểu đúng cấu trúc trước khi giao việc thật:

```text
Hãy chỉ đọc, chưa sửa file nào.
1. Tóm tắt cấu trúc thư mục.
2. Chỉ ra file khởi động và lệnh test hiện có.
3. Nêu ba điều bạn chưa chắc về dự án này.
```

Nếu câu trả lời sai cấu trúc cơ bản (ví dụ nói có bước build trong khi dự án là trang tĩnh), dừng lại và hỏi thêm trước khi giao task sửa code.

## Bài tập

Cài một coding agent, đăng nhập, mở một thư mục dự án bất kỳ (kể cả thư mục trống), chạy đúng prompt chỉ đọc ở trên và đọc kỹ câu trả lời.

## Checklist đạt bài

- [ ] Cài được một coding agent và kiểm tra được phiên bản.
- [ ] Đăng nhập mà không làm lộ API key.
- [ ] Chạy được task chỉ đọc và đọc hiểu câu trả lời.

## Bước tiếp theo

Đã có công cụ, giờ xem qua các lựa chọn AI IDE khác để biết công cụ nào hợp với bạn: [Cursor, Windsurf, Copilot - so sánh](02-cursor-windsurf-copilot.md)
