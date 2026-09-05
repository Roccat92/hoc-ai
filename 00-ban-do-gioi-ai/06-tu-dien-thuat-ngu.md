# Từ điển thuật ngữ A-Z

Bài này dành cho **bất kỳ ai** đọc tới đây mà gặp một từ lạ không hiểu - kể cả khi ai đó hỏi bạn "đây là code bằng React Native à?" và bạn không biết trả lời sao. Đây là trang bạn nên **bookmark lại** để tra cứu bất cứ lúc nào trong suốt quá trình học, không cần đọc hết một lần.

Từ điển chia làm hai phần: thuật ngữ AI/LLM, và thuật ngữ lập trình/công nghệ nói chung (vì khi build sản phẩm với AI, bạn sẽ liên tục gặp cả hai loại).

## Phần 1: Thuật ngữ AI / LLM

| Thuật ngữ | Giải thích ngắn gọn |
|---|---|
| **AI (Artificial Intelligence)** | Trí tuệ nhân tạo - khái niệm rộng nhất, xem [`01-ai-la-gi.md`](01-ai-la-gi.md) |
| **Agent (AI Agent)** | AI có khả năng tự lên kế hoạch, gọi công cụ (tool), thực hiện nhiều bước để hoàn thành một mục tiêu - không chỉ trả lời một câu hỏi. Xem [`04-build-ung-dung-ai/03-ai-agent.md`](../04-build-ung-dung-ai/03-ai-agent.md) |
| **API (Application Programming Interface)** | Cách một phần mềm "nói chuyện" với phần mềm khác qua các quy tắc định sẵn. Gọi API LLM = gửi yêu cầu qua internet để model xử lý và trả kết quả |
| **Context window** | Số token tối đa AI "nhìn thấy" cùng lúc trong một lần xử lý - xem [`02-llm-la-gi.md`](02-llm-la-gi.md) |
| **Deep Learning (Học sâu)** | Nhánh Machine Learning dùng mạng neural nhiều lớp - xem [`01-ai-la-gi.md`](01-ai-la-gi.md) |
| **Embedding** | Cách biểu diễn văn bản (hoặc ảnh, âm thanh) thành một dãy số (vector) sao cho những thứ có ý nghĩa gần nhau thì dãy số cũng "gần" nhau - nền tảng để máy "hiểu" và tìm kiếm theo ý nghĩa, không chỉ theo từ khóa |
| **Fine-tune** | Huấn luyện tiếp một model đã có sẵn trên một tập dữ liệu nhỏ, chuyên biệt, để nó làm tốt hơn một việc cụ thể - xem [`05-train-va-finetune/`](../05-train-va-finetune/) |
| **GenAI (Generative AI)** | AI tạo sinh - tạo nội dung mới (văn bản, ảnh, nhạc...) - xem [`01-ai-la-gi.md`](01-ai-la-gi.md) |
| **Hallucination (Ảo giác)** | Khi AI tạo ra thông tin sai nhưng trình bày rất tự tin, trôi chảy - xem [`02-llm-la-gi.md`](02-llm-la-gi.md) |
| **Harness** | Lớp chương trình bao quanh model để biến khả năng "đoán chữ tiếp theo" thành công cụ làm được việc: vòng lặp, công cụ, quyền, ngữ cảnh. Cùng một model, đổi harness thì ra sản phẩm khác hẳn - xem [`02-code-voi-ai/07-harness-la-gi.md`](../02-code-voi-ai/07-harness-la-gi.md) |
| **Inference** | Quá trình model đã huấn luyện xong được dùng để tạo ra câu trả lời (khác với "training" - quá trình huấn luyện ra model). Mỗi lần bạn hỏi AI một câu là một lần "inference" |
| **LLM (Large Language Model)** | Mô hình ngôn ngữ lớn - nền tảng của Claude, ChatGPT, Gemini - xem [`02-llm-la-gi.md`](02-llm-la-gi.md) |
| **MCP (Model Context Protocol)** | Một chuẩn giao tiếp mở (do Anthropic khởi xướng) cho phép AI kết nối với công cụ/dữ liệu bên ngoài (file, database, ứng dụng khác) theo cách chuẩn hóa, thay vì mỗi nơi làm một kiểu riêng |
| **Multimodal (Đa phương thức)** | Model có thể xử lý nhiều loại dữ liệu cùng lúc - không chỉ văn bản mà cả ảnh, âm thanh, video |
| **Machine Learning (ML)** | Máy học - máy tự tìm quy luật từ dữ liệu thay vì làm theo luật cứng do người viết - xem [`01-ai-la-gi.md`](01-ai-la-gi.md) |
| **Open-weight** | Model mà hãng công khai file "trọng số" cho tải về, tự chạy - thường bị gọi nhầm là "open source" - xem [`04-open-source-vs-closed.md`](04-open-source-vs-closed.md) |
| **Parameter (Tham số)** | Các con số bên trong model được điều chỉnh trong quá trình huấn luyện - model càng nhiều tham số thường càng "biết nhiều" nhưng cũng cần nhiều tài nguyên hơn để chạy |
| **Pre-train** | Giai đoạn huấn luyện ban đầu của model trên lượng dữ liệu khổng lồ, trước khi fine-tune chuyên biệt |
| **Prompt** | Câu lệnh/yêu cầu bạn đưa cho AI |
| **Prompt engineering** | Kỹ thuật viết prompt sao cho AI hiểu đúng ý, trả lời đúng cái bạn cần - xem [`01-bat-dau-tu-so-0/04-prompt-co-ban.md`](../01-bat-dau-tu-so-0/04-prompt-co-ban.md) |
| **RAG (Retrieval-Augmented Generation)** | Kỹ thuật cho AI "tra cứu" tài liệu thật trước khi trả lời, thay vì chỉ dựa vào trí nhớ đã huấn luyện - giảm hallucination, cho AI biết thông tin riêng/mới. Xem [`04-build-ung-dung-ai/02-rag-la-gi-va-build.md`](../04-build-ung-dung-ai/02-rag-la-gi-va-build.md) |
| **System prompt** | Chỉ dẫn "nền" được đặt trước cuộc trò chuyện, định hướng cách AI cư xử xuyên suốt (ví dụ: "Bạn là trợ lý viết code, luôn trả lời bằng tiếng Việt") |
| **Temperature** | Tham số điều chỉnh độ "ngẫu nhiên/sáng tạo" khi AI chọn từ tiếp theo - xem [`02-llm-la-gi.md`](02-llm-la-gi.md) |
| **Token** | Đơn vị nhỏ nhất LLM xử lý (một phần từ, một từ, hoặc dấu câu) - xem [`02-llm-la-gi.md`](02-llm-la-gi.md) |
| **Tool use / Function calling** | Khả năng AI tự quyết định gọi một công cụ bên ngoài (tìm kiếm web, chạy code, đọc file...) trong lúc trả lời, thay vì chỉ tạo văn bản thuần |
| **Transformer** | Kiến trúc mạng neural là nền tảng của hầu hết LLM hiện đại, ra đời từ một bài báo năm 2017 ("Attention Is All You Need") |
| **Vector database** | Cơ sở dữ liệu chuyên lưu và tìm kiếm embedding - thành phần cốt lõi khi build hệ thống RAG |
| **Zero-shot / Few-shot** | Zero-shot: yêu cầu AI làm việc mà không cho ví dụ mẫu. Few-shot: cho vài ví dụ mẫu trong prompt để AI bắt chước theo |

