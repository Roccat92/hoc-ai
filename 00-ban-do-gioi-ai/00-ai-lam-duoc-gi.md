# AI làm được gì - và vì sao phải cẩn thận với "mỏ vàng"

Đây là bài **đầu tiên**, dành cho người **chưa biết gì về AI** và muốn thấy ngay câu trả lời thực tế: rốt cuộc AI làm được gì cho mình? Học xong bạn sẽ có bức tranh tổng thể về các nhóm năng lực của AI hiện nay, biết thư viện này tập trung vào nhánh nào, và - quan trọng không kém - biết nhận diện chiêu trò "kiếm tiền nhanh bằng AI" tràn lan trên mạng để không mất tiền oan. Đây cũng là điểm bắt đầu hợp lý nếu bạn đang tìm hiểu AI là gì và không biết học AI từ đâu khi chưa có nền tảng công nghệ.

> **Gặp từ lạ đừng lo.** Trong thư viện này bạn sẽ thấy vài từ tiếng Anh lặp lại - ví dụ *repo* (viết tắt của *repository*, nghĩa là "kho chứa toàn bộ nội dung/code của một dự án"; ở đây chính là thư viện Học AI Việt này), hay *token*, *API*, *GitHub*... Bất cứ khi nào gặp một từ chưa hiểu, mở [**Từ điển thuật ngữ A-Z**](06-tu-dien-thuat-ngu.md) (cũng luôn có trên thanh menu trên cùng) để tra - không cần nhớ hết, cứ tra khi cần. Những từ quan trọng sẽ được giải thích lại ngay tại chỗ khi dùng lần đầu.

## AI giúp được gì trong đời sống hàng ngày?

Trước khi đi vào bản đồ đầy đủ, hình dung nhanh vài việc AI **đã có thể** giúp bạn ngay trong cuộc sống thường ngày, chỉ bằng cách gõ yêu cầu bằng tiếng Việt bình thường:

- Soạn và trả lời email, viết đơn từ, tin nhắn khó nói cho khéo.
- Dịch tài liệu/đoạn chat tiếng nước ngoài, giải thích nghĩa từ lạ.
- Tóm tắt một văn bản dài (hợp đồng, bài báo, tài liệu học) thành vài ý chính.
- Giải thích một khái niệm khó theo cách dễ hiểu, kèm ví dụ - như một gia sư riêng.
- Lên kế hoạch chuyến đi, gợi ý thực đơn theo nguyên liệu đang có, sắp xếp công việc.
- Viết bài đăng bán hàng, mô tả sản phẩm, kịch bản nội dung.

Đó mới là bề nổi, và phần lớn làm được **miễn phí** với bản dùng thử của các chatbot. Dưới đây là bản đồ đầy đủ hơn về những gì AI làm được.

## Bản đồ năng lực AI hiện nay

Sáu nhóm năng lực chính mà AI (chủ yếu là GenAI - xem [`01-ai-la-gi.md`](01-ai-la-gi.md)) đang làm tốt. Tên công cụ liệt kê bên dưới **đổi rất nhanh** *(kiểm tra: 05/09/2026)* - chỉ coi là ví dụ tham khảo, đừng học thuộc.

### Văn bản

AI viết, dịch, tóm tắt văn bản, và ngày càng được dùng nhiều trong chăm sóc khách hàng - trả lời câu hỏi thường gặp, soạn email, viết mô tả sản phẩm. Đây là năng lực "gốc" của LLM (sẽ nói kỹ ở [`02-llm-la-gi.md`](02-llm-la-gi.md)): AI về bản chất xử lý ngôn ngữ, nên mọi việc liên quan tới đọc/hiểu/viết đều làm được ngay từ đầu, không cần huấn luyện thêm gì. Ứng dụng phổ biến: dịch tài liệu, tóm tắt hợp đồng dài, chatbot hỗ trợ khách hàng 24/7.

Công cụ tiêu biểu (tên đổi nhanh, chỉ để tham khảo): Claude, ChatGPT, Gemini, Grok - dùng trực tiếp qua giao diện chat, không cần biết code.

### Code

