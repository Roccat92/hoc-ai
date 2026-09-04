# Checklist bảo mật trước khi public

Bài này dành cho người sắp cho người khác (không chỉ riêng mình) dùng sản phẩm vừa build - dù chỉ là chia sẻ link cho vài người bạn dùng thử. Học xong bạn sẽ có một checklist tick được, ở mức **"đủ an toàn để public"** - không phải một giáo trình bảo mật đầy đủ, chỉ là những lỗi phổ biến nhất mà người mới hay bỏ sót, gây hậu quả thật (mất tiền, lộ dữ liệu người dùng).

## Vì sao cần checklist riêng, không lồng vào phần deploy?

Ở [phần 3](../03-ha-tang-thuc-chien/) bạn đã học cách đưa sản phẩm lên internet - nhưng "chạy được" và "an toàn để chạy" là hai chuyện khác nhau. Sản phẩm chạy tốt vẫn có thể rò rỉ API key, vẫn có thể bị bot spam form liên tục, vẫn có thể mất sạch dữ liệu nếu không backup. Năm bài trong phần này xử lý đúng năm điểm hay bị bỏ sót đó.

## Checklist

| # | Hạng mục | Vì sao quan trọng | Xem chi tiết |
|---|---|---|---|
| 1 | ☐ Trang web có HTTPS/SSL (ổ khóa trên trình duyệt) | Không có, dữ liệu người dùng gửi đi (mật khẩu, thông tin cá nhân) có thể bị nghe lén giữa đường | [SSL và HTTPS](02-ssl-va-https.md) |
| 2 | ☐ API key/secret không nằm trong code đẩy lên GitHub | Lộ key = người lạ dùng chùa, tính phí vào tài khoản bạn, hoặc lạm dụng dịch vụ | [Giấu API key và secret](03-giau-api-key-va-secret.md) |
| 3 | ☐ Form công khai (liên hệ, đăng ký) có chặn bot/spam | Không chặn, sớm muộn form ngập tin rác, có khi bị lợi dụng gửi spam qua email của bạn | [Chống bot và spam](04-chong-bot-va-spam.md) |
| 4 | ☐ Đăng nhập dùng thư viện/dịch vụ chuẩn, không tự chế | Tự chế mã hóa mật khẩu sai cách là một trong những lỗi bảo mật nghiêm trọng nhất | [Đăng nhập và mật khẩu](05-dang-nhap-va-mat-khau.md) |
| 5 | ☐ Dữ liệu có được backup định kỳ | Xóa nhầm, server hỏng, bị tấn công - không backup nghĩa là mất vĩnh viễn | Xem mục "Backup dữ liệu" bên dưới |

Tick được cả 5 dòng thì sản phẩm của bạn đã ở mức an toàn hợp lý để cho người ngoài dùng thử. Đây **không phải danh sách đầy đủ mọi rủi ro bảo mật có thể có** - với sản phẩm đụng tới tiền thật hoặc dữ liệu nhạy cảm, xem thêm lưu ý ở [bài cuối phần này](06-nho-ai-ra-soat-bao-mat.md).

## Backup dữ liệu

Không có bài riêng cho mục này vì cách làm khá đơn giản, tùy nơi bạn lưu dữ liệu:

- **Dùng dịch vụ database có sẵn** (Supabase, PlanetScale, MongoDB Atlas...) - phần lớn đã tự động backup định kỳ ở gói miễn phí hoặc gói trả phí thấp nhất, kiểm tra tài liệu của dịch vụ bạn dùng để bật tính năng này.
- **Tự quản lý database trên VPS** (như đã học ở [phần 3](../03-ha-tang-thuc-chien/01-thue-vps.md)) - cần tự đặt lịch backup, ví dụ dùng `cron` (lịch chạy lệnh tự động trên Linux) để tự động sao lưu file database ra một nơi khác (một VPS khác, hoặc dịch vụ lưu trữ đám mây) mỗi ngày. Nhờ Claude Code viết script backup và hướng dẫn đặt lịch `cron` là cách nhanh nhất nếu bạn chưa quen.
- **Nguyên tắc tối thiểu:** ít nhất có một bản sao dữ liệu **không nằm trên cùng server** với bản chính - nếu server chính gặp sự cố, bản sao vẫn còn.

## Bước tiếp theo

Bắt đầu từ hạng mục đầu tiên trong checklist: [SSL và HTTPS](02-ssl-va-https.md)
