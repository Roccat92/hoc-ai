# Skills, plugins và MCP trong Codex


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người thấy nhiều gói mở rộng nhưng chưa biết cái nào đáng cài. Học xong bạn sẽ phân biệt skill, plugin và MCP, đánh giá quyền truy cập, và thử một kết nối chỉ đọc.

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
