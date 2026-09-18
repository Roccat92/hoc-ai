# Grok Bot: cấu hình nâng cao — Computer, connector, routine, Auto-review

Trang này gom chi tiết đặc thù của Grok Bot mà lộ trình chính chỉ nhắc ở mức khái niệm. Đọc khi bạn đã chạy được task cơ bản ở [bài cài đặt](01-cai-dat-va-lenh-co-ban.md).

## Computer và máy local

- **Computer của Bot:** nơi agent cài tool, lưu scratch (`/workspace`), giữ session trình duyệt. Agent khác của cùng user **chia sẻ** filesystem/login máy này nhưng **không** chia sẻ màn hình desktop từng agent.
- **Máy local đã đăng ký:** Settings → Computer → danh sách máy. Mọi lệnh đụng file trên máy bạn cần bạn duyệt trên máy đó.
- **Update Computer** trước khi **Reset**. Reset có thể mất việc chưa đồng bộ.

Khái niệm quyền hạn agent nói chung: [task đầu tiên và quyền hạn](../../02-code-voi-ai/11-codex-task-dau-tien-va-quyen-han.md).

## Connector / MCP / plugin

Grok Bot nối dịch vụ ngoài (GitHub, lịch, chat…) qua **connector / MCP / plugin** trong app — không phải file `.claude/settings.json` kiểu Claude Code.

Checklist trước khi cài (áp dụng như bài skills/MCP của lộ trình):

1. Nguồn có đáng tin không?
2. Connector đọc được gì / ghi được gì?
3. Có quyền xóa hoặc gửi tin không?
4. Thử chỉ-đọc trước được không?
5. Cách gỡ / thu hồi quyền?

Khái niệm chung: [skills, plugins, MCP](../../02-code-voi-ai/15-codex-skills-plugins-mcp.md).

**Đừng** đưa token vào chat để “cho nhanh”. Dùng luồng secret/masked của app.

## Routine (việc chạy nền)

Routine = prompt đã lưu + **lịch** (cron) hoặc **listener sự kiện** (ví dụ PR GitHub, tin Slack — tùy connector đã bật).

- Tạo khi việc **lặp** hoặc “báo tôi khi X”, đừng để agent thức cả ngày.
- Prompt routine viết theo **ý định** (“tóm tắt PR mới, chỉ ping khi có review request”), không đóng băng một chuỗi lệnh tool sẽ lỗi khi schema đổi.
- Routine “không có gì để báo thì im” là hợp lệ — tránh filler “no change”.

Quản lý: info pane agent → danh sách Routines (bật/tắt/sửa từ đó theo UI hiện tại).

## Auto-review và việc nguy hiểm

Một số thao tác (lệnh Shell trên Computer, hành động Computer GUI, MCP ghi, tạo routine, cloud agent…) có **Auto-review** tự chạy.

- Bị chặn: ưu tiên cách **an toàn hơn cùng mục tiêu** (đọc thay vì ghi, hẹp scope), không tìm đường vòng lấy cookie/session.
- Việc bạn thật sự muốn: dùng luồng duyệt của app (approval card), không “encode lệnh” để lách.
- Gửi email/Slack/tin nhắn ra ngoài: chỉ khi bạn **nói rõ** nội dung và người nhận, hoặc routine đã ghi đúng việc đó. Không chắc thì nhờ agent **draft**.

## Skills và memory

- **Skill:** sổ tay quy trình dùng lại được giữa agent (thư viện chung). Mô tả kiểu “dùng khi …”.
- **Memory:** fact bền về user/agent (profile vs log). Đừng nhét secret vào memory.
- **Group chat / teammate:** nhiều agent trong một room; brief ngắn, đừng spam cả nhóm một việc.

Khái niệm subagent / tự động hóa ở lộ trình: [subagent và tự động hóa](../../02-code-voi-ai/16-codex-subagent-va-tu-dong-hoa.md) — Grok Bot có executor/background riêng trong phiên; bạn giao việc ở mức mục tiêu, không cần nhắc tên machinery nội bộ.

## Updates

Settings → **Updates**:

- **Update Track** (Stable / Nightly) và “Check for Updates” = cập nhật **app** Grok Bot.
- **Update Grok Bot's Computer** = làm mới **máy agent**, khác hẳn cập nhật app.

## Xem thêm

[Cài đặt và dùng cơ bản](01-cai-dat-va-lenh-co-ban.md) · [Chi phí và các gói](02-chi-phi-cac-goi.md) · [Claude Code cấu hình nâng cao](../claude-code/03-cau-hinh-nang-cao.md) · [Codex cấu hình nâng cao](../codex/03-cau-hinh-nang-cao.md)
