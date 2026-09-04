# Cursor, Windsurf, Copilot — so sánh các AI IDE, chọn cái nào?

Bài này dành cho người đã biết dùng Claude Code ([bài trước](01-claude-code.md)) và tò mò về các công cụ khác hay được nhắc tới: Cursor, Windsurf, GitHub Copilot. Học xong bạn sẽ hiểu chúng khác Claude Code ở đâu, và không cần phân vân "phải chọn một cái duy nhất" — vì thực tế nhiều người dùng kết hợp.

## AI IDE là gì, khác Claude Code (CLI) thế nào?

**Claude Code** là công cụ dòng lệnh (CLI) — bạn gõ yêu cầu trong terminal, nó tự đọc/sửa file. **AI IDE** là một trình soạn code có **giao diện trực quan** (giống VS Code) với AI được nhúng sẵn ngay trong giao diện đó — bạn thấy code, thấy con trỏ gợi ý ngay khi đang gõ, có khung chat AI ở bên cạnh màn hình.

Cả hai loại đều dùng được để "code với AI" — khác nhau chủ yếu ở **trải nghiệm sử dụng**: CLI thiên về mô tả yêu cầu rồi để AI tự làm nhiều bước liên tục (agentic), IDE thiên về vừa gõ code vừa được AI gợi ý/tự động hoàn thành theo thời gian thực.

## Cursor

Một trình soạn code được xây trên nền VS Code (nên gần như mọi extension, giao diện, phím tắt của VS Code đều dùng được), tích hợp sâu AI vào mọi thao tác: autocomplete thông minh khi gõ, khung chat để hỏi/yêu cầu sửa code, và chế độ "agent" cho AI tự làm nhiều bước giống Claude Code. Là một trong những AI IDE phổ biến nhất trong cộng đồng dev hiện nay.

## Windsurf

Tương tự Cursor về concept (cũng fork từ VS Code, tích hợp AI sâu), của công ty Codeium, có tính năng "Cascade" cho phép AI làm việc theo chuỗi nhiều bước tự động. Trải nghiệm và giao diện khá gần với Cursor — nhiều người chọn dựa trên cảm giác dùng thử cá nhân hơn là khác biệt lớn về tính năng.

## GitHub Copilot

Khác với Cursor/Windsurf (là một trình soạn code riêng biệt), GitHub Copilot là một **extension (tiện ích mở rộng) cài thêm vào VS Code có sẵn** (hoặc các IDE khác như JetBrains, Neovim) — không cần đổi hẳn sang trình soạn code mới. Của GitHub (thuộc Microsoft), là công cụ AI code lâu đời và phổ biến nhất về số lượng người dùng, một phần nhờ có **gói miễn phí cho sinh viên/tài khoản GitHub đủ điều kiện**.

## Bảng so sánh nhanh

| Công cụ | Dạng | Cần cài gì | Điểm đáng chú ý |
|---|---|---|---|
| **Claude Code** | CLI (dòng lệnh) | Cài qua npm | Mạnh về agentic — tự làm nhiều bước phức tạp qua mô tả ngôn ngữ tự nhiên |
| **Cursor** | IDE riêng (fork VS Code) | Tải cài như một app | Tích hợp AI sâu vào mọi thao tác, autocomplete mạnh |
| **Windsurf** | IDE riêng (fork VS Code) | Tải cài như một app | Tương tự Cursor, tính năng Cascade cho chuỗi tác vụ tự động |
| **GitHub Copilot** | Extension cho VS Code/IDE khác | Cài extension trong VS Code đã có | Không cần đổi trình soạn code, có gói miễn phí cho sinh viên |

## Về giá

Cả bốn công cụ đều có **bản miễn phí hoặc dùng thử** ở mức độ khác nhau, và **gói trả phí** cho nhu cầu dùng nhiều hơn. Vì các công ty này thường xuyên đổi cấu trúc gói (thêm/bớt tính năng, đổi giá), **đừng tin vào con số cố định** — kiểm tra trực tiếp trang chủ từng công cụ để có giá mới nhất:
- Cursor: cursor.com
- Windsurf: windsurf.com
- GitHub Copilot: github.com/features/copilot

**Mẹo tiết kiệm:** nếu bạn là sinh viên, kiểm tra chương trình ưu đãi giáo dục (GitHub Student Pack và tương tự) — nhiều công cụ AI code có gói miễn phí hoặc giảm giá đáng kể cho sinh viên có email trường (.edu hoặc tương đương được xác thực).

## Vậy nên chọn cái nào?

Không cần chọn phe. Gợi ý thực tế:

- **Nếu bạn đã quen Claude Code từ bài trước:** cứ tiếp tục dùng nó làm công cụ chính cho phần còn lại của repo — mọi hướng dẫn thực hành ở đây đều dựa trên Claude Code.
- **Nếu bạn thích trải nghiệm trực quan hơn, muốn thấy gợi ý code ngay khi gõ:** thử cài thêm Cursor hoặc Windsurf song song — không xung đột gì với việc dùng Claude Code.
- **Nếu bạn đã quen VS Code và không muốn đổi công cụ:** cài thêm GitHub Copilot như một extension là lựa chọn ít xáo trộn nhất.

Nhiều lập trình viên thực tế dùng **kết hợp** — ví dụ gõ code hàng ngày với Cursor, nhưng bật Claude Code cho những tác vụ lớn cần AI tự làm nhiều bước liên tục.

## Bước tiếp theo

Đã có công cụ trong tay, giờ bắt tay vào làm thật: [Build dự án đầu tiên](03-du-an-dau-tien.md)
