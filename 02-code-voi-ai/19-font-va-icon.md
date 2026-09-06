# Font và icon: cho giao diện một tiếng nói riêng

Bài này nối tiếp [chữa bệnh "UI phèn"](06-tri-benh-ui-phen.md). Ở đó bạn học cách tránh những mẫu giao diện generic; bài này đi sâu vào hai thứ quyết định "chất" của giao diện nhiều hơn người ta tưởng: **font chữ** và **icon**. Học xong bạn sẽ biết cách chọn font miễn phí có hỗ trợ tiếng Việt, cài font riêng vào dự án (ba cách, kèm ưu nhược), và dùng kho icon thiết kế thay cho emoji - cùng cách nói để AI làm đúng những việc này.

## Vì sao font là thứ đầu tiên lộ ra "phèn"

Đổi đúng một font, cả trang đổi khí chất. Ngược lại, để nguyên font mặc định của framework (thường là một font sans-serif hệ thống nhàn nhạt) là một trong những dấu hiệu "code AI ra" rõ nhất - vì đó chính là lựa chọn mặc định khi [không ai nói cho AI biết khẩu vị](06-tri-benh-ui-phen.md#vi-sao-ai-hay-ra-kieu-nay).

Font không chỉ để "đọc được". Nó mang cảm xúc: một tiệm bánh và một dashboard tài chính cần hai giọng chữ hoàn toàn khác nhau.

## Bốn nhóm font, dùng vào việc gì

<div class="uid-font">
  <div class="uid-font__row"><span class="uid-font__demo" style="font-family: Georgia, 'Times New Roman', serif;">Mẻ bánh ra lò</span><span class="uid-font__label"><strong>Serif</strong> (có chân) - cảm giác cổ điển, ấm, đáng tin. Hợp báo chí, thương hiệu thủ công, tiêu đề lớn.</span></div>
  <div class="uid-font__row"><span class="uid-font__demo" style="font-family: system-ui, -apple-system, sans-serif;">Nắm toàn bộ xưởng</span><span class="uid-font__label"><strong>Sans-serif</strong> (không chân) - hiện đại, sạch, dễ đọc trên màn hình. Mặc định an toàn cho phần lớn app.</span></div>
  <div class="uid-font__row"><span class="uid-font__demo" style="font-family: 'Courier New', monospace;">TDG-10241</span><span class="uid-font__label"><strong>Monospace</strong> (đều ô) - mỗi ký tự rộng bằng nhau. Hợp code, mã đơn, số liệu cần thẳng cột.</span></div>
  <div class="uid-font__row"><span class="uid-font__demo" style="font-family: 'Brush Script MT', cursive; font-size: 26px;">Ưu đãi hôm nay</span><span class="uid-font__label"><strong>Display / trang trí</strong> - cá tính mạnh, chỉ dùng cho tiêu đề ngắn, logo. Không bao giờ dùng cho đoạn văn dài.</span></div>
</div>

**Nguyên tắc vàng: một trang chỉ nên có 1-2 font.** Thường là một font cho tiêu đề (có thể cá tính) và một font cho nội dung (ưu tiên dễ đọc). Ba font trở lên là bắt đầu loạn.

## Cạm bẫy số 1 với người Việt: dấu tiếng Việt

Đây là điều tài liệu nước ngoài không nhắc, nhưng làm sản phẩm tiếng Việt thì phải nhớ: **rất nhiều font đẹp không có đủ dấu tiếng Việt.** Chữ `ữ`, `ợ`, `ẩ`, `ỉ`... sẽ hiện sai, lệch, hoặc nhảy sang font khác nhìn rất chắp vá.

Luôn kiểm tra font có hỗ trợ **Vietnamese** trước khi chọn. Cách thử nhanh: gõ thử câu `"Tự học lập trình để giải quyết vấn đề của chính mình"` bằng font đó, soi kỹ các chữ có dấu chồng (`ữ`, `ượ`, `ẳ`).

## Nguồn font miễn phí, dùng được cho cả sản phẩm thương mại

| Nguồn | Điểm mạnh | Lưu ý |
|---|---|---|
| [Google Fonts](https://fonts.google.com) | Kho lớn nhất, lọc được "Vietnamese", miễn phí cả thương mại | Dùng qua CDN của Google sẽ gửi IP người dùng về Google (vấn đề riêng tư/GDPR) - xem cách tự host bên dưới |
| [Fontshare](https://fontshare.com) | Font chất lượng cao của Indian Type Foundry, miễn phí | Kiểm tra kỹ dấu tiếng Việt từng font |
| [Bunny Fonts](https://fonts.bunny.net) | "Google Fonts phiên bản tôn trọng riêng tư" - cùng kho, không theo dõi | Thay thẳng link Google Fonts bằng link Bunny |
| [Fontsource](https://fontsource.org) | Đóng gói sẵn để **tự host qua npm**, tiện cho dự án React/Next | Cài bằng lệnh, không cần tải file tay |

> Font tiếng Việt được ưa dùng: **Inter, Be Vietnam Pro, Nunito Sans, Lora, Merriweather** (đều có trên Google Fonts, đủ dấu). **Be Vietnam Pro** do người Việt thiết kế, dấu rất chuẩn.

## Ba cách cài font vào dự án

### Cách 1 - Nhúng qua `<link>` (nhanh nhất, cho người mới)

Vào Google Fonts (hoặc Bunny Fonts), chọn font + độ đậm cần, copy đoạn `<link>` vào phần `<head>`:

```html
<link rel="preconnect" href="https://fonts.bunny.net">
<link href="https://fonts.bunny.net/css?family=be-vietnam-pro:400,600,700" rel="stylesheet">
```
- Dùng `fonts.bunny.net` thay `fonts.googleapis.com` để không lộ IP người dùng cho Google.
- `400,600,700` = ba độ đậm (thường, đậm vừa, đậm). **Chỉ lấy độ đậm bạn thật sự dùng** - mỗi độ đậm là một file phải tải thêm.

Rồi khai báo trong CSS:
```css
body { font-family: "Be Vietnam Pro", system-ui, sans-serif; }
```
- `system-ui, sans-serif` ở cuối là **font dự phòng**: nếu font chính chưa tải xong, trình duyệt dùng tạm font hệ thống thay vì để trang trắng chữ.

### Cách 2 - Tự host qua Fontsource (tốt cho React/Next.js)

Tự host = file font nằm trên máy chủ của bạn, không phụ thuộc bên thứ ba, nhanh và riêng tư hơn:

```bash
npm install @fontsource/be-vietnam-pro
```
Rồi import ở file khởi động ứng dụng:
```js
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/700.css";
```
- Mỗi dòng import một độ đậm - lại nhắc: chỉ lấy cái cần dùng.

### Cách 3 - `@font-face` thủ công (khi có file font riêng)

Khi bạn mua/được cấp một file font (`.woff2`), tự khai báo:
```css
@font-face {
  font-family: "Tên Font Của Tôi";
  src: url("/fonts/ten-font.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
```
- Ưu tiên định dạng **`.woff2`** - nhẹ nhất, mọi trình duyệt hiện đại đều hiểu.
- `font-display: swap` - hiện font dự phòng trước, đổi sang font chính khi tải xong (tránh chữ vô hình lúc đầu).

> Nếu dự án dùng **Next.js**, có sẵn `next/font` tự tối ưu và tự host font giúp bạn - hỏi AI: "dùng next/font để nạp Be Vietnam Pro cho dự án này".

## Icon: bỏ emoji, dùng icon thiết kế

Nhớ dấu hiệu "UI phèn": [dùng emoji 🚀 ✨ 💡 thay icon thiết kế](06-tri-benh-ui-phen.md#ui-phen-la-gi). Emoji nhanh nhưng mỗi hệ máy hiển thị một kiểu, không đồng bộ nét, không đổi được màu theo giao diện. So sánh:

<div class="uid">
  <div class="uid__col">
    <div class="uid__tag uid__tag--bad">✗ Emoji: mỗi máy một kiểu, không chỉnh được nét/màu</div>
    <div class="uid__stage uid__stage--light">
      <span style="font-size: 22px; color:#1a1a1a;">🚀 Tăng tốc &nbsp;&nbsp; ⚙️ Cài đặt &nbsp;&nbsp; 🔔 Thông báo</span>
    </div>
  </div>
  <div class="uid__col">
    <div class="uid__tag uid__tag--good">✓ Icon SVG: cùng nét, cùng màu, sắc nét mọi cỡ</div>
    <div class="uid__stage uid__stage--light">
      <span style="display:inline-flex; gap:22px; align-items:center; color:#1e3a5f;">
        <span style="display:inline-flex; gap:7px; align-items:center; font-size:15px; color:#1a1a1a;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>Tăng tốc</span>
        <span style="display:inline-flex; gap:7px; align-items:center; font-size:15px; color:#1a1a1a;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>Cài đặt</span>
        <span style="display:inline-flex; gap:7px; align-items:center; font-size:15px; color:#1a1a1a;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>Thông báo</span>
      </span>
    </div>
  </div>
</div>

### Kho icon miễn phí đáng dùng

Gần như tất cả đều giấy phép **MIT** hoặc tương đương (dùng thoải mái cả thương mại), nét đồng bộ trong cùng một bộ:

| Kho | Phong cách |
|---|---|
| [Lucide](https://lucide.dev) | Nét mảnh, sạch, rất phổ biến với dự án web hiện đại (chính là bộ dùng trong ví dụ trên) |
| [Heroicons](https://heroicons.com) | Của đội Tailwind CSS, có bản nét và bản đặc |
| [Phosphor](https://phosphoricons.com) | Kho khổng lồ, nhiều độ đậm |
| [Tabler Icons](https://tabler.io/icons) | Hơn 5000 icon, đồng bộ tốt |
| [Material Symbols](https://fonts.google.com/icons) | Của Google, kho rất rộng |

### Ba cách dùng icon

1. **Copy thẳng SVG** - vào trang icon, bấm copy, dán đoạn `<svg>...</svg>` vào code. Đơn giản nhất, không cần cài gì. Đổi màu bằng thuộc tính `stroke` hoặc `fill`.
2. **Thư viện component** - ví dụ `npm install lucide-react`, rồi dùng như `<Rocket />`. Tiện cho React, chỉ đóng gói đúng icon bạn dùng.
3. **[Iconify](https://iconify.design)** - một cổng gom hầu hết mọi kho icon, gọi icon nào cũng được qua một cú pháp chung.

## Nói với AI thế nào cho đúng

Font và icon là "khẩu vị" - phải khai báo, đừng để AI tự đoán. Ghi thẳng vào [CLAUDE.md](../08-chuan-hoa-du-an/04-claude-md-va-ngu-canh.md):

```markdown
## Font & Icon
- Font tiêu đề: Be Vietnam Pro (đậm 700)
- Font nội dung: Inter (thường 400)
- Tự host qua Fontsource, KHÔNG nhúng Google Fonts CDN (lý do riêng tư)
- Icon: dùng bộ Lucide, KHÔNG dùng emoji làm icon
```

Muốn diễn đạt chính xác hơn nữa - "canh icon thẳng hàng với chữ", "giảm độ đậm nét icon" - thì cần đúng thuật ngữ, đó là nội dung bài kế tiếp.

## Bước tiếp theo

Bạn để ý chưa: xuyên suốt hai bài về giao diện, sức mạnh nằm ở chỗ **nói đúng từ** - "refactor", "polish", "canh lề". Bài cuối phần này gom lại bộ thuật ngữ đó: [Nói đúng thuật ngữ khi làm việc với AI](20-tu-vung-lam-viec-voi-ai.md)
