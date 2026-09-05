# File, web và server hoạt động thế nào?

Bài này dành cho người chưa biết code nhưng muốn hiểu mình đang giao AI xây cái gì. Học xong bạn sẽ phân biệt file dự án, trình duyệt, server, database, domain, port, và tự tay nhìn thấy một request/response thật bằng công cụ có sẵn trên trình duyệt - không cần học thuộc thuật ngữ suông.

## Bốn bước của một request

Khi bạn mở một trang web có dữ liệu (ví dụ trang "Đơn hàng của tôi"):

<figure style="max-width:640px;margin:24px auto">
<svg viewBox="0 0 620 190" width="100%" role="img" aria-label="Trình duyệt gửi yêu cầu tới server, server hỏi database rồi trả dữ liệu ngược lại" style="font-family:inherit;display:block">
  <rect x="20" y="55" width="140" height="70" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.7;stroke-width:1.5"/>
  <text x="90" y="85" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">Trình duyệt</text>
  <text x="90" y="103" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">của bạn</text>

  <rect x="240" y="55" width="140" height="70" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:1;stroke-width:2"/>
  <text x="310" y="85" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">Server</text>
  <text x="310" y="103" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">chạy code backend</text>

  <rect x="460" y="55" width="140" height="70" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.7;stroke-width:1.5"/>
  <text x="530" y="85" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">Database</text>
  <text x="530" y="103" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">giữ dữ liệu</text>

  <text x="200" y="65" style="fill:var(--vp-c-text-2);font-size:11px;text-anchor:middle">1. request: "cho tôi đơn hàng"</text>
  <path d="M164 78 H236 M229 73 L236 78 L229 83" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <circle class="mh-anim mh-dot" cx="168" cy="78" r="4" style="fill:var(--vp-c-brand-1);stroke:none;animation:mh-3hop-a 9s ease-in-out infinite"/>

  <text x="200" y="145" style="fill:var(--vp-c-text-2);font-size:11px;text-anchor:middle">4. response: HTML/JSON</text>
  <path d="M236 103 H164 M171 98 L164 103 L171 108" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <circle class="mh-anim mh-dot" cx="232" cy="103" r="4" style="fill:var(--vp-c-brand-1);stroke:none;animation:mh-3hop-d 9s ease-in-out infinite"/>

  <text x="420" y="65" style="fill:var(--vp-c-text-2);font-size:11px;text-anchor:middle">2. query dữ liệu</text>
  <path d="M384 78 H456 M449 73 L456 78 L449 83" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <circle class="mh-anim mh-dot" cx="388" cy="78" r="4" style="fill:var(--vp-c-brand-1);stroke:none;animation:mh-3hop-b 9s ease-in-out infinite"/>

  <text x="420" y="145" style="fill:var(--vp-c-text-2);font-size:11px;text-anchor:middle">3. trả bản ghi</text>
  <path d="M456 103 H384 M391 98 L384 103 L391 108" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <circle class="mh-anim mh-dot" cx="452" cy="103" r="4" style="fill:var(--vp-c-brand-1);stroke:none;animation:mh-3hop-c 9s ease-in-out infinite"/>

  <text x="310" y="175" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">Mỗi lần bạn mở một trang có dữ liệu, cả 4 bước này chạy trong chưa tới 1 giây</text>
</svg>
<figcaption style="text-align:center;font-size:14px;color:var(--vp-c-text-2);margin-top:8px">Request đi từ trình duyệt tới server, server hỏi database rồi trả dữ liệu ngược lại đúng theo đường cũ.</figcaption>
</figure>

1. Trình duyệt gửi một **request** tới địa chỉ web. **Domain** giúp tìm đúng máy chủ qua DNS.
2. **Server** nhận request. Nếu cần dữ liệu, nó hỏi **database**.
3. Database trả bản ghi về cho server.
4. Server trả **response** gồm HTML, CSS, JavaScript hoặc JSON. Trình duyệt dựng giao diện.

Frontend là phần chạy gần người dùng (bước 1 và 4); backend là phần xử lý và bảo vệ dữ liệu ở phía server (bước 2 và 3). Một landing page tĩnh có thể chỉ cần frontend, không có database. Đăng nhập, lưu đơn hàng hoặc gọi API bí mật thì cần backend.

## File và thư mục

