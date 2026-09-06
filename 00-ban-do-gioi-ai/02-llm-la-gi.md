# LLM là gì? Token, context, temperature - giải thích không cần biết toán

Bài này dành cho người muốn hiểu **Claude, ChatGPT, Gemini thực chất đang làm gì** khi bạn gõ câu hỏi và nhận được câu trả lời - không cần biết lập trình hay toán học. Học xong bạn sẽ hiểu vì sao AI đôi khi "quên" những gì bạn nói lúc đầu cuộc trò chuyện, vì sao AI đôi khi bịa thông tin, và các thuật ngữ "token", "context window", "temperature" nghĩa là gì mỗi khi bạn thấy chúng. Đây cũng là bài giải thích "mô hình ngôn ngữ lớn" (tên đầy đủ của LLM) bằng tiếng Việt dễ hiểu, không cần nền tảng toán hay lập trình.

## LLM là gì?

LLM (Large Language Model - Mô hình ngôn ngữ lớn) là một chương trình AI được huấn luyện trên một lượng văn bản khổng lồ (sách, web, code, bài báo...) để làm một việc tưởng chừng đơn giản: **dự đoán từ/cụm từ tiếp theo có khả năng xuất hiện cao nhất**, dựa trên những gì đã có trước đó.

Khi mô hình đủ lớn và được huấn luyện trên đủ dữ liệu, khả năng "đoán từ tiếp theo" này tạo ra hiệu ứng bất ngờ: mô hình trả lời câu hỏi, viết code, tóm tắt, dịch, lý luận từng bước - dù chưa từng được dạy trực tiếp từng kỹ năng này.

Claude (Anthropic), GPT (OpenAI), Gemini (Google) đều là LLM - khác nhau ở cách huấn luyện, dữ liệu, và cách "tinh chỉnh" (fine-tune) để trả lời hữu ích, an toàn.

## Token - đơn vị nhỏ nhất mà LLM "nhìn thấy"

LLM không đọc từng chữ cái hay từng từ như con người. Nó chia văn bản thành các mảnh nhỏ gọi là **token**. Một token có thể là một từ ngắn, một phần của từ dài, hoặc một dấu câu.

Với **tiếng Anh**, ước lượng thô: 1 token ≈ 4 ký tự ≈ 0.75 từ.

Với **tiếng Việt**, mọi chuyện tốn kém hơn một chút: vì có dấu thanh và cấu trúc từ ghép, một từ tiếng Việt thường bị tách thành **nhiều token hơn** so với một từ tiếng Anh tương đương. Ví dụ từ "không" có thể là 1-2 token, nhưng cả câu "Tôi không biết" có thể tốn nhiều token hơn câu tiếng Anh "I don't know" dù ý nghĩa tương đương.

**Vì sao bạn cần quan tâm đến token?**
1. **Giá tiền** khi gọi API LLM thường tính theo số token (cả token đầu vào lẫn đầu ra) - xem chi tiết giá ở [`04-build-ung-dung-ai/01-goi-api-llm.md`](../04-build-ung-dung-ai/01-goi-api-llm.md). (*API* là cách để code của bạn tự "gọi" tới AI qua internet mà xử lý, thay vì bạn ngồi chat tay - gặp lại nhiều lần trong repo này, có giải thích đầy đủ ở [từ điển thuật ngữ](06-tu-dien-thuat-ngu.md).)
2. **Giới hạn context window** (mục dưới đây) cũng được đo bằng token, không phải bằng chữ.

<figure style="max-width:560px;margin:24px auto">
<svg id="mh-tok" viewBox="0 0 480 284" width="100%" role="img" aria-label="Câu hỏi tách thành 7 token đi vào model, model sinh ra câu trả lời từng token một" style="font-family:inherit;display:block">
  <text x="20" y="20" style="fill:var(--vp-c-text-2);font-size:12px">Câu hỏi của bạn, tách thành 7 token:</text>
  <g><rect x="20" y="32" width="44" height="30" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="42" y="52" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Thủ</text></g>
  <g><rect x="72" y="32" width="36" height="30" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="90" y="52" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">đô</text></g>
  <g><rect x="116" y="32" width="44" height="30" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="138" y="52" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Việt</text></g>
  <g><rect x="168" y="32" width="46" height="30" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="191" y="52" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Nam</text></g>
  <g><rect x="222" y="32" width="30" height="30" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="237" y="52" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">là</text></g>
  <g><rect x="260" y="32" width="32" height="30" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="276" y="52" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">gì</text></g>
  <g><rect x="300" y="32" width="24" height="30" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="312" y="52" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">?</text></g>
