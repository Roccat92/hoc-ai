# RAG là gì và cách build: chatbot hỏi đáp tài liệu công ty

Bài này dành cho người đã gọi được API LLM ([bài trước](01-goi-api-llm.md)) và muốn build một chatbot **trả lời dựa trên tài liệu riêng** của mình (ví dụ: quy định công ty, tài liệu sản phẩm, ghi chú cá nhân) - thứ mà AI gốc chưa từng được huấn luyện để biết. Học xong bạn sẽ hiểu RAG hoạt động ra sao và build được một chatbot RAG đơn giản. Đây đúng là câu trả lời cho "RAG là gì" và "cách làm chatbot AI đọc tài liệu riêng của công ty" - hai câu hỏi luôn đi cùng nhau khi ai đó mới tìm hiểu RAG.

## Vì sao cần RAG?

Hai giới hạn của LLM gốc mà RAG giải quyết:
1. **AI không biết dữ liệu riêng của bạn** - model được huấn luyện trên dữ liệu công khai tới một thời điểm nhất định, không thể biết nội dung tài liệu nội bộ công ty bạn, hay thông tin cập nhật sau thời điểm huấn luyện.
2. **Context window có giới hạn** ([xem lại](../00-ban-do-gioi-ai/02-llm-la-gi.md)) - bạn không thể nhét toàn bộ kho tài liệu công ty (có thể hàng nghìn trang) vào mỗi lần hỏi.

**RAG (Retrieval-Augmented Generation)** giải quyết cả hai: thay vì nhét toàn bộ tài liệu vào mỗi câu hỏi, hệ thống **tự động tìm ra những đoạn tài liệu liên quan nhất** tới câu hỏi, chỉ đưa những đoạn đó vào prompt gửi cho AI - vừa tiết kiệm token, vừa giúp AI trả lời có căn cứ thay vì "đoán mò" (giảm hallucination).

## RAG hoạt động thế nào - 4 bước

```
Tài liệu → Chia nhỏ (chunking) → Tạo embedding → Lưu vào vector database
                                                          ↓
Câu hỏi người dùng → Tạo embedding câu hỏi → Tìm đoạn tài liệu gần nghĩa nhất
                                                          ↓
                              Đưa (câu hỏi + đoạn tài liệu tìm được) vào prompt → AI trả lời
```

1. **Chia nhỏ tài liệu (chunking):** cắt tài liệu dài thành các đoạn nhỏ hơn (ví dụ vài trăm từ mỗi đoạn) - vì embedding và việc tìm kiếm hoạt động tốt hơn với đoạn ngắn, tập trung một ý.
2. **Tạo embedding:** biến mỗi đoạn văn bản thành một dãy số (vector) đại diện cho ý nghĩa - xem lại khái niệm ở [từ điển thuật ngữ](../00-ban-do-gioi-ai/06-tu-dien-thuat-ngu.md). Việc này cũng gọi API (embedding API) của một hãng AI.
3. **Lưu vào vector database:** lưu các vector này vào một cơ sở dữ liệu chuyên tìm kiếm theo độ "gần nghĩa" (ví dụ: Chroma, Pinecone, Weaviate, hoặc pgvector nếu bạn đã dùng PostgreSQL).
4. **Khi có câu hỏi:** biến câu hỏi thành embedding tương tự, tìm trong vector database những đoạn tài liệu có vector "gần" nhất về ý nghĩa, rồi gửi (câu hỏi + các đoạn tìm được) vào một prompt cho LLM trả lời - LLM lúc này trả lời **dựa trên tài liệu thật** thay vì chỉ dựa vào trí nhớ huấn luyện.

<figure style="max-width:560px;margin:24px auto">
<svg id="mh-rag" viewBox="0 0 480 260" width="100%" role="img" aria-label="Tài liệu cắt thành 6 mẩu, 2 mẩu khớp câu hỏi được đưa cùng câu hỏi vào model, model trả lời kèm nguồn" style="font-family:inherit;display:block">
  <rect x="20" y="30" width="80" height="60" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="60" y="64" style="fill:currentColor;font-size:14px;font-weight:600;font-size:13px;text-anchor:middle">Tài liệu</text>
  <text x="128" y="50" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">cắt nhỏ</text>
