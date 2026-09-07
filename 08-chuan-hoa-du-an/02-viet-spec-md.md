# Viết spec.md: template chuẩn, có ví dụ điền sẵn

Bài này dành cho người đã hiểu [vì sao cần spec](01-tai-sao-can-spec.md) và muốn viết file spec.md đầu tiên của mình. Học xong bạn sẽ có một file spec.md hoàn chỉnh cho dự án đang định làm - kể cả khi bạn chưa từng viết tài liệu kỹ thuật nào trước đây.

## spec.md là gì, đặt ở đâu?

`spec.md` là một file văn bản (markdown) đặt ở **thư mục gốc dự án**, mô tả toàn bộ ý tưởng sản phẩm ở một chỗ duy nhất - giống một bản tóm tắt bạn đưa cho một người mới vào dự án để họ hiểu ngay "đang làm cái gì, cho ai, làm tới đâu thì dừng". AI (và cả bạn, sau vài tuần quên mất chi tiết) sẽ đọc file này mỗi khi cần nhớ lại toàn cảnh.

## Template chuẩn

Copy khối dưới đây, tạo file `spec.md` ở gốc dự án, điền vào từng mục:

```markdown
# Spec: [Tên dự án]

## Mục tiêu
[Dự án này giải quyết vấn đề gì, cho ai - 2-3 câu]

## Người dùng
[Ai sẽ dùng sản phẩm này - 1 hoặc nhiều nhóm người dùng]

## Tính năng PHẢI có
- [Tính năng 1]
- [Tính năng 2]
- ...

## Tính năng KHÔNG làm (ít nhất ở bản đầu tiên)
- [Cái gì cố tình bỏ qua, để tránh AI tự thêm vào ngoài ý muốn]

## Công nghệ
- Frontend: [ví dụ: HTML/CSS/JS thuần, hoặc React...]
- Backend: [ví dụ: không cần, hoặc Node.js + Express...]
- Database: [ví dụ: không cần lưu gì cả, hoặc SQLite...]
- Deploy: [ví dụ: Cloudflare Pages, xem phần 3]

## Màn hình chính
1. [Tên màn hình] - [mô tả ngắn có gì trên màn hình này]
2. ...

## Dữ liệu cần lưu
[Liệt kê các "thứ" cần lưu trữ và các trường quan trọng của mỗi thứ,
ví dụ: Đơn hàng (mã đơn, tên khách, sản phẩm, số lượng, trạng thái, ngày đặt)]
```

## Ví dụ điền sẵn: app quản lý đơn hàng shop quần áo nhỏ

```markdown
# Spec: Quản lý đơn hàng Shop ABC

## Mục tiêu
Giúp chủ shop quần áo online (bán qua Facebook/Zalo) theo dõi đơn hàng
mà không cần ghi vào sổ tay hay Excel rời rạc.

## Người dùng
Chỉ một người dùng: chủ shop (không cần phân quyền nhiều tài khoản ở bản đầu).

## Tính năng PHẢI có
- Thêm đơn hàng mới: tên khách, sản phẩm, size, màu, số lượng, giá
- Xem danh sách đơn hàng, lọc theo trạng thái
- Đổi trạng thái đơn: Chờ xử lý / Đang giao / Hoàn thành / Đã hủy
- Tìm đơn hàng theo tên khách hoặc số điện thoại

## Tính năng KHÔNG làm (bản đầu tiên)
- Không cần tích hợp thanh toán online
- Không cần đăng nhập nhiều tài khoản
- Không cần app di động riêng, chỉ cần web dùng được trên điện thoại

## Công nghệ
- Frontend: React
- Backend: Node.js + Express
- Database: SQLite (đơn giản, không cần server database riêng)
- Deploy: VPS (xem phần 3)

## Màn hình chính
1. Danh sách đơn hàng - bảng có cột tên khách, sản phẩm, trạng thái, ngày đặt
2. Thêm đơn hàng mới - form nhập liệu
3. Chi tiết đơn hàng - xem/sửa/đổi trạng thái một đơn cụ thể

## Dữ liệu cần lưu
Đơn hàng: mã đơn, tên khách, số điện thoại, sản phẩm, size, màu, số lượng,
giá, trạng thái, ngày đặt
```

