# Trợ Lý Tài Liệu — chatbot RAG nội bộ

## Quy ước chung
- Ngôn ngữ giao tiếp: tiếng Việt
- Backend: Python, dùng FastAPI — không tự đổi sang framework khác nếu chưa hỏi
- Frontend: React (Vite), function component + hooks
- Chunking: chia tài liệu theo đoạn vừa phải (khoảng vài trăm từ mỗi đoạn), không chia theo từng câu quá nhỏ, không gộp cả file thành một đoạn duy nhất

## Cấu trúc thư mục
- `backend/` — server FastAPI
- `backend/rag/` — logic chunking, tạo embedding, truy vấn Chroma
- `backend/routes/` — các route API
- `frontend/src/pages/` — mỗi trang một file

## Điều cấm làm
- Không để chatbot tự bịa thông tin khi không tìm thấy đoạn liên quan trong tài liệu — luôn trả lời rõ "không tìm thấy" thay vì đoán (chống hallucination — xem [`00-ban-do-gioi-ai/02-llm-la-gi.md`](../../00-ban-do-gioi-ai/02-llm-la-gi.md))
- Không bao giờ trả lời dựa trên tài liệu mà thiếu trích dẫn nguồn đi kèm
- Không tự chế hàm mã hóa mật khẩu — dùng bcrypt (xem [`10-bao-mat/05-dang-nhap-va-mat-khau.md`](../../10-bao-mat/05-dang-nhap-va-mat-khau.md))
- Không lưu API key trực tiếp trong code — luôn đọc từ `.env`
- Không tự thêm thư viện ngoài dự tính nếu chưa hỏi trước

## Lưu ý riêng của dự án
- Luôn đọc `spec.md` và `backlog.md` trước khi bắt đầu một task mới
- Đây là dự án học tập theo mẫu — với phần RAG (chunking/embedding/truy vấn), giải thích kỹ hơn bình thường vì đây là kỹ thuật mới với người học, không chỉ CRUD quen thuộc như dự án 02
