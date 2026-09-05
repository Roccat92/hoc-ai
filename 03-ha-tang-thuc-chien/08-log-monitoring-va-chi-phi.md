# Log, monitoring và cảnh báo chi phí

Bài này dành cho người đã đưa sản phẩm lên production và muốn biết lỗi ngay khi nó xảy ra, thay vì đợi người dùng nhắn tin than phiền. Học xong bạn sẽ biết log cần ghi gì, cách dò lỗi qua log thật, và cách tự bảo vệ mình khỏi hóa đơn hạ tầng bất ngờ.

## Log phải trả lời được bốn câu hỏi

Một log tốt giúp bạn trả lời ngay: **request nào lỗi, lúc nào, phiên bản nào, mã lỗi gì.** Thiếu một trong bốn, bạn sẽ phải đoán hoặc hỏi lại người dùng "lúc đó bạn làm gì" - vừa chậm vừa không đáng tin.

```text
[2026-09-05T14:32:10Z] ERROR request_id=a1b2c3 route=POST /api/orders status=500
  message: "khong ket noi duoc database"
```

Ví dụ trên có đủ bốn phần: thời gian, `request_id` để tra lại đúng request đó nếu cần, route/hành động đang làm, và mã lỗi cùng thông điệp ngắn gọn.

**Tuyệt đối không log:** API key, mật khẩu (kể cả đã hash), cookie/token phiên đăng nhập, hoặc toàn bộ nội dung riêng tư của người dùng (số điện thoại, địa chỉ, nội dung tin nhắn). Log thường được lưu lâu và nhiều người trong team có thể xem được - log chính là một trong những nơi rò rỉ dữ liệu phổ biến nhất mà ít người để ý.

## Monitoring tối thiểu

Ba lớp giám sát cơ bản, làm được lớp nào cũng đáng, không cần làm hết cùng lúc:

1. **Uptime check:** một dịch vụ bên ngoài định kỳ gọi thử trang của bạn (ví dụ mỗi 5 phút), báo ngay nếu không trả lời - để bạn biết web sập trước khi khách hàng báo.
2. **Error tracking:** gom log lỗi lại một chỗ dễ xem thay vì phải soi qua terminal hay dashboard nhà cung cấp mỗi lần nghi ngờ có sự cố.
3. **Cảnh báo lỗi tăng đột biến:** so với ngày thường, nếu số lỗi tăng vọt trong thời gian ngắn, có gì đó vừa bị hỏng (thường là sau một lần deploy).

Nhiều nhà cung cấp deploy miễn phí (xem lại [deploy miễn phí](03-deploy-mien-phi.md)) đã có sẵn dashboard xem log và lỗi cơ bản không cần cài thêm gì - bắt đầu bằng việc mở đúng dashboard đó và làm quen trước khi tìm thêm công cụ ngoài.

## Cảnh báo chi phí - đừng để hóa đơn là nơi bạn phát hiện ra sự cố

Một vòng lặp AI chạy hỏng, một lỗi khiến hàm chạy vô hạn, hoặc một request bị tấn công lặp lại đều có thể đội chi phí lên bất ngờ trước khi bạn kịp nhận ra. Hầu hết nhà cung cấp cloud (VPS, hosting, API AI) đều có mục cài đặt "billing alert"/"budget alert" trong phần thanh toán của dashboard - đặt một ngưỡng chi tiêu và để nó gửi email cảnh báo khi vượt ngưỡng. Tên gọi và vị trí chính xác khác nhau theo từng nhà cung cấp và có thể đổi theo thời gian, luôn tìm đúng mục "billing"/"usage"/"budget" trong dashboard nhà cung cấp bạn đang dùng.

Với API tính theo lượng dùng (như API LLM ở [phần 04](../04-build-ung-dung-ai/01-goi-api-llm.md)), đặt ngưỡng cảnh báo **trước khi** đưa tính năng ra cho người dùng thật, không phải sau khi thấy hóa đơn.

## Bài tập

Với một dự án đang chạy: (1) thêm log có đủ bốn phần ở trên cho ít nhất một route quan trọng, (2) đăng ký một dịch vụ uptime check miễn phí và trỏ vào trang của bạn, (3) vào dashboard của nhà cung cấp hạ tầng/AI đang dùng, tìm và bật thử một cảnh báo chi phí.

## Checklist đạt bài

- [ ] Log của bạn trả lời được đủ bốn câu hỏi: request nào, lúc nào, phiên bản nào, lỗi gì.
- [ ] Biết chắc log không chứa secret, mật khẩu hay dữ liệu riêng tư của người dùng.
- [ ] Có ít nhất một hình thức theo dõi uptime hoặc lỗi tự động, không phải tự kiểm tra bằng tay.
- [ ] Đã tìm và bật thử một cảnh báo chi phí trên ít nhất một dịch vụ đang dùng.
- [ ] Biết nơi cần tìm ("billing"/"usage") khi muốn kiểm tra chi phí trên một nhà cung cấp mới.

## Bước tiếp theo

Đã có đủ nền tảng hạ tầng - từ deploy web tới database, CI/CD và giám sát, giờ bắt tay build ứng dụng AI thật: [Gọi API Claude/OpenAI/Gemini bằng code →](../04-build-ung-dung-ai/01-goi-api-llm.md)
