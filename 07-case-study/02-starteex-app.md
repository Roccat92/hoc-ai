# StarteeX App: đưa app đặt in theo yêu cầu lên hai chợ ứng dụng

**Người chia sẻ:** Nguyễn Ngọc Thư - Startee / StarteeX (liên hệ: thunguyen@startee.vn)
**Thời gian thực hiện:** *(đang bổ sung)*
**Trình độ trước khi bắt đầu:** vận hành xưởng sản xuất, không xuất thân lập trình di động

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
| Supabase | *(đang bổ sung)* | Có bậc miễn phí |
| Gói AI dùng để code | *(đang bổ sung)* | Xem [chi phí các gói Claude](../02-code-voi-ai/08-chi-phi-cac-goi-claude.md) |
| **Tổng tới lúc lên được chợ** | *(đang bổ sung)* | |

Số VND ở trên đã gồm thuế và tự cập nhật theo tỉ giá - xem cách tính ở [bài chi phí](../02-code-voi-ai/08-chi-phi-cac-goi-claude.md). Chi tiết thủ tục đưa app lên hai chợ, kể cả mẹo xin mã D-U-N-S miễn phí thay vì mua qua trung gian, nằm ở [bài đưa app lên store](../11-ra-thi-truong/02-dua-app-len-store.md).

## Bài học rút ra

1. **Đặt AI vào đúng chỗ tắc, đừng rải đều.** Chỗ tắc ở đây là khâu chờ mockup và chờ trả lời, nên AI được đặt đúng vào hai chỗ đó. Gắn AI vào chỗ vốn đã chạy trơn thì chỉ tốn tiền.
2. **Một bộ mã cho hai hệ điều hành là lựa chọn của đội nhỏ.** Không phải vì nó "xịn hơn", mà vì đội ít người không kham nổi hai bản.
3. **Phí lên chợ là chi phí cố định phải tính trước.** Riêng phí Apple đã là khoản trả hàng năm, dừng trả thì app biến mất khỏi App Store - cần tính vào chi phí duy trì chứ không phải chi phí một lần.

*(Phần bài học sẽ được bổ sung thêm các chỗ bị Apple/Google từ chối duyệt và cách xử lý.)*

## Link

- Trang sản phẩm: [starteex.app](https://starteex.app)
- App Store / Google Play: *(đang bổ sung link trực tiếp)*
- Mã nguồn: không công khai

## Bước tiếp theo

Trợ lý AI trong app này là một agent biết gọi công cụ, không phải chatbot trả lời suông: [NEXA](03-nexa-agent.md)
