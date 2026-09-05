# Rubric tự chấm và capstone: chứng minh mình đã build được


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người đã hoàn thành ít nhất một dự án thực hành và muốn biết “đã hiểu chưa” bằng bằng chứng, không bằng cảm giác. Học xong bạn sẽ tự chấm sản phẩm, biết thiếu lớp nào và chuẩn bị được một capstone có link kiểm chứng.

## Rubric 100 điểm

| Nhóm | Điểm | Bằng chứng |
|---|---:|---|
| Vấn đề và người dùng | 10 | Problem brief, ít nhất 3 cuộc phỏng vấn hoặc ghi chú quan sát |
| Chức năng cốt lõi | 20 | Luồng chính chạy được từ đầu tới cuối |
| Code và cấu trúc | 15 | README, tên rõ, task nhỏ, không secret |
| Test và debug | 15 | Test hành vi, bug đã tái hiện và sửa, log lỗi |
| Bảo mật | 15 | Checklist phần 10, phân quyền, backup hoặc giới hạn rõ |
| Deploy và vận hành | 10 | URL live, biến môi trường, hướng dẫn rollback |
| AI (nếu có) | 10 | Prompt/model version, eval tối thiểu, đường fallback |
| Giải thích và bài học | 5 | Demo ngắn, quyết định kỹ thuật, điều làm sai |

Không cần đạt 100 điểm ở bản đầu. Một MVP 65 điểm nhưng có bằng chứng và biết giới hạn đáng giá hơn một app nhiều tính năng nhưng không chạy ổn.

## Ba checkpoint

1. **Local:** chức năng chính chạy, có test và commit.
2. **Preview/staging:** người khác mở được, không dùng secret thật trong repo.
3. **Live:** có URL, checklist bảo mật, backup/rollback và một vòng phản hồi người dùng.

## Capstone tự chọn

Chọn một vấn đề trong lĩnh vực bạn hiểu. Viết problem brief, phỏng vấn tối thiểu ba người, tạo spec/backlog, build MVP, deploy và ghi số liệu sau một tuần. Nếu có AI, thêm bộ eval và ít nhất một tình huống agent phải từ chối hoặc chuyển cho người.

## Checklist nộp bài

- [ ] Có link demo hoặc ghi rõ lý do không công khai.
- [ ] Có GitHub hoặc bản xuất mã nguồn đã che secret.
- [ ] Có README hướng dẫn chạy và tài khoản demo nếu cần.
- [ ] Có ảnh/video ngắn của luồng chính.
- [ ] Có chi phí, thời gian, lỗi và bài học thật.
- [ ] Có rubric tự chấm và mục còn thiếu.

## Bước tiếp theo

Trước khi cho người khác dùng capstone, đi qua [Checklist bảo mật trước khi public →](../10-bao-mat/01-checklist-truoc-khi-public.md)
