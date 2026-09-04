# Viết spec.md: template chuẩn, có ví dụ điền sẵn

Bài này dành cho người đã hiểu [vì sao cần spec](01-tai-sao-can-spec.md) và muốn viết file spec.md đầu tiên của mình. Học xong bạn sẽ có một file spec.md hoàn chỉnh cho dự án đang định làm — kể cả khi bạn chưa từng viết tài liệu kỹ thuật nào trước đây.

## spec.md là gì, đặt ở đâu?

`spec.md` là một file văn bản (markdown) đặt ở **thư mục gốc dự án**, mô tả toàn bộ ý tưởng sản phẩm ở một chỗ duy nhất — giống một bản tóm tắt bạn đưa cho một người mới vào dự án để họ hiểu ngay "đang làm cái gì, cho ai, làm tới đâu thì dừng". AI (và cả bạn, sau vài tuần quên mất chi tiết) sẽ đọc file này mỗi khi cần nhớ lại toàn cảnh.

## Template chuẩn

Copy khối dưới đây, tạo file `spec.md` ở gốc dự án, điền vào từng mục:

```markdown
# Spec: [Tên dự án]

## Mục tiêu
[Dự án này giải quyết vấn đề gì, cho ai — 2-3 câu]

## Người dùng
[Ai sẽ dùng sản phẩm này — 1 hoặc nhiều nhóm người dùng]

## Tính năng PHẢI có
- [Tính năng 1]
- [Tính năng 2]
- ...

## Tính năng KHÔNG làm (ít nhất ở bản đầu tiên)
- [Cái gì cố tình bỏ qua, để tránh AI tự thêm vào ngoài ý muốn]

## Công nghệ
- Frontend: [ví dụ: HTML/CSS/JS thuần, hoặc React...]
- Backend: [ví dụ: không cần, hoặc Node.js + Express...]
- Database: [ví dụ: không cần lưu gì cả, hoặc SQLite...]
- Deploy: [ví dụ: Cloudflare Pages, xem phần 3]

## Màn hình chính
1. [Tên màn hình] — [mô tả ngắn có gì trên màn hình này]
2. ...

## Dữ liệu cần lưu
[Liệt kê các "thứ" cần lưu trữ và các trường quan trọng của mỗi thứ,
ví dụ: Đơn hàng (mã đơn, tên khách, sản phẩm, số lượng, trạng thái, ngày đặt)]
```

## Ví dụ điền sẵn: app quản lý đơn hàng shop quần áo nhỏ

```markdown
# Spec: Quản lý đơn hàng Shop ABC

## Mục tiêu
Giúp chủ shop quần áo online (bán qua Facebook/Zalo) theo dõi đơn hàng
mà không cần ghi vào sổ tay hay Excel rời rạc.

## Người dùng
Chỉ một người dùng: chủ shop (không cần phân quyền nhiều tài khoản ở bản đầu).

## Tính năng PHẢI có
- Thêm đơn hàng mới: tên khách, sản phẩm, size, màu, số lượng, giá
- Xem danh sách đơn hàng, lọc theo trạng thái
- Đổi trạng thái đơn: Chờ xử lý / Đang giao / Hoàn thành / Đã hủy
- Tìm đơn hàng theo tên khách hoặc số điện thoại

## Tính năng KHÔNG làm (bản đầu tiên)
- Không cần tích hợp thanh toán online
- Không cần đăng nhập nhiều tài khoản
- Không cần app di động riêng, chỉ cần web dùng được trên điện thoại

## Công nghệ
- Frontend: React
- Backend: Node.js + Express
- Database: SQLite (đơn giản, không cần server database riêng)
- Deploy: VPS (xem phần 3)

## Màn hình chính
1. Danh sách đơn hàng — bảng có cột tên khách, sản phẩm, trạng thái, ngày đặt
2. Thêm đơn hàng mới — form nhập liệu
3. Chi tiết đơn hàng — xem/sửa/đổi trạng thái một đơn cụ thể

## Dữ liệu cần lưu
Đơn hàng: mã đơn, tên khách, số điện thoại, sản phẩm, size, màu, số lượng,
giá, trạng thái, ngày đặt
```

## Chưa biết viết spec? Nhờ AI phỏng vấn bạn

Không cần tự nghĩ ra hết một mình. Mở Claude Code (hoặc chatbot bất kỳ), thử prompt:

```
Tôi muốn build [mô tả ngắn ý tưởng của bạn]. Tôi chưa biết viết spec.
Hãy phỏng vấn tôi từng câu một (không hỏi dồn) để làm rõ: mục tiêu,
người dùng, tính năng cần có, tính năng không cần, công nghệ muốn dùng,
các màn hình chính, dữ liệu cần lưu. Sau khi hỏi đủ, tự viết ra file
spec.md hoàn chỉnh theo đúng template chuẩn.
```

AI sẽ hỏi lại bạn từng phần một — bạn chỉ cần trả lời như đang trò chuyện, không cần biết trước cấu trúc file. Đây chính là cách thực tế nhất để bắt đầu nếu bạn thấy template ở trên vẫn "đáng sợ".

## Mẹo giữ spec luôn đúng

Spec không phải viết một lần rồi để đó — khi ý tưởng thay đổi giữa chừng (rất bình thường), **cập nhật lại spec.md** trước khi yêu cầu AI làm tiếp, để lần sau đọc lại vẫn đúng với thực tế hiện tại.

## Bước tiếp theo

Có spec rồi, giờ chia nhỏ nó thành các việc làm được trong từng phiên: [Backlog.md](03-backlog-md.md)
