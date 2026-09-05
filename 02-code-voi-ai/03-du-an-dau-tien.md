# Build dự án đầu tiên: một web app hoàn chỉnh chỉ bằng mô tả tiếng Việt

Bài này dành cho người đã cài xong một coding agent ([bài 01](01-cai-mot-coding-agent.md)) và muốn tự tay (à không, tự "mồm") build ra một sản phẩm chạy thật, nhìn thấy được, ngay trên trình duyệt. Học xong bạn sẽ có một ứng dụng "Danh sách công việc" (to-do list) hoàn chỉnh - thêm việc, đánh dấu xong, xóa việc, và **tự nhớ lại danh sách khi bạn tắt rồi mở lại trình duyệt** - toàn bộ chỉ bằng cách mô tả bằng tiếng Việt cho agent (bài này minh họa bằng Claude Code, Codex làm được y hệt).

Đây là lúc áp dụng mọi thứ đã học: tư duy làm từng bước nhỏ ([bài này](../01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai.md)) và kỹ thuật prompt ([bài này](../01-bat-dau-tu-so-0/04-prompt-co-ban.md)).

## Bước 0: Tạo thư mục dự án

Mở terminal, gõ:

```bash
mkdir danh-sach-cong-viec
cd danh-sach-cong-viec
```

- `mkdir danh-sach-cong-viec`: tạo một thư mục mới tên "danh-sach-cong-viec".
- `cd danh-sach-cong-viec`: di chuyển vào trong thư mục vừa tạo.

## Bước 1: Khởi động Claude Code

```bash
claude
```

Claude Code sẽ khởi động ngay trong thư mục dự án - mọi file nó tạo ra sẽ nằm gọn trong thư mục này.

## Bước 2: Mô tả yêu cầu ban đầu (làm phần nhỏ nhất trước)

Đừng yêu cầu mọi tính năng cùng lúc. Gõ:

```
Tạo cho tôi một trang web "Danh sách công việc" đơn giản bằng HTML/CSS/JavaScript thuần
(không dùng framework). Chỉ cần: một ô nhập text, một nút "Thêm", và khi bấm Thêm thì
công việc vừa nhập hiện thành một dòng trong danh sách bên dưới. Style đơn giản, sạch sẽ,
tông màu trắng - xanh dương nhạt.
```

Claude Code sẽ tạo ra (thường là) một file `index.html` chứa cả HTML, CSS, JavaScript. Nó sẽ báo lại đã tạo file gì, làm gì.

## Bước 3: Xem kết quả trong trình duyệt

Mở trình duyệt (Chrome, Edge...), mở trực tiếp file vừa tạo: kéo thả file `index.html` vào cửa sổ trình duyệt, hoặc trong trình duyệt bấm `Ctrl+O` (Mac: `Cmd+O`) rồi chọn file đó.

**Kiểm tra ngay:** gõ thử một việc vào ô nhập, bấm "Thêm" - có hiện ra danh sách không? Nếu có lỗi hoặc không đúng ý, quay lại Claude Code, mô tả cụ thể vấn đề, ví dụ: "Bấm nút Thêm không có gì xảy ra cả" hoặc "Chữ trong ô nhập bị tràn ra ngoài khung".

## Bước 4: Thêm tính năng đánh dấu hoàn thành và xóa việc

Khi bước 2-3 đã chạy đúng, tiếp tục:

```
Tốt rồi. Giờ thêm hai tính năng cho mỗi việc trong danh sách:
1. Một checkbox để đánh dấu đã hoàn thành - khi tick, chữ của việc đó bị gạch ngang.
2. Một nút nhỏ "Xóa" bên cạnh mỗi việc, bấm vào thì việc đó biến mất khỏi danh sách.
```

Kiểm tra lại: tick vào một việc - có gạch ngang không? Bấm "Xóa" - việc có biến mất không?

## Bước 5: Lưu lại danh sách khi tắt/mở lại trình duyệt

Đây là bước quan trọng - nếu không có bước này, tắt trình duyệt là mất sạch danh sách:

```
Giờ làm cho danh sách được lưu lại bằng localStorage của trình duyệt, để khi tôi đóng
trình duyệt rồi mở lại file này, danh sách công việc (kể cả trạng thái đã hoàn thành
hay chưa) vẫn còn nguyên, không bị mất.
```

**Kiểm tra kỹ bước này:** thêm vài việc, tick hoàn thành một việc, sau đó **đóng hẳn tab trình duyệt** (không chỉ load lại trang), mở file `index.html` lại từ đầu - danh sách có còn không?

> Không cần hiểu localStorage là gì để dùng được - nhưng nếu tò mò, hỏi thẳng Claude Code: "giải thích localStorage đang hoạt động thế nào trong file này" (áp dụng đúng nguyên tắc "hiểu để sửa" từ bài tư duy học với AI).

## Bước 6: Chỉnh giao diện theo ý thích

Đây là lúc bạn tự do mô tả gu thẩm mỹ của mình:

```
Style lại giao diện: dùng font chữ hiện đại hơn, các việc trong danh sách có khoảng
cách rộng rãi hơn, thêm hiệu ứng mờ dần (fade) nhẹ khi xóa một việc, và thêm dòng chữ
"Bạn có X việc chưa hoàn thành" ở trên cùng, tự động cập nhật số lượng.
```

## Kết quả

Sau 6 bước, bạn có một ứng dụng to-do list **hoàn chỉnh, chạy thật, tự lưu dữ liệu** - không viết tay một dòng code nào, nhưng (nếu làm đúng theo tinh thần "hiểu để sửa") bạn hiểu đại khái từng phần đang làm gì, vì bạn đã yêu cầu từng bước nhỏ và kiểm tra kỹ mỗi bước.

**Thử thách thêm (tự làm, không có hướng dẫn sẵn):** thử tự mô tả yêu cầu thêm một tính năng mới, ví dụ "phân loại việc theo mức ưu tiên" hoặc "cho phép kéo-thả để sắp xếp lại thứ tự". Đây là cách luyện tập tốt nhất - áp dụng lại đúng quy trình vừa học.

## Bước tiếp theo

Có sản phẩm đầu tiên rồi, giờ học cách đọc hiểu sâu hơn những gì AI vừa viết cho bạn: [Đọc hiểu code AI viết](04-doc-hieu-code-ai-viet.md)
