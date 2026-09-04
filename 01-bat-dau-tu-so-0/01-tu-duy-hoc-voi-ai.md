# Học "vibe coding" đúng cách: hiểu để sửa, không copy mù

Bài này dành cho **bất kỳ ai chuẩn bị học code với AI** — kể cả khi bạn chưa cài bất kỳ công cụ nào. Đây là bài quan trọng nhất trong cả repo, vì nó quyết định bạn sẽ học được thật sự hay chỉ dừng lại ở mức "may mắn ra sản phẩm nhưng không hiểu gì". Đọc xong bạn sẽ có một tư duy đúng để bắt đầu, tránh những cái bẫy phổ biến nhất của người mới học với AI.

## "Vibe coding" là gì?

"Vibe coding" là thuật ngữ (do Andrej Karpathy, một trong những người tiên phong về deep learning, đặt ra năm 2025) mô tả cách lập trình mới: **bạn mô tả ý tưởng bằng ngôn ngữ tự nhiên, AI viết code**, thay vì bạn tự gõ từng dòng cú pháp. Đây chính xác là cách repo này dạy bạn build sản phẩm — và tin tốt là: **bạn hoàn toàn có thể build được sản phẩm thật theo cách này, kể cả khi chưa từng học lập trình bài bản.**

Nhưng "vibe coding" có hai kiểu người làm, kết quả rất khác nhau:

- **Kiểu sai:** copy prompt, nhận code, paste vào, chạy, không hiểu code làm gì, thấy chạy được thì thôi — tới khi có lỗi thì hoàn toàn bó tay, không biết bắt đầu sửa từ đâu.
- **Kiểu đúng:** mô tả ý tưởng cho AI viết code, nhưng **luôn hỏi lại để hiểu code đang làm gì**, kiểm tra kỹ trước khi chấp nhận, làm từng bước nhỏ, và dần dần tích lũy đủ hiểu biết để tự sửa những lỗi đơn giản, tự đánh giá được AI làm đúng hay sai.

Repo này dạy bạn theo **kiểu đúng**. Không phải vì "kiểu sai" không ra được sản phẩm — mà vì nó sẽ khiến bạn bế tắc ngay khi gặp vấn đề đầu tiên nằm ngoài khả năng AI tự sửa được, và khiến bạn phụ thuộc hoàn toàn, không bao giờ tự tin lên được.

## Vì sao "hiểu để sửa" quan trọng hơn "code đúng ngay từ đầu"

Sự thật ít ai nói thẳng: **AI viết code sai khá thường xuyên** — không phải vì AI "ngu", mà vì mô tả của bạn có thể chưa đủ rõ, hoặc bài toán có nhiều cách hiểu, hoặc đơn giản là AI cũng có xác suất sai như con người. Người học đúng cách không phải là người **không bao giờ gặp lỗi**, mà là người **biết cách phát hiện và sửa lỗi** — kể cả khi vẫn nhờ AI sửa giúp.

Kỹ năng thật sự bạn cần học không phải là "thuộc cú pháp lập trình", mà là:
1. **Đọc hiểu ở mức khái quát** — nhìn vào một đoạn code, dù không hiểu từng dòng, bạn vẫn nắm được nó đang làm gì (lưu dữ liệu, gọi ra internet, hiển thị lên màn hình...).
2. **Kiểm tra kết quả thực tế** — chạy thử, xem có đúng như mong đợi không, thay vì tin vào việc "trông có vẻ đúng".
3. **Đặt câu hỏi đúng cho AI** khi có gì đó không ổn — mô tả chính xác bạn thấy gì, mong đợi gì.

## Bốn nguyên tắc thực hành

### 1. Luôn hỏi "giải thích cho mình đoạn này làm gì" trước khi chấp nhận code lớn

Đừng chấp nhận một đoạn code dài mà bạn hoàn toàn không hiểu, đặc biệt là những phần liên quan tới: xử lý tiền, dữ liệu người dùng, mật khẩu/API key, xóa dữ liệu. Hỏi AI giải thích trước — không cần hiểu 100%, chỉ cần hiểu đại khái "nó đang làm gì, vì sao cần bước này".

### 2. Làm từng bước nhỏ, đừng yêu cầu AI làm cả dự án lớn trong một lần

Thay vì: "Xây cho tôi một app quản lý bán hàng đầy đủ tính năng", hãy chia nhỏ: "Trước tiên, tạo trang đăng nhập đơn giản" → chạy thử, hiểu, chấp nhận → "Giờ thêm trang danh sách sản phẩm" → tiếp tục như vậy. Cách này giúp bạn theo kịp những gì đang được xây, và khi có lỗi, phạm vi cần tìm rất nhỏ (mới thêm một phần, lỗi chắc chắn nằm ở đó).

### 3. Luôn chạy thử, đừng chỉ đọc và tin

Code "trông đúng" và code "chạy đúng" là hai chuyện khác nhau. Luôn chạy thử ngay sau khi AI viết/sửa code, thử cả trường hợp bình thường lẫn trường hợp "phá" (bỏ trống ô nhập liệu, nhập ký tự lạ...).

### 4. Khi có lỗi, mô tả chính xác cho AI thay vì nói chung chung

So sánh hai cách hỏi:
- **Chung chung (kém hiệu quả):** "Nó bị lỗi rồi."
- **Cụ thể (hiệu quả):** "Tôi bấm nút 'Lưu' thì màn hình hiện chữ đỏ 'Cannot read property of undefined'. Đây là ảnh chụp màn hình lỗi [đính kèm]." — càng cụ thể, AI càng sửa nhanh và đúng.

## Đừng sợ sai

Người mới thường sợ "lỡ làm hỏng gì đó thì sao". Thực tế: hầu hết lỗi khi học code đều **hoàn toàn sửa được**, và việc gặp lỗi rồi tự tay sửa (hoặc nhờ AI sửa và hiểu vì sao) chính là cách bạn học nhanh nhất — nhanh hơn nhiều so với đọc lý thuyết suông. Ở bài [`02-code-voi-ai/05-git-github-co-ban.md`](../02-code-voi-ai/05-git-github-co-ban.md) bạn sẽ học cách dùng Git để luôn có thể "quay lại phiên bản trước đó" nếu làm hỏng gì — nên đừng ngại thử.

## Bước tiếp theo

Có tư duy đúng rồi, giờ chuẩn bị công cụ: [Cài đặt môi trường](02-cai-dat-moi-truong.md)
