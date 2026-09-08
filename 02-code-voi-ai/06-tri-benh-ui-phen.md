# Chữa bệnh "UI phèn": để sản phẩm không nhìn ra ngay là AI code

Bài này dành cho người đã build được vài dự án ([dự án đầu tiên](03-du-an-dau-tien.md), hoặc xa hơn ở [phần 9](../09-du-an-thuc-hanh/)) và bắt đầu nhận ra một điều: dù chức năng chạy đúng, giao diện cứ nhìn... "quen quen", kiểu ai cũng đoán ra ngay "cái này AI code". Học xong bạn sẽ gọi được đúng tên các phần của một trang, biết chính xác vì sao AI hay ra giao diện "phèn", và có ba kỹ thuật thực chiến để AI code ra thứ có "chất riêng" thay vì bản sao của hàng nghìn app khác.

## Gọi đúng tên các phần của một trang

Trước khi chê giao diện xấu hay bảo AI sửa, bạn cần **gọi đúng tên từng phần** - nói "thu gọn cái **header** lại" thì AI hiểu ngay, còn "cái thanh ở trên ấy" thì dễ bị mò. Gần như mọi trang web đều chia làm ba tầng quen thuộc, xếp từ trên xuống:

- **Header (đầu trang):** thanh trên cùng, thường có **logo** bên trái và **menu điều hướng** (nav) bên phải. Là thứ người dùng thấy đầu tiên, nhiều trang cho nó "dính" lại khi cuộn.
- **Body / thân trang:** phần nội dung chính ở giữa - tiêu đề, văn bản, ảnh, form... chiếm phần lớn diện tích. Nhiều trang mở đầu thân bằng một khối lớn gây ấn tượng gọi là **hero** (ảnh to + một câu tuyên ngôn + nút bấm chính).
- **Footer (chân trang):** thanh dưới cùng, chữ nhỏ màu nhạt - thường chứa bản quyền, và các link phụ như điều khoản, liên hệ, mạng xã hội.

<div class="uia">
  <div class="uia__region">
    <div class="uia__label">HEADER · đầu trang</div>
    <div class="uia__header-row">
      <span class="uia__logo">Shop ABC</span>
      <span class="uia__nav"><span>Trang chủ</span><span>Sản phẩm</span><span>Liên hệ</span></span>
    </div>
  </div>
  <div class="uia__region uia__body">
    <div class="uia__label">BODY · thân trang (nội dung chính)</div>
    <div class="uia__h">Tiêu đề chính của trang</div>
    <div class="uia__line"></div>
    <div class="uia__line"></div>
    <div class="uia__line uia__line--short"></div>
  </div>
  <div class="uia__region">
    <div class="uia__label">FOOTER · chân trang</div>
    <div class="uia__footer-row">
      <span>© 2026 Shop ABC</span>
      <span>Điều khoản · Liên hệ · Facebook</span>
    </div>
  </div>
</div>

Mẹo mô tả cho AI: luôn chỉ rõ **phần nào** + **muốn gì**. Ví dụ: *"Header dính trên cùng khi cuộn trang"*, *"Footer đang chiếm quá nhiều chỗ, gom lại còn một dòng"*, *"Thêm một hero ở đầu thân trang với câu 'Mẻ bánh ra lò mỗi sáng' và nút 'Đặt bánh'"*. Gọi đúng tên là nửa đường tới việc AI sửa đúng ý.

## "UI phèn" là gì?

"UI phèn" là cách gọi dân dã (không phải thuật ngữ chính thức) cho kiểu giao diện **rập khuôn, một màu, generic** mà rất nhiều sản phẩm build bằng AI hay mắc phải - nhìn phát là biết ngay "code AI ra cái này", dù bạn chưa hỏi. Vài dấu hiệu nhận biết phổ biến nhất:

