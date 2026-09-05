# Chi phí và các gói Claude: gói nào đáng tiền, và cái bẫy trong tên gọi "20x"

Bài này dành cho người đã dùng thử Claude và đang cân nhắc có nên trả tiền hay không, trả gói nào. Học xong bạn sẽ biết các gói hiện có và mức tiền quy ra VND, hiểu hạn mức sử dụng thật sự hoạt động thế nào (chỗ này khác hẳn với những gì tên gói gợi ý), và tự chọn được gói hợp với cách làm việc của mình thay vì mua theo cảm tính.

## Hai cách trả tiền, đừng nhầm

| Cách | Trả thế nào | Hợp với ai |
|---|---|---|
| **Gói thuê bao** (Free, Pro, Max, Team) | Trả cố định hàng tháng, dùng trong hạn mức của gói | Người ngồi làm việc trực tiếp với Claude: chat, code, thiết kế |
| **API trả theo dùng** | Trả đúng số token đã dùng, không có hạn mức tháng | Người viết ứng dụng gọi Claude từ code của mình - xem [gọi API LLM](../04-build-ung-dung-ai/01-goi-api-llm.md) |

Hai cách này tính tiền hoàn toàn khác nhau. Bài này nói về **gói thuê bao**. Nếu bạn đang build một ứng dụng có AI bên trong thì cái bạn cần là API, không phải gói thuê bao.

## Các gói cho cá nhân

<TyGia />

| Gói | Giá theo tháng | Trả cả năm (rẻ hơn) | Có gì đáng chú ý |
|---|---|---|---|
| **Free** | 0đ | - | Chat cơ bản, đủ để thử xem có hợp không. Không có Claude Code |
| **Pro** | 20 USD <Vnd usd="20" /> | 17 USD/tháng <Vnd usd="17" /> | Mốc quan trọng nhất: từ đây mới có **Claude Code**, Design, Cowork |
| **Max 5x** | 100 USD <Vnd usd="100" /> | - | Gấp 5 lần Pro trong mỗi phiên 5 giờ |
| **Max 20x** | 200 USD <Vnd usd="200" /> | - | Gấp 20 lần Pro trong mỗi phiên 5 giờ |

**Mốc đáng nhớ nhất là Pro.** Bản Free không có Claude Code, mà Claude Code lại là công cụ chính của toàn bộ repo này. Nếu bạn định đi theo lộ trình ở đây, Pro là mức tối thiểu để thực hành được đầy đủ.

## Các gói cho nhóm

| Gói | Giá theo tháng | Trả cả năm | Ghi chú |
|---|---|---|---|
| **Team - ghế thường** | 25 USD/người <Vnd usd="25" /> | 20 USD/người <Vnd usd="20" /> | Thêm quản lý thành viên, đăng nhập tập trung |
| **Team - ghế cao cấp** | 125 USD/người <Vnd usd="125" /> | 100 USD/người <Vnd usd="100" /> | Hạn mức gấp khoảng 5 lần ghế thường |
| **Enterprise** | 20 USD/ghế <Vnd usd="20" /> cộng tiền dùng tính theo giá API | Chỉ bán theo năm | Cho công ty cần nhật ký kiểm toán, tuân thủ |

Với nhóm nhỏ vài người ở Việt Nam, thường mỗi người mua Pro riêng vẫn đơn giản và rẻ hơn là mở gói Team, trừ khi bạn cần quản lý tập trung.

## Hạn mức thật sự hoạt động thế nào

Đây là phần ít người đọc kỹ trước khi trả tiền, và cũng là phần gây hụt hẫng nhiều nhất.

Mức dùng của bạn bị chặn bởi **hai loại hạn mức cùng lúc**:

1. **Hạn mức phiên 5 giờ.** Một "phiên" bắt đầu từ tin nhắn đầu tiên và kéo dài 5 giờ, hết 5 giờ thì làm mới. Đây là cái bạn hay chạm khi làm việc dồn dập một buổi.
2. **Hạn mức tuần.** Cộng dồn cả tuần, và thực ra là **hai vạch riêng biệt**: một vạch tính chung mọi model, một vạch riêng cho model Opus (model mạnh nhất, cũng tốn nhất). Chạm vạch Opus thì vạch chung vẫn còn, nghĩa là bạn vẫn tiếp tục làm việc được với Sonnet tới hết tuần.

Mẹo thực tế từ cách chia này: khi bị báo sắp hết hạn mức Opus, **đừng ngừng làm việc** - chuyển sang Sonnet là chạy tiếp được. Phần lớn việc code hàng ngày Sonnet làm tốt; để dành Opus cho lúc thật sự cần suy luận khó.

## Cái bẫy: "5x" và "20x" không phải là hạn mức tuần

