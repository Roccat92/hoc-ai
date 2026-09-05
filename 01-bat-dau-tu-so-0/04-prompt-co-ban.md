# Kỹ thuật prompt cơ bản: cụ thể, ví dụ, chia nhỏ, lặp

Bài này dành cho người muốn ngừng viết prompt kiểu "làm giúp tôi cái web bán hàng" rồi thất vọng vì kết quả không như ý. Học xong bạn sẽ có một khung tư duy áp dụng được cho cả việc hỏi kiến thức lẫn yêu cầu AI viết code - đây là kỹ năng nền tảng dùng xuyên suốt phần còn lại của repo.

## Bốn nguyên tắc cốt lõi

### 1. Cụ thể (Specific)

AI không đọc được suy nghĩ của bạn - nó chỉ có đúng những gì bạn gõ ra. Prompt càng mơ hồ, kết quả càng có khả năng lệch khỏi điều bạn thực sự muốn.

| Prompt mơ hồ | Prompt cụ thể |
|---|---|
| "Viết cho tôi cái form đăng nhập" | "Viết một form đăng nhập bằng HTML/CSS thuần, có 2 ô: email và mật khẩu, nút 'Đăng nhập' màu xanh, hiện thông báo lỗi màu đỏ nếu để trống ô nào" |
| "Giải thích RAG" | "Giải thích RAG cho người mới học, dùng ví dụ một chatbot hỏi đáp tài liệu công ty, khoảng 200 từ" |

Càng nêu rõ: **mục tiêu cuối cùng, bối cảnh, định dạng đầu ra mong muốn, ràng buộc (công nghệ phải dùng, độ dài...)** - kết quả càng sát ý bạn.

### 2. Cho ví dụ (Show, don't just tell)

Nếu bạn có hình dung cụ thể về kết quả mong muốn, **đưa luôn một ví dụ mẫu** thay vì chỉ mô tả bằng lời. Đây gọi là kỹ thuật "few-shot" (xem lại ở [từ điển thuật ngữ](../00-ban-do-gioi-ai/06-tu-dien-thuat-ngu.md)).

**Ví dụ:** thay vì "viết vài câu mô tả sản phẩm hấp dẫn", thử: "Viết mô tả sản phẩm theo phong cách như ví dụ này: 'Chiếc áo này không chỉ đẹp - nó khiến bạn tự tin bước ra đường mỗi sáng.' Giờ viết tương tự cho sản phẩm: nồi cơm điện thông minh."

### 3. Chia nhỏ (Break it down)

Nhiệm vụ càng lớn, càng nhiều khả năng AI hiểu sai một phần nào đó, và khi sai bạn khó tìm ra sai ở đâu. Chia một yêu cầu lớn thành các bước nhỏ, làm và kiểm tra từng bước - nguyên tắc này đã nhắc ở [`01-tu-duy-hoc-voi-ai.md`](01-tu-duy-hoc-voi-ai.md), áp dụng trực tiếp vào cách viết prompt:

- **Một lần yêu cầu quá lớn:** "Build cho tôi app quản lý chi tiêu cá nhân đầy đủ tính năng."
- **Chia nhỏ:** "Bước 1: tạo giao diện nhập một khoản chi tiêu (số tiền, danh mục, ngày)." → kiểm tra → "Bước 2: hiển thị danh sách các khoản đã nhập." → kiểm tra → tiếp tục.

### 4. Lặp và tinh chỉnh (Iterate)

Prompt đầu tiên hiếm khi hoàn hảo - và điều đó hoàn toàn bình thường. Khi kết quả chưa đúng ý, đừng viết lại từ đầu - **chỉ ra cụ thể cái gì chưa đúng** và yêu cầu sửa:

- "Gần đúng rồi, nhưng nút màu xanh dương quá đậm, đổi sang xanh nhạt hơn, và chữ trong nút nên là 'Gửi' thay vì 'Submit'."

Mỗi vòng lặp như vậy giúp AI hiểu ý bạn rõ hơn - coi việc trò chuyện qua lại là bình thường, không phải dấu hiệu bạn "hỏi dở".

## Cấu trúc một prompt tốt (khung tham khảo)

Không phải lúc nào cũng cần đủ 5 phần này, nhưng với yêu cầu phức tạp, đây là khung hữu ích:

1. **Vai trò** (không bắt buộc): "Bạn là một lập trình viên frontend giàu kinh nghiệm."
2. **Bối cảnh**: "Tôi đang xây một trang landing page cho quán cà phê nhỏ."
3. **Nhiệm vụ**: "Viết code HTML/CSS cho phần đầu trang (hero section) gồm tiêu đề, mô tả ngắn, nút 'Xem thực đơn'."
4. **Định dạng đầu ra**: "Trả về code đầy đủ trong một file HTML, có comment giải thích từng phần."
5. **Ràng buộc**: "Không dùng framework, chỉ HTML/CSS thuần, tương thích di động."

## Ví dụ prompt yêu cầu code - trước và sau

**Trước (mơ hồ):**
> "Làm cho tôi trang web bán hàng."

**Sau (áp dụng cả 4 nguyên tắc):**
> "Tôi muốn build một trang web bán hàng đơn giản cho shop quần áo online (dùng HTML/CSS/JavaScript thuần, chưa cần backend). Bắt đầu với: (1) một trang chủ có banner, lưới hiển thị 6 sản phẩm mẫu (ảnh, tên, giá), (2) mỗi sản phẩm có nút 'Thêm vào giỏ'. Style đơn giản, hiện đại, tông màu trắng-đen-be. Sau khi xong phần này, tôi sẽ nhờ bạn làm tiếp trang giỏ hàng."

Prompt thứ hai rõ ràng, chia nhỏ phạm vi (chỉ trang chủ trước), nêu rõ công nghệ và ràng buộc - kết quả sẽ sát mong đợi hơn rất nhiều.

## Một lỗi phổ biến: prompt quá dài nhưng vẫn mơ hồ

Dài không đồng nghĩa với cụ thể. Một prompt 500 từ liệt kê mọi tính năng mơ ước nhưng không có ví dụ, không có ràng buộc rõ ràng, vẫn sẽ ra kết quả mơ hồ. Ưu tiên **rõ ràng và có cấu trúc** hơn là dài.

Muốn đào sâu riêng cách dùng ChatGPT (chọn chế độ, Projects, phân tích dữ liệu, nghiên cứu có kiểm nguồn), có một nhóm bài riêng ở [phụ lục: ChatGPT](../phu-luc-cong-cu/chatgpt/01-bat-dau-va-chon-che-do.md) - không bắt buộc, đọc khi cần.

## Bước tiếp theo

Đã nắm kỹ thuật prompt cơ bản, giờ nắm mô hình web/API để biết mình đang giao AI xây cái gì: [File, web và server hoạt động thế nào →](10-file-web-va-server-hoat-dong-the-nao.md)
