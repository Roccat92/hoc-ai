# Spec: Học AI Việt — thư viện mở học build sản phẩm với AI

> Phiên bản: 1.0 · Cập nhật: 05/09/2026 · Trạng thái: đang phát triển

## 1. Mục tiêu sản phẩm

Học AI Việt là thư viện Markdown tiếng Việt, miễn phí và có thể học theo đường đi rõ ràng,
giúp một người đi từ chưa biết gì đến tự xây, kiểm thử, triển khai và vận hành sản phẩm có AI.
Trọng tâm là năng lực làm việc thực tế với ChatGPT, Codex và các công cụ AI liên quan — không
phải học thuộc thuật ngữ hay chạy theo một công cụ duy nhất.

Thông điệp xuyên suốt: **AI là con dao, chuyên môn là đầu bếp.** Người học phải biết đặt vấn đề,
kiểm chứng đầu ra và chịu trách nhiệm với sản phẩm; AI chỉ là đòn bẩy.

## 2. Đối tượng và đầu ra

### Đối tượng chính

- Người Việt mới bắt đầu, không chắc mình có cần nền tảng lập trình hay không.
- Người đã biết một ít code nhưng chưa biết dùng AI trong quy trình hằng ngày.
- Người làm sản phẩm/kinh doanh muốn tự dựng prototype và đưa nó ra dùng thật.
- Người muốn học theo dự án, có checklist và tiêu chí kiểm tra thay vì chỉ xem video.

### Sau khi hoàn thành lộ trình, người học có thể

1. Chọn đúng chế độ ChatGPT/Codex cho từng việc và viết prompt có bối cảnh, tiêu chí, đầu ra.
2. Đọc, sửa, test và review code do AI tạo; biết dừng, hoàn tác và hỏi lại khi có rủi ro.
3. Xây ứng dụng AI có dữ liệu, API, RAG, structured output, evals, guardrail và logging cơ bản.
4. Đưa ứng dụng lên môi trường production với database, CI/CD, monitoring, bảo mật và chi phí rõ ràng.
5. Xác thực nhu cầu, đo usage/retention, thu tiền, gửi email và vận hành sản phẩm tại Việt Nam.
6. Hoàn thành một capstone có README, demo, test/eval, threat model và hướng dẫn vận hành.

## 3. Phạm vi nội dung hiện tại

Lộ trình chính được chia thành các phần đánh số. Mỗi phần có README làm bản đồ và các bài Markdown
đánh số để đọc tuần tự:

| Phần | Vai trò trong lộ trình |
| --- | --- |
| 00 | Bản đồ giới AI, thuật ngữ và cách chọn hướng đi |
| 01 | Bắt đầu từ số 0; ChatGPT, file/web, Projects và nền tảng web/API/database |
| 02 | Code với AI; Codex từ cài đặt đến debug, Git, skills, MCP và tự động hóa |
| 03 | Hạ tầng thực chiến: deploy, database, CI/CD, monitoring và chi phí |
| 04 | Build ứng dụng AI: workflow, n8n, structured output, evals, RAG và agent |
| 05 | Train và fine-tune; đánh giá trước khi quyết định fine-tune |
| 06 | Kho tài nguyên, template và công cụ tham khảo |
| 07 | Case study có nguồn, dùng để nối kỹ thuật với bài toán thật |
| 08 | Chuẩn hóa dự án: spec, backlog, CLAUDE và quy trình làm việc |
| 09 | Dự án thực hành theo bộ 4 file chuẩn; có rubric và capstone |
| 10 | Bảo mật tối thiểu và bảo mật ứng dụng AI |
| 11 | Ra thị trường thật tại Việt Nam: vấn đề, analytics, thanh toán, email, vận hành |

Chi tiết khoảng trống, benchmark và kế hoạch mở rộng nằm trong
[`KE-HOACH-BO-SUNG-NOI-DUNG.md`](KE-HOACH-BO-SUNG-NOI-DUNG.md).

## 4. Nguyên tắc trải nghiệm học

- Viết bằng tiếng Việt, xưng hô “bạn - mình”, thân thiện và thực chiến.
- Mỗi bài mở đầu bằng người phù hợp và năng lực đạt được; kết thúc bằng `## Bước tiếp theo`.
- Ưu tiên ví dụ nhỏ chạy được, checklist, lỗi thường gặp và cách tự kiểm tra.
- Dịch vụ trả phí phải có chi phí VND ước lượng cùng câu “giá có thể thay đổi, kiểm tra trang chủ”.
- Không bịa case study, số liệu, giá, API hay kết quả benchmark. Thông tin dễ thay đổi phải có ngày
  kiểm tra và liên kết nguồn chính thức.
- Mặc định chọn công cụ miễn phí/open source khi chất lượng đủ dùng; không quảng cáo trá hình.
- Bài học phải chỉ ra ranh giới trách nhiệm: dữ liệu nhạy cảm, quyền hạn, bảo mật và kiểm chứng.
- Một hạng mục lớn nên được hoàn thành trọn vẹn rồi dừng để người duy trì xem trước khi mở rộng.

## 5. Tiêu chí chấp nhận cho bài mới

Một bài được coi là hoàn thành khi:

1. Nằm đúng thư mục và có tên `NN-ten-khong-dau.md`.
2. Có tiêu đề H1, phần “Dành cho ai / học xong làm được gì”, ví dụ hoặc bài tập thực hành.
3. Có ít nhất một liên kết `Bước tiếp theo` hợp lý, không làm đứt đường đi chính.
4. Các lệnh có code block và giải thích ngay bên dưới; nội dung trả phí có giá VND ước lượng.
5. README của phần đã được cập nhật nếu thêm bài; link tương đối không bị thiếu.
6. `npm run docs:build` chạy thành công và kiểm tra link Markdown nội bộ không báo lỗi.

## 6. Ranh giới với đặc tả dự án thực hành

`spec.md` này mô tả **thư viện Học AI Việt**. Trong `09-du-an-thuc-hanh/du-an-*/`, mỗi dự án có
`spec.md`, `backlog.md`, `CLAUDE.md` và `huong-dan.md` riêng. Khi làm trong một dự án cụ thể,
đặc tả dự án đó bổ sung và ưu tiên hơn spec cấp gốc ở các quyết định về tính năng, dữ liệu và nghiệm thu.

## 7. Definition of done của toàn repo

Repo sẵn sàng cho một đợt public khi đường đi chính từ phần 00 đến capstone không có bài bị rớt,
các bài cốt lõi có ví dụ kiểm chứng được, ba case study có thật đã được duyệt, build/link check xanh,
và người mới có thể bắt đầu mà không cần đọc lịch sử commit hay hỏi người duy trì.

Các việc chưa đạt được ghi và theo dõi tại [`BACKLOG.md`](BACKLOG.md); không đánh dấu hoàn thành chỉ vì
đã viết xong bản nháp.

## 8. Tài liệu điều hành liên quan

- [`CONTEXT.md`](CONTEXT.md) — bối cảnh và quy tắc biên tập chi tiết.
- [`CLAUDE.md`](CLAUDE.md) — hướng dẫn cho Claude khi đọc và chỉnh sửa repo.
- [`BACKLOG.md`](BACKLOG.md) — trạng thái công việc liên tục.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — cách đóng góp và kiểm tra thay đổi.