**Đây là trọng tâm của thư viện Học AI Việt.** AI viết code, build web/app hoàn chỉnh, tự động hóa quy trình - khác "viết văn bản" (đầu ra là chữ để đọc), đầu ra ở đây là **chương trình chạy được thật**. Một người chưa từng biết lập trình vẫn tự tay tạo ra sản phẩm dùng được - đúng như bạn đã/sắp trải nghiệm ở [phần 2](../02-code-voi-ai/) và [phần 4](../04-build-ung-dung-ai/).

Công cụ tiêu biểu: Claude Code, Cursor, GitHub Copilot.

### Hình ảnh

AI tạo ảnh từ mô tả văn bản, sửa/chỉnh ảnh có sẵn, dựng mockup sản phẩm nhanh. Hữu ích để: minh họa bài viết, làm banner quảng cáo, thử nghiệm ý tưởng thiết kế trước khi thuê designer làm bản hoàn chỉnh - không thay thế hoàn toàn công việc thiết kế chuyên nghiệp, nhưng rút ngắn đáng kể giai đoạn phác thảo ban đầu.

Công cụ tiêu biểu: Midjourney, DALL-E, Stable Diffusion.

### Video & âm thanh

AI tạo video ngắn từ mô tả văn bản hoặc ảnh, lồng tiếng tự nhiên (text-to-speech), tạo nhạc nền theo yêu cầu. Đây là nhánh phát triển nhanh nhất gần đây, nhưng chất lượng và độ ổn định vẫn chưa bằng ba nhóm trên - thường cần thử nhiều lần, chỉnh sửa nhiều mới ra kết quả ưng ý, chưa phải "bấm một phát ăn ngay".

Một nhánh khác đang phát triển nhanh: **hội thoại giọng nói thời gian thực** (voice realtime) - bạn nói chuyện trực tiếp bằng giọng, AI nghe và trả lời lại ngay bằng giọng gần như tức thì, khác hẳn kiểu cũ "gõ chữ rồi AI đọc to lên" chậm rãi. Nhiều chatbot phổ biến đã có chế độ này - mở app trên điện thoại, tìm biểu tượng micro để thử.

Công cụ tiêu biểu: các nền tảng tạo video AI (Runway, Sora...), công cụ lồng tiếng (ElevenLabs), công cụ tạo nhạc (Suno).

### Agent & tự động hóa

AI không chỉ trả lời một câu hỏi mà tự lên kế hoạch, gọi công cụ, thực hiện chuỗi nhiều bước để hoàn thành một mục tiêu - sẽ học kỹ ở [`04-build-ung-dung-ai/03-ai-agent.md`](../04-build-ung-dung-ai/03-ai-agent.md). Ứng dụng: tự động hóa quy trình lặp lại (xử lý email, cập nhật bảng tính), trợ lý tự tìm kiếm và tổng hợp thông tin thay bạn.

