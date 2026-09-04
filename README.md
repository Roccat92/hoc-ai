# Học AI Việt 🇻🇳

**Thư viện mở, miễn phí, tiếng Việt — học lập trình và build sản phẩm với AI từ con số 0.**

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> Giúp một thế hệ không biết gì công nghệ có kiến thức và tự tin, dù có thể vẫn không kiếm được tiền, nhưng không để họ nuôi thầy vớ vẩn.

## Sứ mệnh

Học AI Việt sinh ra để giải một bài toán rất thật: rất nhiều người Việt muốn build sản phẩm bằng AI nhưng không biết bắt đầu từ đâu, và các khóa học "AI cho người mới" trên mạng thường thu phí vài triệu đồng mà nội dung thì rải rác, nửa vời. Repo này gom lại một lộ trình đầy đủ, thực chiến, từ việc còn chưa phân biệt được AI với ML cho tới lúc tự tay deploy một sản phẩm AI thật lên internet — **hoàn toàn miễn phí, viết bằng tiếng Việt, không giấu bài, không quảng cáo trá hình.** Bạn không cần trả tiền học thầy online để làm được việc này.

## Triết lý xuyên suốt

**AI là con dao, chuyên môn là đầu bếp.** Repo này không dạy "học AI" như một đích đến tự thân — dạy bạn dùng AI để build sản phẩm thật, ngay trong lĩnh vực/công việc bạn đã có hoặc đang theo đuổi. Con dao sắc tới đâu cũng không tự ra món ngon, nếu người cầm dao không biết mình đang nấu gì.

## Vì sao không phải một khóa học nữa?

Trên mạng đã có rất nhiều nơi dạy lập trình — từ các khóa dạy code truyền thống (cú pháp, thuật toán, từng bước bài bản) tới các khóa "vibe coding" mới nổi dạy dùng AI để code. Nhiều nơi trong số đó chất lượng tốt thật sự. Học AI Việt không cạnh tranh bằng cách nói ai dở hơn ai — chỉ khác ở ba điểm cụ thể:

- **Miễn phí hoàn toàn**, không có phần nào giấu sau paywall để "học tiếp phải trả tiền".
- **Kèm chi phí thật bằng VND và case study từ sản phẩm đang chạy thật** (xem [`07-case-study/`](07-case-study/)), không chỉ lý thuyết suông hay ảnh chụp màn hình demo.
- **Dạy dùng AI để build ngay trong công việc/lĩnh vực bạn đã có**, thay vì dạy "học AI" như một môn học trừu tượng, tách rời khỏi việc bạn thực sự cần làm.

Không phải ai cũng có vài triệu đồng để bắt đầu học — repo này tồn tại để điều đó không phải là rào cản.

## Dành cho ai?

- **Người không có điều kiện trả tiền học** — thất nghiệp, trái ngành, hoặc đơn giản là chưa muốn chi tiền cho một khóa học chỉ để thử xem mình có hợp không.
- **Người chưa biết code** nhưng muốn tự build sản phẩm (web, app, chatbot...) bằng cách mô tả ý tưởng cho AI viết code giúp.
- **Dev truyền thống** muốn chuyển sang làm việc với AI (Claude Code, Cursor...) để tăng tốc độ, hoặc muốn học build ứng dụng AI (RAG, agent...).
- **Chủ doanh nghiệp nhỏ / freelancer** muốn tự động hóa công việc bằng AI mà không cần thuê team kỹ thuật riêng.

Bạn không cần biết trước bất kỳ thuật ngữ nào. Thấy chữ "RAG", "token", "MCP" mà không hiểu — đó chính xác là lý do repo này tồn tại.

## Mục lục

| Thư mục | Nội dung |
|---|---|
| [`00-ban-do-gioi-ai/`](00-ban-do-gioi-ai/) | Bức tranh toàn cảnh giới AI: AI/ML/DL/GenAI khác nhau thế nào, các công ty và model lớn, các nghề trong ngành, từ điển thuật ngữ A-Z, AI làm được gì và cảnh giác "mỏ vàng" |
| [`01-bat-dau-tu-so-0/`](01-bat-dau-tu-so-0/) | Tư duy học đúng cách, cài đặt môi trường, dùng chatbot để học, kỹ thuật prompt cơ bản |
| [`02-code-voi-ai/`](02-code-voi-ai/) | Code cùng AI: Claude Code, Cursor/Windsurf/Copilot, build dự án đầu tiên, đọc hiểu code AI viết, Git/GitHub cơ bản |
| [`03-ha-tang-thuc-chien/`](03-ha-tang-thuc-chien/) | Hạ tầng thực chiến: thuê VPS, deploy web, deploy miễn phí, thuê cloud GPU, chạy LLM trên máy mình |
| [`04-build-ung-dung-ai/`](04-build-ung-dung-ai/) | Build ứng dụng AI thật: gọi API LLM, RAG, AI agent, tích hợp AI vào app có sẵn, automation với n8n |
| [`05-train-va-finetune/`](05-train-va-finetune/) | Nâng cao: hiểu về training, fine-tune thực hành, dữ liệu tiếng Việt, tổng quan build LLM từ đầu |
| [`06-kho-tai-nguyen/`](06-kho-tai-nguyen/) | Kho tài nguyên: repo GitHub đáng học, khóa học miễn phí, Claude skills & MCP, cộng đồng Việt, kênh theo dõi |
| [`07-case-study/`](07-case-study/) | Cộng đồng chia sẻ dự án thật đã build bằng AI, kèm chi phí và bài học |
| [`08-chuan-hoa-du-an/`](08-chuan-hoa-du-an/) | Nâng cao: làm việc với AI có kỷ luật — spec.md, backlog.md, CLAUDE.md, quy trình một phiên làm việc chuẩn |
| [`09-du-an-thuc-hanh/`](09-du-an-thuc-hanh/) | Dự án thực hành có sẵn spec — copy ra, build, tùy biến thành sản phẩm của riêng bạn |
| [`10-bao-mat/`](10-bao-mat/) | Checklist bảo mật tối thiểu trước khi cho người khác dùng: SSL, giấu API key, chống bot/spam, đăng nhập an toàn |

