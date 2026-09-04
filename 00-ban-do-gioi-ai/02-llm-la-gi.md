# LLM là gì? Token, context, temperature - giải thích không cần biết toán

Bài này dành cho người muốn hiểu **Claude, ChatGPT, Gemini thực chất đang làm gì** khi bạn gõ câu hỏi và nhận được câu trả lời - không cần biết lập trình hay toán học. Học xong bạn sẽ hiểu vì sao AI đôi khi "quên" những gì bạn nói lúc đầu cuộc trò chuyện, vì sao AI đôi khi bịa thông tin, và các thuật ngữ "token", "context window", "temperature" nghĩa là gì mỗi khi bạn thấy chúng.

## LLM là gì?

LLM (Large Language Model - Mô hình ngôn ngữ lớn) là một chương trình AI được huấn luyện trên một lượng văn bản khổng lồ (sách, web, code, bài báo...) để làm một việc tưởng chừng đơn giản: **dự đoán từ/cụm từ tiếp theo có khả năng xuất hiện cao nhất**, dựa trên những gì đã có trước đó.

Nghe có vẻ đơn giản, nhưng khi mô hình đủ lớn (hàng tỷ đến hàng nghìn tỷ tham số) và được huấn luyện trên đủ dữ liệu, khả năng "đoán từ tiếp theo" này tạo ra hiệu ứng bất ngờ: mô hình có thể trả lời câu hỏi, viết code, tóm tắt văn bản, dịch ngôn ngữ, lý luận từng bước - dù chưa từng được dạy trực tiếp từng kỹ năng này.

Claude (Anthropic), GPT (OpenAI), Gemini (Google) đều là LLM - khác nhau ở cách huấn luyện, dữ liệu, và cách "tinh chỉnh" (fine-tune) để trả lời hữu ích, an toàn.

## Token - đơn vị nhỏ nhất mà LLM "nhìn thấy"

LLM không đọc từng chữ cái hay từng từ như con người. Nó chia văn bản thành các mảnh nhỏ gọi là **token**. Một token có thể là một từ ngắn, một phần của từ dài, hoặc một dấu câu.

Với **tiếng Anh**, ước lượng thô: 1 token ≈ 4 ký tự ≈ 0.75 từ.

Với **tiếng Việt**, mọi chuyện tốn kém hơn một chút: vì có dấu thanh và cấu trúc từ ghép, một từ tiếng Việt thường bị tách thành **nhiều token hơn** so với một từ tiếng Anh tương đương. Ví dụ từ "không" có thể là 1-2 token, nhưng cả câu "Tôi không biết" có thể tốn nhiều token hơn câu tiếng Anh "I don't know" dù ý nghĩa tương đương.

**Vì sao bạn cần quan tâm đến token?**
1. **Giá tiền** khi gọi API LLM thường tính theo số token (cả token đầu vào lẫn đầu ra) - xem chi tiết giá ở [`04-build-ung-dung-ai/01-goi-api-llm.md`](../04-build-ung-dung-ai/01-goi-api-llm.md). (*API* là cách để code của bạn tự "gọi" tới AI qua internet mà xử lý, thay vì bạn ngồi chat tay - gặp lại nhiều lần trong repo này, có giải thích đầy đủ ở [từ điển thuật ngữ](06-tu-dien-thuat-ngu.md).)
2. **Giới hạn context window** (mục dưới đây) cũng được đo bằng token, không phải bằng chữ.

<iframe
  src="/minh-hoa/llm-token.html"
  title="Minh họa: LLM tách token và sinh câu trả lời"
  loading="lazy"
  style="width:100%; height:440px; border:1px solid var(--vp-c-divider); border-radius:8px;">
</iframe>

## Context window - "trí nhớ" trong một cuộc trò chuyện

Context window (cửa sổ ngữ cảnh) là **số token tối đa** mà LLM có thể "nhìn thấy" cùng lúc trong một lần xử lý - bao gồm toàn bộ đoạn hội thoại từ đầu, file bạn đính kèm, và câu trả lời nó sắp tạo ra.

