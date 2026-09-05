# TIDOGO (Print OS): phần mềm quản lý sản xuất cho xưởng in

**Người chia sẻ:** Nguyễn Ngọc Thư - Startee / StarteeX (liên hệ: thunguyen@startee.vn)
**Thời gian thực hiện:** hơn 1 tháng, dùng gói [Claude Max 5x](../phu-luc-cong-cu/claude-code/02-chi-phi-cac-goi.md). Khoảng 2 tuần đầu mới ra được bản chạy tối thiểu (MVP), phần còn lại là hoàn thiện cho dùng thật.
**Trình độ trước khi bắt đầu:** 9 năm vận hành xưởng sản xuất theo yêu cầu, tự học lập trình để giải bài toán của chính mình

> **Cách làm:** dùng Claude Max 5x để build, kèm Codex/ChatGPT Pro để phản biện phương án và làm assets. Dùng hai AI phản biện chéo nhau là một cách hay để bớt sai - xem [chi phí các gói Codex](../phu-luc-cong-cu/codex/02-chi-phi-cac-goi.md). Tới giờ vẫn được thêm tính năng và fix bug đều, hiện làm bằng gói Max 5x.

> Case study này viết từ một sản phẩm **đang chạy thật** tại [tidogo.com](https://tidogo.com), không phải bài tập mẫu.

## Dự án làm gì?

TIDOGO là phần mềm quản lý sản xuất (MES - Manufacturing Execution System) cho các xưởng làm hàng theo yêu cầu: xưởng in áo, may đồng phục, làm quà tặng, POD.

Vấn đề nó giải: trong xưởng, một đơn hàng đi qua nhiều công đoạn - nhận đơn, thiết kế, in, kiểm tra chất lượng, đóng gói, giao. Cách quản lý phổ biến là ghi sổ hoặc gõ Excel cuối ngày. Hậu quả là **không ai biết đơn đang nằm ở đâu ngay lúc này**, khách hỏi thì phải chạy xuống xưởng tìm, và lỗi phát hiện muộn thì đã in hỏng cả lô.

TIDOGO ghi nhận dữ liệu **ngay lúc công việc diễn ra**: mỗi lô/đơn có một mã riêng, công nhân quét mã bằng camera điện thoại khi xong mỗi công đoạn, trạng thái hiện lên bảng điều khiển theo thời gian thực.

## Vì sao làm cái này

Đây là điểm mình muốn nhấn nhất cho người đọc repo này: **mình không đi tìm ý tưởng khởi nghiệp**. Mình vận hành xưởng 9 năm, có giai đoạn đỉnh điểm 15.000 đơn/tháng. Bài toán "đơn đang ở công đoạn nào" là bài toán mình bị hành mỗi ngày trong nhiều năm.

Đúng tinh thần [AI là con dao, chuyên môn là đầu bếp](../00-ban-do-gioi-ai/00-ai-lam-duoc-gi.md): giá trị không nằm ở chỗ mình biết code, mà nằm ở chỗ mình biết **chính xác cái xưởng cần gì**, vì mình đã từng là người cần nó.

## Những quyết định đáng kể nhất

**Quét mã bằng camera điện thoại, không mua máy quét chuyên dụng.** Máy quét mã vạch công nghiệp tốn tiền và phải mua cho từng vị trí. Xưởng nào cũng có sẵn điện thoại Android rẻ tiền. Bỏ được rào cản này thì xưởng nhỏ mới dám dùng.

**Công đoạn cấu hình được, không cố định.** Xưởng in áo và xưởng may đồng phục có quy trình khác nhau. Nếu đóng cứng quy trình vào code thì mỗi khách một bản, không scale nổi.

**Khách tra cứu bằng link, không cần tài khoản.** Bắt khách của khách tạo tài khoản chỉ để xem đơn tới đâu là cách nhanh nhất để không ai dùng.

**Miễn phí vĩnh viễn cho xưởng dưới 50 đơn/tháng.** Xưởng nhỏ là nhóm cần phần mềm nhất nhưng ít tiền nhất. Cho họ dùng thật rồi trả tiền khi lớn lên.

## Công nghệ đã dùng

| Phần | Dùng gì |
|---|---|
| Giao diện web | Next.js |
| Cơ sở dữ liệu, đăng nhập | Supabase |
| Dịch vụ xử lý riêng | FastAPI (Python) |
| Tính năng khác | Quản lý vật tư, kiểm soát lỗi, xuất dữ liệu, nối với phần mềm kế toán MISA |

Vài khái niệm trong bảng trên nếu bạn chưa quen: xem lại [từ điển thuật ngữ](../00-ban-do-gioi-ai/06-tu-dien-thuat-ngu.md) và [bài chọn hạ tầng](../03-ha-tang-thuc-chien/01-thue-vps.md).

## Chi phí thực tế (VND)

Điểm bất ngờ dễ chịu: gần như toàn bộ hạ tầng chạy ở **bậc miễn phí**. Khoản đáng kể duy nhất trả đều hàng tháng là gói AI dùng để build.

| Khoản | Chi phí | Ghi chú |
|---|---|---|
| Tên miền `.com` | ~300.000đ/năm | Tùy nhà cung cấp và đuôi tên miền |
| Supabase | 0đ | Dùng bậc miễn phí |
| Vercel (chạy web) | 0đ | Dùng bậc miễn phí |
| GitHub | 0đ | Dùng bậc miễn phí |
| Gói AI để build | Claude Max 5x, 100 USD/tháng <Vnd usd="100" sau="/tháng" /> | Hơn 1 tháng build, và vẫn dùng để bảo trì; xem [chi phí các gói Claude](../phu-luc-cong-cu/claude-code/02-chi-phi-cac-goi.md) |
| Codex/ChatGPT Pro (phản biện, assets) | phát sinh theo dùng | Xem [chi phí các gói Codex](../phu-luc-cong-cu/codex/02-chi-phi-cac-goi.md) |

## Bài học rút ra

1. **Chọn bài toán mình đã sống trong đó.** Phần khó nhất của phần mềm B2B không phải viết code, mà là biết quy trình thật chạy thế nào - kể cả những chỗ luộm thuộm mà không tài liệu nào ghi.
2. **Ràng buộc của người dùng quan trọng hơn công nghệ.** Quyết định dùng camera điện thoại thay máy quét không phải quyết định kỹ thuật, mà là quyết định về túi tiền của xưởng nhỏ.
3. **Cho dùng thật trước khi thu tiền.** Bậc miễn phí dưới 50 đơn/tháng không phải chiêu marketing, nó là cách để phần mềm được kiểm chứng trong xưởng thật.

*(Phần bài học sẽ được bổ sung thêm những chỗ đã làm sai và làm lại.)*

## Link

- Sản phẩm: [tidogo.com](https://tidogo.com)
- Mã nguồn: không công khai

## Bước tiếp theo

Xem tiếp case study về app di động và trợ lý AI của cùng hệ sinh thái này: [StarteeX App](02-starteex-app.md)
