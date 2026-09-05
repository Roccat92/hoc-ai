# Chọn model, reasoning và hạn mức khi dùng coding agent

Bài này dành cho người dùng Codex hoặc Claude Code nhưng không hiểu vì sao hai task tương tự tiêu hao khác nhau. Học xong bạn sẽ chọn cấu hình dựa trên rủi ro, hiểu context và biết xem số liệu sử dụng - ở cả hai công cụ.

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

Lệnh này hiển thị cấu hình phiên và phần hạn mức còn lại. Khi xem, chú ý ba thứ: **model/reasoning đang dùng** (có đúng mức bạn định không), **phần hạn mức còn lại** trong cửa sổ tính (thường theo giờ và theo tuần), và **gói tài khoản** đang áp. Dùng `/model` để xem hoặc đổi model/reasoning ngay trong phiên. Tên cờ và bố cục màn hình có thể đổi theo phiên bản - nếu không thấy lệnh, gõ `/help` để xem danh sách hiện có thay vì đoán.

**Ở Claude Code:** cũng có lệnh `/model` để xem và đổi model ngay trong phiên (ví dụ chuyển giữa Sonnet, Opus, Haiku tùy độ khó việc), và `/cost` để xem chi phí phiên hiện tại. Nguyên tắc chọn ở đầu bài này giữ nguyên: việc nhỏ dùng model nhẹ, việc khó/rủi ro cao mới cần model mạnh nhất - đừng mặc định dùng model mạnh nhất cho mọi việc chỉ vì "chắc ăn hơn". Gõ `/help` nếu không thấy lệnh, vì tên và danh sách lệnh có thể đổi theo phiên bản.

## Hạn mức và tiền: đừng đoán

Hạn mức Codex đi kèm gói ChatGPT (Free/Go/Plus/Pro 5x/Pro 20x); hạn mức Claude Code đi kèm gói Claude (Free/Pro/Max 5x/Max 20x) - cả hai đều có cùng một cái bẫy đặt tên: "5x" và "20x" chỉ khác nhau ở lượng hạn mức, không phải model xịn hơn. Bảng giá VND đầy đủ (tự cập nhật theo tỉ giá) nằm ở [chi phí các gói Codex](09-chi-phi-cac-goi-codex.md) và [chi phí các gói Claude](08-chi-phi-cac-goi-claude.md); mốc khởi đầu hợp lý cho cả hai thường là gói giữa (Plus hoặc Pro), khoảng 20 USD <Vnd usd="20" />/tháng. Con số hạn mức công bố thay đổi khá nhanh - luôn xem trang giá chính thức của công cụ bạn dùng trước khi trả tiền.

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
