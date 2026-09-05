# Setup dự án một lần để agent tự chạy: cấp quyền, nối GitHub - Vercel - Supabase, rồi giao việc

Bài này dành cho người đã build được vài thứ với coding agent nhưng vẫn đang tự mở terminal gõ từng lệnh, tự bấm deploy, tự copy biến môi trường mỗi lần. Học xong bạn sẽ dựng được một "bàn làm việc" cho agent trong khoảng một buổi: đăng nhập các công cụ một lần, cấp đúng quyền, tách môi trường thử với môi trường thật, và từ đó giao việc trọn gói bằng tiếng Việt - agent tự viết code, chạy test, commit, push và cho bạn link xem thử. Việc của bạn thu về ba điểm kiểm tra.

## Đây là cách các sản phẩm trong thư viện này thật sự được build

Bốn sản phẩm ở [phần case study](../07-case-study/README.md) không được build bằng cách người làm ngồi đọc từng dòng code hay gõ từng lệnh. Chúng được build bằng cách: setup GitHub, Vercel, Supabase một lần, cho agent đủ quyền, rồi mô tả tính năng bằng tiếng Việt và nghiệm thu bằng cách **dùng thử sản phẩm**. Các bài chi tiết trước đó trong thư viện (đọc diff, mở DevTools, chạy backup) là kỹ năng để dùng khi có chuyện, không phải việc làm mỗi ngày.

"Hiểu để sửa, không copy mù" ở [bài đầu tiên](../01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai.md) vẫn đúng - nhưng "hiểu" ở đây là hiểu ở tầm chủ sản phẩm: sản phẩm phải làm gì, dữ liệu nằm đâu, chỗ nào sai thì mất tiền hoặc mất dữ liệu. Không phải hiểu cú pháp.

## Bàn làm việc của agent gồm gì

```text
        Bạn (mô tả bằng tiếng Việt + nghiệm thu bằng cách dùng thử)
                          │
                          ▼
        Coding agent (Claude Code / Codex) - đã đăng nhập, đã có quyền
           │                  │                    │
           ▼                  ▼                    ▼
        GitHub             Vercel               Supabase
     (lưu code,      (mỗi lần push là       (database + đăng nhập;
      lịch sử)       tự deploy, mỗi PR      hai project: thử và thật)
                     có link xem thử)

   Agent được TOÀN QUYỀN ở nhánh làm việc + link xem thử + project thử.
   Lên production chỉ qua MỘT cổng: bạn bấm merge.
```

