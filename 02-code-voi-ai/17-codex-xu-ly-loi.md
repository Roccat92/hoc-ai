# Xử lý lỗi thường gặp khi dùng Codex


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người bị kẹt vì Codex không thấy file, test không chạy hoặc agent sửa quá rộng. Học xong bạn sẽ phân loại lỗi trước khi sửa và biết cách bàn giao trạng thái cho phiên mới.

## Bốn nhóm lỗi

| Nhóm | Dấu hiệu | Việc kiểm tra đầu tiên |
|---|---|---|
| **Môi trường** | Thiếu Node/Python/package, sai phiên bản | Xem version và lệnh cài |
| **Quyền/kết nối** | Lệnh bị chặn, mạng không có, đăng nhập hết hạn | Xem permission, trạng thái tài khoản |
| **Ngữ cảnh** | Không thấy file, hiểu sai quy ước, lặp lại | Kiểm tra thư mục, `AGENTS.md`, task mới |
| **Code** | Test đỏ, lỗi runtime, kết quả sai | Tái hiện tối thiểu và đọc log |

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

## Checklist đạt bài

- [ ] Phân biệt được môi trường, quyền, context và code.
- [ ] Biết dừng agent và lấy bản tóm tắt trạng thái.
- [ ] Có bước tái hiện tối thiểu.
- [ ] Handoff có mục tiêu, đã làm, chưa làm, lệnh cuối.
- [ ] Không xóa dữ liệu để “thử cho nhanh”.

## Bước tiếp theo

Đã biết xử lý phiên Codex, học tiếp quy trình debug, DevTools và Git để tự kiểm chứng thay đổi: [Debug, DevTools và Git nâng cao vừa đủ →](18-debug-devtools-va-git-nang-cao.md)
