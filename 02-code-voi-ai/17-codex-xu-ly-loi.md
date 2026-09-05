# Xử lý lỗi thường gặp khi dùng coding agent

Bài này dành cho người bị kẹt vì agent không thấy file, test không chạy hoặc agent sửa quá rộng - đúng bốn nhóm lỗi này lặp lại y hệt dù dùng Codex, Claude Code hay công cụ nào khác. Học xong bạn sẽ phân loại lỗi trước khi sửa và biết cách bàn giao trạng thái cho phiên mới.

## Bốn nhóm lỗi

| Nhóm | Dấu hiệu | Việc kiểm tra đầu tiên |
|---|---|---|
| **Môi trường** | Thiếu Node/Python/package, sai phiên bản | Xem version và lệnh cài |
| **Quyền/kết nối** | Lệnh bị chặn, mạng không có, đăng nhập hết hạn | Xem permission, trạng thái tài khoản |
| **Ngữ cảnh** | Không thấy file, hiểu sai quy ước, lặp lại | Kiểm tra thư mục, `AGENTS.md`, task mới |
| **Code** | Test đỏ, lỗi runtime, kết quả sai | Tái hiện tối thiểu và đọc log |

## Lệnh kiểm tra nhanh cho từng nhóm

Trước khi nhờ agent "sửa hộ", tự chạy vài lệnh để biết lỗi thuộc nhóm nào:

```bash
node -v            # kiểm tra Node đã cài và đúng phiên bản chưa (nhóm Môi trường)
npm -v             # npm có sẵn không
codex --version    # (hoặc claude --version) - agent đã cài đúng chưa (nhóm Quyền/kết nối, Môi trường)
git status         # đang ở nhánh nào, có gì dang dở (nhóm Ngữ cảnh)
npm test           # tái hiện test đỏ để đọc lỗi thật (nhóm Code)
```
- Mỗi lệnh chỉ đọc trạng thái, không sửa gì - chạy thoải mái.
- Nếu `node -v` báo "command not found", lỗi là Môi trường (chưa cài), không phải Codex "dốt".
- Nếu `git status` cho thấy đang ở nhánh lạ hoặc nhiều file dang dở, phần lớn "agent đọc sai" thực ra là do ngữ cảnh git chưa sạch.

## Khi agent đi lệch

Nói rõ: “Dừng lại. Chưa sửa thêm. Tóm tắt file đã đọc, file đã đổi, lệnh đã chạy và bước tiếp theo đề xuất.” Sau đó xem diff. Nếu lịch sử quá dài, mở phiên mới và gửi một bản handoff ngắn thay vì mang toàn bộ cuộc trò chuyện theo.

## Mẫu handoff

```text
Mục tiêu: sửa lỗi gửi trùng form.
Đã làm: thêm debounce ở src/form.ts, test hiện đang đỏ ở case double-click.
Chưa làm: chưa đổi API, chưa commit.
Lệnh cuối: npm test -- form.test.ts (1 failed).
Tiếp theo: đọc assertion lỗi, sửa tối thiểu và chạy lại test.
```

## Bài tập

Cố ý tạo một lỗi mỗi nhóm rồi tự phân loại: đổi tên một file để Codex "không thấy" (Ngữ cảnh), chạy một dự án thiếu `npm install` (Môi trường), sửa hỏng một hàm cho test đỏ (Code). Với mỗi lỗi, chạy đúng lệnh kiểm tra ở trên và viết một câu handoff theo mẫu dưới trước khi nhờ agent sửa.

## Checklist đạt bài

- [ ] Phân biệt được môi trường, quyền, context và code.
- [ ] Biết dừng agent và lấy bản tóm tắt trạng thái.
- [ ] Có bước tái hiện tối thiểu.
- [ ] Handoff có mục tiêu, đã làm, chưa làm, lệnh cuối.
- [ ] Không xóa dữ liệu để “thử cho nhanh”.

## Bước tiếp theo

Đã biết xử lý phiên Codex, học tiếp quy trình debug, DevTools và Git để tự kiểm chứng thay đổi: [Debug, DevTools và Git nâng cao vừa đủ →](18-debug-devtools-va-git-nang-cao.md)
