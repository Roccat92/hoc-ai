# NEXA: agent biết gọi công cụ, không phải chatbot trả lời suông

**Người chia sẻ:** Nguyễn Ngọc Thư - Startee / StarteeX (liên hệ: thunguyen@startee.vn)
**Thời gian thực hiện:** là một phần của hệ sinh thái StarteeX (xem tổng thời gian và chi phí AI ở [case study StarteeX App](02-starteex-app.md)); vẫn được update và fix bug đều, hiện làm bằng gói Max 5x
**Trình độ trước khi bắt đầu:** đã có sẵn hệ thống vận hành xưởng, cần một lớp trợ lý đứng trước khách

> NEXA đang chạy thật, là trợ lý của [StarteeX](02-starteex-app.md).

## Dự án làm gì?

NEXA là trợ lý AI của StarteeX. Khách nhắn tin hỏi giá, hỏi size, hỏi đơn tới đâu - NEXA trả lời trong vài giây, bất kể mấy giờ.

Điểm khác biệt so với một con chatbot thông thường: NEXA **làm được việc**, không chỉ trả lời. Nó tạo đơn, tra số liệu trong hệ thống, nhắc khách, chạy tác vụ. Nói cách khác nó là một [agent](../04-build-ung-dung-ai/03-ai-agent.md), không phải một hộp thoại hỏi đáp.

## Chatbot và agent khác nhau ở đâu

Đây là chỗ nhiều người mới nhầm, nên nói cho rõ bằng một ví dụ thật.

Khách nhắn: *"Tạo đơn in 50 áo cho FPT."*

- **Chatbot thường** sẽ trả lời đại ý "Bạn vui lòng liên hệ bộ phận kinh doanh để đặt đơn." Nó chỉ sinh ra chữ.
- **NEXA** gọi một hàm trong hệ thống, đại loại `createOrder("FPT", 50)`, rồi trả lời: *"Đã tạo đơn TDG-10241, hẹn giao thứ 6."* Đơn hàng đó **có thật trong hệ thống**.

Khả năng gọi hàm này gọi là **function calling** (gọi công cụ). Model tự quyết định cần gọi hàm nào với tham số gì, nhận kết quả trả về, rồi mới trả lời khách. Đó chính là vòng lặp nghĩ - gọi công cụ - nhận kết quả đã vẽ ở [bài AI Agent](../04-build-ung-dung-ai/03-ai-agent.md).

Nói theo khái niệm ở [bài harness](../02-code-voi-ai/07-harness-la-gi.md): phần làm nên NEXA không nằm ở model, mà nằm ở harness - bộ công cụ được đưa cho nó, quyền nó được làm gì, và trí nhớ nó được đọc.

## Việc khó nhất: một trí nhớ cho mọi kênh

Khách Việt Nam không nhắn tin ở một chỗ. Cùng một người có thể nhắn Zalo lúc 21:47 tối nay, rồi mở app hỏi tiếp lúc 9:02 sáng hôm sau, lần khác lại nhắn qua Facebook hoặc Instagram.

Nếu mỗi kênh là một con bot riêng thì khách phải kể lại từ đầu mỗi lần - đúng thứ làm khách bực nhất. NEXA được thiết kế để **nhận ra cùng một người qua các kênh khác nhau** và dùng chung một trí nhớ: đã đặt gì, size bao nhiêu, đơn đang ở đâu.

Về mặt kỹ thuật, phần khó không phải là gọi model, mà là **gộp danh tính khách qua nhiều kênh** và quyết định cái gì đáng nhớ, cái gì không.

## Công nghệ đã dùng

| Phần | Dùng gì |
|---|---|
| Model ngôn ngữ | LLM có hỗ trợ function calling |
| Lớp agent | TypeScript |
| Công cụ agent được gọi | Tạo đơn, tra cứu đơn, tra số liệu, nhắc khách |
| Hệ thống phía sau | Hệ vận hành xưởng, xem [TIDOGO](01-tidogo-print-os.md) |

Nếu bạn muốn tự làm thứ tương tự ở quy mô nhỏ, đọc theo thứ tự: [gọi API LLM](../04-build-ung-dung-ai/01-goi-api-llm.md) rồi [AI Agent](../04-build-ung-dung-ai/03-ai-agent.md).

## Chi phí thực tế (VND)

Khác với các case study kia, chi phí lớn nhất của NEXA **không phải tiền build mà là tiền vận hành**: mỗi tin nhắn khách gửi đều tốn một ít tiền gọi API. Đây là điểm cần tính kỹ với bất kỳ chatbot nào - build một lần nhưng trả tiền mãi theo lượng dùng.

| Khoản | Chi phí | Ghi chú |
|---|---|---|
| Gọi API LLM | phát sinh theo lượng tin nhắn thật | Tính theo token, xem [cách tính](../04-build-ung-dung-ai/01-goi-api-llm.md) |
| Hạ tầng chạy agent | 0đ | Supabase và Vercel bậc miễn phí |
| Gói AI để build | nằm trong gói AI chung của [hệ sinh thái StarteeX](02-starteex-app.md) | Không cộng riêng cho NEXA |

## Bài học rút ra

1. **Agent chỉ hữu ích khi có công cụ thật để gọi.** Nếu phía sau không có hệ thống tạo đơn, tra đơn được, thì gắn agent vào cũng chỉ ra một con bot nói chuyện lịch sự. Hệ vận hành có trước, agent đến sau.
2. **Trí nhớ là tính năng, không phải phụ kiện.** Thứ khiến khách thấy khác biệt không phải câu trả lời hay, mà là không phải kể lại từ đầu.
3. **Giới hạn quyền của agent ngay từ đầu.** Một agent tạo được đơn thật thì cũng có thể tạo nhầm đơn thật. Phải quyết định rõ việc gì nó tự làm, việc gì phải có người xác nhận - xem thêm [phần bảo mật](../10-bao-mat/01-checklist-truoc-khi-public.md).

*(Phần bài học sẽ được bổ sung thêm các tình huống agent trả lời sai và cách xử lý.)*

## Link

- Sản phẩm: [starteex.app](https://starteex.app)
- Mã nguồn: không công khai

## Bước tiếp theo

Case study cuối: công cụ web tự làm mockup, có thể gọi từ dòng lệnh và qua MCP: [Mockup Studio](04-mockup-studio.md)
