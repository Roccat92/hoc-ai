# Học AI Việt - học lập trình và build sản phẩm với AI từ con số 0 <img src="/favicon.svg" alt="" width="28" height="28" style="vertical-align:-4px;border-radius:6px">

**Thư viện mở, hoàn toàn miễn phí, viết bằng tiếng Việt** - cho người chưa biết code muốn tự build web, app, chatbot bằng AI, và cho dev muốn làm việc nhanh hơn với coding agent.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> Giúp người chưa biết gì về công nghệ có kiến thức và tự tin. Có thể bạn vẫn chưa kiếm được tiền ngay, nhưng ít nhất sẽ không mất tiền cho những khóa học không đáng.

## Sứ mệnh

Học AI Việt sinh ra để giải một bài toán rất thật: rất nhiều người Việt muốn build sản phẩm bằng AI nhưng không biết bắt đầu từ đâu, và các khóa học "AI cho người mới" trên mạng thường thu phí vài triệu đồng mà nội dung thì rải rác, nửa vời. Repo này gom lại một lộ trình đầy đủ, thực chiến, từ việc còn chưa phân biệt được AI với ML cho tới lúc tự tay deploy một sản phẩm AI thật lên internet - **hoàn toàn miễn phí, viết bằng tiếng Việt, không giấu bài, không quảng cáo trá hình.**

**AI là con dao, chuyên môn là đầu bếp.** Repo này không dạy "học AI" như một đích đến tự thân - dạy bạn dùng AI để build sản phẩm thật, ngay trong lĩnh vực/công việc bạn đã có hoặc đang theo đuổi.

## Dành cho ai?

- **Người không có điều kiện trả tiền học** - thất nghiệp, trái ngành, hoặc chưa muốn chi tiền cho một khóa học chỉ để thử xem mình có hợp không.
- **Người chưa biết code** nhưng muốn tự build sản phẩm (web, app, chatbot...) bằng cách mô tả ý tưởng cho AI viết code giúp.
- **Dev truyền thống** muốn chuyển sang làm việc với AI để tăng tốc độ, hoặc học build ứng dụng AI (RAG, agent...).
- **Chủ doanh nghiệp nhỏ / freelancer** muốn tự động hóa công việc bằng AI mà không cần thuê team kỹ thuật riêng.

Bạn không cần biết trước bất kỳ thuật ngữ nào. Thấy chữ "RAG", "token", "MCP" mà không hiểu - đó chính xác là lý do repo này tồn tại.

## Lộ trình 5 cấp

Đừng hoảng khi thấy repo có tới 12 phần và cả trăm bài - bạn **không cần đọc hết mới thấy mình tiến bộ**. Dưới đây là 5 cấp, mỗi cấp 5 bài mốc (lấy từ chính nội dung repo, không phải bài mới), mỗi cấp kết thúc bằng một thứ nhìn thấy được - một link public, một app có đăng nhập, một chatbot RAG chạy thật. Tick vào ô khi xong, tiến độ tự lưu lại trên trình duyệt này để bạn tự thấy mình đang ở đâu.

<LoTrinh />

Đi hết 5 cấp là bạn đã chạm tới năng lực cốt lõi của cả repo. Muốn đào sâu hơn (train/fine-tune model, kho tài nguyên tham khảo, so sánh từng công cụ AI code) thì đọc thêm ở mục lục đầy đủ bên dưới hoặc sidebar bên trái - không bắt buộc, không có gì "bỏ lỡ" nếu bạn không đọc.

## Vì sao không phải một khóa học nữa?

Trên mạng đã có rất nhiều nơi dạy lập trình - từ các khóa dạy code truyền thống tới các khóa "vibe coding" mới nổi dạy dùng AI để code. Nhiều nơi trong số đó chất lượng tốt thật sự. Học AI Việt không cạnh tranh bằng cách nói ai dở hơn ai - chỉ khác ở ba điểm cụ thể:

- **Miễn phí hoàn toàn**, không có phần nào giấu sau paywall để "học tiếp phải trả tiền".
- **Kèm chi phí thật bằng VND và case study từ sản phẩm đang chạy thật** (xem [`07-case-study/`](07-case-study/)), không chỉ lý thuyết suông hay ảnh chụp màn hình demo.
- **Dạy dùng AI để build ngay trong công việc/lĩnh vực bạn đã có**, thay vì dạy "học AI" như một môn học trừu tượng, tách rời khỏi việc bạn thực sự cần làm.

<details>
<summary><strong>Toàn bộ mục lục (12 phần) - xem khi muốn tra cứu, không cần đọc hết</strong></summary>

