# Grok Bot: cài đặt, đăng nhập, chat agent và Computer

Bài này dành cho người đã cài môi trường cơ bản ([bài cài môi trường](../../01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md)) và muốn dùng một **agent desktop** - không chỉ chat trong trình duyệt - để đọc file máy bạn, chạy lệnh, mở trình duyệt và giữ việc chạy khi bạn không ngồi trước màn hình. Học xong bạn sẽ phân biệt được **Grok AI** với **Grok Bot**, cài/mở được app, đăng nhập đúng cách, và chạy được một task chỉ-đọc an toàn.

## Grok AI và Grok Bot khác nhau thế nào?

Hai tên dễ lẫn vì cùng họ "Grok". Trong thực tế chúng là **hai lớp sản phẩm khác nhau**:

### Grok AI (model / chatbot)

**Grok AI** là **mô hình ngôn ngữ** (và chatbot dùng model đó) do **xAI** phát triển. Bạn gặp Grok AI chủ yếu khi:

- Chat trên web hoặc app của xAI / nền tảng gắn Grok
- Gọi API model Grok từ code (nếu bạn build app có AI bên trong)
- Chọn model "Grok" trong một sản phẩm chat nào đó hỗ trợ nhiều model

Ở lớp này, Grok AI **trả lời và suy luận bằng chữ**. Nó không tự có quyền mở folder `E:\du-an` trên máy bạn, không tự cài package, không tự theo dõi PR GitHub trừ khi sản phẩm chat đó bọc thêm công cụ.

Tóm một câu: **Grok AI = bộ não (model) + hội thoại.**

### Grok Bot (agent desktop)

**Grok Bot** là **ứng dụng agent trên máy tính** (cùng hệ Cursor). Nó dùng model AI (có thể gồm Grok và/hoặc model khác tùy cấu hình tài khoản) nhưng thêm cả **tay chân**:

- Có **Computer** riêng của agent (máy ảo Linux) để cài tool, chạy lệnh, giữ trình duyệt đã login
- Có thể gắn **máy local** của bạn (Windows/Mac) với bước duyệt quyền từng thao tác
- Có **connector / MCP** nối GitHub, lịch, chat...
- Có **routine** chạy theo lịch hoặc sự kiện khi bạn không mở cửa sổ chat
- Có nhiều **agent** (mỗi agent một chat, persona, memory) và **group chat** giữa các agent

Tóm một câu: **Grok Bot = app agent vận hành trên máy, dùng AI để làm việc chứ không chỉ trả lời.**

### Bảng so sánh nhanh

| | Grok AI | Grok Bot |
|---|---|---|
| **Là gì** | Model / chatbot | App agent desktop |
| **Ai làm** | xAI (model Grok) | Sản phẩm agent trong hệ Cursor |
| **Bạn dùng để** | Hỏi đáp, viết, brainstorm, gọi API | Giao việc: đọc/sửa file, chạy lệnh, trình duyệt, nhắc lịch, nối dịch vụ |
| **Chạy ở đâu** | Server chat / API | App trên máy bạn + Computer của Bot (+ máy local nếu gắn) |
| **Có tự sửa repo không** | Không, trừ khi bạn tự copy kết quả | Có, trong phạm vi bạn cho phép |
| **Giống công cụ nào trong repo này** | Gần ChatGPT (lớp chat/model) | Gần Claude Code / Codex (lớp agent làm việc), nhưng nghiêng desktop/vận hành hơn là CLI trong terminal |

### Hay nhầm thế nào?

1. **"Tôi đã có Grok rồi"** - có thể bạn chỉ có chat Grok AI trên web. Muốn agent đọc máy và chạy việc nền thì cần **Grok Bot** (app), không phải chỉ cửa sổ chat model.
2. **"Grok Bot chính là Grok AI"** - sai lớp. Bot **dùng** AI để làm việc; AI là phần suy luận, Bot là phần điều phối tool/máy/quyền.
3. **So với Claude Code / Codex** - cả ba đều là agent làm việc với dự án. Claude Code và Codex thường sống trong **terminal/IDE**. Grok Bot sống trong **app desktop** với Computer, routine và connector. Lộ trình chính không bắt bạn chọn một; phụ lục này chỉ giúp bạn dùng đúng Grok Bot khi đã chọn nó.

## Cài đặt và mở app

1. Cài bản Grok Bot / Cursor desktop từ trang tải chính thức của sản phẩm (luôn lấy bản mới từ đó, đừng tin link lạ).
2. Mở app. Sidebar trái liệt kê các agent; khung chính là chat với agent đang chọn.
3. Mở Settings: nút tài khoản góc dưới-trái sidebar, hoặc phím tắt **Cmd+,** / **Ctrl+,**, hoặc command palette - "Open settings". Không có icon bánh răng kiểu Preferences macOS riêng.

