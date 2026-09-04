# Giấu API key và secret - lỗi chết người phổ biến nhất

Bài này dành cho bất kỳ ai đã từng (hoặc sắp) gọi một API cần key riêng - Claude, OpenAI, một dịch vụ thanh toán, bất kỳ thứ gì. Học xong bạn sẽ biết cách không bao giờ để lộ key lên GitHub, và biết chính xác phải làm gì nếu lỡ để lộ rồi.

## Vì sao đây là lỗi "chết người"

Kịch bản thật, xảy ra với rất nhiều người mới: bạn code xong, `git add .`, `git commit`, `git push` - trong đó vô tình có cả file chứa API key. Repo bạn để **public** trên GitHub. Chuyện gì xảy ra tiếp theo:

- **Có bot tự động quét GitHub liên tục**, chuyên tìm các định dạng API key phổ biến (nhiều hãng, kể cả GitHub, có cơ chế "secret scanning" tự động cảnh báo - nhưng không phải hãng nào cũng có, và bot của kẻ xấu quét nhanh hơn cảnh báo chính thức).
- Key bị lấy trong **vài phút tới vài giờ** sau khi push công khai, không phải chuyện "may ra mới bị".
- Kẻ xấu **dùng key của bạn gọi API**, tính phí thẳng vào tài khoản bạn (nếu là key trả theo lượng dùng) - nhiều người mới kể lại việc thức dậy thấy hóa đơn API vài trăm tới vài nghìn đô la chỉ sau một đêm để lộ key.

## Cách phòng: đã học, nhắc lại cho chắc

Bạn đã học phần này ở [`02-code-voi-ai/05-git-github-co-ban.md`](../02-code-voi-ai/05-git-github-co-ban.md) - nhắc lại vì đây là hạng mục **quan trọng nhất** trong cả checklist bảo mật:

1. **Mọi key/secret nằm trong file `.env`**, không bao giờ gõ thẳng vào code.
2. **File `.env` phải nằm trong `.gitignore`** - kiểm tra lại bằng lệnh:
```bash
git check-ignore -v .env
```
Nếu lệnh này in ra một dòng (chỉ ra `.env` khớp với dòng nào trong `.gitignore`) - bạn an toàn. Nếu không in gì - `.env` **chưa** được ignore, sửa ngay trước khi commit bất cứ thứ gì.

3. **Trước khi push lần đầu**, kiểm tra nhanh xem có file nhạy cảm nào lỡ được `git add`:
```bash
git status
```
Nhìn kỹ danh sách file - nếu thấy `.env` hoặc bất kỳ file nào chứa key xuất hiện ở đây, `git reset` nó ra trước khi commit.

## Biến môi trường khi deploy - không phải chỉ có `.env` trên máy mình

Khi đưa sản phẩm lên các nền tảng deploy, mỗi nơi có cách khai báo biến môi trường (environment variable) riêng, **không** đẩy file `.env` lên server - mà nhập key trực tiếp vào giao diện quản lý:

| Nền tảng | Nơi khai báo |
|---|---|
| Cloudflare Pages | Settings → Environment variables (trong dashboard dự án) |
| Vercel | Settings → Environment Variables |
| Netlify | Site settings → Environment variables |
| VPS (tự quản lý) | Ghi trong file `.env` **trên server** (không phải trên máy bạn rồi push lên) - hoặc khai báo trong file cấu hình PM2/systemd |

Nhờ Claude Code hỗ trợ nếu chưa quen: "hướng dẫn tôi khai báo biến môi trường ANTHROPIC_API_KEY trên [tên nền tảng bạn đang dùng]."

## Cách kiểm tra đã lỡ để lộ key trong lịch sử Git chưa

Có thể bạn đã `.gitignore` đúng từ giờ, nhưng lỡ **từng** commit key trước đó (dù sau này xóa file đi, key vẫn còn trong **lịch sử** Git). Cách kiểm tra nhanh:

```bash
git log --all -p | grep -i "api_key\|secret\|sk-"
```
- Lệnh này quét toàn bộ lịch sử commit (`--all -p` in ra nội dung thay đổi của mọi commit), tìm các dòng chứa từ khóa hay gặp trong key (`api_key`, `secret`, hoặc tiền tố `sk-` phổ biến của nhiều hãng).

Cách chắc chắn hơn: dùng công cụ quét chuyên dụng, miễn phí, mã nguồn mở như **gitleaks** hoặc **truffleHog** - hoặc đơn giản nhất, nhờ Claude Code: "quét toàn bộ lịch sử Git của repo này xem có API key hay secret nào từng bị commit không."

## Lỡ để lộ key rồi - làm gì ngay?

Thứ tự ưu tiên, **làm bước 1 trước tiên, ngay lập tức**, trước khi lo tới việc dọn dẹp:

1. **Thu hồi (revoke) key ngay lập tức** tại trang quản lý của hãng (console.anthropic.com, platform.openai.com...) - đây là bước quan trọng nhất, vô hiệu hóa key cũ ngay tức thì bất kể nó đã bị ai lấy được hay chưa.
2. **Tạo key mới**, cập nhật vào `.env` (trên máy) và biến môi trường (trên nền tảng deploy).
3. **Kiểm tra hóa đơn/usage dashboard** của hãng xem có lượt gọi API lạ nào trong khoảng thời gian key bị lộ không - nếu có chi phí phát sinh không phải do bạn, nhiều hãng có kênh hỗ trợ để báo cáo lạm dụng.
4. **Dọn lịch sử Git** (tùy chọn, nâng cao hơn) - nếu muốn xóa hẳn key khỏi lịch sử commit, cần công cụ như `git filter-repo` hoặc BFG Repo-Cleaner. Đây là thao tác **viết lại lịch sử Git**, có thể ảnh hưởng tới người khác đang cùng làm việc trên repo - nếu chưa tự tin, nhờ Claude Code hướng dẫn cẩn thận từng bước, và **bước 1 (thu hồi key) đã đủ để vô hiệu hóa rủi ro chính**, kể cả khi bạn chưa dọn xong lịch sử.

## Bước tiếp theo

Đã giấu key an toàn, giờ chặn một vấn đề khác: bot và spam tấn công form công khai của bạn: [Chống bot và spam](04-chong-bot-va-spam.md)
