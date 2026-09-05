# Chữa bệnh "UI phèn": để sản phẩm không nhìn ra ngay là AI code

Bài này dành cho người đã build được vài dự án ([dự án đầu tiên](03-du-an-dau-tien.md), hoặc xa hơn ở [phần 9](../09-du-an-thuc-hanh/)) và bắt đầu nhận ra một điều: dù chức năng chạy đúng, giao diện cứ nhìn... "quen quen", kiểu ai cũng đoán ra ngay "cái này AI code". Học xong bạn sẽ biết chính xác vì sao AI hay ra giao diện kiểu đó, và có ba kỹ thuật thực chiến để AI code ra thứ có "chất riêng" thay vì bản sao của hàng nghìn app khác.

## "UI phèn" là gì?

"UI phèn" là cách gọi dân dã (không phải thuật ngữ chính thức) cho kiểu giao diện **rập khuôn, một màu, generic** mà rất nhiều sản phẩm build bằng AI hay mắc phải - nhìn phát là biết ngay "code AI ra cái này", dù bạn chưa hỏi. Vài dấu hiệu nhận biết phổ biến nhất:

- **Gradient tím** (thường tím-hồng hoặc tím-xanh) phủ lên nền hoặc nút bấm chính, xuất hiện khắp nơi mà không có lý do thẩm mỹ cụ thể nào - chỉ vì "nhìn có vẻ hiện đại".
- **Mọi thứ đều là "card" bo góc giống hệt nhau** - thẻ sản phẩm, thẻ tính năng, khối thống kê... dù nội dung khác nhau hoàn toàn, hình dạng khung bao lại y hệt.
- **Bóng đổ (box-shadow) xám nhạt dưới MỌI card** - như một quy tắc mặc định áp cho tất cả, không phân biệt cái gì cần nổi bật, cái gì không.
- **Chữ viết hoa toàn bộ, cỡ nhỏ (ALL-CAPS)** dùng làm nhãn/tiêu đề phụ - kiểu "FEATURES", "OUR SERVICES", xuất hiện lặp đi lặp lại.
- **Icon emoji** (🚀 ✨ 💡) thay cho icon thiết kế riêng - nhanh, tiện, nhưng không có bản sắc.
- **Mũi tên "→"** gắn tự động ở cuối mọi nút bấm và đường link, như một tick không ai còn để ý.

### Nhìn tận mắt: đặt cạnh nhau cho dễ nhận ra

Đọc mô tả thì trừu tượng. Dưới đây là **phần tử thật render ngay trong trang** - bên trái là kiểu "phèn", bên phải là cùng thành phần đó nhưng có chủ đích. Nhìn quen mắt hai bên rồi, bạn sẽ tự soi ra "bệnh" trong sản phẩm của mình.

**Nút bấm chính:**

<div class="uid">
  <div class="uid__col">
    <div class="uid__tag uid__tag--bad">✗ Phèn: gradient tím, bo viên thuốc, đổ bóng, ALL-CAPS, emoji + mũi tên</div>
    <div class="uid__stage uid__stage--light">
      <button class="uid-btn uid-btn--bad">🚀 BẮT ĐẦU NGAY →</button>
    </div>
  </div>
  <div class="uid__col">
    <div class="uid__tag uid__tag--good">✓ Có chủ đích: một màu nhấn đặc, bo nhỏ, chữ thường, không trang trí thừa</div>
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
    <div class="uid__tag uid__tag--good">✓ Có chủ đích: viền mảnh 1px, bo 4px, không bóng, nhãn thường</div>
    <div class="uid__stage uid__stage--light">
      <div class="uid-card uid-card--good">
        <div class="uid-card__label">Tính năng</div>
        <p class="uid-card__title">Nhanh và mượt</p>
        <p class="uid-card__body">Trải nghiệm siêu tốc cho người dùng của bạn.</p>
      </div>
    </div>
  </div>
</div>

<p class="uid-note">Hai bên nội dung y hệt nhau — chỉ khác ở các quyết định thẩm mỹ. Bên phải không "đẹp hơn" một cách tuyệt đối, nó chỉ <strong>không rơi vào mẫu mặc định</strong> mà ai cũng nhận ra.</p>

> Hai thứ quyết định "chất" nhiều nhất - **font chữ** và **icon** (bỏ emoji, dùng icon thiết kế) - có một bài riêng đi sâu, kèm nguồn font miễn phí hỗ trợ tiếng Việt và cách cài vào dự án: [Font và icon](19-font-va-icon.md).

## Vì sao AI hay ra kiểu này?

Không phải vì AI "dốt thẩm mỹ". Nhắc lại cách LLM hoạt động ở [`00-ban-do-gioi-ai/02-llm-la-gi.md`](../00-ban-do-gioi-ai/02-llm-la-gi.md): AI dự đoán "cái gì có khả năng cao nhất" dựa trên những gì đã thấy trong dữ liệu huấn luyện. Khi bạn **không cho nó biết khẩu vị cụ thể** - không nói rõ thương hiệu, phong cách, cảm xúc bạn muốn truyền tải - nó buộc phải tự chọn, và lựa chọn "an toàn nhất" luôn là **phương án trung bình cộng**: những mẫu xuất hiện dày đặc nhất trong hàng loạt template SaaS, dashboard, landing page phổ biến trên internet những năm gần đây. Gradient tím, card bo tròn, bóng đổ nhạt... đều là những mẫu cực kỳ phổ biến trong dữ liệu đó - nên khi không bị ràng buộc gì khác, AI có xu hướng hội tụ về đúng những mẫu này.

Nói cách khác: **AI không thiếu gu thẩm mỹ, nó thiếu thông tin về gu thẩm mỹ CỦA BẠN.** Ba kỹ thuật dưới đây đều xoay quanh việc cung cấp đúng thông tin đó.

## Cài skill frontend-design chính chủ của Anthropic

Trước khi vào ba kỹ thuật, có một công cụ nền tảng đáng cài trước: **skill `frontend-design`** do chính đội ngũ Anthropic viết, chứa sẵn hướng dẫn giúp Claude Code tránh đúng những mẫu "UI phèn" kể trên, và ra quyết định thẩm mỹ có chủ đích hơn.

**Cài đặt từng bước** (tại thời điểm viết, plugin này chưa có lệnh cài tự động - cài thủ công bằng cách tải file skill về thư mục skill cá nhân):

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

> Skill này chưa có kênh cài đặt chính thức qua hệ thống plugin tại thời điểm viết - luôn kiểm tra [README chính chủ](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design) để có cách cài mới nhất, đề phòng Anthropic bổ sung cách cài tiện hơn sau này.

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
