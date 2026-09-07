# Projects, bộ nhớ và quyền riêng tư trong ChatGPT

Bài này dành cho người có một công việc lặp lại nhiều ngày và không muốn dán lại toàn bộ bối cảnh ở mỗi cuộc trò chuyện. Học xong bạn sẽ biết khi nào dùng Project, cách viết hướng dẫn riêng gọn, phân biệt bộ nhớ với file nguồn, và giảm rủi ro khi đưa dữ liệu cá nhân vào AI.

## Project giải quyết vấn đề gì?

Một Project gom các cuộc trò chuyện, file nguồn và hướng dẫn chung quanh một mục tiêu. Ví dụ: Project “Nội dung cho shop” có chân dung khách hàng, bảng sản phẩm, giọng thương hiệu và checklist duyệt bài.

Đừng biến Project thành kho chứa mọi thứ. Mỗi Project nên có một mục tiêu, một nhóm file liên quan và một quy tắc ngắn. Khi đổi khách hàng hoặc sản phẩm, tạo Project mới để tránh trộn dữ liệu.

## Tạo một Project từng bước

Vị trí nút và tên gọi có thể đổi theo phiên bản, nhưng luồng chung là:

1. Ở thanh bên trái ChatGPT, tìm mục **Projects** và bấm tạo Project mới.
2. Đặt tên theo mục tiêu, ví dụ "Nội dung cho shop".
3. Mở phần **hướng dẫn** (instructions) của Project, dán quy tắc ngắn (mẫu ở dưới).
4. Kéo thả các file nguồn cần tham chiếu vào Project (bảng sản phẩm, chân dung khách...).
5. Từ nay, mở chat **bên trong** Project đó - nó tự đọc hướng dẫn và file, bạn khỏi dán lại mỗi lần.

> Projects và bộ nhớ (memory) **phụ thuộc gói tài khoản** và thay đổi theo thời gian. Nếu không thấy mục Projects, kiểm tra lại gói bạn đang dùng thay vì cho là mình làm sai.

## Ba lớp ngữ cảnh

- **Tin nhắn hiện tại:** việc cần làm ngay.
- **Hướng dẫn Project/custom instructions:** quy tắc lặp lại, giọng và định dạng.
- **File/nguồn:** dữ liệu cần tham chiếu.

Bộ nhớ là cơ chế khác và phụ thuộc cài đặt tài khoản. Không coi bộ nhớ là cơ sở dữ liệu chính thức; thông tin quan trọng vẫn phải nằm trong file có phiên bản.

## Hướng dẫn Project nên ngắn

```text
Vai trò: trợ lý nội dung cho shop đồ gia dụng.
Độc giả: người mua tại Việt Nam, ưu tiên ngôn ngữ rõ và không phóng đại.
Đầu ra mặc định: tiêu đề, nội dung, CTA, checklist tự kiểm tra.
Quy tắc: không bịa thông số; thiếu dữ liệu thì hỏi hoặc ghi “chưa có”.
```

## Quyền riêng tư tối thiểu

- Không tải CCCD, khóa API, mật khẩu, dữ liệu y tế hoặc danh sách khách hàng nguyên bản nếu chưa được phép.
- Ẩn danh tên, email, số điện thoại và mã đơn trước khi thử nghiệm.
- Kiểm tra gói tài khoản, chính sách dữ liệu và quyền chia sẻ file.
- Xóa file/Project không còn cần; không để dữ liệu nhạy cảm tồn tại vô thời hạn.

## Mang "bộ nhớ" sang nền tảng khác - đừng sợ đổi công cụ hay tài khoản

Bộ nhớ (memory) nói ở trên chỉ sống **bên trong một tài khoản, một nền tảng**. Đổi sang Claude, Gemini, hay một tài khoản ChatGPT khác, AI mới hoàn toàn không biết bạn là ai, đang làm dự án gì, thích trả lời kiểu nào - phải kể lại từ đầu. Nhiều người vì vậy ngại đổi công cụ, sợ "mất hết".

Cách né việc này: nhờ chính AI đang dùng **trích xuất** những gì nó đã nhớ về bạn thành một đoạn văn bản gọn, để bạn tự cầm đi bất cứ đâu:

```
Dựa trên toàn bộ lịch sử trò chuyện và bộ nhớ bạn đang lưu về tôi, hãy tóm
tắt lại thành một đoạn hồ sơ ngắn (dạng gạch đầu dòng): tôi là ai, đang làm
dự án/công việc gì, trình độ kỹ thuật ra sao, phong cách trả lời tôi thích
(ngắn gọn hay chi tiết, có ví dụ hay không...), và những điều tôi hay nhắc
lại nhiều lần. Viết để tôi dán đoạn này vào một AI khác, giúp nó hiểu tôi
ngay từ tin nhắn đầu tiên.
```

Lưu đoạn đó lại (một file `.txt`/`.md` trên máy là đủ). Mở chat mới ở bất kỳ nền tảng nào - ChatGPT, Claude, Gemini, hay tài khoản khác của chính bạn - dán đoạn này vào tin nhắn đầu tiên. AI mới đọc xong là hiểu ngay bối cảnh, đỡ phải giải thích lại từ đầu.

"Bộ nhớ" thật ra chính là **của bạn**, không phải của nền tảng - trích ra được thì mang đi được. Cập nhật lại đoạn hồ sơ này định kỳ (vài tháng một lần, hoặc khi dự án đổi hướng) để nó không bị cũ.

> Đoạn hồ sơ này có thể chứa thông tin về công việc, dự án, khách hàng của bạn - áp dụng đúng nguyên tắc [quyền riêng tư ở trên](#quyen-rieng-tu-toi-thieu): rà lại trước khi dán sang một công cụ hoặc tài khoản bạn không hoàn toàn tin tưởng.

## Bài tập

Tạo Project “Dự án landing page”. Thêm một file spec, một file khách hàng giả và hướng dẫn bốn dòng. Mở chat mới, yêu cầu tạo checklist; sau đó xóa một trường dữ liệu và quan sát ChatGPT có nói thiếu dữ liệu hay tự bịa.

## Checklist đạt bài

- [ ] Biết khi nào tạo Project mới.
- [ ] Phân biệt prompt, hướng dẫn Project, file và memory.
- [ ] Hướng dẫn Project ngắn, có quy tắc không bịa.
- [ ] Biết ẩn danh dữ liệu và kiểm tra cài đặt.
- [ ] Có thể tái chạy một workflow ở chat mới.

## Xem thêm

ChatGPT giúp chuẩn bị ý tưởng và tài liệu; khi cần giao AI build sản phẩm, quay lại lộ trình chính từ [nền tảng web](../../01-bat-dau-tu-so-0/10-file-web-va-server-hoat-dong-the-nao.md).
