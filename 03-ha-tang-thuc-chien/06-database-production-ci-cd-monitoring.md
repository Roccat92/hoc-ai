# Database production, CI/CD và vận hành tối thiểu


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người đã deploy được app nhưng chưa biết giữ dữ liệu và phát hiện lỗi sau khi public. Học xong bạn sẽ tách môi trường, chạy migration an toàn, bật kiểm tra trước deploy, xem log và thử khôi phục backup.

## Ba môi trường

- **Development:** dữ liệu giả, thay đổi nhanh, chỉ trên máy mình.
- **Staging/preview:** bản gần production để người khác thử.
- **Production:** dữ liệu thật, thay đổi có kế hoạch và có rollback.

Không dùng chung database giữa development và production. Secret để trong biến môi trường của từng nơi, không commit vào Git.

## Database production cần bốn thứ

1. **Migration:** lịch sử thay đổi schema có thứ tự.
2. **Backup:** bản sao tự động và nơi lưu tách khỏi database.
3. **Restore test:** thử khôi phục, không chỉ nhìn thấy file backup.
4. **Quyền tối thiểu:** app chỉ có quyền cần thiết, tài khoản migration tách khỏi tài khoản runtime nếu có thể.

SQLite phù hợp để học và app nhỏ. Khi nhiều người dùng, cần backup managed hoặc truy cập đồng thời, cân nhắc Postgres. Chi phí database quản lý nhỏ thường bắt đầu từ vài USD/tháng (khoảng vài chục tới vài trăm nghìn đồng); dùng free tier trước và kiểm tra giá, giới hạn, vùng dữ liệu trên trang nhà cung cấp.

## CI/CD tối thiểu

Mỗi pull request nên chạy: cài dependency từ lockfile, test, build và kiểm tra format/lint nếu dự án có. Chỉ deploy production sau khi preview hoặc staging đạt. Nếu build fail, không cố deploy bằng cách bỏ qua kiểm tra.

## Log và monitoring

Log phải trả lời được: request nào lỗi, lúc nào, phiên bản nào, mã lỗi gì. Không log API key, cookie, mật khẩu hoặc toàn bộ nội dung riêng tư. Một monitoring tối thiểu có uptime check, cảnh báo lỗi tăng đột biến và cảnh báo chi phí.

## Bài tập

Tạo một migration thêm cột vào database mẫu, chạy ở local, deploy lên staging, chụp kết quả, tạo backup và thử restore vào database khác. Viết một runbook ngắn cho tình huống deploy lỗi.

## Checklist đạt bài

- [ ] Tách development, staging và production.
- [ ] Có migration thay vì sửa tay schema thật.
- [ ] Backup và restore test đều chạy được.
- [ ] Pull request chạy test/build trước deploy.
- [ ] Log không chứa secret và có cảnh báo lỗi.

## Bước tiếp theo

Đã có đủ nền tảng hạ tầng - từ deploy web tới vận hành database/CI/CD, giờ bắt tay build ứng dụng AI thật: [Gọi API Claude/OpenAI/Gemini bằng code →](../04-build-ung-dung-ai/01-goi-api-llm.md)