- **Gradient tím** (thường tím-hồng hoặc tím-xanh) phủ lên nền hoặc nút bấm chính, xuất hiện khắp nơi mà không có lý do thẩm mỹ cụ thể nào - chỉ vì "nhìn có vẻ hiện đại".
- **Mọi thứ đều là "card" bo góc giống hệt nhau** - thẻ sản phẩm, thẻ tính năng, khối thống kê... dù nội dung khác nhau hoàn toàn, hình dạng khung bao lại y hệt.
- **Bóng đổ (box-shadow) xám nhạt dưới MỌI card** - như một quy tắc mặc định áp cho tất cả, không phân biệt cái gì cần nổi bật, cái gì không.
- **Chữ viết hoa toàn bộ, cỡ nhỏ (ALL-CAPS)** dùng làm nhãn/tiêu đề phụ - kiểu "FEATURES", "OUR SERVICES", xuất hiện lặp đi lặp lại.
- **Icon emoji** (🚀 ✨ 💡) thay cho icon thiết kế riêng - nhanh, tiện, nhưng không có bản sắc.
- **Mũi tên "→"** gắn tự động ở cuối mọi nút bấm và đường link, như một tick không ai còn để ý.

### Nhìn tận mắt: đặt cạnh nhau cho dễ nhận ra

Đọc mô tả thì trừu tượng. Dưới đây là **giao diện thật render ngay trong trang**. Bắt đầu bằng **toàn cảnh** - một phần tử như cái nút chỉ "đọc" được đúng khi nhìn cả màn hình quanh nó: cùng một nội dung, dựng hai kiểu, bạn sẽ thấy ngay bên nào "ăn nhập".

**Toàn cảnh: hai màn hình cùng nội dung, hai "chất" khác hẳn**

