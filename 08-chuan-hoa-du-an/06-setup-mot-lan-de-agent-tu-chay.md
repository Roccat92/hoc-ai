# Setup dự án một lần để agent tự chạy: cấp quyền, nối GitHub - Vercel - Supabase, rồi giao việc

Bài này dành cho người đã build được vài thứ với coding agent nhưng vẫn đang tự mở terminal gõ từng lệnh, tự bấm deploy, tự copy biến môi trường mỗi lần. Học xong bạn sẽ dựng được một "bàn làm việc" cho agent trong khoảng một buổi: đăng nhập các công cụ một lần, cấp đúng quyền, và từ đó giao việc trọn gói bằng tiếng Việt - agent tự viết code, chạy test, commit, push và deploy. Việc của bạn thu về vài điểm kiểm tra và một thói quen quan trọng nhất: biết rollback khi cần.

## Đây là cách các sản phẩm trong thư viện này thật sự được build

Bốn sản phẩm ở [phần case study](../07-case-study/) không được build bằng cách người làm ngồi đọc từng dòng code hay gõ từng lệnh. Phần dưới đây viết lại đúng theo quy trình thật của người viết case study đó, không phải một quy trình lý tưởng hóa - kể cả những chỗ đơn giản hơn (hoặc liều hơn) người mới hay tưởng tượng.

"Hiểu để sửa, không copy mù" ở [bài đầu tiên](../01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai.md) vẫn đúng - nhưng "hiểu" ở đây là hiểu ở tầm chủ sản phẩm: sản phẩm phải làm gì, dữ liệu nằm đâu, chỗ nào sai thì mất tiền hoặc mất dữ liệu. Không phải hiểu cú pháp.

## Bàn làm việc của agent gồm gì

```text
   Bạn (mô tả bằng tiếng Việt, xác nhận trình duyệt khi agent cần đăng nhập
        thêm dịch vụ, và nghiệm thu bằng cách dùng thử)
                          │
                          ▼
   Coding agent (Claude Code / Codex) - toàn quyền, tự commit + push
   sau mỗi đợt sửa xong
      │            │             │                  │
      ▼            ▼             ▼                  ▼
   GitHub       Vercel        Supabase        Cloudflare / Cloudinary /
 (lưu code,   (push main    (database,        API AI (Gemini/OpenRouter)
  lịch sử)    tự deploy)     đăng nhập)      - thêm khi dự án cần, không
                                               phải dự án nào cũng dùng hết

   An toàn thật sự nằm ở việc COMMIT THƯỜNG XUYÊN (mỗi đợt sửa xong là một
   điểm quay lại được) và BIẾT ROLLBACK khi có lỗi - không phải ở việc
   chặn quyền agent hay bắt duyệt từng lệnh.
```