## Chưa biết viết spec? Nhờ AI phỏng vấn bạn

Không cần tự nghĩ ra hết một mình - nhưng viết spec là việc **suy nghĩ/lên kế hoạch**, chưa phải việc code, nên cách làm hơi khác lúc giao task cho coding agent:

- **Dùng thẳng chat AI (Claude.ai, ChatGPT...) cũng được, không bắt buộc phải mở Claude Code/Codex** - lúc này chưa có code, chưa cần agent đụng vào file dự án, nên trò chuyện qua lại trong khung chat quen thuộc thường thoải mái hơn.
- **Bật mức suy luận cao nhất công cụ đó có** (ví dụ "Extended thinking" ở Claude, hoặc model có gắn nhãn "reasoning"/"thinking" nếu ChatGPT cho chọn nhiều model) - viết spec cần cân nhắc đánh đổi (tính năng nào thật sự cần, công nghệ nào hợp túi tiền/trình độ bạn), mức suy luận cao cho kết quả chắc tay hơn trả lời nhanh.
- **Nếu công cụ có tính năng tìm kiếm web (research/search), bật lên** - để AI tra cứu thực tế (sản phẩm tương tự đã làm gì, công nghệ nào đang phổ biến cho đúng bài toán này) thay vì chỉ đoán từ kiến thức cũ.

Prompt mẫu (dùng được cho cả chat AI riêng lẻ lẫn trong coding agent):

```
Tôi muốn build [mô tả ngắn ý tưởng của bạn]. Tôi chưa biết viết spec.
Hãy phỏng vấn tôi từng câu một (không hỏi dồn) để làm rõ: mục tiêu,
người dùng, tính năng cần có, tính năng không cần, công nghệ muốn dùng,
các màn hình chính, dữ liệu cần lưu. Nếu cần, tra cứu thêm để góp ý công
nghệ/tính năng phù hợp. Sau khi hỏi đủ, tự viết ra file spec.md hoàn
chỉnh theo đúng template chuẩn.
```

AI sẽ hỏi lại bạn từng phần một - bạn chỉ cần trả lời như đang trò chuyện, không cần biết trước cấu trúc file. Đây chính là cách thực tế nhất để bắt đầu nếu bạn thấy template ở trên vẫn "đáng sợ".

**Sau khi có nội dung spec, file đó phải nằm trong thư mục dự án:**
- Dùng chat AI riêng lẻ (Claude.ai/ChatGPT - không có quyền ghi file lên máy bạn): copy toàn bộ nội dung AI trả về, tự tạo file `spec.md` ở thư mục gốc dự án, dán nội dung vào rồi lưu.
- Làm ngay trong coding agent (Claude Code/Codex - có quyền đọc/ghi file): yêu cầu nó tự tạo file `spec.md` thẳng trong thư mục dự án, không cần copy-paste tay.

## Coding agent còn tạo được luôn cả bộ khung dự án ban đầu

Nếu bạn đã mở coding agent ngay trong thư mục dự án (kể cả thư mục còn trống), không cần làm từng file một - giao trọn gói được luôn:

```
Đọc kỹ mô tả ý tưởng của tôi ở trên (phỏng vấn tôi trước nếu chưa đủ
thông tin). Sau đó tạo giúp tôi bộ file khởi đầu cho dự án này:
spec.md (theo mẫu chuẩn), backlog.md (chia nhỏ việc từ spec thành các
task làm được trong một phiên), CLAUDE.md (quy ước cơ bản cho dự án),
và khung thư mục code trống đúng với công nghệ đã chọn trong spec.
Hỏi lại tôi nếu thiếu thông tin, đừng tự đoán.
```