**Kiểm tra nhanh đã vào được:** sidebar hiện ít nhất một agent, ô chat nhận tin nhắn, Settings mở được tab General.

## Đăng nhập lần đầu

Trong Settings - General, thẻ tài khoản thường là **Sign In with Cursor** (hoặc Sign Out nếu đã vào).

- Đăng nhập bằng tài khoản Cursor / luồng trình duyệt mà app mở ra.
- **Không** dán API key, token hay mật khẩu vào ô chat. Secret dùng luồng bảo mật của app (ô nhập ẩn / biến môi trường), không paste vào transcript.
- Sau khi đăng nhập, xem tab **Usage & Billing** (nếu tài khoản bạn có) để biết hạn mức - chi tiết ở [Chi phí và các gói](02-chi-phi-cac-goi.md).

Lưu ý: đăng nhập Grok Bot **không** đồng nghĩa bạn đang đứng trong chat Grok AI trên web của xAI. Đó là hai cửa vào khác nhau, dù cùng hệ sinh thái tên Grok / Cursor tùy thời điểm.

## Agent, Computer, máy local - đừng lẫn ba thứ

| Khái niệm | Là gì | Bạn dùng khi nào |
|---|---|---|
| **Agent** | Một "nhân sự" trong sidebar: tên, mô tả, memory, routine riêng | Mỗi việc lớn / mỗi persona một agent |
| **Computer của Grok Bot** | Máy Linux dùng chung giữa các agent của bạn: file scratch, trình duyệt đã login, tool | Việc chạy trên máy agent, không đụng ổ đĩa máy bạn |
| **Máy đã đăng ký (local)** | Máy Windows/Mac của bạn gắn vào app; thao tác file/lệnh cần bạn duyệt | Đọc/sửa `E:\...`, chạy app local, mở project trên ổ cứng |

Mở **Computer preview** của agent: bấm **tên agent trên header chat** (hoặc phím tắt info pane), xem preview máy; bấm preview để phóng full. Pane này khác Settings toàn cục: có Routines, Channels, Members (nếu group).

Nếu Computer lỗi / treo: ưu tiên [Update Grok Bot's Computer](grokbot://app/v1/settings?id=update-computer) (làm mới instance, giữ file/login; phần mềm đã cài có thể phải cài lại). **Reset** là bước cuối cùng, dễ mất việc chưa đồng bộ.

## Cách giao việc hiệu quả

Viết như giao việc cho đồng nghiệp, không như "hỏi Google" hay "hỏi Grok AI chat":

```text
Chỉ đọc, chưa sửa file nào.
1. Tóm tắt cấu trúc thư mục dự án X.
2. Chỉ ra lệnh chạy dev và lệnh test hiện có.
3. Nêu ba chỗ bạn chưa chắc.
```

Nguyên tắc giống bài task chỉ-đọc với Codex/Claude:

- Nói rõ **đọc / sửa / gửi tin / trả tiền** - đừng để agent đoán.
- Chỉ định đường dẫn cụ thể khi làm trên máy local.
- Việc lặp (nhắc lịch, theo dõi PR, digest) - nhờ tạo **routine**, đừng nhắc tay mỗi ngày.

Nếu bạn chỉ cần brainstorm hoặc hỏi khái niệm, dùng **Grok AI chat** (hoặc bất kỳ chatbot nào) thường đủ và rẻ hơn về quy trình. Khi cần agent đụng máy và chạy việc, mới chuyển sang **Grok Bot**.

## Bài tập

1. Viết ra một câu phân biệt Grok AI và Grok Bot bằng lời của bạn (không nhìn bảng).
2. Mở Grok Bot, đăng nhập, mở Settings và nhận ra tab General / Computer / Usage & Billing / Updates.
3. Mở info pane của agent đang dùng, xem Computer preview.
4. Giao một task **chỉ đọc** trên một thư mục bạn quen (hoặc repo `hoc-ai-viet`), đối chiếu câu trả lời với thực tế.

## Checklist đạt bài

- [ ] Nói được Grok AI là model/chatbot, Grok Bot là app agent desktop.
- [ ] Mở được app và chat với một agent.
- [ ] Đăng nhập được mà không dán secret vào chat.
- [ ] Phân biệt được agent, Computer của Bot, và máy local.
- [ ] Biết mở Settings và info pane đúng chỗ.
- [ ] Chạy được một task chỉ-đọc và tự kiểm chứng kết quả.

## Xem thêm

[Chi phí và các gói](02-chi-phi-cac-goi.md) - [Cấu hình nâng cao](03-cau-hinh-nang-cao.md) - [Chọn coding agent](../../02-code-voi-ai/01-cai-mot-coding-agent.md)
