# Backlog: Trợ Lý Tài Liệu

## Chưa làm
- [ ] Khởi tạo dự án - `backend/` (FastAPI) và `frontend/` (React qua Vite), cấu trúc cơ bản
- [ ] Database SQLite - bảng `tai_lieu` và `nguoi_dung`
- [ ] Script seed tài khoản admin + một tài khoản nhân viên mẫu - đọc từ `.env`, hash bằng bcrypt
- [ ] API đăng nhập + middleware xác thực JWT (tái dùng cách làm ở dự án 02)
- [ ] Trang đăng nhập (frontend)
- [ ] API upload tài liệu `.txt`/`.pdf` - chỉ admin gọi được
- [ ] Xử lý chia nhỏ (chunking) nội dung file vừa upload
- [ ] Tạo embedding cho từng đoạn, lưu vào Chroma kèm liên kết ngược về file gốc
- [ ] Trang quản lý tài liệu (frontend, chỉ admin thấy) - upload, danh sách, xóa
- [ ] API xóa tài liệu - xóa cả bản ghi trong `tai_lieu` lẫn các đoạn embedding liên quan trong Chroma
- [ ] API hỏi đáp: nhận câu hỏi → tạo embedding câu hỏi → tìm đoạn liên quan trong Chroma → gọi API Claude kèm ngữ cảnh tìm được → trả lời kèm danh sách nguồn trích dẫn
- [ ] Xử lý trường hợp không tìm thấy đoạn liên quan - trả lời "không tìm thấy thông tin này trong tài liệu hiện có" thay vì bịa
- [ ] Trang chat (frontend) - khung chat, hiển thị câu trả lời kèm khối nguồn trích dẫn rõ ràng
- [ ] Style responsive
- [ ] Deploy lên VPS (Nginx + PM2 + SSL) theo [`03-ha-tang-thuc-chien/02-deploy-web-len-vps.md`](../../03-ha-tang-thuc-chien/02-deploy-web-len-vps.md)

## Đã xong
(trống - bắt đầu từ đầu)
