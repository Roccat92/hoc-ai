# Tích hợp AI vào web/app có sẵn: case thật (app đặt hàng, CRM)

Bài này dành cho người đã có một sản phẩm (web/app) đang chạy — của bạn hoặc của công ty — và muốn thêm AI vào để nó hữu ích hơn, thay vì xây một sản phẩm AI hoàn toàn mới từ đầu. Học xong bạn sẽ có cách tiếp cận thực tế để thêm AI vào một hệ thống đang chạy mà không đảo lộn mọi thứ.

## Nguyên tắc chung: bắt đầu nhỏ, đo lường trước khi mở rộng

Sai lầm phổ biến khi thêm AI vào sản phẩm có sẵn là **cố nhét AI vào mọi tính năng cùng lúc**. Cách làm thực tế hơn: chọn **một điểm đau cụ thể** (một việc khách hàng/nhân viên hay hỏi lặp đi lặp lại, một việc tốn thời gian thủ công), build một tính năng AI nhỏ giải quyết đúng điểm đó, đo xem có thực sự hữu ích không, rồi mới mở rộng.

## Các điểm tích hợp AI phổ biến

| Loại tích hợp | Giải quyết gì | Kỹ thuật liên quan |
|---|---|---|
| Chatbot hỗ trợ khách hàng | Trả lời câu hỏi thường gặp, giảm tải cho nhân viên | RAG (đọc tài liệu FAQ/sản phẩm) — xem [bài trước](02-rag-la-gi-va-build.md) |
| Tìm kiếm thông minh (semantic search) | Tìm theo ý nghĩa, không chỉ khớp từ khóa chính xác | Embedding + vector database |
| Tự động tóm tắt / phân loại dữ liệu | Giảm thời gian đọc thủ công lượng dữ liệu lớn | Gọi API LLM trực tiếp — xem [bài đầu tiên](01-goi-api-llm.md) |
| Gợi ý cá nhân hóa | Tăng tỷ lệ chuyển đổi, trải nghiệm phù hợp từng người dùng | Kết hợp dữ liệu hành vi người dùng với AI |

## Case thật 1: App đặt hàng — thêm chatbot tư vấn sản phẩm

**Bài toán:** khách hàng vào app đặt đồ ăn/hàng hóa, hay nhắn hỏi "món nào cay ít", "sản phẩm này còn hàng không", "phù hợp cho người ăn chay không" — nhân viên phải trả lời thủ công, tốn thời gian, đặc biệt vào giờ cao điểm.

**Cách tiếp cận:**
1. Xuất catalog sản phẩm hiện có (tên, mô tả, thành phần, giá, tình trạng còn hàng) thành dữ liệu có cấu trúc.
2. Build hệ thống RAG đơn giản (như [bài trước](02-rag-la-gi-va-build.md)) dùng catalog này làm "tài liệu".
3. Thêm một khung chat nhỏ trên app/web, kết nối với hệ thống RAG đó.
4. **Quan trọng:** giới hạn phạm vi trả lời — dùng system prompt để chatbot chỉ trả lời về sản phẩm/đơn hàng, từ chối lịch sự với câu hỏi ngoài phạm vi, tránh AI "lạc đề" hoặc bịa thông tin về giá/khuyến mãi không có thật.
5. Đo lường: theo dõi bao nhiêu % câu hỏi chatbot trả lời được thỏa đáng (có thể qua phản hồi "hữu ích/không hữu ích" từ khách), bao nhiêu câu phải chuyển cho nhân viên thật.

## Case thật 2: CRM — tóm tắt tương tác khách hàng, gợi ý phản hồi

**Bài toán:** nhân viên sale/chăm sóc khách hàng phải đọc lại toàn bộ lịch sử email/chat với một khách hàng trước mỗi cuộc gọi — tốn thời gian, dễ bỏ sót chi tiết quan trọng.

**Cách tiếp cận:**
1. Với mỗi khách hàng, gom lịch sử tương tác (email, ghi chú cuộc gọi, tin nhắn) thành một đoạn văn bản.
2. Gọi API LLM (như [bài đầu tiên](01-goi-api-llm.md)) với prompt yêu cầu tóm tắt: "Tóm tắt lịch sử tương tác này trong 5 câu, nêu rõ: khách quan tâm gì, vấn đề gì chưa giải quyết, bước tiếp theo nên làm gì."
3. Hiển thị bản tóm tắt này ngay trên trang chi tiết khách hàng trong CRM, tự động cập nhật mỗi khi có tương tác mới.
4. Mở rộng dần: thêm tính năng gợi ý nội dung email trả lời dựa trên ngữ cảnh, hoặc tự động gắn nhãn/phân loại độ ưu tiên của lead mới.

## Những điều cần cẩn trọng khi tích hợp AI vào sản phẩm thật

- **Luôn có phương án dự phòng khi AI trả lời sai/không chắc chắn** — ví dụ nút "Chuyển cho nhân viên thật" luôn hiển thị rõ ràng trong chatbot hỗ trợ khách hàng.
- **Không để AI tự động thực hiện hành động có hậu quả lớn** (xác nhận đơn hàng, hoàn tiền, xóa dữ liệu) mà không có bước xác nhận của con người, ít nhất ở giai đoạn đầu triển khai.
- **Kiểm soát chi phí API** khi tích hợp vào sản phẩm có lượng người dùng thật — theo dõi usage dashboard thường xuyên, đặt giới hạn (rate limit) hợp lý để tránh chi phí tăng đột biến ngoài dự kiến.
- **Thông báo rõ cho người dùng** khi họ đang tương tác với AI, không giả vờ là con người — vừa minh bạch, vừa tránh kỳ vọng sai về khả năng của hệ thống.

## Bước tiếp theo

Không phải lúc nào cũng cần code phức tạp để tự động hóa — có cách nhanh hơn cho nhiều trường hợp: [Tự động hóa với n8n](05-n8n-automation.md)
