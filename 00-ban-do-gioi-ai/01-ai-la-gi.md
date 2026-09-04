# AI, ML, Deep Learning, GenAI khác nhau thế nào?

Bài này dành cho người **chưa từng học AI ngày nào**, nghe người ta nói "AI", "Machine Learning", "Deep Learning", "GenAI" mà không biết chúng khác nhau ở đâu, có phải bốn thứ tách biệt hay không. Đọc xong bạn sẽ tự tin phân biệt được bốn khái niệm này khi nghe ai đó nhắc tới, và hiểu vì sao ChatGPT/Claude được gọi là "GenAI".

## Hình dung nhanh: bốn vòng tròn lồng nhau

Đừng nghĩ AI, ML, Deep Learning, GenAI là bốn thứ ngang hàng, tách biệt. Chúng là **các vòng tròn lồng vào nhau**, cái sau là một phần nhỏ hơn, chuyên biệt hơn của cái trước:

<iframe src="/minh-hoa/ai-ml-dl-genai.html" title="Minh họa: AI, Machine Learning, Deep Learning và Generative AI" loading="lazy" style="width:100%; height:420px; border:1px solid var(--vp-c-divider); border-radius:8px;"></iframe>

Nói cách khác: **mọi GenAI đều là Deep Learning, mọi Deep Learning đều là Machine Learning, mọi Machine Learning đều là AI** - nhưng chiều ngược lại thì không đúng.

## AI (Artificial Intelligence) - Trí tuệ nhân tạo

AI là khái niệm **rộng nhất**: bất kỳ hệ thống máy tính nào được thiết kế để làm những việc vốn cần "trí thông minh" của con người - nhận diện, ra quyết định, giải quyết vấn đề, hiểu ngôn ngữ...

Quan trọng: AI **không nhất thiết phải "học"**. Một chương trình cờ vua chạy theo hàng nghìn luật `if-else` do con người viết tay cũng được tính là AI (AI dựa trên luật - "rule-based AI"), dù nó chẳng "học" gì cả. AI là cái tên chung cho cả một lĩnh vực, xuất hiện từ những năm 1950 - rất lâu trước khi có ChatGPT.

**Ví dụ:** GPS tìm đường đi ngắn nhất, bot chơi cờ vua, hệ thống gợi ý sản phẩm đơn giản dựa trên luật cố định.

## Machine Learning (ML) - Máy học

ML là một **tập con của AI**, nhưng có một điểm khác biệt cốt lõi: thay vì con người viết luật cứng, ta **cho máy học từ dữ liệu** để tự tìm ra quy luật.

Ví dụ dễ hình dung: thay vì viết luật "nếu email chứa chữ 'trúng thưởng' thì là spam", bạn đưa cho máy 100.000 email đã được gắn nhãn sẵn (spam / không spam), máy tự học ra quy luật nhận diện spam - kể cả những email dùng từ ngữ mà bạn chưa từng nghĩ tới.

**Ví dụ:** hệ thống gợi ý phim của Netflix, dự đoán giá nhà, lọc email rác thông minh.

## Deep Learning (DL) - Học sâu

Deep Learning là một **tập con của ML**, dùng một kiến trúc gọi là **mạng neural nhân tạo (neural network)** có nhiều lớp ("deep" = sâu, nhiều lớp xếp chồng lên nhau) - lấy cảm hứng (rất thô) từ cách các neuron trong não người kết nối với nhau.

Sự khác biệt lớn nhất so với ML truyền thống: Deep Learning **tự học ra đặc trưng (feature) từ dữ liệu thô**, không cần con người ngồi chọn sẵn "đặc điểm nào là quan trọng". Ví dụ với ảnh: ML truyền thống cần con người định nghĩa "cạnh viền", "màu sắc"... còn Deep Learning tự tìm ra những đặc trưng đó qua nhiều lớp mạng, và thường làm tốt hơn hẳn khi có đủ dữ liệu và sức tính toán (GPU).

Sự bùng nổ AI từ khoảng 2012 trở đi (nhận diện ảnh, giọng nói, rồi tới ngôn ngữ) phần lớn đến từ Deep Learning, nhờ có GPU đủ mạnh và dữ liệu đủ lớn để huấn luyện các mạng nhiều lớp này.

**Ví dụ:** nhận diện khuôn mặt để mở khóa điện thoại, xe tự lái nhận diện vật cản, dịch máy (Google Translate).

## Generative AI (GenAI) - AI tạo sinh

GenAI là một **tập con của Deep Learning**, chuyên biệt cho việc **tạo ra nội dung mới** - văn bản, hình ảnh, âm thanh, video, code - thay vì chỉ phân loại hay dự đoán một con số.

Đây là làn sóng bạn đang thấy khắp nơi từ 2022-2023: ChatGPT, Claude, Gemini (tạo văn bản), Midjourney, DALL-E, Stable Diffusion (tạo ảnh), Suno (tạo nhạc). Các mô hình ngôn ngữ lớn (LLM - Large Language Model) như Claude hay GPT chính là một dạng GenAI chuyên tạo văn bản, được xây trên nền Deep Learning với kiến trúc gọi là **Transformer**.

> Bài tiếp theo sẽ giải thích kỹ hơn LLM là gì và hoạt động ra sao - không cần hiểu toán, chỉ cần hiểu ý tưởng.

**Ví dụ:** Claude/ChatGPT viết văn bản, Midjourney vẽ ảnh từ mô tả, Suno sáng tác nhạc, GitHub Copilot viết code.

## Tóm tắt bằng một bảng

| Khái niệm | Là gì | Ví dụ |
|---|---|---|
| **AI** | Máy làm việc cần "trí thông minh" - có thể học hoặc không | GPS, bot cờ vua |
| **Machine Learning** | AI mà máy tự học quy luật từ dữ liệu | Gợi ý phim Netflix |
| **Deep Learning** | ML dùng mạng neural nhiều lớp, tự học đặc trưng | Nhận diện khuôn mặt |
| **Generative AI** | Deep Learning chuyên tạo nội dung mới | Claude, ChatGPT, Midjourney |

Toàn bộ repo Học AI Việt này sẽ tập trung chủ yếu vào nhánh **Generative AI** - cụ thể là học cách dùng LLM để code và build sản phẩm - vì đây là thứ bạn có thể ứng dụng ngay, không cần hiểu sâu toán học đằng sau.

## Bước tiếp theo

Đã hiểu bốn vòng tròn lồng nhau, giờ đi sâu vào phần quan trọng nhất với repo này: [LLM là gì, hoạt động ra sao?](02-llm-la-gi.md)
