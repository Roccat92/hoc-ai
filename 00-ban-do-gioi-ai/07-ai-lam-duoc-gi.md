# AI làm được gì — và vì sao phải cẩn thận với "mỏ vàng"

Bài này dành cho người đã đi qua sáu bài trước trong phần này và muốn có một bức tranh tổng thể: AI hiện làm được những gì, không chỉ riêng chuyện code. Học xong bạn sẽ biết AI đang mạnh ở những nhóm năng lực nào, hiểu vì sao thư viện này chỉ tập trung vào đúng một nhánh trong số đó, và — quan trọng không kém — biết nhận diện chiêu trò "kiếm tiền nhanh bằng AI" đang tràn lan trên mạng xã hội để không mất tiền oan.

## Bản đồ năng lực AI hiện nay

Sáu nhóm năng lực chính mà AI (chủ yếu là GenAI — xem lại [`01-ai-la-gi.md`](01-ai-la-gi.md)) đang làm tốt. Tên công cụ liệt kê bên dưới **đổi rất nhanh** — công cụ hot nhất hôm nay có thể bị thay thế trong vài tháng — nên chỉ coi là ví dụ tham khảo, đừng học thuộc.

### Văn bản

AI viết, dịch, tóm tắt văn bản, và ngày càng được dùng nhiều trong chăm sóc khách hàng — trả lời câu hỏi thường gặp, soạn email, viết mô tả sản phẩm. Đây là năng lực "gốc" của LLM (nhắc lại [`02-llm-la-gi.md`](02-llm-la-gi.md)): AI về bản chất xử lý ngôn ngữ, nên mọi việc liên quan tới đọc/hiểu/viết đều làm được ngay từ đầu, không cần huấn luyện thêm gì. Ứng dụng phổ biến: dịch tài liệu, tóm tắt hợp đồng dài, chatbot hỗ trợ khách hàng 24/7.

Công cụ tiêu biểu (tên đổi nhanh, chỉ để tham khảo): Claude, ChatGPT, Gemini — dùng trực tiếp qua giao diện chat, không cần biết code.

### Code

**Đây là trọng tâm của thư viện Học AI Việt.** AI viết code, build web/app hoàn chỉnh, tự động hóa quy trình làm việc — khác với "viết văn bản" (đầu ra là chữ để đọc), đầu ra ở đây là **chương trình chạy được thật**: một trang web, một app, một script tự động. Đây là nhánh mà một người chưa từng biết lập trình vẫn có thể tự tay tạo ra sản phẩm dùng được, không chỉ dừng ở ý tưởng trên giấy — đúng như bạn đã (hoặc sắp) trải nghiệm ở [phần 2](../02-code-voi-ai/) và [phần 4](../04-build-ung-dung-ai/).

Công cụ tiêu biểu: Claude Code, Cursor, GitHub Copilot.

### Hình ảnh

AI tạo ảnh từ mô tả văn bản, sửa/chỉnh ảnh có sẵn, dựng mockup sản phẩm nhanh. Hữu ích để: minh họa bài viết, làm banner quảng cáo, thử nghiệm ý tưởng thiết kế trước khi thuê designer làm bản hoàn chỉnh — không thay thế hoàn toàn công việc thiết kế chuyên nghiệp, nhưng rút ngắn đáng kể giai đoạn phác thảo ban đầu.

Công cụ tiêu biểu: Midjourney, DALL-E, Stable Diffusion.

### Video & âm thanh

AI tạo video ngắn từ mô tả văn bản hoặc ảnh, lồng tiếng tự nhiên (text-to-speech), tạo nhạc nền theo yêu cầu. Đây là nhánh phát triển nhanh nhất gần đây, nhưng chất lượng và độ ổn định vẫn chưa bằng ba nhóm trên — thường cần thử nhiều lần, chỉnh sửa nhiều mới ra kết quả ưng ý, chưa phải "bấm một phát ăn ngay".

Công cụ tiêu biểu: các nền tảng tạo video AI (Runway, Sora...), công cụ lồng tiếng (ElevenLabs), công cụ tạo nhạc (Suno).

### Agent & tự động hóa

AI không chỉ trả lời một câu hỏi mà tự lên kế hoạch, gọi công cụ, thực hiện chuỗi nhiều bước để hoàn thành một mục tiêu — đã học kỹ ở [`04-build-ung-dung-ai/03-ai-agent.md`](../04-build-ung-dung-ai/03-ai-agent.md). Ứng dụng: tự động hóa quy trình lặp lại (xử lý email, cập nhật bảng tính), trợ lý tự tìm kiếm và tổng hợp thông tin thay bạn.

