# Xác thực vấn đề, analytics và phản hồi người dùng

Bài này dành cho người sắp public sản phẩm và muốn biết người dùng có thật sự cần nó không. Học xong bạn sẽ phỏng vấn không dẫn dắt, chọn vài metric có ích, đo luồng chính và biến phản hồi thành backlog. Đây là cách "xác thực ý tưởng sản phẩm" (product validation) bằng phỏng vấn thật và vài chỉ số đo được, thay vì đoán mò rồi build cho đã mới biết có ai cần không.

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

## Gắn analytics tôn trọng riêng tư

Không cần Google Analytics để đo vài metric cơ bản. Một công cụ mã nguồn mở như [Umami](https://umami.is) đo lượt xem và sự kiện mà không theo dõi cá nhân xuyên trang, tự host được (miễn phí, dữ liệu nằm trên máy chủ của bạn) hoặc dùng bản cloud. Gắn vào trang bằng một dòng:

```html
<script defer src="https://cloud.umami.is/script.js" data-website-id="MA-WEBSITE-CUA-BAN"></script>
```
- `defer`: tải script sau khi trang hiện xong, không làm chậm lần mở đầu.
- `data-website-id`: mã định danh trang, lấy trong bảng điều khiển Umami sau khi tạo site.

Đo một **sự kiện** cụ thể (ví dụ khách bấm hoàn thành đặt hàng) - gọi trong code chỗ việc đó xảy ra:

```js
// gọi khi khách đặt hàng thành công
umami.track('hoan-thanh-dat-hang');
```
- Tên sự kiện đặt rõ nghĩa, gạch nối, không dấu - để sau đọc báo cáo hiểu ngay.
- Chỉ gắn ở đúng chỗ hành động thật xảy ra, đừng rải khắp nơi "cho chắc".

> Tên thuộc tính và cách gọi có thể đổi theo phiên bản - lấy đoạn nhúng chuẩn từ [tài liệu Umami](https://umami.is/docs) thay vì chép nguyên từ đây. Nếu tự host, bạn chỉ tốn tiền máy chủ chạy nó (xem [thuê VPS](../03-ha-tang-thuc-chien/01-thue-vps.md)); bản cloud có bậc miễn phí cho lưu lượng nhỏ, kiểm tra trang giá trước khi vượt.

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
