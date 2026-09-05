# Cài đặt môi trường: VS Code, Git, Node, Python

Bài này dành cho người **chưa từng cài công cụ lập trình nào** trên máy. Học xong (làm theo từng bước) máy bạn sẽ sẵn sàng đầy đủ để bắt đầu code cùng AI ở các bài sau.

> **Về ảnh minh họa:** Giao diện các công cụ dưới đây thay đổi theo từng phiên bản, nên bài này mô tả từng bước bằng chữ thật chi tiết thay vì ảnh chụp màn hình (dễ lỗi thời). Nếu bạn có ảnh minh họa mới nhất muốn đóng góp, xem [CONTRIBUTING.md](../CONTRIBUTING.md). Trong lúc cài, nếu màn hình bạn thấy khác mô tả (do bản cập nhật mới), cứ chụp màn hình gửi cho chatbot AI hỏi "giờ tôi bấm gì tiếp" - cách này luôn hoạt động dù giao diện đổi thế nào.

## Bạn cần cài 4 thứ

1. **VS Code** - nơi bạn sẽ mở và xem code (dù Claude Code chạy trong terminal, VS Code vẫn hữu ích để xem/sửa file trực quan).
2. **Git** - công cụ lưu lịch sử thay đổi code, cần để dùng GitHub.
3. **Node.js** - cần để chạy nhiều loại dự án web/JavaScript, và cũng cần để cài Claude Code.
4. **Python** - cần cho các dự án liên quan tới AI/dữ liệu (RAG, agent...) ở phần sau repo.

Toàn bộ đều **miễn phí 100%**.

## Trước tiên: Terminal là gì, mở ở đâu?

Từ đây trở đi bạn sẽ thường xuyên nghe "mở terminal, gõ lệnh...". Đừng lo, phần này giải thích một lần cho rõ.

**Terminal** (còn gọi là "command line" - dòng lệnh) là một **cửa sổ để gõ lệnh bằng chữ ra lệnh trực tiếp cho máy tính**, thay vì bấm chuột vào các nút. Ví dụ thay vì bấm chuột tạo một thư mục mới, bạn gõ lệnh `mkdir ten-thu-muc`. Nhìn thì "hacker" nhưng thực ra rất đơn giản: gõ một dòng chữ, nhấn Enter, máy làm theo.

### Mở terminal ở đâu?

| Hệ điều hành | Cách mở |
|---|---|
| **Windows** | Bấm nút Start (hoặc phím Windows), gõ chữ **"PowerShell"**, nhấn Enter - một cửa sổ nền xanh/đen hiện ra, đó là terminal. (Gõ **"cmd"** cũng ra một terminal khác, xem mục dưới.) |
| **Mac** | Nhấn `Cmd + dấu cách` để mở Spotlight, gõ **"Terminal"**, nhấn Enter. |
| **Linux** | Thường nhấn `Ctrl + Alt + T`, hoặc tìm ứng dụng tên "Terminal". |

### PowerShell, cmd, Terminal - khác nhau gì, dùng cái nào?

Đây đều là các **loại terminal**, chỉ khác tên theo hệ điều hành:
- Trên **Windows** có hai loại phổ biến: **PowerShell** (hiện đại hơn, khuyên dùng) và **Command Prompt (cmd)** (cũ hơn). Windows 11 còn có sẵn "Windows Terminal" gộp cả hai.
- Trên **Mac/Linux**, terminal thường chỉ gọi chung là "Terminal".

**Dùng cái nào?** Với repo này, phần lớn lệnh (`git`, `npm`, `node`, `python`) chạy được ở cả PowerShell lẫn cmd lẫn Terminal Mac - không cần lo. Trên Windows, **khuyên dùng PowerShell** vì nó gần giống Mac/Linux hơn (nhiều lệnh dùng chung được). Một vài lệnh thao tác file có khác nhau đôi chút giữa Windows và Mac/Linux - khi nào có khác biệt đáng kể, bài viết sẽ ghi rõ.

### Vài lệnh cơ bản cần biết

Bạn không cần thuộc lòng, cứ tra lại khi cần:

| Lệnh | Viết tắt của | Làm gì |
|---|---|---|
| `cd ten-thu-muc` | **c**hange **d**irectory | Đi *vào* một thư mục (giống bấm đúp mở một folder) |
| `cd ..` | | Lùi *ra* thư mục cha (lên một cấp) |
| `ls` (Mac/Linux/PowerShell) hoặc `dir` (cmd) | **l**i**s**t | Liệt kê các file/thư mục đang có ở thư mục hiện tại |
| `mkdir ten-thu-muc` | **m**a**k**e **dir**ectory | Tạo một thư mục mới |
| `pwd` | **p**rint **w**orking **d**irectory | Hiện đường dẫn thư mục bạn đang đứng (đang ở đâu) |

> **"Đường dẫn" (path)** chỉ đơn giản là địa chỉ của một thư mục/file trên máy, ví dụ `C:\Users\Ban\Documents\du-an` (Windows) hay `/Users/ban/du-an` (Mac). Lệnh `cd` dùng để di chuyển giữa các đường dẫn này.

### Mẹo dùng terminal cho người mới

