# Grok Bot: cài đặt, đăng nhập, chat agent và Computer

Bài này dành cho người đã cài môi trường cơ bản ([bài cài môi trường](../../01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md)) và muốn dùng một **agent desktop** — không chỉ chat trong trình duyệt — để đọc file máy bạn, chạy lệnh, mở trình duyệt và giữ việc chạy khi bạn không ngồi trước màn hình. Học xong bạn sẽ cài/mở được Grok Bot, đăng nhập đúng cách, biết agent và Computer là gì, và chạy được một task chỉ-đọc an toàn.

## Grok Bot là gì?

Grok Bot là ứng dụng desktop agent (cùng hệ Cursor). Khác chatbot web thuần:

| Khác biệt | Chatbot web thường | Grok Bot |
|---|---|---|
| Chạy ở đâu | Trên server của hãng, bạn chỉ gõ chat | App trên máy bạn + **Computer** (máy ảo của agent) + tùy chọn máy local đã đăng ký |
| Đọc/sửa file dự án | Thường phải bạn tự dán hoặc upload | Agent đọc/sửa qua Computer hoặc máy đã cho phép |
| Việc chạy nền | Hiếm khi có | **Routine** (lịch / sự kiện) chạy khi bạn không mở chat |
| Nhiều “người làm việc” | Một cuộc chat | Nhiều **agent** (mỗi agent một chat, persona, memory) và **group chat** giữa các agent |

Trong lộ trình này, Claude Code và Codex là **coding agent trong terminal/IDE**. Grok Bot nghiêng về **agent vận hành trên máy**: repo, trình duyệt, connector dịch vụ, lịch nhắc, và phối hợp nhiều agent.

## Cài đặt và mở app

1. Cài bản Grok Bot / Cursor desktop phù hợp tài khoản của bạn (trang tải chính thức của sản phẩm — luôn lấy bản mới từ đó, đừng tin link lạ).
2. Mở app. Sidebar trái liệt kê các agent; chat chính là cuộc trò chuyện với agent đang chọn.
3. Mở Settings: nút tài khoản góc dưới-trái sidebar, hoặc phím tắt tương đương **Cmd+,** / **Ctrl+,**, hoặc command palette → “Open settings”. Không có icon bánh răng kiểu macOS Preferences riêng.

**Kiểm tra nhanh đã vào được:** sidebar hiện ít nhất một agent, ô chat nhận tin nhắn, Settings mở được tab General.

## Đăng nhập lần đầu

Trong Settings → General, thẻ tài khoản thường là **Sign In with Cursor** (hoặc Sign Out nếu đã vào).

- Đăng nhập bằng tài khoản Cursor / luồng trình duyệt mà app mở ra.
- **Không** dán API key, token hay mật khẩu vào ô chat. Secret dùng luồng bảo mật của app (masked input / biến môi trường), không paste vào transcript.
- Sau khi đăng nhập, xem tab **Usage & Billing** (nếu tài khoản bạn có) để biết hạn mức — chi tiết ở [Chi phí và các gói](02-chi-phi-cac-goi.md).

## Agent, Computer, máy local — đừng lẫn ba thứ

| Khái niệm | Là gì | Bạn dùng khi nào |
|---|---|---|
| **Agent** | Một “nhân sự” trong sidebar: tên, mô tả, memory, routine riêng | Mỗi việc lớn / mỗi persona một agent |
| **Computer của Grok Bot** (thường gọi nội bộ là box) | Máy Linux dùng chung giữa agent của bạn: file scratch, trình duyệt đã login, tool | Việc chạy trên máy agent, không đụng ổ đĩa máy bạn |
| **Máy đã đăng ký (local)** | Máy Windows/Mac của bạn gắn vào app; mọi thao tác file/lệnh cần bạn duyệt | Đọc/sửa `E:\...`, chạy Unity, mở project local |

Mở **Computer preview** của agent: bấm **tên agent trên header chat** (hoặc phím tắt info pane), xem preview máy; bấm preview để phóng full. Pane này khác Settings toàn cục: có Routines, Channels, Members (nếu group).

Nếu Computer lỗi / treo: ưu tiên [Update Grok Bot's Computer](grokbot://app/v1/settings?id=update-computer) (làm mới instance, giữ file/login; phần mềm đã cài có thể phải cài lại). **Reset** là bước cuối cùng, dễ mất việc chưa đồng bộ.

## Cách giao việc hiệu quả

Viết như giao việc cho đồng nghiệp, không như “hỏi Google”:

```text
Chỉ đọc, chưa sửa file nào.
1. Tóm tắt cấu trúc thư mục dự án X.
2. Chỉ ra lệnh chạy dev và lệnh test hiện có.
3. Nêu ba chỗ bạn chưa chắc.
```

Nguyên tắc giống bài task chỉ-đọc với Codex/Claude:

- Nói rõ **đọc / sửa / gửi tin / trả tiền** — đừng để agent đoán.
- Chỉ định đường dẫn cụ thể khi làm trên máy local.
- Việc lặp (nhắc lịch, theo dõi PR, digest) → nhờ tạo **routine**, đừng nhắc tay mỗi ngày.

## Bài tập

1. Mở Grok Bot, đăng nhập, mở Settings và nhận ra tab General / Computer / Usage & Billing / Updates.
2. Mở info pane của agent đang dùng, xem Computer preview.
3. Giao một task **chỉ đọc** trên một thư mục bạn quen (hoặc repo `hoc-ai-viet`), đối chiếu câu trả lời với thực tế.

## Checklist đạt bài

- [ ] Mở được app và chat với một agent.
- [ ] Đăng nhập được mà không dán secret vào chat.
- [ ] Phân biệt được agent, Computer của Bot, và máy local.
- [ ] Biết mở Settings và info pane đúng chỗ.
- [ ] Chạy được một task chỉ-đọc và tự kiểm chứng kết quả.

## Xem thêm

[Chi phí và các gói](02-chi-phi-cac-goi.md) · [Cấu hình nâng cao](03-cau-hinh-nang-cao.md) · [Chọn coding agent](../../02-code-voi-ai/01-cai-mot-coding-agent.md)
