# Subagent, làm song song và tự động hóa với Codex


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người có nhiều task độc lập hoặc muốn chạy Codex trong script/CI. Học xong bạn sẽ biết khi nào tách agent, khi nào giữ một luồng, và cách đặt điểm dừng trước hành động không hoàn tác.

## Chỉ song song khi thật sự độc lập

Có thể tách: một agent đọc tài liệu, một agent viết test, một agent rà thay đổi. Không nên tách hai agent cùng sửa một file hoặc cùng quyết định schema. Mỗi luồng phải có phạm vi, đầu ra và người chịu trách nhiệm review.

## Tự động hóa không có nghĩa là bỏ kiểm soát

`codex exec` phù hợp cho workflow lặp lại, script và CI. Trong chế độ không tương tác, prompt phải quy định rõ input, output, lệnh được phép và điều kiện thất bại. Deploy, gửi email, xóa dữ liệu hoặc merge production cần bước phê duyệt riêng.

## Mẫu hợp đồng cho job tự động

```text
Input: danh sách file Markdown đã thay đổi.
Output: báo cáo lỗi theo JSON, không sửa file.
Được phép: đọc file và chạy một lệnh kiểm tra đã chỉ định.
Không được phép: truy cập mạng, commit, deploy hoặc gửi dữ liệu.
Nếu thiếu file hoặc lệnh lỗi: trả trạng thái blocked và log ngắn.
```

## Bài tập

Tạo hai task độc lập: một rà link Markdown và một rà tiêu đề. Cho chạy song song trên bản sao, sau đó tự hợp nhất kết quả; không cho agent tự commit.

## Checklist đạt bài

- [ ] Chia được việc độc lập và việc phụ thuộc.
- [ ] Mỗi agent có phạm vi riêng.
- [ ] Job tự động có input/output và điều kiện lỗi.
- [ ] Không tự động hóa side effect nguy hiểm.
- [ ] Có bước review trước merge/deploy.

## Bước tiếp theo

Muốn dùng Codex bền vững, hãy học cách chẩn đoán lỗi thay vì thử lệnh ngẫu nhiên: [Các lỗi Codex thường gặp →](17-codex-xu-ly-loi.md)