- **Copy lệnh từ bài viết rồi dán vào terminal**: bấm chuột phải trong cửa sổ terminal để dán (PowerShell/cmd), hoặc `Cmd + V` trên Mac. Sau đó nhấn **Enter** để chạy.
- **Gõ xong luôn nhấn Enter** thì máy mới thực hiện lệnh.
- **Thấy chữ đỏ / báo lỗi đừng hoảng** - đó là chuyện bình thường. Copy nguyên dòng lỗi, dán vào chatbot AI hỏi "lỗi này là gì, sửa sao" (đúng như [mẹo ở bài trước](03-dung-chatbot-de-hoc.md) - à mà bài đó ở ngay sau, cứ nhớ nguyên tắc này).
- **Terminal luôn đang "đứng" ở một thư mục nào đó.** Trước khi gõ lệnh liên quan tới một dự án, thường bạn cần `cd` vào đúng thư mục dự án đó trước.

Giờ thì bắt tay cài đặt.

## 1. Cài VS Code

1. Vào [code.visualstudio.com](https://code.visualstudio.com), bấm nút tải về lớn màu xanh (trang tự nhận diện hệ điều hành của bạn - Windows/Mac/Linux).
2. Mở file vừa tải, làm theo các bước cài đặt (cứ để mặc định, bấm "Next" liên tục là được - không cần tick thêm gì đặc biệt trừ khi bạn muốn, ví dụ tùy chọn "Add to PATH" nên để tick sẵn nếu có).
3. Cài xong, mở VS Code lên - thấy màn hình chào (Welcome) là thành công.

## 2. Cài Git

**Windows:**
1. Vào [git-scm.com/downloads](https://git-scm.com/downloads), tải bản Windows.
2. Mở file cài đặt, cứ bấm "Next" theo mặc định (các tùy chọn nâng cao không cần chỉnh khi mới bắt đầu).

**Mac:**
1. Mở Terminal (tìm trong Spotlight, gõ "Terminal").
2. Gõ lệnh:
```bash
git --version
```
- Nếu chưa có Git, macOS sẽ tự hiện hộp thoại đề nghị cài Xcode Command Line Tools (trong đó có Git) - bấm Install và chờ.

**Kiểm tra cài thành công (cả hai hệ điều hành):** mở terminal (Windows: gõ "cmd" hoặc "PowerShell" trong Start Menu rồi mở; Mac: mở Terminal), gõ:
```bash
git --version
```
- Nếu hiện ra dòng kiểu `git version 2.xx.x` - thành công.

**Cấu hình tên và email cho Git** (chỉ cần làm một lần):
```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email-cua-ban@gmail.com"
```
- Hai lệnh này gắn tên/email vào mọi commit bạn tạo sau này, để người khác biết ai đã sửa gì. Dùng email trùng với tài khoản GitHub của bạn nếu có.

## 3. Cài Node.js

1. Vào [nodejs.org](https://nodejs.org), tải bản **LTS** (Long Term Support - bản ổn định, khuyên dùng cho hầu hết mọi người, đừng chọn bản "Current" nếu bạn mới bắt đầu).
2. Mở file cài đặt, "Next" theo mặc định.

**Kiểm tra:** mở terminal mới (đóng terminal cũ, mở lại để nó nhận cài đặt mới), gõ:
```bash
node --version
npm --version
```
- Dòng đầu kiểm tra Node.js, dòng sau kiểm tra npm (công cụ quản lý thư viện đi kèm Node). Cả hai đều phải hiện ra số phiên bản (ví dụ `v22.x.x`), không phải thông báo lỗi "command not found".

## 4. Cài Python

1. Vào [python.org/downloads](https://python.org/downloads), tải bản mới nhất.
2. **Quan trọng với Windows:** ở màn hình cài đặt đầu tiên, **nhớ tick vào ô "Add python.exe to PATH"** ở cuối cửa sổ trước khi bấm Install - đây là lỗi phổ biến nhất khiến sau này gõ lệnh `python` không nhận.
3. Mac thường đã có sẵn Python, nhưng nên cài bản mới nhất từ python.org thay vì dùng bản có sẵn của hệ thống.

**Kiểm tra:** mở terminal mới, gõ:
```bash
python --version
```
- Nếu báo lỗi trên Windows, thử `py --version` thay thế (Windows đôi khi đăng ký lệnh dưới tên khác).

## Nếu có gì đó không chạy đúng như hướng dẫn

Đây là chuyện rất bình thường - mỗi máy mỗi khác. Cách xử lý nhanh nhất: **chụp màn hình thông báo lỗi, hoặc copy nguyên văn dòng chữ lỗi, dán vào chatbot AI (Claude/ChatGPT) và hỏi "tôi đang làm theo hướng dẫn cài [tên công cụ] trên [Windows/Mac], gặp lỗi này, giờ làm sao?"**. Đây chính là kỹ năng cốt lõi bạn sẽ dùng suốt hành trình học - không cần thuộc lòng cách sửa mọi lỗi, chỉ cần biết cách hỏi đúng.

**Một câu để nhớ:** gặp lỗi khi cài đặt là chuyện bình thường - kỹ năng thật là biết dán lỗi cho AI hỏi đúng cách, không phải nhớ cách sửa mọi lỗi.

## Bước tiếp theo

Môi trường đã sẵn sàng, giờ học cách khai thác chatbot AI hiệu quả nhất khi học: [Dùng chatbot để học](03-dung-chatbot-de-hoc.md)