## Phần 2: Thuật ngữ lập trình & công nghệ nói chung

| Thuật ngữ | Giải thích ngắn gọn |
|---|---|
| **API** | Xem phần 1 - không riêng gì AI, mọi phần mềm có API |
| **Backend** | Phần "hậu trường" của phần mềm - xử lý logic, dữ liệu, không phải phần bạn nhìn thấy trên màn hình |
| **Branch (nhánh)** | Một "bản sao song song" của code trong Git, để bạn sửa thứ gì đó mà không ảnh hưởng bản chính - xem [`02-code-voi-ai/05-git-github-co-ban.md`](../02-code-voi-ai/05-git-github-co-ban.md) |
| **CI/CD** | Continuous Integration/Continuous Deployment - quy trình tự động kiểm tra và triển khai code mỗi khi có thay đổi |
| **cd (lệnh)** | "change directory" - lệnh terminal để đi vào một thư mục; `cd ..` để lùi ra thư mục cha. Xem [`01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md`](../01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md) |
| **CLI (Command Line Interface)** | Giao diện dòng lệnh - gõ lệnh chữ thay vì bấm chuột vào nút. Claude Code là một công cụ CLI |
| **Clone** | Tải một repo về máy mình từ GitHub |
| **Commit** | Một "điểm lưu" trong Git, ghi lại một cụm thay đổi cụ thể kèm mô tả |
| **Database (Cơ sở dữ liệu)** | Nơi lưu trữ dữ liệu có tổ chức để phần mềm đọc/ghi - ví dụ: danh sách người dùng, đơn hàng |
| **Deploy / Deployment (Triển khai)** | Đưa sản phẩm bạn đang code lên internet để người khác dùng được, thay vì chỉ chạy trên máy riêng |
| **Docker / Container** | Công nghệ "đóng gói" một ứng dụng cùng mọi thứ nó cần để chạy, giúp chạy giống hệt nhau trên mọi máy |
| **Domain (Tên miền)** | Địa chỉ web dễ nhớ (ví dụ: hocaiviet.com) thay vì dãy số IP |
| **Endpoint** | Một "địa chỉ" cụ thể trong API mà bạn gửi yêu cầu tới, ví dụ `/api/users` |
| **Environment variable (biến môi trường)** | Giá trị cấu hình (như API key, mật khẩu) được lưu riêng ngoài code, không hard-code trực tiếp vào file - thường lưu trong file `.env` |
| **Framework** | Một "bộ khung" có sẵn giúp bạn xây dựng phần mềm nhanh hơn, theo một cấu trúc quy định sẵn, thay vì viết mọi thứ từ đầu. Ví dụ: React (framework/library cho frontend), Next.js (framework cho web full-stack) |
| **Frontend** | Phần giao diện người dùng nhìn thấy và tương tác trực tiếp trên màn hình |
| **Full-stack** | Làm được cả frontend lẫn backend |
| **Fork** | Tạo một bản sao riêng của một repo GitHub về tài khoản của bạn, để chỉnh sửa độc lập |
| **Git** | Công cụ quản lý phiên bản code - ghi lại lịch sử thay đổi, cho phép nhiều người cùng làm việc không đè lên nhau. Xem [`02-code-voi-ai/05-git-github-co-ban.md`](../02-code-voi-ai/05-git-github-co-ban.md) |
| **GitHub** | Nền tảng lưu trữ repo Git trên mạng, phổ biến nhất hiện nay, kèm tính năng cộng tác (Pull Request, Issue) |
| **Hosting** | Dịch vụ "cho thuê chỗ" để đặt website/ứng dụng của bạn lên internet |
| **IDE (Integrated Development Environment)** | Phần mềm soạn code có tích hợp nhiều công cụ hỗ trợ (VS Code, Cursor...) |
| **JSON** | Một định dạng văn bản phổ biến để lưu và trao đổi dữ liệu có cấu trúc, dễ đọc cho cả người và máy |
| **Localhost** | Địa chỉ web trỏ về chính máy bạn đang dùng - dùng để test ứng dụng trước khi deploy lên internet thật |
| **Native app** | Ứng dụng được viết riêng cho một hệ điều hành cụ thể (ví dụ: viết riêng cho iOS, riêng cho Android) để tận dụng tối đa hiệu năng máy |
| **Node.js** | Môi trường cho phép chạy JavaScript ở phía backend/máy chủ (JavaScript vốn sinh ra để chạy trên trình duyệt) |
| **npm / pip** | Công cụ quản lý "gói thư viện" (package) - npm cho JavaScript, pip cho Python. Giúp cài đặt code người khác viết sẵn thay vì tự viết lại |
| **Open source (Mã nguồn mở)** | Phần mềm công khai toàn bộ code, ai cũng xem/sửa/dùng lại được (thường kèm giấy phép cụ thể như MIT) |
| **Package / Dependency** | Một thư viện code người khác viết sẵn mà dự án của bạn "phụ thuộc" vào để hoạt động |
| **PowerShell / cmd** | Hai loại terminal (cửa sổ dòng lệnh) trên Windows - PowerShell hiện đại hơn, khuyên dùng; cmd (Command Prompt) cũ hơn. Trên Mac/Linux tương đương là "Terminal". Xem [`01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md`](../01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md) |
| **Production vs Development** | Development (dev): môi trường bạn đang code, thử nghiệm. Production (prod): môi trường thật, người dùng thật đang dùng |
| **Pull Request (PR)** | Yêu cầu gộp thay đổi code của bạn vào repo chính, để người khác review trước khi chấp nhận |
| **React** | Một thư viện JavaScript rất phổ biến để xây giao diện web, do Meta phát triển |
| **React Native** | Framework (dựa trên React) để viết **ứng dụng di động** (iOS + Android) bằng JavaScript, dùng chung phần lớn code cho cả hai hệ điều hành - khác với web thông thường (chạy trên trình duyệt) hay native app viết riêng biệt cho từng hệ điều hành. Nếu ai hỏi "cái này code bằng React Native à?" - họ đang hỏi bạn có phải đang làm app di động bằng công nghệ này không; nếu dự án của bạn là **web** (chạy trên trình duyệt) thì câu trả lời là "không, đây là web" |
| **Repo (Repository)** | Một "kho" chứa toàn bộ code và lịch sử thay đổi của một dự án |
| **SaaS (Software as a Service)** | Mô hình phần mềm cho thuê qua internet, trả phí theo tháng/năm, không cần cài đặt (ví dụ: Netflix, Notion) |
| **SDK (Software Development Kit)** | Bộ công cụ (thường gồm thư viện code + tài liệu) giúp lập trình viên tích hợp với một nền tảng/dịch vụ cụ thể dễ dàng hơn |
| **Server** | Máy tính (thường ở xa, chạy 24/7) xử lý yêu cầu và phục vụ dữ liệu cho người dùng |
| **SQL / NoSQL** | Hai kiểu cơ sở dữ liệu: SQL có cấu trúc bảng cố định chặt chẽ (ví dụ: PostgreSQL, MySQL), NoSQL linh hoạt hơn về cấu trúc (ví dụ: MongoDB) |
| **Tech stack** | Tập hợp các công nghệ/công cụ được dùng để xây một sản phẩm cụ thể (ví dụ: "stack" gồm React + Node.js + PostgreSQL) |
| **Terminal / Command line** | Cửa sổ để gõ lệnh chữ điều khiển máy tính trực tiếp, thay vì bấm chuột - cách mở và các lệnh cơ bản xem [`01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md`](../01-bat-dau-tu-so-0/02-cai-dat-moi-truong.md) |
| **TypeScript** | Phiên bản mở rộng của JavaScript, thêm kiểm tra kiểu dữ liệu (type) giúp phát hiện lỗi sớm hơn khi code |
| **VPS (Virtual Private Server)** | Một "máy chủ ảo" bạn thuê để tự cài đặt, vận hành ứng dụng của mình - xem [`03-ha-tang-thuc-chien/01-thue-vps.md`](../03-ha-tang-thuc-chien/01-thue-vps.md) |
| **Web app vs Mobile app** | Web app: chạy qua trình duyệt, không cần cài đặt. Mobile app: cài trực tiếp trên điện thoại (native hoặc qua React Native/Flutter) |

## Mẹo dùng từ điển này

Khi bạn gặp một từ lạ ở bất kỳ đâu trong repo (hoặc ngoài đời), quay lại trang này tra trước. Nếu không có, **hỏi thẳng chatbot AI bạn đang dùng** - "giải thích [từ này] cho người mới, dùng ví dụ đơn giản" luôn là một prompt tốt để học nhanh (xem kỹ hơn ở [`01-bat-dau-tu-so-0/03-dung-chatbot-de-hoc.md`](../01-bat-dau-tu-so-0/03-dung-chatbot-de-hoc.md)).

## Bước tiếp theo

Đã có bức tranh toàn cảnh và vốn từ vựng cơ bản, giờ là lúc bắt tay vào học thật: [Bắt đầu từ số 0 →](../01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai.md)
