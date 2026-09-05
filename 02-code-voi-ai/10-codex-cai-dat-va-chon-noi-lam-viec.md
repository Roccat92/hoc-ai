# Codex: cài đặt và chọn đúng nơi làm việc


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người đã biết một AI coding agent là gì và muốn bắt đầu với Codex. Học xong bạn sẽ phân biệt được desktop/web, CLI và IDE extension, chọn local hay cloud, đăng nhập đúng cách và thực hiện một task chỉ đọc an toàn.

## Codex có những bề mặt nào?

| Bề mặt | Hợp với | Đặc điểm |
|---|---|---|
| **CLI** | Người thích terminal, script và CI | Đọc/sửa file, chạy lệnh, có `codex exec` cho workflow lặp |
| **IDE extension** | Người muốn thấy code và diff cạnh nhau | Dùng file đang mở hoặc đoạn code được chọn làm ngữ cảnh |
| **Desktop/web/cloud** | Task dài, cần giao diện hoặc môi trường từ xa | Có thể làm việc với project và tích hợp cloud tùy gói |

Nguyên lý giống nhau: Codex nhận mục tiêu, đọc ngữ cảnh được phép, đề xuất hoặc thực hiện thay đổi và trả bằng chứng. Khác nhau chủ yếu là nơi code chạy và quyền truy cập.

## Cài và đăng nhập

Xem lệnh cài mới nhất tại [Codex CLI chính thức](https://learn.chatgpt.com/docs/codex/cli). Sau khi cài, mở terminal tại thư mục dự án rồi chạy:

```bash
codex
```

Lệnh này mở phiên tương tác trong thư mục hiện tại. Lần đầu, chọn đăng nhập bằng ChatGPT hoặc phương thức khác mà tài khoản hiển thị. Đừng dán API key vào chat hoặc commit vào repo.

## Chọn local, worktree hay cloud

- **Local:** Codex dùng file và công cụ đã cài trên máy; hợp với task nhỏ, dữ liệu riêng và cần kiểm soát trực tiếp.
- **Worktree:** tách một bản làm việc riêng để thay đổi không làm bẩn thư mục chính.
- **Cloud:** hợp với task dài hoặc cần môi trường từ xa; đọc kỹ file nào được gửi đi và kết quả được lưu ở đâu.

Trước task đầu tiên, tạo checkpoint Git hoặc ít nhất kiểm tra working tree. Đừng bắt agent sửa khi bạn chưa biết thay đổi cũ thuộc về ai.

## Task chỉ đọc đầu tiên

```text
Hãy chỉ đọc, chưa sửa file.
1. Tóm tắt cấu trúc thư mục.
2. Chỉ ra file khởi động và lệnh test hiện có.
3. Nêu ba điều bạn chưa chắc.
```

## Checklist đạt bài

- [ ] Mở được Codex trong đúng thư mục.
- [ ] Biết code đang chạy local, worktree hay cloud.
- [ ] Đăng nhập mà không làm lộ API key.
- [ ] Thực hiện được task chỉ đọc.
- [ ] Có checkpoint trước khi cho agent sửa.

## Bước tiếp theo

Đã mở đúng nơi, giờ giao task đầu tiên và kiểm soát quyền Codex: [Task đầu tiên và quyền hạn an toàn →](11-codex-task-dau-tien-va-quyen-han.md)
