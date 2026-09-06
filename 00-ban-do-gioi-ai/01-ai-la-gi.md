# AI, ML, Deep Learning, GenAI khác nhau thế nào?

Bài này dành cho người **chưa từng học AI ngày nào**, nghe người ta nói "AI", "Machine Learning", "Deep Learning", "GenAI" mà không biết chúng khác nhau ở đâu, có phải bốn thứ tách biệt hay không. Đọc xong bạn sẽ tự tin phân biệt được bốn khái niệm này khi nghe ai đó nhắc tới, và hiểu vì sao ChatGPT/Claude được gọi là "GenAI". Nếu bạn từng gõ tìm riêng lẻ "AI là gì", "machine learning là gì" hay "deep learning khác AI ở đâu" mà vẫn mù mờ, bài này gộp cả bốn câu hỏi vào một chỗ.

## Hình dung nhanh: bốn vòng tròn lồng nhau

Đừng nghĩ AI, ML, Deep Learning, GenAI là bốn thứ ngang hàng, tách biệt. Chúng là **các vòng tròn lồng vào nhau**, cái sau là một phần nhỏ hơn, chuyên biệt hơn của cái trước:

<figure style="max-width:560px;margin:24px auto">
<svg id="mh-rings" viewBox="0 0 480 300" width="100%" role="img" aria-label="Bốn vòng tròn lồng nhau: AI chứa Máy học, Máy học chứa Học sâu, Học sâu chứa AI tạo sinh" style="font-family:inherit;display:block">
  <g style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5">
    <circle cx="140" cy="150" r="120"/>
    <circle cx="140" cy="180" r="90"/>
    <circle cx="140" cy="210" r="60"/>
    <circle class="mh-anim" cx="140" cy="240" r="30" style="stroke-opacity:1;stroke-width:2;animation:mh-rings-p 4.5s ease-in-out infinite"/>
  </g>
  <g style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">
    <text x="140" y="55">AI</text>
    <text x="140" y="115">Máy học</text>
    <text x="140" y="175">Học sâu</text>
    <text x="140" y="238" style="font-size:11px">AI</text>
    <text x="140" y="251" style="font-size:11px">tạo sinh</text>
  </g>
  <g style="fill:currentColor;font-size:14px;font-weight:600">
    <text x="290" y="60">AI</text>
    <text x="290" y="120">Máy học</text>
    <text x="290" y="180">Học sâu</text>
    <text x="290" y="240">AI tạo sinh</text>
  </g>
  <g style="fill:var(--vp-c-text-2);font-size:12px">
    <text x="290" y="78">Máy làm việc "thông minh"</text>
    <text x="290" y="93">GPS, bot chơi cờ</text>
    <text x="290" y="138">AI tự học từ dữ liệu</text>
    <text x="290" y="153">Bộ lọc thư rác</text>
    <text x="290" y="198">Máy học dùng mạng neural</text>
    <text x="290" y="213">Nhận diện khuôn mặt</text>
    <text x="290" y="258">Học sâu tạo nội dung mới</text>
    <text x="290" y="273">ChatGPT, Claude</text>
  </g>
</svg>
<figcaption style="text-align:center;font-size:14px;color:var(--vp-c-text-2);margin-top:8px">AI tạo sinh nằm trong Học sâu, Học sâu nằm trong Máy học, Máy học nằm trong AI.</figcaption>
</figure>

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

**Một câu để nhớ:** AI → Máy học → Học sâu → AI tạo sinh là bốn vòng tròn lồng nhau, không phải bốn thứ ngang hàng - Claude và ChatGPT nằm ở vòng trong cùng.

## Bước tiếp theo

Đã hiểu bốn vòng tròn lồng nhau, giờ đi sâu vào phần quan trọng nhất với repo này: [LLM là gì, hoạt động ra sao?](02-llm-la-gi.md)
