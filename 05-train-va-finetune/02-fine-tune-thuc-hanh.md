# Fine-tune thực hành: Llama/Qwen bằng LoRA trên cloud GPU, chi phí thật

Bài này dành cho người đã đọc [bài trước](01-hieu-ve-training.md) và xác định thật sự cần fine-tune (không phải RAG hay prompt tốt hơn đã đủ). Học xong bạn sẽ hiểu quy trình fine-tune một model mở bằng kỹ thuật LoRA, và ước tính được chi phí thật.

## LoRA là gì, vì sao dùng nó thay vì fine-tune toàn bộ model?

Fine-tune "truyền thống" (full fine-tuning) nghĩa là huấn luyện lại **toàn bộ** tham số của model - với model có hàng tỷ tham số, việc này đòi hỏi lượng VRAM khổng lồ và chi phí rất cao.

**LoRA (Low-Rank Adaptation)** là kỹ thuật thông minh hơn: thay vì huấn luyện lại toàn bộ model, LoRA **đóng băng** model gốc (giữ nguyên, không đổi) và chỉ huấn luyện một số lượng nhỏ tham số phụ được thêm vào - giống như "dán thêm một lớp điều chỉnh mỏng" lên model gốc thay vì viết lại toàn bộ. Kết quả: **giảm mạnh** lượng VRAM cần thiết và thời gian huấn luyện, trong khi chất lượng vẫn tốt cho phần lớn use case thực tế - đây là lý do LoRA trở thành cách fine-tune phổ biến nhất cho cá nhân/team nhỏ.

## Quy trình tổng quan

```
1. Chuẩn bị dataset → 2. Chọn base model → 3. Chọn công cụ fine-tune
        → 4. Thuê GPU → 5. Chạy training → 6. Test kết quả → 7. Export/dùng model
```

### 1. Chuẩn bị dataset

Dataset fine-tune thường ở dạng **cặp instruction-response** (câu hỏi/yêu cầu - câu trả lời mong muốn), ví dụ định dạng JSON:
```json
{"instruction": "Viết một câu chào khách hàng theo phong cách thân thiện của shop ABC", "response": "Chào bạn! Rất vui được đón tiếp bạn tại ABC hôm nay 🌸..."}
```
Xem chi tiết cách chuẩn bị dữ liệu (đặc biệt dữ liệu tiếng Việt) ở [bài tiếp theo](03-du-lieu-tieng-viet.md). Số lượng cần thiết tùy bài toán - thường từ vài trăm tới vài nghìn cặp là đủ để thấy hiệu quả rõ rệt cho một tác vụ hẹp.

### 2. Chọn base model

Chọn một model mở phù hợp kích thước (xem lại [`00-ban-do-gioi-ai/03-cac-cong-ty-va-model.md`](../00-ban-do-gioi-ai/03-cac-cong-ty-va-model.md)) - với người mới, nên bắt đầu với model cỡ nhỏ-vừa (ví dụ dòng 7B-8B tham số của Llama hoặc Qwen) để việc thử nghiệm nhanh và rẻ hơn.

### 3. Chọn công cụ fine-tune

Vài công cụ phổ biến giúp việc fine-tune LoRA dễ tiếp cận hơn (không cần viết code huấn luyện từ đầu):
- **Unsloth** - nổi tiếng vì tối ưu tốc độ/bộ nhớ đáng kể cho fine-tune LoRA, có sẵn notebook mẫu dễ chạy trên Colab hoặc cloud GPU.
- **Axolotl** - công cụ cấu hình fine-tune qua file YAML, được cộng đồng open-source ưa chuộng.
- **Hugging Face PEFT** (Parameter-Efficient Fine-Tuning) - thư viện chính thức của Hugging Face hỗ trợ LoRA và các kỹ thuật tương tự, tích hợp tốt với hệ sinh thái `transformers`.

**Gợi ý cho người mới:** Unsloth có notebook mẫu sẵn, dễ chạy thử trên Google Colab trước khi chuyển sang thuê GPU riêng cho việc nghiêm túc hơn.

### 4-5. Thuê GPU và chạy training

Dùng lại kiến thức từ [`03-ha-tang-thuc-chien/04-thue-cloud-gpu.md`](../03-ha-tang-thuc-chien/04-thue-cloud-gpu.md) - với fine-tune LoRA model cỡ 7B-8B, một GPU RTX 4090 thường đã đủ dùng cho dataset vừa phải. Có thể nhờ Claude Code hỗ trợ viết/điều chỉnh script chạy training dựa trên tài liệu của công cụ bạn chọn (Unsloth/Axolotl/PEFT).

### 6. Test kết quả

So sánh câu trả lời của model **trước và sau** fine-tune trên cùng một bộ câu hỏi thử nghiệm - kiểm tra xem model đã học đúng phong cách/kiến thức mong muốn chưa, và quan trọng không kém: **kiểm tra model có bị "quên" các khả năng chung khác không** (hiện tượng gọi là "catastrophic forgetting" - fine-tune quá mạnh trên dữ liệu hẹp có thể khiến model kém đi ở các việc khác).

### 7. Export và sử dụng

Sau khi hài lòng với kết quả, xuất model đã fine-tune (thường có thể "gộp" - merge - phần LoRA vào model gốc để dùng như một model bình thường), rồi dùng để inference - có thể tiếp tục chạy trên cloud GPU, hoặc nếu đủ nhẹ, chạy local qua Ollama ([xem lại](../03-ha-tang-thuc-chien/05-chay-llm-tren-may-minh.md)).

## Chi phí thật - ước tính

Chi phí chủ yếu tới từ **thời gian thuê GPU**. Với fine-tune LoRA model cỡ 7B-8B trên dataset vài trăm tới vài nghìn mẫu, thời gian training thường dao động từ **khoảng 1-4 giờ GPU** (phụ thuộc nhiều vào dataset size, số epoch, cấu hình cụ thể). Nhân với giá GPU tham khảo ở [bài thuê cloud GPU](../03-ha-tang-thuc-chien/04-thue-cloud-gpu.md) (RTX 4090 khoảng 10.000-25.000đ/giờ), một lần thử nghiệm fine-tune nhỏ có thể tốn khoảng **vài chục nghìn tới dưới 200.000đ** - rẻ hơn nhiều so với hình dung "fine-tune AI" nghe có vẻ tốn kém.

> Đây là ước lượng rất thô để bạn hình dung mức độ, không phải cam kết chi phí chính xác - thời gian training thực tế phụ thuộc nhiều yếu tố (kích thước dataset, số vòng lặp huấn luyện, cấu hình cụ thể).

## Lời khuyên

Fine-tune là kỹ năng cần thử nghiệm nhiều lần mới quen - đừng kỳ vọng lần đầu đã ra kết quả hoàn hảo. Bắt đầu với dataset nhỏ (vài trăm mẫu), thời gian training ngắn, chi phí thấp để học quy trình trước, rồi mở rộng dần khi đã tự tin.

## Bước tiếp theo

Chất lượng fine-tune phụ thuộc rất nhiều vào chất lượng dữ liệu - đặc biệt quan trọng với tiếng Việt: [Dữ liệu tiếng Việt](03-du-lieu-tieng-viet.md)
