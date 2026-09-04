# Spec: Trợ Lý Tài Liệu — chatbot hỏi đáp tài liệu công ty (RAG)

## Mục tiêu
Một chatbot nội bộ giúp nhân viên hỏi đáp nhanh về tài liệu công ty (quy định, hướng dẫn quy trình, chính sách) thay vì phải tự lục tìm trong hàng chục file — mọi câu trả lời đều kèm trích dẫn nguồn (tên file, đoạn nào) để người hỏi tự kiểm tra lại được, không phải tin mù theo AI.

## Người dùng
Nhân viên trong một công ty/tổ chức nhỏ (dưới 50 người), truy cập qua trình duyệt nội bộ. Có hai vai trò: **admin** (upload/quản lý tài liệu) và **nhân viên** (chỉ hỏi đáp).

## Tính năng PHẢI có
- Đăng nhập, phân biệt hai vai trò: admin và nhân viên
- Admin: upload tài liệu (định dạng `.txt` và `.pdf` dạng văn bản thuần ở bản đầu), xem danh sách tài liệu đã upload, xóa tài liệu
- Khi upload, hệ thống tự động: chia nhỏ nội dung (chunking) → tạo embedding cho từng đoạn → lưu vào vector database
- Nhân viên: giao diện chat, gõ câu hỏi, nhận câu trả lời
- **Mọi câu trả lời dựa trên tài liệu đều phải kèm trích dẫn nguồn** — tên file và đoạn trích ngắn đã dùng để trả lời
- Nếu không tìm thấy thông tin liên quan trong tài liệu đã có, chatbot phải trả lời rõ **"không tìm thấy thông tin này trong tài liệu hiện có"** — tuyệt đối không tự bịa (chống hallucination, xem lại [`00-ban-do-gioi-ai/02-llm-la-gi.md`](../../00-ban-do-gioi-ai/02-llm-la-gi.md))
- Lịch sử chat được giữ lại trong phiên làm việc hiện tại (chưa cần lưu vĩnh viễn qua nhiều lần đăng nhập ở bản đầu)

## Tính năng KHÔNG làm (bản đầu tiên)
- Không cần hỗ trợ định dạng file phức tạp (ảnh scan, bảng biểu, PDF quét) — chỉ văn bản thuần
- Không cần phân quyền theo phòng ban — mọi nhân viên thấy được mọi tài liệu đã upload
- Không cần sửa nội dung tài liệu ngay trên web — xóa và upload lại bản mới nếu cần cập nhật
- Không cần giao diện di động riêng, chỉ cần web responsive

## Công nghệ
- Backend: Python (FastAPI)
- Frontend: React (nhất quán với [dự án 02](../du-an-02-quan-ly-don-hang/spec.md))
- Vector database: [Chroma](https://www.trychroma.com) — chạy embedded/local, không cần server riêng, phù hợp dự án nhỏ (xem lại [`04-build-ung-dung-ai/02-rag-la-gi-va-build.md`](../../04-build-ung-dung-ai/02-rag-la-gi-va-build.md))
- Embedding + trả lời câu hỏi: API Claude (xem cách lấy key và tính chi phí ở [`04-build-ung-dung-ai/01-goi-api-llm.md`](../../04-build-ung-dung-ai/01-goi-api-llm.md))
- Xác thực: bcrypt + JWT, cùng cách làm với [dự án 02](../du-an-02-quan-ly-don-hang/spec.md) — tài khoản admin và nhân viên tạo qua script seed đọc từ `.env`, không có form đăng ký công khai
- Deploy: VPS (có backend Python cần chạy liên tục — xem [`03-ha-tang-thuc-chien/`](../../03-ha-tang-thuc-chien/))

## Màn hình chính
1. Đăng nhập
2. Quản lý tài liệu (chỉ admin thấy) — upload, danh sách, xóa
3. Chat hỏi đáp — khung chat, mỗi câu trả lời kèm khối "Nguồn tham khảo" hiện tên file + đoạn trích

## Dữ liệu cần lưu
- Bảng `tai_lieu`: id, ten_file, ngay_upload, nguoi_upload
- Bảng `nguoi_dung`: id, username, mat_khau_da_hash, vai_tro (`admin` hoặc `nhan_vien`)
- Vector database (Chroma): các đoạn đã chia nhỏ từ tài liệu, kèm embedding và liên kết ngược về `tai_lieu` (để biết đoạn nào thuộc file nào khi trích dẫn)
