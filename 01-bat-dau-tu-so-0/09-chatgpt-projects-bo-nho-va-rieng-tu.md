# Projects, bộ nhớ và quyền riêng tư trong ChatGPT


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người có một công việc lặp lại nhiều ngày và không muốn dán lại toàn bộ bối cảnh ở mỗi cuộc trò chuyện. Học xong bạn sẽ biết khi nào dùng Project, cách viết hướng dẫn riêng gọn, phân biệt bộ nhớ với file nguồn, và giảm rủi ro khi đưa dữ liệu cá nhân vào AI.

## Project giải quyết vấn đề gì?

Một Project gom các cuộc trò chuyện, file nguồn và hướng dẫn chung quanh một mục tiêu. Ví dụ: Project “Nội dung cho shop” có chân dung khách hàng, bảng sản phẩm, giọng thương hiệu và checklist duyệt bài.

Đừng biến Project thành kho chứa mọi thứ. Mỗi Project nên có một mục tiêu, một nhóm file liên quan và một quy tắc ngắn. Khi đổi khách hàng hoặc sản phẩm, tạo Project mới để tránh trộn dữ liệu.

## Ba lớp ngữ cảnh

- **Tin nhắn hiện tại:** việc cần làm ngay.
- **Hướng dẫn Project/custom instructions:** quy tắc lặp lại, giọng và định dạng.
- **File/nguồn:** dữ liệu cần tham chiếu.

Bộ nhớ là cơ chế khác và phụ thuộc cài đặt tài khoản. Không coi bộ nhớ là cơ sở dữ liệu chính thức; thông tin quan trọng vẫn phải nằm trong file có phiên bản.

## Hướng dẫn Project nên ngắn

```text
Vai trò: trợ lý nội dung cho shop đồ gia dụng.
Độc giả: người mua tại Việt Nam, ưu tiên ngôn ngữ rõ và không phóng đại.
Đầu ra mặc định: tiêu đề, nội dung, CTA, checklist tự kiểm tra.
Quy tắc: không bịa thông số; thiếu dữ liệu thì hỏi hoặc ghi “chưa có”.
```

## Quyền riêng tư tối thiểu

- Không tải CCCD, khóa API, mật khẩu, dữ liệu y tế hoặc danh sách khách hàng nguyên bản nếu chưa được phép.
- Ẩn danh tên, email, số điện thoại và mã đơn trước khi thử nghiệm.
- Kiểm tra gói tài khoản, chính sách dữ liệu và quyền chia sẻ file.
- Xóa file/Project không còn cần; không để dữ liệu nhạy cảm tồn tại vô thời hạn.

## Bài tập

Tạo Project “Dự án landing page”. Thêm một file spec, một file khách hàng giả và hướng dẫn bốn dòng. Mở chat mới, yêu cầu tạo checklist; sau đó xóa một trường dữ liệu và quan sát ChatGPT có nói thiếu dữ liệu hay tự bịa.

## Checklist đạt bài

- [ ] Biết khi nào tạo Project mới.
- [ ] Phân biệt prompt, hướng dẫn Project, file và memory.
- [ ] Hướng dẫn Project ngắn, có quy tắc không bịa.
- [ ] Biết ẩn danh dữ liệu và kiểm tra cài đặt.
- [ ] Có thể tái chạy một workflow ở chat mới.

## Bước tiếp theo

ChatGPT giúp chuẩn bị ý tưởng và tài liệu; trước khi giao AI build, hãy nắm luồng web và dữ liệu: [File, web và server hoạt động thế nào →](10-file-web-va-server-hoat-dong-the-nao.md)
