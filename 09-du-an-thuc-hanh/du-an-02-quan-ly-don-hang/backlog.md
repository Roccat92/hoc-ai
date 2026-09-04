# Backlog: Quản lý đơn hàng Shop ABC

## Chưa làm
- [ ] Khởi tạo dự án — thư mục `backend/` (Express) và `frontend/` (React qua Vite), cấu trúc cơ bản
- [ ] Tạo database SQLite, bảng `don_hang` và `nguoi_dung`
- [ ] Script seed tài khoản admin — đọc `ADMIN_USERNAME`/`ADMIN_PASSWORD` từ `.env`, hash bằng bcrypt, ghi vào bảng `nguoi_dung`
- [ ] API đăng nhập `POST /api/login` — kiểm tra username/mật khẩu, trả về JWT nếu đúng
- [ ] Middleware xác thực JWT — áp dụng cho mọi API trừ `/api/login`
- [ ] Trang đăng nhập (frontend) — form, gọi API, lưu token, chuyển sang trang danh sách khi thành công
- [ ] API thêm đơn hàng `POST /api/don-hang`
- [ ] API lấy danh sách đơn hàng `GET /api/don-hang` — hỗ trợ tham số lọc theo trạng thái và tìm kiếm theo tên/SĐT
- [ ] API sửa đơn hàng `PUT /api/don-hang/:id` — bao gồm đổi trạng thái
- [ ] API xóa đơn hàng `DELETE /api/don-hang/:id`
- [ ] Trang danh sách đơn hàng (frontend) — bảng, ô tìm kiếm, bộ lọc trạng thái
- [ ] Trang thêm đơn hàng mới (frontend) — form, nối API thêm
- [ ] Trang chi tiết đơn hàng (frontend) — xem/sửa/đổi trạng thái, nút xóa có hộp thoại xác nhận
- [ ] Nút đăng xuất — xóa token, quay về trang đăng nhập
- [ ] Style responsive — kiểm tra hiển thị trên khung hình điện thoại
- [ ] Deploy lên VPS (Nginx + PM2 + SSL) theo [`03-ha-tang-thuc-chien/02-deploy-web-len-vps.md`](../../03-ha-tang-thuc-chien/02-deploy-web-len-vps.md)

## Đã xong
(trống — bắt đầu từ đầu)
