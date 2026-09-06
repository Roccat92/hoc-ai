# Phân tích dữ liệu và tạo tài liệu bằng ChatGPT

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

## Thử với một file nhỏ

Bạn không cần dữ liệu lớn để luyện. Tạo file `don-hang.csv` vài dòng như thế này:

```csv
ma_don,ngay,san_pham,so_luong,thanh_tien,trang_thai
1001,2026-08-03,Áo thun,2,300000,hoan_thanh
1002,2026-08-05,Túi tote,1,120000,hoan_thanh
1003,2026-08-05,Áo thun,1,150000,huy
1004,2026-08-11,Hoodie,3,1050000,hoan_thanh
```

Tải lên, chạy prompt mẫu ở trên, đầu ra rút gọn có thể là:

| Tháng | Doanh thu (hoàn thành) | Số đơn | Ghi chú |
|---|---|---|---|
| 08/2026 | 1.470.000đ | 3 | Đã loại 1 đơn trạng thái `huy` |

Kiểm ngay: đơn `1003` bị hủy nên **không** được tính vào doanh thu - nếu bảng cộng cả nó (thành 1.620.000đ) thì AI đã bỏ qua bước lọc trạng thái. Đây chính là loại lỗi bạn phải bắt trước khi tin con số.

> Tính năng phân tích dữ liệu và xuất file **tùy theo gói tài khoản**; nếu không thấy, kiểm tra lại gói bạn đang dùng.

## Bài tập

Dùng dữ liệu giả của dự án quản lý đơn hàng ở [Phần 9](../../09-du-an-thuc-hanh/du-an-02-quan-ly-don-hang/spec.md). Tạo báo cáo một trang gồm doanh thu theo tháng, ba sản phẩm bán chạy, tỷ lệ đơn hủy, hai đề xuất và một đoạn “không thể kết luận từ dữ liệu hiện có”.

## Checklist đạt bài

- [ ] Có bước kiểm tra dữ liệu trước khi phân tích.
- [ ] Định nghĩa metric và đơn vị rõ ràng.
- [ ] Có bảng trung gian để kiểm tra.
- [ ] Biểu đồ có tiêu đề, đơn vị và khoảng thời gian.
- [ ] Báo cáo ghi giả định, giới hạn và cách xác minh.

## Bước tiếp theo

Workflow đã chạy được một lần, giờ gom file và quy tắc thành một không gian làm việc tái sử dụng: [Projects, bộ nhớ và quyền riêng tư →](05-projects-bo-nho-rieng-tu.md)
