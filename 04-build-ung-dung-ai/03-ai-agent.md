# AI Agent: tool use, MCP, build agent đầu tiên

Bài này dành cho người đã build được chatbot RAG ([bài trước](02-rag-la-gi-va-build.md)) và muốn AI làm được nhiều hơn "trả lời một câu hỏi" - tự lên kế hoạch, tự gọi công cụ, tự thực hiện nhiều bước để hoàn thành một mục tiêu. Học xong bạn sẽ hiểu agent khác chatbot thường ở đâu, và build được một agent nhỏ đầu tiên.

## Agent khác chatbot thường ở đâu?

Một chatbot thông thường: bạn hỏi → nó trả lời bằng văn bản → hết. Một **AI Agent**: bạn giao mục tiêu → nó **tự quyết định** cần làm gì để đạt mục tiêu đó, có thể gồm nhiều bước, và ở mỗi bước nó có thể **tự gọi công cụ** (tool) - tìm kiếm web, đọc/ghi file, gọi một API khác, chạy code - rồi dùng kết quả đó để quyết định bước tiếp theo, lặp lại tới khi hoàn thành.

**Ví dụ dễ hình dung:** bạn nhờ agent "đặt bàn ăn tối cho 4 người ở một nhà hàng gần đây, trước 7h tối". Chatbot thường chỉ có thể *gợi ý* bạn nên làm gì. Một agent thật sự có thể: tìm kiếm nhà hàng gần đó (tool tìm kiếm), kiểm tra còn bàn trống không (tool gọi API đặt bàn), rồi tự thực hiện đặt bàn - tất cả qua nhiều bước tự động, không cần bạn làm từng bước thủ công.

**Chính Claude Code mà bạn đang dùng để học code chính là một dạng agent** - nó tự quyết định đọc file nào, chạy lệnh gì, sửa gì, dựa trên yêu cầu bạn mô tả, không chỉ trả lời một câu.

## Tool use / Function calling - nền tảng của agent

Để agent "hành động" được, nó cần khả năng **tool use** (còn gọi là function calling): bạn định nghĩa trước các công cụ agent được phép dùng (ví dụ: một hàm `tim_kiem_web(tu_khoa)`, một hàm `doc_file(duong_dan)`), mô tả rõ mỗi công cụ dùng để làm gì. Khi xử lý yêu cầu, model tự quyết định: có cần gọi công cụ nào không, gọi công cụ nào, với tham số gì - rồi nhận kết quả trả về để tiếp tục xử lý.

## MCP - chuẩn hóa việc kết nối agent với công cụ/dữ liệu

Nhắc lại từ [từ điển thuật ngữ](../00-ban-do-gioi-ai/06-tu-dien-thuat-ngu.md): **MCP (Model Context Protocol)** là một chuẩn mở (do Anthropic khởi xướng, nay được nhiều nơi trong ngành áp dụng) giúp agent kết nối với công cụ/dữ liệu bên ngoài theo cách **chuẩn hóa** - thay vì mỗi ứng dụng phải tự viết tích hợp riêng cho từng công cụ, một MCP server viết một lần có thể dùng lại được với nhiều agent/công cụ AI khác nhau tuân theo chuẩn này.

Ví dụ thực tế: có sẵn các MCP server cộng đồng cho việc đọc file hệ thống, truy vấn GitHub, thao tác Google Drive, truy vấn database... Thay vì tự viết tích hợp từ đầu, bạn có thể dùng lại các MCP server có sẵn này. Xem thêm ở [`06-kho-tai-nguyen/03-skills-va-mcp.md`](../06-kho-tai-nguyen/03-skills-va-mcp.md).

MCP không chỉ dành cho việc "văn phòng" - bất kỳ công cụ nào (kể cả công cụ xử lý ảnh, dựng phim, thiết kế 3D) có MCP server riêng thì agent gọi thẳng được, không cần ai mở giao diện web bấm tay thay. Ví dụ thật trong chính cộng đồng dùng thư viện này: case study [Mockup Studio](../07-case-study/04-mockup-studio.md) - một công cụ xử lý ảnh được gọi qua MCP để agent tự tạo mockup sản phẩm cho khách.

