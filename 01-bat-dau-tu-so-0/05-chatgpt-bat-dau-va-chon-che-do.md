# ChatGPT: bắt đầu đúng chỗ, đúng chế độ, đúng model

Bài này dành cho người mới mở ChatGPT và chưa biết nên dùng Chat, Work hay Codex. Học xong bạn sẽ chọn được nơi làm việc phù hợp cho từng loại yêu cầu, biết khi nào nên mở cuộc trò chuyện mới và không còn mặc định dùng model mạnh nhất cho mọi việc.

## Ba kiểu việc, ba nơi bắt đầu

| Bạn muốn | Nên bắt đầu ở | Kết quả mong đợi |
|---|---|---|
| Hỏi, học, brainstorm, giải thích | **Chat** | Câu trả lời hoặc hướng suy nghĩ |
| Đưa file và mục tiêu để tạo báo cáo, bảng tính, tài liệu | **Work** | Một deliverable có thể xem và sửa tiếp |
| Đọc/sửa code, chạy test, review thay đổi | **Codex** | Thay đổi trong project và bằng chứng kiểm tra |

Đây là quy tắc định hướng, không phải ranh giới tuyệt đối. Bạn có thể dùng Chat để chuẩn bị ý tưởng rồi chuyển sang Work để tạo tài liệu, hoặc chuyển sang Codex khi ý tưởng đã đủ rõ để build.

## Chọn model theo công việc

Đừng hỏi “model nào mạnh nhất?” trước khi hỏi “sai ở việc này có đắt không?”. Việc lặp lại, phạm vi hẹp thì ưu tiên model nhỏ/nhanh; việc phân tích, code hoặc nhiều bước thì dùng model cân bằng; quyết định khó hoặc dữ liệu quan trọng thì dùng model suy luận mạnh rồi kiểm tra bằng nguồn hoặc test.

Model, tên gói và quyền truy cập thay đổi theo thời gian. Hãy xem [OpenAI Docs](https://learn.chatgpt.com/) và menu model trong tài khoản thay vì chép tên từ ảnh chụp cũ.

## Ba mức chi phí, đừng mặc định mua gói cao

ChatGPT có nhiều gói: **Free** (0đ), **Go**, **Plus**, và **Pro** - trong đó Pro lại chia hai mức *5x* và *20x*, đúng kiểu bẫy đặt tên bạn sẽ gặp lại ở [Claude](../02-code-voi-ai/08-chi-phi-cac-goi-claude.md). Mốc hợp lý để bắt đầu làm việc thật thường là **Plus** (20 USD <Vnd usd="20" />/tháng). Đừng vội mua Pro chỉ vì sợ thiếu - dùng gói thấp trước, khi thường xuyên chạm trần mới nâng.

Số tiền cụ thể từng gói, hạn mức và cách chọn có bảng đầy đủ (tự cập nhật theo tỉ giá) ở [chi phí các gói Codex/ChatGPT](../02-code-voi-ai/09-chi-phi-cac-goi-codex.md). Giá đổi khá nhanh - luôn mở lại [trang giá chính thức](https://learn.chatgpt.com/docs/pricing) trước khi trả tiền.

## Cách mở một cuộc trò chuyện sạch

Mở chat mới khi bạn đổi mục tiêu, khách hàng, dự án hoặc lịch sử cũ bắt đầu làm câu trả lời lệch đi. Ở tin nhắn đầu tiên, nói đủ bốn điều:

```text
Mục tiêu: tôi cần một checklist chuẩn bị landing page cho dịch vụ dọn nhà.
Đối tượng: người chưa biết marketing.
Đầu ra: bảng 10 mục, mỗi mục có ví dụ và tiêu chí hoàn thành.
Giới hạn: không đề xuất quảng cáo trả phí.
```

Một chat tốt không phải chat dài nhất, mà là chat giữ được đúng bối cảnh.

## Bài tập 10 phút

Chọn ba việc bạn thật sự làm trong tuần này: học một khái niệm, phân tích một file, sửa một bug. Ghi nơi bạn sẽ bắt đầu và lý do. Nếu chọn sai, chuyển sang nơi khác và ghi nhận điều gì thay đổi trong đầu ra.

## Checklist đạt bài

- [ ] Phân biệt được Chat, Work và Codex.
- [ ] Chọn model dựa trên độ khó và rủi ro.
- [ ] Biết khi nào mở chat mới.
- [ ] Mỗi yêu cầu có mục tiêu, đối tượng, đầu ra và giới hạn.
- [ ] Biết kiểm tra lại tính năng hiện có trong tài khoản.

## Bước tiếp theo

Biết chọn đúng nơi rồi, giờ học cách viết yêu cầu cho ra kết quả ổn định: [Prompt thực dụng và quy trình lặp →](06-chatgpt-prompt-thuc-dung.md)