Hãy tưởng tượng context window như **một cái bàn làm việc có kích thước cố định**. Mọi thứ liên quan đến cuộc trò chuyện phải nằm gọn trên bàn đó thì AI mới "nhìn thấy" và dùng được. Khi cuộc trò chuyện quá dài, vượt quá kích thước bàn, những phần cũ nhất sẽ bị đẩy ra khỏi "tầm nhìn" - đó là lý do đôi khi AI có vẻ "quên" điều bạn nói cách đây rất lâu trong cùng một cuộc chat.

Các model hiện đại (2025-2026) thường có context window từ 128.000 đến hơn 1.000.000 token tùy model - đủ chứa từ vài trăm trang đến cả một cuốn sách. Con số chính xác thay đổi liên tục theo từng bản cập nhật, nên **kiểm tra trang chủ nhà cung cấp để có số mới nhất** thay vì tin vào một con số cố định.

**Mẹo thực tế:** nếu cuộc trò chuyện quá dài và AI bắt đầu trả lời "lạc đề" hoặc quên context, hãy mở cuộc trò chuyện mới và tóm tắt lại những gì cần thiết - đừng cố kéo dài một thread vô hạn.

## Temperature - độ "sáng tạo" của câu trả lời

Khi LLM dự đoán từ tiếp theo, nó thực ra tính ra một **danh sách xác suất** cho nhiều từ có thể đứng tiếp theo, rồi chọn một từ trong số đó. **Temperature** là tham số điều chỉnh việc "chọn" này diễn ra táo bạo hay an toàn đến đâu:

- **Temperature thấp** (gần 0): gần như luôn chọn từ có xác suất cao nhất → câu trả lời ổn định, ít thay đổi giữa các lần hỏi, phù hợp cho việc cần độ chính xác cao (viết code, trích xuất dữ liệu, trả lời có căn cứ).
- **Temperature cao** (gần 1 hoặc hơn, tùy nền tảng): sẵn sàng chọn cả những từ ít khả năng hơn → câu trả lời đa dạng, sáng tạo hơn, nhưng cũng dễ "lạc hướng" hơn, phù hợp cho việc viết sáng tạo, brainstorm ý tưởng.

Khi dùng chatbot thường (Claude.ai, ChatGPT) bạn hiếm khi chỉnh temperature trực tiếp - nó chỉ hiện ra khi bạn gọi API bằng code. Nhưng hiểu khái niệm này giúp bạn hiểu vì sao hỏi AI cùng một câu hai lần có thể ra hai câu trả lời hơi khác nhau.

## Vì sao AI đôi khi "bịa" (hallucination)?

Vì bản chất LLM là **dự đoán từ có khả năng cao nhất**, không phải tra cứu một cơ sở dữ liệu sự thật. Khi gặp câu hỏi mà nó không có đủ thông tin đáng tin cậy, nó vẫn có xu hướng tạo ra một câu trả lời **nghe rất trôi chảy và tự tin** - dù nội dung sai. Hiện tượng này gọi là **hallucination** (ảo giác).

**Cách giảm rủi ro khi dùng AI:**
- Với thông tin quan trọng (số liệu, tên riêng, sự kiện cụ thể), luôn kiểm tra chéo với nguồn khác.
- Yêu cầu AI trích dẫn nguồn hoặc giải thích cách nó suy ra kết luận.
- Với việc code: chạy thử code, đừng tin code "trông đúng" mà chưa chạy.
- Dùng kỹ thuật RAG (cho AI đọc tài liệu thật thay vì chỉ dựa vào trí nhớ huấn luyện) khi cần độ chính xác cao - xem [`04-build-ung-dung-ai/02-rag-la-gi-va-build.md`](../04-build-ung-dung-ai/02-rag-la-gi-va-build.md).

## Bước tiếp theo

Hiểu được cách LLM hoạt động rồi, giờ tìm hiểu xem trên thị trường có những công ty và model nào, ai mạnh ở đâu: [Các công ty và model AI lớn](03-cac-cong-ty-va-model.md)
