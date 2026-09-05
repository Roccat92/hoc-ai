# Rubric tự chấm và capstone: chứng minh mình đã build được

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

## Hai bản mẫu được chấm

Để thấy rubric dùng thế nào, đây là hai capstone giả định:

**Bản A - 65 điểm (đạt, đáng nộp):** một trang quản lý đơn hàng nhỏ. Luồng chính chạy được (20/20), có README và code gọn (13/15), có vài test cho phần tính tiền (10/15), đã đi checklist bảo mật cơ bản và phân quyền (12/15), deploy live có URL (10/10), không dùng AI (0/10, không áp dụng), có video demo và ghi lại một quyết định sai (5/5), vấn đề rõ nhưng mới hỏi 1 người (5/10). → **Đáng nộp**: chạy thật, có bằng chứng, tác giả biết mình thiếu phỏng vấn và test.

**Bản B - 85 điểm:** cùng ý tưởng nhưng phỏng vấn đủ 3 người (10/10), có eval nhỏ cho phần AI phân loại đơn kèm đường fallback (10/10), test phủ các bug từng gặp (14/15), có hướng dẫn rollback (10/10). Khoảng cách A→B **không phải nhiều tính năng hơn**, mà là nhiều *bằng chứng* hơn: phỏng vấn, test, eval, rollback.

Điểm mấu chốt: đừng nhồi tính năng để lên điểm. Bổ sung đúng những ô "Bằng chứng" đang trống.

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