<path d="M106 60 H152 M145 55 L152 60 L145 65" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <rect x="160" y="40" width="40" height="40" rx="3" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="180" y="65" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">1</text>
  <rect x="208" y="40" width="40" height="40" rx="3" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="228" y="65" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">2</text>
  <rect class="mh-anim" x="256" y="40" width="40" height="40" rx="3" style="fill:var(--vp-c-brand-1);fill-opacity:.3;stroke:var(--vp-c-brand-1);stroke-opacity:1;stroke-width:2;animation:mh-rag-p 5.5s ease-in-out infinite"/><text x="276" y="65" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">3</text>
  <rect x="304" y="40" width="40" height="40" rx="3" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="324" y="65" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">4</text>
  <rect class="mh-anim" x="352" y="40" width="40" height="40" rx="3" style="fill:var(--vp-c-brand-1);fill-opacity:.3;stroke:var(--vp-c-brand-1);stroke-opacity:1;stroke-width:2;animation:mh-rag-p 5.5s ease-in-out infinite"/><text x="372" y="65" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">5</text>
  <rect x="400" y="40" width="40" height="40" rx="3" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/><text x="420" y="65" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">6</text>
  <line x1="156" y1="86" x2="444" y2="86" style="stroke:var(--vp-c-divider);stroke-width:2"/>
  <text x="214" y="104" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">6 mẩu xếp lên kệ</text>
  <path d="M372 88 V140 H276 M276 88 V196 M271 189 L276 196 L281 189" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <circle class="mh-anim mh-dot" cx="276" cy="100" r="4" style="fill:var(--vp-c-brand-1);stroke:none;animation:mh-rag-d 5.5s ease-in-out infinite"/>
  <text x="382" y="130" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px">2 mẩu khớp</text>
  <text x="382" y="145" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px">được lấy ra</text>
  <rect x="12" y="202" width="132" height="40" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.45;stroke-width:1.5"/>
  <text x="78" y="218" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">câu hỏi</text>
  <text x="78" y="234" style="fill:currentColor;font-size:14px;font-weight:600;font-size:12px;text-anchor:middle">"Nghỉ phép mấy ngày?"</text>
<path d="M150 222 H174 M167 217 L174 222 L167 227" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <rect x="180" y="200" width="120" height="44" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:1;stroke-width:2"/>
  <text x="240" y="219" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">MODEL</text>
  <text x="240" y="235" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px;text-anchor:middle">câu hỏi + 2 mẩu</text>
<path d="M308 222 H336 M329 217 L336 222 L329 227" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <text x="344" y="217" style="fill:currentColor;font-size:14px;font-weight:600;font-size:12px">"12 ngày."</text>
  <text x="344" y="233" style="fill:var(--vp-c-text-2);font-size:12px;font-size:12px">nguồn: mẩu 3, 5</text>
</svg>
<figcaption style="text-align:center;font-size:14px;color:var(--vp-c-text-2);margin-top:8px">Chỉ vài mẩu tài liệu liên quan tới câu hỏi được đưa cho model, nên câu trả lời bám tài liệu thật.</figcaption>
</figure>

## Build chatbot RAG đơn giản với Claude Code

Bạn không cần tự viết từng bước trên bằng tay - mô tả yêu cầu cho Claude Code theo từng bước nhỏ (đúng tinh thần đã học ở [bài dự án đầu tiên](../02-code-voi-ai/03-du-an-dau-tien.md)):

**Bước 1 - chuẩn bị tài liệu mẫu:** tạo một thư mục chứa vài file văn bản (.txt hoặc .md) làm "tài liệu công ty" mẫu để thử nghiệm.

**Bước 2 - mô tả yêu cầu ban đầu:**
```
Tôi muốn build một chatbot RAG bằng Python, đọc các file .txt trong thư mục "tai-lieu/",
chia nhỏ nội dung, tạo embedding, lưu vào Chroma (vector database chạy local, không cần
server riêng). Dùng API embedding và API chat của Claude/Anthropic. Trước tiên, viết
phần đọc file và chia nhỏ (chunking) thôi, tôi sẽ yêu cầu tiếp phần sau.
```

**Bước 3 - kiểm tra, rồi yêu cầu tiếp phần tạo embedding và lưu vào Chroma.**

**Bước 4 - yêu cầu tiếp phần nhận câu hỏi, tìm đoạn liên quan, gửi cho AI trả lời:**
```
Giờ viết phần: nhận một câu hỏi từ người dùng qua terminal (input()), tìm 3 đoạn tài
liệu liên quan nhất trong Chroma, đưa vào prompt cùng câu hỏi, gọi API Claude để trả lời,
in kết quả ra màn hình.
```

**Bước 5 - thử nghiệm:** hỏi một câu mà câu trả lời chỉ có trong tài liệu mẫu bạn đã tạo (không phải kiến thức phổ thông) - nếu AI trả lời đúng dựa trên nội dung file, hệ thống RAG đã hoạt động.

## Công cụ hỗ trợ dựng RAG nhanh hơn

Nếu muốn xây RAG phức tạp hơn (nhiều loại tài liệu, nhiều bước xử lý), có hai thư viện phổ biến giúp giảm code phải viết tay: **LangChain** và **LlamaIndex** - cả hai đều có tài liệu và cộng đồng lớn, hỗ trợ sẵn nhiều bước trong quy trình RAG (đọc file nhiều định dạng, chunking, kết nối vector database). Với người mới, có thể thử tự làm từng bước tay trước (như hướng dẫn trên) để hiểu bản chất, sau đó chuyển sang các thư viện này khi cần mở rộng.

## Lưu ý về chi phí

RAG tốn hai loại chi phí API: **embedding** (mỗi lần thêm tài liệu mới, và mỗi lần có câu hỏi mới) và **chat completion** (mỗi lần AI trả lời). Với dự án nhỏ/thử nghiệm, chi phí này thường rất thấp - nhưng nếu tài liệu lớn (hàng nghìn trang) hoặc lượng câu hỏi cao, hãy ước tính trước bằng cách tham khảo giá embedding/chat tại trang pricing chính thức của hãng.

## Bước tiếp theo

RAG giúp AI trả lời dựa trên dữ liệu - bước tiếp theo là cho AI **tự hành động** nhiều bước, không chỉ trả lời: [AI Agent →](03-ai-agent.md)
