# Prompt thực dụng: giao việc cho ChatGPT như giao việc cho đồng đội

Bài này dành cho người đã biết mở ChatGPT và muốn câu trả lời bớt chung chung. Học xong bạn sẽ viết được prompt có thể kiểm tra, biết dùng ví dụ và biết sửa prompt dựa trên lỗi của đầu ra thay vì gõ lại ngẫu nhiên.

## Khung năm phần

1. **Task:** cần làm việc gì?
2. **Context:** ChatGPT cần biết bối cảnh nào?
3. **Output:** muốn nhận dạng gì, dài bao nhiêu, bằng ngôn ngữ nào?
4. **Constraints:** điều gì được làm và không được làm?
5. **Example:** một ví dụ đầu vào/đầu ra tốt nếu định dạng khó diễn tả.

Ví dụ:

```text
Task: Tóm tắt phản hồi khách hàng dưới đây.
Context: Đây là phản hồi về dịch vụ giao đồ ăn, dùng cho cuộc họp sản phẩm.
Output: Bảng gồm vấn đề, số lần xuất hiện, trích ý ngắn và đề xuất hành động.
Constraints: Không suy đoán nguyên nhân nếu dữ liệu không nói tới; viết tiếng Việt.
```

## Năm mẫu việc nên luyện

- **Tóm tắt:** giữ luận điểm, bỏ phần lặp, ghi rõ điều chưa chắc.
- **Trích xuất:** biến email hoặc văn bản thành các trường có tên rõ ràng.
- **Phân loại:** định nghĩa nhãn và cho ví dụ biên.
- **Chuyển đổi:** đổi giọng, định dạng hoặc đối tượng đọc nhưng giữ nghĩa.
- **Mở rộng:** từ ý ngắn thành dàn ý, rồi thành bản nháp có giới hạn.

Hãy yêu cầu đầu ra dạng bảng, checklist, Markdown hoặc JSON khi máy khác cần đọc tiếp. Với dữ liệu quan trọng, nói rõ phải trả `unknown` thay vì tự đoán.

## Một vòng hoàn chỉnh trông thế nào

Lấy prompt "tóm tắt phản hồi khách hàng" ở trên, đầu ra rút gọn có thể trông như sau:

| Vấn đề | Số lần | Trích ý | Đề xuất |
|---|---|---|---|
| Giao hàng trễ | 8 | "chờ hơn 1 tiếng mới tới" | Hiện thời gian giao dự kiến khi đặt |
| Món bị nguội | 5 | "đồ ăn nguội ngắt" | Dùng túi giữ nhiệt cho đơn xa |
| App khó dùng | 2 | "không tìm được nút hủy" | Xem lại vị trí nút hủy đơn |

Đây mới là bản nháp của máy, không phải kết luận cuối. Việc của bạn: soi xem "8 lần", "5 lần" có khớp dữ liệu gốc không, và cột "Trích ý" có đúng là câu khách nói hay bị diễn giải thêm. Bước kiểm tra này là ranh giới giữa "AI làm hộ" và "AI làm loạn".

## Lặp có chủ đích

Sau lượt đầu, đừng chỉ nói “làm hay hơn”. Hãy chỉ ra lỗi quan sát được:

```text
Đầu ra chưa đạt vì có hai kết luận không có bằng chứng.
Giữ nguyên bảng hiện tại, thêm cột “Nguồn trong văn bản”.
Nếu không tìm thấy bằng chứng, ghi “không có trong dữ liệu”.
```

Nếu yêu cầu lớn, tách thành lập dàn ý → làm một phần mẫu → kiểm tra → mở rộng. Đây cũng là cách phát hiện sai sớm.

## Bài tập trước và sau

Prompt yếu: `Viết nội dung bán hàng cho tôi.`

Prompt có thể nghiệm thu:

```text
Viết 3 phiên bản giới thiệu dịch vụ dọn nhà theo giờ cho người đi làm ở Hà Nội.
Mỗi phiên bản tối đa 80 từ, giọng tin cậy, không hứa hẹn quá mức.
Mỗi bản phải có: vấn đề khách gặp, lợi ích cụ thể, lời kêu gọi hành động.
Không dùng các từ “tốt nhất”, “số 1”, “cam kết 100%”.
```

## Checklist đạt bài

- [ ] Viết được prompt có Task, Context và Output.
- [ ] Dùng ví dụ để khóa định dạng.
- [ ] Giao việc lớn thành các lượt nhỏ.
- [ ] Sửa prompt dựa trên lỗi cụ thể.
- [ ] Yêu cầu AI nói rõ phần không biết thay vì bịa.

## Bước tiếp theo

Prompt đã rõ, giờ đưa file và nguồn vào đúng cách: [Làm việc với file, web và nghiên cứu →](03-file-web-va-nghien-cuu.md)
