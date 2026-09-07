# Thiết kế layout, UI nhanh bằng Stitch - nhờ AI viết prompt cho AI

Bài này dành cho người muốn có một bản phác thảo giao diện (layout, bố cục, màu sắc) rõ ràng trước khi bắt tay code, thay vì để coding agent tự đoán giao diện từ một câu mô tả ngắn - đúng chỗ hay gây ra "UI phèn" đã học ở [bài 6](06-tri-benh-ui-phen.md#vi-sao-ai-hay-ra-kieu-nay). Học xong bạn sẽ dùng được Stitch (công cụ vẽ UI bằng AI của Google) để tạo bản thiết kế nhanh, biết cách nhờ ChatGPT/Claude viết prompt chi tiết thay vì tự gõ một câu mơ hồ, và biết đưa kết quả sang cho coding agent làm theo.

## Stitch là gì?

[Stitch](https://stitch.withgoogle.com) là công cụ của Google Labs, biến mô tả bằng lời (hoặc một ảnh phác thảo/ảnh chụp màn hình tham khảo) thành một bản thiết kế giao diện có bố cục, màu sắc, font chữ nhất quán - giống như có một designer vẽ nháp cực nhanh theo đúng ý bạn mô tả. Xuất được kết quả sang Figma (giữ layer, sửa tiếp được) hoặc trực tiếp ra code.

> Stitch vẫn đang ở giai đoạn **Google Labs (thử nghiệm)** - miễn phí nhưng có giới hạn số lượt tạo mỗi tháng, và các định dạng xuất/tính năng cụ thể thay đổi khá nhanh trong giai đoạn này. Kiểm tra ngay trong tài khoản Stitch của bạn và trang chủ để biết hạn mức và tính năng hiện tại, đừng tin số liệu cố định của bất kỳ bài viết nào (kể cả bài này) *(kiểm tra: 07/09/2026)*.

## Vì sao nên nhờ ChatGPT/Claude viết prompt trước, thay vì tự gõ

Cùng một bài học ở "[Ba kỹ thuật cho AI khẩu vị](06-tri-benh-ui-phen.md#ba-ky-thuat-cho-ai-khau-vi)" áp dụng y hệt cho Stitch: gõ một câu mơ hồ kiểu "làm giao diện app quản lý đơn hàng" sẽ ra một layout chung chung, không có "khẩu vị" riêng - vì AI phải tự đoán màu sắc, phong cách, độ chi tiết.

Vấn đề là hầu hết người mới không quen nghĩ bằng ngôn ngữ thiết kế (phân cấp bố cục, hệ màu, độ giãn cách, trạng thái tương tác...). Đây đúng là việc một chatbot mạnh về ngôn ngữ như ChatGPT hoặc Claude làm tốt: bạn kể ý tưởng sản phẩm bằng lời bình thường, nhờ nó **viết lại thành một prompt chi tiết, đúng cấu trúc** để dán vào Stitch - kết quả ra sát ý hơn hẳn so với tự gõ một câu ngắn.

## Quy trình 3 bước

**Bước 1 - nhờ ChatGPT/Claude viết prompt cho Stitch:**

```
Tôi muốn dùng Stitch (công cụ vẽ UI bằng AI của Google) để thiết kế
giao diện cho [mô tả ngắn sản phẩm của bạn, ví dụ: "app quản lý đơn
hàng cho shop quần áo nhỏ"]. Phong cách tôi muốn: [ví dụ: tối giản,
màu trung tính, không màu mè].

Hãy viết cho tôi MỘT prompt chi tiết để dán thẳng vào Stitch, mô tả rõ:
màn hình cần vẽ, bố cục từng phần trên màn hình đó, bảng màu cụ thể
(mã màu nếu có thể), kiểu font (nghiêm túc/thân thiện/hiện đại...),
và các trạng thái cần có (rỗng, đang tải, lỗi). Chỉ đưa ra prompt cuối
cùng, không cần giải thích thêm.
```

**Bước 2 - dán prompt vào Stitch**, xem kết quả. Stitch cho tinh chỉnh tiếp bằng lời (ví dụ "đổi màu chính sang xanh navy", "làm nút bấm bo tròn hơn") - chỉnh qua lại vài lượt tới khi vừa ý, đỡ tốn công hơn nhiều so với chỉnh trực tiếp trong code.

**Bước 3 - xuất ra Figma hoặc code**, đưa cho coding agent làm theo:

```
Đây là bản thiết kế UI tôi đã làm bằng Stitch [đính kèm ảnh chụp màn
hình hoặc file xuất ra]. Hãy build đúng theo bố cục, màu sắc trong
thiết kế này - không tự ý đổi phong cách. Nếu có phần nào thiết kế
chưa rõ cách hoạt động, hỏi tôi trước khi tự đoán.
```

## Stitch là điểm khởi đầu, không thay cho bước tinh chỉnh

Bản Stitch tạo ra là bản **phác thảo trực quan** để cả bạn và coding agent cùng nhìn thấy ý tưởng trước khi code - không phải bản hoàn chỉnh. Sau khi code xong theo thiết kế đó, vẫn cần đi qua [vòng lặp sửa bằng ảnh](06-tri-benh-ui-phen.md#c-vong-lap-sua-bang-anh) đã học để tinh chỉnh chi tiết thật (khoảng cách, cỡ chữ, trạng thái hover...) - Stitch giúp bạn xuất phát đúng hướng nhanh hơn, không giúp bỏ qua bước kiểm tra kỹ.

## Một câu để nhớ

Đừng gõ thẳng một câu mơ hồ vào công cụ vẽ UI - nhờ chatbot biến ý tưởng của bạn thành một bản mô tả chi tiết trước, kết quả sẽ đúng ý hơn hẳn.

## Bước tiếp theo

Có bản thiết kế và sản phẩm chạy được trên máy - giờ tới lúc đưa nó ra khỏi máy mình cho người khác dùng được: [Thuê VPS: là gì, chọn nhà cung cấp nào →](../03-ha-tang-thuc-chien/01-thue-vps.md)
