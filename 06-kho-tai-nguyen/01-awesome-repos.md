# Repo GitHub đáng học, chia theo chủ đề

Bài này dành cho người đã đi hết lộ trình chính của repo và muốn tiếp tục tự học sâu hơn bằng cách đọc code thật từ các dự án mã nguồn mở uy tín. Đây là danh sách khởi điểm, không đầy đủ — cộng đồng có thể bổ sung qua Pull Request (xem [CONTRIBUTING.md](../CONTRIBUTING.md)).

> Tên tổ chức/repo trên GitHub có thể đổi theo thời gian (đổi tên, chuyển chủ sở hữu). Nếu link không còn đúng, tìm lại trực tiếp trên GitHub bằng tên repo.

## Học nền tảng / hiểu cơ chế AI

- **karpathy/nanoGPT** — cài đặt lại kiến trúc GPT ở mức đơn giản, dễ đọc, để hiểu LLM hoạt động từ bên trong (xem thêm ở [`05-train-va-finetune/04-build-llm-tu-dau.md`](../05-train-va-finetune/04-build-llm-tu-dau.md)).
- **karpathy/llm.c** — huấn luyện LLM chỉ bằng C thuần, không phụ thuộc framework lớn — thú vị để thấy "bên dưới lớp vỏ" của deep learning trông ra sao.

## Công cụ AI code

- **ollama/ollama** — công cụ chạy LLM mở trên máy cá nhân (đã dùng ở [`03-ha-tang-thuc-chien/05-chay-llm-tren-may-minh.md`](../03-ha-tang-thuc-chien/05-chay-llm-tren-may-minh.md)).
- **ggml-org/llama.cpp** — công cụ chạy inference LLM hiệu quả trên phần cứng phổ thông (CPU lẫn GPU), nền tảng phía sau nhiều công cụ chạy model local khác.

## RAG, LLM framework

- **langchain-ai/langchain** — framework phổ biến để xây ứng dụng LLM (RAG, agent, chuỗi xử lý phức tạp) — xem lại [`04-build-ung-dung-ai/02-rag-la-gi-va-build.md`](../04-build-ung-dung-ai/02-rag-la-gi-va-build.md).
- **run-llama/llama_index** (LlamaIndex) — framework tập trung mạnh vào RAG, kết nối dữ liệu riêng với LLM.
- **chroma-core/chroma** — vector database nhẹ, dễ chạy local, phù hợp cho người mới thử nghiệm RAG.

## AI Agent

- **microsoft/autogen** — framework xây dựng hệ thống nhiều AI agent phối hợp với nhau.
- **modelcontextprotocol/servers** — kho các MCP server chính thức và cộng đồng — xem thêm ở [`03-skills-va-mcp.md`](03-skills-va-mcp.md).

## Fine-tune

- **unslothai/unsloth** — công cụ fine-tune LoRA tối ưu tốc độ/bộ nhớ, có notebook mẫu dễ chạy (xem lại [`05-train-va-finetune/02-fine-tune-thuc-hanh.md`](../05-train-va-finetune/02-fine-tune-thuc-hanh.md)).
- **huggingface/peft** — thư viện chính thức của Hugging Face cho các kỹ thuật fine-tune hiệu quả tham số (bao gồm LoRA).

## Tự động hóa

- **n8n-io/n8n** — công cụ tự động hóa workflow kéo-thả, tự host được (đã dùng ở [`04-build-ung-dung-ai/05-n8n-automation.md`](../04-build-ung-dung-ai/05-n8n-automation.md)).

## SDK chính thức của các hãng AI

- **anthropics/anthropic-sdk-python** / **anthropics/anthropic-sdk-typescript** — SDK chính thức để gọi API Claude bằng Python/TypeScript.
- **openai/openai-python** — SDK chính thức gọi API OpenAI.

## Tìm thêm: các danh sách "awesome"

Trên GitHub có cả một dạng repo riêng gọi là **"awesome list"** — các repo chỉ chứa danh sách link được tuyển chọn theo chủ đề (không chứa code), ví dụ tìm kiếm "awesome LLM", "awesome RAG", "awesome MCP servers", "awesome prompt engineering" trực tiếp trên GitHub sẽ ra nhiều danh sách được cộng đồng cập nhật liên tục — thường đầy đủ và mới hơn bất kỳ danh sách tĩnh nào (kể cả bài viết này).

## Bước tiếp theo

Muốn học bài bản hơn thay vì chỉ đọc code, xem danh sách khóa học miễn phí chất lượng: [Khóa học miễn phí](02-khoa-hoc-mien-phi.md)
