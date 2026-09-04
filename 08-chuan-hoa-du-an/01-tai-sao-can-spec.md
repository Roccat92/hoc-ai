# Vì sao cần spec trước khi để AI code

Bài này dành cho người đã build được vài dự án nhỏ (như [to-do list ở phần 2](../02-code-voi-ai/03-du-an-dau-tien.md)) bằng cách mô tả trực tiếp cho AI, và giờ muốn làm dự án lớn hơn — nhiều tính năng hơn, nhiều phiên làm việc hơn (hôm nay làm, mai làm tiếp). Học xong bạn sẽ hiểu vì sao "mở Claude Code lên gõ luôn 'làm cho tôi cái app quản lý bán hàng'" thường thất bại với dự án cỡ này, và tại sao dành 15 phút viết spec trước lại tiết kiệm thời gian hơn nhiều.

## Vì sao AI "loạn" khi không có spec?

Ba lý do, đều bắt nguồn từ những gì bạn đã học ở phần 0:

1. **Context có hạn** — nhắc lại [context window](../00-ban-do-gioi-ai/02-llm-la-gi.md): AI chỉ "nhìn thấy" được những gì nằm trong cuộc trò chuyện hiện tại. Với dự án nhỏ làm xong trong một phiên, không sao. Nhưng dự án lớn kéo dài nhiều ngày, mỗi phiên mới AI **không tự nhớ** những gì đã thống nhất ở phiên trước, trừ khi bạn nhắc lại hoặc AI đọc lại tài liệu.

2. **Mô tả bằng miệng mỗi lần một kiểu** — hôm nay bạn nói "làm trang quản lý đơn hàng", ba ngày sau bạn nói "làm trang xem đơn hàng" — với bạn hai câu này giống nhau, nhưng AI không có cách nào biết chắc bạn có đang muốn đúng cùng một thứ không. Không có một "nguồn sự thật" (source of truth) cố định, mỗi lần mô tả lại có thể lệch đi một chút.

3. **AI tự đoán phần thiếu** — khi mô tả của bạn không đủ chi tiết (ví dụ không nói rõ "xóa đơn hàng có cần xác nhận không", "trạng thái đơn hàng gồm những gì"), AI vẫn phải quyết định gì đó để code chạy được — và nó đoán. Đoán đúng thì may, đoán sai thì bạn phát hiện ra sau, phải yêu cầu sửa lại, tốn thêm một vòng lặp nữa.

## So sánh: không spec vs có spec

**Kịch bản A — không có spec, mô tả trực tiếp:**

> *Phiên 1:* "Làm giúp tôi app quản lý đơn hàng cho shop quần áo nhỏ."
> → AI tạo ra một app với các trường tên sản phẩm, số lượng, giá — nhưng tự đoán không cần trường "size", "màu sắc" vì bạn không nhắc tới.
>
> *Phiên 2 (hai ngày sau):* "Thêm chức năng lọc đơn hàng theo trạng thái."
> → AI hỏi lại: "Trạng thái đơn hàng gồm những giá trị nào?" — vì phiên trước chưa từng định nghĩa, và AI không nhớ ngữ cảnh phiên 1 nếu bạn không dán lại.
>
> *Phiên 3:* Bạn nhận ra thiếu trường "size", yêu cầu thêm — AI phải sửa lại cả phần giao diện nhập liệu, phần hiển thị danh sách, phần lưu dữ liệu đã làm trước đó.

**Kịch bản B — có spec.md từ đầu:**

> Bạn viết sẵn một file `spec.md` (cách viết ở [bài tiếp theo](02-viet-spec-md.md)) liệt kê rõ: sản phẩm có tên, size, màu sắc, giá; đơn hàng có trạng thái "Chờ xử lý / Đang giao / Hoàn thành / Đã hủy".
>
> *Mọi phiên làm việc*, câu đầu tiên bạn gõ là: "Đọc file spec.md trước, sau đó [yêu cầu cụ thể của phiên này]." AI đọc lại đúng một bản mô tả duy nhất, không đoán mò, không hỏi lại những gì đã được định nghĩa sẵn — kể cả ở phiên thứ 10, cách phiên đầu một tháng.

Sự khác biệt không nằm ở việc AI "thông minh hơn" — mà ở việc bạn cho nó một **nguồn sự thật cố định** để tham chiếu, thay vì dựa vào trí nhớ (vốn không tồn tại giữa các phiên) hoặc vào cách bạn diễn đạt (vốn không nhất quán 100% giữa các lần).

## Khi nào KHÔNG cần viết spec?

Đừng biến việc này thành thủ tục hành chính cho mọi việc nhỏ. Bạn **không cần** spec khi:
- Việc làm xong gọn trong một phiên, một lần (như dự án to-do list ở [phần 2](../02-code-voi-ai/03-du-an-dau-tien.md)).
- Sửa lỗi nhỏ, thay đổi một chi tiết giao diện, thử nghiệm nhanh.

Bạn **nên** viết spec khi:
- Dự án có nhiều tính năng liên quan tới nhau (đơn hàng liên quan tới sản phẩm, liên quan tới khách hàng...).
- Bạn biết sẽ làm dự án này qua nhiều phiên, nhiều ngày.
- Có người khác (hoặc chính AI ở phiên sau) cần hiểu lại toàn bộ ý tưởng mà không cần hỏi lại bạn từ đầu.

## Bước tiếp theo

Đã hiểu vì sao cần spec, giờ học cách viết một file spec.md thật sự dùng được: [Viết spec.md](02-viet-spec-md.md)
