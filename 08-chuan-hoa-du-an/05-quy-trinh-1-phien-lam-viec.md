# Quy trình một phiên làm việc chuẩn

Bài cuối cùng của phần chuẩn hóa dự án, dành cho người đã có đủ ba file [spec.md](02-viet-spec-md.md), [backlog.md](03-backlog-md.md), [CLAUDE.md](04-claude-md-va-ngu-canh.md) và giờ cần một checklist để mỗi lần ngồi vào code đều theo đúng nhịp, không bỏ sót bước nào. Học xong bạn sẽ có một thói quen lặp lại được cho mọi phiên làm việc với AI, từ phiên đầu tiên tới phiên thứ một trăm.

## Checklist một phiên chuẩn

```
1. Mở backlog.md — xem đang ở đâu, còn gì chưa làm
2. Chọn 1-2 task cụ thể cho phiên này (đừng chọn quá nhiều)
3. Yêu cầu Claude Code đọc spec.md (và CLAUDE.md nếu chưa tự đọc) trước khi làm
4. Mô tả rõ task đang chọn, nhắc "chỉ làm đúng task này"
5. Để AI làm, kiểm tra kỹ kết quả (chạy thử thật, không chỉ đọc code)
6. Nếu đúng: commit ngay — đừng đợi làm xong nhiều task mới commit một lần
7. Tick [x] task đó trong backlog.md
8. Còn thời gian, quay lại bước 2 với task tiếp theo. Hết thời gian, dừng —
   phiên sau đọc lại backlog.md sẽ biết chính xác đang ở đâu
```

## Ví dụ một phiên thật (tiếp nối dự án quản lý đơn hàng từ các bài trước)

**Bước 1-2:** Mở `backlog.md`, thấy task tiếp theo trong mục "Chưa làm" là "Form thêm đơn hàng mới".

**Bước 3-4:** Gõ trong Claude Code:
```
Đọc file spec.md và CLAUDE.md trước. Task hôm nay: "Form thêm đơn hàng mới"
trong backlog.md — làm đúng task này, chưa cần làm task khác.
```

**Bước 5:** AI tạo form, bạn mở trình duyệt, điền thử dữ liệu, bấm submit — kiểm tra dữ liệu có vào đúng chỗ không, có validate (chặn bỏ trống ô bắt buộc) chưa.

**Bước 6:** Đúng rồi, commit ngay:
```bash
git add .
git commit -m "Thêm form nhập đơn hàng mới"
```

**Bước 7:** Sửa `backlog.md`, chuyển dòng "Form thêm đơn hàng mới" từ mục "Chưa làm" xuống mục "Đã xong", đánh dấu `[x]`.

**Bước 8:** Còn thời gian, chọn tiếp task "Chức năng lọc đơn hàng theo trạng thái" và lặp lại từ bước 3.

## Vì sao commit sau MỖI task, không phải cuối buổi

Đây là quy tắc quan trọng nhất trong quy trình này. Nhắc lại từ [Git/GitHub cơ bản](../02-code-voi-ai/05-git-github-co-ban.md): mỗi commit là một "điểm lưu" có thể quay lại. Nếu bạn làm liền 5 task rồi mới commit một lần, và task thứ 4 vô tình làm hỏng thứ gì đó — bạn phải dò lại cả 5 task để tìm lỗi. Nếu commit sau từng task, lỡ có hỏng, bạn biết chính xác nó nằm ở đâu, và có thể quay lại đúng điểm task cuối cùng còn chạy tốt (`git log --oneline`, rồi `git checkout` như đã học).

## Khi phiên bị gián đoạn giữa chừng

Chuyện thường gặp: đang làm dở một task thì phải dừng (hết giờ, mất mạng, buồn ngủ...). Cách xử lý:
- Nếu code đang chạy được (dù chưa hoàn chỉnh 100% ý đồ), vẫn **commit lại** với message rõ ràng kiểu "WIP: form thêm đơn hàng, còn thiếu validate" (WIP = Work In Progress, đang làm dở).
- Cập nhật `backlog.md`, để task đó ở mục "Đang làm" thay vì "Chưa làm", ghi chú ngắn đã làm tới đâu.
- Phiên sau, đọc lại backlog.md sẽ biết ngay cần tiếp tục từ đâu, không cần nhớ trong đầu.

## Tổng kết phần 8

Bốn bài trong phần này ([1](01-tai-sao-can-spec.md), [2](02-viet-spec-md.md), [3](03-backlog-md.md), [4](04-claude-md-va-ngu-canh.md)) cùng với quy trình ở bài này tạo thành một bộ khung đầy đủ để làm việc với AI có kỷ luật trên các dự án lớn hơn dự án đầu tiên ở phần 2. Đây không phải quy trình bắt buộc cứng nhắc — hãy điều chỉnh cho phù hợp với cách làm việc của riêng bạn, miễn giữ đúng tinh thần cốt lõi: **một nguồn sự thật cố định (spec.md), chia nhỏ theo dõi được (backlog.md), quy ước rõ ràng (CLAUDE.md), và commit thường xuyên.**

## Bước tiếp theo

Luyện tập ngay quy trình vừa học với một spec có sẵn, không cần tự nghĩ đề bài: [Dự án thực hành →](../09-du-an-thuc-hanh/)
