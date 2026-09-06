# Case Study: dự án thật build bằng AI

Đây là nơi cộng đồng Học AI Việt chia sẻ **sản phẩm thật đã build bằng AI** - không phải bài tập mẫu, mà là thứ bạn thực sự làm ra, kèm chi phí thật đã bỏ ra và bài học rút ra được. Đọc case study của người khác là một trong những cách học nhanh nhất - thấy được cả những chỗ vấp ngã mà không bài hướng dẫn lý thuyết nào nói tới.

## Các case study hiện có

Bốn case study đầu tiên đến từ người duy trì repo này, viết từ **sản phẩm đang chạy thật** chứ không phải dự án mẫu:

1. [TIDOGO (Print OS)](01-tidogo-print-os.md) - phần mềm quản lý sản xuất cho xưởng in. Build hơn 1 tháng với Claude Max 5x (2 tuần đầu mới ra được MVP). Bài học: chọn bài toán mình đã sống trong đó nhiều năm.
2. [StarteeX App](02-starteex-app.md) - app đặt in theo yêu cầu, lên cả hai chợ ứng dụng. Bài học: đặt AI vào đúng chỗ tắc nghẽn, và chi phí bắt buộc khi lên chợ.
3. [NEXA](03-nexa-agent.md) - agent biết gọi công cụ để tạo đơn thật, không phải chatbot trả lời suông. Bài học: agent chỉ hữu ích khi có hệ thống thật phía sau, và chi phí lớn nhất là tiền API vận hành.
4. [Mockup Studio](04-mockup-studio.md) - công cụ xử lý ảnh chạy ngay trong trình duyệt, gọi được qua CLI và MCP. Bài học: đẩy việc nặng về phía người dùng để chi phí vận hành gần bằng không.

Ba sản phẩm (2), (3), (4) cùng với hệ quản trị admin và web landing tạo thành **hệ sinh thái StarteeX**, build chung trong khoảng 2 tháng: ~1 tháng gói Claude Pro rồi ~1 tháng gói Claude Max 5x. Đây là chi phí AI dùng chung, không phải mỗi sản phẩm một gói riêng.

Một ví dụ ngắn nữa về tốc độ, cùng tác giả, chưa tách thành case study riêng vì bài học gói gọn trong một dòng: **redesign [startee.vn](https://startee.vn)** từ landing page cũ chỉ mất ~1 buổi với Claude Max 5x - "làm lại giao diện từ bản có sẵn" là loại việc AI làm rất nhanh.

Vài sản phẩm khác cùng tác giả chưa có case study đầy đủ: **Startee Outreach** (công cụ CRM và tự động hóa tiếp cận khách B2B), **MYTORY** (game nhập vai với nhân vật AI, dùng pgvector), và chính **[Học AI Việt](https://hocaiviet.com)** - thư viện bạn đang đọc.

> **Ba điểm chung đáng học từ cả nhóm case study trên.** Một là gần như toàn bộ hạ tầng (Vercel, GitHub, Supabase) chạy ở **bậc miễn phí** - khoản trả tiền chính là gói AI để build và tiền API cho chatbot tính theo dùng. Hai là nhiều dự án dùng **cả Claude lẫn Codex/ChatGPT Pro**, để hai AI phản biện chéo nhau và chia việc làm assets. Ba là **không có sản phẩm nào "xong rồi để đó"** - tất cả vẫn được thêm tính năng và fix bug đều, hiện làm bằng gói Max 5x.

## Còn bạn?

Nếu bạn đã đi qua lộ trình của repo này (hoặc tự học bằng cách khác) và build được một sản phẩm thật bằng AI, dù nhỏ tới đâu, chia sẻ lại theo hướng dẫn dưới đây.

## Cách chia sẻ case study của bạn

1. Tạo một file markdown mới trong thư mục `07-case-study/`, đặt tên theo mẫu `NN-ten-du-an.md` - **bắt đầu bằng số thứ tự** (ví dụ `05-shop-ban-hoa.md`), chữ thường, không dấu, cách nhau bằng dấu gạch ngang. Tên phải bắt đầu bằng số thì bài mới hiện ra trong menu bên trái của web.
2. Viết nội dung theo khung mẫu bên dưới.
3. Mở Pull Request theo hướng dẫn ở [CONTRIBUTING.md](../CONTRIBUTING.md).

## Khung mẫu (copy và điền vào)

```markdown
# [Tên dự án]

**Người chia sẻ:** [tên bạn hoặc bút danh] (liên hệ: [không bắt buộc - email/GitHub/mạng xã hội nếu muốn người khác hỏi thêm])
**Thời gian thực hiện:** [ví dụ: 3 tuần, làm ngoài giờ]
**Trình độ trước khi bắt đầu:** [ví dụ: chưa biết code / biết code cơ bản / dev có kinh nghiệm]

## Dự án làm gì?

[Mô tả ngắn gọn 2-4 câu: sản phẩm giải quyết vấn đề gì, cho ai]

## Công nghệ / stack đã dùng

[Ví dụ: HTML/CSS/JS thuần, Node.js + Express, PostgreSQL, deploy trên Railway,
gọi API Claude cho tính năng chatbot...]

## Chi phí thực tế (VND)

| Khoản | Chi phí | Ghi chú |
|---|---|---|
| [Ví dụ: Gói Claude Pro] | [X đồng/tháng] | |
| [Ví dụ: Domain] | [X đồng/năm] | |
| [Ví dụ: VPS/Hosting] | [X đồng/tháng] | |
| [Ví dụ: API calls] | [X đồng, ước tính Y lượt gọi] | |
| **Tổng chi phí tới lúc ra mắt** | **[X đồng]** | |

## Bài học rút ra

[Quan trọng nhất của case study - chia sẻ thật, kể cả những chỗ đã sai/vấp:
- Điều gì làm tốn thời gian hơn dự kiến?
- Có quyết định nào (công nghệ, cách làm) giờ nhìn lại thấy nên làm khác đi?
- Lời khuyên gì cho người sắp làm dự án tương tự?]

## Link demo / repo (nếu công khai được)

[Link, hoặc ghi "không công khai" nếu là dự án riêng tư/công ty]
```

## Vài gợi ý khi viết

- **Trung thực về chi phí và thời gian** - kể cả khi tốn nhiều hơn dự kiến, đó chính là thông tin hữu ích nhất cho người đọc sau.
- **Không cần dự án "hoàn hảo"** - một dự án nhỏ, chưa hoàn thiện, nhưng có bài học thật vẫn rất đáng chia sẻ.
- **Ẩn thông tin nhạy cảm** nếu dự án liên quan tới công ty/khách hàng thật - không cần tiết lộ tên công ty hay dữ liệu riêng tư nếu không phù hợp.

Cảm ơn bạn đã đóng góp cho phần thực chiến nhất của cả repo này.

## Bước tiếp theo

Đọc case study đầu tiên, về phần mềm quản lý sản xuất sinh ra từ chính bài toán của một xưởng in: [TIDOGO (Print OS)](01-tidogo-print-os.md)
