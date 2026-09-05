# Làm việc với file, web và nghiên cứu bằng ChatGPT

Bài này dành cho người muốn đưa tài liệu thật vào ChatGPT nhưng sợ kết quả bịa hoặc dùng nhầm nguồn. Học xong bạn sẽ biết chuẩn bị file, chọn giữa kiến thức sẵn có và web search, yêu cầu trích nguồn, và kiểm tra một kết luận trước khi sử dụng.

## Chuẩn bị file trước khi tải lên

- Đặt tên file có ngày hoặc phiên bản, ví dụ `bao-cao-ban-hang-2026-08.xlsx`.
- Xóa bản nháp, mật khẩu và thông tin cá nhân không cần thiết.
- Giữ tiêu đề cột, đơn vị và khoảng thời gian rõ ràng.
- Nếu PDF là ảnh scan, kiểm tra chữ có đọc được không.
- Chỉ tải phần tài liệu cần cho câu hỏi.

> Số file, dung lượng mỗi file và các định dạng được phép **tùy theo gói tài khoản** và thay đổi theo thời gian - nếu tải lên báo lỗi, kiểm tra lại giới hạn của gói bạn đang dùng thay vì đoán.

## Khi nào dùng web search?

Không cần web cho phép tính từ file bạn đã cung cấp. Dùng web khi thông tin có thể thay đổi, cần nguồn công khai hoặc cần so sánh nhiều lựa chọn. Với nghiên cứu quan trọng, yêu cầu:

```text
Tìm thông tin từ nguồn chính thức hoặc nguồn chuyên môn đáng tin.
Mỗi kết luận chính phải có link nguồn và ngày truy cập.
Tách rõ: điều nguồn nói, suy luận của bạn, và điều chưa đủ bằng chứng.
Nếu hai nguồn mâu thuẫn, trình bày cả hai và giải thích vì sao.
```

Link xuất hiện trong câu trả lời không tự động biến kết luận thành đúng.

## Quy trình kiểm tra chéo

1. Bắt đầu bằng một câu hỏi hẹp.
2. Yêu cầu trích đoạn hoặc dòng dữ liệu hỗ trợ.
3. Mở nguồn gốc, kiểm tra ngày và phạm vi áp dụng.
4. Hỏi lại phần mâu thuẫn hoặc thiếu dữ liệu.
5. Chỉ đưa kết luận vào báo cáo sau khi tự kiểm tra.

## Đi một vòng: từ câu hỏi tới kết luận đã kiểm

Giả sử bạn hỏi "nền tảng deploy miễn phí nào hỗ trợ region châu Á?". Một vòng làm đúng:

1. **Hỏi hẹp, yêu cầu nguồn:** *"Liệt kê 3 nền tảng deploy có bậc miễn phí và có region châu Á. Mỗi dòng kèm link trang chính thức và ngày bạn đọc được thông tin."*
2. **Đầu ra máy đưa** (rút gọn, minh họa): một bảng 3 dòng, mỗi dòng có tên + link.
3. **Bạn tự mở từng link:** vào đúng trang giá/tài liệu, xác nhận "có region châu Á" là thật và còn hiệu lực.
4. **Đánh dấu:** ô nào link xác nhận → giữ; ô nào link không nói rõ → sửa thành "chưa rõ, cần hỏi hỗ trợ".
5. **Chỉ khi đó** con số/kết luận mới được đưa vào việc thật.

Điểm mấu chốt: ChatGPT có gắn link không có nghĩa link đó *chứng minh* điều nó nói - có khi link đúng nhưng nội dung bị diễn giải sai. Người mở link vẫn là bạn.

## Bài tập: bảng so sánh có nguồn

Chọn ba nền tảng deploy miễn phí. Yêu cầu ChatGPT tạo bảng gồm giá, giới hạn, vùng hỗ trợ và link trang giá. Sau đó tự mở từng link, đánh dấu ô nào được xác nhận, ô nào cần ghi “chưa rõ”. Với dữ liệu nhạy cảm, dùng dữ liệu giả.

## Checklist đạt bài

- [ ] Biết chọn file tối thiểu cần thiết.
- [ ] Phân biệt dữ liệu trong file và thông tin cần tìm trên web.
- [ ] Yêu cầu nguồn, ngày truy cập và mức độ chắc chắn.
- [ ] Tự mở ít nhất một nguồn gốc trước khi chia sẻ kết luận.
- [ ] Không tải dữ liệu nhạy cảm khi chưa hiểu chính sách tài khoản.

## Bước tiếp theo

File đã vào đúng ngữ cảnh, giờ biến dữ liệu thành insight và sản phẩm công việc: [Phân tích dữ liệu và tạo tài liệu →](08-chatgpt-phan-tich-du-lieu-va-tao-tai-lieu.md)
