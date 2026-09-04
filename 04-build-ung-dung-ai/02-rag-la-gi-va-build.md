# RAG là gì và cách build: chatbot hỏi đáp tài liệu công ty

Bài này dành cho người đã gọi được API LLM ([bài trước](01-goi-api-llm.md)) và muốn build một chatbot **trả lời dựa trên tài liệu riêng** của mình (ví dụ: quy định công ty, tài liệu sản phẩm, ghi chú cá nhân) - thứ mà AI gốc chưa từng được huấn luyện để biết. Học xong bạn sẽ hiểu RAG hoạt động ra sao và build được một chatbot RAG đơn giản.

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

<iframe src="/minh-hoa/rag.html" title="Minh họa: RAG tìm mẩu tài liệu liên quan" loading="lazy" style="width:100%; height:460px; border:1px solid var(--vp-c-divider); border-radius:8px;"></iframe>

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
