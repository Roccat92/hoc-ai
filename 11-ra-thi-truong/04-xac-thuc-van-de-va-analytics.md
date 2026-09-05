# Xác thực vấn đề, analytics và phản hồi người dùng


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người sắp public sản phẩm và muốn biết người dùng có thật sự cần nó không. Học xong bạn sẽ phỏng vấn không dẫn dắt, chọn vài metric có ích, đo luồng chính và biến phản hồi thành backlog.

## Phỏng vấn trước khi build thêm

Hỏi về hành vi đã xảy ra: “Lần gần nhất bạn xử lý việc này thế nào?”, “Mất bao lâu?”, “Bạn đã thử công cụ nào?”. Tránh hỏi “Bạn có dùng app của mình không?” vì người ta thường lịch sự trả lời có.

Ghi lại vấn đề, cách giải quyết hiện tại, tần suất, chi phí và điều khiến họ bỏ cuộc. Tìm mẫu lặp giữa nhiều người, không xây tính năng chỉ vì một ý kiến đơn lẻ.

## Metric tối thiểu

- Người dùng hoàn thành luồng chính.
- Tỷ lệ quay lại sau một khoảng thời gian.
- Thời gian tới giá trị đầu tiên.
- Lỗi hoặc bước bị bỏ dở.
- Phản hồi tốt/xấu gắn với phiên bản.

Đặt tên sự kiện rõ, không thu thập dữ liệu không cần. Thông báo mục đích, thời gian lưu và quyền xóa nếu có dữ liệu cá nhân.

## Vòng lặp phản hồi

1. Gom feedback vào một nơi.
2. Gắn nhãn: lỗi, khó dùng, thiếu tính năng, không đúng nhu cầu.
3. Chọn một nhóm nhỏ ảnh hưởng lớn.
4. Sửa, đo lại và ghi phiên bản.
5. Đóng vòng với người đã báo lỗi.

## Bài tập

Mời ba người dùng thử dự án landing page hoặc quản lý đơn hàng. Quan sát mà không hướng dẫn ngay, ghi funnel từ mở trang tới hoàn thành việc chính, rồi tạo năm task backlog theo mức ảnh hưởng.

## Checklist đạt bài

- [ ] Có ba cuộc phỏng vấn dựa trên hành vi thật.
- [ ] Luồng chính và metric được định nghĩa.
- [ ] Không thu thập PII thừa.
- [ ] Feedback có nhãn và phiên bản.
- [ ] Có quyết định giữ, sửa hoặc bỏ tính năng dựa trên dữ liệu.

## Bước tiếp theo

Khi có người dùng thật, cần chuẩn bị tiền, email và vận hành: [Thanh toán, email và vận hành sau ra mắt →](05-thanh-toan-email-va-van-hanh.md)
