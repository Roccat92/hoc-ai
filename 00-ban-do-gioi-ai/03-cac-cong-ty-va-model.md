# Các công ty và model AI lớn: ai mạnh gì?

Bài này dành cho người hay nghe nhắc tới "Claude", "GPT", "Gemini", "Llama", "DeepSeek", "Qwen", "Mistral" mà không biết ai làm ra ai, khác nhau ở đâu - kiểu câu hỏi "cái này là của OpenAI hay Google vậy?". Học xong bạn sẽ tự tin phân biệt được các hãng, biết đại khái mỗi model mạnh ở mảng nào, và biết nên chọn model nào cho việc gì.

> **Lưu ý quan trọng:** Ngành này thay đổi theo tuần, không phải theo năm. Model "mạnh nhất" hôm nay có thể bị vượt mặt trong vài tháng. Bài này cho bạn **bức tranh tổng thể ổn định** (ai là ai, định hướng của từng hãng) - còn model nào đang mạnh nhất tại thời điểm bạn đọc, hãy kiểm tra bảng xếp hạng cộng đồng như [lmarena.ai](https://lmarena.ai) hoặc trang chủ từng hãng thay vì tin vào con số cố định trong bài viết bất kỳ, kể cả bài này.

## Nhóm "closed" - model đóng, dùng qua API/app, không tải về được

### Anthropic - Claude

Công ty do một nhóm cựu nhân viên OpenAI thành lập, đặt trọng tâm vào **an toàn AI** (AI safety). Claude nổi tiếng đặc biệt mạnh về **viết code, lý luận dài hơi, làm theo hướng dẫn phức tạp**, và là model đứng sau công cụ Claude Code mà repo này dùng làm công cụ chính để dạy code. Dùng qua claude.ai (chat) hoặc API.

### OpenAI - GPT / ChatGPT

Cái tên phổ biến nhất với người dùng phổ thông nhờ ChatGPT ra mắt cuối 2022 tạo nên làn sóng GenAI đại chúng. Hệ sinh thái rộng (ChatGPT, DALL-E tạo ảnh, Sora tạo video, GPT API), cộng đồng lớn, nhiều tài liệu/hướng dẫn nhất trên mạng vì phổ biến lâu.

### Google - Gemini

Model của Google, có lợi thế tích hợp sâu vào hệ sinh thái Google (Gmail, Docs, Android, Search) và thường có **context window rất lớn**, khả năng xử lý đa phương tiện (ảnh, video, audio) tốt. Dùng qua Gemini app, tích hợp trong Google Workspace, hoặc API (Google AI Studio / Vertex AI).

## Nhóm "open" - model mở, tải về chạy trên máy/server riêng được

> Xem phân biệt kỹ hơn open vs closed ở bài tiếp theo: [`04-open-source-vs-closed.md`](04-open-source-vs-closed.md)

### Meta - Llama

Meta (công ty mẹ Facebook, Instagram) là hãng lớn tiên phong trong việc phát hành model **trọng số mở (open-weight)** miễn phí cho mục đích thương mại (có điều kiện tùy phiên bản license). Llama được cộng đồng dùng rộng rãi để tự host (tự chạy model trên máy/server của mình thay vì gọi qua mạng của hãng), fine-tune riêng.

### DeepSeek

Phòng nghiên cứu AI Trung Quốc gây tiếng vang lớn nhờ phát hành model open-weight có hiệu năng cạnh tranh với các model đóng hàng đầu, trong khi chi phí huấn luyện được công bố thấp hơn đáng kể - cho thấy open-weight có thể đuổi kịp closed rất nhanh. Mạnh về code và toán.

### Alibaba - Qwen

Model open-weight của Alibaba, có nhiều kích thước (từ nhỏ chạy được trên máy cá nhân, tới lớn cần server mạnh), hỗ trợ đa ngôn ngữ tốt, được cộng đồng self-host ưa chuộng vì đa dạng lựa chọn kích thước.

### Mistral

Startup Pháp, nổi tiếng với các model **nhỏ nhưng hiệu quả** - chạy nhẹ, phù hợp máy cấu hình vừa phải, được dùng nhiều cho ứng dụng cần tốc độ và chi phí thấp hơn là sức mạnh tối đa.

## Bảng tổng hợp nhanh

| Công ty | Model tiêu biểu | Đóng/Mở | Điểm mạnh thường được nhắc tới |
|---|---|---|---|
| Anthropic | Claude | Đóng | Code, làm theo hướng dẫn phức tạp, an toàn |
| OpenAI | GPT / ChatGPT | Đóng | Phổ biến, hệ sinh thái rộng, đa phương tiện |
| Google | Gemini | Đóng | Context window lớn, tích hợp Google, đa phương tiện |
| Meta | Llama | Mở | Cộng đồng lớn, nhiều tài liệu self-host |
| DeepSeek | DeepSeek-V/-R | Mở | Hiệu năng/chi phí huấn luyện tốt, mạnh code & toán |
| Alibaba | Qwen | Mở | Đa dạng kích thước, đa ngôn ngữ |
| Mistral | Mistral / Mixtral | Mở (phần lớn) | Nhẹ, hiệu quả, chạy máy vừa phải |

## Về giá API

Giá API của các hãng được tính theo **số token** (xem lại khái niệm token ở [bài trước](02-llm-la-gi.md)), thường chia theo token đầu vào (input) và đầu ra (output), và có nhiều mức giá theo từng dòng model (model nhỏ/nhanh giá rẻ hơn, model lớn/mạnh giá cao hơn). Giá thay đổi khá thường xuyên, chênh lệch giữa các hãng và giữa các model trong cùng một hãng có thể rất lớn.

**Vì con số cụ thể lỗi thời rất nhanh, bài này không liệt kê giá chính xác.** Khi cần biết giá hiện tại, vào thẳng trang pricing chính thức:
- Anthropic: anthropic.com/pricing
- OpenAI: openai.com/pricing
- Google: ai.google.dev/pricing (Gemini API)

Chi tiết cách tính chi phí thực tế khi gọi API xem tại [`04-build-ung-dung-ai/01-goi-api-llm.md`](../04-build-ung-dung-ai/01-goi-api-llm.md).

## Chọn model nào cho việc gì?

Vài quy tắc chung, không tuyệt đối:
- **Học code, build sản phẩm với AI code editor:** Claude thường được cộng đồng dev đánh giá cao cho việc này (đây cũng là lý do repo này dùng Claude Code làm công cụ chính).
- **Chatbot phổ thông, viết lách, tra cứu nhanh:** cả Claude/ChatGPT/Gemini bản miễn phí đều dùng tốt - thử cả ba, xem cái nào hợp "gu" trả lời của bạn.
- **Cần tự host, không muốn phụ thuộc API bên ngoài, hoặc dữ liệu nhạy cảm không muốn gửi ra ngoài:** cân nhắc model mở (Llama, Qwen, DeepSeek, Mistral) chạy qua Ollama - xem [`03-ha-tang-thuc-chien/05-chay-llm-tren-may-minh.md`](../03-ha-tang-thuc-chien/05-chay-llm-tren-may-minh.md).
- **Ngân sách hạn chế, cần gọi API nhiều:** so sánh giá các model "hạng nhẹ" (mini/flash/haiku-tier) của từng hãng - thường rẻ hơn model đầu bảng rất nhiều mà vẫn đủ dùng cho tác vụ đơn giản.

## Bước tiếp theo

Hiểu các hãng rồi, giờ đào sâu vào một câu hỏi quan trọng khi chọn công cụ: [Model mở vs đóng - khi nào dùng cái nào?](04-open-source-vs-closed.md)
