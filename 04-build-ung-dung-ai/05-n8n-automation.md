# Tự động hóa không cần code nhiều với n8n + AI

Bài này dành cho người muốn tự động hóa công việc lặp lại (nhận email → xử lý → lưu dữ liệu → thông báo...) mà **không muốn tự viết và bảo trì code cho từng bước**. Học xong bạn sẽ biết n8n là gì, cài đặt được, và build một workflow tự động có tích hợp AI.

## n8n là gì?

n8n là công cụ tự động hóa workflow theo kiểu **kéo-thả (low-code/no-code)** - bạn nối các "khối" (node) lại với nhau thành một luồng xử lý tự động: "khi có sự kiện X xảy ra → làm bước A → nếu điều kiện B đúng thì làm C → gửi thông báo D". Mỗi khối có thể là: nhận dữ liệu từ một nguồn (email, form, webhook), gọi một API (bao gồm API AI), ghi vào Google Sheet/database, gửi tin nhắn Slack/Telegram...

**Điểm khác biệt lớn nhất so với Zapier/Make** (hai công cụ tương tự phổ biến): n8n có thể **tự host miễn phí** (bạn tự chạy trên VPS của mình - xem lại [`03-ha-tang-thuc-chien/01-thue-vps.md`](../03-ha-tang-thuc-chien/01-thue-vps.md)), trong khi Zapier/Make chủ yếu là dịch vụ cloud trả phí theo số lượt chạy. Nếu bạn đã quen thuê VPS, tự host n8n giúp tiết kiệm đáng kể về lâu dài.

## Cài đặt n8n

**Cách 1 - dùng n8n Cloud** (nhanh nhất, không cần VPS): vào n8n.io, đăng ký, dùng ngay trên trình duyệt - có bản dùng thử, sau đó trả phí theo tháng.

**Cách 2 - tự host bằng Docker trên VPS** (miễn phí, chỉ tốn tiền VPS đã thuê):

```bash
docker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

- `docker run -d`: chạy container ở chế độ nền (không chiếm terminal).
- `--name n8n`: đặt tên container để dễ quản lý.
- `-p 5678:5678`: mở cổng 5678 để truy cập giao diện n8n qua trình duyệt.
- `-v n8n_data:/home/node/.n8n`: lưu dữ liệu n8n vào một volume riêng, để không mất workflow khi container khởi động lại.

Nếu VPS chưa cài Docker, yêu cầu Claude Code cài giúp: "Cài Docker trên Ubuntu server này." Sau khi chạy lệnh trên, truy cập `http://dia-chi-ip-vps:5678` để mở giao diện n8n (nên cấu hình thêm Nginx + SSL như [bài deploy VPS](../03-ha-tang-thuc-chien/02-deploy-web-len-vps.md) nếu muốn truy cập an toàn qua domain riêng thay vì IP trần).

## Ví dụ workflow tích hợp AI

**Ví dụ: Email khách hàng → AI tóm tắt + phân loại → lưu Google Sheet → thông báo Slack nếu khẩn cấp**

Các khối (node) trong workflow này:
1. **Trigger (khởi động):** node "Email Trigger" - kích hoạt mỗi khi có email mới tới một hộp thư cụ thể.
2. **Xử lý AI:** node "HTTP Request" (hoặc node tích hợp sẵn cho Anthropic/OpenAI nếu n8n có) - gửi nội dung email tới API Claude, yêu cầu: "Tóm tắt email này trong 2 câu, và phân loại mức độ ưu tiên: Thấp/Trung bình/Khẩn cấp."
3. **Điều kiện (IF):** kiểm tra kết quả phân loại - nếu là "Khẩn cấp" thì đi theo nhánh thông báo ngay.
4. **Lưu dữ liệu:** node "Google Sheets" - ghi thêm một dòng mới gồm: người gửi, nội dung tóm tắt, mức độ ưu tiên, thời gian.
5. **Thông báo (nếu khẩn cấp):** node "Slack" hoặc "Telegram" - gửi tin nhắn cảnh báo tới kênh nhóm.

Toàn bộ luồng này chạy **tự động, 24/7**, không cần bạn ngồi kiểm tra email thủ công.

## Các ví dụ workflow phổ biến khác

- **Form khảo sát → AI phân loại phản hồi (tích cực/tiêu cực/trung lập) → lưu database.**
- **Bài đăng mạng xã hội mới của đối thủ → AI tóm tắt nội dung → gửi báo cáo hàng ngày qua email.**
- **File tài liệu mới upload vào Google Drive → AI tóm tắt nội dung → gửi thông báo cho team.**

## Chi phí

| Hình thức | Chi phí ước tính |
|---|---|
| Tự host trên VPS đã có sẵn | Miễn phí (chỉ tốn chi phí VPS đã tính ở [bài thuê VPS](../03-ha-tang-thuc-chien/01-thue-vps.md)) |
| n8n Cloud | Có bản dùng thử, sau đó trả phí theo tháng theo số lượt workflow chạy - kiểm tra giá tại n8n.io/pricing |
| API AI dùng trong workflow | Tính riêng theo token, xem [bài gọi API LLM](01-goi-api-llm.md) |

**Lời khuyên:** nếu bạn đã có VPS đang chạy dự án khác, tự host n8n trên cùng VPS đó (nếu cấu hình còn dư tài nguyên) là cách tiết kiệm nhất để bắt đầu thử nghiệm tự động hóa.

## Bước tiếp theo

Đã biết gọi API, RAG, agent, tích hợp và tự động hóa. Trước khi train model, hãy học cách làm đầu ra AI có schema, có eval và có đường xử lý lỗi: [Structured output, eval và AI reliability →](06-structured-output-evals-va-reliability.md)
