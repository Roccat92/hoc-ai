# Evals và prompt versioning cho ứng dụng AI


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người hay sửa prompt theo cảm giác và không biết bản mới có tốt hơn không. Học xong bạn sẽ tạo được bộ test nhỏ, chấm theo tiêu chí phù hợp và lưu prompt như một phần của source code.

## Một eval nhỏ nhưng hữu ích

Bắt đầu với 20-50 tình huống đại diện: câu dễ, câu biên, câu từng lỗi, dữ liệu thiếu và câu có ý đồ xấu. Mỗi dòng nên có input, expected behavior, tiêu chí chấm và ghi chú nguồn. Không cần có đáp án văn chương hoàn hảo; có thể chấm cấu trúc, trích nguồn, không bịa hoặc chọn đúng tool.

## Chấm thế nào?

- Đáp án có đúng không nếu có nhãn rõ.
- Có bám nguồn nếu bài là RAG không.
- Có đủ trường schema không.
- Có từ chối hoặc hỏi lại khi thiếu dữ liệu không.
- Chi phí và độ trễ có nằm trong ngân sách không.

Chấm tự động giúp so sánh nhanh, nhưng một người vẫn cần đọc mẫu khó. [OpenAI Docs](https://developers.openai.com/api/docs/guides/latest-model) khuyến nghị đo trên dữ liệu đại diện trước khi đổi prompt, model hoặc reasoning.

## Prompt cũng cần version

Đặt prompt trong file hoặc registry có tên phiên bản, ngày đổi, lý do và kết quả eval. Khi deploy prompt mới, giữ baseline để rollback. Đừng chỉnh prompt production trực tiếp mà không lưu bản cũ.

## Bài tập

Tạo 20 câu hỏi cho chatbot tài liệu, chấm ba tiêu chí: đúng nguồn, không bịa, trả lời dễ hiểu. Chạy baseline, đổi một prompt, chạy lại và ghi kết quả trước/sau.

## Checklist đạt bài

- [ ] Có tập tình huống đại diện, không chỉ happy path.
- [ ] Tiêu chí chấm viết thành câu kiểm tra được.
- [ ] Có baseline và kết quả trước/sau.
- [ ] Prompt có version và rollback.
- [ ] Mẫu khó được người đọc kiểm tra.

## Bước tiếp theo

Đã đo được câu trả lời, giờ làm RAG bám tài liệu hơn và chống dữ liệu độc hại: [RAG quality và bảo mật →](08-rag-quality-va-bao-mat.md)
