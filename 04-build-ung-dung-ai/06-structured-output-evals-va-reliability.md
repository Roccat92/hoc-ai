# Structured output, function calling và reliability


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người đã gọi API và muốn kết quả đủ ổn định để app xử lý tiếp. Học xong bạn sẽ biết khi nào dùng JSON có schema, cách thiết kế function tool an toàn và cách thêm timeout, retry, fallback.

## Đừng parse văn bản tự do khi dữ liệu quan trọng

Nếu app cần `status`, `total` và `items`, đừng yêu cầu model “trả JSON cho đẹp” rồi tách chuỗi bằng tay. Dùng structured output/schema nếu SDK và model hỗ trợ, sau đó validate ở server. Schema không làm model đúng tuyệt đối; nó chỉ giúp đầu ra có hình dạng kiểm tra được.

## Function calling là đề xuất, không phải quyền

Model có thể đề xuất gọi `create_order`, nhưng server mới là nơi quyết định có thực thi không. Server phải kiểm tra người dùng, quyền sở hữu, kiểu dữ liệu, giá trị hợp lệ, idempotency và tác động. Tool mô tả rõ khi nào dùng, side effect gì và lỗi nào có thể trả.

## Reliability tối thiểu

- Timeout cho request tới model và tool.
- Retry có giới hạn và backoff; không retry vô hạn.
- Idempotency cho thao tác tạo, thanh toán hoặc gửi mail.
- Fallback sang model/luồng thủ công khi lỗi tạm thời.
- Log request id, latency, token/cost và trạng thái; không log secret.

## Bài tập

Sửa chatbot phân loại đơn hàng để trả schema gồm `category`, `confidence` và `reason`. Với confidence thấp, trả trạng thái cần người xem. Tạo tool giả `lookup_order` chỉ đọc và từ chối mã đơn không thuộc người dùng.

## Checklist đạt bài

- [ ] Output quan trọng có schema và validate.
- [ ] Tool server kiểm tra quyền, input và side effect.
- [ ] Có timeout, retry giới hạn và fallback.
- [ ] Thao tác không bị nhân đôi khi retry.
- [ ] Log đủ chẩn đoán nhưng không lộ dữ liệu nhạy cảm.

## Bước tiếp theo

Đầu ra đã có hình dạng và đường lỗi, giờ đo chất lượng bằng bộ ví dụ cố định: [Evals và prompt versioning →](07-evals-va-prompt-versioning.md)
