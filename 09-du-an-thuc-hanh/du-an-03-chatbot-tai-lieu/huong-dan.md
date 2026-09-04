# Hướng dẫn: từ bản mẫu tới sản phẩm của riêng bạn

Bài này dành cho người đã xong [dự án 02](../du-an-02-quan-ly-don-hang/spec.md) và sẵn sàng cho dự án khó nhất trong ba dự án thực hành: một **chatbot RAG thật**, biết trích dẫn nguồn, biết nói "không biết" thay vì bịa. Học xong bạn sẽ hiểu RAG không chỉ qua lý thuyết mà qua chính tay build ra một hệ thống RAG hoàn chỉnh.

## Bước 1: Copy bộ spec ra dự án riêng

```bash
mkdir tro-ly-tai-lieu
cp spec.md backlog.md CLAUDE.md tro-ly-tai-lieu/
cd tro-ly-tai-lieu
```

## Bước 2: Chạy đúng quy trình đã học ở phần 8

Dự án này có nhiều phần mới (chunking, embedding, vector database) hơn hai dự án trước — càng cần làm **từng task nhỏ, kiểm tra kỹ, commit thường xuyên** (xem lại [quy trình một phiên làm việc chuẩn](../../08-chuan-hoa-du-an/05-quy-trinh-1-phien-lam-viec.md)). Đừng nhảy cóc sang task "API hỏi đáp" khi task "chunking + embedding" chưa chạy đúng — bạn sẽ không biết lỗi nằm ở khâu nào.

Prompt bắt đầu phiên đầu tiên:
```
Đọc spec.md và CLAUDE.md trước. Task đầu tiên trong backlog.md là "Khởi
tạo dự án — backend/ (FastAPI) và frontend/ (React qua Vite), cấu trúc
cơ bản". Làm đúng task này.
```

## Vì sao spec chọn những thứ này — hiểu để không chỉ làm theo

- **Chroma thay vì một vector database phức tạp hơn:** chạy embedded/local, không cần dựng server riêng — phù hợp quy mô một công ty nhỏ, vài chục tài liệu. Xem lại [RAG là gì và cách build](../../04-build-ung-dung-ai/02-rag-la-gi-va-build.md) nếu cần ôn lại khái niệm.
- **Bắt buộc trích dẫn nguồn ở mọi câu trả lời:** đây là điểm khác biệt cốt lõi giữa "chatbot RAG tử tế" và "chatbot chỉ đoán mò nghe có vẻ đúng" — trích dẫn cho phép người hỏi tự kiểm tra, thay vì tin tuyệt đối vào AI.
- **Bắt buộc trả lời "không tìm thấy" khi không có đoạn liên quan:** chống đúng hiện tượng hallucination đã học ở [`00-ban-do-gioi-ai/02-llm-la-gi.md`](../../00-ban-do-gioi-ai/02-llm-la-gi.md) — một chatbot RAG tốt phải biết dừng lại khi không có căn cứ, không bịa cho có câu trả lời.

## Bước 3: Biến thành sản phẩm của riêng bạn

Đổi `spec.md` theo loại tài liệu thật bạn muốn hỏi đáp — cấu trúc "upload → chia nhỏ → hỏi đáp có trích nguồn" áp dụng được cho rất nhiều tình huống:

- **Tài liệu hướng dẫn sử dụng sản phẩm** — chatbot tư vấn khách hàng dựa trên manual sản phẩm thật.
- **Sổ tay nhân viên / quy định công ty** — đúng như bản mẫu, nhưng với tài liệu thật của bạn.
- **Tài liệu học tập cá nhân** — biến ghi chú/giáo trình của bạn thành một "gia sư" hỏi đáp riêng.
- **Hợp đồng/tài liệu pháp lý** — hỏi nhanh một điều khoản nằm ở đâu (**lưu ý:** với tài liệu pháp lý thật, luôn kiểm tra lại với người có chuyên môn, đừng chỉ tin chatbot).

Sửa `spec.md`, cập nhật `backlog.md`, rồi lặp lại quy trình đã quen từ hai dự án trước.

## Trước khi cho người khác dùng thật

Dự án này thường chứa **tài liệu nội bộ có thể nhạy cảm** (chính sách công ty, thông tin nhân sự...) — đi lại kỹ [checklist bảo mật ở phần 10](../../10-bao-mat/) trước khi public, đặc biệt:
- Không để chatbot truy cập công khai nếu tài liệu chứa thông tin nhạy cảm — giữ sau lớp đăng nhập.
- Giấu API key Claude cẩn thận (xem [`10-bao-mat/03-giau-api-key-va-secret.md`](../../10-bao-mat/03-giau-api-key-va-secret.md)) — dự án này gọi API nhiều hơn hai dự án trước (mỗi lần upload và mỗi lần hỏi đều tốn token), theo dõi usage dashboard thường xuyên hơn.

## Tự chấm: mình đã hiểu chưa?

- [ ] Bạn giải thích được embedding là gì, và vì sao cần chia nhỏ (chunk) tài liệu trước khi tạo embedding thay vì nhét cả file vào một lần?
- [ ] Bạn giải thích được luồng đi từ lúc gõ câu hỏi tới lúc nhận câu trả lời kèm trích dẫn — qua những bước nào?
- [ ] Bạn tự thử được: hỏi một câu chatbot chắc chắn không có trong tài liệu — nó có trả lời "không tìm thấy" thay vì bịa không?
- [ ] Bạn ước tính được chi phí API sẽ tăng ra sao nếu số lượng tài liệu hoặc số câu hỏi tăng lên nhiều lần?
- [ ] Bạn biết cách backup dữ liệu Chroma (thường là một thư mục file trên đĩa) tương tự cách backup file SQLite ở dự án 02?

Câu nào chưa chắc — quay lại đúng phần đó, tự làm lại trước khi coi là xong.

## Bước tiếp theo

Đã hoàn thành cả ba dự án thực hành. Trước khi cho người khác dùng thử bất kỳ sản phẩm nào trong số đó, đi qua checklist bảo mật tối thiểu: [Bảo mật →](../../10-bao-mat/)