<div style="display:flex;flex-direction:column;gap:20px;margin:20px 0;">
  <div>
    <div style="font-size:13px;font-weight:600;color:var(--vp-c-text-2);margin-bottom:8px;">✗ Phèn — nhìn toàn cảnh là biết AI code</div>
    <div style="border:1px solid var(--vp-c-border);border-radius:12px;overflow:hidden;font-family:system-ui,sans-serif;" role="img" aria-label="Màn hình landing kiểu phèn: gradient tím phủ khắp, chữ hoa, emoji, bóng đổ nặng">
      <div style="background:#efeff2;padding:8px 12px;display:flex;gap:6px;"><span style="width:10px;height:10px;border-radius:50%;background:#ff5f57;"></span><span style="width:10px;height:10px;border-radius:50%;background:#febc2e;"></span><span style="width:10px;height:10px;border-radius:50%;background:#28c840;"></span></div>
      <div style="background:#fff;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 18px;border-bottom:1px solid #f0f0f0;">
          <span style="font-weight:800;background:linear-gradient(135deg,#8b5cf6,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent;font-size:16px;">✨ TurboApp</span>
          <span style="font-size:12px;color:#9333ea;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">Trang chủ · Tính năng · Giá 🚀</span>
        </div>
        <div style="background:linear-gradient(135deg,#8b5cf6,#ec4899);padding:30px 22px;text-align:center;">
          <div style="color:#fff;opacity:.85;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">✨ Nền tảng số 1 ✨</div>
          <div style="color:#fff;font-size:23px;font-weight:800;text-transform:uppercase;margin:8px 0;line-height:1.2;">Tăng tốc doanh nghiệp 🚀</div>
          <div style="color:#fff;opacity:.9;font-size:13px;margin-bottom:16px;">Giải pháp all-in-one cho mọi nhu cầu của bạn.</div>
          <button style="border:none;background:#fff;color:#8b5cf6;padding:12px 28px;border-radius:999px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;font-size:13px;box-shadow:0 8px 20px rgba(0,0,0,.25);cursor:default;">Bắt đầu ngay →</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:18px;">
          <div style="background:#fff;border-radius:18px;box-shadow:0 6px 18px rgba(0,0,0,.14);padding:16px;">
            <div style="text-transform:uppercase;letter-spacing:1px;font-size:10px;color:#9333ea;font-weight:700;">🚀 Nhanh</div>
            <div style="font-size:14px;font-weight:700;color:#1a1a1a;margin:5px 0 3px;">Siêu tốc độ</div>
            <div style="font-size:12px;color:#666;">Nhanh hơn 10 lần.</div>
          </div>
          <div style="background:#fff;border-radius:18px;box-shadow:0 6px 18px rgba(0,0,0,.14);padding:16px;">
            <div style="text-transform:uppercase;letter-spacing:1px;font-size:10px;color:#ec4899;font-weight:700;">💎 Đẹp</div>
            <div style="font-size:14px;font-weight:700;color:#1a1a1a;margin:5px 0 3px;">Giao diện xịn</div>
            <div style="font-size:12px;color:#666;">Ai nhìn cũng mê.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div style="font-size:13px;font-weight:600;color:var(--vp-c-text-2);margin-bottom:8px;">✓ Có chủ đích — tiết chế, tinh tế, hợp bối cảnh</div>
    <div style="border:1px solid var(--vp-c-border);border-radius:12px;overflow:hidden;font-family:system-ui,sans-serif;" role="img" aria-label="Màn hình landing có chủ đích: một tông trầm, khoảng thở rộng, type phân cấp rõ, nút mực đen gọn">
      <div style="background:#efeff2;padding:8px 12px;display:flex;gap:6px;"><span style="width:10px;height:10px;border-radius:50%;background:#ff5f57;"></span><span style="width:10px;height:10px;border-radius:50%;background:#febc2e;"></span><span style="width:10px;height:10px;border-radius:50%;background:#28c840;"></span></div>
      <div style="background:#fff;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #eee;">
          <span style="font-weight:700;color:#17171b;font-size:16px;letter-spacing:-.2px;">Xưởng In ABC</span>
          <span style="font-size:13px;color:#52525b;">Trang chủ &nbsp; Tính năng &nbsp; Giá</span>
        </div>
        <div style="padding:34px 24px;">
          <div style="color:#b25a2e;font-size:12px;font-weight:600;letter-spacing:.2px;">Quản lý sản xuất</div>
          <div style="color:#17171b;font-size:24px;font-weight:600;letter-spacing:-.4px;margin:8px 0 10px;line-height:1.2;">Nắm toàn bộ xưởng trong một màn hình</div>
          <div style="color:#52525b;font-size:14px;margin-bottom:18px;line-height:1.55;max-width:400px;">Theo dõi tiến độ từng công đoạn, không cần gọi điện hỏi nhau.</div>
          <button style="border:none;background:#17171b;color:#fff;padding:11px 24px;border-radius:8px;font-weight:600;font-size:14.5px;letter-spacing:.1px;box-shadow:0 1px 2px rgba(0,0,0,.16),0 2px 6px rgba(0,0,0,.08);cursor:default;">Bắt đầu ngay</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:0 24px 24px;">
          <div style="background:#fff;border:1px solid #ececef;border-radius:10px;padding:18px;box-shadow:0 1px 2px rgba(16,24,40,.06),0 6px 16px rgba(16,24,40,.05);">
            <div style="font-size:12px;color:#6b6f76;font-weight:600;letter-spacing:.2px;">Tốc độ</div>
            <div style="font-size:15px;font-weight:600;color:#17171b;margin:8px 0 4px;letter-spacing:-.1px;">Cập nhật tức thì</div>
            <div style="font-size:13px;color:#52525b;line-height:1.5;">Trạng thái đơn thay đổi ngay khi thao tác.</div>
          </div>
          <div style="background:#fff;border:1px solid #ececef;border-radius:10px;padding:18px;box-shadow:0 1px 2px rgba(16,24,40,.06),0 6px 16px rgba(16,24,40,.05);">
            <div style="font-size:12px;color:#6b6f76;font-weight:600;letter-spacing:.2px;">Rõ ràng</div>
            <div style="font-size:15px;font-weight:600;color:#17171b;margin:8px 0 4px;letter-spacing:-.1px;">Một luồng duy nhất</div>
            <div style="font-size:13px;color:#52525b;line-height:1.5;">Ai cũng thấy đơn đang ở công đoạn nào.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Cùng một cái nút "Bắt đầu ngay": ở màn trên nó chỉ là một viên thuốc gradient nữa giữa một rừng gradient; ở màn dưới, nút mực đen gọn lại trở thành điểm nhấn rõ ràng vì mọi thứ quanh nó đã tiết chế. **Phần tử chỉ "đúng" khi hợp với môi trường của nó** - đó là lý do phải nhìn cả màn hình, không chỉ soi một nút rời.

**Giờ soi từng phần tử cho rõ khác biệt:**

**Nút bấm chính:**

<div class="uid">
  <div class="uid__col">
    <div class="uid__tag uid__tag--bad">✗ Phèn: gradient tím, bo viên thuốc, đổ bóng, ALL-CAPS, emoji + mũi tên</div>
    <div class="uid__stage uid__stage--light">
      <button class="uid-btn uid-btn--bad">🚀 BẮT ĐẦU NGAY →</button>
    </div>
  </div>
  <div class="uid__col">
    <div class="uid__tag uid__tag--good">✓ Có chủ đích: màu mực trầm sang, bo gọn, chữ thường, một bóng rất nhẹ tạo chiều sâu</div>
    <div class="uid__stage uid__stage--light">
      <button class="uid-btn uid-btn--good">Bắt đầu ngay</button>
    </div>
  </div>
