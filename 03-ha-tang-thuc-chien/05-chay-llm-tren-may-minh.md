# Chạy LLM trên máy mình: Ollama, LM Studio

Bài này dành cho người muốn thử chạy model AI mở (Llama, Qwen, DeepSeek...) **ngay trên máy cá nhân**, miễn phí hoàn toàn, không cần gửi dữ liệu ra internet. Học xong bạn sẽ cài được công cụ chạy model local, và biết máy mình đủ mạnh để chạy loại model nào.

## Vì sao chạy model trên máy mình?

- **Miễn phí** - không tốn tiền API, không tốn tiền thuê cloud GPU.
- **Riêng tư** - dữ liệu bạn nhập không rời khỏi máy, phù hợp khi thử nghiệm với thông tin nhạy cảm.
- **Offline** - chạy được không cần internet sau khi đã tải model về.
- **Học tập/thử nghiệm** - tò mò muốn thử nhiều model mở khác nhau mà không lo chi phí.

Đánh đổi: model chạy local (đặc biệt trên máy cấu hình phổ thông) thường **không mạnh bằng** các model đóng hàng đầu (Claude, GPT, Gemini) chạy trên hạ tầng chuyên dụng khổng lồ, và tốc độ phản hồi phụ thuộc trực tiếp vào phần cứng máy bạn.

## Hai công cụ phổ biến

### Ollama

Công cụ dòng lệnh (CLI), đơn giản, được cộng đồng dev ưa chuộng. Cài xong chỉ cần một dòng lệnh để tải và chạy một model.

**Cài đặt:** vào [ollama.com](https://ollama.com), tải bản cho hệ điều hành của bạn, cài như một ứng dụng thông thường.

**Chạy thử một model** (ví dụ Llama 3, kích thước nhỏ):
```bash
ollama run llama3
```
- Lần đầu chạy, lệnh này sẽ **tự tải model về máy** (có thể mất vài phút tùy tốc độ mạng và kích thước model), sau đó mở một cuộc trò chuyện ngay trong terminal.

Thử model khác, ví dụ Qwen:
```bash
ollama run qwen2.5
```

Thoát cuộc trò chuyện: gõ `/bye`.

Xem danh sách model đã tải về máy: `ollama list`. Xóa bớt model không dùng (để giải phóng dung lượng ổ đĩa): `ollama rm ten-model`.

### LM Studio

Ứng dụng có **giao diện đồ họa (GUI)** trực quan, phù hợp nếu bạn chưa quen dùng terminal. Tải tại [lmstudio.ai](https://lmstudio.ai), cài như một app thông thường.

Trong ứng dụng: có mục tìm kiếm model để tải về (hiện rõ dung lượng, yêu cầu phần cứng ước tính ngay trong giao diện), sau khi tải xong có khung chat để trò chuyện trực tiếp với model - không cần gõ lệnh gì cả.

**Gợi ý:** nếu bạn thoải mái với terminal, Ollama nhanh gọn hơn. Nếu muốn giao diện trực quan để dễ khám phá, LM Studio phù hợp hơn.

## Cần RAM/VGA bao nhiêu?

Yêu cầu phần cứng phụ thuộc chủ yếu vào **số tham số (parameter)** của model - xem lại khái niệm ở [từ điển thuật ngữ](../00-ban-do-gioi-ai/06-tu-dien-thuat-ngu.md). Bảng dưới đây là ước lượng tối thiểu để chạy mượt (dùng bản đã "nén" - quantized, giải thích bên dưới):

| Kích thước model | RAM tối thiểu (nếu chạy bằng CPU) | VRAM khuyên dùng (nếu có GPU rời) | Ví dụ |
|---|---|---|---|
| Nhỏ (1B - 3B tham số) | ~8GB | ~4GB | Model cỡ nhỏ, phù hợp máy yếu/laptop văn phòng |
| Vừa (7B - 8B tham số) | ~16GB | ~6-8GB | Llama 3 8B, Qwen 7B - mức phổ biến nhất để thử nghiệm |
| Lớn (13B) | ~32GB | ~12GB+ | Cần máy khá hơn |
| Rất lớn (70B+) | 64GB+ (chạy rất chậm bằng CPU) | 40GB+ VRAM | Thường không thực tế cho máy cá nhân - cân nhắc thuê cloud GPU (xem [bài trước](04-thue-cloud-gpu.md)) |

> Đây là ước lượng thô để định hướng - con số thực tế còn phụ thuộc vào mức độ nén (quantization) cụ thể và công cụ đang dùng. Không có GPU rời vẫn chạy được các model nhỏ-vừa bằng CPU, chỉ là tốc độ phản hồi chậm hơn đáng kể.

## "Bản nén" (quantized) là gì?

Model gốc thường được lưu ở độ chính xác số cao (tốn nhiều dung lượng/RAM). **Quantization** là kỹ thuật "nén" các con số đó xuống độ chính xác thấp hơn, giúp model **nhẹ hơn nhiều lần, chạy được trên phần cứng yếu hơn**, đổi lại chất lượng câu trả lời giảm nhẹ (thường không đáng kể với mức nén vừa phải). Cả Ollama và LM Studio đều mặc định dùng các bản đã quantize sẵn - bạn không cần tự làm bước này.

## Kiểm tra máy mình đủ mạnh chưa

**Xem RAM máy** - Windows: mở Task Manager (`Ctrl+Shift+Esc`) → tab "Performance" → mục "Memory". Mac: menu Apple → "About This Mac".

**Xem có GPU rời không** - Windows: Task Manager → tab "Performance" → xem có mục "GPU 0" hiện tên card đồ họa rời (NVIDIA/AMD) không, hay chỉ có GPU tích hợp (Intel/AMD integrated). Mac: menu Apple → "About This Mac" → "Graphics" (các máy Mac dùng chip Apple Silicon - M1/M2/M3... - có bộ nhớ hợp nhất (unified memory) chia sẻ giữa CPU/GPU, thường chạy model vừa khá tốt dù không có "VRAM" riêng theo nghĩa truyền thống).

Nếu máy bạn không đủ mạnh cho model muốn thử, hai lựa chọn: chọn model nhỏ hơn (vẫn học/thử nghiệm được), hoặc thuê cloud GPU như bài trước.

## Bước tiếp theo

Đã có đủ nền tảng hạ tầng - từ deploy web tới chạy AI local/cloud. Trước khi build ứng dụng AI thật, học cách giữ dữ liệu an toàn khi có người dùng thật: [Database production, migration và backup thật →](06-database-production-backup.md)
