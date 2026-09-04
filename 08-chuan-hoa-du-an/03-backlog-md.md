# Backlog.md: chia việc thành task nhỏ, làm dần qua nhiều phiên

Bài này dành cho người đã có [spec.md](02-viet-spec-md.md) và giờ cần biến nó thành các việc làm được từng chút một, thay vì nhờ AI "làm hết một lần" (rất dễ loạn, như đã nói ở [bài 1](01-tai-sao-can-spec.md)). Học xong bạn sẽ có một file backlog.md theo dõi được: đã làm gì, đang làm gì, còn gì phải làm.

## backlog.md là gì?

`backlog.md` là danh sách các **task nhỏ**, mỗi task là một việc cụ thể, làm được trong một phiên (hoặc ít hơn), đánh dấu `[ ]` khi chưa làm và `[x]` khi đã xong. Đặt cùng thư mục gốc với `spec.md`.

Khác với spec.md (mô tả **cái gì** cần build), backlog.md trả lời câu hỏi **làm theo thứ tự nào**, và giúp bạn (và AI) luôn biết chính xác đang đứng ở đâu trong dự án.

## Template

```markdown
# Backlog: [Tên dự án]

## Đang làm
- [ ] [Task đang làm dở, nếu có]

## Chưa làm
- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]

## Đã xong
- [x] [Task đã hoàn thành]
```

## Ví dụ: backlog cho dự án quản lý đơn hàng (tiếp theo spec ở bài trước)

```markdown
# Backlog: Quản lý đơn hàng Shop ABC

## Đang làm
- [ ] Trang danh sách đơn hàng - hiển thị bảng, chưa có lọc

## Chưa làm
- [ ] Form thêm đơn hàng mới
- [ ] Chức năng lọc đơn hàng theo trạng thái
- [ ] Chức năng tìm kiếm theo tên/SĐT khách
- [ ] Trang chi tiết đơn hàng - xem và đổi trạng thái
- [ ] Kết nối database SQLite, lưu dữ liệu thật (hiện đang dùng dữ liệu mẫu)
- [ ] Style lại giao diện cho gọn gàng, dùng được trên điện thoại
- [ ] Deploy lên VPS

## Đã xong
- [x] Khởi tạo dự án React, cài đặt cấu trúc thư mục cơ bản
- [x] Trang danh sách đơn hàng - layout tĩnh với dữ liệu mẫu
```

## Quy tắc quan trọng nhất: mỗi phiên chỉ làm 1-2 task

Đừng mở Claude Code lên và nói "làm hết backlog đi". Mỗi phiên làm việc, **chọn đúng 1-2 task**, yêu cầu AI làm xong, kiểm tra kỹ (đúng tinh thần [làm từng bước nhỏ](../01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai.md) đã học), rồi mới tick `[x]` và chuyển sang task tiếp theo.

Prompt mẫu để bắt đầu một phiên đúng cách:

```
Đọc file spec.md và backlog.md trước. Task tôi muốn làm hôm nay là:
"Form thêm đơn hàng mới". Chỉ làm đúng task này, không tự làm thêm
task khác trong backlog.
```

Câu "chỉ làm đúng task này, không tự làm thêm task khác" quan trọng - nếu không nhắc, AI có xu hướng "nhiệt tình" làm luôn vài task gần đó, khiến bạn khó kiểm tra kỹ từng phần.

## Task quá lớn thì chia nhỏ tiếp

Quy tắc thực dụng: **task nào ước lượng làm không xong trong một buổi (nửa ngày) thì task đó cần chia nhỏ hơn.**

Ví dụ task "Kết nối database SQLite, lưu dữ liệu thật" ở trên thực ra hơi lớn - chia tiếp:

```markdown
- [ ] Cài đặt SQLite, tạo bảng đơn hàng
- [ ] Nối API thêm đơn hàng với database (thay vì lưu tạm trong bộ nhớ)
- [ ] Nối API danh sách/tìm kiếm với database
- [ ] Nối API đổi trạng thái với database
```

Task càng nhỏ, càng dễ kiểm tra đúng/sai ngay sau khi làm, và càng dễ quay lại đúng chỗ nếu một phiên bị gián đoạn giữa chừng.

## Bước tiếp theo

Đã có spec.md và backlog.md, giờ tìm hiểu file thứ ba - CLAUDE.md - và khi nào cần thêm công cụ hỗ trợ AI nhớ ngữ cảnh cho dự án lớn: [CLAUDE.md và ngữ cảnh dự án](04-claude-md-va-ngu-canh.md)
