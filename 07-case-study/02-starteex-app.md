# StarteeX App: đưa app đặt in theo yêu cầu lên hai chợ ứng dụng

**Người chia sẻ:** Nguyễn Ngọc Thư - Startee / StarteeX (liên hệ: thunguyen@startee.vn)
**Thời gian thực hiện:** cả **hệ sinh thái StarteeX** - app di động, trợ lý [NEXA](03-nexa-agent.md), hệ quản trị admin, web landing [starteex.app](https://starteex.app), và [Mockup Studio](04-mockup-studio.md) - build trong khoảng 2 tháng: **~1 tháng dùng gói [Claude Pro](../phu-luc-cong-cu/claude-code/02-chi-phi-cac-goi.md), rồi ~1 tháng gói Claude Max 5x**.
**Trình độ trước khi bắt đầu:** vận hành xưởng sản xuất, không xuất thân lập trình di động

> **Vẫn đang update thường xuyên.** Đây không phải dự án "làm xong để đó" - hai tháng ở trên là tới lúc chạy được thật, sau đó vẫn thêm tính năng và fix bug đều (hiện làm bằng gói Max 5x). Nhiều phần dùng thêm Codex/ChatGPT Pro để phản biện phương án và làm assets.
>
> Con số "1 tháng Pro + 1 tháng Max 5x" là chi phí AI **chung cho cả hệ sinh thái** - không phải mỗi sản phẩm con một gói riêng. Vì vậy các case study NEXA và Mockup Studio không cộng thêm tiền gói AI của riêng chúng.

> Sản phẩm đang chạy thật tại [starteex.app](https://starteex.app).

## Dự án làm gì?

StarteeX là app đặt in quần áo theo yêu cầu: khách mang ý tưởng vào, xem thử ngay trên ảnh của chính mình, đặt hàng, rồi theo dõi tới lúc nhận. Hàng được in tại xưởng của chính mình ở Hà Nội, giao toàn quốc trong 3-5 ngày làm việc.

Sản phẩm nhận in: áo phông, polo, túi tote, áo nỉ, hoodie - hơn 30 màu vải, size trẻ em tới 3XL, in được mặt trước, mặt sau và tay áo.

## Vấn đề thật muốn giải

Quy trình đặt in theo yêu cầu kiểu cũ rất tốn công cho cả hai bên: khách nhắn tin hỏi giá, chờ thiết kế viên rảnh, chờ mockup, sửa tới sửa lui. Một đơn nhóm có thể mất **ba ngày và hơn một trăm tin nhắn** mới chốt được.

Phần lớn thời gian đó không phải thời gian làm việc thật, mà là thời gian **chờ nhau**. Đây là loại việc mà phần mềm và AI xử lý được gọn.

## Cách AI nằm trong sản phẩm

Đây là điểm đáng học nhất với người đọc repo này: AI ở đây **không phải là một cái chatbot gắn thêm cho có**, mà nằm đúng chỗ tắc nghẽn của quy trình.

- **Xem thử trên ảnh của chính khách.** Khách gửi một tấm ảnh, hệ thống ghép áo có thiết kế lên người khách. Khách chỉ in khi đã thấy ưng, nên bớt hẳn khâu đoán mò và bớt hàng in ra rồi bỏ.
- **Tách nền ảnh thiết kế** để đưa lên áo, làm ngay không cần chờ thiết kế viên.
- **Trợ lý NEXA trả lời báo giá, tư vấn size, tra trạng thái đơn** 24/7 và nhớ được khách đã đặt gì trước đó. Phần này có [case study riêng](03-nexa-agent.md).

## Công nghệ đã dùng

| Phần | Dùng gì |
|---|---|
| App di động | React Native + Expo (một bộ mã cho cả iPhone và Android) |
| Cơ sở dữ liệu, đăng nhập, lưu file | Supabase |
| Xưởng in | Hệ thống vận hành riêng, xem [case study TIDOGO](01-tidogo-print-os.md) |

Chọn React Native + Expo để **viết một lần chạy được cả hai hệ điều hành** - với đội nhỏ thì đây là khác biệt sống còn, vì viết riêng cho iOS rồi lại viết riêng cho Android là nhân đôi khối lượng việc.

## Chi phí thực tế (VND)

Hai khoản dưới đây là **phí bắt buộc của chính hai hãng**, ai đưa app lên chợ cũng phải trả, không tránh được:

| Khoản | Chi phí | Ghi chú |
|---|---|---|
| Apple Developer Program | 99 USD/năm <Vnd usd="99" sau="/năm" /> | Trả lại hàng năm, ngừng trả là app bị gỡ |
| Google Play Console | 25 USD một lần <Vnd usd="25" /> | Trả một lần duy nhất |
| Expo (build app di động) | 20 USD/tháng <Vnd usd="20" sau="/tháng" /> | Dùng trong giai đoạn build và phát hành |
| Supabase | 0đ | Dùng bậc miễn phí |
| Vercel, GitHub | 0đ | Dùng bậc miễn phí |
| Gói AI để build cả hệ sinh thái | 1 tháng Claude Pro <Vnd usd="20" /> + 1 tháng Max 5x <Vnd usd="100" /> | Dùng chung cho app, NEXA, admin, web, mockup - xem [chi phí các gói Claude](../phu-luc-cong-cu/claude-code/02-chi-phi-cac-goi.md) |
| API cho trợ lý NEXA | phát sinh theo lượng dùng | Tính theo tin nhắn thật, xem [case study NEXA](03-nexa-agent.md) |
| Codex/ChatGPT Pro | phát sinh theo dùng | Phản biện phương án, làm assets |

Số VND ở trên đã gồm thuế và tự cập nhật theo tỉ giá - xem cách tính ở [bài chi phí](../phu-luc-cong-cu/claude-code/02-chi-phi-cac-goi.md). Chi tiết thủ tục đưa app lên hai chợ, kể cả mẹo xin mã D-U-N-S miễn phí thay vì mua qua trung gian, nằm ở [bài đưa app lên store](../11-ra-thi-truong/02-dua-app-len-store.md).

Điểm đáng chú ý về chi phí: **cơ sở dữ liệu, hạ tầng web và lưu mã nguồn đều chạy ở bậc miễn phí**. Khoản bắt buộc trả tiền chỉ có phí hai chợ ứng dụng, Expo trong lúc build, gói AI, và tiền API cho chatbot tính theo dùng.

## Bài học rút ra

1. **Đặt AI vào đúng chỗ tắc, đừng rải đều.** Chỗ tắc ở đây là khâu chờ mockup và chờ trả lời, nên AI được đặt đúng vào hai chỗ đó. Gắn AI vào chỗ vốn đã chạy trơn thì chỉ tốn tiền.
2. **Một bộ mã cho hai hệ điều hành là lựa chọn của đội nhỏ.** Không phải vì nó "xịn hơn", mà vì đội ít người không kham nổi hai bản.
3. **Phí lên chợ là chi phí cố định phải tính trước.** Riêng phí Apple đã là khoản trả hàng năm, dừng trả thì app biến mất khỏi App Store - cần tính vào chi phí duy trì chứ không phải chi phí một lần.

4. **Apple duyệt kỹ hơn tưởng tượng, Google Play thì chậm chứ không khó.** Bị Apple từ chối vì thiếu chế độ dùng thử không cần đăng ký, vì chưa khai rõ dữ liệu chat gửi cho nhà cung cấp AI nào, và vì một tính năng "trông có vẻ" chưa xong dù chạy đúng. Chi tiết từng lý do và cách xử lý ở [checklist trong bài đưa app lên store](../11-ra-thi-truong/02-dua-app-len-store.md#ly-do-bi-apple-tu-choi-checklist-rut-tu-trai-nghiem-that).

## Link

- Trang sản phẩm: [starteex.app](https://starteex.app)
- [App Store](https://apps.apple.com/vn/app/starteex/id6788760618) / [Google Play](https://play.google.com/store/apps/details?id=com.starteex.app)
- Mã nguồn: không công khai

## Bước tiếp theo

Trợ lý AI trong app này là một agent biết gọi công cụ, không phải chatbot trả lời suông: [NEXA](03-nexa-agent.md)
