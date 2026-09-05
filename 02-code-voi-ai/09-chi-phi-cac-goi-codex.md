# Chi phí và các gói Codex: dùng gói ChatGPT hay API key?

Bài này dành cho người đã dùng thử Codex và đang cân nhắc có nên trả tiền hay không, trả theo gói ChatGPT hay dùng API key. Học xong bạn sẽ biết Codex nằm trong những gói nào, hạn mức được tính ra sao, khi nào nên mua thêm credits, và chọn được cách trả tiền hợp với cách làm việc của mình.

> **Nguồn và ngày kiểm chứng:** các con số trong bài được đối chiếu với [trang giá Codex chính thức của OpenAI](https://learn.chatgpt.com/docs/pricing) ngày **05/09/2026**. Giá, hạn mức và tính năng có thể thay đổi; hãy kiểm tra lại trang chính thức trước khi thanh toán.

## Codex không bán một gói thuê bao riêng

Codex hiện được đi kèm các gói **ChatGPT Free, Go, Plus, Pro, Business, Edu và Enterprise**. Bạn trả tiền cho gói ChatGPT rồi dùng Codex trong hạn mức của gói đó.

Có một chi tiết dễ bỏ sót: **ChatGPT Work và Codex dùng chung hạn mức**. Nếu bạn dùng ChatGPT Work nhiều, phần dung lượng còn lại cho Codex cũng giảm, và ngược lại. Đây không phải hai chiếc ví độc lập.

## Hai cách trả tiền, đừng nhầm

| Cách | Trả thế nào | Hợp với ai |
|---|---|---|
| **Đăng nhập bằng tài khoản ChatGPT** | Trả cố định theo tháng, dùng trong hạn mức của Free, Go, Plus, Pro hoặc gói tổ chức | Người làm việc trực tiếp với Codex trên desktop, web, CLI hoặc IDE |
| **Đăng nhập bằng API key** | Trả theo lượng token thực tế đã dùng | Tự động hóa, chạy trong CI, script dùng chung hoặc cần tách chi phí theo dự án |

Hai khoản này **không phải một**. Có ChatGPT Plus không đồng nghĩa tài khoản API của bạn có sẵn tiền; ngược lại, nạp tiền API cũng không mở khóa đầy đủ các tính năng cloud của gói ChatGPT.

API key dùng được với Codex CLI, SDK và tiện ích IDE, nhưng không có các tính năng chạy trên cloud như tự động review GitHub hay tích hợp Slack. Nếu chỉ ngồi làm dự án cá nhân với Codex, đăng nhập bằng tài khoản ChatGPT thường dễ quản lý chi phí hơn.

## Các gói cho cá nhân

<TyGia />

| Gói | Giá theo tháng | Phù hợp nhất với | Điểm cần nhớ |
|---|---|---|---|
| **Free** | 0đ | Thử Codex với vài việc code nhanh | Có hạn mức nhỏ, chưa cần thẻ |
| **Go** | 8 USD <Vnd usd="8" /> | Việc nhẹ, không dùng liên tục | Rẻ hơn Plus nhưng dung lượng thấp hơn |
| **Plus** | 20 USD <Vnd usd="20" /> | Vài phiên code tập trung mỗi tuần | Mốc hợp lý nhất để bắt đầu làm dự án thật |
| **Pro 5x** | 100 USD <Vnd usd="100" /> | Dùng Codex hằng ngày, thường xuyên chạm trần Plus | Hạn mức Codex gấp 5 lần Plus |
| **Pro 20x** | 200 USD <Vnd usd="200" /> | Làm việc cường độ rất cao hoặc nhiều luồng song song | Hạn mức Codex gấp 20 lần Plus |

Các số trên là giá niêm yết bằng USD. Con số VND là ước tính để bạn dễ hình dung; số tiền ngân hàng trừ thực tế còn phụ thuộc thuế, tỉ giá và phí chuyển đổi ngoại tệ.

**Lời khuyên thẳng:** nếu mới học, hãy dùng Free trước rồi lên Plus khi bắt đầu làm dự án thật. Đừng mua Pro chỉ vì sợ thiếu. Hãy dùng Plus một thời gian, theo dõi lúc nào và vì loại việc gì bạn chạm hạn mức, rồi mới quyết định nâng gói.

## Các gói cho nhóm

| Gói | Giá theo tháng | Ghi chú |
|---|---|---|
| **Business - trả năm** | 20 USD/người <Vnd usd="20" /> | Tối thiểu 2 người, thanh toán theo năm |
| **Business - trả tháng** | 25 USD/người <Vnd usd="25" /> | Linh hoạt hơn, có không gian làm việc và quản trị tập trung |
| **Enterprise / Edu** | Liên hệ OpenAI | Dành cho tổ chức cần kiểm soát, bảo mật và quản trị nâng cao |

Business đáng cân nhắc khi nhóm cần quản lý thành viên, SAML SSO, MFA và chính sách dữ liệu tập trung. Nếu chỉ có hai người cùng học nhưng không cần quản trị chung, mỗi người dùng tài khoản cá nhân thường đơn giản hơn.

## Hạn mức thật sự hoạt động thế nào

Codex không trừ một lượng cố định cho mỗi tin nhắn. Cùng một câu hỏi nhưng mức dùng có thể khác nhau vì còn phụ thuộc vào:

- Model bạn chọn.
- Kích thước dự án và lượng file Codex phải đọc.
- Độ dài lịch sử của task.
- Mức suy luận, số công cụ và nguồn dữ liệu được dùng.
- Chạy tại máy hay trên cloud.

OpenAI công bố khoảng ước tính cho **số tin nhắn local trong mỗi 5 giờ**, không phải lời hứa về một con số cố định. Ví dụ ở thời điểm bài viết được kiểm chứng:

| Model | Plus | Pro 5x | Pro 20x |
|---|---:|---:|---:|
| **GPT-5.6 Sol** | 10-100 | 50-500 | 200-2.000 |
| **GPT-5.6 Terra** | 25-200 | 125-1.000 | 500-4.000 |
| **GPT-5.6 Luna** | 250-2.000 | 1.250-10.000 | 5.000-40.000 |

Khoảng dao động rất rộng chính là điều quan trọng: một yêu cầu nhỏ có thể chỉ tốn một phần rất nhỏ hạn mức, còn một task dài phải đọc cả dự án và chạy nhiều công cụ sẽ tốn hơn nhiều. **Đừng lấy số tin nhắn tối đa trong bảng làm cam kết.** Hạn mức tuần cũng có thể áp dụng, và local cùng cloud dùng chung dung lượng của gói.

## Ba model, ba mức tiêu hao

- **Sol** dành cho bài toán khó, nhiều mơ hồ hoặc cần suy luận sâu. Chất lượng cao nhưng dùng hạn mức nhanh nhất trong ba model GPT-5.6.
- **Terra** là lựa chọn cân bằng cho phần lớn việc code và công việc hằng ngày.
- **Luna** nhanh, tiết kiệm, hợp với việc nhỏ, lặp lại nhiều hoặc có phạm vi rõ.

Không phải việc nào cũng cần model mạnh nhất. Sửa một dòng chữ, đổi tên biến hoặc viết test đơn giản bằng Sol thường là tiêu tiền vào chỗ không tạo thêm nhiều giá trị.

## Credits là gì?

Gói thuê bao cho bạn một lượng sử dụng đi kèm. Khi chạm hạn mức, người dùng Plus và Pro có thể mua **ChatGPT credits** để làm tiếp mà chưa cần nâng gói.

Credits không phải số tin nhắn. Mỗi lượt dùng bao nhiêu credits còn tùy model, token đầu vào, token đã được lưu đệm, đầu ra và chế độ tốc độ. OpenAI hiện cho biết một tin nhắn với dòng GPT-5.6 trung bình có thể dùng khoảng **5-30 credits**, nhưng một task thực tế có thể nằm ngoài khoảng đó.

Vì giá mua credits và mức tiêu hao có thể đổi, cách an toàn là xem trực tiếp trong tài khoản tại thời điểm mua. Nếu tháng nào bạn cũng phải mua thêm nhiều credits, nâng gói có thể kinh tế hơn; nếu chỉ thiếu vào một tuần cao điểm, mua thêm credits có thể hợp lý hơn trả gói cao quanh năm.

## Khi nào nên dùng API key?

API key hợp lý khi bạn cần:

- Chạy Codex trong CI hoặc một môi trường tự động dùng chung.
- Gọi Codex từ script hoặc SDK thay vì ngồi tương tác trực tiếp.
- Theo dõi và tách chi phí theo dự án bằng lượng token thực tế.
- Tiếp tục chạy local sau khi đã hết hạn mức gói ChatGPT.

API key lại kém phù hợp nếu mục tiêu của bạn là có một khoản chi cố định dễ đoán hoặc cần Codex cloud, review GitHub tự động và các tích hợp cloud. Giá API phụ thuộc model và token, nên một tác vụ đọc nhiều file hoặc sinh đầu ra dài có thể tốn hơn bạn đoán. Xem cách tính ở bài [Gọi API LLM](../04-build-ung-dung-ai/01-goi-api-llm.md).

## Chọn gói nào

| Bạn là | Nên bắt đầu từ | Khi nào đổi |
|---|---|---|
| Mới học, muốn thử xem có hợp không | **Free** | Lên Plus khi bắt đầu làm dự án thật |
| Chỉ làm vài việc nhẹ mỗi tuần | **Go** | Lên Plus khi thường xuyên thiếu hạn mức hoặc cần phiên làm tập trung |
| Làm dự án cá nhân vài buổi mỗi tuần | **Plus** | Lên Pro 5x khi thường xuyên chạm trần và đã tối ưu cách dùng |
| Dùng Codex gần như mỗi ngày | **Pro 5x** | Lên Pro 20x khi số liệu sử dụng thật cho thấy 5x vẫn thiếu |
| Làm việc cường độ rất cao, nhiều task song song | **Pro 20x** | Mua thêm credits khi chỉ thiếu ngắn hạn |
| Chạy CI, script hoặc tự động hóa dùng chung | **API key** | Đặt ngân sách và cảnh báo chi tiêu trong trang API |
| Nhóm cần quản trị và chính sách dữ liệu chung | **Business** | Hỏi Enterprise khi cần kiểm soát cấp tổ chức |

Quy tắc đơn giản là: **gói tháng cho người ngồi làm việc với Codex; API cho hệ thống tự chạy Codex**. Có trường hợp dùng cả hai, nhưng người mới hiếm khi cần làm vậy ngay từ đầu.

## Cách kéo dài hạn mức và giảm chi phí

- **Chọn model vừa đủ.** Dùng Luna cho việc nhỏ, Terra cho phần lớn việc thường ngày, chỉ chuyển sang Sol khi bài toán thật sự khó.
- **Thu hẹp phạm vi.** Nói rõ file nào cần sửa, đầu ra cần gì và điều gì nằm ngoài phạm vi. Codex đọc ít ngữ cảnh hơn thì thường dùng ít hạn mức hơn.
- **Tách task khi đổi việc.** Một task đã tích lũy lịch sử dài sẽ phải mang nhiều ngữ cảnh vào lượt sau. Xong một việc thì mở task mới cho việc không liên quan.
- **Giữ `AGENTS.md` gọn và đặt đúng thư mục.** Chỉ đưa vào các quy tắc thật sự cần cho phần dự án đó.
- **Tắt MCP hoặc kết nối không dùng tới.** Mỗi máy chủ thêm vào đều có thể làm tăng lượng ngữ cảnh.
- **Tránh chế độ nhanh nếu không cần.** Fast mode dùng credits nhanh hơn để đổi lấy tốc độ.
- **Kiểm tra số liệu định kỳ.** Đừng nâng gói chỉ vì một ngày dùng nhiều bất thường.

Trong một phiên Codex CLI đang chạy, nhập:

```text
/status
```

Lệnh `/status` hiển thị cấu hình của phiên hiện tại và phần hạn mức còn lại. Bạn cũng có thể xem [usage dashboard](https://chatgpt.com/codex/settings/usage) để kiểm tra giới hạn và thời điểm làm mới. OpenAI khuyên xem lại mỗi một đến hai tuần để biết nhịp dùng thật của mình.

## Vài lưu ý khi thanh toán từ Việt Nam

- OpenAI niêm yết bằng **USD**, nên bạn cần phương thức thanh toán quốc tế được hỗ trợ.
- Số tiền thực trả có thể gồm thuế áp dụng tại Việt Nam, chênh lệch tỉ giá và phí chuyển đổi ngoại tệ của ngân hàng.
- Thẻ ghi nợ quốc tế giúp dễ kiểm soát hơn: chỉ nạp số tiền cần dùng và bật thông báo giao dịch.
- Đừng mua tài khoản dựng sẵn hoặc tài khoản dùng chung. Bạn có thể mất quyền truy cập, lịch sử task và cả code đã đưa vào tài khoản đó.
- Không đưa API key cho người bán hộ, không dán key vào source code và không commit key lên GitHub. Xem [Giấu API key và secret](../10-bao-mat/03-giau-api-key-va-secret.md).

Giá và hạn mức của Codex thay đổi khá nhanh. Trước khi trả tiền, hãy mở lại [OpenAI Docs - Pricing](https://learn.chatgpt.com/docs/pricing), xem đúng gói đang hiện trong tài khoản và kiểm tra số tiền cuối cùng ở bước thanh toán.

## Bước tiếp theo

Bạn đã biết Claude và Codex tốn bao nhiêu, nên chọn gói nào và khi nào cần API. Giờ tới lúc đưa sản phẩm ra khỏi máy mình để người khác truy cập được: [Hạ tầng thực chiến →](../03-ha-tang-thuc-chien/01-thue-vps.md)
