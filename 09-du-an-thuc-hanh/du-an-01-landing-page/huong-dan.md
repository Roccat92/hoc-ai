# Hướng dẫn: từ bản mẫu tới sản phẩm của riêng bạn

Bài này dành cho người đã đọc [spec.md](spec.md) và sẵn sàng bắt tay build landing page "Nhà Sạch Xinh" - hoặc quan trọng hơn, biến nó thành sản phẩm **của riêng bạn**. Học xong bạn sẽ có một landing page thật sự dùng được, và biết cách áp dụng lại toàn bộ quy trình này cho bất kỳ ý tưởng dịch vụ nhỏ nào khác.

## Bước 1: Copy bộ spec ra dự án riêng

Đừng làm việc trực tiếp trong thư mục repo này. Tạo một thư mục dự án mới ở nơi khác trên máy bạn, copy 3 file `spec.md`, `backlog.md`, `CLAUDE.md` vào đó:

```bash
mkdir nha-sach-xinh
cp spec.md backlog.md CLAUDE.md nha-sach-xinh/
cd nha-sach-xinh
```

## Bước 2: Chạy đúng quy trình đã học ở phần 8

Mở coding agent (Claude Code hoặc Codex) trong thư mục vừa tạo, làm theo [quy trình một phiên làm việc chuẩn](../../08-chuan-hoa-du-an/05-quy-trinh-1-phien-lam-viec.md): mở backlog.md, chọn task đầu tiên, yêu cầu AI đọc spec.md và CLAUDE.md trước, làm, kiểm tra, commit, tick backlog - lặp lại tới hết.

Đi từng task như vậy là đúng cho dự án đầu tiên này, để bạn nắm chắc quy trình. Sau khi quen nhịp này, cách giao việc trọn gói hơn (và cấp quyền cho agent theo đúng khuyến nghị chính thức, không phải chỉ nới lỏng dần) nằm ở [bài setup một lần để agent tự chạy](../../08-chuan-hoa-du-an/06-setup-mot-lan-de-agent-tu-chay.md) - dùng cho dự án 02, 03 hoặc dự án thật sau này.

Prompt bắt đầu phiên đầu tiên:
```
Đọc spec.md và CLAUDE.md trước. Task đầu tiên trong backlog.md là
"Khởi tạo dự án - tạo index.html, khung HTML cơ bản, liên kết file CSS
riêng". Làm đúng task này.
```

Đi hết backlog, bạn sẽ có đúng bản landing page mô tả trong spec.md - đây là bước **luyện tập quy trình**, chưa phải sản phẩm cuối cùng của bạn.

## Bước 3: Biến thành sản phẩm của riêng bạn

Build xong bản mẫu rồi, giờ mới là phần thú vị. Sửa lại `spec.md` theo ý bạn:

- **Đổi tên, khẩu hiệu, màu sắc thương hiệu** - không cần dính tới "Nhà Sạch Xinh" hay dịch vụ dọn dẹp.
- **Đổi danh sách dịch vụ/gói, bảng giá** - dùng đúng dịch vụ/sản phẩm thật của bạn.
- **Đổi trường dữ liệu trong form** - ví dụ đổi "Khu vực" thành "Loại dịch vụ quan tâm", hoặc thêm/bớt trường tùy nhu cầu.
- **Đổi hẳn sang lĩnh vực khác** - cấu trúc landing page này (banner → danh sách dịch vụ → giá → điểm mạnh → form liên hệ) áp dụng được cho rất nhiều loại hình dịch vụ nhỏ: quán cà phê, lớp học thêm, dịch vụ sửa xe, tiệm nail, gia sư online...

Sửa xong `spec.md`, mở lại `backlog.md`, thêm/sửa các task cần thiết cho thay đổi đó (ví dụ "Đổi màu sắc theo bộ nhận diện mới", "Đổi 3 thẻ dịch vụ theo sản phẩm thật"), rồi lặp lại đúng quy trình ở bước 2.

## Tự chấm: mình đã hiểu chưa?

Trả lời được các câu dưới đây nghĩa là bạn đã thật sự hiểu, không chỉ "chạy được nhờ AI làm hộ":

- [ ] Bạn giải thích được cho người khác: khi khách bấm "Gửi" trên form, dữ liệu đi qua những đâu để tới được email của bạn?
- [ ] Formspree báo lỗi (ví dụ gửi không thành công), bạn biết tự tra cứu hoặc hỏi AI đúng cách để sửa, không cần chép nguyên xi lỗi đi hỏi khắp nơi mà không hiểu mình đang hỏi gì?
- [ ] Bạn tự đổi được màu sắc/bố cục một phần nhỏ mà không cần nhờ AI viết lại toàn bộ trang từ đầu?
- [ ] Bạn tự deploy lại được lên nền tảng miễn phí bạn đã chọn (Vercel, Netlify, Cloudflare Pages...) sau khi sửa, không cần giở lại hướng dẫn từng bước ở [phần 3](../../03-ha-tang-thuc-chien/03-deploy-mien-phi.md)?
- [ ] Bạn giải thích được vì sao dự án này dùng Formspree thay vì tự viết backend riêng?

Câu nào còn "chưa chắc" - quay lại đúng phần đó, tự thử làm lại (đừng nhờ AI ngay lần đầu) trước khi chuyển sang dự án khác. Hiểu chậm mà chắc luôn tốt hơn chạy nhanh mà không hiểu gì.

## Bước tiếp theo

Xong dự án này, thử sức với dự án khó hơn - có backend, database, đăng nhập thật: [Dự án 02 - Quản lý đơn hàng](../du-an-02-quan-ly-don-hang/spec.md)