## Lộ trình gợi ý (8 tuần)

Đây là lộ trình tham khảo — nếu bạn học nhanh hơn hoặc chậm hơn đều bình thường, không có ai chấm điểm bạn cả.

| Tuần | Làm gì | Đọc ở đâu |
|---|---|---|
| 1–2 | Nắm nền tảng: AI là gì, LLM hoạt động ra sao, cài môi trường, học cách prompt | `00-ban-do-gioi-ai/`, `01-bat-dau-tu-so-0/` |
| 3–4 | Code cùng AI: cài Claude Code, làm dự án web đầu tiên, học Git/GitHub | `02-code-voi-ai/` |
| 5 | Hạ tầng: hiểu VPS, deploy thử một trang lên internet | `03-ha-tang-thuc-chien/` |
| 6–7 | Build ứng dụng AI: gọi API, làm chatbot RAG, thử AI agent | `04-build-ung-dung-ai/` |
| 8 | Tự chọn một ý tưởng, tự build từ đầu đến khi deploy được — dự án riêng của bạn | Toàn bộ những gì đã học |

Muốn học sâu hơn về train/fine-tune model thì đó là chặng nâng cao, có thể học sau tuần 8 khi đã có nhu cầu cụ thể — xem `05-train-va-finetune/`. Khi dự án của bạn lớn hơn, làm qua nhiều phiên, nhiều ngày — học cách làm việc với AI có kỷ luật ở `08-chuan-hoa-du-an/`, rồi luyện tập ngay quy trình đó với spec có sẵn ở `09-du-an-thuc-hanh/`. Trước khi cho người khác dùng thử sản phẩm, đi qua checklist bảo mật tối thiểu ở `10-bao-mat/`.

## Chi phí thực tế tối thiểu

**Trả lời thẳng: có, bạn học 100% miễn phí được nếu chịu khó.** Các công cụ trong repo này đều ưu tiên bản miễn phí/open source trước. Nhưng nếu muốn học nhanh hơn hoặc làm dự án nghiêm túc, đây là thứ tự nên chi tiền (nếu có):

| Khoản chi | Có bắt buộc không? | Chi phí ước tính | Ghi chú |
|---|---|---|---|
| Máy tính, mạng internet | Bắt buộc | Đã có sẵn | Không cần máy mạnh để bắt đầu |
| Tài khoản chatbot AI (Claude/ChatGPT/Gemini) | Không | 0đ (bản free) | Bản free đủ dùng để học; nâng cấp khi cần dùng nhiều |
| Claude Code / Cursor (AI code) | Không | 0đ (có gói free/dùng thử) | Xem chi tiết giá ở `02-code-voi-ai/01-claude-code.md` |
| Tên miền riêng (domain) | Không | ~150.000–350.000đ/năm | Chỉ cần khi muốn có địa chỉ web riêng thay vì domain miễn phí của nền tảng deploy |
| VPS (máy chủ riêng) | Không | ~50.000–150.000đ/tháng | Chỉ cần khi deploy miễn phí (Vercel/Railway...) không đủ đáp ứng |
| Thuê cloud GPU (để fine-tune) | Không | Tính theo giờ, xem `03-ha-tang-thuc-chien/04-thue-cloud-gpu.md` | Chỉ cần ở giai đoạn nâng cao |

> Giá có thể thay đổi theo thời gian — luôn kiểm tra trang chủ nhà cung cấp để có số mới nhất.

**Tóm lại:** 8 tuần đầu bạn có thể học và build được sản phẩm thật mà không tốn một đồng nào. Chi tiền là để tiện hơn, nhanh hơn — không phải điều kiện bắt buộc.

## Đóng góp

Repo này sống được là nhờ cộng đồng bổ sung, sửa lỗi, cập nhật giá cả/model mới. Xem hướng dẫn chi tiết (kể cả nếu đây là lần đầu bạn tạo Pull Request) tại [CONTRIBUTING.md](CONTRIBUTING.md).

## Giấy phép

Phát hành theo giấy phép [MIT](LICENSE) — dùng, sửa, chia sẻ lại thoải mái, kể cả cho mục đích thương mại.
