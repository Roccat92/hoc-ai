# Debug, DevTools và Git nâng cao vừa đủ

Bài này dành cho người đã build được app nhưng còn hoảng khi gặp lỗi hoặc merge conflict. Học xong bạn sẽ có một quy trình debug lặp lại được, biết dùng ba tab DevTools quan trọng và hiểu branch/pull request ở mức đủ làm việc an toàn.

## Quy trình debug năm bước

1. **Tái hiện:** ghi URL, thao tác, input và kết quả sai.
2. **Đọc lỗi:** giữ nguyên thông báo, stack trace và mã HTTP.
3. **Thu hẹp:** xác định lỗi ở giao diện, API, database hay môi trường.
4. **Đặt giả thuyết:** chỉ sửa một nguyên nhân có thể kiểm chứng.
5. **Thêm kiểm tra:** giữ lại test hoặc log để lỗi không quay lại.

Đừng xóa dữ liệu, nâng toàn bộ dependency hoặc viết lại app chỉ vì một lỗi chưa hiểu.

## Ba tab DevTools

- **Console:** lỗi JavaScript và log có chủ đích.
- **Network:** request nào thất bại, payload/response gì, mã 401/403/404/500.
- **Elements:** HTML/CSS thực tế, kích thước và responsive.

Khi gửi lỗi cho AI, chụp hoặc chép cả request URL, status code và response an toàn; che token, cookie và dữ liệu cá nhân.

## Test theo ba tầng

- **Unit:** một hàm nhỏ, chạy nhanh.
- **Integration:** nhiều module phối hợp, ví dụ API + database test.
- **E2E:** mô phỏng người dùng, ví dụ đăng nhập → tạo đơn → thấy đơn.

Không cần test mọi dòng. Hãy test hành vi quan trọng và bug từng xảy ra.

## Branch và pull request

Branch là bản làm việc tách khỏi `main`. Một branch nên có một mục tiêu; pull request là nơi người khác xem diff, test và góp ý trước khi merge. Khi conflict, đừng chọn “accept all” mù: đọc hai thay đổi, hỏi quy tắc sản phẩm, rồi chạy test lại.

## Bài tập

Tạo một branch, cố ý gây một lỗi giao diện, dùng Console/Network/Elements tìm nguyên nhân, sửa, chạy test và mở pull request nháp. Viết mô tả gồm nguyên nhân, thay đổi và bằng chứng.

## Checklist đạt bài

- [ ] Tái hiện được lỗi bằng bước cụ thể.
- [ ] Biết chọn Console, Network hoặc Elements.
- [ ] Phân biệt unit, integration và E2E.
- [ ] Tạo branch và đọc diff trước merge.
- [ ] Không đưa secret vào log, issue hoặc prompt.

## Bước tiếp theo

Code đã chạy ổn rồi thì tới lượt trau chuốt phần nhìn cho có chất riêng - bắt đầu từ hai thứ dễ lộ "phèn" nhất: [Font và icon →](19-font-va-icon.md)