Một dạng "gọi công cụ" đáng chú ý gần đây: thay vì tự tạo nội dung từ đầu, AI có thể **điều khiển trực tiếp phần mềm chuyên dụng có sẵn** - dựng phim, tạo mô hình 3D, chỉnh sửa ảnh hàng loạt, đăng bài lên mạng xã hội... - thông qua **MCP** (Model Context Protocol, xem [từ điển thuật ngữ](06-tu-dien-thuat-ngu.md)), một chuẩn kết nối mở giúp AI "cắm" vào đúng công cụ cần dùng theo cách chuẩn hóa, thay vì mỗi nơi phải tự viết tích hợp riêng. Ngày càng nhiều phần mềm sáng tạo cung cấp MCP server riêng cho đúng việc này - xem ví dụ thật (không phải lý thuyết) trong case study [Mockup Studio](../07-case-study/04-mockup-studio.md): một công cụ xử lý ảnh được gọi thẳng qua MCP để agent tự tạo mockup cho khách, không cần ai mở web bấm tay. Hiểu đơn giản: bạn mô tả kết quả muốn có, AI tự vận hành công cụ chuyên nghiệp để ra kết quả đó - giống thuê một trợ lý đã biết dùng thành thạo công cụ ấy, chỉ khác là trợ lý này làm việc qua mô tả bằng lời thay vì thao tác chuột tay. Xem kỹ hơn ở [`04-build-ung-dung-ai/03-ai-agent.md`](../04-build-ung-dung-ai/03-ai-agent.md#mcp-chuan-hoa-viec-ket-noi-agent-voi-cong-cu-du-lieu).

Công cụ tiêu biểu: Claude Code (agent chuyên code), n8n kết hợp AI (xem [`04-build-ung-dung-ai/05-n8n-automation.md`](../04-build-ung-dung-ai/05-n8n-automation.md)).

### Dữ liệu

AI phân tích số liệu, đọc hiểu tài liệu dài (hợp đồng, báo cáo), và qua kỹ thuật RAG (xem [`04-build-ung-dung-ai/02-rag-la-gi-va-build.md`](../04-build-ung-dung-ai/02-rag-la-gi-va-build.md)) trả lời câu hỏi dựa trên đúng kho tài liệu riêng của bạn thay vì kiến thức chung chung. Ứng dụng: chatbot hỏi đáp tài liệu nội bộ công ty, tự động trích xuất thông tin từ hóa đơn/hợp đồng số lượng lớn.

Công cụ tiêu biểu: kết hợp API LLM với vector database (Chroma, Pinecone).

## Cảnh giác với "mỏ vàng"

Bạn chắc đã thấy công thức bài viral quen thuộc trên mạng xã hội: **"TIN NÓNG: công cụ AI [tên công cụ] giúp kiếm [một-vài-nghìn] đô/tháng - comment 'AI' để nhận link hướng dẫn miễn phí"**. Công thức này lặp lại đều đặn mỗi khi có công cụ AI mới ra mắt - đặc biệt các công cụ tạo ảnh/video - và đáng để hiểu rõ bản chất trước khi tin theo.

**Sự thật:** khi một công cụ AI ai cũng bấm được, ai cũng ra kết quả gần giống nhau - hàng nghìn người cùng tạo nội dung na ná nhau, thị trường không hấp thụ nổi lượng cung đó, nên phần lớn người "làm theo đúng hướng dẫn" kiếm được rất ít. **Thu nhập thực sự chảy về phía người BÁN khóa học dạy cách làm** - họ bán được cho hàng nghìn người cùng lúc, trong khi các học viên lại đang cạnh tranh trực tiếp với nhau.

**Quy tắc tự kiểm tra:** nghề dùng AI kiếm tiền bền vững luôn có dạng **chuyên môn riêng + AI**, không phải **AI thay thế chuyên môn**. Người đã giỏi marketing dùng AI để làm nhanh hơn - bền, vì chuyên môn vẫn là của riêng họ. Người chưa biết gì, chỉ học "cách bấm công cụ AI X" rồi mong kiếm tiền ngay - rủi ro cao, vì hàng nghìn người khác đang học đúng công thức giống hệt bạn.

## Phạm vi của thư viện này

Trong sáu nhóm năng lực kể trên, **Học AI Việt tập trung vào đúng một nhánh: CODE** - dùng AI để build sản phẩm phần mềm thật và tự động hóa công việc. Không phải vì các nhánh khác (ảnh, video, âm thanh) không đáng học - mà vì tập trung sâu vào một nhánh, dạy tới nơi tới chốn, tốt hơn dàn trải nông ở cả sáu nhóm cùng lúc.

Nhánh media/video/ảnh hiện **để mở cho cộng đồng đóng góp** - có kinh nghiệm thực chiến (đã từng tạo ra sản phẩm/thu nhập thật, không chỉ biết bấm một công cụ) thì đóng góp theo [CONTRIBUTING.md](../CONTRIBUTING.md).

**Một câu để nhớ:** AI làm được rất nhiều, nhưng ai cũng bấm được y hệt bạn - tiền thật nằm ở chuyên môn bạn cộng thêm vào, không nằm ở cái nút bấm.

## Bước tiếp theo

Đã thấy bức tranh AI làm được gì, giờ đi vào hiểu bản chất một chút để không bị "khớp" mỗi khi nghe thuật ngữ: [AI, ML, Deep Learning, GenAI khác nhau thế nào?](01-ai-la-gi.md)
