# Spec: Landing page dịch vụ dọn dẹp nhà theo giờ — Nhà Sạch Xinh

## Mục tiêu
Một trang landing page (trang giới thiệu một trang, không cần nhiều trang con) cho dịch vụ dọn dẹp nhà theo giờ, giúp khách hàng tiềm năng hiểu dịch vụ, thấy bảng giá tham khảo, và để lại thông tin liên hệ để được tư vấn/đặt lịch.

## Người dùng
Khách hàng tiềm năng tìm dịch vụ dọn dẹp nhà qua Google hoặc mạng xã hội, phần lớn xem trên điện thoại.

## Tính năng PHẢI có
- Banner đầu trang (hero section): tên dịch vụ "Nhà Sạch Xinh", khẩu hiệu ngắn, nút bấm "Liên hệ ngay" cuộn xuống form
- Danh sách dịch vụ cung cấp, hiển thị dạng thẻ (card), gồm 3 gói:
  - Dọn dẹp theo giờ — dọn nhà định kỳ, tính theo giờ làm việc
  - Tổng vệ sinh — dọn sâu toàn bộ nhà, phù hợp dọn trước Tết hoặc chuyển nhà
  - Dọn dẹp sau xây dựng/sửa nhà — dọn bụi bẩn, rác thải sau thi công
- Bảng giá tham khảo cho 3 gói trên (đơn vị: nghìn đồng/giờ hoặc theo gói, số liệu ví dụ, không cần chính xác)
- Phần "Vì sao chọn chúng tôi" — 4 điểm mạnh dạng lưới icon + mô tả ngắn (ví dụ: nhân viên có kiểm tra lý lịch, dụng cụ dọn dẹp đầy đủ, đúng giờ, hỗ trợ đổi lịch linh hoạt)
- Form liên hệ, các trường: Họ tên, Số điện thoại, Khu vực (quận/huyện), Ghi chú (không bắt buộc)
- Form gửi thành công hiện thông báo xác nhận, không load lại trang
- Responsive: hiển thị đẹp trên cả điện thoại và máy tính

## Tính năng KHÔNG làm (bản đầu tiên)
- Không cần đặt lịch trực tuyến chọn ngày giờ cụ thể — khách để lại thông tin, nhân viên gọi lại xác nhận sau
- Không cần thanh toán online
- Không cần đăng nhập/tài khoản, không cần trang quản trị riêng
- Không cần nhiều trang — chỉ một trang duy nhất, cuộn từ trên xuống

## Công nghệ
- Frontend: HTML/CSS/JavaScript thuần (không dùng framework, không cần bước build)
- Gửi form: dùng [Formspree](https://formspree.io) — dịch vụ nhận dữ liệu form miễn phí, không cần tự viết backend. Form HTML gửi thẳng tới endpoint Formspree, Formspree chuyển tiếp nội dung vào email đã đăng ký. Cách dùng: đăng ký tài khoản Formspree miễn phí, tạo một form mới để lấy đường dẫn endpoint dạng `https://formspree.io/f/xxxxxxxx`, gắn vào thuộc tính `action` của thẻ `<form>`
- Deploy: Cloudflare Pages (miễn phí) — xem lại [`03-ha-tang-thuc-chien/03-deploy-mien-phi.md`](../../03-ha-tang-thuc-chien/03-deploy-mien-phi.md)

## Màn hình chính
Một trang duy nhất (single page), các phần theo thứ tự từ trên xuống:
1. Banner (hero section)
2. Danh sách dịch vụ (3 thẻ)
3. Bảng giá tham khảo
4. Vì sao chọn chúng tôi
5. Form liên hệ
6. Footer — số điện thoại liên hệ trực tiếp, khu vực phục vụ

## Dữ liệu cần lưu
Không cần database. Mỗi lần khách gửi form, dữ liệu (họ tên, số điện thoại, khu vực, ghi chú, thời gian gửi) được Formspree chuyển thẳng vào email — không lưu trữ gì ở phía trang web.