Thư mục dự án là chiếc hộp chứa code, ảnh, cấu hình và dependency. Đường dẫn tương đối bắt đầu từ vị trí file hiện tại (`./anh/logo.png` = thư mục con `anh` cùng cấp); đường dẫn tuyệt đối bắt đầu từ ổ đĩa hoặc thư mục gốc (`C:\du-an\anh\logo.png` hoặc `/home/user/du-an/anh/logo.png`). Khi Codex hoặc Claude Code nói "không tìm thấy file", trước tiên kiểm tra AI đang đứng ở thư mục nào - hỏi thẳng: "bạn đang ở thư mục nào, gõ `pwd` (Mac/Linux) hoặc `cd` không kèm gì (Windows) để xem".

## Port không phải domain

Khi chạy local, `localhost:3000` nghĩa là máy bạn, cổng 3000. Domain là địa chỉ để người khác tìm tới; port là "cửa" một chương trình đang lắng nghe - một máy có thể chạy nhiều chương trình cùng lúc, mỗi chương trình một cổng riêng để không giẫm lên nhau (ví dụ web server ở cổng 3000, database ở cổng 5432). Deploy biến cửa local thành địa chỉ công khai, nhưng không tự giải quyết database, secret hay backup - những thứ đó vẫn phải cấu hình riêng.

## Nhìn tận mắt một request thật

Lý thuyết ở trên sẽ rõ hơn nhiều nếu bạn tự thấy nó xảy ra. Làm một lần cho biết; về sau đây là công cụ bạn rút ra khi agent nói "đã sửa xong" mà trang vẫn hỏng - bạn cần một cách tự thấy sự thật mà không phải đọc code. Hai cách, làm cả hai:

**Cách 1 - dòng lệnh, xem thẳng response thô:**

> Đang dùng PowerShell trên Windows? Gõ `curl.exe` thay vì `curl` trong mọi lệnh ở bài này - PowerShell có sẵn một lệnh khác cũng tên tắt là `curl` (thật ra là `Invoke-WebRequest`), nhận cờ khác hẳn, gõ nhầm sẽ báo lỗi khó hiểu. Trên Mac/Linux hoặc Windows cmd, `curl` bình thường là đủ.

```bash
curl -i https://example.com
```

- `curl`: công cụ có sẵn trên Mac/Linux (Windows 10 trở lên cũng có sẵn) để tự tay gửi một request, không cần trình duyệt.
- `-i`: in cả **header** của response (thông tin đi kèm) lẫn nội dung, không chỉ nội dung.
- `example.com`: một domain có thật, dựng riêng để test/học, dùng thoải mái không lo phá gì.

Bạn sẽ thấy dòng đầu tiên dạng `HTTP/1.1 200 OK` - `200` là **mã trạng thái** (status code): 200 là thành công, 404 là "không tìm thấy trang", 500 là "server bị lỗi". Sau đó tới các header (`Content-Type: text/html` cho biết nội dung là HTML), rồi tới nội dung HTML thật của trang.

**Cách 2 - DevTools trong trình duyệt, xem request của một trang thật:**

1. Mở một trang bất kỳ (kể cả trang bạn đang tự làm), bấm `F12` (Windows) hoặc `Cmd+Option+I` (Mac) để mở DevTools.
2. Chọn tab **Network**.
3. Bấm tải lại trang (`F5` hoặc `Cmd+R`) - danh sách request sẽ hiện dần lên, mỗi dòng một request.
4. Bấm vào dòng đầu tiên (thường trùng tên trang). Xem tab **Headers**: mục "Request Method" (thường là `GET`), mục "Status Code" (200 nếu ổn).
5. Nếu trang có gọi API để lấy dữ liệu (ví dụ danh sách đơn hàng), lọc theo loại **Fetch/XHR** ở thanh trên - bấm vào request đó, xem tab **Response** để thấy dữ liệu JSON server trả về.

Đây chính là công cụ bạn sẽ dùng thường xuyên để tự kiểm tra khi nghi ngờ code AI viết có gọi đúng API hay không, thay vì chỉ tin lời AI nói "đã sửa xong".

## Bài tập

Mở một dự án đang chạy (của bạn hoặc dự án mẫu ở phần 09), làm theo đúng "Cách 2" ở trên với trang đó, rồi ghi lại: file khởi động, lệnh chạy, URL local, port, tên ít nhất một request thật xuất hiện trong tab Network, mã trạng thái của nó và (nếu có) nội dung JSON trả về.

## Checklist đạt bài

- [ ] Phân biệt frontend, backend và database.
- [ ] Giải thích được 4 bước request/response bằng ví dụ của chính mình.
- [ ] Phân biệt domain, localhost và port.
- [ ] Tự mở được tab Network và đọc được mã trạng thái của một request thật.
- [ ] Biết vì sao file secret không nằm ở frontend.

## Bước tiếp theo

Giờ nối giao diện với dữ liệu: [JSON, API, database và CRUD →](11-json-api-database-crud.md)
