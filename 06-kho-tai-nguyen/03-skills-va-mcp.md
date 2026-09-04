# Claude skills và MCP servers hữu ích

Bài này dành cho người đã quen dùng Claude Code và muốn mở rộng khả năng của nó - không chỉ code, mà kết nối với công cụ, dữ liệu bên ngoài, hoặc dùng lại các quy trình làm việc đã được người khác đóng gói sẵn. Học xong bạn sẽ biết Claude skills và MCP server là gì, và tìm chúng ở đâu.

## Claude skills là gì?

**Skill** là một gói hướng dẫn/quy trình làm việc đã được đóng gói sẵn cho một loại tác vụ cụ thể - khi bạn (hoặc Claude) gọi tới một skill, Claude sẽ làm theo đúng quy trình/kiến thức chuyên biệt đã được định nghĩa trong đó, thay vì phải mô tả lại từ đầu mỗi lần. Có thể hình dung skill giống như một "công thức nấu ăn" chi tiết cho một loại việc cụ thể (ví dụ: quy trình review code, quy trình tạo tài liệu Word theo chuẩn công ty, quy trình deploy một loại dự án cụ thể) - dùng lại được nhiều lần, chia sẻ được cho người khác.

Tìm hiểu thêm và tài liệu chính thức tại docs.claude.com (tài liệu Claude Code/Claude API của Anthropic) - tìm mục liên quan tới "Skills" hoặc "Agent Skills".

<figure style="max-width:560px;margin:24px auto">
<svg id="mh-skill" viewBox="0 0 480 176" width="100%" role="img" aria-label="Cùng một yêu cầu: AI không có skill trả lời chung chung, AI có skill trả lời đúng mẫu công ty" style="font-family:inherit;display:block">
  <text x="20" y="46" style="fill:currentColor;font-size:14px;font-weight:600;font-size:12px">"Viết email xin nghỉ phép"</text>
<path d="M178 42 H202 M195 37 L202 42 L195 47" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <rect x="210" y="22" width="80" height="40" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="250" y="47" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">AI</text>
<path d="M298 42 H322 M315 37 L322 42 L315 47" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <text x="330" y="46" style="fill:var(--vp-c-text-2);font-size:12px">trả lời chung chung</text>
  <text x="20" y="136" style="fill:currentColor;font-size:14px;font-weight:600;font-size:12px">"Viết email xin nghỉ phép"</text>
<path d="M178 132 H202 M195 127 L202 132 L195 137" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <rect class="mh-anim" x="210" y="108" width="80" height="48" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:1;stroke-width:2;animation:mh-skill-g 5s ease-in-out infinite"/>
  <text x="250" y="129" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">AI</text>
  <text x="250" y="146" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">+ sổ tay skill</text>
<path d="M298 132 H322 M315 127 L322 132 L315 137" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <g class="mh-anim" style="animation:mh-skill-in 5s ease-in-out infinite">
    <text x="330" y="124" style="fill:currentColor;font-size:14px;font-weight:600;font-size:12px">đúng mẫu công ty:</text>
    <text x="330" y="140" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px">kính gửi, lý do,</text>
    <text x="330" y="154" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px">thời gian, người bàn giao</text>
  </g>
</svg>
<figcaption style="text-align:center;font-size:14px;color:var(--vp-c-text-2);margin-top:8px">Cùng một yêu cầu, có skill thì AI làm theo đúng quy trình đã đóng gói thay vì trả lời chung chung.</figcaption>
</figure>

## MCP server là gì? (nhắc lại)

Đã giới thiệu ở [`04-build-ung-dung-ai/03-ai-agent.md`](../04-build-ung-dung-ai/03-ai-agent.md): MCP (Model Context Protocol) là chuẩn mở giúp AI kết nối với công cụ/dữ liệu bên ngoài theo cách chuẩn hóa. Một **MCP server** là một chương trình nhỏ tuân theo chuẩn này, cung cấp cho AI khả năng cụ thể - ví dụ: đọc/ghi file trên máy, truy vấn một database, thao tác với GitHub, tìm kiếm web, điều khiển trình duyệt.

## Tìm MCP server ở đâu?

- **modelcontextprotocol.io** - trang chủ chính thức của chuẩn MCP, có tài liệu, danh sách server tham khảo.
- **GitHub: modelcontextprotocol/servers** - kho chứa các MCP server chính thức và được cộng đồng đóng góp, chia theo nhiều nhóm chức năng (làm việc với file hệ thống, database, các dịch vụ web phổ biến...).
- **Cộng đồng GitHub nói chung** - tìm kiếm "MCP server" kèm tên dịch vụ bạn muốn kết nối (ví dụ "MCP server Notion", "MCP server Google Sheets") - hệ sinh thái MCP phát triển rất nhanh, nhiều server mới được cộng đồng viết liên tục.

## Cách thêm MCP server vào Claude Code

Claude Code có lệnh riêng để quản lý MCP server, ví dụ thêm một server mới:
```bash
claude mcp add
```
Lệnh này sẽ hướng dẫn bạn qua từng bước cấu hình. Chi tiết cú pháp và các tùy chọn có thể thay đổi giữa các phiên bản - dùng `claude mcp --help` hoặc hỏi thẳng Claude Code: "hướng dẫn tôi cách thêm MCP server [tên server] vào cấu hình hiện tại" để có hướng dẫn chính xác với phiên bản bạn đang dùng.

## Lưu ý an toàn khi cài skill/MCP server từ cộng đồng

Skill và MCP server có thể **cho phép AI thực hiện hành động thật** (đọc file, gọi API, thao tác dữ liệu) - vì vậy:
- **Chỉ cài từ nguồn đáng tin cậy** (tài liệu chính thức Anthropic, tổ chức/tác giả có uy tín rõ ràng trên GitHub, được nhiều người dùng/đánh giá tốt).
- **Đọc qua mã nguồn** (hoặc nhờ Claude Code đọc và tóm tắt giúp: "đọc qua MCP server này và cho tôi biết nó làm gì, có gì đáng lo về bảo mật không") trước khi cấp quyền truy cập vào dữ liệu nhạy cảm.
- **Không cấp quyền rộng hơn mức cần thiết** - ví dụ nếu chỉ cần MCP server đọc file trong một thư mục cụ thể, đừng cấu hình cho nó quyền truy cập toàn bộ ổ đĩa.

## Bước tiếp theo

Ngoài công cụ, học cùng cộng đồng cũng là cách học nhanh - xem các nhóm, diễn đàn tiếng Việt về AI: [Cộng đồng Việt](04-cong-dong-viet.md)
