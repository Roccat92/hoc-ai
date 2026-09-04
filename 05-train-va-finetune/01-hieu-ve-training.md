# Pre-train vs fine-tune vs RAG: khi nào cần gì

Bài này dành cho người đã build ứng dụng AI thực chiến ở phần trước và bắt đầu tò mò "vậy có khi nào mình cần tự huấn luyện model không?". Học xong bạn sẽ phân biệt rõ ba khái niệm hay bị nhầm lẫn, và biết - spoiler - **đa số trường hợp bạn KHÔNG cần tự huấn luyện gì cả**.

> Đây là phần **nâng cao** của repo. Nếu bạn mới học tới đây và chưa build xong dự án nào ở phần [`04-build-ung-dung-ai/`](../04-build-ung-dung-ai/), nên quay lại hoàn thành phần đó trước - phần lớn nhu cầu thực tế đã được giải quyết bằng RAG và gọi API, không cần đọc tiếp phần này ngay.

## Ba khái niệm, ba mức độ can thiệp vào model

| Khái niệm | Bạn đang làm gì | Mức độ can thiệp |
|---|---|---|
| **Pre-train (huấn luyện trước)** | Dạy một model **từ đầu**, chưa biết gì, học từ hàng nghìn tỷ token dữ liệu | Sâu nhất - tạo ra một model hoàn toàn mới |
| **Fine-tune (tinh chỉnh)** | Huấn luyện tiếp một model **đã có sẵn** trên một tập dữ liệu nhỏ, chuyên biệt | Vừa - điều chỉnh hành vi/kiến thức của model có sẵn |
| **RAG (đã học ở phần trước)** | **Không đụng vào model** - chỉ đưa thêm thông tin liên quan vào prompt mỗi lần hỏi | Nông nhất - không thay đổi model, chỉ thay đổi input |

## Khi nào cần gì?

**RAG - dùng cho hầu hết trường hợp:**
- Cần AI trả lời dựa trên tài liệu/dữ liệu riêng, cập nhật thường xuyên (giá sản phẩm, chính sách công ty, tin tức mới).
- Không cần thay đổi cách AI "nói chuyện" hay "suy nghĩ", chỉ cần nó biết thêm thông tin.
- Chi phí thấp, triển khai nhanh, dễ cập nhật (chỉ cần thêm/sửa tài liệu, không cần huấn luyện lại gì).

**Fine-tune - chỉ cần khi RAG không đủ:**
- Cần AI **thay đổi phong cách/giọng văn** nhất quán theo một cách rất đặc thù mà prompt/RAG không đạt được (ví dụ: luôn trả lời theo đúng văn phong thương hiệu công ty, dùng thuật ngữ chuyên ngành rất riêng).
- Cần AI làm tốt một tác vụ hẹp, lặp đi lặp lại với format đầu ra rất cụ thể, mà việc mô tả trong prompt (dù đã tối ưu) vẫn chưa đủ ổn định.
- Cần model **nhỏ, chạy nhanh, chi phí thấp** cho một tác vụ cụ thể, chấp nhận đánh đổi khả năng tổng quát để đổi lấy hiệu quả cho đúng việc đó.
- Xem hướng dẫn thực hành ở [bài tiếp theo](02-fine-tune-thuc-hanh.md).

**Pre-train from scratch - hầu như không bao giờ cần với cá nhân/doanh nghiệp nhỏ:**
- Đòi hỏi dữ liệu khổng lồ (hàng nghìn tỷ token), hạ tầng GPU cực lớn, chi phí từ hàng triệu tới hàng chục triệu đô la, đội ngũ chuyên gia nghiên cứu.
- Chỉ các phòng lab lớn (Anthropic, OpenAI, Google, Meta, các công ty AI lớn khác) mới thực hiện việc này.
- Xem tổng quan tham khảo (không phải hướng dẫn thực hành) ở [`04-build-llm-tu-dau.md`](04-build-llm-tu-dau.md).

## Sơ đồ quyết định nhanh

```
Cần AI biết thêm thông tin/dữ liệu riêng?
  → Có: thử RAG trước
      → Đã thử RAG kỹ (tối ưu chunking, prompt) mà vẫn chưa đạt yêu cầu về
        phong cách/format đầu ra rất đặc thù?
          → Có: cân nhắc fine-tune
          → Không: RAG là đủ, dừng ở đây
  → Không, chỉ cần AI "nói chuyện" theo phong cách khác?
      → Thử điều chỉnh system prompt trước (rẻ nhất, nhanh nhất)
      → Nếu vẫn chưa đủ nhất quán: cân nhắc fine-tune
```

**Lời khuyên chung:** luôn thử theo thứ tự **prompt tốt hơn → RAG → fine-tune**, theo đúng thứ tự chi phí/độ phức tạp tăng dần. Đừng nhảy thẳng vào fine-tune vì "nghe có vẻ chuyên nghiệp hơn" - phần lớn trường hợp thực tế RAG và prompt tốt đã đủ giải quyết vấn đề.

## Bước tiếp theo

Nếu bạn đã xác định thật sự cần fine-tune, xem hướng dẫn thực hành: [Fine-tune thực hành với LoRA](02-fine-tune-thuc-hanh.md)
