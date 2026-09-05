# Harness là gì? Vì sao cùng một Claude mà Chat, Code, Design làm được việc khác nhau

Bài này dành cho người đã dùng qua Claude - dù chỉ là chat vài câu - và thấy khó hiểu: cùng một cái tên "Claude", mà trên web nó chỉ trả lời bằng chữ, trong terminal nó tự sửa file dự án của bạn, còn chỗ khác nó lại vẽ ra cả một giao diện bấm được. Học xong bạn sẽ hiểu **harness** - thứ quyết định sự khác nhau đó - và biết chọn đúng chỗ làm việc cho từng loại việc, thay vì dùng nhầm chỗ rồi kết luận "AI dở".

## Model không phải là sản phẩm

Đây là hiểu lầm phổ biến nhất của người mới: nghĩ rằng "Claude" là một thứ duy nhất, dùng ở đâu cũng như nhau.

Thực ra **model** (xem lại [LLM là gì](../00-ban-do-gioi-ai/02-llm-la-gi.md)) chỉ làm đúng một việc: nhận vào một đống chữ, đoán ra chữ tiếp theo. Chấm hết. Tự thân nó không mở được file, không chạy được lệnh, không nhớ được hôm qua bạn nói gì, không biết bây giờ là mấy giờ.

Vậy mà Claude Code lại sửa được file, chạy được lệnh, làm việc liên tục hàng chục bước. Phần làm được những chuyện đó **không nằm trong model**. Nó nằm ở lớp bao quanh model - gọi là **harness**.

## Harness là gì

"Harness" trong tiếng Anh nghĩa gốc là **bộ dây đai buộc con ngựa vào cỗ xe**. Con ngựa là sức kéo, nhưng chính bộ dây đai mới biến sức kéo đó thành một cỗ xe chạy được, đi đúng hướng, dừng được khi cần. Đổi bộ dây đai và cỗ xe, cùng con ngựa đó có thể kéo xe chở khách hoặc kéo cày - hai việc hoàn toàn khác nhau.

Trong giới AI, harness là **toàn bộ phần chương trình bao quanh model** để biến khả năng "đoán chữ tiếp theo" thành một công cụ làm được việc thật.

<figure style="max-width:560px;margin:24px auto">
<svg viewBox="0 0 480 216" width="100%" role="img" aria-label="Model nằm bên trong harness gồm vòng lặp, công cụ, quyền và ngữ cảnh; harness tạo ra sản phẩm bạn thực sự dùng" style="font-family:inherit;display:block">
  <rect x="40" y="24" width="400" height="112" rx="6" style="fill:var(--vp-c-brand-1);fill-opacity:.05;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5;stroke-dasharray:6 4"/>
  <text x="56" y="44" style="fill:currentColor;font-size:13px;font-weight:600">HARNESS</text>
  <text x="58" y="84" style="fill:var(--vp-c-text-2);font-size:12px">vòng lặp</text>
  <text x="58" y="99" style="fill:var(--vp-c-text-2);font-size:12px">nghĩ - làm - xem</text>
  <text x="314" y="84" style="fill:var(--vp-c-text-2);font-size:12px">công cụ</text>
  <text x="314" y="99" style="fill:var(--vp-c-text-2);font-size:12px">đọc file, chạy lệnh</text>
  <rect class="mh-anim" x="180" y="62" width="120" height="44" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:1;stroke-width:2;animation:mh-skill-g 5s ease-in-out infinite"/>
  <text x="240" y="82" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">MODEL</text>
  <text x="240" y="98" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">chỉ đoán chữ tiếp theo</text>
  <text x="240" y="126" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">quyền được làm gì · ngữ cảnh · quy tắc riêng của bạn</text>
  <path d="M240 136 V152 M235 145 L240 152 L245 145" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <rect x="120" y="158" width="240" height="44" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="240" y="178" style="fill:currentColor;font-size:13px;font-weight:600;text-anchor:middle">Chat · Code · Design · Cowork</text>
  <text x="240" y="194" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">thứ bạn thực sự ngồi dùng</text>
</svg>
<figcaption style="text-align:center;font-size:14px;color:var(--vp-c-text-2);margin-top:8px">Bạn không dùng model trực tiếp; bạn dùng model đã được bọc trong một harness.</figcaption>
</figure>

