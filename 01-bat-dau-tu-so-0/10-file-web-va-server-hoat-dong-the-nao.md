# File, web và server hoạt động thế nào?


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người chưa biết code nhưng muốn hiểu mình đang giao AI xây cái gì. Học xong bạn sẽ phân biệt file dự án, trình duyệt, server, domain, port và request/response mà không cần học thuộc thuật ngữ.

## Một ví dụ đời thường

Khi bạn mở một website:

1. Trình duyệt gửi một **request** tới địa chỉ web.
2. **Domain** giúp tìm đúng máy chủ qua DNS.
3. **Server** nhận request, chạy code và đọc dữ liệu nếu cần.
4. Server trả **response** gồm HTML, CSS, JavaScript hoặc JSON.
5. Trình duyệt dựng giao diện và người dùng bấm tiếp.

Frontend là phần chạy gần người dùng; backend là phần xử lý và bảo vệ dữ liệu ở phía server. Một landing page tĩnh có thể chỉ cần frontend. Đăng nhập, lưu đơn hàng hoặc gọi API bí mật thường cần backend.

## File và thư mục

Thư mục dự án là chiếc hộp chứa code, ảnh, cấu hình và dependency. Đường dẫn tương đối bắt đầu từ vị trí file hiện tại; đường dẫn tuyệt đối bắt đầu từ ổ đĩa hoặc thư mục gốc. Khi Codex nói “không tìm thấy file”, trước tiên kiểm tra nó đang đứng ở thư mục nào.

## Port không phải domain

Khi chạy local, `localhost:3000` nghĩa là máy bạn, cổng 3000. Domain là địa chỉ để người khác tìm tới; port là “cửa” một chương trình đang lắng nghe. Deploy biến cửa local thành địa chỉ công khai, nhưng không tự giải quyết database, secret hay backup.

## Bài tập

Mở một dự án đang chạy, ghi lại: file khởi động, lệnh chạy, URL local, port, request nào gọi API và response trả gì. Vẽ mũi tên trình duyệt → server → database → server → trình duyệt.

## Checklist đạt bài

- [ ] Phân biệt frontend, backend và database.
- [ ] Giải thích request/response bằng ví dụ.
- [ ] Phân biệt domain, localhost và port.
- [ ] Tìm được file khởi động của dự án.
- [ ] Biết vì sao file secret không nằm ở frontend.

## Bước tiếp theo

Giờ nối giao diện với dữ liệu: [JSON, API, database và CRUD →](11-json-api-database-crud.md)
