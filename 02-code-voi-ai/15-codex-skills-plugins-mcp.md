# Skills, plugins và MCP cho coding agent

Bài này dành cho người thấy nhiều gói mở rộng nhưng chưa biết cái nào đáng cài - cả Codex lẫn Claude Code đều có ba loại mở rộng này, tên gọi giống nhau vì cùng khái niệm. Học xong bạn sẽ phân biệt skill, plugin và MCP, đánh giá quyền truy cập, và thử một kết nối chỉ đọc.

## Ba khái niệm

- **Skill:** sổ tay quy trình hoặc hướng dẫn chuyên môn giúp agent làm một loại việc lặp lại.
- **Plugin:** gói có thể gồm skill, tool, cấu hình hoặc giao diện.
- **MCP:** giao thức chuẩn để nối agent với công cụ hoặc dữ liệu bên ngoài.

Prompt thường là đủ cho một task đơn lẻ. Chỉ thêm mở rộng khi quy trình lặp lại, cần tool thật hoặc cần chia sẻ cho cả nhóm.

## Checklist trước khi cài

1. Nguồn có đáng tin và còn được duy trì không?
2. Nó đọc được file, biến môi trường hay dịch vụ nào?
3. Có quyền ghi, xóa, deploy hoặc gửi dữ liệu không?
4. Có thể chạy chế độ chỉ đọc trước không?
5. Cách gỡ và cách thu hồi token là gì?

Không cài hàng loạt plugin theo danh sách trên mạng. Mỗi kết nối thêm vào làm tăng bề mặt tấn công, lượng ngữ cảnh và đôi khi cả chi phí.

## Áp checklist vào một ví dụ thật

Giả sử bạn muốn cho Codex đọc tài liệu của một thư viện qua một MCP chỉ-đọc. Trước khi cài, điền đúng bảng năm câu:

| Câu hỏi | Trả lời cho MCP đọc-tài-liệu này |
|---|---|
| Nguồn có đáng tin, còn duy trì? | Repo chính chủ của thư viện, cập nhật gần đây |
| Đọc được gì? | Chỉ nội dung tài liệu công khai |
| Có quyền ghi/xóa/deploy/gửi dữ liệu? | Không - chỉ truy vấn đọc |
| Chạy chỉ-đọc trước được không? | Được, đây vốn là MCP chỉ đọc |
| Cách gỡ / thu hồi? | Xóa khai báo trong file cấu hình |

Điền được cả năm mới cài. Về mặt cấu hình, MCP được khai báo trong một file cấu hình của agent (tên MCP + lệnh chạy + tham số) - cú pháp chính xác khác nhau giữa Codex và Claude Code, và đổi theo phiên bản, nên xem ví dụ cụ thể ở phụ lục [Codex](../phu-luc-cong-cu/codex/03-cau-hinh-nang-cao.md#mcp-khai-bao-trong-file-cau-hinh) hoặc [Claude Code](../phu-luc-cong-cu/claude-code/03-cau-hinh-nang-cao.md#skills-plugins-mcp) thay vì chép nguyên một sơ đồ dễ lỗi thời ở đây.

## Bài tập

Chọn một MCP đọc tài liệu công khai. Viết bảng gồm nguồn, quyền, dữ liệu đi qua, thao tác có side effect và cách tắt. Chỉ thử truy vấn đọc; chưa cấp quyền ghi.

## Checklist đạt bài

- [ ] Phân biệt skill, plugin và MCP.
- [ ] Đọc được quyền trước khi cài.
- [ ] Biết thử chế độ chỉ đọc.
- [ ] Biết gỡ hoặc thu hồi kết nối.
- [ ] Không đưa secret vào prompt hay file hướng dẫn.

## Bước tiếp theo

Kết nối đã an toàn ở mức cơ bản, giờ xem khi nào nên làm song song hoặc tự động hóa: [Subagent và tự động hóa →](16-codex-subagent-va-tu-dong-hoa.md)
