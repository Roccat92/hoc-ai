# Setup dự án một lần để agent tự chạy: cấp quyền đúng cách, nối GitHub - Vercel - Supabase, rồi giao việc

Bài này dành cho người đã build được vài thứ với coding agent nhưng vẫn đang tự mở terminal gõ từng lệnh, tự bấm deploy, tự copy biến môi trường mỗi lần. Học xong bạn sẽ dựng được một "bàn làm việc" cho agent trong khoảng một buổi: đăng nhập các công cụ một lần, cấp đúng quyền theo đúng khuyến nghị chính thức của Anthropic và OpenAI, và từ đó giao việc trọn gói bằng tiếng Việt - agent tự viết code, chạy test, commit, push, và bạn xem thử trước khi nó chạm vào bản thật. Việc của bạn thu về vài điểm kiểm tra và một thói quen quan trọng nhất: biết rollback khi cần.

## Đây là cách các sản phẩm trong thư viện này được build, đã sửa lại chỗ đáng sửa

Bốn sản phẩm ở [phần case study](../07-case-study/) không được build bằng cách người làm ngồi đọc từng dòng code hay gõ từng lệnh. Phần dưới đây viết theo đúng tinh thần thật của cách các sản phẩm đó được build - giao việc trọn gói, nghiệm thu bằng dùng thử - nhưng mô hình cấp quyền cụ thể bên dưới bám theo tài liệu chính thức hiện hành của Anthropic (Claude Code) và OpenAI (Codex), chứ không phải chỉ chép lại thói quen của một người. Lý do: cách "cấp toàn quyền cho agent, an toàn nhờ commit thường xuyên" từng dùng trong bản trước của bài này là thói quen hợp lý với người đã có nhiều năm kinh nghiệm nghiệp vụ và một cỗ máy để phá hỏng rồi sửa - nhưng không phải hướng dẫn an toàn cho người mới, và cũng không phải điều hai hãng làm ra công cụ này khuyến nghị.

"Hiểu để sửa, không copy mù" ở [bài đầu tiên](../01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai.md) vẫn đúng - nhưng "hiểu" ở đây là hiểu ở tầm chủ sản phẩm: sản phẩm phải làm gì, dữ liệu nằm đâu, chỗ nào sai thì mất tiền hoặc mất dữ liệu. Không phải hiểu cú pháp.

## Bàn làm việc của agent gồm gì

```text
   Bạn (mô tả bằng tiếng Việt, xác nhận trình duyệt khi agent cần đăng nhập
        thêm dịch vụ, và nghiệm thu bằng cách dùng thử)
                          │
                          ▼
   Coding agent (Claude Code / Codex) - toàn quyền đọc/sửa file, chạy lệnh,
   commit, push lên MỘT NHÁNH cho mỗi việc đang làm
      │            │             │                  │
      ▼            ▼             ▼                  ▼
   GitHub       Vercel        Supabase (dev)   Cloudflare / Cloudinary /
 (lưu code,   (mỗi nhánh có   - agent chạy      API AI (Gemini/OpenRouter)
  lịch sử)    một bản xem     thử migration    - thêm khi dự án cần, không
              thử riêng,      ở đây trước       phải dự án nào cũng dùng hết
              không đụng
              bản thật)
                          │
                          ▼  (bạn xem bản thử, ưng thì bấm gộp vào nhánh chính)
                 Vercel (bản thật) ── Supabase (prod)

   An toàn thật nằm ở: (1) agent chạy thoải mái trong nhánh riêng và database
   dev - hỏng ở đây không mất gì, (2) bản thật chỉ nhận thay đổi sau khi BẠN
   xem qua bản xem thử, (3) không bao giờ dùng chế độ "bỏ qua mọi duyệt" của
   agent ngoài một máy ảo/container cách ly. Commit thường xuyên vẫn tốt,
   nhưng nó là thói quen hỗ trợ, không phải lưới an toàn chính.
```