Một harness thường gồm bốn thứ:

1. **Vòng lặp.** Model trả lời một phát rồi thôi. Harness cho nó chạy đi chạy lại: nghĩ, làm một việc, nhìn kết quả, nghĩ tiếp - tới khi xong. Đây chính là vòng lặp agent đã vẽ ở [bài AI Agent](../04-build-ung-dung-ai/03-ai-agent.md).
2. **Công cụ.** Đọc file, ghi file, chạy lệnh terminal, tìm kiếm web, gọi API. Model không tự có; harness đưa cho nó và mô tả cách dùng. Chuẩn cắm công cụ phổ biến hiện nay là MCP, xem [Skills và MCP](../06-kho-tai-nguyen/03-skills-va-mcp.md).
3. **Quyền.** Việc gì được tự làm, việc gì phải hỏi bạn trước. Đây là lý do Claude Code hay dừng lại xin phép trước khi xóa file hay chạy lệnh lạ.
4. **Ngữ cảnh và quy tắc.** Harness quyết định model được "nhìn thấy" những gì trong [context window](../00-ban-do-gioi-ai/02-llm-la-gi.md): file nào, đoạn hội thoại nào, quy tắc nào. File `CLAUDE.md` bạn viết ([bài 1](01-claude-code.md)) chính là bạn đang can thiệp vào phần này.

**Điều rút ra:** khi bạn nghe "model mới ra, mạnh hơn hẳn", hãy nhớ rằng phần lớn cảm giác "mạnh hơn" trong lúc làm việc thật đến từ harness tốt lên, chứ không chỉ từ model. Và ngược lại: một model rất giỏi đặt trong harness tồi vẫn cho ra kết quả tệ.

## Bốn chỗ làm việc của Claude

Anthropic đóng gói cùng một model vào nhiều harness khác nhau. Bốn cái bạn hay gặp nhất:

| Chỗ làm việc | Chạy ở đâu | Harness cho nó thêm gì | Hợp nhất với việc |
|---|---|---|---|
| **Claude Chat** | Web, app điện thoại, app máy tính | Khung hội thoại, tìm web, đọc file bạn tải lên, ghi nhớ theo dự án | Hỏi đáp, học khái niệm, viết nháp, bàn ý tưởng |
| **Claude Code** | Terminal, trong IDE, hoặc app máy tính | Đọc/sửa thẳng file trong thư mục dự án, chạy lệnh, dùng git, chạy test | Viết và sửa code trong một dự án có sẵn |
| **Claude Design** | Trong Claude, dạng canvas | Khung vẽ trực quan, sửa trực tiếp bằng chuột, xuất ra bản thiết kế | Làm giao diện mẫu, slide, landing page, bản demo để đưa người khác xem |
| **Claude Cowork** | App máy tính | Tự làm việc nhiều bước trên file ngay trong máy bạn, tạo tài liệu, bảng tính, slide | Việc văn phòng nhiều bước, không dính tới code |

Vài điểm cần biết thêm:

- **Claude Code** là công cụ chính mà toàn bộ repo này dùng. Nó khác Chat ở chỗ nó **thấy cả dự án của bạn** và **tự chạy được lệnh**, nên nó sửa được thứ đang chạy thật chứ không chỉ gợi ý cho bạn tự chép.
- **Claude Design** hiện là bản xem trước (Anthropic gọi là research preview, ra mắt tháng 4/2026), và nó có thể **đọc code dự án của bạn** để bám đúng bộ giao diện đang có, cũng như xuất sang Canva để chỉnh tiếp. Nó không thay thế Figma, cũng không phải chỗ để viết logic ứng dụng.
- **Claude Cowork** ra đời vì rất nhiều người dùng Claude Code cho việc **không phải code** (sắp xếp file, tổng hợp tài liệu). Cowork mang khả năng đó ra ngoài terminal cho người không biết code.
- Các sản phẩm này thay đổi nhanh - tên gọi, tính năng, chỗ bật lên đều có thể khác khi bạn đọc bài này. Kiểm tra lại trong tài khoản Claude của bạn.

## Chọn chỗ nào cho việc gì

Nguyên tắc gọn: **chọn harness gần nhất với nơi kết quả sẽ sống**.