<path d="M240 70 V98 M235 91 L240 98 L245 91" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <rect class="mh-anim" x="170" y="100" width="140" height="46" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:1;stroke-width:2;animation:mh-tok-g 6s ease-in-out infinite"/>
  <text x="240" y="119" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">MODEL</text>
  <text x="240" y="136" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">đoán token kế tiếp, lặp lại</text>
<path d="M240 152 V180 M235 173 L240 180 L245 173" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <text x="20" y="196" style="fill:var(--vp-c-text-2);font-size:12px">Câu trả lời, sinh lần lượt từng token:</text>
  <g class="mh-anim" style="animation:mh-tok-in 6s ease-in-out infinite;animation-delay:0.3s"><rect x="20" y="206" width="36" height="30" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="38" y="226" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Hà</text></g>
  <g class="mh-anim" style="animation:mh-tok-in 6s ease-in-out infinite;animation-delay:1.0s"><rect x="64" y="206" width="40" height="30" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="84" y="226" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Nội</text></g>
  <g class="mh-anim" style="animation:mh-tok-in 6s ease-in-out infinite;animation-delay:1.7s"><rect x="112" y="206" width="24" height="30" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="124" y="226" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">.</text></g>
  <text x="20" y="260" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px">Mỗi ô là một token, không luôn bằng một từ.</text>
  <text x="20" y="275" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px">Tiếng Việt thường tốn nhiều token hơn tiếng Anh.</text>
</svg>
<figcaption style="text-align:center;font-size:14px;color:var(--vp-c-text-2);margin-top:8px">LLM đọc câu hỏi theo từng mẩu (token) và trả lời bằng cách đoán từng mẩu kế tiếp.</figcaption>
</figure>

## Context window - "trí nhớ" trong một cuộc trò chuyện

Context window (cửa sổ ngữ cảnh) là **số token tối đa** mà LLM có thể "nhìn thấy" cùng lúc trong một lần xử lý - bao gồm toàn bộ đoạn hội thoại từ đầu, file bạn đính kèm, và câu trả lời nó sắp tạo ra.

Hãy tưởng tượng context window như **một cái bàn làm việc có kích thước cố định**. Mọi thứ liên quan đến cuộc trò chuyện phải nằm gọn trên bàn đó thì AI mới "nhìn thấy" và dùng được. Khi cuộc trò chuyện quá dài, vượt quá kích thước bàn, những phần cũ nhất sẽ bị đẩy ra khỏi "tầm nhìn" - đó là lý do đôi khi AI có vẻ "quên" điều bạn nói cách đây rất lâu trong cùng một cuộc chat.

Các model hiện đại thường có context window từ 128.000 đến hơn 1.000.000 token tùy model *(kiểm tra: 05/09/2026)* - đủ chứa từ vài trăm trang đến cả một cuốn sách. Con số đổi liên tục theo bản cập nhật, nên kiểm tra trang chủ nhà cung cấp để có số mới nhất thay vì tin vào một con số cố định.

**Mẹo thực tế:** nếu cuộc trò chuyện quá dài và AI bắt đầu trả lời "lạc đề" hoặc quên context, hãy mở cuộc trò chuyện mới và tóm tắt lại những gì cần thiết - đừng cố kéo dài một thread vô hạn.

## Temperature - độ "sáng tạo" của câu trả lời

Khi LLM dự đoán từ tiếp theo, nó thực ra tính ra một **danh sách xác suất** cho nhiều từ có thể đứng tiếp theo, rồi chọn một từ trong số đó. **Temperature** là tham số điều chỉnh việc "chọn" này diễn ra táo bạo hay an toàn đến đâu:

