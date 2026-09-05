# Task đầu tiên và quyền hạn an toàn khi dùng coding agent

Bài này dành cho người mới sợ AI tự ý sửa hoặc chạy nhầm lệnh - dùng Codex hay Claude Code đều gặp đúng nỗi lo này. Học xong bạn sẽ viết task có phạm vi rõ, đọc và hiểu một yêu cầu cấp quyền thật, và biết khi nào phải dừng để xác nhận.

## Một task tốt có bốn phần

1. **Mục tiêu:** thay đổi nhìn thấy được là gì?
2. **Phạm vi:** file/thư mục nào được phép đụng tới?
3. **Tiêu chí đạt:** hành vi nào phải đúng?
4. **Kiểm tra:** lệnh hoặc thao tác nào phải chạy trước khi kết thúc?

Ví dụ áp dụng cho dự án [landing page Nhà Sạch Xinh](../09-du-an-thuc-hanh/du-an-01-landing-page/spec.md):

```text
Trong trang chủ, đổi tiêu đề thành "Nhà Sạch Xinh".
Chỉ sửa file giao diện, không đổi dependency hoặc dữ liệu.
Tiêu chí: tiêu đề hiển thị đúng ở desktop và màn hình rộng 360px.
Sau khi sửa, chạy build và báo lại file đã thay đổi.
```

So với chỉ gõ "sửa cái tiêu đề giúp mình", bốn phần này khiến Codex không phải đoán bạn muốn sửa ở đâu, chạm tới đâu là dừng, và bằng gì để biết đã xong.

## Quyền hạn không phải chi tiết phụ

Quyền hạn quyết định Codex có được sửa file, chạy lệnh, truy cập mạng hay chạm dữ liệu ngoài project hay không. [Tài liệu chính thức về permission modes](https://learn.chatgpt.com/docs/permission-modes) khuyến nghị bắt đầu bằng chế độ hỏi phê duyệt cho phần lớn công việc - tên gọi chính xác của từng chế độ thay đổi theo phiên bản, luôn kiểm tra tài liệu đó thay vì nhớ tên cũ.

Khi được hỏi phê duyệt, màn hình sẽ hiện đại khái như sau (giao diện thật có thể khác chút theo phiên bản, nhưng luôn có đủ ba phần này):

```text
Codex muốn chạy lệnh sau trong thư mục dự án:

  rm -rf dist/

Lệnh này sẽ: xóa toàn bộ thư mục dist/ (bản build cũ).
Cho phép chạy? [y/n]
```

Trước khi gõ `y`, luôn nhìn đúng ba thứ trong hộp thoại này: **lệnh đang chạy** (đọc hết, không lướt), **thư mục/phạm vi tác động** (có đúng trong project không, hay đang chạm ra ngoài), và **side effect** (lệnh này có thể gây hậu quả gì nếu sai). Đặc biệt cẩn thận với các lệnh: `rm` (xóa file/thư mục), bất cứ gì đụng tới database hoặc migration, thay đổi secret/biến môi trường, deploy lên production, gửi request ra ngoài project (gọi API thật, không phải API test), hoặc cài package lạ chưa từng nghe tên.

**Ở Claude Code:** luồng giống hệt - mỗi lệnh có khả năng gây side effect (chạy `bash`, sửa file ngoài phạm vi đang làm...) sẽ hiện hộp thoại xin phép trước khi chạy, trừ khi bạn chủ động bật chế độ tự động chấp nhận cho phiên đó. Ba thứ cần nhìn trước khi bấm "Yes" y hệt như trên: lệnh, phạm vi, side effect.

## Luồng an toàn từng bước

1. Đọc task, kiểm tra `git status` sạch (đã commit hoặc không có gì dang dở).
2. Cho Codex khảo sát trước, chưa sửa nếu bài toán chưa rõ - dùng task chỉ đọc như bài trước.
3. Duyệt từng lệnh có side effect theo đúng ba tiêu chí ở trên, không tự động bấm `y` hàng loạt.
4. Yêu cầu Codex chạy test/build liên quan sau khi sửa.
5. Xem diff (`git diff`), tự mở trình duyệt hoặc kiểm tra output thật - không tin lời Codex nói "đã sửa xong" mà chưa tự mắt thấy.
6. Commit khi thay đổi đạt đủ tiêu chí đã đặt ra ở bước viết task.

## Bài tập

Giao Codex task đổi tiêu đề landing page theo đúng mẫu bốn phần ở trên. Khi Codex đề xuất chạy lệnh build, đọc kỹ hộp thoại phê duyệt trước khi đồng ý. Sau đó thử một yêu cầu cố tình lệch phạm vi (ví dụ: "tiện thể dọn luôn code cho gọn") - từ chối, giải thích lý do, rồi yêu cầu Codex tóm tắt lại đúng những gì đã thay đổi so với task ban đầu.

## Checklist đạt bài

- [ ] Task có đủ mục tiêu, phạm vi, tiêu chí và kiểm tra.
- [ ] Đọc hết nội dung một hộp thoại phê duyệt trước khi đồng ý, không bấm `y` theo phản xạ.
- [ ] Nhận diện được ít nhất 3 loại lệnh có side effect cần cẩn thận.
- [ ] Có diff xem được (`git diff`) trước khi commit.
- [ ] Biết từ chối và thu nhỏ phạm vi khi agent đi lệch task.

## Bước tiếp theo

Quyền đã rõ, giờ dạy Codex bối cảnh dự án mà không nhồi cả lịch sử vào prompt: [Prompt, ngữ cảnh và AGENTS.md →](12-codex-prompt-ngu-canh-va-agents-md.md)