| Việc bạn muốn làm | Nên dùng | Vì sao |
|---|---|---|
| Hiểu một khái niệm, hỏi han, bàn ý tưởng | Chat | Không cần đụng file nào, hỏi đáp là đủ |
| Sửa một lỗi trong dự án đang chạy | Code | Nó cần đọc code thật và chạy thử mới biết đã hết lỗi chưa |
| Viết một tính năng mới cho web/app | Code | Kết quả phải nằm trong file dự án |
| Phác giao diện để xem thử trước khi code | Design | Nhìn được ngay, sửa bằng mắt nhanh hơn tả bằng chữ |
| Làm slide, một trang giới thiệu sản phẩm | Design | Đây đúng là thứ nó sinh ra để làm |
| Dọn 200 file lộn xộn, gộp báo cáo hàng tháng | Cowork | Việc nhiều bước trên file, không cần biết code |
| Viết một đoạn code ngắn, độc lập, chép đi chỗ khác | Chat | Mở cả Claude Code cho một hàm 10 dòng là thừa |

Một mẹo tiết kiệm thời gian: **đừng dùng Chat để làm việc của Code**. Rất nhiều người mới ngồi chat, chép code ra, dán vào file, chạy lỗi, chép lỗi vào chat, dán lại... Vòng đó tốn thời gian gấp nhiều lần so với để Claude Code tự đọc lỗi và tự sửa. Bạn đang làm thủ công đúng cái phần mà harness sinh ra để làm hộ.

## Khi nào không nên dùng

Chỗ này quan trọng không kém, và ít người nói thẳng:

- **Khi bạn không có cách kiểm chứng kết quả.** AI nói sai rất tự tin. Nếu bạn không chạy được, không test được, không có ai kiểm tra hộ, thì bạn không biết mình đang cầm cái đúng hay cái sai. Với code thì cách kiểm chứng là chạy thử; với kiến thức chuyên môn thì phải là người biết nghề.
- **Việc pháp lý, y tế, tài chính cá nhân của bạn.** Dùng để hiểu vấn đề thì được. Dùng để ra quyết định thay bác sĩ, luật sư, kế toán thì không.
- **Khi dữ liệu là thứ không được lộ.** Thông tin khách hàng, căn cước, mật khẩu, khóa API - đừng dán vào bất kỳ chỗ chat nào. Xem [Giấu API key và secret](../10-bao-mat/03-giau-api-key-va-secret.md) và [checklist bảo mật](../10-bao-mat/01-checklist-truoc-khi-public.md).
- **Khi bạn đang cần học chứ không cần xong.** Nếu mục tiêu là *bạn* làm được lần sau, hãy để AI giải thích và để bạn tự gõ. Nhờ nó làm hết thì việc xong nhưng bạn đứng yên - đúng tinh thần [bài tư duy học với AI](../01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai.md).
- **Khi chính bạn cũng chưa biết mình muốn gì.** Yêu cầu mơ hồ thì mọi harness đều cho ra thứ mơ hồ. Ngồi viết rõ ra trước, mất 10 phút, tiết kiệm cả buổi.

## Ba thói quen dùng chỗ nào cũng đúng

1. **Nói rõ kết quả mong muốn, không nói cách làm.** "Trang chủ mở dưới 2 giây trên mạng 3G" tốt hơn "dùng thư viện X phiên bản Y", trừ khi bạn thực sự biết mình cần thư viện đó.
2. **Chia nhỏ.** Một yêu cầu = một việc kiểm chứng được. Yêu cầu càng to, chỗ sai càng khó tìm.
3. **Cho nó cách tự biết mình sai.** Trong Claude Code: bảo nó chạy test, mở trang lên xem, đọc log lỗi. Harness có công cụ - đừng bắt nó đoán mò khi nó có thể tự kiểm tra.

## Bước tiếp theo

Hiểu chỗ nào làm việc gì rồi, giờ tới phần thực tế nhất: mỗi chỗ đó tốn bao nhiêu tiền, gói nào đáng mua, và một cái bẫy trong cách đặt tên gói mà nhiều người trả tiền xong mới biết: [Chi phí và các gói Claude](08-chi-phi-cac-goi-claude.md)
