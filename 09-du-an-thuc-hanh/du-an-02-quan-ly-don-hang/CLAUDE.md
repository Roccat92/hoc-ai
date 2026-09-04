# Quản lý đơn hàng Shop ABC

## Quy ước chung
- Ngôn ngữ giao tiếp: tiếng Việt
- Frontend: React (Vite), function component + hooks, không dùng class component
- Backend: Node.js + Express, tách route/controller ra file riêng, không viết dồn hết vào một file
- Database: dùng thư viện SQLite có prepared statements (ví dụ `better-sqlite3`) - không tự nối chuỗi SQL từ input người dùng

## Cấu trúc thư mục
- `backend/` - server Express, file database SQLite
- `backend/routes/` - các route API, mỗi nhóm chức năng một file
- `backend/db/` - kết nối database, script seed
- `frontend/` - dự án React (Vite)
- `frontend/src/pages/` - mỗi trang một file

## Điều cấm làm
- Không tự chế hàm mã hóa mật khẩu - luôn dùng bcrypt (xem [`10-bao-mat/05-dang-nhap-va-mat-khau.md`](../../10-bao-mat/05-dang-nhap-va-mat-khau.md))
- Không nối chuỗi SQL trực tiếp từ input người dùng - luôn dùng prepared statements, chống SQL injection
- Không lưu JWT secret hay bất kỳ secret nào trực tiếp trong code - luôn đọc từ `.env` (xem [`10-bao-mat/03-giau-api-key-va-secret.md`](../../10-bao-mat/03-giau-api-key-va-secret.md))
- Không tự thêm thư viện ngoài dự tính nếu chưa hỏi trước

## Lưu ý riêng của dự án
- Luôn đọc `spec.md` và `backlog.md` trước khi bắt đầu một task mới
- Mọi API trừ `/api/login` phải đi qua middleware kiểm tra JWT trước khi xử lý
- Đây là dự án học tập theo mẫu - ưu tiên giải thích ngắn gọn code đang làm gì