Các dịch vụ trên đều có bậc miễn phí đủ cho dự án cá nhân và giai đoạn đầu của sản phẩm thật - đúng như [chi phí thật ghi trong case study](../07-case-study/01-tidogo-print-os.md#chi-phi-thuc-te-vnd). Khoản trả tiền chính là gói AI để chạy agent, xem [chi phí các gói Claude](../phu-luc-cong-cu/claude-code/02-chi-phi-cac-goi.md) hoặc [Codex](../phu-luc-cong-cu/codex/02-chi-phi-cac-goi.md). Giới hạn của bậc miễn phí có thể thay đổi, kiểm tra trang chủ từng dịch vụ.

## Bước 1: tài khoản

Ba tài khoản dùng cho hầu hết dự án, đều miễn phí để bắt đầu: [github.com](https://github.com) (đã có từ [bài Git](../02-code-voi-ai/05-git-github-co-ban.md)), [vercel.com](https://vercel.com) (đăng nhập bằng chính tài khoản GitHub là tiện nhất), [supabase.com](https://supabase.com) cho database và đăng nhập người dùng.

Thêm khi dự án cần, không phải lúc nào cũng dùng hết:
- **Domain + SSL:** mua tên miền rồi trỏ qua Cloudflare để có SSL miễn phí và bảo vệ DDoS cơ bản - xem [SSL và HTTPS](../10-bao-mat/02-ssl-va-https.md).
- **Lưu trữ ảnh/file:** [Cloudinary](https://cloudinary.com) - có bậc miễn phí, xử lý và phân phối ảnh/video tốt hơn tự lưu trên server. Đọc tài liệu chính thức khi setup vì cú pháp SDK và giới hạn bậc miễn phí đổi theo thời gian.
- **API AI:** Gemini (Google AI Studio) hoặc [OpenRouter](https://openrouter.ai) (một API key gọi được nhiều model của nhiều hãng) - xem [gọi API LLM](../04-build-ung-dung-ai/01-goi-api-llm.md).

Về database: dùng **một project Supabase** là đủ cho phần lớn dự án, kể cả sản phẩm thật - agent chạy migration thẳng lên đó, an toàn dựa vào backup và rollback (bước cuối bài) chứ không phải dựa vào tách môi trường. Nếu bạn mới bắt đầu và muốn thêm một lớp an toàn trong lúc chưa quen, có thể tạo thêm một project `-dev` riêng để nghịch trước khi migration chạy lên project chính - đây là lựa chọn thêm, không phải bắt buộc.

## Bước 2: đăng nhập CLI

CLI là bản dòng lệnh của các dịch vụ trên, để agent tự thao tác thay vì bạn phải bấm trên web. Việc bạn cần tự tay làm chỉ có một:

```bash
gh auth login
```
- `gh` là GitHub CLI (tải tại cli.github.com). Lệnh này mở trình duyệt để bạn xác nhận; sau đó agent tạo repo, mở pull request, đọc issue được mà không cần bạn dán token.

Các CLI còn lại (Vercel, Supabase...), bạn **không cần tự chạy trước** - cứ giao việc, tới khi agent cần dùng một dịch vụ chưa đăng nhập, nó sẽ tự chạy đúng lệnh (`vercel login`, `npx supabase login`...) và bạn chỉ cần xác nhận trên trình duyệt khi được hỏi. Cách này đỡ phải nhớ trước toàn bộ lệnh cài đặt của từng dịch vụ.

**Tuyệt đối không dán token hay API key vào cuộc trò chuyện với agent** - luồng đăng nhập qua trình duyệt tồn tại chính là để bạn không phải làm việc đó.

## Bước 3: nối repo với Vercel để deploy tự động

Trên trang Vercel, chọn "Add New Project", import repo GitHub của dự án (hoặc để agent làm qua CLI khi nó cần). Từ lúc này, mỗi lần có commit mới trên nhánh `main`, Vercel tự build và deploy lên địa chỉ chính thức - không cần bạn bấm gì thêm.

Kéo biến môi trường về máy để chạy local:

```bash
vercel link
vercel env pull .env.local
```
- `vercel link`: hỏi bạn chọn đúng project trên Vercel để gắn với thư mục hiện tại.
- `vercel env pull .env.local`: tải các biến môi trường đã khai trên Vercel về file `.env.local` - agent chạy được app ở máy bạn với đúng cấu hình, mà bạn không phải copy tay từng biến.

Đảm bảo `.env.local` nằm trong `.gitignore` - xem lại [giấu API key và secret](../10-bao-mat/03-giau-api-key-va-secret.md).

## Bước 4: nối Supabase và cho agent tự chạy migration

```bash
npx supabase link --project-ref ma-project-cua-ban
npx supabase db push
```
- Dòng 1: gắn thư mục dự án với project Supabase (mã project lấy trong Settings > General trên trang Supabase).
- Dòng 2: đẩy các file migration trong thư mục `supabase/migrations/` lên database. Từ đây khi agent cần thêm bảng hay cột, nó tự viết file migration (đúng như đã học ở [database production](../03-ha-tang-thuc-chien/06-database-production-backup.md)) và tự chạy lệnh này.

Nếu bạn chọn thêm project `-dev` ở bước 1, link thư mục với project đó và chỉ tự tay đẩy migration lên project chính khi đã ưng ý.

## Bước 5: cấp quyền cho agent - và vì sao "tự động hết" lại là cách nhiều người thật sự dùng

Giai đoạn đầu học, nhiều người (kể cả tác giả các case study trong thư viện này) tự sửa qua chat để tiết kiệm chi phí - copy code AI đưa ra rồi tự dán vào file. Cách đó an toàn nhưng chậm, không tận dụng được việc agent tự chạy lệnh, tự deploy. Khi đã quen việc và tin cách agent làm, bước chuyển tự nhiên là **bật chế độ tự động chấp nhận** trong Claude Code/Codex - agent không hỏi lại từng lệnh nữa, và điểm kiểm tra thật sự chuyển sang: **commit và push sau mỗi đợt sửa xong**, không phải duyệt từng lệnh trước khi chạy.

Đây là cách vận hành thật của các sản phẩm trong case study: agent toàn quyền, tự commit + push sau mỗi phiên làm việc; nếu đợt sửa tiếp theo có lỗi, rollback về đợt trước đó (xem bước cuối). Ưu điểm: nhanh, không bị ngắt quãng liên tục để bấm "đồng ý". Đánh đổi: bạn cần kỷ luật commit/push đều và sẵn sàng rollback ngay khi thấy sai, thay vì cố sửa tiếp trên một trạng thái đã hỏng.

**Nếu bạn mới bắt đầu** và muốn một lớp an toàn trong lúc chưa quen, cấu hình quyền theo danh sách cụ thể trong `.claude/settings.json` là cách khởi điểm hợp lý hơn - agent chỉ tự chạy đúng các lệnh bạn liệt kê, còn lại phải hỏi:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm install)",
      "Bash(npm test)",
      "Bash(npm run build)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git commit:*)",
      "Bash(git push:*)"
    ]
  }
}
```
- Mỗi dòng là một lệnh agent được chạy mà không cần hỏi; dấu `:*` nghĩa là chấp nhận mọi tham số phía sau. Nới dần danh sách này khi đã quen, hoặc bỏ hẳn để chuyển sang chế độ tự động như mô tả ở trên.
- Cú pháp có thể đổi theo phiên bản; trong Claude Code gõ `/permissions` để xem và sửa danh sách này bằng giao diện thay vì sửa file tay.

Chạy `/init` trong Claude Code để tạo `CLAUDE.md`, rồi bổ sung phần quan trọng nhất là **các lệnh của dự án** (cài, chạy, test, build, migration), theo mẫu ở [bài CLAUDE.md](04-claude-md-va-ngu-canh.md). **Ở Codex**, vai trò tương đương là `AGENTS.md` (xem [bài file hướng dẫn](../02-code-voi-ai/12-codex-prompt-ngu-canh-va-agents-md.md)) và chế độ phê duyệt lệnh theo [tài liệu chính thức](https://learn.chatgpt.com/docs/permission-modes).

## Nhánh: chỉ tách khi cố ý so sánh, không phải quy tắc cho mọi việc

Tạo một nhánh Git riêng khi bạn thật sự muốn thử hai phương án khác nhau để so sánh (ví dụ hai cách thiết kế một luồng, muốn xem cái nào chạy tốt hơn trước khi chọn). Đừng tạo nhánh cho mọi tính năng nhỏ theo thói quen "phải làm đúng quy trình Git" - kinh nghiệm thật là **càng nhiều nhánh càng dễ nhầm lẫn, và deploy cũng phiền hơn** (phải nhớ nhánh nào đang là bản thật, review PR nào đang chờ). Phần lớn công việc hằng ngày cứ để agent làm thẳng và push lên `main`.

## Bước 6: giao việc trọn gói

Setup xong, một task từ nay trông như thế này, và bạn không gõ dòng lệnh nào:

```text
Thêm tính năng "khách để lại số điện thoại để được gọi lại" cho landing page.
- Form gồm họ tên, số điện thoại (bắt buộc, kiểm tra định dạng), ghi chú.
- Lưu vào bảng `lead` trên Supabase (tự viết migration), gửi email báo cho tôi.
- Viết test cho phần kiểm tra số điện thoại, chạy test và build.
- Commit và push khi test/build đều đạt.
```

Agent tự làm hết vòng: code, migration, test, commit, push, Vercel tự deploy. Bạn nhận về một bản tóm tắt và một địa chỉ để mở lên dùng thử.

## Vài điểm kiểm tra của bạn

Bạn không đọc từng dòng code. Bạn kiểm tra:

1. **Trước khi giao:** yêu cầu có đủ mục tiêu, phạm vi, tiêu chí đạt, kiểm tra chưa? Với dự án nhiều phiên, spec và backlog ở [các bài trước trong phần này](01-tai-sao-can-spec.md) là phiên bản đầy đủ của bước này.
2. **Sau khi agent báo xong:** mở sản phẩm và **dùng như một khách hàng khó tính** - điền form đúng, điền sai, bỏ trống, bấm hai lần, mở trên điện thoại. Đây là nghiệm thu thật; "test đã xanh" chỉ là lời agent nói.
3. **Với thay đổi động tới tiền, dữ liệu người dùng hoặc đăng nhập:** đi qua [checklist bảo mật](../10-bao-mat/01-checklist-truoc-khi-public.md) và [bảo mật ứng dụng AI](../10-bao-mat/07-bao-mat-ung-dung-ai.md) nếu có AI bên trong - đây là lúc đáng để yêu cầu agent giải thích diff, hoặc tự đọc theo [bài đọc diff](../02-code-voi-ai/13-codex-sua-code-test-va-review.md).

## Khi có lỗi: rollback là lưới an toàn thật, không phải cố sửa tiếp

Đợt sửa nào cũng có thể sai - kể cả khi agent chạy hoàn toàn tự động lâu ngày. Cách xử lý thật khi có chuyện: **rollback về đợt trước đó**, không cố sửa đè lên một trạng thái đã hỏng (dễ rối hơn và khó biết chắc đã hết lỗi chưa).

- **Code/deploy:** `git revert` về commit trước đó rồi push, hoặc trên Vercel dùng tính năng phục hồi bản deploy trước (tên gọi cụ thể có thể đổi theo giao diện) - cả hai đều nhanh hơn nhiều so với ngồi dò lỗi dưới áp lực.
- **Database:** nếu migration mới gây lỗi, đây chính là lý do [bài backup và restore](../03-ha-tang-thuc-chien/06-database-production-backup.md) yêu cầu bạn *thử* khôi phục ít nhất một lần trước khi cần thật - đừng để lần đầu thử restore là lúc đang gặp sự cố.

Muốn giảm lo, commit thường xuyên hơn (đợt sửa nhỏ) thay vì gộp nhiều thay đổi rồi mới commit một lần - đợt càng nhỏ, rollback càng rõ ràng nên bỏ đúng chỗ nào.

## Khi nào phải xuống tầng chi tiết

- Agent nói "đã sửa xong" nhưng sản phẩm vẫn hỏng: mở DevTools tab Network theo [bài nền tảng web](../01-bat-dau-tu-so-0/10-file-web-va-server-hoat-dong-the-nao.md) để tự thấy request nào lỗi, rồi dán đúng lỗi đó cho agent.
- Cùng một lỗi lặp lại lần thứ ba: đừng cố sửa tiếp - rollback về bản chạy tốt gần nhất, bắt agent tóm tắt trạng thái và mở phiên mới theo [bài xử lý lỗi](../02-code-voi-ai/17-codex-xu-ly-loi.md).
- Sắp làm gì đó khó hoàn tác (xóa, đổi schema, thanh toán): tự backup trước theo [bài backup](../03-ha-tang-thuc-chien/06-database-production-backup.md), rồi mới cho chạy.

Ngoài các tình huống đó, để agent làm.

## Bài tập

Lấy dự án [landing page](../09-du-an-thuc-hanh/du-an-01-landing-page/spec.md) hoặc dự án của bạn, làm trọn bộ các bước ở trên trong một buổi. Giao đúng task mẫu ở bước 6, để agent tự commit/push, rồi tự tay thử một lần rollback (cố ý cho agent gây một lỗi nhỏ, sau đó `git revert` về bản trước) để biết chắc bạn làm được khi cần thật.

## Checklist đạt bài

- [ ] Đã đăng nhập `gh` một lần; để agent tự đăng nhập các CLI khác khi cần, không dán token vào chat.
- [ ] Repo đã nối Vercel: push lên `main` là tự deploy.
- [ ] Agent tự viết và chạy migration Supabase khi cần thêm dữ liệu.
- [ ] Biết chọn giữa cấp quyền theo danh sách cụ thể (mới bắt đầu) hoặc chế độ tự động (đã quen) - và hiểu vì sao "kiểm tra" chuyển từ duyệt lệnh sang commit/push đều đặn.
- [ ] Chỉ tạo nhánh khi cố ý so sánh phương án, không tạo cho mọi việc nhỏ.
- [ ] Đã tự tay thử rollback ít nhất một lần, không đợi tới lúc gặp sự cố thật mới thử lần đầu.

## Bước tiếp theo

Bàn làm việc đã dựng xong, giờ dùng nó để build thật với một spec có sẵn, không cần tự nghĩ đề bài: [Dự án thực hành →](../09-du-an-thuc-hanh/)
