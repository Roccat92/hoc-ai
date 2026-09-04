# Claude skills và MCP servers hữu ích

Bài này dành cho người đã quen dùng Claude Code và muốn mở rộng khả năng của nó — không chỉ code, mà kết nối với công cụ, dữ liệu bên ngoài, hoặc dùng lại các quy trình làm việc đã được người khác đóng gói sẵn. Học xong bạn sẽ biết Claude skills và MCP server là gì, và tìm chúng ở đâu.

## Claude skills là gì?

**Skill** là một gói hướng dẫn/quy trình làm việc đã được đóng gói sẵn cho một loại tác vụ cụ thể — khi bạn (hoặc Claude) gọi tới một skill, Claude sẽ làm theo đúng quy trình/kiến thức chuyên biệt đã được định nghĩa trong đó, thay vì phải mô tả lại từ đầu mỗi lần. Có thể hình dung skill giống như một "công thức nấu ăn" chi tiết cho một loại việc cụ thể (ví dụ: quy trình review code, quy trình tạo tài liệu Word theo chuẩn công ty, quy trình deploy một loại dự án cụ thể) — dùng lại được nhiều lần, chia sẻ được cho người khác.

Tìm hiểu thêm và tài liệu chính thức tại docs.claude.com (tài liệu Claude Code/Claude API của Anthropic) — tìm mục liên quan tới "Skills" hoặc "Agent Skills".

## MCP server là gì? (nhắc lại)

Đã giới thiệu ở [`04-build-ung-dung-ai/03-ai-agent.md`](../04-build-ung-dung-ai/03-ai-agent.md): MCP (Model Context Protocol) là chuẩn mở giúp AI kết nối với công cụ/dữ liệu bên ngoài theo cách chuẩn hóa. Một **MCP server** là một chương trình nhỏ tuân theo chuẩn này, cung cấp cho AI khả năng cụ thể — ví dụ: đọc/ghi file trên máy, truy vấn một database, thao tác với GitHub, tìm kiếm web, điều khiển trình duyệt.

## Tìm MCP server ở đâu?

- **modelcontextprotocol.io** — trang chủ chính thức của chuẩn MCP, có tài liệu, danh sách server tham khảo.
- **GitHub: modelcontextprotocol/servers** — kho chứa các MCP server chính thức và được cộng đồng đóng góp, chia theo nhiều nhóm chức năng (làm việc với file hệ thống, database, các dịch vụ web phổ biến...).
- **Cộng đồng GitHub nói chung** — tìm kiếm "MCP server" kèm tên dịch vụ bạn muốn kết nối (ví dụ "MCP server Notion", "MCP server Google Sheets") — hệ sinh thái MCP phát triển rất nhanh, nhiều server mới được cộng đồng viết liên tục.

## Cách thêm MCP server vào Claude Code

Claude Code có lệnh riêng để quản lý MCP server, ví dụ thêm một server mới:
```bash
claude mcp add
```
Lệnh này sẽ hướng dẫn bạn qua từng bước cấu hình. Chi tiết cú pháp và các tùy chọn có thể thay đổi giữa các phiên bản — dùng `claude mcp --help` hoặc hỏi thẳng Claude Code: "hướng dẫn tôi cách thêm MCP server [tên server] vào cấu hình hiện tại" để có hướng dẫn chính xác với phiên bản bạn đang dùng.

## Lưu ý an toàn khi cài skill/MCP server từ cộng đồng

Skill và MCP server có thể **cho phép AI thực hiện hành động thật** (đọc file, gọi API, thao tác dữ liệu) — vì vậy:
- **Chỉ cài từ nguồn đáng tin cậy** (tài liệu chính thức Anthropic, tổ chức/tác giả có uy tín rõ ràng trên GitHub, được nhiều người dùng/đánh giá tốt).
- **Đọc qua mã nguồn** (hoặc nhờ Claude Code đọc và tóm tắt giúp: "đọc qua MCP server này và cho tôi biết nó làm gì, có gì đáng lo về bảo mật không") trước khi cấp quyền truy cập vào dữ liệu nhạy cảm.
- **Không cấp quyền rộng hơn mức cần thiết** — ví dụ nếu chỉ cần MCP server đọc file trong một thư mục cụ thể, đừng cấu hình cho nó quyền truy cập toàn bộ ổ đĩa.

## Bước tiếp theo

Ngoài công cụ, học cùng cộng đồng cũng là cách học nhanh — xem các nhóm, diễn đàn tiếng Việt về AI: [Cộng đồng Việt](04-cong-dong-viet.md)
