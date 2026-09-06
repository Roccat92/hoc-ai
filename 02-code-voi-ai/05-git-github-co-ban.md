# Git, GitHub cơ bản: lưu code, đẩy lên GitHub, không sợ mất

Bài này dành cho người đã có sản phẩm đầu tiên chạy được và **sợ lỡ làm hỏng gì đó thì mất hết công sức**. Học xong bạn sẽ biết cách lưu lại lịch sử thay đổi code, tự tin quay lại phiên bản trước nếu làm hỏng, và đẩy dự án lên GitHub để không bao giờ mất dữ liệu dù máy tính có hỏng. Đây cũng là lúc bạn làm quen với khái niệm "quản lý phiên bản" (version control) - thứ lập trình viên nào cũng dùng hàng ngày.

## Git là gì, vì sao cần?

Git là công cụ ghi lại **lịch sử từng thay đổi** của code theo thời gian, như một chuỗi các "điểm lưu" (gọi là commit) bạn có thể quay lại bất cứ lúc nào. GitHub là nơi lưu trữ các dự án Git đó **trên internet**, kèm tính năng chia sẻ, cộng tác.

Hai lý do quan trọng nhất bạn cần Git ngay từ khi mới bắt đầu:
1. **An toàn:** nếu một yêu cầu bạn đưa cho AI làm hỏng thứ đang chạy tốt, bạn có thể quay lại đúng phiên bản trước đó - không phải làm lại từ đầu.
2. **Không mất dữ liệu:** đẩy code lên GitHub nghĩa là dù máy tính bạn có hỏng/mất, code vẫn còn nguyên trên internet.

Git đã được cài ở [bài cài môi trường](../01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md) - kiểm tra lại bằng `git --version` nếu cần.

## Khởi tạo Git cho dự án

Vào thư mục dự án (ví dụ thư mục `danh-sach-cong-viec` từ bài trước), gõ:

```bash
git init
```

- Lệnh này biến thư mục hiện tại thành một "kho Git" (repository) - từ giờ Git sẽ theo dõi mọi thay đổi trong thư mục này.

Kiểm tra trạng thái các file:
```bash
git status
```
- Hiện danh sách file mới/đã sửa mà Git đang thấy nhưng chưa được "lưu" (commit).

Lưu lại một điểm mốc (commit):
```bash
git add .
git commit -m "Tạo trang danh sách công việc ban đầu"
```
- `git add .`: đánh dấu **tất cả** file đã thay đổi để chuẩn bị lưu (dấu chấm nghĩa là "toàn bộ thư mục hiện tại").
- `git commit -m "..."`: tạo một điểm lưu chính thức, kèm mô tả ngắn gọn bạn vừa làm gì. Viết mô tả rõ ràng - bạn sẽ cảm ơn bản thân sau này khi cần tìm lại.

**Thói quen tốt:** commit sau mỗi lần hoàn thành một tính năng nhỏ (đúng tinh thần "làm từng bước nhỏ" đã học) - không cần đợi xong cả dự án mới commit một lần.

## Tạo tài khoản GitHub và đẩy code lên

1. Vào [github.com](https://github.com), đăng ký tài khoản miễn phí (chỉ cần email).
2. Trên GitHub, bấm nút **"New"** (hoặc dấu `+` góc trên phải → "New repository") để tạo một repo mới. Đặt tên (ví dụ `danh-sach-cong-viec`), để chế độ Public (công khai) hoặc Private (riêng tư) tùy bạn, **không tick** "Add a README file" nếu bạn đã có code sẵn ở máy (tránh xung đột).
3. GitHub sẽ hiện ra vài dòng lệnh gợi ý - thường có dạng:

```bash
git remote add origin https://github.com/ten-cua-ban/danh-sach-cong-viec.git
git branch -M main
git push -u origin main
```

- `git remote add origin ...`: gắn địa chỉ repo trên GitHub vào dự án ở máy bạn, đặt tên tắt là "origin".
- `git branch -M main`: đảm bảo nhánh chính được đặt tên là "main" (chuẩn phổ biến hiện nay).
- `git push -u origin main`: đẩy toàn bộ commit từ máy bạn lên GitHub.

Sau bước này, tải lại trang GitHub - bạn sẽ thấy code của mình đã nằm trên đó.

**Từ lần sau**, mỗi khi có thay đổi mới muốn lưu lên GitHub, chỉ cần lặp lại:
```bash
git add .
git commit -m "Mô tả thay đổi lần này"
git push
```

## Quay lại phiên bản trước khi làm hỏng gì đó

Xem lịch sử các commit:
```bash
git log --oneline
```
- Hiện danh sách các điểm lưu, mỗi dòng có một mã ngắn (ví dụ `a1b2c3d`) và mô tả đi kèm.

**Nếu muốn xem lại (không thay đổi gì) một phiên bản cũ** để so sánh:
```bash
git checkout a1b2c3d
```
- Thay `a1b2c3d` bằng mã commit thật bạn muốn xem. Sau khi xem xong, quay lại phiên bản mới nhất bằng `git checkout main`.

**Nếu muốn huỷ hẳn các thay đổi gần nhất, quay hẳn về một phiên bản cũ** (lệnh này ảnh hưởng thật, dùng cẩn thận):
```bash
git reset --hard a1b2c3d
```
- Đây là lệnh **có thể xóa mất thay đổi chưa lưu** - chỉ dùng khi chắc chắn muốn bỏ hẳn mọi thứ sau điểm mốc đó. Nếu không chắc, hỏi Claude Code trước: "tôi muốn quay lại commit [mã commit] nhưng không chắc lệnh nào an toàn, tư vấn giúp."

## Nhờ chính Claude Code làm Git thay bạn

Claude Code có thể tự chạy lệnh Git nếu bạn yêu cầu bằng lời, ví dụ: "Lưu lại các thay đổi vừa rồi vào Git với message mô tả phù hợp" - nó sẽ tự chạy `git add`, `git commit` với nội dung mô tả hợp lý. Vẫn nên **hiểu các lệnh cơ bản ở trên** để bạn tự tin kiểm tra lại nó đã làm đúng ý chưa, đặc biệt là các lệnh có thể gây mất dữ liệu như `reset --hard`.

## .gitignore - tránh đẩy nhầm file nhạy cảm lên GitHub

Một số file **không nên** đẩy lên GitHub - đặc biệt là file chứa API key, mật khẩu (thường nằm trong file `.env`), hoặc các thư mục thư viện tự động tải về (như `node_modules`). Tạo một file tên `.gitignore` ở thư mục gốc dự án, liệt kê những gì cần bỏ qua:

```
.env
node_modules/
```

Yêu cầu Claude Code tạo file này giúp bạn cũng được: "Tạo file .gitignore phù hợp cho dự án này." **Đây là bước quan trọng để bảo vệ thông tin nhạy cảm** - một khi API key đã bị đẩy lên GitHub công khai, coi như nó đã lộ, cần đổi key mới ngay cả khi xóa lại sau đó.

**Một câu để nhớ:** commit thường xuyên là nút "lưu game" của bạn - không có nó, mọi thử nghiệm với AI đều mang rủi ro mất trắng.

## Bước tiếp theo

Trước khi đưa sản phẩm lên internet thật, một việc đáng làm trước: sửa cho giao diện hết "nhìn như AI code": [Chữa bệnh "UI phèn"](06-tri-benh-ui-phen.md)
