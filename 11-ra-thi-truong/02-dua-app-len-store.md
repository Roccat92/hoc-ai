# Đưa app lên App Store & Google Play (và chuyện mã D-U-N-S miễn phí)

Bài này dành cho người làm app di động (hoặc web app muốn đóng gói lên chợ ứng dụng) và chuẩn bị phát hành. Học xong bạn sẽ biết quy trình chung để lên App Store và Google Play, và - quan trọng nhất - biết một mẹo giúp **tiết kiệm mấy chục triệu đồng**: mã D-U-N-S mà nhiều công ty trung gian rao bán thực ra **xin được miễn phí**.

## Hai chợ ứng dụng, hai khoản phí

| Chợ | Của | Phí tài khoản nhà phát triển |
|---|---|---|
| **App Store** | Apple (cho iPhone/iPad) | Apple Developer Program, khoảng **99 USD/năm** |
| **Google Play** | Google (cho Android) | Google Play Console, phí đăng ký **một lần khoảng 25 USD** |

> Phí có thể thay đổi - kiểm tra developer.apple.com và play.google.com/console để có số mới nhất. Đây là phí bắt buộc của chính hãng, không phải qua trung gian.

## Tài khoản cá nhân vs tổ chức - và vì sao xuất hiện mã D-U-N-S

Khi đăng ký tài khoản nhà phát triển, bạn chọn đăng ký dưới danh nghĩa **cá nhân** hay **tổ chức/công ty**:
- **Cá nhân**: đơn giản hơn, tên nhà phát triển hiện trên store là tên bạn.
- **Tổ chức/công ty**: tên công ty hiện trên store (chuyên nghiệp hơn, cần thiết nếu bán hàng/nhận thanh toán dưới danh nghĩa công ty). Nhưng để xác minh bạn đại diện cho một tổ chức có thật, cả **Apple và Google (theo chính sách mới)** đều yêu cầu một thứ: **mã D-U-N-S**.

**Mã D-U-N-S là gì?** Là một mã định danh doanh nghiệp gồm 9 chữ số, do công ty **Dun & Bradstreet** cấp, dùng để xác minh một doanh nghiệp có tồn tại thật trên toàn cầu. Apple dùng nó để chắc chắn tài khoản tổ chức đúng là của công ty đó.

## Câu chuyện mất tiền oan (và cách tránh)

Rất nhiều công ty trung gian ở Việt Nam chào dịch vụ "làm mã D-U-N-S nhanh" với giá **vài triệu tới vài chục triệu đồng**. Nghe qua tưởng là thủ tục khó cần thuê người làm.

**Sự thật: bạn xin được mã D-U-N-S MIỄN PHÍ.** Apple có sẵn một công cụ tra cứu và yêu cầu cấp D-U-N-S miễn phí ngay trên trang của họ:
- Vào trang **"Request a D-U-N-S Number"** của Apple (tìm trên developer.apple.com, mục Enroll → phần dành cho tổ chức có link tra cứu/đăng ký D-U-N-S).
- Nhập thông tin doanh nghiệp của bạn (tên, địa chỉ... phải **khớp với giấy phép kinh doanh** - xem [bài pháp lý](03-phap-ly-viet-nam.md)).
- Nếu công ty bạn chưa có mã, hệ thống cho phép yêu cầu cấp mới **miễn phí**, thường có kết quả sau **khoảng 5-7 ngày làm việc** (có thể lâu hơn, và họ có thể gọi/email xác minh).

Vậy là xong, không tốn đồng nào. **Đừng trả tiền cho trung gian cho việc này** - trừ khi bạn thực sự gấp và chấp nhận trả phí để họ làm hộ thủ tục (nhưng bản chất mã đó vẫn miễn phí).

> Quy trình cụ thể của Apple có thể đổi theo thời gian - luôn bắt đầu từ trang chính thức developer.apple.com thay vì tin một bên thứ ba nói "phải mua".

## Quy trình chung để phát hành app

Sau khi có tài khoản nhà phát triển (và D-U-N-S nếu đăng ký tổ chức):

1. **Chuẩn bị "hồ sơ" app**: icon, ảnh chụp màn hình (screenshot) cho nhiều kích thước máy, tên app, mô tả, từ khóa, phân loại độ tuổi.
2. **Bắt buộc có Chính sách bảo mật (Privacy Policy)**: cả hai chợ đều yêu cầu một trang chính sách bảo mật công khai, nêu rõ app thu thập dữ liệu gì (liên quan tới [pháp lý dữ liệu cá nhân](03-phap-ly-viet-nam.md)).
3. **Khai báo dữ liệu app thu thập**: Apple ("App Privacy") và Google ("Data safety") bắt bạn khai báo app lấy những dữ liệu nào của người dùng.
4. **Nộp app chờ duyệt (review)**: Apple duyệt khá kỹ và có thể từ chối nếu app vi phạm nguyên tắc (thiếu tính năng, lỗi, thiếu Apple Sign In khi đã có login khác - xem [bài đăng nhập](01-dang-nhap-google-apple-otp.md)). Google thường nhanh hơn nhưng cũng có kiểm duyệt.
5. **Được duyệt → phát hành**. Về sau mỗi lần cập nhật đều nộp bản mới và có thể phải chờ duyệt lại.

## Nếu chưa cần lên store

Không phải sản phẩm nào cũng cần lên chợ ứng dụng. Nếu sản phẩm của bạn là **web app** (chạy trên trình duyệt), bạn có thể phát hành ngay qua deploy web thông thường ([xem phần 3](../03-ha-tang-thuc-chien/03-deploy-mien-phi.md)) mà không tốn phí store, không chờ duyệt. Nhiều sản phẩm chọn làm **PWA** (web app cài được lên màn hình điện thoại như một app) để tránh toàn bộ quy trình store ở giai đoạn đầu. Chỉ lên App Store/Play khi thật sự cần (cần tính năng native, cần hiện diện trên chợ để người dùng tin tưởng/tìm thấy).

## Bước tiếp theo

Có sản phẩm, có đăng nhập, chuẩn bị lên store - còn một mảng người mới hay bỏ qua tới lúc gặp rắc rối mới lo: pháp lý ở Việt Nam. [Pháp lý cơ bản khi làm sản phẩm ở Việt Nam](03-phap-ly-viet-nam.md)
