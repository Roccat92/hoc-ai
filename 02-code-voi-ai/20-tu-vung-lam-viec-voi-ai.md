# Nói đúng thuật ngữ: để AI hiểu ngay ý bạn

Bài này dành cho người đã làm việc với AI được một thời gian và nhận ra: cùng một ý, nói cách này AI làm trúng phóc, nói cách kia nó làm lệch hoặc phá luôn thứ đang chạy. Học xong bạn sẽ có một bộ từ khóa chuẩn - refactor, polish, audit, review... - biết mỗi từ ra lệnh cho AI làm gì, khi nào dùng cái nào, và cách "chỉ tay" đúng vị trí thay vì nói chung chung.

## Vì sao dùng đúng từ lại quan trọng đến thế

AI học từ hàng triệu đoạn hội thoại lập trình, nơi các từ này có **nghĩa kỹ thuật rất cụ thể**. Khi bạn nói "refactor", AI hiểu ngay: *sửa cấu trúc code cho gọn nhưng giữ nguyên hành vi*. Khi bạn nói "sửa lại cho đẹp", AI phải đoán - và đoán thì dễ trật.

So sánh cùng một mong muốn:

| Nói mơ hồ | AI dễ hiểu sai thành | Nói đúng thuật ngữ |
|---|---|---|
| "code này rối quá, dọn lại đi" | Viết lại toàn bộ, đổi cả cách chạy | "**refactor** hàm này cho dễ đọc, giữ nguyên hành vi" |
| "làm nút này đẹp hơn" | Đổi lung tung màu mè | "**polish** nút này: canh lề, thống nhất khoảng cách, đúng màu nhấn" |
| "xem hộ có gì sai không" | Chỉ đọc lướt qua | "**audit** file này về lỗi bảo mật và edge case" |

Dùng đúng từ không phải để "nghe cho pro" - nó thu hẹp khoảng đoán của AI, nên bạn ít phải làm lại.

## Nhóm 1 - Sửa code mà KHÔNG đổi hành vi

Điểm chung của nhóm này: chức năng chạy y như cũ, chỉ code bên trong sạch hơn.

