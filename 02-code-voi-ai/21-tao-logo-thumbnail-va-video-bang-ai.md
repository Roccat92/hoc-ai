# Tạo logo, favicon, thumbnail và ảnh động bằng AI

Bài này dành cho người đang tự tay build sản phẩm, cần vài hình ảnh (logo, favicon, ảnh thumbnail khi chia sẻ link, banner...) nhưng không có ngân sách thuê designer cho từng thứ nhỏ, và cũng chưa biết dùng Photoshop/Illustrator. Học xong bạn sẽ tự tạo được các asset cơ bản đó bằng AI ngay trong lúc code, biết khi nào việc này đủ dùng và khi nào nên bỏ tiền thuê người thật, nhớ lại chuẩn tối thiểu để trang chia sẻ ra đẹp, và biết thêm một lựa chọn giá rẻ khi cần ảnh động hoặc video ngắn.

## AI vẽ đồ họa dạng vector - hợp nhất cho logo, icon, favicon

Khi bạn nhờ coding agent "vẽ" một logo hay icon, nó không tự tay tô màu từng pixel như một AI tạo ảnh (Midjourney, DALL-E) - nó **viết code mô tả hình dạng** (SVG: hình tròn, đường nét, tọa độ...). Đây gọi là đồ họa **vector**: phóng to bao nhiêu cũng không vỡ nét, vì máy vẽ lại từ công thức toán học mỗi lần hiển thị, không phải phóng to một tấm ảnh có sẵn. Vector là lựa chọn đúng cho đúng ba thứ: logo, icon, favicon - những hình cần sắc nét ở mọi kích thước, từ icon 16px trên tab trình duyệt tới banner in khổ lớn.

Cách làm: mô tả ý tưởng bằng lời cho agent ("logo dạng chữ cái đầu, khối đặc, hai màu, không dùng gradient"), để nó viết trực tiếp file SVG, rồi bạn xem thử và góp ý chỉnh lại - y hệt quy trình sửa code bình thường, chỉ khác là kết quả là một hình chứ không phải một tính năng.

### Favicon là gì và vì sao cần

**Favicon** là icon nhỏ hiện trên tab trình duyệt, trong danh sách bookmark, và khi ai đó ghim trang bạn ra màn hình chính điện thoại. Thiếu favicon, trình duyệt hiện một icon trắng hoặc mặc định trông thiếu chuyên nghiệp, và khách khó nhận ra tab của bạn giữa hàng chục tab khác đang mở cùng lúc. Chỉ cần một file nhỏ (thường là `favicon.svg` hoặc `favicon.ico`/`favicon.png`) đặt đúng chỗ agent hướng dẫn (thường ở thư mục gốc hoặc `public/`, khai báo trong `<head>`), gần như không tốn công.

Mẹo khi mô tả cho AI: favicon hiện ở kích thước rất nhỏ (16-32px), nên hình càng đơn giản càng tốt - 1-2 màu, ít chi tiết. Một logo đẹp nhưng nhiều nét nhỏ sẽ nhòe thành một vệt mờ khi thu về cỡ đó.

## Thực tế: Codex làm việc này tốt hơn

Dùng cả Claude Code lẫn Codex để tạo hình ảnh cho dự án, trải nghiệm thực tế cho thấy **Codex xử lý khoản này mượt hơn** - đặc biệt là có thể tự sinh **hàng loạt ảnh minh họa hoặc asset ngay trong cùng một phiên làm việc**, không cần bạn mở tay tạo từng ảnh một rồi copy vào dự án. Bạn mô tả nhu cầu một lần ("tạo 5 ảnh minh họa cho 5 tính năng chính, phong cách phẳng, hai màu thương hiệu"), Codex tự lặp lại việc gọi công cụ sinh ảnh cho từng cái, đặt đúng tên file, đúng thư mục assets của dự án. Xem thêm ở [phụ lục Codex](../phu-luc-cong-cu/codex/03-cau-hinh-nang-cao.md).

