# AI Agent: tool use, MCP, build agent đầu tiên

Bài này dành cho người đã build được chatbot RAG ([bài trước](02-rag-la-gi-va-build.md)) và muốn AI làm được nhiều hơn "trả lời một câu hỏi" — tự lên kế hoạch, tự gọi công cụ, tự thực hiện nhiều bước để hoàn thành một mục tiêu. Học xong bạn sẽ hiểu agent khác chatbot thường ở đâu, và build được một agent nhỏ đầu tiên.

## Agent khác chatbot thường ở đâu?

Một chatbot thông thường: bạn hỏi → nó trả lời bằng văn bản → hết. Một **AI Agent**: bạn giao mục tiêu → nó **tự quyết định** cần làm gì để đạt mục tiêu đó, có thể gồm nhiều bước, và ở mỗi bước nó có thể **tự gọi công cụ** (tool) — tìm kiếm web, đọc/ghi file, gọi một API khác, chạy code — rồi dùng kết quả đó để quyết định bước tiếp theo, lặp lại tới khi hoàn thành.

**Ví dụ dễ hình dung:** bạn nhờ agent "đặt bàn ăn tối cho 4 người ở một nhà hàng gần đây, trước 7h tối". Chatbot thường chỉ có thể *gợi ý* bạn nên làm gì. Một agent thật sự có thể: tìm kiếm nhà hàng gần đó (tool tìm kiếm), kiểm tra còn bàn trống không (tool gọi API đặt bàn), rồi tự thực hiện đặt bàn — tất cả qua nhiều bước tự động, không cần bạn làm từng bước thủ công.

**Chính Claude Code mà bạn đang dùng để học code chính là một dạng agent** — nó tự quyết định đọc file nào, chạy lệnh gì, sửa gì, dựa trên yêu cầu bạn mô tả, không chỉ trả lời một câu.

## Tool use / Function calling — nền tảng của agent

Để agent "hành động" được, nó cần khả năng **tool use** (còn gọi là function calling): bạn định nghĩa trước các công cụ agent được phép dùng (ví dụ: một hàm `tim_kiem_web(tu_khoa)`, một hàm `doc_file(duong_dan)`), mô tả rõ mỗi công cụ dùng để làm gì. Khi xử lý yêu cầu, model tự quyết định: có cần gọi công cụ nào không, gọi công cụ nào, với tham số gì — rồi nhận kết quả trả về để tiếp tục xử lý.

## MCP — chuẩn hóa việc kết nối agent với công cụ/dữ liệu

Nhắc lại từ [từ điển thuật ngữ](../00-ban-do-gioi-ai/06-tu-dien-thuat-ngu.md): **MCP (Model Context Protocol)** là một chuẩn mở (do Anthropic khởi xướng, nay được nhiều nơi trong ngành áp dụng) giúp agent kết nối với công cụ/dữ liệu bên ngoài theo cách **chuẩn hóa** — thay vì mỗi ứng dụng phải tự viết tích hợp riêng cho từng công cụ, một MCP server viết một lần có thể dùng lại được với nhiều agent/công cụ AI khác nhau tuân theo chuẩn này.

Ví dụ thực tế: có sẵn các MCP server cộng đồng cho việc đọc file hệ thống, truy vấn GitHub, thao tác Google Drive, truy vấn database... Thay vì tự viết tích hợp từ đầu, bạn có thể dùng lại các MCP server có sẵn này. Xem thêm ở [`06-kho-tai-nguyen/03-skills-va-mcp.md`](../06-kho-tai-nguyen/03-skills-va-mcp.md).

<iframe src="/minh-hoa/mcp.html" title="Minh họa: MCP kết nối AI với công cụ" loading="lazy" style="width:100%; height:420px; border:1px solid var(--vp-c-divider); border-radius:8px;"></iframe>

<iframe src="/minh-hoa/agent-loop.html" title="Minh họa: Vòng lặp của AI Agent" loading="lazy" style="width:100%; height:440px; border:1px solid var(--vp-c-divider); border-radius:8px;"></iframe>

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

**Bước 2 — kiểm tra:** hỏi "Hà Nội hôm nay thời tiết thế nào?" — agent có tự nhận ra cần gọi tool `lay_thoi_tiet` không? Hỏi "1 + 1 bằng mấy?" — agent có **không** gọi tool (vì câu hỏi không liên quan) mà trả lời trực tiếp không? Đây là điểm mấu chốt của tool use: model **tự quyết định** khi nào cần dùng công cụ.

**Bước 3 — khi đã chạy đúng với dữ liệu giả:**
```
Giờ thay dữ liệu giả bằng cách gọi thật tới một API thời tiết miễn phí (ví dụ
Open-Meteo, không cần API key). 
```

## Agent không phải lúc nào cũng cần thiết

Đừng dùng agent chỉ vì nó "cool". Nếu bài toán của bạn chỉ cần một bước xử lý cố định (ví dụ: luôn tóm tắt văn bản theo cùng một cách), gọi API thẳng như [bài đầu tiên](01-goi-api-llm.md) đơn giản, rẻ hơn, và dễ kiểm soát hơn agent. Agent phù hợp khi bài toán **thực sự cần nhiều bước không cố định trước**, cần AI tự quyết định linh hoạt tùy tình huống.

## Bước tiếp theo

Đã hiểu agent, tool use, MCP — giờ xem cách áp dụng những kỹ thuật này vào sản phẩm có sẵn: [Tích hợp AI vào app có sẵn](04-tich-hop-ai-vao-app.md)
