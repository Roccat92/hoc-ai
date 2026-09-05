# JSON, API, database và CRUD


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người chuẩn bị làm ứng dụng có dữ liệu như đơn hàng, thành viên hoặc bài viết. Học xong bạn sẽ hiểu một bản ghi đi từ form tới database và quay lại màn hình ra sao.

## JSON là gói dữ liệu

JSON là văn bản có cấu trúc để các phần của hệ thống trao đổi với nhau:

```json
{
  "id": 12,
  "customer": "Lan",
  "status": "new"
}
```

Tên trường phải rõ, kiểu dữ liệu nhất quán và không đưa secret vào JSON gửi ra trình duyệt.

## API là cửa giao tiếp

Frontend gọi API bằng request; backend kiểm tra quyền và dữ liệu rồi trả response. Một quy ước thường gặp:

| Hành động | HTTP | Ví dụ |
|---|---|---|
| Đọc danh sách | GET | `/api/orders` |
| Tạo mới | POST | `/api/orders` |
| Sửa | PATCH/PUT | `/api/orders/12` |
| Xóa | DELETE | `/api/orders/12` |

CRUD là viết tắt của Create, Read, Update, Delete. API tốt trả mã lỗi dễ hiểu, không tin dữ liệu từ trình duyệt và không cho người dùng sửa bản ghi của người khác.

## Database giữ dữ liệu lâu dài

Biến trong bộ nhớ sẽ mất khi server khởi động lại; database giữ dữ liệu trên đĩa hoặc dịch vụ quản lý. SQLite hợp để học và app nhỏ; khi nhiều người dùng hoặc cần scale, xem xét Postgres/managed database. Dù chọn gì, phải có migration, backup và cách khôi phục.

## Bài tập

Vẽ luồng tạo đơn hàng: form → `POST /api/orders` → validate → database → JSON response → cập nhật danh sách. Ghi một lỗi có thể xảy ra ở mỗi mũi tên.

## Checklist đạt bài

- [ ] Đọc được JSON đơn giản.
- [ ] Phân biệt GET, POST, PATCH và DELETE.
- [ ] Giải thích CRUD.
- [ ] Biết vì sao cần validate ở backend.
- [ ] Biết database production cần backup và migration.

## Bước tiếp theo

Nền tảng đã đủ để đọc code AI viết; giờ quay lại quy trình xây sản phẩm: [Claude Code: cài đặt và bắt đầu →](../02-code-voi-ai/01-claude-code.md)
