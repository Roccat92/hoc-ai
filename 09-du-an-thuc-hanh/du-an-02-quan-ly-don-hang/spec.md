# Spec: Quản lý đơn hàng Shop ABC

## Mục tiêu
Giúp chủ shop quần áo online (bán qua Facebook/Zalo) theo dõi đơn hàng qua một web nội bộ có đăng nhập, thay vì ghi vào sổ tay hay Excel rời rạc.

## Người dùng
Một người dùng duy nhất: chủ shop, đăng nhập bằng tài khoản admin (không cần đăng ký, không cần nhiều tài khoản ở bản đầu).

## Tính năng PHẢI có
- Đăng nhập bằng username/mật khẩu; phiên đăng nhập được giữ lại khi tải lại trang (không phải đăng nhập lại mỗi lần mở trang)
- Đăng xuất
- Thêm đơn hàng mới: tên khách, số điện thoại, sản phẩm, size, màu, số lượng, giá, ghi chú
- Xem danh sách đơn hàng dạng bảng, lọc theo trạng thái
- Tìm kiếm đơn hàng theo tên khách hoặc số điện thoại
- Xem chi tiết một đơn hàng, sửa thông tin, đổi trạng thái: Chờ xử lý / Đang giao / Hoàn thành / Đã hủy
- Xóa đơn hàng (có hộp thoại xác nhận trước khi xóa thật)

## Tính năng KHÔNG làm (bản đầu tiên)
- Không cần nhiều tài khoản/phân quyền — chỉ một tài khoản admin duy nhất
- Không cần tích hợp thanh toán online
- Không cần tự động gửi SMS/email cho khách khi đổi trạng thái đơn
- Không cần app di động riêng — chỉ cần web dùng tốt trên điện thoại
- Không cần chức năng "quên mật khẩu" tự động ở bản đầu (đổi mật khẩu thủ công qua database nếu cần)

## Công nghệ
- Frontend: React (khởi tạo bằng Vite cho nhanh)
- Backend: Node.js + Express
- Database: SQLite — nhẹ, không cần cài server database riêng, phù hợp một người dùng, và dễ backup (chỉ cần copy một file `.db`)
- Xác thực: mật khẩu admin mã hóa bằng **bcrypt** (không tự chế hàm mã hóa — xem lại [`10-bao-mat/05-dang-nhap-va-mat-khau.md`](../../10-bao-mat/05-dang-nhap-va-mat-khau.md)); phiên đăng nhập dùng JWT (JSON Web Token), token lưu ở phía trình duyệt và gửi kèm mỗi request cần xác thực
- Tài khoản admin: tạo qua một script seed chạy một lần lúc khởi tạo dự án, đọc `ADMIN_USERNAME` và `ADMIN_PASSWORD` từ file `.env`, hash mật khẩu bằng bcrypt rồi ghi vào database — không có form đăng ký công khai
- Deploy: VPS (xem [`03-ha-tang-thuc-chien/`](../../03-ha-tang-thuc-chien/)) — vì có backend cần chạy liên tục, không phải chỉ file tĩnh như dự án 01

## Màn hình chính
1. Đăng nhập
2. Danh sách đơn hàng — bảng, có ô tìm kiếm và bộ lọc trạng thái ở đầu trang
3. Thêm đơn hàng mới — form
4. Chi tiết đơn hàng — xem/sửa thông tin, đổi trạng thái, nút xóa (kèm xác nhận)

## Dữ liệu cần lưu
- Bảng `don_hang`: id, ten_khach, so_dien_thoai, san_pham, size, mau, so_luong, gia, trang_thai, ghi_chu, ngay_tao
- Bảng `nguoi_dung`: id, username, mat_khau_da_hash — chỉ có đúng một dòng dữ liệu (tài khoản admin), tạo qua script seed