## Nhắc lại chuẩn tối thiểu: SEO và ảnh khi chia sẻ link

Hai thứ hay bị quên khi mới làm web, không liên quan tới logo/favicon nhưng cùng nhóm "hình ảnh nhận diện" nên nhắc luôn ở đây:

- **Thẻ mô tả (meta description) và tiêu đề trang** - dòng chữ hiện ra trên kết quả tìm kiếm Google. Thiếu thì Google tự chọn đại một đoạn văn trong trang, thường không hay.
- **OG-image** - tấm ảnh đại diện hiện ra khi ai đó dán link trang bạn vào Facebook, Zalo, X, Messenger... Thiếu thì nền tảng hoặc không hiện ảnh gì, hoặc lấy đại một ảnh bất kỳ trong trang, trông cẩu thả. Kích thước phổ biến nhất hiện nay là khoảng **1200x630px** (có thể lệch chút tùy nền tảng) - hỏi agent tạo đúng tỉ lệ này.

Cả hai đều có thể nhờ AI làm nhanh: mô tả nội dung trang, để agent viết đoạn mô tả và tự tạo luôn ảnh OG-image (bằng code sinh ảnh, hoặc gọi công cụ tạo ảnh) thay vì bạn tự chụp màn hình rồi chỉnh sửa. Sau khi làm xong, dán thử link trang lên khung chat để kiểm tra ảnh/tiêu đề hiện đúng chưa - đừng chỉ tin agent nói "đã xong".

## Muốn ảnh động, video ngắn: một lựa chọn giá rẻ hơn hẳn

Nếu cần thêm chút sinh động - GIF ngắn, video demo vài giây cho trang giới thiệu sản phẩm - có công cụ tạo ảnh động/video chuyên nghiệp như Kling, Seedance..., nhưng khá đắt nếu chỉ cần vài clip ngắn không đòi hỏi chất lượng điện ảnh. Một lựa chọn rẻ hơn hẳn theo trải nghiệm thật của tác giả: **Grok Imagine** (của xAI) - nạp 30 USD <Vnd usd="30" /> dùng hết trong một đợt, sau đó gặp một đợt ưu đãi còn 10 USD/tháng <Vnd usd="10" sau="/tháng" /> trong 3 tháng. Hạn mức tạo khá thoải mái, đủ để làm sinh động cho một số phần của sản phẩm, nhưng **chất lượng đầu ra không bằng các công cụ chuyên như Kling/Seedance** - đừng kỳ vọng ngang hàng, chỉ hợp cho nhu cầu "có còn hơn không" với ngân sách nhỏ.

> Giá và gói của Grok Imagine đổi liên tục (đây là trải nghiệm cá nhân tại một thời điểm, không phải bảng giá chính thức) - luôn kiểm tra tại trang xAI trước khi nạp tiền. *(kiểm tra: 06/09/2026)*
>
> Nếu bạn quen gọi model qua OpenRouter (dịch vụ trung gian định tuyến sang nhiều nhà cung cấp) thay vì trả tiền trực tiếp cho từng hãng: tại thời điểm viết bài, chưa rõ OpenRouter có hỗ trợ gọi API tạo ảnh/video của Grok hay không - tự kiểm tra trên trang OpenRouter trước khi giả định có, đừng suy đoán từ việc họ có hỗ trợ chat model của Grok.

## Một câu để nhớ

AI vẽ vector đủ tốt cho logo/favicon/asset hàng loạt - chỉ thuê designer thật khi cần thứ tinh xảo hơn mức "đủ dùng".

## Bước tiếp theo

Có sản phẩm, có bộ nhận diện cơ bản - giờ tới lúc đưa nó ra khỏi máy mình cho người khác dùng được: [Thuê VPS: là gì, chọn nhà cung cấp nào →](../03-ha-tang-thuc-chien/01-thue-vps.md)