</div>

**Thẻ (card) nội dung:**

<div class="uid">
  <div class="uid__col">
    <div class="uid__tag uid__tag--bad">✗ Phèn: bo góc lớn, bóng đổ xám, nhãn ALL-CAPS tím, emoji</div>
    <div class="uid__stage uid__stage--light">
      <div class="uid-card uid-card--bad">
        <div class="uid-card__label">✨ TÍNH NĂNG</div>
        <p class="uid-card__title">Nhanh &amp; Mượt</p>
        <p class="uid-card__body">Trải nghiệm siêu tốc cho người dùng của bạn.</p>
      </div>
    </div>
  </div>
  <div class="uid__col">
    <div class="uid__tag uid__tag--good">✓ Có chủ đích: viền mảnh, bo vừa, một bóng rất nhẹ tinh tế, type chỉn chu, nhãn thường</div>
    <div class="uid__stage uid__stage--light">
      <div class="uid-card uid-card--good">
        <div class="uid-card__label">Tính năng</div>
        <p class="uid-card__title">Nhanh và mượt</p>
        <p class="uid-card__body">Trải nghiệm siêu tốc cho người dùng của bạn.</p>
      </div>
    </div>
  </div>
</div>

Để ý điểm mấu chốt hay bị hiểu nhầm: **"có chủ đích" không phải là bỏ sạch mọi thứ cho trơ trụi** - làm thế thì nhạt, nhìn còn chán hơn cả bên phèn. Bên phải vẫn có màu (mực trầm), vẫn có chiều sâu (một lớp bóng rất nhẹ), vẫn bo góc - chỉ khác là **tiết chế đúng liều**: bóng vừa đủ để "nâng" chứ không phủ mờ cả khối, màu trầm sang thay vì gradient lòe loẹt, chữ thường gọn thay vì ALL-CAPS hô hào. Sang lên nhờ *chọn đúng*, không phải nhờ *bỏ hết*.

<p class="uid-note">Hai bên nội dung y hệt nhau — chỉ khác ở các quyết định thẩm mỹ. Bên phải không "đẹp hơn" một cách tuyệt đối, nó chỉ <strong>không rơi vào mẫu mặc định</strong> mà ai cũng nhận ra.</p>

> Hai thứ quyết định "chất" nhiều nhất - **font chữ** và **icon** (bỏ emoji, dùng icon thiết kế) - có một bài riêng đi sâu, kèm nguồn font miễn phí hỗ trợ tiếng Việt và cách cài vào dự án: [Font và icon](19-font-va-icon.md).

## Vì sao AI hay ra kiểu này?

Không phải vì AI "dốt thẩm mỹ". Nhắc lại cách LLM hoạt động ở [`00-ban-do-gioi-ai/02-llm-la-gi.md`](../00-ban-do-gioi-ai/02-llm-la-gi.md): AI dự đoán "cái gì có khả năng cao nhất" dựa trên những gì đã thấy trong dữ liệu huấn luyện. Khi bạn **không cho nó biết khẩu vị cụ thể** - không nói rõ thương hiệu, phong cách, cảm xúc bạn muốn truyền tải - nó buộc phải tự chọn, và lựa chọn "an toàn nhất" luôn là **phương án trung bình cộng**: những mẫu xuất hiện dày đặc nhất trong hàng loạt template SaaS, dashboard, landing page phổ biến trên internet những năm gần đây. Gradient tím, card bo tròn, bóng đổ nhạt... đều là những mẫu cực kỳ phổ biến trong dữ liệu đó - nên khi không bị ràng buộc gì khác, AI có xu hướng hội tụ về đúng những mẫu này.

Nói cách khác: **AI không thiếu gu thẩm mỹ, nó thiếu thông tin về gu thẩm mỹ CỦA BẠN.** Ba kỹ thuật dưới đây đều xoay quanh việc cung cấp đúng thông tin đó.

## Cài skill frontend-design chính chủ của Anthropic

