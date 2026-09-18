# Chi phí và các gói khi dùng Grok Bot

Bài này dành cho người đã mở được Grok Bot và muốn biết mình đang trả tiền theo kiểu gì trước khi giao việc nặng (agent chạy lâu, nhiều connector, Computer luôn bật). Học xong bạn sẽ phân biệt được thuê bao / usage / on-demand, biết chỗ xem hạn mức trong app, và tránh vài bẫy chi phí phổ biến.

## Nhắc lại: tiền của model và tiền của Bot

- **Grok AI (model/chat/API):** có thể tính theo gói chat xAI hoặc theo token API nếu bạn gọi model từ code - xem thêm tư duy API ở [gọi API LLM](../../04-build-ung-dung-ai/01-goi-api-llm.md).
- **Grok Bot (app agent):** thường đi theo **plan / usage của hệ Cursor** trong Settings - Usage & Billing. Bạn trả cho quyền dùng agent, Computer, connector và lượt chạy - không phải lúc nào cũng cùng một hóa đơn với chat Grok AI trên web.

Đừng cộng hai lớp này thành một dòng "giá Grok" duy nhất. Hết hạn mức Bot không có nghĩa chat Grok AI trên web cũng hết, và ngược lại - tùy sản phẩm và tài khoản bạn đang dùng.

## Ba lớp tiền thường gặp với Grok Bot

Cách tính tiền **đổi theo thời gian và theo tài khoản**. Luôn đối chiếu màn hình Usage trong app và trang giá chính thức; bảng dưới đây là **khung tư duy**, không phải bảng niêm yết cố định.

| Lớp | Thường là gì | Bạn thấy ở đâu |
|---|---|---|
| **Gói / plan** | Thuê bao tháng (hoặc trial) mở quyền dùng agent, model, hạn mức kèm | Settings - **Usage & Billing** - plan |
| **Usage kèm trong gói** | Hạn mức "đã trả trong gói" cho chat/agent | Usage & Billing - usage |
| **On-demand / vượt hạn** | Dùng tiếp sau khi hết hạn mức kèm, tính thêm | Usage & Billing - on-demand / billing |

Khác Claude Code (gói Claude.ai Pro/Max) và Codex (gói ChatGPT Plus/Pro...): với Grok Bot bạn theo dõi **usage agent + plan Cursor**, không phải bảng "5x/20x" của Anthropic.

## Chỗ cần mở trong app

Settings - tab **Usage & Billing** (tab này chỉ hiện khi tài khoản được bật billing):

- **usage** - đã dùng bao nhiêu so với hạn mức.
- **plan** - gói hiện tại, trial, đổi gói.
- **on-demand** - có cho phép vượt hạn không.
- **billing** - thẻ / hóa đơn.

Nếu không thấy tab: tài khoản có thể chưa bật billing trên bản build đó - dùng trang tài khoản trên web hoặc hỏi đúng kênh hỗ trợ sản phẩm, đừng đoán giá từ bài blog cũ.

## Việc gì "đốt" hạn mức nhanh

| Việc | Vì sao tốn |
|---|---|
| Agent vòng lặp dài (cài môi trường nặng, resolve package, rebuild liên tục) | Nhiều lượt tool + context dài |
| Ack / hỏi lại liên tục thay vì một brief rõ | Mỗi tin nhắn là một lượt tính tiền |
| Fan-out nhiều agent cùng một việc | Mỗi agent một phiên làm việc |
| Routine chạy dày (vài phút/lần) khi không cần | Chạy nền vẫn tốn khi có việc thật |
| Đính kèm / đọc corpus lớn không cắt bớt | Context phình |

**Mẹo thực tế:** giao việc bằng một brief đủ ràng buộc ("chỉ đọc", "chỉ sửa file A", "xong thì dừng"), tránh chuỗi "ok / tiếp / xem chưa" nếu chưa có kết quả. Đó là khác biệt lớn so với chat giải trí trên Grok AI.

## Chọn mức nào cho người học repo này

| Bạn là | Hướng bắt đầu |
|---|---|
| Mới thử agent desktop | Plan tối thiểu đủ mở Grok Bot + theo dõi usage một tuần |
| Làm dự án cá nhân vài buổi/tuần | Giữ on-demand tắt hoặc hạn chế; tối ưu brief trước khi nâng gói |
| Chạy routine + nhiều connector hàng ngày | Theo dõi usage tuần; nâng plan khi **thường xuyên** chạm trần giữa việc thật, không phải vì thử linh tinh |
| Build sản phẩm gọi API model riêng (kể cả API Grok) | Tách: Grok Bot để vận hành máy; API LLM riêng cho app - xem [gọi API LLM](../../04-build-ung-dung-ai/01-goi-api-llm.md) |

## Lưu ý thanh toán từ Việt Nam

- Giá niêm yết thường là USD; thẻ Việt Nam có thể cộng phí chuyển đổi / VAT tùy ngân hàng và bên bán.
- Dùng component quy đổi kiểu `<TyGia />` / `<Vnd />` trong repo này **không thay** số trên hóa đơn thật - luôn lấy số từ Usage & Billing / email hóa đơn.
- Trial: đọc kỹ ngày hết hạn và có bị tự chuyển sang trả phí không (Settings - plan / cancel-trial nếu có).

## Checklist

- [ ] Biết tiền Grok AI chat/API và tiền Grok Bot có thể là hai lớp khác nhau.
- [ ] Biết mở Usage & Billing trong Settings.
- [ ] Phân biệt được plan, usage kèm, on-demand.
- [ ] Biết việc nào làm tăng usage nhanh.
- [ ] Không lấy giá từ bài viết cũ làm số chắc chắn để trả tiền.

## Xem thêm

[Cài đặt và dùng cơ bản](01-cai-dat-va-lenh-co-ban.md) - [Cấu hình nâng cao](03-cau-hinh-nang-cao.md) - So sánh tư duy gói với [Claude](../claude-code/02-chi-phi-cac-goi.md) / [Codex](../codex/02-chi-phi-cac-goi.md)
