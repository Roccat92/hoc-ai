# Model mở vs đóng — khi nào dùng cái nào?

Bài này dành cho người đã biết sơ qua các hãng AI ([bài trước](03-cac-cong-ty-va-model.md)) nhưng chưa rõ "model mở" và "model đóng" khác nhau thế nào, và quan trọng hơn — khi nào nên chọn cái nào cho dự án của mình. Học xong bạn sẽ tự đưa ra quyết định thay vì đoán mò.

## Model đóng (closed) là gì?

Model đóng là model bạn **chỉ dùng được qua API hoặc app** do chính hãng cung cấp — không thể tải "bộ não" của model về máy, không biết chính xác bên trong nó hoạt động ra sao, không tự host được. Claude, GPT, Gemini là closed model.

Bạn gửi câu hỏi lên server của hãng, họ xử lý, trả kết quả về — và bạn trả tiền theo lượng sử dụng (hoặc dùng bản miễn phí có giới hạn).

## Model mở (open) là gì? Và vì sao "open source" hay bị dùng sai

Model mở là model mà hãng phát hành **"trọng số" (weights)** — về cơ bản là file chứa toàn bộ những gì model đã "học" được — cho công chúng tải về, tự chạy trên máy/server riêng, tự tinh chỉnh (fine-tune) theo ý mình.

**Điểm cần lưu ý:** phần lớn model được gọi là "mở" trong ngành AI hiện nay chính xác hơn nên gọi là **"open-weight"** chứ không hẳn là "open source" đúng nghĩa truyền thống trong giới lập trình. Vì:
- Open source truyền thống (như một phần mềm mã nguồn mở) nghĩa là bạn thấy được **toàn bộ quá trình tạo ra sản phẩm** — code, cách build.
- Với AI model, "mở" thường chỉ dừng ở việc công khai **kết quả cuối** (file trọng số) để tải về dùng/tinh chỉnh — còn **dữ liệu huấn luyện gốc và chi tiết quá trình train** thường không được công bố đầy đủ.

Vậy nên khi nghe "model mở nguồn", hiểu ngầm là "open-weight, dùng và tùy biến tự do, nhưng không thấy được toàn bộ quá trình tạo ra nó" sẽ chính xác hơn. Llama, Qwen, DeepSeek, Mistral (phần lớn) đều thuộc nhóm này.

## So sánh nhanh

| Tiêu chí | Model đóng (Claude, GPT, Gemini...) | Model mở (Llama, Qwen, DeepSeek, Mistral...) |
|---|---|---|
| Cách dùng | Qua API/app của hãng | Tải về, tự chạy trên máy/server riêng |
| Chất lượng đầu bảng | Thường dẫn đầu ở các tác vụ khó, phức tạp | Thu hẹp khoảng cách rất nhanh, có bản gần ngang hàng |
| Chi phí lúc bắt đầu | Trả theo lượng dùng (hoặc free tier có giới hạn) | Cần phần cứng (máy/GPU) để chạy — có thể tốn hơn lúc đầu |
| Kiểm soát dữ liệu | Dữ liệu gửi ra server của hãng | Có thể chạy hoàn toàn offline, dữ liệu không rời máy bạn |
| Tùy biến sâu (fine-tune) | Hạn chế hoặc không thể | Fine-tune tự do theo nhu cầu riêng |
| Cần kiến thức hạ tầng | Không cần | Cần biết chạy server/GPU (xem [`03-ha-tang-thuc-chien/`](../03-ha-tang-thuc-chien/)) |
| Bảo trì, cập nhật | Hãng tự lo | Bạn tự lo cập nhật, vá lỗi |

## Khi nào nên dùng model đóng?

- Bạn mới bắt đầu, muốn tập trung học code/build sản phẩm, chưa muốn lo về hạ tầng.
- Cần chất lượng cao nhất có thể cho tác vụ khó (lý luận phức tạp, code khó).
- Dự án nhỏ, lượng sử dụng thấp — trả tiền theo lượng dùng thường rẻ hơn tự dựng hạ tầng.
- Không có yêu cầu đặc biệt về việc dữ liệu phải ở lại trong hệ thống riêng.

→ Đây là lựa chọn mặc định cho **hầu hết người mới**, kể cả toàn bộ phần thực hành trong repo này.

## Khi nào nên cân nhắc model mở?

- Dữ liệu nhạy cảm (y tế, tài chính, nội bộ doanh nghiệp) không được phép gửi ra ngoài.
- Cần chạy **hoàn toàn offline** (không có internet, hoặc yêu cầu bảo mật cao).
- Cần **fine-tune** model theo dữ liệu/nghiệp vụ rất riêng mà model đóng không đáp ứng đủ.
- Ở quy mô sử dụng cực lớn, chi phí tự host lâu dài có thể rẻ hơn trả theo API — nhưng cần tính toán kỹ, vì chi phí vận hành hạ tầng (điện, GPU, nhân sự bảo trì) không hề nhỏ.
- Muốn học sâu, tự tay nghịch, hiểu cơ chế bên trong.

→ Xem hướng dẫn thực hành chạy model mở trên máy cá nhân tại [`03-ha-tang-thuc-chien/05-chay-llm-tren-may-minh.md`](../03-ha-tang-thuc-chien/05-chay-llm-tren-may-minh.md).

## Lời khuyên thực tế

Đừng nghĩ đây là quyết định "chọn một, bỏ hẳn cái kia". Rất nhiều team dùng **kết hợp**: model đóng cho phần lõi sản phẩm cần chất lượng cao nhất, model mở tự host cho các tác vụ phụ, khối lượng lớn, hoặc dữ liệu nhạy cảm. Người mới nên bắt đầu với model đóng để tập trung học kỹ năng cốt lõi trước, rồi khám phá model mở khi có nhu cầu cụ thể.

## Bước tiếp theo

Đã hiểu rõ bối cảnh công nghệ, giờ tìm hiểu ngành AI có những công việc gì, làm gì, lương ra sao: [Các nghề trong AI](05-cac-nghe-trong-ai.md)
