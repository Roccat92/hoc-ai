# Đọc hiểu code AI viết ra, hỏi lại AI khi không hiểu

Bài này dành cho người vừa build xong dự án đầu tiên ([bài trước](03-du-an-dau-tien.md)) và muốn học cách **nhìn vào một file code lạ mà không hoảng**. Học xong bạn sẽ có chiến lược đọc code ở mức đủ dùng — không cần thuộc cú pháp, không cần học lập trình bài bản — và biết cách hỏi AI để hiểu sâu hơn khi cần.

## Đọc theo cấu trúc lớn trước, đừng đọc từng ký tự

Với một file web như file `index.html` bạn vừa tạo, luôn có ba phần rõ rệt — nhận diện được ba phần này là đã hiểu 80% "bộ khung":

| Phần | Vai trò | Nhận diện bằng gì |
|---|---|---|
| **HTML** | Cái khung — có gì trên trang (nút, ô nhập, đoạn văn...) | Nằm giữa các cặp thẻ như `<div>...</div>`, `<button>...</button>` |
| **CSS** | Trang trí — màu sắc, khoảng cách, font chữ, bố cục | Nằm trong thẻ `<style>...</style>`, mỗi dòng dạng `thuộc-tính: giá-trị;` |
| **JavaScript** | Hành vi — chuyện gì xảy ra khi bạn bấm nút, gõ chữ... | Nằm trong thẻ `<script>...</script>`, có chữ `function`, dấu `{ }` |

Khi mở một file mới, việc đầu tiên không phải là đọc hiểu từng dòng, mà là **xác định ranh giới ba phần này** — biết được "à, đoạn này là trang trí, đoạn kia là xử lý logic" đã giúp bạn định vị được vấn đề nhanh hơn rất nhiều khi cần sửa gì đó.

## Nhận diện các khối quen thuộc trong JavaScript

Không cần hiểu cú pháp chính xác, chỉ cần nhận ra "hình dạng" của vài khối phổ biến:

**Hàm (function)** — một "khối hành động" có thể được gọi lại nhiều lần:
```javascript
function themCongViec() {
  // ... code xử lý việc thêm công việc mới
}
```
→ Đọc như: "đây là một hành động tên là 'thêm công việc', bên trong là các bước để làm việc đó."

**Sự kiện (event listener)** — "khi X xảy ra thì làm Y":
```javascript
button.addEventListener('click', themCongViec);
```
→ Đọc như: "khi cái nút này được bấm (`click`), thì chạy hành động `themCongViec`."

**Điều kiện (if)** — "nếu... thì...":
```javascript
if (danhSach.length === 0) {
  // hiển thị "chưa có việc nào"
}
```
→ Đọc như: "nếu danh sách trống thì làm việc trong ngoặc."

Bạn không cần nhớ cú pháp để viết ra — chỉ cần **nhận diện được hình dạng** để đọc hiểu ý nghĩa khi nhìn vào code AI viết.

## Cách hỏi AI để hiểu sâu hơn

Vài prompt hữu ích khi đọc một file code lạ (áp dụng lại với chính file to-do list bạn vừa tạo):

- **"Giải thích tổng quan file này đang làm gì, theo từng phần lớn (không cần đi vào từng dòng)."** — dùng khi mới mở một file lần đầu.
- **"Dòng số 15 đang làm gì? Vì sao cần dòng này?"** — dùng khi thấy một dòng cụ thể khó hiểu.
- **"Vẽ ra (bằng chữ, từng bước) chuyện gì xảy ra từ lúc tôi bấm nút Thêm cho tới khi việc mới hiện lên màn hình."** — hữu ích để hiểu "luồng chạy" (flow) của chương trình.
- **"Thêm comment tiếng Việt giải thích ngắn gọn cho từng hàm trong file này"** — yêu cầu AI tự chú thích code, giúp lần sau bạn tự đọc lại dễ hơn.

## Đọc thông báo lỗi mà không hoảng

Khi có lỗi, trình duyệt hoặc terminal sẽ hiện một dòng thông báo (error message) — trông đáng sợ với người mới, nhưng thực ra luôn chứa manh mối hữu ích:

1. **Tìm số dòng (line number)** trong thông báo lỗi — thường có dạng `line 23` hoặc `:23:` — đó là vị trí gần với nguồn gốc lỗi.
2. **Đọc phần mô tả** — dù bằng tiếng Anh, thường có từ khóa dễ đoán nghĩa, ví dụ `undefined` (chưa được định nghĩa/gán giá trị), `not a function` (không phải là một hàm — có thể gõ nhầm tên).
3. **Copy nguyên văn dòng lỗi, dán cho AI**, kèm câu hỏi: "Tôi gặp lỗi này khi [mô tả bạn đang làm gì], đây là lỗi: [dán lỗi]. Nguyên nhân là gì và sửa thế nào?"

**Xem lỗi trong trình duyệt:** bấm chuột phải trên trang → "Inspect" (hoặc "Kiểm tra") → tab "Console" — mọi lỗi JavaScript sẽ hiện ở đây bằng chữ đỏ.

## Không cần hiểu 100% mới được chấp nhận code

Mức độ hiểu cần thiết để tiếp tục an toàn: **bạn biết đại khái đoạn code này làm gì, vì sao nó cần thiết, và nó có ảnh hưởng gì tới phần còn lại của chương trình.** Không cần hiểu tới mức có thể tự viết lại từ đầu không cần AI — đó là mức hiểu của một lập trình viên chuyên nghiệp, không phải yêu cầu bắt buộc để bạn tự tin build sản phẩm.

## Bước tiếp theo

Sản phẩm đã chạy, đã hiểu được nó — giờ học cách lưu lại công sức của mình một cách an toàn: [Git, GitHub cơ bản](05-git-github-co-ban.md)
