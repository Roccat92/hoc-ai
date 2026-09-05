# Prompt, ngữ cảnh và file hướng dẫn cho coding agent

Bài này dành cho người thấy agent "đoán sai dự án" hoặc lặp lại cùng một câu hỏi ở nhiều phiên - gặp ở cả Codex lẫn Claude Code. Học xong bạn sẽ biết chia thông tin thành đúng file, viết file hướng dẫn ngắn (`AGENTS.md` cho Codex, `CLAUDE.md` cho Claude Code) và giao task có bằng chứng tái hiện.

## Agent cần bối cảnh nào?

Agent cần biết mục tiêu, cấu trúc liên quan, quy ước, lệnh kiểm tra và điều không được làm - dù là Codex hay Claude Code. Không cần dán toàn bộ repo vào prompt. Hãy chỉ file, dòng, đường dẫn hoặc lỗi thực tế liên quan.

## Bốn file, bốn vai trò

| File | Trả lời câu hỏi |
|---|---|
| `spec.md` | Sản phẩm phải làm gì? |
| `backlog.md` | Việc nào làm trước, việc nào sau? |
| `AGENTS.md` | Codex phải tuân thủ quy ước nào? |
| `CLAUDE.md` | Claude Code phải tuân thủ quy ước nào? (xem [bài viết CLAUDE.md](../08-chuan-hoa-du-an/04-claude-md-va-ngu-canh.md)) |

Hai file `AGENTS.md` và `CLAUDE.md` đóng cùng một vai trò cho hai công cụ khác nhau - nội dung nên gần giống nhau (cùng stack, cùng lệnh test, cùng khu vực nhạy cảm), chỉ khác tên file. Nếu dự án dùng cả hai công cụ, viết một bản đầy đủ rồi để bản kia trỏ sang ("xem AGENTS.md") thay vì chép hai lần dễ lệch.

`AGENTS.md` nên ghi stack, lệnh test, quy ước đặt tên, khu vực nhạy cảm và điều cấm. Quy tắc đặt ở thư mục con chỉ áp dụng cho phạm vi đó. Đừng chép cùng một nội dung vào bốn file; khi sửa một quy tắc sẽ rất dễ lệch.

## Một file hướng dẫn tốt trông thế nào

Đặt file này ở **thư mục gốc dự án**; agent tự đọc mỗi phiên (`AGENTS.md` với Codex, `CLAUDE.md` với Claude Code). Nội dung cốt lõi luôn có bốn phần: stack đang dùng, lệnh kiểm tra (cài/test/build), quy ước đặt tên và định dạng dữ liệu, khu vực nhạy cảm cần hỏi trước khi đụng. Để ngắn và cụ thể - một file 10-20 dòng agent đọc hết còn hơn 200 dòng nó bỏ qua nửa chừng. Ví dụ đầy đủ cho một dự án thật: [AGENTS.md ở phụ lục Codex](../phu-luc-cong-cu/codex/03-cau-hinh-nang-cao.md#agentsmd-đầy-đủ).

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