- **Refactor** - sửa cấu trúc cho dễ đọc/dễ bảo trì, hành vi không đổi. *"Refactor hàm xử lý đơn hàng thành các hàm nhỏ hơn."*
- **Clean up / dọn dẹp** - xóa code thừa, biến không dùng, import cũ.
- **Simplify** - làm đơn giản hơn một đoạn logic đang rối.
- **Extract** - tách một đoạn ra thành hàm/component riêng để dùng lại. *"Extract phần này thành một component riêng."*
- **Rename** - đổi tên biến/hàm cho rõ nghĩa.
- **DRY** (Don't Repeat Yourself) - gộp code lặp lại. *"Chỗ này bị lặp ba lần, làm cho DRY."*

> **Bẫy:** refactor mà không có [test](18-debug-devtools-va-git-nang-cao.md) thì dễ vỡ ngầm - code trông vẫn chạy nhưng sai kết quả. Với đoạn quan trọng, bảo AI viết test trước, rồi mới refactor.

## Nhóm 2 - Sửa giao diện

- **Polish** - trau chuốt phần nhìn: canh lề, thống nhất khoảng cách, bo góc, màu. Đây là từ "thần chú" để [chữa UI phèn](06-tri-benh-ui-phen.md).
- **UI vs UX** - **UI** (User Interface) là *nhìn thế nào*: màu, font, bố cục. **UX** (User Experience) là *dùng có sướng không*: mấy bước mới xong việc, có bị rối không. "Nút xấu" là UI; "phải bấm 5 lần mới đặt được hàng" là UX.
- **Responsive** - hiển thị tốt trên cả điện thoại lẫn máy tính. *"Làm trang này responsive cho màn hình điện thoại."*
- **Spacing / padding / margin** - khoảng cách. `padding` là khoảng đệm *bên trong* một khối, `margin` là khoảng cách *giữa* các khối.
- **Hierarchy** (phân cấp thị giác) - làm cái quan trọng nổi bật hơn cái phụ, bằng cỡ chữ/độ đậm/màu.
- **Align / căn lề** - cho các phần tử thẳng hàng với nhau.
- **Accessibility (a11y)** - dùng được cho cả người khiếm thị (đọc màn hình), đủ tương phản màu, bấm được bằng bàn phím.

## Nhóm 3 - Kiểm tra và đánh giá

Đây là nhóm bạn hỏi trong bài mà dễ nhầm nhất - **review** và **audit** khác nhau về độ sâu và mục đích:

- **Review** - đọc lại code để góp ý chung: có dễ hiểu không, có chỗ nào nên sửa không. Nhẹ nhàng, thường xuyên. *"Review giúp mình file này trước khi commit."*
- **Audit** - soi kỹ, có hệ thống, theo một tiêu chí cụ thể. Nặng và tập trung hơn review. *"Audit toàn bộ dự án về lỗ hổng bảo mật."*
- **Code smell** - "mùi code": dấu hiệu code có vấn đề tiềm ẩn dù vẫn chạy (hàm quá dài, lặp nhiều, tên khó hiểu). *"Chỉ ra các code smell trong file này."*
- **Lint** - để công cụ tự dò lỗi cú pháp/quy ước một cách máy móc. *"Chạy lint và sửa các cảnh báo."*

**Khi nào dùng cái nào:**
- Vừa viết xong một tính năng, muốn ý kiến trước khi lưu → **review**.
- Sắp đưa sản phẩm cho người lạ dùng, cần chắc chắn về một mặt cụ thể (bảo mật, hiệu năng) → **audit**. Xem [nhờ AI rà soát bảo mật](../10-bao-mat/06-nho-ai-ra-soat-bao-mat.md).

## Nhóm 4 - Sửa lỗi và giữ ổn định

- **Debug** - tìm nguyên nhân một lỗi. *"Debug tại sao nút Gửi không chạy."*
- **Fix** - sửa lỗi đã biết.
- **Edge case** - trường hợp hiếm/biên dễ gây lỗi: danh sách rỗng, số âm, tên có ký tự lạ. *"Xử lý edge case khi giỏ hàng trống."*
- **Reproduce** - làm cho lỗi xuất hiện lại theo yêu cầu, để sửa cho chắc. *"Cho mình các bước reproduce lỗi này."*
- **Regression** - lỗi mới sinh ra ở chỗ *đã từng chạy đúng*, thường do một thay đổi khác. *"Kiểm tra xem thay đổi này có gây regression không."*

## Nhóm 5 - Bắt đầu và mở rộng

- **Scaffold** - dựng bộ khung ban đầu của một tính năng để bạn điền tiếp. *"Scaffold một trang quản lý người dùng."*
- **Boilerplate** - đoạn code lặp đi lặp lại theo khuôn (cấu hình mở đầu).
- **MVP** (Minimum Viable Product) - bản chạy được tối thiểu, đủ để thử, chưa cần hoàn hảo.
- **Prototype** - bản nháp nhanh để kiểm chứng ý tưởng, không phải để dùng thật.
- **Stub / mock** - phần giả tạm để thay cho thứ chưa làm xong (dữ liệu giả, hàm rỗng).

## Quan trọng không kém: chỉ đúng VỊ TRÍ

Thuật ngữ đúng mà chỉ sai chỗ thì AI vẫn mò. Luôn nói rõ *ở đâu*:

- **Theo file và dòng:** *"Ở `src/gio-hang.js` dòng 42, giá đang tính sai thuế."*
- **Theo tên hàm/thành phần:** *"Trong hàm `tinhTongTien`, ..."*
- **Theo vị trí trên màn hình:** *"Cái nút Gửi màu xám ở góc dưới bên phải form."*
- **Kèm ảnh chụp:** với lỗi giao diện, dán luôn ảnh - đây chính là [vòng lặp sửa bằng ảnh](06-tri-benh-ui-phen.md#c-vong-lap-sua-bang-anh) đã học.

Công thức gọn cho một yêu cầu tốt: **[thuật ngữ] + [vị trí cụ thể] + [kết quả mong muốn]**.
Ví dụ: *"**Refactor** hàm `xuLyDon` **trong `don-hang.js`** thành các hàm nhỏ, **giữ nguyên kết quả trả về**."*

## Cạm bẫy cuối: đừng chồng nhiều yêu cầu vào một câu

"Refactor rồi thêm tính năng thanh toán rồi làm cho đẹp luôn" - ba việc khác loại nhồi một câu, AI làm rối và bạn khó kiểm chứng. Tách ra, làm từng cái, kiểm tra xong mới sang cái tiếp. Một việc rõ ràng luôn hơn ba việc mập mờ.

## Bước tiếp theo

Bạn đã có công cụ, biết chọn chỗ làm việc, biết diễn đạt cho AI hiểu. Giờ tới lúc đưa sản phẩm ra khỏi máy mình cho người khác dùng được: [Thuê VPS: là gì, chọn nhà cung cấp nào →](../03-ha-tang-thuc-chien/01-thue-vps.md)
