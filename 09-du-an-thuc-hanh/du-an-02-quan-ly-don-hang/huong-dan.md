# Hướng dẫn: từ bản mẫu tới sản phẩm của riêng bạn

Bài này dành cho người đã xong [dự án 01](../du-an-01-landing-page/spec.md) và sẵn sàng thử sức với một dự án có **backend, database, và đăng nhập thật** - bước tiến rõ rệt so với trang tĩnh trước đó. Học xong bạn sẽ có một web quản lý đơn hàng chạy thật, và hiểu vì sao mỗi quyết định kỹ thuật trong spec.md lại được chọn như vậy.

## Bước 1: Copy bộ spec ra dự án riêng

```bash
mkdir quan-ly-don-hang
cp spec.md backlog.md CLAUDE.md quan-ly-don-hang/
cd quan-ly-don-hang
```

## Bước 2: Chạy đúng quy trình đã học ở phần 8

Giống dự án 01, nhưng backlog dài hơn nên **càng cần nghiêm túc làm từng task một, commit sau mỗi task** (xem lại [quy trình một phiên làm việc chuẩn](../../08-chuan-hoa-du-an/05-quy-trinh-1-phien-lam-viec.md)). Dự án có backend, một task làm hỏng có thể ảnh hưởng tới các task sau - càng nhiều lý do để commit thường xuyên.

Đây cũng là dự án hợp lý để bắt đầu áp dụng tinh thần "giao việc trọn gói" đã học ở [bài setup một lần để agent tự chạy](../../08-chuan-hoa-du-an/06-setup-mot-lan-de-agent-tu-chay.md): mô tả task đầy đủ, để agent tự code/test/commit, bạn nghiệm thu bằng cách tự dùng thử - thay vì tick từng task thủ công như dự án 01. Lưu ý: bài đó dùng ví dụ Vercel/Supabase nên có "bản xem thử" tự động theo nhánh; dự án này deploy VPS nên không có tính năng đó. Tách dev/prod ở đây đơn giản hơn: dùng hai file `.db` riêng - một để agent tự do thử, một là bản thật chỉ cập nhật sau khi bạn tự kiểm tra kỹ trên máy mình.

Prompt bắt đầu phiên đầu tiên:
```
Đọc spec.md và CLAUDE.md trước. Task đầu tiên trong backlog.md là "Khởi
tạo dự án - thư mục backend/ (Express) và frontend/ (React qua Vite),
cấu trúc cơ bản". Làm đúng task này.
```

## Vì sao spec chọn những công nghệ này - hiểu để không chỉ làm theo

- **SQLite thay vì một database server riêng:** vì chỉ có một người dùng (chủ shop), không cần hạ tầng database phức tạp - một file `.db` là đủ, và backup cũng chỉ cần copy file đó.
- **bcrypt cho mật khẩu, không tự chế:** nhắc lại nguyên tắc ở [phần bảo mật](../../10-bao-mat/05-dang-nhap-va-mat-khau.md) - đây là chỗ dễ sai nhất nếu tự làm.
- **JWT cho phiên đăng nhập:** một cách phổ biến để "nhớ" bạn đã đăng nhập giữa các lần gọi API, không cần lưu trạng thái phiên ở phía server.
- **Prepared statements khi truy vấn SQLite:** chống SQL injection - nếu bạn tò mò SQL injection nguy hiểm thế nào, hỏi Claude Code: "cho tôi ví dụ SQL injection có thể xảy ra nếu tôi nối chuỗi SQL trực tiếp từ input người dùng."

## Bước 3: Biến thành sản phẩm của riêng bạn

Đổi `spec.md` để phù hợp với ngành hàng thật của bạn - cấu trúc CRUD (thêm/xem/sửa/xóa) + tìm kiếm + trạng thái áp dụng được cho rất nhiều loại hình kinh doanh nhỏ, không chỉ bán quần áo:

- **Đổi trường dữ liệu** theo ngành: quán ăn (món ăn, bàn số, giao tận nơi hay tại chỗ), dịch vụ sửa chữa (loại thiết bị, ngày hẹn), lớp học (học viên, buổi học, đã đóng học phí chưa)...
- **Đổi các trạng thái đơn** cho phù hợp quy trình thật của bạn (không nhất thiết phải đúng 4 trạng thái như bản mẫu).
- **Đổi giao diện** - màu sắc, bố cục - theo gu của bạn.

Sửa `spec.md`, cập nhật `backlog.md` cho các thay đổi, rồi lặp lại quy trình.

## Trước khi cho người khác (kể cả nhân viên) dùng thử

Dự án này có backend, database, đăng nhập thật - **đi lại toàn bộ checklist ở [phần 10 - bảo mật](../../10-bao-mat/)** trước khi public hoặc đưa cho người khác dùng, đặc biệt các mục: giấu `.env` (JWT secret, thông tin admin), SSL khi deploy lên VPS, và giới hạn số lần đăng nhập sai.

## Tự chấm: mình đã hiểu chưa?

- [ ] Bạn giải thích được JWT dùng để làm gì trong dự án này, khác gì với việc lưu mật khẩu ở mỗi request?
- [ ] Bạn biết vì sao nối chuỗi SQL trực tiếp từ input người dùng lại nguy hiểm (SQL injection), và code hiện tại của bạn có tránh được không?
- [ ] Bạn tự backup được database (chỉ cần copy file `.db`) và biết phục hồi lại nếu cần?
- [ ] Bạn tự deploy lại được lên VPS sau khi sửa code, không cần giở lại từng bước hướng dẫn?
- [ ] Nếu quên mật khẩu admin, bạn biết cách tự đặt lại (qua database) mà không cần tính năng "quên mật khẩu" tự động?

Câu nào chưa chắc - quay lại phần đó, tự làm lại trước khi chuyển tiếp.

## Bước tiếp theo

Dự án khó nhất trong ba dự án - chatbot hỏi đáp tài liệu riêng, dùng RAG thật: [Dự án 03 - Chatbot hỏi đáp tài liệu](../du-an-03-chatbot-tai-lieu/spec.md)