Trước khi vào ba kỹ thuật, có một công cụ nền tảng đáng cài trước: **skill `frontend-design`** do chính đội ngũ Anthropic viết, chứa sẵn hướng dẫn giúp Claude Code tránh đúng những mẫu "UI phèn" kể trên, và ra quyết định thẩm mỹ có chủ đích hơn.

**Cách cài nhanh nhất - qua hệ thống plugin có sẵn**, gõ hai lệnh này ngay trong Claude Code:

```
/plugin marketplace add anthropics/claude-code
/plugin install frontend-design@claude-code-plugins
```
- Dòng 1: thêm kho plugin chính thức của Anthropic (chỉ cần làm một lần cho mọi plugin sau này).
- Dòng 2: cài skill `frontend-design` từ kho đó.

> Cú pháp lệnh `/plugin` có thể đổi theo phiên bản Claude Code - nếu lệnh trên báo lỗi, gõ `/plugin` không kèm gì để mở menu cài đặt, hoặc xem [tài liệu chính chủ](https://code.claude.com/docs/en/plugins) *(kiểm tra: 07/09/2026)*.

**Nếu bản Claude Code của bạn chưa hỗ trợ lệnh `/plugin`** (phiên bản cũ), cài thủ công bằng cách tải file skill về thư mục skill cá nhân:

**Bước 1 - Tạo thư mục đích:**
```bash
mkdir -p ~/.claude/skills/frontend-design
```
- Thư mục `~/.claude/skills/` là nơi Claude Code tìm các skill **cấp cá nhân** - cài một lần ở đây, dùng được cho **mọi dự án** trên máy bạn, không phải cài lại từng dự án.

**Bước 2 - Tải file skill về đúng vị trí:**
```bash
curl -fsSL -o ~/.claude/skills/frontend-design/SKILL.md \
  https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md
```
- `-f`: báo lỗi rõ ràng nếu tải thất bại (thay vì âm thầm lưu một file lỗi).
- `-s -S`: chạy im lặng nhưng vẫn hiện thông báo nếu có lỗi.
- `-L`: tự động đi theo nếu link bị chuyển hướng.
- `-o ...`: lưu nội dung tải về đúng đường dẫn file skill.

**Bước 3 - Kiểm tra đã cài đúng:**
```bash
head -n 5 ~/.claude/skills/frontend-design/SKILL.md
```
Thấy hiện ra phần đầu file với dòng `name: frontend-design` là tải đúng. Cách kiểm tra thực tế hơn: mở Claude Code ở bất kỳ dự án nào, giao một việc liên quan tới giao diện (ví dụ "làm trang chủ cho tôi") - nếu skill hoạt động, Claude Code thường sẽ tự nhắc đang áp dụng hướng dẫn thiết kế trước khi viết code. Nếu không chắc, hỏi thẳng: "bạn có đang thấy skill frontend-design không?"

> Cách cài thủ công này dựa trên đúng file skill thật trong repo chính chủ - nếu link tải lỗi (đường dẫn file có thể đổi), xem lại [thư mục plugin chính chủ](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design) để lấy đường dẫn mới.

## Ba kỹ thuật cho AI "khẩu vị"

### a) Đưa ảnh mẫu

Claude Code đọc được ảnh bạn đính kèm trực tiếp vào cuộc trò chuyện - dùng luôn khả năng này để "chỉ tay" thay vì chỉ mô tả bằng lời (vốn rất khó diễn đạt chính xác cảm giác thẩm mỹ). Chụp màn hình một sản phẩm bạn thấy đẹp, kéo thả (hoặc dán) vào Claude Code, kèm mô tả bạn muốn học theo tinh thần gì, không phải copy y hệt:

```
[đính kèm ảnh chụp màn hình một ứng dụng có giao diện tối giản]
Tôi muốn trang dashboard của mình có tinh thần thiết kế giống ảnh này -
không cần giống y hệt, nhưng học theo: bảng màu tối giản (đen-trắng-một
màu nhấn), khoảng trắng rộng rãi, không dùng card bo tròn kiểu mặc định,
typography rõ ràng có phân cấp. Áp dụng tinh thần này cho trang quản lý
đơn hàng tôi đang làm.
```

### b) Khai báo khẩu vị trong CLAUDE.md

Nhắc lại từ [`08-chuan-hoa-du-an/04-claude-md-va-ngu-canh.md`](../08-chuan-hoa-du-an/04-claude-md-va-ngu-canh.md): CLAUDE.md là nơi ghi quy ước AI **tự động đọc** mỗi phiên - thêm hẳn một mục thẩm mỹ vào đó để không phải nhắc lại mỗi lần.

**Template mẫu:**
```markdown
## Thẩm mỹ / Khẩu vị thiết kế
- Nền: [ví dụ: trắng ngà #FAFAF8]
- Màu nhấn (accent) duy nhất: [ví dụ: xanh rêu đậm #2D4A3E]
- Font: [ví dụ: Inter cho nội dung, một font có cá tính riêng cho tiêu đề lớn]
- Bo góc: [ví dụ: 4px - không bo tròn kiểu "viên thuốc"]
- CẤM:
  - Gradient trang trí không có lý do
  - Card giống hệt nhau cho mọi loại nội dung, bất kể ý nghĩa
  - Icon emoji thay cho icon thiết kế
  - Chữ ALL-CAPS cho nhãn/tiêu đề phụ
  - Mũi tên "→" gắn mặc định cuối mọi nút
```

**Cùng một app, hai bộ khẩu vị khác nhau ra hai chất hoàn toàn khác nhau** - ví dụ cho cùng yêu cầu "làm trang chủ giới thiệu sản phẩm":

**Bộ khẩu vị A - "Tối giản công sở"** (hợp cho web quản lý nội bộ, dashboard):
```
Nền trắng, chữ đen, đúng một màu nhấn xanh navy. Font hệ thống
(system-ui). Bo góc rất nhỏ (2-4px). Không hiệu ứng chuyển động ngoài
hover đổi màu nhẹ. Bố cục dạng bảng/lưới rõ ràng, ưu tiên mật độ thông
tin cao hơn là trang trí.
```

**Bộ khẩu vị B - "Ấm áp thủ công"** (hợp cho landing page tiệm bánh, quán cà phê):
```
Nền be/kem ấm, chữ nâu đậm, màu nhấn cam đất (terracotta). Font có
chân (serif) cho tiêu đề, font không chân cho nội dung. Bo góc lớn,
mềm mại (12-16px). Ưu tiên ảnh chụp thật thay vì minh họa vector.
Khoảng trắng rộng rãi, nhịp đọc chậm rãi.
```

**Hai khẩu vị đó render ra trông thế nào** - cùng một nội dung "trang chủ giới thiệu sản phẩm", hai chất hoàn toàn khác:

<div class="uid">
  <div class="uid__col">
    <div class="uid__tag uid__tag--good">Khẩu vị A — Tối giản công sở</div>
    <div class="uid__stage uid__stage--light">
      <div class="uid-hero uid-hero--a">
        <div class="uid-hero__kicker">Quản lý đơn hàng</div>
        <div class="uid-hero__h">Nắm toàn bộ xưởng trong một màn hình</div>
        <p class="uid-hero__p">Theo dõi tiến độ từng công đoạn, không cần gọi điện hỏi nhau.</p>
        <span class="uid-hero__cta">Dùng thử</span>
      </div>
    </div>
  </div>
  <div class="uid__col">
    <div class="uid__tag uid__tag--good">Khẩu vị B — Ấm áp thủ công</div>
    <div class="uid__stage uid__stage--cream">
      <div class="uid-hero uid-hero--b">
        <div class="uid-hero__kicker">Tiệm bánh nhà làm</div>
        <div class="uid-hero__h">Mẻ bánh ra lò mỗi sáng</div>
        <p class="uid-hero__p">Nguyên liệu chọn tay, nướng trong ngày, giao tận nơi khi còn ấm.</p>
        <span class="uid-hero__cta">Đặt bánh</span>
      </div>
    </div>
  </div>
</div>

Cả hai đều **không phải** "UI phèn" - vì cả hai đều là lựa chọn có chủ đích, không phải mặc định AI tự chọn khi không được hỏi. Để ý: bên nào cũng dùng đúng **một** màu nhấn, không có gradient tím, không emoji, không mũi tên gắn thừa.

### c) Vòng lặp sửa bằng ảnh

Đừng chỉ đọc code để đánh giá giao diện - **chạy app thật, chụp màn hình chỗ đang xấu**, và mô tả chính xác cái gì sai (không nói chung chung "xấu quá", "chưa đẹp"). Đây chính là kỹ thuật đọc lỗi và mô tả cụ thể đã học ở [`01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai.md`](../01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai.md), áp dụng cho thẩm mỹ thay vì lỗi kỹ thuật.

**Ba câu prompt sửa mẫu** (luôn kèm ảnh chụp màn hình thật):

```
[ảnh chụp màn hình] Cái card sản phẩm này đang dùng đúng công thức
"UI phèn" - bo góc + bóng đổ mặc định. Đổi sang: viền mảnh 1px màu
xám nhạt, không bóng đổ, bo góc chỉ 4px.
```

```
[ảnh chụp màn hình] Khoảng cách giữa banner và phần danh sách bên dưới
đang quá sát, nhìn bí. Tăng khoảng cách (padding/margin) giữa hai phần
này lên rõ rệt.
```

```
[ảnh chụp màn hình] Nút "Gửi" đang lẫn vào nền vì cùng tông màu nhạt.
Đổi màu nút thành đúng màu nhấn đã khai báo trong CLAUDE.md, chữ trắng,
để nổi bật hẳn lên.
```

## Nguồn tham khảo thẩm mỹ miễn phí để "luyện mắt"

Càng xem nhiều thiết kế tốt, bạn càng dễ nhận ra và mô tả chính xác điều mình muốn (thay vì chỉ nói được "đẹp hơn" một cách mơ hồ). Vài nơi đáng xem, miễn phí:

- **[Mobbin](https://mobbin.com)** - thư viện screenshot giao diện thật từ hàng nghìn app thật (không phải mockup), có bản miễn phí xem giới hạn - hữu ích vì đây là thiết kế đã thực sự chạy sản phẩm, không chỉ đẹp trên giấy.
- **[Dribbble](https://dribbble.com)** - cộng đồng designer chia sẻ mockup, rất nhiều ý tưởng sáng tạo - lưu ý một số thiết kế ở đây thiên về "đẹp để khoe" hơn là thực tế để code/dùng thật, chọn lọc kỹ trước khi lấy làm tham khảo.
- **[Land-book](https://land-book.com)** - tuyển chọn landing page đẹp, thực tế, đã lên sóng thật, phân loại theo ngành/phong cách.
- **[Awwwards](https://www.awwwards.com)** - giải thưởng thiết kế web lâu đời, nhiều case chất lượng cao, thiên về sáng tạo/thử nghiệm hơn Land-book.

**Cách dùng đúng:** **không copy nguyên xi** một thiết kế của người khác (đặc biệt nếu sản phẩm của bạn dùng mục đích thương mại) - chỉ **mượn bố cục, bảng màu, tinh thần chung**, rồi áp dụng vào sản phẩm của bạn theo đúng kỹ thuật (a) ở trên: chụp lại ví dụ ưng ý, đưa cho AI kèm mô tả "học theo tinh thần này".

## Chốt: checklist 5 câu tự hỏi trước khi khoe sản phẩm

Trước khi gửi link cho ai đó xem, tự hỏi:

1. Có gradient tím (hay bất kỳ gradient trang trí vô cớ nào) ở đâu không?
2. Mọi card có đang bo góc + đổ bóng giống hệt nhau, bất kể nội dung là gì không?
3. Có chữ ALL-CAPS cỡ nhỏ dùng làm nhãn/tiêu đề phụ lặp lại khắp nơi không?
4. Có đang dùng icon emoji thay vì icon thiết kế riêng không?
5. Mọi nút/link có đang tự động gắn thêm "→" ở cuối không?

**Trả lời "có" từ 2 câu trở lên** - quay lại kỹ thuật (b), khai báo rõ khẩu vị vào CLAUDE.md, rồi chạy vòng lặp sửa bằng ảnh ở kỹ thuật (c) cho tới khi cả 5 câu đều "không".

> Giao diện đã có chất riêng rồi thì cũng đừng vội khoe ngay - trước khi gửi link cho người khác dùng thử, còn một checklist khác đáng đi qua: [Bảo mật tối thiểu ở phần 10](../10-bao-mat/). Quay lại đó bất cứ lúc nào trước khi public, không cần đọc ngay bây giờ.

## Bước tiếp theo

Giao diện đã có chất riêng. Trước khi đưa sản phẩm lên internet, dừng một nhịp để hiểu công cụ mình đang cầm: vì sao cùng một Claude mà mỗi chỗ làm được việc khác nhau: [Harness là gì?](07-harness-la-gi.md)
