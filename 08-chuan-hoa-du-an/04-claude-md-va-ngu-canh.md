# CLAUDE.md và ngữ cảnh dự án

Bài này dành cho người đã có [spec.md](02-viet-spec-md.md) và [backlog.md](03-backlog-md.md), muốn hoàn thiện nốt mảnh ghép thứ ba: file quy ước cho AI, và hiểu khi nào (hiếm khi) cần thêm công cụ giúp AI nhớ được nhiều hơn giữa các phiên. Học xong bạn sẽ có một file CLAUDE.md đầy đủ cho dự án, và biết chính xác lúc nào - nếu có - nên cân nhắc thêm công cụ nâng cao.

## CLAUDE.md là gì?

Đã giới thiệu sơ qua ở [phụ lục Claude Code](../phu-luc-cong-cu/claude-code/01-cai-dat-va-lenh-co-ban.md): `CLAUDE.md` là file đặt ở **gốc dự án**, ghi lại các **quy ước** mà bạn muốn Claude Code luôn tuân theo mỗi khi làm việc trong thư mục đó - không mô tả "làm cái gì" (đó là việc của spec.md), mà mô tả "**làm theo cách nào**".

Khác biệt với spec.md và backlog.md: hai file đó bạn đọc lại thủ công bằng cách nhắc AI ("đọc spec.md trước"), còn CLAUDE.md **Claude Code tự động đọc** mỗi khi khởi động trong thư mục dự án - không cần bạn nhắc.

### Nên ghi gì vào CLAUDE.md

```markdown
# [Tên dự án]

## Quy ước chung
- Ngôn ngữ giao tiếp: luôn trả lời và viết comment bằng tiếng Việt
- Code style: [ví dụ: dùng dấu chấm phẩy cuối dòng JS, indent 2 spaces...]

## Cấu trúc thư mục
- `src/components/` - các component giao diện dùng lại được
- `src/pages/` - mỗi file là một trang
- `src/api/` - các hàm gọi backend

## Điều cấm làm
- Không tự ý sửa file trong thư mục `data/mau/` (dữ liệu mẫu để test)
- Không cài thêm thư viện mới nếu chưa hỏi trước
- Không tự động chạy lệnh xóa database

## Lưu ý riêng của dự án
- [Bất kỳ điều gì đặc thù mà AI hay hiểu sai nếu không nhắc trước]
```

Bạn có thể tự viết tay, hoặc gõ `/init` trong Claude Code để nó tự quét dự án và đề xuất một bản CLAUDE.md ban đầu, rồi bạn chỉnh sửa lại.

## Bộ ba spec.md + backlog.md + CLAUDE.md: đủ cho 90% trường hợp

Ba file này cùng nhau giải quyết đúng ba câu hỏi khác nhau:

| File | Trả lời câu hỏi |
|---|---|
| `spec.md` | Đang build **cái gì**? |
| `backlog.md` | Build theo **thứ tự nào**, đang ở **đâu**? |
| `CLAUDE.md` | Build theo **cách nào** - quy ước, giới hạn? |

Với phần lớn dự án cá nhân, dự án nhỏ-vừa - kể cả khi kéo dài vài tuần, nhiều phiên làm việc - bộ ba này là **đủ**. Đừng vội tìm thêm công cụ phức tạp hơn nếu chưa thực sự cần.

## Công cụ giúp AI nắm cấu trúc dự án lớn

Với dự án **thật sự lớn** - hàng chục nghìn dòng code, nhiều tháng phát triển, nhiều quyết định kỹ thuật phát sinh dọc đường (đổi hướng thiết kế, lý do chọn thư viện này thay vì thư viện kia, bug từng gặp và cách đã fix) - đôi khi spec.md/backlog.md/CLAUDE.md tĩnh không đủ để AI "nhớ" hết mọi thứ đã xảy ra. Đây là lúc xuất hiện một nhóm công cụ dạng **bộ nhớ dài hạn (memory) / knowledge graph** cho AI, thường gắn vào Claude Code qua MCP server (xem lại khái niệm MCP ở [`04-build-ung-dung-ai/03-ai-agent.md`](../04-build-ung-dung-ai/03-ai-agent.md)).

