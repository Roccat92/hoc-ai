# JSON, API, database và CRUD

Bài này dành cho người chuẩn bị làm ứng dụng có dữ liệu như đơn hàng, thành viên hoặc bài viết. Học xong bạn sẽ hiểu một bản ghi đi từ form tới database và quay lại màn hình ra sao, và tự tay gọi thử một API thật bằng một lệnh terminal duy nhất.

## JSON là gói dữ liệu

JSON (JavaScript Object Notation) là văn bản có cấu trúc để các phần của hệ thống trao đổi với nhau - frontend gửi JSON lên, backend trả JSON về:

```json
{
  "id": 12,
  "customer": "Lan",
  "status": "new",
  "total": 350000
}
```

Đọc nhanh: cặp `"tên trường": giá trị`, cách nhau bằng dấu phẩy, bọc trong `{ }`. Giá trị có thể là chữ (trong ngoặc kép), số (không ngoặc kép), `true`/`false`, hoặc một JSON khác lồng bên trong. Tên trường phải rõ nghĩa, kiểu dữ liệu nhất quán (đã là số thì luôn là số, đừng lúc `"350000"` lúc `350000`), và **không bao giờ đưa secret** (mật khẩu, API key) vào JSON gửi ra trình duyệt - trình duyệt là nơi ai cũng xem được qua DevTools ở bài trước.

## API là cửa giao tiếp

Frontend gọi API bằng request; backend kiểm tra quyền và dữ liệu rồi trả response. Một quy ước thường gặp, gọi là **REST**:

| Hành động | HTTP method | Ví dụ URL | Trả về khi thành công |
|---|---|---|---|
| Đọc danh sách | GET | `/api/orders` | `200 OK` + mảng JSON |
| Đọc một bản ghi | GET | `/api/orders/12` | `200 OK` + một object JSON |
| Tạo mới | POST | `/api/orders` | `201 Created` + bản ghi vừa tạo |
| Sửa | PATCH/PUT | `/api/orders/12` | `200 OK` + bản ghi đã sửa |
| Xóa | DELETE | `/api/orders/12` | `200 OK` hoặc `204 No Content` |

**CRUD** là viết tắt của **C**reate, **R**ead, **U**pdate, **D**elete - bốn thao tác này gần như phủ hết mọi tính năng quản lý dữ liệu bạn sẽ yêu cầu AI build. API tốt trả mã lỗi dễ hiểu (`400` nếu dữ liệu gửi lên sai định dạng, `401`/`403` nếu chưa đăng nhập hoặc không đủ quyền, `404` nếu không tìm thấy bản ghi), không tin dữ liệu từ trình duyệt gửi lên mà chưa kiểm tra lại, và không cho người dùng sửa/xóa bản ghi của người khác chỉ bằng cách đổi số `12` thành `13` trên URL.

## Tự tay gọi một API thật

[jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) là một API giả lập miễn phí, công khai, dựng riêng để luyện tập - gọi thoải mái, không cần đăng nhập, không ảnh hưởng dữ liệu thật của ai. Mở terminal và thử:

> Nhắc lại từ bài trước: đang dùng PowerShell trên Windows thì gõ `curl.exe` thay vì `curl` trong hai lệnh dưới đây.

```bash
curl https://jsonplaceholder.typicode.com/posts/1
```
- Gửi một request `GET` (mặc định của `curl` khi không ghi gì thêm) tới bản ghi có `id = 1`. Bạn sẽ nhận về một object JSON có các trường `userId`, `id`, `title`, `body`.