Tên gói khiến ai cũng hiểu rằng Max 20x cho gấp 4 lần Max 5x. Trả gấp đôi tiền để được gấp 4 - nghe rất hời.

Sự thật là **con số 5x và 20x chỉ áp cho phiên 5 giờ**, không áp cho hạn mức tuần. Mà với người làm việc đều đặn cả tuần thì cái chặn thật lại thường là hạn mức tuần.

| Đi từ Max 5x lên Max 20x | Tăng bao nhiêu |
|---|---|
| Trong một phiên 5 giờ | Gấp 4 lần |
| Cộng dồn cả tuần | Khoảng 1,5 - 2 lần |
| Số tiền phải trả | Gấp 2 lần |

Nhiều người dùng cả hai gói phản ánh mức tăng theo tuần chỉ khoảng **1,7 lần**, và có người cho biết bộ phận hỗ trợ của Anthropic xác nhận con số này. Cần nói rõ: **đây là con số người dùng tự đo và thuật lại, không phải cam kết chính thức của hãng** - hãng không công bố hạn mức tuần bằng con số cụ thể. Bạn nên tự theo dõi mức dùng của mình thay vì tin vào một con số cố định.

Điều này không có nghĩa Max 20x là lừa đảo. Nó có nghĩa là: **hãy mua Max 20x nếu bạn hay chạm trần trong từng buổi làm việc dồn dập, chứ đừng mua vì tưởng cả tuần sẽ được gấp 4.**

## Chọn gói nào

| Bạn là | Nên bắt đầu từ | Khi nào nâng lên |
|---|---|---|
| Mới học, đang đọc repo này | **Free** rồi lên **Pro** | Ngay khi cần Claude Code để thực hành |
| Làm dự án cá nhân vài buổi/tuần | **Pro** | Khi tuần nào cũng bị chặn giữa chừng |
| Code gần như cả ngày, mỗi ngày | **Max 5x** | Khi thường xuyên hết hạn mức trong một buổi |
| Chạy nhiều việc song song, buổi làm rất dồn | **Max 20x** | Chỉ khi vấn đề của bạn là trần trong từng phiên |
| Đang build ứng dụng có AI bên trong | **API**, không phải gói thuê bao | - |

**Lời khuyên thẳng:** đừng nhảy vào Max ngay. Dùng Pro vài tuần trước, xem mình chạm trần bao nhiêu lần và chạm vào lúc nào. Nếu chạm trần vì làm dồn một buổi thì Max 5x giải quyết được; nếu chạm vì dùng đều cả tuần thì lên Max 20x cũng không thoải mái như bạn tưởng.

## Mẹo giảm chi phí

- **Dùng đúng model cho đúng việc.** Việc lặt vặt để Sonnet làm, để dành Opus cho việc khó.
- **Dọn hội thoại thường xuyên.** Hội thoại càng dài thì mỗi lượt càng tốn, vì toàn bộ lịch sử được gửi lại. Xong một việc thì `/clear` rồi bắt đầu việc mới.
- **Viết `CLAUDE.md` cho dự án.** Đỡ phải nhắc lại bối cảnh mỗi phiên, vừa nhanh vừa đỡ tốn - xem [bài 1](01-claude-code.md).
- **Chia việc nhỏ, kiểm tra sớm.** Một yêu cầu quá to thường phải làm lại nhiều lần, và mỗi lần làm lại đều tính tiền.
- **Trả theo năm nếu chắc chắn dùng lâu.** Pro trả năm rẻ hơn khoảng 15% so với trả tháng.

## Vài lưu ý khi thanh toán từ Việt Nam

- Anthropic thu tiền bằng **USD**, cần thẻ quốc tế (Visa/Mastercard, gồm cả thẻ ghi nợ quốc tế mà các ngân hàng trong nước đều phát hành được).
- Số tiền trừ thực tế có thể lệch chút so với bảng trên do **tỉ giá của ngân hàng** và **phí chuyển đổi ngoại tệ** (thường 1-4% tùy ngân hàng), chưa kể thuế nếu có.
- Số VND trong bài này được quy đổi tự động theo tỉ giá thị trường tại lúc bạn mở trang, nên nó là con số để ước lượng, không phải số ngân hàng sẽ trừ chính xác.

**Giá và hạn mức các gói thay đổi theo thời gian.** Luôn kiểm tra trực tiếp tại trang giá chính thức của Anthropic hoặc ngay trong tài khoản Claude của bạn trước khi trả tiền - đừng dựa vào con số cố định trong bất kỳ bài viết nào, kể cả bài này.

## Bước tiếp theo

Đã có công cụ và biết mình sẽ tốn bao nhiêu, giờ tới lúc đưa sản phẩm ra khỏi máy mình để người khác truy cập được: [Hạ tầng thực chiến →](../03-ha-tang-thuc-chien/01-thue-vps.md)