Các dịch vụ trên đều có bậc miễn phí đủ cho dự án cá nhân và giai đoạn đầu của sản phẩm thật - đúng như [chi phí thật ghi trong case study](../07-case-study/01-tidogo-print-os.md#chi-phi-thuc-te-vnd). Khoản trả tiền chính là gói AI để chạy agent, xem [chi phí các gói Claude](../phu-luc-cong-cu/claude-code/02-chi-phi-cac-goi.md) hoặc [Codex](../phu-luc-cong-cu/codex/02-chi-phi-cac-goi.md). Giới hạn của bậc miễn phí có thể thay đổi, kiểm tra trang chủ từng dịch vụ.

## Bước 1: tài khoản

Ba tài khoản dùng cho hầu hết dự án, đều miễn phí để bắt đầu: [github.com](https://github.com) (đã có từ [bài Git](../02-code-voi-ai/05-git-github-co-ban.md)), [vercel.com](https://vercel.com) (đăng nhập bằng chính tài khoản GitHub là tiện nhất), [supabase.com](https://supabase.com) cho database và đăng nhập người dùng.

Thêm khi dự án cần, không phải lúc nào cũng dùng hết:
- **Domain + SSL:** mua tên miền rồi trỏ qua Cloudflare để có SSL miễn phí và bảo vệ DDoS cơ bản - xem [SSL và HTTPS](../10-bao-mat/02-ssl-va-https.md).
- **Lưu trữ ảnh/file:** [Cloudinary](https://cloudinary.com) - có bậc miễn phí, xử lý và phân phối ảnh/video tốt hơn tự lưu trên server. Đọc tài liệu chính thức khi setup vì cú pháp SDK và giới hạn bậc miễn phí đổi theo thời gian.
- **API AI:** Gemini (Google AI Studio) hoặc [OpenRouter](https://openrouter.ai) (một API key gọi được nhiều model của nhiều hãng) - xem [gọi API LLM](../04-build-ung-dung-ai/01-goi-api-llm.md).

Về database: tạo **hai project Supabase** ngay từ đầu, một `-dev` và một chính thức (prod) - không phải bước "thêm cho chắc" mà là mặc định nên làm. Agent link vào project `-dev`, tự do chạy thử migration ở đó; project chính chỉ nhận migration sau khi bạn đã xem bản xem thử chạy đúng (bước 4). Hai project miễn phí là đủ cho giai đoạn này; kiểm tra trang chủ Supabase vì số lượng project miễn phí mỗi tổ chức có thể thay đổi theo thời gian.

## Bước 2: đăng nhập CLI

CLI là bản dòng lệnh của các dịch vụ trên, để agent tự thao tác thay vì bạn phải bấm trên web. Việc bạn cần tự tay làm chỉ có một:

```bash
gh auth login
```
- `gh` là GitHub CLI (tải tại cli.github.com). Lệnh này mở trình duyệt để bạn xác nhận; sau đó agent tạo repo, mở pull request, đọc issue được mà không cần bạn dán token.

Các CLI còn lại (Vercel, Supabase...), bạn **không cần tự chạy trước** - cứ giao việc, tới khi agent cần dùng một dịch vụ chưa đăng nhập, nó sẽ tự chạy đúng lệnh (`vercel login`, `npx supabase login`...) và bạn chỉ cần xác nhận trên trình duyệt khi được hỏi. Cách này đỡ phải nhớ trước toàn bộ lệnh cài đặt của từng dịch vụ.

**Tuyệt đối không dán token hay API key vào cuộc trò chuyện với agent** - luồng đăng nhập qua trình duyệt tồn tại chính là để bạn không phải làm việc đó. Đây cũng là lý do secret của bản thật (production) không bao giờ nên nằm trên máy agent đang chạy - xem bước 5.

## Bước 3: nối repo với Vercel - và dùng đúng tính năng xem thử của nó

Trên trang Vercel, chọn "Add New Project", import repo GitHub của dự án (hoặc để agent làm qua CLI khi nó cần). Vercel tự làm đúng một việc quan trọng mà bản trước của bài này bỏ qua: **mỗi nhánh hoặc pull request có một địa chỉ xem thử (preview) riêng**, tách hoàn toàn khỏi địa chỉ chính thức - đây không phải tính năng cao cấp phải bật thêm, nó chạy mặc định ngay khi nối repo.

Kéo biến môi trường về máy để chạy local:

```bash
vercel link
vercel env pull .env.local
```
- `vercel link`: hỏi bạn chọn đúng project trên Vercel để gắn với thư mục hiện tại.
- `vercel env pull .env.local`: tải các biến môi trường đã khai trên Vercel về file `.env.local` - agent chạy được app ở máy bạn với đúng cấu hình, mà bạn không phải copy tay từng biến.

Đảm bảo `.env.local` nằm trong `.gitignore` - xem lại [giấu API key và secret](../10-bao-mat/03-giau-api-key-va-secret.md).

## Bước 4: nối Supabase (dev) và cho agent tự chạy migration ở đó

```bash
npx supabase link --project-ref ma-project-dev-cua-ban
npx supabase db push
```
- Dòng 1: gắn thư mục dự án với project Supabase **dev** (mã project lấy trong Settings > General trên trang Supabase).
- Dòng 2: đẩy các file migration trong thư mục `supabase/migrations/` lên database dev. Từ đây khi agent cần thêm bảng hay cột, nó tự viết file migration (đúng như đã học ở [database production](../03-ha-tang-thuc-chien/06-database-production-backup.md)) và tự chạy lệnh này lên **dev**.

Chỉ khi bạn đã dùng thử bản xem trước (bước 6) và ưng ý, mới tự tay (hoặc yêu cầu agent) chạy đúng migration đó lên project chính thức. Đây là ranh giới quan trọng nhất của cả bài: **agent tự do ở dev, người quyết định ở prod.**

## Bước 5: cấp quyền cho agent - theo đúng khuyến nghị chính thức, không phải "tự động hết"

Cả Claude Code và Codex đều có một chế độ **bỏ qua toàn bộ việc hỏi xin phép**: Claude Code gọi là chế độ "Bypass permissions" (cờ `--dangerously-skip-permissions`), Codex gọi là chạy full access (cờ `--dangerously-bypass-approvals-and-sandbox`, còn gọi tắt là `--yolo`). Tài liệu chính thức của cả hai hãng đều nói **chỉ dùng trong một container hoặc máy ảo cách ly** - không dùng trên máy đang có sẵn thông tin đăng nhập, secret, hay dữ liệu thật (kiểm tra 05/09/2026: [Claude Code - Choose a permission mode](https://code.claude.com/docs/en/permission-modes), [Codex - Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)). Bản trước của bài này khuyên dùng đúng chế độ này cho công việc hằng ngày trên máy thật - đó là chỗ cần sửa.

**Cách làm đúng cho việc hằng ngày, không cần container:**

- **Claude Code:** dùng chế độ **Accept Edits** (tự động chấp nhận sửa file và các lệnh thao tác file thông thường như `mkdir`, `mv`, `cp`) hoặc chế độ **Auto** nếu công cụ của bạn có (một mô hình giám sát riêng tự kiểm tra hành động thay vì hỏi bạn từng lệnh - không phải "không ai kiểm tra gì"). Cả hai vẫn tôn trọng ranh giới thư mục dự án và không tự ý ghi ra ngoài đó. Nhấn `Shift+Tab` để đổi chế độ ngay trong phiên làm việc.
- **Codex:** chế độ mặc định (`workspace-write` kèm hỏi khi cần, gọi là "on-request") đã đủ tự động cho việc hằng ngày - agent đọc/sửa file trong thư mục dự án và chạy lệnh thông thường mà không hỏi liên tục, chỉ dừng lại khi cần ra ngoài phạm vi đó hoặc cần mạng.
- Muốn giảm số lần bị hỏi hơn nữa mà vẫn có ranh giới kỹ thuật thật (không chỉ dựa vào sự tự giác của agent), dùng tính năng sandbox có sẵn của từng công cụ: gõ `/sandbox` trong Claude Code, hoặc đặt `sandbox_mode` trong file cấu hình của Codex.

Nếu muốn giới hạn chặt hơn ở giai đoạn mới bắt đầu, liệt kê đúng các lệnh được phép trong `.claude/settings.json`:

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
- Mỗi dòng là một lệnh agent được chạy mà không cần hỏi; dấu `:*` nghĩa là chấp nhận mọi tham số phía sau. Nới dần danh sách này khi đã quen.
- Cú pháp có thể đổi theo phiên bản; trong Claude Code gõ `/permissions` để xem và sửa danh sách này bằng giao diện thay vì sửa file tay.

Chạy `/init` trong Claude Code để tạo `CLAUDE.md`, rồi bổ sung phần quan trọng nhất là **các lệnh của dự án** (cài, chạy, test, build, migration), theo mẫu ở [bài CLAUDE.md](04-claude-md-va-ngu-canh.md). **Ở Codex**, vai trò tương đương là `AGENTS.md` (xem [bài file hướng dẫn](../02-code-voi-ai/12-codex-prompt-ngu-canh-va-agents-md.md)).

> **Nếu bạn đã quen tay và chấp nhận đánh đổi:** một số người (kể cả tác giả các case study trong thư viện này, ở giai đoạn đã có nhiều năm kinh nghiệm nghiệp vụ với đúng bài toán đang build) chọn bật chế độ bỏ qua toàn bộ duyệt ngay trên máy thật, đẩy thẳng lên nhánh chính, và coi commit thường xuyên + rollback nhanh là lưới an toàn. Đây là lựa chọn có ý thức của người đã quen, không phải điều nên bắt chước khi mới bắt đầu - và không phải khuyến nghị chính thức của Anthropic hay OpenAI. Nếu chọn cách này, ít nhất giữ nguyên tắc secret production không đưa cho agent ở bước 3-4.

## Nhánh: mỗi việc một nhánh, vì đó là thứ tạo ra bản xem thử

Khác với khuyến nghị "đừng tạo nhánh cho mọi việc nhỏ" ở bản trước - giờ mỗi task nên có một nhánh riêng, vì lý do rất cụ thể: **nhánh chính là thứ khiến Vercel tự tạo một bản xem thử tách biệt khỏi bản thật** (bước 3). Không có nhánh, không có bản xem thử, và bạn quay lại tình trạng agent sửa thẳng vào bản người dùng thật đang xem.

Việc này không nặng nề như "quy trình Git chuẩn" ở công ty lớn - bạn không cần review kỹ từng dòng trong pull request, chỉ cần: agent làm xong trên nhánh, bạn mở link xem thử, ưng thì gộp (merge) vào nhánh chính, không ưng thì sửa tiếp hoặc bỏ nhánh đó. Yêu cầu agent tự tạo nhánh, tự mở pull request, và tự gộp khi bạn đã xác nhận ưng ý - toàn bộ vẫn là thao tác qua `gh` CLI, không cần bạn vào web GitHub.

## Bước 6: giao việc trọn gói

Setup xong, một task từ nay trông như thế này, và bạn không gõ dòng lệnh nào:

```text
Thêm tính năng "khách để lại số điện thoại để được gọi lại" cho landing page.
- Form gồm họ tên, số điện thoại (bắt buộc, kiểm tra định dạng), ghi chú.
- Lưu vào bảng `lead` trên Supabase dev (tự viết migration), gửi email báo cho tôi.
- Viết test cho phần kiểm tra số điện thoại, chạy test và build.
- Làm trên một nhánh riêng, commit, push, mở pull request khi test/build đạt.
```

Agent tự làm hết vòng: code, migration lên dev, test, commit, push lên nhánh, mở pull request. Bạn nhận về một bản tóm tắt và một địa chỉ xem thử để dùng thử - chưa phải bản thật.

## Vài điểm kiểm tra của bạn

Bạn không đọc từng dòng code. Bạn kiểm tra:

1. **Trước khi giao:** yêu cầu có đủ mục tiêu, phạm vi, tiêu chí đạt, kiểm tra chưa? Với dự án nhiều phiên, spec và backlog ở [các bài trước trong phần này](01-tai-sao-can-spec.md) là phiên bản đầy đủ của bước này.
2. **Khi agent báo có bản xem thử:** mở link xem thử và **dùng như một khách hàng khó tính** - điền form đúng, điền sai, bỏ trống, bấm hai lần, mở trên điện thoại. Đây là nghiệm thu thật; "test đã xanh" chỉ là lời agent nói. Ưng ý mới yêu cầu gộp vào nhánh chính (lúc này mới thật sự lên bản thật, và migration mới thật sự chạy lên Supabase prod).
3. **Với thay đổi động tới tiền, dữ liệu người dùng hoặc đăng nhập:** đi qua [checklist bảo mật](../10-bao-mat/01-checklist-truoc-khi-public.md) và [bảo mật ứng dụng AI](../10-bao-mat/07-bao-mat-ung-dung-ai.md) nếu có AI bên trong - đây là lúc đáng để yêu cầu agent giải thích diff, hoặc tự đọc theo [bài đọc diff](../02-code-voi-ai/13-codex-sua-code-test-va-review.md), trước khi gộp vào bản thật.

## Khi có lỗi: rollback là lưới an toàn thật, không phải cố sửa tiếp

Nhờ bản xem thử ở bước 3-6, phần lớn lỗi bị chặn lại trước khi chạm bản thật. Nhưng vẫn có thể sai sau khi đã gộp - cách xử lý: **rollback về đợt trước đó**, không cố sửa đè lên một trạng thái đã hỏng (dễ rối hơn và khó biết chắc đã hết lỗi chưa).

- **Code/deploy:** `git revert` về commit trước đó rồi push, hoặc trên Vercel dùng tính năng phục hồi bản deploy trước (tên gọi cụ thể có thể đổi theo giao diện) - cả hai đều nhanh hơn nhiều so với ngồi dò lỗi dưới áp lực.
- **Database:** nếu migration mới gây lỗi trên prod, đây chính là lý do [bài backup và restore](../03-ha-tang-thuc-chien/06-database-production-backup.md) yêu cầu bạn *thử* khôi phục ít nhất một lần trước khi cần thật - đừng để lần đầu thử restore là lúc đang gặp sự cố. Vì migration luôn được thử trên dev trước (bước 4), tình huống này nên hiếm khi xảy ra.

Muốn giảm lo hơn nữa, commit thường xuyên trong lúc agent làm (đợt sửa nhỏ) thay vì gộp nhiều thay đổi rồi mới commit một lần - đợt càng nhỏ, rollback càng rõ ràng nên bỏ đúng chỗ nào.

## Khi nào phải xuống tầng chi tiết

- Agent nói "đã sửa xong" nhưng bản xem thử vẫn hỏng: mở DevTools tab Network theo [bài nền tảng web](../01-bat-dau-tu-so-0/10-file-web-va-server-hoat-dong-the-nao.md) để tự thấy request nào lỗi, rồi dán đúng lỗi đó cho agent.
- Cùng một lỗi lặp lại lần thứ ba: đừng cố sửa tiếp - rollback về bản chạy tốt gần nhất, bắt agent tóm tắt trạng thái và mở phiên mới theo [bài xử lý lỗi](../02-code-voi-ai/17-codex-xu-ly-loi.md).
- Sắp làm gì đó khó hoàn tác trên bản thật (xóa, đổi schema, thanh toán): tự backup trước theo [bài backup](../03-ha-tang-thuc-chien/06-database-production-backup.md), rồi mới cho gộp vào prod.

Ngoài các tình huống đó, để agent làm.

## Bài tập

Lấy dự án [landing page](../09-du-an-thuc-hanh/du-an-01-landing-page/spec.md) hoặc dự án của bạn, làm trọn bộ các bước ở trên trong một buổi: hai project Supabase, một nhánh riêng cho task mẫu ở bước 6, mở link xem thử và tự dùng thử trước khi gộp. Sau đó tự tay thử một lần rollback (cố ý cho agent gây một lỗi nhỏ trên nhánh, gộp vào rồi `git revert` về bản trước) để biết chắc bạn làm được khi cần thật.

## Checklist đạt bài

- [ ] Đã đăng nhập `gh` một lần; để agent tự đăng nhập các CLI khác khi cần, không dán token vào chat.
- [ ] Có hai project Supabase (dev và chính thức); agent chỉ tự chạy migration lên dev.
- [ ] Repo đã nối Vercel: mỗi nhánh/pull request có một link xem thử riêng, tách khỏi bản thật.
- [ ] Không dùng chế độ "bỏ qua mọi duyệt" (bypass permissions / full access / `--yolo`) trên máy có secret hay dữ liệu thật - chỉ dùng trong container/VM cách ly nếu có.
- [ ] Đã tự dùng thử bản xem trước ít nhất một lần trước khi yêu cầu agent gộp vào bản thật.
- [ ] Đã tự tay thử rollback ít nhất một lần, không đợi tới lúc gặp sự cố thật mới thử lần đầu.

## Bước tiếp theo

Bàn làm việc đã dựng xong, giờ dùng nó để build thật với một spec có sẵn, không cần tự nghĩ đề bài: [Dự án thực hành →](../09-du-an-thuc-hanh/)