<figure style="max-width:560px;margin:24px auto">
<svg id="mh-mcp" viewBox="0 0 480 205" width="100%" role="img" aria-label="AI ở giữa nối với ba công cụ Tệp tin, Web, Cơ sở dữ liệu qua ba ổ cắm giống hệt nhau" style="font-family:inherit;display:block">
  <rect x="190" y="15" width="100" height="36" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="240" y="38" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Tệp tin</text>
  <rect x="20" y="95" width="100" height="40" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="70" y="120" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Web</text>
  <rect x="360" y="95" width="110" height="40" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="415" y="120" style="fill:currentColor;font-size:14px;font-weight:600;font-size:12px;text-anchor:middle">Cơ sở dữ liệu</text>
  <line class="mh-anim mh-wire" x1="240" y1="51" x2="240" y2="89" style="stroke:var(--vp-c-brand-1);stroke-width:1.5;stroke-dasharray:5 5;animation:mh-mcp-f 1.6s linear infinite"/>
  <line class="mh-anim mh-wire" x1="120" y1="115" x2="184" y2="115" style="stroke:var(--vp-c-brand-1);stroke-width:1.5;stroke-dasharray:5 5;animation:mh-mcp-f 1.6s linear infinite"/>
  <line class="mh-anim mh-wire" x1="360" y1="115" x2="296" y2="115" style="stroke:var(--vp-c-brand-1);stroke-width:1.5;stroke-dasharray:5 5;animation:mh-mcp-f 1.6s linear infinite"/>
  <rect x="190" y="95" width="100" height="40" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="240" y="120" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">AI</text>
  <rect x="234" y="89" width="12" height="12" rx="2" style="fill:var(--vp-c-brand-1)"/>
  <rect x="184" y="109" width="12" height="12" rx="2" style="fill:var(--vp-c-brand-1)"/>
  <rect x="284" y="109" width="12" height="12" rx="2" style="fill:var(--vp-c-brand-1)"/>
  <text x="240" y="172" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Ba ổ cắm giống hệt nhau: đó là chuẩn MCP</text>
  <text x="240" y="192" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">công cụ viết một lần, AI nào theo chuẩn cũng cắm được</text>
</svg>
<figcaption style="text-align:center;font-size:14px;color:var(--vp-c-text-2);margin-top:8px">MCP là một chuẩn cắm chung: công cụ viết một lần, AI nào theo chuẩn cũng dùng được.</figcaption>
</figure>

<figure style="max-width:560px;margin:24px auto">
<svg id="mh-loop" viewBox="0 0 480 236" width="100%" role="img" aria-label="Vòng lặp Nghĩ, Gọi công cụ, Nhận kết quả, quay lại Nghĩ; khi đủ thông tin thì Trả lời" style="font-family:inherit;display:block">
  <circle class="mh-anim mh-dot" r="5" style="fill:var(--vp-c-brand-1);stroke:none;offset-path:path('M240 56 V82 H395 V176 H85 V38 H240 V56');offset-rotate:0deg;animation:mh-loop-run 7s linear infinite"/>
  <rect x="180" y="20" width="120" height="36" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:1;stroke-width:2"/>
  <text x="240" y="43" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">Nghĩ</text>
  <rect x="330" y="110" width="130" height="36" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="395" y="133" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Gọi công cụ</text>
  <rect x="20" y="110" width="130" height="36" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="85" y="133" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Nhận kết quả</text>
  <path d="M240 56 V82 H395 V104 M390 99 L395 106 L400 99" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <path d="M395 146 V176 H85 V152 M80 157 L85 150 L90 157" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <path d="M85 110 V38 H174 M169 33 L176 38 L169 43" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <text x="240" y="126" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">lặp lại</text>
  <text x="240" y="140" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">tới khi đủ thông tin</text>
  <rect x="330" y="20" width="130" height="36" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="395" y="43" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Trả lời</text>
<path d="M302 38 H326 M319 33 L326 38 L319 43" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <text x="314" y="12" style="fill:var(--vp-c-text-2);font-size:12px;font-size:11px;text-anchor:middle">khi đã đủ</text>
  <text x="240" y="208" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">Ví dụ: "xem thời tiết Hà Nội" → gọi công cụ thời tiết → nhận "có mưa"</text>
  <text x="240" y="224" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">→ nghĩ tiếp: trời mưa → trả lời: "nhớ mang ô nhé!"</text>
