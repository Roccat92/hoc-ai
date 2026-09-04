# Các nghề trong AI: làm gì, cần kỹ năng gì, lương tham khảo

Bài này dành cho người tò mò "học AI xong thì làm nghề gì, kiếm sống kiểu gì" - kể cả khi bạn không có ý định đi làm thuê mà chỉ muốn tự làm sản phẩm riêng, hiểu bức tranh nghề nghiệp vẫn giúp bạn biết nên đầu tư học kỹ năng nào trước.

> **Về con số lương:** Thị trường AI ở Việt Nam thay đổi nhanh và lương chênh lệch rất lớn theo công ty, kinh nghiệm, khu vực (Hà Nội/TP.HCM thường cao hơn), công ty trong nước vs công ty nước ngoài/outsource. Các khoảng lương dưới đây chỉ là **tham khảo thô ở mức khái quát**, không phải số liệu khảo sát chính thức - hãy tự kiểm tra tin tuyển dụng thật trên ITviec, TopCV, LinkedIn tại thời điểm bạn đọc để có con số sát thực tế nhất.

## Các nghề chính trong ngành

### AI Engineer / GenAI Engineer

**Làm gì:** Xây dựng ứng dụng dùng AI - tích hợp API LLM vào sản phẩm, build chatbot, hệ thống RAG, AI agent. Đây là vai trò **"hot" nhất hiện nay** và cũng là hướng đi mà repo này định hướng người đọc tới.

**Cần biết:** Lập trình cơ bản (thường Python hoặc JavaScript/TypeScript), cách gọi API LLM, hiểu RAG/agent, biết dùng công cụ code với AI (Claude Code, Cursor...) để tăng tốc.

**Lương tham khảo:** Junior khoảng 12-25 triệu/tháng, mid-level 25-45 triệu/tháng, senior có thể 45-80+ triệu/tháng tùy công ty. Đây là ước lượng rất thô - kiểm tra tin tuyển dụng thật để có số chính xác.

### Prompt Engineer

**Làm gì:** Thiết kế, tối ưu prompt (câu lệnh) để AI trả lời đúng ý, đúng định dạng cần thiết, giảm lỗi/hallucination. Vai trò từng "nổi" mạnh năm 2023 nhưng ngày càng **được gộp vào công việc của AI Engineer** thay vì tồn tại độc lập, vì kỹ năng prompt giờ được xem là kỹ năng nền tảng ai làm AI cũng cần có, không còn là một nghề tách riêng ở nhiều công ty.

**Cần biết:** Hiểu sâu cách LLM "suy nghĩ", kỹ năng viết rõ ràng, tư duy thử-sai có hệ thống. Xem [`01-bat-dau-tu-so-0/04-prompt-co-ban.md`](../01-bat-dau-tu-so-0/04-prompt-co-ban.md).

### ML Engineer

**Làm gì:** Xây dựng, huấn luyện, triển khai các mô hình machine learning truyền thống (dự đoán, phân loại, gợi ý...) - không nhất thiết liên quan tới LLM/GenAI.

**Cần biết:** Python, thư viện ML (scikit-learn, PyTorch, TensorFlow), thống kê, toán (đại số tuyến tính, xác suất).

**Lương tham khảo:** Tương đương hoặc nhỉnh hơn AI Engineer một chút ở mức senior do đòi hỏi nền tảng toán/thống kê sâu hơn - chênh lệch lớn theo công ty.

### MLOps Engineer

**Làm gì:** Xây dựng hạ tầng để triển khai, giám sát, mở rộng các hệ thống AI/ML trong môi trường thực tế (production) - giống DevOps nhưng chuyên cho AI/ML.

**Cần biết:** Cloud (AWS/GCP/Azure), Docker, Kubernetes, CI/CD, kiến thức hạ tầng vững - xem nền tảng ở [`03-ha-tang-thuc-chien/`](../03-ha-tang-thuc-chien/).

### Data Scientist

**Làm gì:** Phân tích dữ liệu, tìm insight, xây dựng mô hình dự đoán/thống kê để hỗ trợ ra quyết định kinh doanh.

**Cần biết:** Python/R, SQL, thống kê, kỹ năng "kể chuyện bằng dữ liệu" (trực quan hóa, trình bày cho người không kỹ thuật hiểu).

### Data Engineer

**Làm gì:** Xây dựng hệ thống thu thập, xử lý, lưu trữ dữ liệu quy mô lớn - "đường ống" dữ liệu nuôi các hệ thống ML/AI phía sau.

**Cần biết:** SQL, hệ thống dữ liệu phân tán, kỹ năng lập trình backend vững.

### AI Researcher

**Làm gì:** Nghiên cứu kiến trúc model mới, cải tiến thuật toán huấn luyện - thường ở các phòng lab lớn (Anthropic, OpenAI, Google DeepMind...) hoặc môi trường học thuật.

**Cần biết:** Nền tảng toán/thống kê rất sâu, thường cần bằng Thạc sĩ/Tiến sĩ, khả năng đọc và tái hiện paper nghiên cứu. Đây là hướng đi **khó tiếp cận nhất** với người tự học, không phải trọng tâm của repo này.

### AI Product Manager

**Làm gì:** Định hướng sản phẩm có AI - quyết định tính năng gì nên dùng AI, đo lường hiệu quả, làm việc giữa đội kỹ thuật và người dùng.

**Cần biết:** Không nhất thiết phải code giỏi, nhưng cần hiểu đủ sâu về khả năng/giới hạn của AI để ra quyết định sản phẩm hợp lý.

## Bảng tóm tắt

| Nghề | Cần code giỏi? | Cần toán sâu? | Độ "hot" hiện nay |
|---|---|---|---|
| AI Engineer | Có (cơ bản-khá) | Không nhiều | Rất cao |
| Prompt Engineer (độc lập) | Ít | Không | Đang giảm, gộp vào AI Engineer |
| ML Engineer | Có | Có | Cao |
| MLOps Engineer | Có (hạ tầng) | Không nhiều | Cao |
| Data Scientist | Có | Có | Ổn định |
| Data Engineer | Có | Không nhiều | Ổn định |
| AI Researcher | Có | Rất sâu | Cao nhưng khó vào |
| AI Product Manager | Không bắt buộc | Không | Đang tăng |

## Không muốn đi làm thuê thì sao?

Một hướng đi ngày càng phổ biến nhờ AI code editor (Claude Code, Cursor...): trở thành **"solo builder" / indie hacker** - tự học, tự build sản phẩm của riêng mình (SaaS nhỏ, công cụ tự động hóa, app...) mà không cần cả một team kỹ thuật. Đây chính là con đường mà toàn bộ lộ trình trong repo này hướng tới: bạn không cần "trở thành nhà tuyển dụng thích", chỉ cần đủ kỹ năng để tự biến ý tưởng thành sản phẩm thật.

## Bước tiếp theo

Trước khi đi tiếp, trang bị cho mình một công cụ quan trọng: từ điển thuật ngữ để không bị "khớp" mỗi khi gặp từ lạ: [Từ điển thuật ngữ A-Z](06-tu-dien-thuat-ngu.md)
