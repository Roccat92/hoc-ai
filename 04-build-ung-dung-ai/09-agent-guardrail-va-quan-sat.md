# Agent guardrail, human approval và quan sát production


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người muốn agent làm nhiều bước nhưng không muốn nó tự ý hoàn tiền, xóa dữ liệu hoặc gọi tool vô hạn. Học xong bạn sẽ thiết kế được allowlist tool, giới hạn vòng lặp, điểm duyệt người và dashboard tối thiểu.

## Mọi tool đều cần hợp đồng

Ghi rõ input schema, quyền cần có, side effect, timeout, lỗi và có an toàn khi retry không. Tool đọc dữ liệu nên tách khỏi tool ghi dữ liệu. Đừng đưa một tool “làm mọi thứ” cho agent.

## Ba lớp guardrail

- **Trước tool:** kiểm tra người dùng, input, quyền và ngân sách.
- **Trong vòng lặp:** giới hạn số bước, token, thời gian và số lần retry.
- **Sau tool:** validate kết quả, lọc dữ liệu nhạy cảm và yêu cầu người duyệt cho hành động lớn.

Luôn có đường chuyển cho người thật khi agent không chắc, nguồn mâu thuẫn hoặc hành động không hoàn tác.

## Quan sát cần gì?

Theo dõi tỷ lệ thành công, lỗi tool, latency, token/cost, số lần fallback, câu bị người dùng đánh dấu sai và các prompt injection bị chặn. Gắn request id để nối log model với log ứng dụng nhưng không lưu secret.

## Bài tập

Xây agent thời tiết chỉ dùng tool đọc. Sau đó thêm tool đặt lịch giả nhưng bắt buộc trả bản xem trước và chờ xác nhận. Test timeout, tool trả lỗi và người dùng nhập tham số ngoài schema.

## Checklist đạt bài

- [ ] Tool có schema và allowlist rõ.
- [ ] Có giới hạn vòng lặp, thời gian và chi phí.
- [ ] Hành động lớn có human approval.
- [ ] Có fallback khi model/tool lỗi.
- [ ] Có log metric và cách xem một request end-to-end.

## Bước tiếp theo

Đã có agent có kiểm soát, quay lại [Phần 5: train và fine-tune](../05-train-va-finetune/01-hieu-ve-training.md) chỉ khi eval chứng minh prompt/RAG chưa đủ.
