# Codex: sửa code, chạy test và review diff

Bài này dành cho người muốn AI làm nhanh nhưng vẫn hiểu và kiểm soát kết quả. Học xong bạn sẽ dùng được vòng lặp khảo sát → sửa nhỏ → test → review → commit, và tự đọc được một diff thật mà không cần đoán mò.

## Vòng lặp chuẩn

1. **Khảo sát:** xác định file, luồng dữ liệu và test hiện có.
2. **Đề xuất:** yêu cầu Codex nói ngắn gọn cách sửa trước khi đổi nhiều file.
3. **Sửa nhỏ:** mỗi task một mục tiêu.
4. **Test:** chạy test gần với hành vi vừa đổi.
5. **Review diff:** xem cả thay đổi ngoài ý muốn.
6. **Smoke test:** mở app hoặc gọi endpoint chính bằng tay.
7. **Commit:** ghi mục tiêu và kết quả kiểm tra.

Một test xanh chỉ nói test đó xanh; không chứng minh mọi thứ đúng. Ngược lại, diff nhỏ, test đúng và smoke test cùng đạt mới là bằng chứng tốt.

## Đọc một diff thật

`git diff` (hoặc xem trong tab review của IDE) hiển thị đúng dạng sau - biết đọc dạng này là kỹ năng dùng được với mọi AI coding agent, không riêng Codex:

```diff
diff --git a/index.html b/index.html
index 3a1f9c2..7b8e5d1 100644
--- a/index.html
+++ b/index.html
@@ -12,5 +12,8 @@
     <input type="tel" name="phone" required>
   </div>
   <div class="form-group">
-    <button type="submit">Gửi</button>
+    <button type="submit">Gửi thông tin</button>
   </div>
+  <div class="form-group" id="phone-error" style="display:none">
+    Số điện thoại không hợp lệ
+  </div>
```

- Dòng `--- a/...` và `+++ b/...`: file trước và sau khi sửa (cùng một file, hai phiên bản).
- `@@ -12,5 +12,8 @@`: bắt đầu từ dòng 12, bản cũ có 5 dòng trong đoạn này, bản mới có 8 dòng - tức là đoạn này đã dài thêm 3 dòng.
- Dòng bắt đầu bằng `-` (thường tô đỏ): bị xóa. Dòng bắt đầu bằng `+` (thường tô xanh): mới thêm. Dòng không có dấu: giữ nguyên, chỉ hiện để có ngữ cảnh.

Diff này đổi đúng nút "Gửi" thành "Gửi thông tin" và thêm một khối báo lỗi số điện thoại - nếu bạn giao task "đổi chữ nút Gửi", khối báo lỗi thêm vào là **thay đổi ngoài phạm vi**, cần hỏi lại tại sao Codex tự thêm, dù trông vô hại.

## Prompt yêu cầu kiểm tra

```text
Sau khi sửa, hãy:
1. Chạy test tập trung cho hành vi vừa đổi (ví dụ chỉ test liên quan tới form, không chạy cả bộ nếu không cần).
2. Chạy build nếu thay đổi ảnh hưởng compile.
3. Hiển thị danh sách file đã đổi và lý do.
4. Nếu không chạy được kiểm tra, nói rõ nguyên nhân và bước thay thế.
Không tự sửa các lỗi không liên quan.
```

Trong IDE, tận dụng file đang mở hoặc đoạn code được chọn để giảm bối cảnh thừa - Codex không cần đọc lại cả dự án chỉ để sửa một dòng. Với thay đổi lớn, yêu cầu Codex chia thành các diff nhỏ và dừng sau mỗi mốc để bạn review, thay vì để nó tự chạy hết một mạch rồi mới xem lại.

## Bài tập

Trong dự án landing page, cố tình tạo một bug nhỏ (ví dụ: xóa thuộc tính `required` khỏi ô số điện thoại, để form nhận cả ô trống). Giao Codex:
1. Viết lại yêu cầu "số điện thoại là bắt buộc" theo mẫu task 4 phần đã học ở bài trước.
2. Yêu cầu Codex tự tái hiện lỗi trước khi sửa (mở form, thử gửi trống, xác nhận lỗi xảy ra).
3. Sửa, rồi tự tay thử lại: gửi form để trống số điện thoại - phải bị chặn.
4. Xem `git diff` - xác nhận chỉ đúng phần liên quan bị đổi, không có thay đổi lạ nào chen vào như ví dụ ở trên.
5. Tự kiểm tra trên màn hình rộng 360px trước khi commit.

## Checklist đạt bài

- [ ] Có test hoặc thao tác tái hiện lỗi trước khi kết luận đã sửa xong.
- [ ] Tự đọc được một diff thật: phân biệt dòng thêm, dòng xóa, số dòng trong `@@`.
- [ ] Diff chỉ chứa file và dòng liên quan tới task, không có thay đổi lạ chen vào.
- [ ] Có smoke test bằng tay sau test tự động.
- [ ] Commit có mô tả rõ mục tiêu và bằng chứng đã kiểm tra.

## Bước tiếp theo

Vòng lặp đã rõ, giờ chọn model và reasoning theo độ khó, chi phí và hạn mức: [Model, reasoning và hạn mức →](14-codex-model-reasoning-va-han-muc.md)
