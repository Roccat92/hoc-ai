# Eval trước khi fine-tune: đo rồi mới train

Bài này dành cho người đang nghĩ fine-tune sẽ giải quyết mọi vấn đề của ứng dụng AI. Học xong bạn sẽ tạo được baseline, chia dữ liệu đúng cách, so sánh prompt/RAG với fine-tune và biết khi nào nên dừng vì chưa có đủ bằng chứng.

## Fine-tune không sửa mọi lỗi

Fine-tune phù hợp khi model cần học một kiểu đầu ra, giọng, định dạng hoặc hành vi lặp lại từ nhiều ví dụ. Nó không tự cập nhật tài liệu riêng thường xuyên, không thay thế phân quyền và không bảo đảm model hết bịa. Kiến thức thay đổi liên tục thường cần retrieval/RAG hơn.

## Tạo baseline

Trước khi train, cố định model, prompt, dữ liệu đầu vào và cách chấm. Chọn 20-50 ví dụ đại diện: câu dễ, câu biên, dữ liệu thiếu và các lỗi người dùng từng gặp. Ghi chất lượng, latency, token/cost và lỗi an toàn.

## Chia dữ liệu đúng

- **Train:** ví dụ dùng để học.
- **Validation:** chọn cấu hình và phát hiện overfit.
- **Test:** chỉ mở khi muốn so sánh cuối.

Không cho cùng một nội dung hoặc biến thể gần như y hệt xuất hiện ở cả ba tập. Ghi nguồn, giấy phép, ngày, phiên bản và thông tin cá nhân đã loại bỏ.

## So sánh công bằng

Chạy cùng bộ test cho: prompt hiện tại, prompt + RAG, model nhỏ hơn và model fine-tune. Chấm cả chất lượng, chi phí, tốc độ, độ ổn định và lỗi nguy hiểm. Nếu fine-tune chỉ đẹp hơn ở ví dụ train nhưng kém ở test, đó là overfit chứ không phải tiến bộ.

## Bảng so sánh mẫu

Ghi kết quả vào một bảng như dưới đây (số chỉ để minh họa cách trình bày - bạn điền số đo thật của mình). "Tỉ lệ đạt" lấy từ script chấm ở [bài evals](../04-build-ung-dung-ai/07-evals-va-prompt-versioning.md); cột chi phí và tốc độ đo ngay khi chạy eval:

| Phương án | Tỉ lệ đạt | Độ trễ | Chi phí tương đối | Ghi chú |
|---|---|---|---|---|
| Prompt hiện tại | 14/20 | nhanh | $ | Rẻ nhất, làm baseline |
| Prompt + RAG | 18/20 | vừa | $$ | Cải thiện rõ, chưa cần train |
| Model nhỏ + prompt | 12/20 | rất nhanh | $ | Rẻ nhưng chất lượng tụt |
| Fine-tune | 18/20 | vừa | $$$ | Bằng RAG nhưng đắt và tốn công hơn |

Với bảng ví dụ này, kết luận là **không nên fine-tune**: prompt + RAG đã đạt bằng, rẻ hơn và không tốn công train. Dùng cột "Chi phí tương đối" ($/$$/$$$) khi bạn chưa có số tiền chính xác - điền dấu theo cảm nhận chi phí rồi thay bằng số thật khi đo được.

> Fine-tune có **hai khoản tiền**: chi phí train một lần (tính theo lượng token huấn luyện) và chi phí mỗi lần gọi model sau đó (có khi cao hơn model gốc). Con số tùy nhà cung cấp và đổi theo thời gian - lấy từ trang giá chính thức của bên bạn dùng, đừng ước bừa. Phần lớn trường hợp của người mới, prompt + RAG đủ rẻ và đủ tốt.

## Bài tập

Lấy chatbot phân loại phản hồi khách hàng. Tạo 30 ví dụ, chia 20/5/5, đo baseline bằng prompt có schema, rồi viết kết luận: fine-tune có giải quyết lỗi thật không, hay chỉ cần prompt/RAG tốt hơn?

## Checklist đạt bài

- [ ] Có baseline cố định trước khi train.
- [ ] Tập train/validation/test không bị rò dữ liệu.
- [ ] Dữ liệu có nguồn, giấy phép và phiên bản.
- [ ] So sánh cả chất lượng, cost, latency và safety.
- [ ] Có tiêu chí dừng nếu fine-tune không tốt hơn.

## Đọc lại kết quả trước khi quyết định

Nếu baseline chứng minh thật sự cần tinh chỉnh, quay lại phần "Fine-tune thực hành bằng LoRA" ở bài trước và train theo đúng bộ dữ liệu vừa chuẩn bị. Nếu chưa đủ bằng chứng, đừng train - quay về cải thiện prompt và RAG ở [Evals và prompt versioning](../04-build-ung-dung-ai/07-evals-va-prompt-versioning.md), phần lớn trường hợp dừng ở đây là đủ.

## Bước tiếp theo

Đã đi hết phần nâng cao. Giờ khám phá kho tài nguyên để tiếp tục tự học sau khi hoàn thành lộ trình này: [Kho tài nguyên →](../06-kho-tai-nguyen/01-awesome-repos.md)