> **Đây là mức NÂNG CAO.** Nếu bạn mới học tới đây, hoặc dự án của bạn chưa tới mức "hàng chục phiên làm việc, nhiều người/nhiều tháng" - **bỏ qua phần này**, quay lại dùng bộ ba spec.md + backlog.md + CLAUDE.md, đã đủ cho tuyệt đại đa số trường hợp. Đọc tiếp phần dưới chỉ để biết công cụ này tồn tại, phòng khi sau này thật sự cần.

### Graphiti (getzep/graphiti)

**Nó là gì:** [Graphiti](https://github.com/getzep/graphiti) là một framework mã nguồn mở xây dựng **knowledge graph theo thời gian** (temporal knowledge graph) - hiểu đơn giản: thay vì chỉ lưu văn bản như RAG thông thường ([xem lại RAG](../04-build-ung-dung-ai/02-rag-la-gi-va-build.md)), Graphiti lưu lại các **thực thể** (con người, tính năng, quyết định kỹ thuật...) và **quan hệ giữa chúng**, kèm **thời điểm** - giống một tấm bản đồ trí nhớ ghi rõ "cái gì liên quan tới cái gì, từ lúc nào, còn đúng tới lúc nào". Graphiti gắn vào Claude Code (và các công cụ AI khác) thông qua một **MCP server** đi kèm trong repo - Claude Code gọi các công cụ như "lưu lại điều này", "tìm lại thông tin liên quan tới X" ngay trong lúc làm việc.

**Vấn đề nó giải quyết:** dù đã có CLAUDE.md, spec.md, backlog.md, những chi tiết **phát sinh trong lúc code** (ví dụ: "tuần trước đã quyết định không dùng thư viện A vì lý do B", "bug này đã từng gặp ở module C, cách fix là D") không tự động được ghi lại ở đâu cả - nếu không có công cụ nhớ riêng, mỗi phiên mới AI vẫn có thể lặp lại đúng sai lầm cũ, hoặc quên mất một quyết định đã thống nhất từ lâu. Graphiti đóng vai trò "bộ nhớ dài hạn" ghi nhận các sự kiện này theo thời gian, để AI truy vấn lại khi cần - khác RAG tĩnh ở chỗ nó theo dõi được **sự thay đổi** (một quyết định cũ có thể bị một quyết định mới thay thế, và Graphiti biết giữ lại lịch sử thay vì chỉ ghi đè).

**Yêu cầu cài đặt:**

| Thành phần | Yêu cầu |
|---|---|
| Docker & Docker Compose | Bắt buộc - chạy server và database |
| Cơ sở dữ liệu đồ thị | FalkorDB (mặc định của MCP server, chạy kèm trong container, dựa trên Redis) hoặc Neo4j (khuyên dùng cho môi trường nghiêm túc hơn) |
| API key LLM riêng | Bắt buộc - Graphiti tự gọi một LLM để trích xuất thực thể/quan hệ từ mỗi đoạn thông tin được lưu. Mặc định dùng OpenAI, cũng hỗ trợ Anthropic, Google Gemini, Groq |
| Python 3.10+ | Nếu chạy trực tiếp không qua Docker |

**Về chi phí:** đây là khoản **phát sinh thêm**, tách biệt hoàn toàn khỏi gói Claude Code bạn đang trả (vì Graphiti gọi API LLM riêng của nó, không dùng chung hạn mức Claude Code) - tính theo token như đã học ở [`04-build-ung-dung-ai/01-goi-api-llm.md`](../04-build-ung-dung-ai/01-goi-api-llm.md). Với việc dùng cá nhân (một dự án, không quá nhiều thao tác lưu/truy vấn mỗi ngày), chi phí này thường ở mức thấp, nhưng sẽ tăng theo tần suất bạn lưu thông tin mới - kiểm tra giá API của hãng LLM bạn chọn (xem lại [`00-ban-do-gioi-ai/03-cac-cong-ty-va-model.md`](../00-ban-do-gioi-ai/03-cac-cong-ty-va-model.md)) để ước tính trước khi dùng thường xuyên. Ngoài ra còn chi phí hạ tầng chạy Docker (miễn phí nếu chạy trên máy cá nhân hoặc VPS bạn đã có sẵn - xem [`03-ha-tang-thuc-chien/01-thue-vps.md`](../03-ha-tang-thuc-chien/01-thue-vps.md)).

**Hướng dẫn cài đặt** (tóm tắt theo README chính chủ của repo tại thời điểm viết - cú pháp có thể đổi, **luôn xem bản mới nhất tại link ở cuối bài**):

**Bước 1 - Clone repo và vào thư mục MCP server:**
```bash
git clone https://github.com/getzep/graphiti.git
cd graphiti/mcp_server
```

**Bước 2 - Tạo file cấu hình từ mẫu:**
```bash
cp .env.example .env
```
Mở file `.env` vừa tạo, điền API key của LLM bạn muốn dùng, ví dụ:
```
OPENAI_API_KEY=your_key_here
```

**Bước 3 - Chạy server bằng Docker:**
```bash
# Dùng FalkorDB (mặc định, chạy kèm trong container, không cần cài riêng)
docker compose up

# Hoặc dùng Neo4j thay thế
docker compose -f docker/docker-compose-neo4j.yml up
```

Server MCP sẽ chạy tại `http://localhost:8000/mcp/` (kiểm tra còn sống bằng `http://localhost:8000/health`).

**Bước 4 - Thêm vào Claude Code:** dùng lệnh quản lý MCP đã học ở [`06-kho-tai-nguyen/03-skills-va-mcp.md`](../06-kho-tai-nguyen/03-skills-va-mcp.md):
```bash
claude mcp add
```
Làm theo hướng dẫn trên màn hình, trỏ tới địa chỉ server vừa chạy ở bước 3. Vì cú pháp `claude mcp add` và cách cấu hình transport (HTTP hay stdio) có thể thay đổi giữa các phiên bản Claude Code, cách chắc ăn nhất là hỏi thẳng Claude Code: "hướng dẫn tôi thêm MCP server Graphiti đang chạy ở localhost:8000 vào cấu hình hiện tại" - nó sẽ dùng đúng cú pháp của phiên bản bạn đang cài.

**Sau khi cài xong**, Claude Code có thêm các khả năng như: lưu lại một thông tin quan trọng vào bộ nhớ dài hạn (`add_memory`), tìm lại thông tin/quyết định đã lưu trước đó (`search_nodes`, `search_memory_facts`) - bạn có thể yêu cầu trực tiếp bằng lời, ví dụ "lưu lại quyết định này vào bộ nhớ dự án" hoặc "tra lại xem trước đây đã quyết định gì về việc chọn database".

**Link chính chủ để xem hướng dẫn mới nhất:**
- Repo: [github.com/getzep/graphiti](https://github.com/getzep/graphiti)
- Hướng dẫn cài MCP server chi tiết: trong thư mục `mcp_server/` của repo (file `README.md`)

### Có nên dùng ngay không?

Nhắc lại: **không, trừ khi bạn đã thấy rõ vấn đề cụ thể** - ví dụ dự án đã kéo dài nhiều tháng và bạn nhận ra AI liên tục lặp lại các quyết định/lỗi đã từng giải quyết trước đó, dù CLAUDE.md đã khá đầy đủ. Với phần lớn người học trong repo này, việc duy trì tốt spec.md + backlog.md + CLAUDE.md, cùng thói quen [bắt đầu mỗi phiên đúng cách](05-quy-trinh-1-phien-lam-viec.md), đã giải quyết được hầu hết vấn đề "AI quên ngữ cảnh" mà không cần thêm hạ tầng phức tạp này.

## Bước tiếp theo

Đã có đủ ba mảnh ghép (spec, backlog, CLAUDE.md), giờ ráp chúng lại thành một quy trình làm việc chuẩn cho mỗi phiên: [Quy trình 1 phiên làm việc](05-quy-trinh-1-phien-lam-viec.md)