Công cụ tiêu biểu: Claude Code (agent chuyên code), n8n kết hợp AI (xem [`04-build-ung-dung-ai/05-n8n-automation.md`](../04-build-ung-dung-ai/05-n8n-automation.md)).

### Dữ liệu

AI phân tích số liệu, đọc hiểu tài liệu dài (hợp đồng, báo cáo), và qua kỹ thuật RAG (xem [`04-build-ung-dung-ai/02-rag-la-gi-va-build.md`](../04-build-ung-dung-ai/02-rag-la-gi-va-build.md)) trả lời câu hỏi dựa trên đúng kho tài liệu riêng của bạn thay vì kiến thức chung chung. Ứng dụng: chatbot hỏi đáp tài liệu nội bộ công ty, tự động trích xuất thông tin từ hóa đơn/hợp đồng số lượng lớn.

Công cụ tiêu biểu: kết hợp API LLM với vector database (Chroma, Pinecone).

## Cảnh giác với "mỏ vàng"

Bạn chắc đã thấy công thức bài viral quen thuộc trên mạng xã hội: **"TIN NÓNG: công cụ AI [tên công cụ] giúp kiếm [một-vài-nghìn] đô/tháng — comment 'AI' để nhận link hướng dẫn miễn phí"**. Công thức này lặp lại đều đặn mỗi khi có công cụ AI mới ra mắt — đặc biệt các công cụ tạo ảnh/video — và đáng để hiểu rõ bản chất trước khi tin theo.

**Sự thật:** khi một công cụ AI ai cũng bấm được, ai cũng tạo ra kết quả gần giống nhau — hàng nghìn người cùng lúc tạo nội dung na ná nhau, bằng cùng một công cụ, thậm chí cùng một vài prompt phổ biến được chia sẻ tràn lan khắp nơi. Thị trường (người xem, người mua) không thể hấp thụ nổi lượng cung tăng đột biến đó, nên phần lớn người "làm theo đúng hướng dẫn" kiếm được rất ít, hoặc không kiếm được gì. **Thu nhập thực sự chảy chủ yếu về phía người BÁN khóa học dạy cách làm** — họ kiếm tiền từ việc dạy, không phải từ việc tự mình dùng công cụ đó tạo ra sản phẩm, và họ có lợi thế bán được cho hàng nghìn người cùng lúc trong khi mỗi học viên lại đang cạnh tranh trực tiếp với nhau.

**Quy tắc để tự kiểm tra bất kỳ lời hứa "kiếm tiền bằng AI" nào:** nghề dùng AI kiếm tiền bền vững luôn có dạng **chuyên môn riêng + AI**, không phải **AI thay thế chuyên môn**. Một người đã giỏi marketing dùng AI để làm marketing nhanh hơn, nhiều hơn — bền, vì chuyên môn (hiểu khách hàng, hiểu sản phẩm, óc thẩm mỹ) vẫn là của riêng họ, AI chỉ tăng tốc. Một người chưa biết gì về một lĩnh vực, chỉ học "cách bấm công cụ AI X" rồi mong kiếm tiền ngay — rủi ro rất cao, vì đúng lúc đó có hàng nghìn người khác cũng đang học đúng công thức giống hệt bạn.

## Phạm vi của thư viện này

Trong sáu nhóm năng lực kể trên, **Học AI Việt tập trung vào đúng một nhánh: CODE** — dùng AI để build sản phẩm phần mềm thật và tự động hóa công việc. Không phải vì các nhánh khác (ảnh, video, âm thanh) không đáng học — mà vì tập trung sâu vào một nhánh, dạy tới nơi tới chốn, tốt hơn dàn trải nông ở cả sáu nhóm cùng lúc.

Nhánh media/video/ảnh hiện **để mở cho cộng đồng đóng góp**. Nếu bạn có kinh nghiệm thực chiến với quy trình làm việc (workflow) trong các nhánh này — không chỉ biết dùng một công cụ, mà đã từng tạo ra sản phẩm/thu nhập thật từ đó — tạo một thư mục mới theo đúng hướng dẫn ở [CONTRIBUTING.md](../CONTRIBUTING.md). Yêu cầu chất lượng giữ nguyên như phần còn lại của repo: **thực chiến, có chi phí thật kèm theo, tuyệt đối không phải một khóa học trá hình núp bóng nội dung mở** — đúng tinh thần "mỏ vàng" mà bài này vừa cảnh báo, chính là thứ chúng ta không muốn lặp lại ở đây.

## Bước tiếp theo

Muốn biết rõ hơn AI đang tạo ra những công việc/nghề nào cho con người, xem lại [Các nghề trong AI](05-cac-nghe-trong-ai.md).

Đã có bức tranh đầy đủ về năng lực AI, giờ bắt tay vào học thật: [Bắt đầu từ số 0 →](../01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai.md)
