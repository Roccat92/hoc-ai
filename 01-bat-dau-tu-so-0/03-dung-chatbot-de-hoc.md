# Dùng chatbot AI để học nhanh hơn

Bài này dành cho người muốn biến Claude/ChatGPT/Gemini thành **một gia sư riêng miễn phí**, thay vì chỉ dùng để hỏi vu vơ. Học xong bạn sẽ biết cách đặt câu hỏi để học sâu hơn thay vì chỉ nhận câu trả lời rồi quên ngay, và biết giới hạn của bản miễn phí để dùng cho hợp lý.

## Bản miễn phí đủ dùng để học không?

**Có, thừa đủ** cho toàn bộ giai đoạn học nền tảng trong repo này. Cả ba chatbot phổ biến (Claude.ai, ChatGPT, Gemini) đều có bản miễn phí với những giới hạn tương tự nhau:

- **Giới hạn số lượng tin nhắn** trong một khoảng thời gian (ví dụ: một số tin nhắn mỗi vài giờ) — hết lượt thì chờ, hoặc chuyển qua chatbot khác dùng tạm.
- **Context window nhỏ hơn** bản trả phí — cuộc trò chuyện quá dài dễ bị "quên" phần đầu hơn (xem lại khái niệm context window ở [`00-ban-do-gioi-ai/02-llm-la-gi.md`](../00-ban-do-gioi-ai/02-llm-la-gi.md)).
- **Không truy cập được các model mạnh nhất** của hãng (thường dành riêng cho bản trả phí).

Con số cụ thể (bao nhiêu tin nhắn/giờ, giá nâng cấp) thay đổi thường xuyên — kiểm tra trực tiếp tại claude.ai, chatgpt.com, gemini.google.com để có thông tin mới nhất.

**Mẹo:** vì cả ba đều có bản free, hãy **dùng cả ba** khi mới học — mỗi cái sẽ "hết lượt" ở thời điểm khác nhau, và bạn có cơ hội đối chiếu câu trả lời (rất hữu ích để kiểm tra thông tin quan trọng).

## Cách đặt câu hỏi để học sâu hơn, không chỉ "xin đáp án"

### Yêu cầu ví dụ cụ thể, không chỉ lý thuyết

So sánh hai cách hỏi về cùng một khái niệm:
- **Kém hiệu quả:** "Giải thích API là gì?"
- **Hiệu quả hơn:** "Giải thích API là gì, cho mình một ví dụ đời thường dễ hình dung (không phải ví dụ code), rồi một ví dụ code JavaScript đơn giản."

### Yêu cầu giải thích theo trình độ của bạn

Đừng ngại nói thẳng bạn chưa biết gì: "Giải thích cho người chưa từng học lập trình bao giờ" hoặc "Giải thích như thể mình 12 tuổi" đều là prompt hoàn toàn hợp lệ và hiệu quả — AI sẽ điều chỉnh độ phức tạp của câu trả lời.

### Hỏi ngược để tự kiểm tra mình đã hiểu chưa

Sau khi được giải thích một khái niệm, thử prompt: **"Giờ đưa cho mình 3 câu hỏi trắc nghiệm ngắn để kiểm tra mình có hiểu đúng không"**. Đây là cách học chủ động hiệu quả hơn nhiều so với chỉ đọc rồi gật đầu.

### Yêu cầu AI đóng vai để thực hành

Ví dụ đang học cách phỏng vấn xin việc, hoặc luyện giải thích một khái niệm cho người khác: "Đóng vai một người mới hoàn toàn, hỏi mình về [chủ đề] như thể bạn chưa biết gì, để mình luyện giải thích lại."

## Cách kiểm tra khi nghi ngờ AI "bịa" (hallucination)

Nhắc lại từ bài LLM là gì: AI có thể trả lời sai mà vẫn rất tự tin. Vài mẹo:
- Hỏi thẳng: **"Bạn có chắc thông tin này đúng không? Nếu không chắc, nói rõ mức độ chắc chắn."**
- Với thông tin quan trọng (giá cả, số liệu, tên phiên bản phần mềm), **hỏi cả ba chatbot rồi so sánh** — nếu cả ba đồng nhất thì độ tin cậy cao hơn.
- Với câu hỏi kỹ thuật cụ thể (ví dụ: "lệnh này đúng cú pháp không?"), **chạy thử luôn** thay vì chỉ hỏi và tin.

## Dùng chatbot để "dịch" thuật ngữ khi đọc tài liệu tiếng Anh

Rất nhiều tài liệu công nghệ chỉ có tiếng Anh. Thay vì bỏ qua vì ngại tiếng Anh, thử: copy đoạn văn bản, dán vào chatbot, hỏi "**dịch và giải thích đoạn này bằng tiếng Việt, dễ hiểu**" — nhanh và hiệu quả hơn dịch máy thông thường vì AI hiểu ngữ cảnh kỹ thuật.

## Đừng dừng lại ở "hỏi xong rồi thôi"

Kỹ năng học với AI hiệu quả nhất là **tự tay làm lại** sau khi được giải thích — dù chỉ là gõ lại đoạn code mẫu bằng tay, hay tự viết một ví dụ khác dựa trên khái niệm vừa học. AI giúp bạn học nhanh hơn, nhưng không thay được việc bạn tự thực hành.

## Bước tiếp theo

Đã biết cách khai thác chatbot để học, giờ học kỹ thuật viết prompt bài bản hơn: [Prompt cơ bản](04-prompt-co-ban.md)