Agent tạo cả `spec.md`, `backlog.md`, `CLAUDE.md` và khung thư mục ban đầu trong một lần, đỡ phải lặp lại quy trình phỏng vấn riêng cho từng file. Vẫn nên đọc lại từng file sau khi agent tạo xong - đây là nền móng cho cả dự án, sai ở đây kéo dài ảnh hưởng sang mọi phiên làm việc sau.

## Cẩn thận: AI có xu hướng đồng tình với bạn - ép nó phản biện trước khi chốt

Đây là điều ít người mới biết nhưng rất đáng nhớ: các mô hình AI (kể cả Claude, ChatGPT) có xu hướng thật là **đồng tình và khen ý tưởng của người hỏi** nhiều hơn mức nên có - gọi là "sycophancy" (nịnh/chiều theo ý người dùng). Đây không phải AI "biết nói dối", mà là cách nó được huấn luyện để nghe dễ chịu, hữu ích - hệ quả là bạn hỏi "ý tưởng này ổn không?", nó gần như luôn khen, ít khi tự nói ra rủi ro, hiếm khi chủ động tìm đối thủ cạnh tranh nếu bạn không yêu cầu.

Hậu quả thật với người mới: hào hứng mô tả ý tưởng, AI khen hay, viết spec đẹp, code chạy được - rồi làm ra sản phẩm **không ai dùng**, vì chưa ai hỏi thật "đã có ai làm cái này chưa, tại sao họ chưa thắng, vì sao người dùng sẽ chọn bạn". Bước này cực rẻ để làm trước khi build (vài chục phút), cực đắt để bỏ qua (vài tuần công build).

**Cách xử lý: chủ động ép AI phản biện, đừng để nó tự nguyện.** Trước khi chốt spec, thêm một vòng hỏi ngược lại chính ý tưởng của bạn:

```
Đừng cổ vũ tôi - đóng vai một cố vấn khó tính đang thẩm định ý tưởng này
trước khi tôi bỏ công build. Nếu có tính năng tìm kiếm web/nghiên cứu sâu,
hãy bật lên và:
1. Tìm 3-5 sản phẩm/dịch vụ đã giải quyết vấn đề tương tự - họ làm gì,
   vì sao người dùng chọn hoặc không chọn họ.
2. Chỉ ra 3-5 lý do cụ thể ý tưởng này có thể thất bại (không ai cần đủ
   nhiều, đối thủ đã làm tốt hơn, chi phí vận hành không hợp lý...).
3. Với mỗi lý do, gợi ý một hướng điều chỉnh - hoặc nói thẳng nếu ý tưởng
   ban đầu không còn khả thi, cần đổi hướng.
Tôi cần biết sự thật trước khi bỏ công build, không cần lời khen.
```

Bước phản biện này xứng đáng dùng **model mạnh nhất bạn có** (Claude Opus, GPT-5 Thinking, hay bất kỳ model gắn nhãn "reasoning" cao) - tìm lỗ hổng và tự phản biện đòi hỏi suy luận sâu hơn hẳn so với việc chỉ viết mô tả theo ý bạn, khác với việc code hàng ngày (để dành model nhẹ hơn cũng đủ, xem lại [chi phí các gói](../phu-luc-cong-cu/claude-code/02-chi-phi-cac-goi.md)).

Nếu bước này khiến bạn thấy ý tưởng ban đầu yếu hơn tưởng - đó là **kết quả tốt**, không phải thất bại. Phát hiện sớm rẻ hơn phát hiện muộn rất nhiều lần.

## Mẹo giữ spec luôn đúng

Spec không phải viết một lần rồi để đó - khi ý tưởng thay đổi giữa chừng (rất bình thường), **cập nhật lại spec.md** trước khi yêu cầu AI làm tiếp, để lần sau đọc lại vẫn đúng với thực tế hiện tại.

## Bước tiếp theo

Có spec rồi, giờ chia nhỏ nó thành các việc làm được trong từng phiên: [Backlog.md](03-backlog-md.md)
