# Dữ liệu tiếng Việt: tìm ở đâu, chuẩn bị thế nào

Bài này dành cho người chuẩn bị fine-tune ([bài trước](02-fine-tune-thuc-hanh.md)) hoặc build hệ thống RAG cần dữ liệu tiếng Việt chất lượng. Học xong bạn sẽ biết nơi tìm dataset tiếng Việt có sẵn, và cách tự chuẩn bị dữ liệu riêng nếu không tìm được dataset phù hợp.

## Vì sao dữ liệu tiếng Việt "khó tìm" hơn tiếng Anh?

Phần lớn dữ liệu huấn luyện AI trên internet là tiếng Anh - tiếng Việt tuy không hiếm nhưng **ít hơn đáng kể về khối lượng và đa dạng chủ đề** so với tiếng Anh. Điều này ảnh hưởng tới cả việc model gốc "giỏi" tiếng Việt tới đâu, lẫn việc bạn tìm dataset có sẵn để fine-tune cho nhu cầu tiếng Việt cụ thể.

## Nguồn dataset tiếng Việt có sẵn

- **Hugging Face Hub** (huggingface.co/datasets) - kho dataset lớn nhất hiện nay, có công cụ tìm kiếm - gõ từ khóa "vietnamese" để lọc ra hàng trăm dataset tiếng Việt đủ loại (dịch thuật, phân loại văn bản, hỏi đáp, giọng nói...). Đây nên là điểm bắt đầu đầu tiên của bạn.
- **Wikipedia tiếng Việt** - Wikimedia phát hành bản dump toàn bộ nội dung Wikipedia tiếng Việt định kỳ, tải miễn phí, phù hợp làm dữ liệu nền cho RAG hoặc pre-processing.
- **VLSP** (Vietnamese Language and Speech Processing) - chuỗi hội thảo/cuộc thi nghiên cứu xử lý ngôn ngữ tiếng Việt lâu năm tại Việt Nam, thường phát hành dataset kèm mỗi kỳ thi (dịch máy, nhận diện thực thể, phân tích cảm xúc...).
- **Các nhóm nghiên cứu AI tiếng Việt** (ví dụ VinAI Research) từng phát hành nhiều dataset và model mở chuyên cho tiếng Việt (như các bộ dữ liệu dịch máy Việt-Anh, các model NLP tiếng Việt) - tìm trên Hugging Face Hub hoặc GitHub bằng tên nhóm nghiên cứu để cập nhật những gì hiện có.
- **Common Crawl / OSCAR** - kho dữ liệu web quy mô lớn, đa ngôn ngữ, có tách riêng phần tiếng Việt - phù hợp khi cần khối lượng dữ liệu lớn cho việc huấn luyện quy mô hơn, nhưng cần làm sạch kỹ vì chất lượng dữ liệu thô từ web không đồng đều.

> Tên dataset/tổ chức cụ thể và đường dẫn có thể thay đổi theo thời gian - luôn tìm kiếm trực tiếp trên Hugging Face Hub bằng từ khóa liên quan (ví dụ: "vietnamese instruction", "vietnamese translation") để có kết quả cập nhật nhất, thay vì chỉ tin vào danh sách tĩnh trong bài viết bất kỳ.

## Khi không tìm được dataset phù hợp: tự chuẩn bị dữ liệu riêng

Với nhiều bài toán chuyên biệt (ví dụ: fine-tune theo phong cách thương hiệu riêng, theo domain kiến thức rất hẹp), bạn sẽ cần **tự tạo dataset** thay vì dùng dataset có sẵn. Quy trình cơ bản:

1. **Thu thập nguồn dữ liệu gốc** - tài liệu công ty, lịch sử hội thoại chăm sóc khách hàng (đã ẩn danh thông tin cá nhân), bài viết bạn tự viết...
2. **Làm sạch dữ liệu** - loại bỏ nội dung trùng lặp, lỗi định dạng, thông tin nhạy cảm/cá nhân.
3. **Format thành cặp instruction-response** (xem ví dụ định dạng ở [bài trước](02-fine-tune-thuc-hanh.md)).
4. **Kiểm duyệt chất lượng** - đọc lại một mẫu ngẫu nhiên để đảm bảo dữ liệu đúng, nhất quán, đúng phong cách mong muốn. Dữ liệu chất lượng thấp (dù số lượng nhiều) thường cho kết quả fine-tune tệ hơn dữ liệu chất lượng cao (dù số lượng ít hơn).

**Dùng chính AI để hỗ trợ chuẩn bị dữ liệu:** bạn có thể nhờ Claude Code viết script tự động làm sạch, format lại dữ liệu thô thành đúng cấu trúc cần thiết - mô tả yêu cầu tương tự cách bạn đã làm ở các bài trước, ví dụ: "Viết script Python đọc các file .txt trong thư mục này, tách thành các đoạn hội thoại hỏi-đáp, xuất ra file JSON theo định dạng instruction-response."

## Lưu ý về bản quyền và đạo đức khi thu thập dữ liệu

- **Không thu thập/dùng dữ liệu vi phạm bản quyền** (sao chép nguyên văn nội dung có bản quyền mà không được phép) để huấn luyện model thương mại.
- **Ẩn danh thông tin cá nhân** (tên khách hàng, số điện thoại, email...) trước khi dùng bất kỳ dữ liệu tương tác thật nào để fine-tune, tuân thủ quy định bảo vệ dữ liệu cá nhân hiện hành.
- **Với dữ liệu từ crawl web**, kiểm tra điều khoản sử dụng (Terms of Service) của nguồn trước khi thu thập quy mô lớn.

## Bước tiếp theo

Đã hiểu cách tìm và chuẩn bị dữ liệu, phần cuối cùng của chặng nâng cao là một cái nhìn tổng quan (chỉ để biết, không phải để làm theo): [Tổng quan build LLM từ đầu](04-build-llm-tu-dau.md)
