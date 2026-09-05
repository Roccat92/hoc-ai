# Codex: sửa code, chạy test và review diff


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người muốn AI làm nhanh nhưng vẫn hiểu và kiểm soát kết quả. Học xong bạn sẽ dùng được vòng lặp khảo sát → sửa nhỏ → test → review → commit.

## Vòng lặp chuẩn

1. **Khảo sát:** xác định file, luồng dữ liệu và test hiện có.
2. **Đề xuất:** yêu cầu Codex nói ngắn gọn cách sửa trước khi đổi nhiều file.
3. **Sửa nhỏ:** mỗi task một mục tiêu.
4. **Test:** chạy test gần với hành vi vừa đổi.
5. **Review diff:** xem cả thay đổi ngoài ý muốn.
6. **Smoke test:** mở app hoặc gọi endpoint chính.
7. **Commit:** ghi mục tiêu và kết quả kiểm tra.

Một test xanh chỉ nói test đó xanh; không chứng minh mọi thứ đúng. Ngược lại, diff nhỏ, test đúng và smoke test cùng đạt mới là bằng chứng tốt.

## Prompt yêu cầu kiểm tra

```text
Sau khi sửa, hãy:
1. Chạy test tập trung cho hành vi vừa đổi.
2. Chạy build nếu thay đổi ảnh hưởng compile.
3. Hiển thị danh sách file đã đổi và lý do.
4. Nếu không chạy được kiểm tra, nói rõ nguyên nhân và bước thay thế.
Không tự sửa các lỗi không liên quan.
```

Trong IDE, tận dụng file đang mở hoặc đoạn code được chọn để giảm bối cảnh thừa. Với thay đổi lớn, yêu cầu Codex chia thành các diff nhỏ và dừng sau mỗi mốc.

## Bài tập

Tạo một bug nhỏ trong dự án landing page, giao Codex viết test tái hiện, sửa, chạy test và review diff. Tự kiểm tra trên màn hình rộng 360px trước khi commit.

## Checklist đạt bài

- [ ] Có test hoặc kiểm tra trước khi kết luận.
- [ ] Diff chỉ chứa file liên quan.
- [ ] Có smoke test sau test tự động.
- [ ] Biết từ chối sửa ngoài phạm vi.
- [ ] Commit có mô tả và bằng chứng kiểm tra.

## Bước tiếp theo

Vòng lặp đã rõ, giờ chọn model và reasoning theo độ khó, chi phí và hạn mức: [Model, reasoning và hạn mức →](14-codex-model-reasoning-va-han-muc.md)
