# Database production, migration và backup thật

Bài này dành cho người đã deploy được app nhưng chưa biết giữ dữ liệu an toàn khi có người dùng thật. Học xong bạn sẽ tách được môi trường, viết một migration thật, và tự tay thử backup/restore ít nhất một lần - không chỉ đọc lý thuyết.

## Ba môi trường

- **Development:** dữ liệu giả, thay đổi nhanh, chỉ trên máy mình.
- **Staging/preview:** bản gần production để người khác thử.
- **Production:** dữ liệu thật, thay đổi có kế hoạch và có rollback.

Không dùng chung database giữa development và production - lỡ tay chạy nhầm một lệnh test trên dữ liệu thật là kiểu tai nạn phổ biến nhất. Secret để trong biến môi trường của từng nơi, không commit vào Git (xem lại [giấu API key và secret](../10-bao-mat/03-giau-api-key-va-secret.md)).

## Migration: một ví dụ thật

Migration là một file ghi lại **một thay đổi cấu trúc dữ liệu**, có thứ tự, để không ai phải đoán schema hiện tại trông ra sao. Ví dụ thêm cột `ghi_chu` vào bảng đơn hàng, đặt tên file có số thứ tự để chạy đúng trình tự:

```sql
-- migrations/002_them_cot_ghi_chu.sql
ALTER TABLE don_hang ADD COLUMN ghi_chu TEXT;
```

Với SQLite (dùng để học và app nhỏ, như dự án [quản lý đơn hàng](../09-du-an-thuc-hanh/du-an-02-quan-ly-don-hang/spec.md)), chạy migration bằng:

```bash
sqlite3 database.db < migrations/002_them_cot_ghi_chu.sql
```
- `sqlite3`: công cụ dòng lệnh đi kèm SQLite để chạy lệnh SQL trực tiếp lên một file database.
- `database.db`: file database của bạn - đổi tên đúng theo dự án.
- `< migrations/...`: đọc nội dung file SQL và chạy nó, thay vì phải gõ tay từng dòng.

Quy tắc quan trọng: **không sửa tay schema database production**, luôn viết migration mới rồi chạy nó ở cả local, staging và production theo đúng thứ tự - để ba nơi này không bị lệch cấu trúc dữ liệu với nhau.

## Backup và restore - thử thật, không chỉ tạo file

Một bản backup **chưa từng thử khôi phục** không đáng tin - có thể file bị hỏng, thiếu bảng, hoặc sai định dạng mà bạn không biết cho tới lúc cần dùng thật.

**Với SQLite** (cả file database chỉ là một file duy nhất trên đĩa, nên backup đơn giản là sao chép file):

```bash
cp database.db backups/database-2026-09-05.db
```
- Mac/Linux dùng `cp`. Trên PowerShell, lệnh tương đương là `Copy-Item database.db backups/database-2026-09-05.db`.
- Đặt tên file backup kèm ngày để biết bản nào mới nhất, và lưu thư mục `backups/` ở nơi **tách khỏi** máy chủ chính (ví dụ một dịch vụ lưu trữ khác) - backup nằm chung ổ đĩa với database gốc thì máy hỏng là mất cả hai.

**Thử khôi phục** (làm ít nhất một lần để tin bản backup dùng được):
```bash
cp backups/database-2026-09-05.db database-restore-test.db
sqlite3 database-restore-test.db "SELECT COUNT(*) FROM don_hang;"
```
- Dòng 1: sao chép bản backup ra một file test riêng, không đè lên database đang chạy.
- Dòng 2: mở file vừa khôi phục, đếm số dòng trong bảng `don_hang` để xác nhận dữ liệu còn nguyên, không bị hỏng hay rỗng bất thường.

**Với Postgres hoặc managed database:** dùng `pg_dump`/`pg_restore` (Postgres) hoặc công cụ backup có sẵn của nhà cung cấp (Supabase, Railway, Neon...) - cú pháp và tần suất backup tự động khác nhau theo từng dịch vụ, luôn đọc tài liệu chính thức của nhà cung cấp bạn đang dùng thay vì chép nguyên lệnh từ dự án khác.

## Quyền tối thiểu

App chỉ nên có quyền cần thiết trên database (đọc/ghi đúng bảng nó dùng), không dùng chung tài khoản admin cho mọi việc. Nếu có thể, tách tài khoản chạy migration khỏi tài khoản app dùng lúc chạy bình thường - lỡ app có lỗ hổng, kẻ tấn công cũng không tự sửa được cấu trúc database.

## Bài tập

Với một database SQLite của bạn (dự án thật hoặc dự án mẫu ở phần 09):
1. Viết một migration thêm một cột mới, chạy nó bằng `sqlite3`.
2. Backup file database bằng lệnh `cp`/`Copy-Item` ở trên.
3. Xóa hoặc đổi tên file database gốc (mô phỏng sự cố).
4. Khôi phục từ bản backup, chạy lại lệnh `SELECT COUNT(*)` để xác nhận dữ liệu còn nguyên.

## Checklist đạt bài

- [ ] Tách được development, staging và production, không dùng chung database.
- [ ] Viết và chạy được một migration thật thay vì sửa tay schema.
- [ ] Tự tay backup rồi khôi phục thành công ít nhất một lần.
- [ ] Biết vì sao backup phải lưu tách khỏi máy chủ chính.
- [ ] Biết vì sao không nên dùng chung tài khoản admin cho mọi thao tác.

## Bước tiếp theo

Dữ liệu đã an toàn, giờ tự động hóa việc kiểm tra trước khi đưa thay đổi lên production: [CI/CD cơ bản: kiểm tra tự động trước khi deploy →](07-cicd-co-ban.md)
