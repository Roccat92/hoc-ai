# Tổng quan build LLM từ đầu (tham khảo - không khuyến khích người mới)

Bài này dành cho người **tò mò về mặt kiến thức** muốn hiểu build một LLM hoàn toàn từ đầu (pre-train from scratch) cần những gì - **không phải hướng dẫn thực hành**, và gần như chắc chắn không phải việc bạn cần tự làm. Học xong bạn sẽ hiểu vì sao, và biết tìm tài liệu nào nếu muốn đào sâu thêm về mặt lý thuyết.

## Build LLM from scratch cần gì?

**1. Kiến trúc mô hình** - hầu hết LLM hiện đại dựa trên kiến trúc **Transformer** (nhắc lại ở [từ điển thuật ngữ](../00-ban-do-gioi-ai/06-tu-dien-thuat-ngu.md)), đòi hỏi hiểu biết sâu về deep learning, đại số tuyến tính, xác suất thống kê.

**2. Dữ liệu khổng lồ** - các LLM hàng đầu hiện nay được huấn luyện trên **hàng nghìn tỷ token** dữ liệu văn bản (web, sách, code, bài báo...) đã qua xử lý, lọc chất lượng kỹ lưỡng - một quy trình thu thập và làm sạch dữ liệu ở quy mô công nghiệp.

**3. Hạ tầng tính toán khổng lồ** - huấn luyện các model lớn cần **hàng trăm tới hàng nghìn GPU cao cấp** (như H100 - xem lại [bài thuê cloud GPU](../03-ha-tang-thuc-chien/04-thue-cloud-gpu.md)) chạy song song liên tục trong nhiều tuần tới nhiều tháng.

**4. Chi phí** - cộng tất cả lại (hạ tầng, điện, nhân sự kỹ thuật), việc pre-train một LLM cạnh tranh được ở quy mô hiện nay tốn từ **hàng triệu tới hàng trăm triệu đô la** tùy quy mô model - hoàn toàn ngoài tầm với cá nhân hay doanh nghiệp nhỏ.

**5. Đội ngũ chuyên gia** - cần các nhà nghiên cứu có nền tảng học thuật sâu về machine learning, thường ở trình độ nghiên cứu sau đại học, làm việc theo nhóm lớn trong thời gian dài.

## Hai giai đoạn chính (ở mức khái quát)

- **Pre-training:** giai đoạn huấn luyện ban đầu, model học "dự đoán từ tiếp theo" trên lượng dữ liệu khổng lồ - kết quả là một model biết rất nhiều nhưng **chưa biết cách trò chuyện hữu ích, đúng mực** như Claude/ChatGPT bạn dùng hàng ngày.
- **Instruction tuning / RLHF (Reinforcement Learning from Human Feedback):** giai đoạn tiếp theo, dùng phản hồi của con người để "dạy" model cách trả lời hữu ích, an toàn, đúng ý người dùng - đây chính là bước biến một "cỗ máy dự đoán từ" thành một trợ lý AI thật sự dùng được, và cũng là bước các công ty như Anthropic đầu tư rất nhiều công sức nghiên cứu (đặc biệt khía cạnh an toàn).

## Vì sao gần như không ai (cá nhân/doanh nghiệp nhỏ) cần tự làm việc này?

Vì mọi nhu cầu thực tế gần như luôn được giải quyết tốt hơn, rẻ hơn, nhanh hơn bằng cách **dùng model có sẵn** (đóng hoặc mở) kết hợp với:
- **Prompt tốt** - miễn phí, tức thì.
- **RAG** - chi phí thấp, cho AI biết dữ liệu riêng của bạn.
- **Fine-tune LoRA** - chi phí vài chục tới vài trăm nghìn đồng (xem [bài trước](02-fine-tune-thuc-hanh.md)), điều chỉnh hành vi/phong cách theo nhu cầu hẹp.

So với chi phí hàng triệu đô để pre-train from scratch, ba lựa chọn trên đáp ứng được hầu như mọi nhu cầu thực tế của cá nhân, startup, hay cả doanh nghiệp vừa và lớn.

## Tài nguyên nếu muốn tìm hiểu sâu về lý thuyết

Nếu bạn tò mò muốn hiểu cơ chế bên trong (không phải để tự triển khai một model cạnh tranh, mà để học), một số tài nguyên đáng tin cậy do Andrej Karpathy (cựu Tesla, OpenAI, một trong những người giải thích deep learning dễ hiểu nhất) xây dựng:
- **nanoGPT** - một repo mã nguồn mở nhỏ gọn, cài đặt lại kiến trúc GPT ở mức đơn giản, dễ đọc, để học cách một LLM được xây dựng từ đầu như thế nào ở quy mô nhỏ (chạy được trên máy cá nhân/một GPU, chỉ để học, không tạo ra model cạnh tranh thực tế).
- **Video "Let's build GPT: from scratch, in code, spelled out"** - video giải thích từng dòng code xây một GPT nhỏ từ đầu, phù hợp cho người đã có nền tảng lập trình muốn hiểu sâu cơ chế.

Xem thêm các khóa học nền tảng khác ở [`06-kho-tai-nguyen/02-khoa-hoc-mien-phi.md`](../06-kho-tai-nguyen/02-khoa-hoc-mien-phi.md).

## Kết luận

Hiểu lý thuyết về pre-training giúp bạn có cái nhìn sâu hơn về cách AI hoạt động - điều này có giá trị, nhưng **không phải điều kiện cần để build sản phẩm AI thực tế**. Với mục tiêu build sản phẩm, hãy quay lại và làm chủ thật vững các kỹ năng đã học ở [`04-build-ung-dung-ai/`](../04-build-ung-dung-ai/) - đó là nơi 95%+ giá trị thực tế nằm ở đó.

## Bước tiếp theo

Trước khi rời phần nâng cao này, học cách đo lường thay vì đoán mò: [Eval trước khi fine-tune →](05-eval-truoc-khi-fine-tune.md)