Ba dịch vụ này đều có bậc miễn phí đủ cho dự án cá nhân và giai đoạn đầu của sản phẩm thật - đúng như [chi phí thật ghi trong case study](../07-case-study/01-tidogo-print-os.md#chi-phí-thực-tế-vnd). Khoản trả tiền chính là gói AI để chạy agent, xem [chi phí các gói Claude](../02-code-voi-ai/08-chi-phi-cac-goi-claude.md) hoặc [Codex](../02-code-voi-ai/09-chi-phi-cac-goi-codex.md). Giới hạn của bậc miễn phí có thể thay đổi, kiểm tra trang chủ từng dịch vụ.

## Bước 1: tài khoản

Tạo ba tài khoản nếu chưa có, đều miễn phí để bắt đầu: [github.com](https://github.com) (đã có từ [bài Git](../02-code-voi-ai/05-git-github-co-ban.md)), [vercel.com](https://vercel.com) (đăng nhập bằng chính tài khoản GitHub là tiện nhất), [supabase.com](https://supabase.com). Trên Supabase, tạo **hai project**: một tên `ten-du-an-dev` để thử và một tên `ten-du-an-prod` cho dữ liệu thật. Đây là quyết định quan trọng nhất của cả bài: agent sẽ được nghịch thoải mái ở project dev, và không bao giờ có lý do để chạm vào project prod khi bạn chưa duyệt.

## Bước 2: đăng nhập các CLI một lần

CLI là bản dòng lệnh của ba dịch vụ trên, để agent có thể tự thao tác thay vì bạn phải bấm trên web. Đăng nhập một lần, máy nhớ mãi (tới khi bạn đăng xuất):

```bash
gh auth login
```
- `gh` là GitHub CLI (tải tại cli.github.com). Lệnh này mở trình duyệt để bạn xác nhận; sau đó agent tạo repo, mở pull request, đọc issue được mà không cần bạn dán token.

```bash
npm install -g vercel
vercel login
```
- Dòng 1: cài Vercel CLI toàn cục (như đã cài Claude Code hay Codex).
- Dòng 2: đăng nhập, cũng qua trình duyệt. Từ đây agent xem được log deploy và lấy biến môi trường xuống máy.

```bash
npx supabase login
```
- `npx supabase` chạy Supabase CLI mà không cần cài toàn cục (Supabase không hỗ trợ cài kiểu `npm install -g`, chạy qua `npx` là cách đơn giản nhất). Lệnh này xin một token truy cập qua trình duyệt.

Lệnh đăng nhập cụ thể có thể đổi theo phiên bản, nếu một lệnh báo không tồn tại, mở trang tài liệu chính thức của CLI đó thay vì đoán. **Tuyệt đối không dán token hay API key vào cuộc trò chuyện với agent** - ba lệnh trên tồn tại chính là để bạn không phải làm việc đó.

## Bước 3: nối repo với Vercel để deploy tự động

Trên trang Vercel, chọn "Add New Project", import repo GitHub của dự án. Từ lúc này:

- Mỗi lần có commit mới trên nhánh `main`, Vercel tự build và deploy lên địa chỉ chính thức.
- Mỗi pull request được cấp một **link xem thử riêng** (preview deployment). Đây là chỗ bạn nghiệm thu việc agent làm, trước khi nó chạm tới người dùng thật.

Trong thư mục dự án, nối CLI với project vừa tạo và kéo biến môi trường về máy để chạy local:

```bash
vercel link
vercel env pull .env.local
```
- `vercel link`: hỏi bạn chọn đúng project trên Vercel để gắn với thư mục hiện tại.
- `vercel env pull .env.local`: tải các biến môi trường đã khai trên Vercel về file `.env.local` - agent chạy được app ở máy bạn với đúng cấu hình, mà bạn không phải copy tay từng biến.

Trên Vercel, khai biến môi trường của Supabase (URL và anon key, lấy trong phần Settings của project Supabase) **theo từng môi trường**: biến của project `dev` gán cho Preview, biến của project `prod` chỉ gán cho Production. Nhờ vậy link xem thử luôn đọc dữ liệu thử, còn địa chỉ chính thức mới đọc dữ liệu thật. Đảm bảo `.env.local` nằm trong `.gitignore` - xem lại [giấu API key và secret](../10-bao-mat/03-giau-api-key-va-secret.md).

## Bước 4: nối Supabase và cho agent tự chạy migration ở môi trường thử

```bash
npx supabase link --project-ref ma-project-dev
npx supabase db push
```
- Dòng 1: gắn thư mục dự án với project Supabase **dev** (mã project lấy trong Settings > General trên trang Supabase).
- Dòng 2: đẩy các file migration trong thư mục `supabase/migrations/` lên database dev. Từ đây khi agent cần thêm bảng hay cột, nó tự viết file migration (đúng như đã học ở [database production](../03-ha-tang-thuc-chien/06-database-production-backup.md)) và tự chạy lệnh này - trên dev.

Không link thư mục dự án với project prod. Khi một migration đã chạy ổn trên dev và bạn đã dùng thử link preview, chính bạn chạy nó lên prod (đổi `--project-ref` sang mã prod), hoặc để bước đó trong CI sau khi merge. Đây là cổng duy nhất, và là cổng của bạn.

## Bước 5: cấp quyền cho agent đúng mức

Mục tiêu: agent không hỏi bạn năm mươi lần cho những việc vô hại, nhưng vẫn phải dừng lại ở việc có thể gây hại.

**Ở Claude Code**, quyền được khai trong file `.claude/settings.json` của dự án. Một cấu hình khởi điểm hợp lý:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm install)",
      "Bash(npm test)",
      "Bash(npm run build)",
      "Bash(npm run dev)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(gh pr create:*)",
      "Bash(npx supabase db push)"
    ]
  }
}
```
- Mỗi dòng là một lệnh agent được chạy mà không cần hỏi; dấu `:*` nghĩa là chấp nhận mọi tham số phía sau.
- Cố ý **không** cho sẵn: `vercel --prod`, mọi lệnh có `rm -rf`, lệnh nào chạm project Supabase prod. Những việc đó agent vẫn làm được, nhưng phải hỏi và bạn phải đọc hộp thoại rồi mới bấm đồng ý - đúng ba thứ cần nhìn đã học ở [bài quyền hạn](../02-code-voi-ai/11-codex-task-dau-tien-va-quyen-han.md).
- Cú pháp có thể đổi theo phiên bản; trong Claude Code gõ `/permissions` để xem và sửa danh sách này bằng giao diện thay vì sửa file tay.

Chạy `/init` trong Claude Code để tạo `CLAUDE.md`, rồi bổ sung phần quan trọng nhất là **các lệnh của dự án** (cài, chạy, test, build, migration) và **khu vực cấm** (project prod, file `.env`), theo mẫu ở [bài CLAUDE.md](04-claude-md-va-ngu-canh.md).

**Ở Codex**, vai trò tương đương là `AGENTS.md` (xem [bài file hướng dẫn](../02-code-voi-ai/12-codex-prompt-ngu-canh-va-agents-md.md)) và chế độ phê duyệt lệnh - bắt đầu bằng chế độ hỏi cho lệnh có side effect theo [tài liệu chính thức](https://learn.chatgpt.com/docs/permission-modes), rồi nới dần khi đã tin.

## Bước 6: giao việc trọn gói

Setup xong, một task từ nay trông như thế này, và bạn không gõ dòng lệnh nào:

```text
Thêm tính năng "khách để lại số điện thoại để được gọi lại" cho landing page.
- Tạo nhánh mới từ main.
- Form gồm họ tên, số điện thoại (bắt buộc, kiểm tra định dạng), ghi chú.
- Lưu vào bảng `lead` trên Supabase (tự viết migration), gửi email báo cho tôi.
- Viết test cho phần kiểm tra số điện thoại, chạy test và build.
- Commit, push, mở pull request và gửi tôi link preview để tôi dùng thử.
Không chạm project Supabase prod. Không deploy production.
```

Agent tự làm hết vòng: nhánh, code, migration trên dev, test, commit, push, mở PR, link preview. Bạn nhận về một đường link và một bản tóm tắt.

## Ba điểm kiểm tra của bạn

Bạn không đọc từng dòng code. Bạn kiểm tra đúng ba chỗ:

1. **Trước khi giao:** yêu cầu có đủ bốn phần mục tiêu, phạm vi, tiêu chí đạt, kiểm tra (như prompt mẫu ở trên) chưa? Với dự án nhiều phiên, spec và backlog ở [các bài trước trong phần này](01-tai-sao-can-spec.md) là phiên bản đầy đủ của bước này.
2. **Sau khi agent báo xong:** mở link preview và **dùng như một khách hàng khó tính** - điền form đúng, điền sai, bỏ trống, bấm hai lần, mở trên điện thoại. Đây là nghiệm thu thật; "test đã xanh" chỉ là lời agent nói.
3. **Trước khi bấm merge lên production:** đi qua [checklist bảo mật](../10-bao-mat/01-checklist-truoc-khi-public.md) và [bảo mật ứng dụng AI](../10-bao-mat/07-bao-mat-ung-dung-ai.md) nếu có AI bên trong; kiểm tra tính năng này có động tới tiền, dữ liệu người dùng, đăng nhập không - nếu có, đây là lúc duy nhất bạn nên yêu cầu agent giải thích diff, hoặc tự đọc theo [bài đọc diff](../02-code-voi-ai/13-codex-sua-code-test-va-review.md).

## Khi nào phải xuống tầng chi tiết

- Agent nói "đã sửa xong" nhưng preview vẫn hỏng: mở DevTools tab Network theo [bài nền tảng web](../01-bat-dau-tu-so-0/10-file-web-va-server-hoat-dong-the-nao.md) để tự thấy request nào lỗi, rồi dán đúng lỗi đó cho agent.
- Cùng một lỗi lặp lại lần thứ ba: dừng, bắt agent tóm tắt trạng thái và mở phiên mới theo [bài xử lý lỗi](../02-code-voi-ai/17-codex-xu-ly-loi.md).
- Sắp làm gì đó không hoàn tác được trên prod (xóa, đổi schema, thanh toán): tự backup trước theo [bài backup](../03-ha-tang-thuc-chien/06-database-production-backup.md), rồi mới cho chạy.

Ngoài ba tình huống đó, để agent làm.

## Bài tập

Lấy dự án [landing page](../09-du-an-thuc-hanh/du-an-01-landing-page/spec.md) hoặc dự án của bạn, làm trọn bộ sáu bước ở trên trong một buổi. Kết thúc bằng việc giao đúng task mẫu ở bước 6 và nhận về link preview mà bạn **không tự gõ lệnh nào**. Ghi lại: bước nào agent phải hỏi bạn, bước nào bạn phải tự làm trên web, và mất bao lâu - đó là bản setup của riêng bạn để dùng lại cho mọi dự án sau.

## Checklist đạt bài

- [ ] Có hai project Supabase tách biệt dev và prod, và agent chỉ được link với dev.
- [ ] Đã đăng nhập `gh`, `vercel`, `supabase` một lần, không dán token vào chat.
- [ ] Repo đã nối Vercel: push là tự deploy, mỗi PR có link preview.
- [ ] Biến môi trường tách theo Preview và Production, `.env.local` không nằm trong Git.
- [ ] Có danh sách quyền cho agent: việc vô hại không hỏi, việc chạm prod phải hỏi.
- [ ] Giao được một task trọn gói và nghiệm thu bằng link preview, không gõ lệnh.

## Bước tiếp theo

Bàn làm việc đã dựng xong, giờ dùng nó để build thật với một spec có sẵn, không cần tự nghĩ đề bài: [Dự án thực hành →](../09-du-an-thuc-hanh/)
