# Prompt, ngữ cảnh và AGENTS.md cho Codex


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người thấy Codex “đoán sai dự án” hoặc lặp lại cùng một câu hỏi ở nhiều phiên. Học xong bạn sẽ biết chia thông tin thành đúng file, viết `AGENTS.md` ngắn và giao task có bằng chứng tái hiện.

## Agent cần bối cảnh nào?

Codex cần biết mục tiêu, cấu trúc liên quan, quy ước, lệnh kiểm tra và điều không được làm. Không cần dán toàn bộ repo vào prompt. Hãy chỉ file, dòng, đường dẫn hoặc lỗi thực tế liên quan.

## Bốn file, bốn vai trò

| File | Trả lời câu hỏi |
|---|---|
| `spec.md` | Sản phẩm phải làm gì? |
| `backlog.md` | Việc nào làm trước, việc nào sau? |
| `AGENTS.md` | Agent phải tuân thủ quy ước nào? |
| `CLAUDE.md` | Quy tắc dành riêng cho Claude Code (nếu dự án còn dùng) |

`AGENTS.md` nên ghi stack, lệnh test, quy ước đặt tên, khu vực nhạy cảm và điều cấm. Quy tắc đặt ở thư mục con chỉ áp dụng cho phạm vi đó. Đừng chép cùng một nội dung vào bốn file; khi sửa một quy tắc sẽ rất dễ lệch.

## Prompt sửa bug có thể tái hiện

```text
Bug: bấm “Lưu” hai lần tạo hai đơn hàng.
Cách tái hiện: mở /orders, nhập cùng mã KH, bấm nút hai lần trong 1 giây.
Mong đợi: chỉ tạo một đơn và nút hiển thị trạng thái đang lưu.
Phạm vi: route tạo đơn và test liên quan; không đổi schema.
Kiểm tra: thêm test chống gửi trùng rồi chạy test đó.
```

## Bài tập

Tạo `AGENTS.md` 10-15 dòng cho dự án quản lý đơn hàng, sau đó giao Codex một task không nêu lại stack. Kiểm tra xem agent có đọc đúng lệnh test và tránh thư mục dữ liệu mẫu không.

## Checklist đạt bài

- [ ] Biết thông tin nào đặt vào spec, backlog và AGENTS.
- [ ] Prompt có bước tái hiện và tiêu chí đạt.
- [ ] Không dán cả repo khi chỉ cần vài file.
- [ ] `AGENTS.md` ngắn, cụ thể và có phạm vi.
- [ ] Biết kiểm tra các file hướng dẫn trước khi tin agent.

## Bước tiếp theo

Ngữ cảnh đã gọn, giờ đi qua vòng sửa–test–review để thay đổi không trôi ngoài ý muốn: [Sửa code, chạy test và review →](13-codex-sua-code-test-va-review.md)
