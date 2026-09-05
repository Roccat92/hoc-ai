# Hướng dẫn đóng góp

Cảm ơn bạn đã muốn đóng góp cho Học AI Việt! Repo này được viết để phục vụ cộng đồng, nên **bất kỳ ai cũng có thể sửa** - kể cả khi đây là lần đầu tiên bạn dùng GitHub. Dưới đây là hướng dẫn cho cả người mới lẫn người quen Git.

## Bạn có thể đóng góp gì?

- **Sửa lỗi sai, lỗi chính tả** - dù nhỏ cũng quý.
- **Cập nhật giá cả** - giá API, giá GPU, giá VPS thay đổi liên tục. Thấy số cũ, sửa luôn.
- **Cập nhật thông tin model mới** - ngành AI ra model mới mỗi vài tháng, nội dung cũ cần người giữ cho tươi.
- **Thêm case study** - bạn build được sản phẩm gì bằng AI? Chia sẻ vào `07-case-study/`, kèm chi phí thật và bài học rút ra.
- **Viết thêm bài mới** - nếu thấy thiếu chủ đề, mở issue đề xuất trước khi viết để tránh trùng công sức với người khác.
- **Dịch thuật ngữ cho dễ hiểu hơn** - nếu bạn có cách giải thích một khái niệm dễ hiểu hơn bản hiện tại, cứ đề xuất.

### Phạm vi dự án

Nội dung chính của repo tập trung vào **nhánh code** - dùng AI để build sản phẩm phần mềm. Mảng media/video (dùng AI tạo ảnh, video, âm thanh...) hiện **để mở cho cộng đồng đóng góp** - nếu bạn muốn thêm nội dung về hướng này, mở issue đề xuất trước để bàn cấu trúc phù hợp, tránh lạc khỏi trọng tâm hiện tại của repo.

## Cách 1: Sửa trực tiếp trên GitHub (không cần cài gì cả)

Đây là cách nhanh nhất nếu bạn chỉ sửa vài dòng và chưa quen dùng Git:

1. Mở file bạn muốn sửa trên GitHub, bấm vào biểu tượng cây bút (Edit this file) ở góc trên bên phải.
2. Sửa nội dung ngay trên trình duyệt.
3. Cuộn xuống dưới, viết một dòng mô tả ngắn bạn đã sửa gì (ví dụ: "Cập nhật giá VPS Vietnix tháng 9/2026").
4. Chọn **"Create a new branch and start a pull request"**, bấm **Propose changes**.
5. Xong - vậy là bạn vừa tạo Pull Request (PR) đầu tiên rồi. Đội duy trì repo sẽ xem và phản hồi.

## Cách 2: Fork + clone (cho thay đổi lớn hơn, nhiều file)

Nếu bạn chưa quen các bước dưới đây, tham khảo [`02-code-voi-ai/05-git-github-co-ban.md`](02-code-voi-ai/05-git-github-co-ban.md) trước.

```bash
git clone https://github.com/<ten-cua-ban>/hoc-ai.git
cd hoc-ai
git checkout -b sua-loi-gia-vps
```

- Dòng 1: tải repo (bản bạn đã fork) về máy.
- Dòng 2: vào thư mục vừa tải.
- Dòng 3: tạo một nhánh (branch) riêng để làm việc, đặt tên ngắn gọn mô tả bạn đang làm gì.

Sửa file, sau đó:

```bash
git add .
git commit -m "Cập nhật giá VPS Vietnix tháng 9/2026"
git push origin sua-loi-gia-vps
```

- `git add .`: đánh dấu tất cả file đã sửa để chuẩn bị lưu.
- `git commit -m "..."`: lưu lại thay đổi kèm mô tả.
- `git push origin ...`: đẩy nhánh của bạn lên GitHub.

Sau đó vào GitHub, bấm **Compare & pull request** để mở PR.

## Quy tắc nội dung (đọc trước khi viết bài mới)

- **Giọng văn "bạn - mình"**, thân thiện, thực chiến - như đang giải thích cho một người bạn chưa biết gì.
- **Không giật tít, không tạo FOMO.** Tránh kiểu "thời đại đã chấm dứt", "không học AI là tụt hậu"... - nội dung thuyết phục bằng chất lượng, không bằng cảm giác sợ bị bỏ lỡ.
- **AI là con dao, chuyên môn là đầu bếp.** Khi viết bài mới, ưu tiên gắn kỹ năng AI vào một việc/lĩnh vực cụ thể của người đọc, không dạy "AI" như một môn học trừu tượng tách rời thực tế.
- **Trung lập, không quảng cáo trá hình.** Ưu tiên giới thiệu công cụ miễn phí/open source trước, công cụ trả phí chỉ nêu khi thực sự cần thiết hoặc tốt hơn hẳn.
- **Luôn có bảng giá VND ước tính** khi nhắc tới dịch vụ trả phí, kèm ghi chú "giá có thể thay đổi, kiểm tra trang chủ để có giá mới nhất". Đừng bịa số chính xác nếu không chắc.
- **Lệnh terminal** phải để trong code block, và giải thích từng dòng lệnh ngay bên dưới - người đọc có thể chưa từng mở terminal bao giờ.
- **Mỗi file** nên mở đầu bằng 1-2 câu nói file này dành cho ai, học xong làm được gì, và kết thúc bằng mục "Bước tiếp theo" link sang bài kế tiếp trong lộ trình.
- **Không copy nguyên văn** từ nguồn khác - viết lại bằng hiểu biết và văn phong của bạn, có thể dẫn nguồn nếu tham khảo.

## Báo lỗi / đề xuất ý tưởng (Issue)

Không muốn tự sửa nhưng thấy vấn đề? Vào tab **Issues** trên trang GitHub của repo, bấm **New issue**, mô tả:
- Bạn thấy gì chưa đúng/chưa rõ, ở file nào.
- (Nếu là đề xuất bài mới) Bạn nghĩ nội dung nên có gì.

## Quy tắc ứng xử

Đây là không gian học tập mở cho người mới. Luôn tôn trọng, kiên nhẫn, không chê bai câu hỏi "ngớ ngẩn" - ai cũng từng không biết gì trước khi biết.
