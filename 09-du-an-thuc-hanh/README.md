# Phần 9: Dự án thực hành — spec có sẵn, học bằng cách build

Không cần tự nghĩ đề bài. Mỗi dự án trong phần này đã có sẵn `spec.md` hoàn chỉnh, `backlog.md` chia sẵn task, `CLAUDE.md` mẫu, và `huong-dan.md` chỉ cách biến nó thành sản phẩm của riêng bạn. Việc của bạn: copy bộ file ra dự án riêng, làm theo đúng quy trình đã học ở [phần 8](../08-chuan-hoa-du-an/), rồi tùy biến thành thứ mang tên bạn.

**Dành cho:** người đã học xong [phần 8 — chuẩn hóa dự án](../08-chuan-hoa-du-an/) và muốn thực hành ngay quy trình đó trên một đề bài thật, thay vì tự nghĩ ý tưởng từ đầu. **Học xong mỗi dự án:** có một sản phẩm chạy thật, do chính bạn tùy biến, không phải bản sao y hệt người khác.

## Bảng chọn dự án theo trình độ

| Dự án | Độ khó | Công nghệ | Học được gì |
|---|---|---|---|
| [01 — Landing page + form liên hệ](du-an-01-landing-page/spec.md) | Dễ | HTML/CSS/JS thuần, Formspree, Cloudflare Pages | Toàn bộ quy trình spec → backlog → build → deploy, không cần backend |
| [02 — Quản lý đơn hàng cho shop nhỏ](du-an-02-quan-ly-don-hang/spec.md) | Vừa | React, Node.js + SQLite, đăng nhập bằng bcrypt + JWT | CRUD, database, xác thực người dùng cơ bản |
| [03 — Chatbot hỏi đáp tài liệu riêng (RAG)](du-an-03-chatbot-tai-lieu/spec.md) | Vừa-khó | Python (FastAPI) + Chroma + API Claude | RAG thật: chunking, embedding, trả lời có trích dẫn nguồn, chống bịa |

## Lộ trình gợi ý

Làm theo đúng thứ tự **01 → 02 → 03** — mỗi dự án đắp thêm một lớp kỹ năng lên dự án trước (từ tĩnh không backend, tới có database, tới tích hợp AI thật). Đừng nhảy cóc lên dự án khó nếu dự án dễ hơn còn làm chưa trôi chảy.

## Mỗi dự án gồm 4 file

- **`spec.md`** — mô tả đầy đủ, đủ chi tiết để Claude Code build đúng ngay từ đầu, không phải đoán.
- **`backlog.md`** — task đã chia nhỏ sẵn, làm theo đúng thứ tự.
- **`CLAUDE.md`** — quy ước mẫu cho dự án đó.
- **`huong-dan.md`** — cách copy ra dự án riêng, cách tùy biến thành sản phẩm của bạn, và bảng tự chấm "mình đã hiểu chưa".

**Lưu ý quan trọng:** repo chỉ cho **spec**, không kèm code giải sẵn — sản phẩm là do chính bạn (và AI bạn đang dùng) build ra, không phải copy-paste một đáp án có sẵn.

## Đóng góp dự án mới

Có ý tưởng dự án thực hành hay muốn thêm vào danh sách này? Viết theo đúng format 4 file ở trên (tham khảo [dự án 01](du-an-01-landing-page/spec.md) làm mẫu), rồi mở Pull Request theo hướng dẫn ở [CONTRIBUTING.md](../CONTRIBUTING.md). Ưu tiên các đề bài thực tế, phổ biến với người Việt (dịch vụ nhỏ, shop online, quán ăn...), có độ khó rõ ràng để xếp đúng vị trí trong bảng trên.

## Bước tiếp theo

Build xong sản phẩm rồi, trước khi cho người khác dùng thử: đi qua checklist bảo mật tối thiểu: [Bảo mật →](../10-bao-mat/)
