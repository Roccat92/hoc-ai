# Chọn model, reasoning và hạn mức Codex


::: warning Bản nháp - đang hoàn thiện
Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.
:::
Bài này dành cho người dùng Codex nhưng không hiểu vì sao hai task tương tự tiêu hao khác nhau. Học xong bạn sẽ chọn cấu hình dựa trên rủi ro, hiểu context và biết xem số liệu sử dụng.

## Quy tắc chọn nhanh

- Việc nhỏ, lặp lại, ít rủi ro: model nhanh/nhẹ, reasoning thấp.
- Bug cần đọc vài file: model cân bằng, reasoning vừa.
- Refactor lớn, bảo mật hoặc kiến trúc: model mạnh hơn, reasoning cao hơn, phạm vi nhỏ và có checkpoint.

Reasoning cao không thay thế tiêu chí nghiệm thu. Nếu prompt mơ hồ hoặc không có test, model mạnh chỉ có thể đoán tinh vi hơn.

## Vì sao context làm thay đổi chi phí?

Context gồm prompt, file, lịch sử, kết quả tool và hướng dẫn dự án. Task đọc nhiều file, giữ hội thoại dài hoặc chạy nhiều tool sẽ dùng nhiều hơn. Local và cloud cũng có thể có hạn mức khác nhau tùy gói.

Trong CLI, dùng:

```text
/status
```

Lệnh này hiển thị cấu hình phiên và phần hạn mức còn lại. Dùng `/model` để xem hoặc đổi model/reasoning. Kiểm tra [trang giá và hạn mức chính thức](https://learn.chatgpt.com/docs/pricing) vì các con số có thể thay đổi.

## Bài tập

Giao cùng một task sửa text cho model nhẹ và model cân bằng; ghi thời gian, số lượt hỏi và kết quả. Sau đó giao một bug khó hơn và giải thích vì sao đổi cấu hình.

## Checklist đạt bài

- [ ] Chọn cấu hình theo rủi ro và độ khó.
- [ ] Hiểu context không chỉ là độ dài prompt.
- [ ] Biết dùng `/status` và `/model`.
- [ ] Không coi hạn mức công bố là số cố định.
- [ ] Có dữ liệu trước khi nâng gói.

## Bước tiếp theo

Đã biết kiểm soát model, giờ mở rộng Codex bằng skills, plugins và MCP một cách có chọn lọc: [Skills, plugins và MCP →](15-codex-skills-plugins-mcp.md)
