# Thuê cloud GPU: RunPod, Vast.ai, Lambda, Google Colab

Bài này dành cho người bắt đầu cần sức mạnh tính toán vượt quá máy cá nhân - thường là khi muốn **fine-tune** một model AI ([xem tổng quan ở phần 05](../05-train-va-finetune/01-hieu-ve-training.md)) hoặc chạy thử model mở (open-weight) cỡ lớn. Học xong bạn sẽ biết các nhà cung cấp phổ biến, cách ước tính chi phí, và chọn loại GPU phù hợp với việc mình đang làm - tránh thuê nhầm GPU quá mạnh (tốn tiền oan) hoặc quá yếu (không chạy nổi).

## Khi nào cần thuê GPU cloud?

Hầu hết việc học code với AI trong repo này (dùng Claude Code, gọi API, build RAG/agent) **không cần bạn tự có GPU** - vì bạn đang gọi tới model chạy trên server của Anthropic/OpenAI/Google. Bạn chỉ cần nghĩ tới GPU cloud khi:
- Muốn **fine-tune** một model mở (Llama, Qwen...) theo dữ liệu riêng.
- Muốn **chạy thử model lớn** mà máy cá nhân không đủ RAM/VRAM (xem [bài tiếp theo](05-chay-llm-tren-may-minh.md) về giới hạn phần cứng cần thiết).
- Học/nghiên cứu sâu hơn về huấn luyện model.

## Các nhà cung cấp phổ biến

### RunPod

Nền tảng cho thuê GPU khá linh hoạt, giao diện dễ dùng, được cộng đồng làm AI/ML ưa chuộng vì dễ khởi động một "pod" (máy ảo có GPU) chỉ trong vài phút, có sẵn nhiều template cài đặt trước (đã có sẵn PyTorch, các công cụ fine-tune phổ biến).

### Vast.ai

Hoạt động theo mô hình **chợ (marketplace)** - người có GPU dư thừa (từ cá nhân tới trung tâm dữ liệu nhỏ) cho thuê lại qua nền tảng này, đấu giá cạnh tranh. Nhờ vậy giá thường **rẻ hơn đáng kể** so với các nhà cung cấp cloud lớn - nhưng độ tin cậy/ổn định máy chủ đa dạng hơn (vì mỗi máy do một chủ khác nhau vận hành), cần đọc đánh giá của máy trước khi thuê.

### Lambda (Lambda Labs)

Cloud GPU chuyên biệt cho AI/ML, được nhiều đội ngũ nghiên cứu tin dùng, uy tín ổn định - thường giá không rẻ nhất thị trường nhưng đổi lại chất lượng dịch vụ và tài liệu hỗ trợ tốt.

### Google Colab

Khác các nền tảng trên - Colab là môi trường notebook chạy trên trình duyệt, có **bản miễn phí** cấp GPU (thường là loại phổ thông, có giới hạn thời gian sử dụng liên tục) rất tốt để **thử nghiệm, học tập**, và **Colab Pro/Pro+** trả phí theo tháng cho GPU mạnh hơn, thời gian chạy lâu hơn, ít bị ngắt kết nối hơn.

**Gợi ý cho người mới:** bắt đầu với **Google Colab bản miễn phí** để làm quen, thử nghiệm nhỏ trước khi bỏ tiền thuê GPU chuyên dụng ở RunPod/Vast.ai/Lambda cho các tác vụ nghiêm túc hơn.

## Bảng giá ước tính theo loại GPU

> **Đây là khoảng ước lượng thô tại thời điểm viết, KHÔNG phải giá chính xác** - giá cloud GPU biến động theo giờ (đặc biệt trên các nền tảng kiểu chợ như Vast.ai), theo khu vực, theo cung-cầu thị trường AI. Luôn kiểm tra giá thời gian thực trên trang từng nền tảng trước khi thuê.

| Loại GPU | Đặc điểm | Khoảng giá tham khảo (VND/giờ) | Phù hợp cho |
|---|---|---|---|
| **RTX 4090** | GPU "consumer" (dòng chơi game/đồ họa) mạnh, VRAM ~24GB | Khoảng 10.000 - 25.000đ/giờ | Fine-tune model cỡ nhỏ-vừa (LoRA), thử nghiệm cá nhân |
| **A100** | GPU "data-center", VRAM 40GB hoặc 80GB tùy bản | Khoảng 40.000 - 90.000đ/giờ | Fine-tune model lớn hơn, inference model lớn, công việc nghiêm túc hơn |
| **H100** | GPU mới, mạnh nhất trong nhóm phổ biến hiện nay | Khoảng 80.000 - 180.000đ/giờ | Huấn luyện/fine-tune quy mô lớn, cần tốc độ cao nhất |

## Chọn GPU nào cho việc gì?

| Việc bạn muốn làm | GPU gợi ý |
|---|---|
| Học, thử nghiệm nhỏ, chạy notebook mẫu | Colab miễn phí trước, không cần trả tiền |
| Fine-tune LoRA một model cỡ nhỏ-vừa (7B-13B tham số) trên dữ liệu riêng | RTX 4090 |
| Fine-tune model lớn hơn, hoặc cần VRAM nhiều để load model lớn | A100 |
| Huấn luyện quy mô lớn, dự án nghiêm túc, cần tốc độ tối đa | H100 |

## Mẹo tiết kiệm chi phí

- **Luôn tắt máy (stop/terminate instance) ngay khi làm xong** - cloud GPU tính tiền theo giờ máy đang chạy, kể cả khi bạn không dùng tới, quên tắt là "đốt tiền" oan.
- **Thử bản free/dùng thử trước** (Colab miễn phí, hoặc credit dùng thử một số nền tảng hay tặng cho tài khoản mới) trước khi cam kết chi tiêu lớn.
- **Trên Vast.ai, so sánh nhiều máy** trước khi chọn - giá chênh lệch khá nhiều giữa các máy cùng loại GPU do là chợ tự do.
- **Ước lượng thời gian cần trước khi bắt đầu** - nếu công việc dự kiến chạy nhiều giờ liên tục, tính tổng chi phí trước (giá/giờ × số giờ dự kiến) để tránh bất ngờ.

## Bước tiếp theo

Trước khi vội thuê GPU cloud, kiểm tra xem máy cá nhân của bạn có chạy được model mở không - có thể không cần tốn tiền: [Chạy LLM trên máy mình](05-chay-llm-tren-may-minh.md)
