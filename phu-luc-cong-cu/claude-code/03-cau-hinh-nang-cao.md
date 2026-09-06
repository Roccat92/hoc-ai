# Claude Code: cấu hình nâng cao (quyền hạn, skills/plugins/MCP, chế độ không tương tác)

Trang này gom cú pháp cấu hình cụ thể của Claude Code mà lộ trình chính chỉ nhắc ở mức khái niệm. Đọc khi bạn đã hiểu khái niệm ở các bài tương ứng và cần ví dụ cụ thể để làm theo.

## Quyền hạn: `.claude/settings.json`

Khái niệm chung (ba thứ cần nhìn trước khi duyệt lệnh) nằm ở [bài task đầu tiên và quyền hạn](../../02-code-voi-ai/11-codex-task-dau-tien-va-quyen-han.md). Cấu hình cụ thể và một ví dụ allowlist đầy đủ nằm ở [bài setup một lần để agent tự chạy](../../08-chuan-hoa-du-an/06-setup-mot-lan-de-agent-tu-chay.md#buoc-5-cap-quyen-cho-agent-theo-đung-khuyen-nghi-chinh-thuc-khong-phai-tu-đong-het) - không lặp lại ở đây để tránh hai nơi cùng một cấu hình dễ lệch nhau. Kiểm tra và sửa nhanh bằng lệnh `/permissions` ngay trong phiên làm việc.

## Skills, Plugins, MCP

Khái niệm chung và checklist trước khi cài nằm ở [bài skills, plugins, MCP](../../02-code-voi-ai/15-codex-skills-plugins-mcp.md). Ở Claude Code cụ thể:

- **Skills** là sổ tay quy trình nằm trong thư mục `.claude/skills/` của dự án (hoặc cài từ một plugin), Claude tự đọc khi thấy phù hợp với yêu cầu.
- **Plugins** đóng gói skill, lệnh và MCP để cài một lần, dùng lại cho nhiều dự án.
- **MCP** nối Claude với công cụ/dữ liệu ngoài - nhận ra qua tiền tố `mcp__` trên tên tool khi Claude Code liệt kê công cụ đang có. Quản lý qua lệnh `claude mcp` hoặc file cấu hình dự án.

Checklist năm câu ở bài gốc (nguồn đáng tin, đọc được gì, quyền ghi/xóa, chạy chỉ-đọc trước được không, cách gỡ) áp dụng nguyên vẹn cho cả ba loại trên.

## Subagent và chế độ không tương tác

Khái niệm chung (khi nào tách agent, hợp đồng input/output cho job tự động) nằm ở [bài subagent và tự động hóa](../../02-code-voi-ai/16-codex-subagent-va-tu-dong-hoa.md). Ở Claude Code:

- **Subagent** (đôi khi gọi là Agent hoặc Task) là một phiên Claude con được giao một việc thu hẹp, chạy độc lập rồi báo kết quả về - dùng cho việc thật sự độc lập (một agent đọc tài liệu, một agent rà test), không dùng cho hai việc cùng sửa một file.
- **Chế độ không tương tác** dùng cờ `-p` (print/headless), ví dụ `claude -p "Rà link chết trong docs/, in báo cáo. Không sửa file."` - vai trò giống hệt `codex exec` của Codex: nhận thẳng prompt, không hỏi lại, hợp cho script và CI.

## Model và hạn mức

Khái niệm chọn model theo độ khó nằm ở [bài model, reasoning và hạn mức](../../02-code-voi-ai/14-codex-model-reasoning-va-han-muc.md). Lệnh cụ thể: `/model` để xem hoặc đổi model ngay trong phiên (Sonnet/Opus/Haiku tùy độ khó việc), `/cost` để xem chi phí phiên hiện tại, `/help` nếu không thấy lệnh vì tên có thể đổi theo phiên bản.

## Xem thêm

[Cài đặt và lệnh cơ bản](01-cai-dat-va-lenh-co-ban.md) - [Chi phí và các gói](02-chi-phi-cac-goi.md) - [Cấu hình Codex tương đương](../codex/03-cau-hinh-nang-cao.md).