| Thư mục | Nội dung |
|---|---|
| [`00-ban-do-gioi-ai/`](00-ban-do-gioi-ai/) | Bức tranh toàn cảnh giới AI: AI/ML/DL/GenAI khác nhau thế nào, các công ty và model lớn, các nghề trong ngành, từ điển thuật ngữ A-Z, AI làm được gì và cảnh giác "mỏ vàng" |
| [`01-bat-dau-tu-so-0/`](01-bat-dau-tu-so-0/) | Tư duy học đúng cách, cài môi trường, prompt cơ bản, và nền tảng web cho người mới |
| [`02-code-voi-ai/`](02-code-voi-ai/) | Code cùng AI: cài coding agent, build dự án, debug, test, review, Git/GitHub và AI IDE khác |
| [`03-ha-tang-thuc-chien/`](03-ha-tang-thuc-chien/) | Hạ tầng thực chiến: deploy, VPS, cloud GPU, LLM local, database production, CI/CD và monitoring |
| [`04-build-ung-dung-ai/`](04-build-ung-dung-ai/) | Build ứng dụng AI thật: API, RAG, agent, structured output, eval, reliability, tích hợp và automation |
| [`05-train-va-finetune/`](05-train-va-finetune/) | Nâng cao - không bắt buộc: hiểu về training, fine-tune thực hành, dữ liệu tiếng Việt, tổng quan build LLM từ đầu |
| [`06-kho-tai-nguyen/`](06-kho-tai-nguyen/) | Tham khảo: repo GitHub đáng học, khóa học miễn phí, Claude skills & MCP, cộng đồng Việt, kênh theo dõi |
| [`07-case-study/`](07-case-study/) | Cộng đồng chia sẻ dự án thật đã build bằng AI, kèm chi phí và bài học |
| [`08-chuan-hoa-du-an/`](08-chuan-hoa-du-an/) | Làm việc với AI có kỷ luật: spec.md, backlog.md, CLAUDE.md, và setup một lần để agent tự chạy - cách các sản phẩm thật trong repo này được build |
| [`09-du-an-thuc-hanh/`](09-du-an-thuc-hanh/) | Dự án thực hành có sẵn spec, rubric và capstone - copy ra, build, tùy biến thành sản phẩm của riêng bạn |
| [`10-bao-mat/`](10-bao-mat/) | Checklist bảo mật web và AI: SSL, secret, chống bot, đăng nhập, prompt injection, tool và dữ liệu |
| [`11-ra-thi-truong/`](11-ra-thi-truong/) | Thực tế ở Việt Nam khi ra thị trường: auth, store, pháp lý, xác thực vấn đề, analytics, thanh toán và vận hành |
| [`phu-luc-cong-cu/`](phu-luc-cong-cu/) | Phụ lục tra cứu riêng từng công cụ: lệnh cài, bảng giá VND, cấu hình nâng cao cho ChatGPT/Claude Code/Codex |

Đi theo đúng thứ tự "Bước tiếp theo" cuối mỗi bài là cách chắc ăn nhất để không bỏ sót bài nào trong đường học đầy đủ.

</details>

## Chi phí thực tế tối thiểu

**Trả lời thẳng: có, bạn học 100% miễn phí được nếu chịu khó.** Các công cụ trong repo này đều ưu tiên bản miễn phí/open source trước.

| Khoản chi | Có bắt buộc không? | Chi phí ước tính | Ghi chú |
|---|---|---|---|
| Máy tính, mạng internet | Bắt buộc | Đã có sẵn | Không cần máy mạnh để bắt đầu |
| Tài khoản chatbot AI (Claude/ChatGPT/Gemini) | Không | 0đ (bản free) | Bản free đủ dùng để học; nâng cấp khi cần dùng nhiều |
| Claude Code / Codex (coding agent) | Không | 0đ (có gói free/dùng thử) | Xem giá ở [`phu-luc-cong-cu/`](phu-luc-cong-cu/) |
| Tên miền riêng (domain) | Không | ~150.000-350.000đ/năm | Chỉ cần khi muốn địa chỉ web riêng |
| VPS (máy chủ riêng) | Không | ~50.000-150.000đ/tháng | Chỉ cần khi deploy miễn phí không đủ đáp ứng |
| Thuê cloud GPU (fine-tune) | Không | Tính theo giờ, xem [`03-ha-tang-thuc-chien/04-thue-cloud-gpu.md`](03-ha-tang-thuc-chien/04-thue-cloud-gpu.md) | Chỉ cần ở giai đoạn nâng cao |

> Giá có thể thay đổi theo thời gian - luôn kiểm tra trang chủ nhà cung cấp để có số mới nhất.

## Đóng góp

Repo này sống được là nhờ cộng đồng bổ sung, sửa lỗi, cập nhật giá cả/model mới. Xem hướng dẫn chi tiết (kể cả nếu đây là lần đầu bạn tạo Pull Request) tại [CONTRIBUTING.md](CONTRIBUTING.md).

Ngoài đóng góp thủ công, nội dung còn được giữ cập nhật bằng hai cách tự động: một job chạy hàng tuần dùng **Claude qua API** rà lại các mốc giá/tên model/giới hạn gói đã đánh dấu ngày kiểm tra trong bài, tự tra cứu thông tin mới và mở Pull Request đề xuất sửa khi phát hiện thông tin quá hạn - không tự commit thẳng, người duy trì luôn xem lại trước khi gộp; và một script kiểm tra chuỗi bài học, link nội bộ cùng cú pháp code mẫu, chạy trên mọi Pull Request để bắt lỗi trước khi merge.

## Người thực hiện

Học AI Việt được viết bởi **Nguyễn Ngọc Thư** - Giám đốc công ty TNHH StarteeX, cùng **Claude** (Anthropic) và **ChatGPT** (OpenAI) - đúng cách các sản phẩm trong [case study](07-case-study/) của chính tác giả được build: mô tả ý tưởng bằng tiếng Việt, để AI viết phần lớn nội dung, người làm đọc lại, kiểm tra và quyết định.

*(Khi có đóng góp đáng kể từ cộng đồng, mục này sẽ được thay bằng một trang credit chi tiết hơn - lúc đó thư viện không còn là công sức của riêng một người nữa.)*

## Giấy phép

Phát hành theo giấy phép [MIT](LICENSE) - dùng, sửa, chia sẻ lại thoải mái, kể cả cho mục đích thương mại.
