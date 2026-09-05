# Task đầu tiên và quyền hạn an toàn trong Codex


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người mới sợ AI tự ý sửa hoặc chạy nhầm lệnh. Học xong bạn sẽ viết task có phạm vi rõ, đọc yêu cầu cấp quyền, và biết khi nào phải dừng để xác nhận.

## Một task tốt có bốn phần

1. **Mục tiêu:** thay đổi nhìn thấy được là gì?
2. **Phạm vi:** file/thư mục nào được phép đụng tới?
3. **Tiêu chí đạt:** hành vi nào phải đúng?
4. **Kiểm tra:** lệnh hoặc thao tác nào phải chạy trước khi kết thúc?

Ví dụ:

```text
Trong trang chủ, đổi tiêu đề thành “Nhà Sạch Xinh”.
Chỉ sửa file giao diện, không đổi dependency hoặc dữ liệu.
Tiêu chí: tiêu đề hiển thị đúng ở desktop và màn hình rộng 360px.
Sau khi sửa, chạy build và báo lại file đã thay đổi.
```

## Quyền hạn không phải chi tiết phụ

Quyền hạn quyết định Codex có được sửa file, chạy lệnh, truy cập mạng hay chạm dữ liệu ngoài project. [OpenAI Docs về permission modes](https://learn.chatgpt.com/docs/permission-modes) khuyến nghị bắt đầu bằng chế độ hỏi phê duyệt cho phần lớn công việc.

Trước khi chấp nhận, nhìn ba thứ: lệnh đang chạy, thư mục tác động và side effect. Cẩn thận với `rm`, xóa database, thay secret, deploy, gửi request ngoài hoặc cài package lạ.

## Luồng an toàn

1. Đọc task và kiểm tra trạng thái Git.
2. Cho Codex khảo sát, chưa sửa nếu bài toán chưa rõ.
3. Duyệt từng lệnh có side effect.
4. Yêu cầu test/build liên quan.
5. Xem diff, tự mở màn hình hoặc kiểm tra output.
6. Commit khi thay đổi đạt tiêu chí.

## Bài tập

Giao Codex sửa một dòng văn bản trong dự án landing page. Từ chối một lệnh không liên quan, rồi yêu cầu agent tóm tắt thay đổi. Nếu diff chạm quá nhiều file, dừng và thu nhỏ phạm vi.

## Checklist đạt bài

- [ ] Task có mục tiêu, phạm vi, tiêu chí và kiểm tra.
- [ ] Biết đọc lệnh trước khi phê duyệt.
- [ ] Nhận diện lệnh có side effect.
- [ ] Có diff trước khi commit.
- [ ] Biết dừng task khi agent đi lệch phạm vi.

## Bước tiếp theo

Quyền đã rõ, giờ dạy Codex bối cảnh dự án mà không nhồi cả lịch sử vào prompt: [Prompt, ngữ cảnh và AGENTS.md →](12-codex-prompt-ngu-canh-va-agents-md.md)