```bash
curl -X POST https://jsonplaceholder.typicode.com/posts -H "Content-Type: application/json" -d '{"title": "Don hang test", "body": "Mo ta", "userId": 1}'
```
- `-X POST`: đổi method từ GET (mặc định) sang POST - nghĩa là "tạo mới", không phải "đọc".
- `-H "Content-Type: application/json"`: báo cho server biết dữ liệu mình gửi lên có định dạng JSON.
- `-d '...'`: nội dung JSON gửi lên, đúng cú pháp như ví dụ JSON ở đầu bài. Dùng dấu **nháy đơn** bọc ngoài (không phải nháy kép) - cách này chạy đúng trên cả bash lẫn PowerShell mà không cần thêm dấu `\` nào.
- API này không lưu thật, chỉ giả vờ tạo và trả JSON kèm `id` mới - đủ để bạn thấy hình dạng một request `POST` thật trông thế nào.

## Database giữ dữ liệu lâu dài

Biến trong bộ nhớ của server sẽ mất khi server khởi động lại; database giữ dữ liệu trên đĩa hoặc dịch vụ quản lý, tồn tại qua mọi lần restart. SQLite (một file duy nhất trên đĩa) hợp để học và app nhỏ; khi nhiều người dùng cùng lúc hoặc cần scale, cân nhắc Postgres/managed database (xem [database production](../03-ha-tang-thuc-chien/06-database-production-backup.md)). Dù chọn gì, phải có migration (lịch sử thay đổi cấu trúc dữ liệu có thứ tự), backup và cách khôi phục đã thử qua ít nhất một lần - một bản backup chưa từng thử khôi phục không đáng tin.

## Luồng đầy đủ: tạo một đơn hàng

<figure style="max-width:640px;margin:24px auto">
<svg viewBox="0 0 620 190" width="100%" role="img" aria-label="Form gửi dữ liệu lên API, API lưu vào database rồi trả bản ghi mới về form" style="font-family:inherit;display:block">
  <rect x="20" y="55" width="140" height="70" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.7;stroke-width:1.5"/>
  <text x="90" y="85" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">Form</text>
  <text x="90" y="103" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">khách điền</text>

  <rect x="240" y="55" width="140" height="70" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:1;stroke-width:2"/>
  <text x="310" y="85" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">API</text>
  <text x="310" y="103" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">validate dữ liệu</text>

  <rect x="460" y="55" width="140" height="70" rx="4" style="fill:var(--vp-c-brand-1);fill-opacity:.08;stroke:var(--vp-c-brand-1);stroke-opacity:.7;stroke-width:1.5"/>
  <text x="530" y="85" style="fill:currentColor;font-size:14px;font-weight:600;text-anchor:middle">Database</text>
  <text x="530" y="103" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">lưu bản ghi</text>

  <text x="200" y="65" style="fill:var(--vp-c-text-2);font-size:11px;text-anchor:middle">1. POST /api/orders</text>
  <path d="M164 78 H236 M229 73 L236 78 L229 83" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <circle class="mh-anim mh-dot" cx="168" cy="78" r="4" style="fill:var(--vp-c-brand-1);stroke:none;animation:mh-3hop-a 9s ease-in-out infinite"/>

  <text x="200" y="145" style="fill:var(--vp-c-text-2);font-size:11px;text-anchor:middle">4. JSON: đơn hàng #12</text>
  <path d="M236 103 H164 M171 98 L164 103 L171 108" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <circle class="mh-anim mh-dot" cx="232" cy="103" r="4" style="fill:var(--vp-c-brand-1);stroke:none;animation:mh-3hop-d 9s ease-in-out infinite"/>

  <text x="420" y="65" style="fill:var(--vp-c-text-2);font-size:11px;text-anchor:middle">2. INSERT</text>
  <path d="M384 78 H456 M449 73 L456 78 L449 83" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <circle class="mh-anim mh-dot" cx="388" cy="78" r="4" style="fill:var(--vp-c-brand-1);stroke:none;animation:mh-3hop-b 9s ease-in-out infinite"/>

  <text x="420" y="145" style="fill:var(--vp-c-text-2);font-size:11px;text-anchor:middle">3. id = 12</text>
  <path d="M456 103 H384 M391 98 L384 103 L391 108" style="fill:none;stroke:var(--vp-c-text-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>
  <circle class="mh-anim mh-dot" cx="452" cy="103" r="4" style="fill:var(--vp-c-brand-1);stroke:none;animation:mh-3hop-c 9s ease-in-out infinite"/>

  <text x="310" y="175" style="fill:var(--vp-c-text-2);font-size:12px;text-anchor:middle">Cùng một khuôn 4 bước như bài trước, chỉ đổi vai trò các hộp</text>
</svg>
<figcaption style="text-align:center;font-size:14px;color:var(--vp-c-text-2);margin-top:8px">Form gửi dữ liệu lên API, API kiểm tra rồi lưu vào database, database trả lại bản ghi vừa tạo (kèm id mới) để form cập nhật màn hình.</figcaption>
</figure>

Điều dễ bị bỏ sót: **validate phải nằm ở bước 2 (API), không chỉ ở form.** Form chỉ chặn được người dùng vô ý gõ sai; API mới chặn được người cố tình gửi thẳng request giả (như bạn vừa làm bằng `curl` ở trên) mà bỏ qua form hoàn toàn. Nếu chỉ kiểm tra ở form, ai cũng có thể gửi dữ liệu bậy qua `curl` thẳng vào API.

## Bài tập

1. Chạy lại hai lệnh `curl` ở trên, đọc kỹ JSON trả về của cả GET và POST.
2. Vẽ lại sơ đồ 4 bước ở trên cho chính ứng dụng bạn định build (ví dụ: "khách đặt bàn" thay vì "tạo đơn hàng") - đổi tên 3 hộp và 4 nhãn mũi tên cho đúng ngữ cảnh của bạn.
3. Ghi ra ít nhất một trường hợp API phải từ chối (thiếu trường bắt buộc, số âm, hoặc sửa bản ghi không phải của mình) và mã lỗi nên trả về.

## Checklist đạt bài

- [ ] Đọc được một JSON đơn giản, chỉ ra đúng tên trường và kiểu dữ liệu.
- [ ] Phân biệt GET, POST, PATCH và DELETE bằng ví dụ của chính mình.
- [ ] Giải thích CRUD và ánh xạ đúng sang 4 HTTP method.
- [ ] Tự gọi được ít nhất một API thật bằng `curl` và đọc được JSON trả về.
- [ ] Biết vì sao validate phải nằm ở backend, không chỉ ở form.

## Bước tiếp theo

Nền tảng đã đủ để đọc code AI viết; giờ quay lại quy trình xây sản phẩm: [Cài một coding agent và chạy task đầu tiên →](../02-code-voi-ai/01-cai-mot-coding-agent.md)