</svg>
<figcaption style="text-align:center;font-size:14px;color:var(--vp-c-text-2);margin-top:8px">Agent không trả lời một phát rồi thôi, nó lặp Nghĩ → Gọi công cụ → Nhận kết quả cho tới khi xong.</figcaption>
</figure>

## Computer use - khi công cụ không có MCP hay API

MCP và tool use đều cần công cụ đó **chủ động mở sẵn một "ổ cắm"** để agent gọi vào. Rất nhiều phần mềm - nhất là phần mềm nội bộ cũ, hoặc ứng dụng chỉ có giao diện bấm chuột - không có ổ cắm nào cả. Với trường hợp này, một số harness cho phép AI dùng **computer use**: AI "nhìn" màn hình qua ảnh chụp và tự điều khiển chuột/bàn phím giống hệt một người dùng thật - mở ứng dụng, bấm đúng nút, gõ chữ vào đúng ô, đọc lại kết quả hiện trên màn hình - thay vì gọi thẳng một hàm qua API.

Khác biệt cốt lõi: **MCP/tool use = "gọi hàm"** (nhanh, đáng tin cậy hơn, nhưng cần công cụ đã hỗ trợ sẵn); **computer use = "bấm như người"** (dùng được với hầu như bất kỳ phần mềm nào có giao diện, kể cả cái không có API, nhưng chậm hơn và dễ bấm nhầm hơn gọi hàm trực tiếp). Hai cách không loại trừ nhau - agent thật thường ưu tiên MCP/API khi có, và chỉ dùng computer use khi không còn lựa chọn nào khác. Xem thêm ở [từ điển thuật ngữ](../00-ban-do-gioi-ai/06-tu-dien-thuat-ngu.md).

## Build agent đầu tiên: agent tra cứu thời tiết

Ví dụ nhỏ, dễ kiểm chứng: một agent có thể tự quyết định gọi API thời tiết khi cần, thay vì lúc nào cũng gọi.

Mô tả cho Claude Code (làm từng bước, đúng tinh thần đã học):

**Bước 1:**
```
Tôi muốn build một agent nhỏ bằng Python, dùng API Claude với tính năng tool use.
Định nghĩa một tool tên "lay_thoi_tiet" nhận tham số "thanh_pho", trả về dữ liệu thời
tiết giả lập (chưa cần gọi API thời tiết thật, cứ trả về dữ liệu mẫu cố định để test
trước). Viết vòng lặp: nhận câu hỏi người dùng qua input(), gửi cho Claude kèm định
nghĩa tool, nếu Claude quyết định gọi tool thì thực thi và gửi kết quả lại cho Claude
để nó trả lời tiếp.
```

**Bước 2 - kiểm tra:** hỏi "Hà Nội hôm nay thời tiết thế nào?" - agent có tự nhận ra cần gọi tool `lay_thoi_tiet` không? Hỏi "1 + 1 bằng mấy?" - agent có **không** gọi tool (vì câu hỏi không liên quan) mà trả lời trực tiếp không? Đây là điểm mấu chốt của tool use: model **tự quyết định** khi nào cần dùng công cụ.

**Bước 3 - khi đã chạy đúng với dữ liệu giả:**
```
Giờ thay dữ liệu giả bằng cách gọi thật tới một API thời tiết miễn phí (ví dụ
Open-Meteo, không cần API key). 
```

## Agent không phải lúc nào cũng cần thiết

Đừng dùng agent chỉ vì nó "cool". Nếu bài toán của bạn chỉ cần một bước xử lý cố định (ví dụ: luôn tóm tắt văn bản theo cùng một cách), gọi API thẳng như [bài đầu tiên](01-goi-api-llm.md) đơn giản, rẻ hơn, và dễ kiểm soát hơn agent. Agent phù hợp khi bài toán **thực sự cần nhiều bước không cố định trước**, cần AI tự quyết định linh hoạt tùy tình huống.

## Bước tiếp theo

Đã hiểu agent, tool use, MCP - giờ xem cách áp dụng những kỹ thuật này vào sản phẩm có sẵn: [Tích hợp AI vào app có sẵn](04-tich-hop-ai-vao-app.md)