- **Temperature thấp** (gần 0): gần như luôn chọn từ xác suất cao nhất → câu trả lời ổn định, phù hợp việc cần chính xác (viết code, trích xuất dữ liệu).
- **Temperature cao** (gần 1 hoặc hơn): sẵn sàng chọn từ ít khả năng hơn → câu trả lời đa dạng, sáng tạo hơn nhưng dễ "lạc hướng" hơn, phù hợp brainstorm.

Chatbot thường (Claude.ai, ChatGPT) hiếm khi cho chỉnh temperature trực tiếp - nó chỉ hiện khi gọi API bằng code. Hiểu khái niệm này giúp bạn hiểu vì sao hỏi AI cùng một câu hai lần có thể ra hai câu trả lời hơi khác nhau.

## Reasoning - khi model "nghĩ" trước khi trả lời

Một số model hiện đại (gọi là **reasoning model**, hoặc có chế độ "extended thinking"/"suy luận mở rộng") không trả lời ngay mà tự sinh ra một chuỗi bước suy luận trung gian trước khi đưa ra câu trả lời cuối cùng - giống bạn nháp ra giấy trước khi viết câu trả lời chốt, thay vì nghĩ gì viết nấy. Chuỗi suy luận này về bản chất vẫn là token (xem lại phần Token phía trên) - bạn thường không thấy hết nội dung nháp đó, nhưng nó vẫn tính vào chi phí và thời gian chờ.

**Vì sao việc này quan trọng với bạn:** đây chính là lý do khi dùng coding agent (Claude Code, Codex), bật mức "reasoning" cao cho một việc khó thì kết quả thường chính xác hơn nhưng chờ lâu hơn và tốn nhiều token hơn hẳn - không phải vì model "biết nhiều hơn", mà vì nó đang suy nghĩ kỹ hơn trước khi trả lời. Xem cách chọn mức reasoning hợp lý theo từng loại việc ở [`02-code-voi-ai/14-codex-model-reasoning-va-han-muc.md`](../02-code-voi-ai/14-codex-model-reasoning-va-han-muc.md).

**Mẹo thực tế:** việc đơn giản, rõ ràng thì dùng reasoning thấp (hoặc tắt) cho nhanh và rẻ; việc khó, nhiều bước, dễ sai (debug bug hóc búa, thiết kế kiến trúc, toán/logic phức tạp) mới cần reasoning cao - bật cao cho mọi việc chỉ tổ chờ lâu và tốn tiền oan.

## Vì sao AI đôi khi "bịa" (hallucination)?

Vì bản chất LLM là **dự đoán từ có khả năng cao nhất**, không phải tra cứu một cơ sở dữ liệu sự thật. Khi gặp câu hỏi mà nó không có đủ thông tin đáng tin cậy, nó vẫn có xu hướng tạo ra một câu trả lời **nghe rất trôi chảy và tự tin** - dù nội dung sai. Hiện tượng này gọi là **hallucination** (ảo giác).

**Cách giảm rủi ro khi dùng AI:**
- Với thông tin quan trọng (số liệu, tên riêng, sự kiện cụ thể), luôn kiểm tra chéo với nguồn khác.
- Yêu cầu AI trích dẫn nguồn hoặc giải thích cách nó suy ra kết luận.
- Với việc code: chạy thử code, đừng tin code "trông đúng" mà chưa chạy.
- Dùng kỹ thuật RAG (cho AI đọc tài liệu thật thay vì chỉ dựa vào trí nhớ huấn luyện) khi cần độ chính xác cao - xem [`04-build-ung-dung-ai/02-rag-la-gi-va-build.md`](../04-build-ung-dung-ai/02-rag-la-gi-va-build.md).

**Một câu để nhớ:** LLM chỉ đang đoán từ tiếp theo có khả năng cao nhất, không tra cứu sự thật - với thông tin quan trọng, luôn kiểm tra chéo, đừng tin tuyệt đối.

## Bước tiếp theo

Hiểu được cách LLM hoạt động rồi, giờ tìm hiểu xem trên thị trường có những công ty và model nào, ai mạnh ở đâu: [Các công ty và model AI lớn](03-cac-cong-ty-va-model.md)
