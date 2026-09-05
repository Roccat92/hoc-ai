# Phân tích dữ liệu và tạo tài liệu bằng ChatGPT


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho chủ shop, freelancer và người làm văn phòng muốn hỏi dữ liệu bằng ngôn ngữ tự nhiên. Học xong bạn sẽ đi được một vòng từ file thô tới báo cáo có bảng, biểu đồ, insight và phần giới hạn.

## Quy trình sáu bước

1. **Gom đầu vào:** tải CSV/XLSX hoặc các file liên quan.
2. **Kiểm tra chất lượng:** thiếu cột, trùng dòng, sai kiểu ngày, sai đơn vị.
3. **Chốt định nghĩa:** “doanh thu” là trước hay sau hoàn tiền? “khách mới” tính theo ngày nào?
4. **Phân tích:** yêu cầu bảng trung gian trước khi kết luận.
5. **Trực quan hóa:** chọn biểu đồ phục vụ câu hỏi.
6. **Xuất kết quả:** báo cáo, bảng tính hoặc slide có nguồn dữ liệu và ngày chốt.

## Prompt mẫu

```text
Đọc file don-hang.csv và làm theo thứ tự:
1. Liệt kê tên cột, kiểu dữ liệu và số ô trống.
2. Nêu mọi giả định trước khi tính doanh thu theo tháng.
3. Tạo bảng doanh thu theo tháng và theo trạng thái đơn.
4. Vẽ một biểu đồ phù hợp, ghi rõ đơn vị.
5. Viết 3 insight và 2 giới hạn của dữ liệu.
Không tự sửa file gốc; nếu phát hiện lỗi, tạo một bản đã làm sạch riêng.
```

Luôn đối chiếu tổng số dòng, tổng tiền và một vài dòng mẫu. Nếu dùng cho quyết định tài chính, tự tính lại công thức quan trọng bằng spreadsheet hoặc script nhỏ. Biểu đồ đẹp không chứng minh công thức đúng.

## Bài tập

Dùng dữ liệu giả của dự án quản lý đơn hàng ở [Phần 9](../09-du-an-thuc-hanh/du-an-02-quan-ly-don-hang/spec.md). Tạo báo cáo một trang gồm doanh thu theo tháng, ba sản phẩm bán chạy, tỷ lệ đơn hủy, hai đề xuất và một đoạn “không thể kết luận từ dữ liệu hiện có”.

## Checklist đạt bài

- [ ] Có bước kiểm tra dữ liệu trước khi phân tích.
- [ ] Định nghĩa metric và đơn vị rõ ràng.
- [ ] Có bảng trung gian để kiểm tra.
- [ ] Biểu đồ có tiêu đề, đơn vị và khoảng thời gian.
- [ ] Báo cáo ghi giả định, giới hạn và cách xác minh.

## Bước tiếp theo

Workflow đã chạy được một lần, giờ gom file và quy tắc thành một không gian làm việc tái sử dụng: [Projects, bộ nhớ và quyền riêng tư →](09-chatgpt-projects-bo-nho-va-rieng-tu.md)
