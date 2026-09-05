# Agent guardrail, human approval và quan sát production

Bài này dành cho người muốn agent làm nhiều bước nhưng không muốn nó tự ý hoàn tiền, xóa dữ liệu hoặc gọi tool vô hạn. Học xong bạn sẽ thiết kế được allowlist tool, giới hạn vòng lặp, điểm duyệt người và dashboard tối thiểu.

## Mọi tool đều cần hợp đồng

Ghi rõ input schema, quyền cần có, side effect, timeout, lỗi và có an toàn khi retry không. Tool đọc dữ liệu nên tách khỏi tool ghi dữ liệu. Đừng đưa một tool “làm mọi thứ” cho agent.

## Ba lớp guardrail

- **Trước tool:** kiểm tra người dùng, input, quyền và ngân sách.
- **Trong vòng lặp:** giới hạn số bước, token, thời gian và số lần retry.
- **Sau tool:** validate kết quả, lọc dữ liệu nhạy cảm và yêu cầu người duyệt cho hành động lớn.

Luôn có đường chuyển cho người thật khi agent không chắc, nguồn mâu thuẫn hoặc hành động không hoàn tác.

## Giới hạn vòng lặp và cổng phê duyệt bằng code

Hai guardrail quan trọng nhất - chặn agent lặp vô hạn và chặn nó tự làm việc không hoàn tác - viết được vài dòng:

```python
TOOL_CAN_DUYET = {"hoan_tien", "xoa_du_lieu", "gui_email"}

def chay_agent(cau_hoi: str, so_buoc_toi_da: int = 8):
    for buoc in range(so_buoc_toi_da):          # 1. giới hạn số bước
        hanh_dong = agent.buoc_tiep(cau_hoi)
        if hanh_dong.loai == "tra_loi":
            return hanh_dong.noi_dung
        if hanh_dong.ten_tool in TOOL_CAN_DUYET:  # 2. cổng phê duyệt người
            if not xin_xac_nhan(hanh_dong):        # hiện bản xem trước, chờ người bấm đồng ý
                return "Đã dừng: người dùng không xác nhận hành động."
        thuc_thi(hanh_dong)
    return "Đã đạt giới hạn số bước mà chưa xong - chuyển cho người xử lý."
```
- `so_buoc_toi_da`: trần cứng để một agent kẹt logic không chạy (và tốn tiền) vô hạn. Chạm trần thì giao lại cho người, không âm thầm thử mãi.
- `TOOL_CAN_DUYET`: danh sách hành động **không hoàn tác** bắt buộc có người bấm đồng ý sau khi xem bản xem trước - agent không tự quyết hoàn tiền hay xóa dữ liệu.
- `xin_xac_nhan` phải cho người thấy **chính xác** việc sắp làm (hoàn bao nhiêu tiền, cho đơn nào), không phải một câu chung chung "đồng ý tiếp tục?".

## Quan sát cần gì?

Theo dõi tỷ lệ thành công, lỗi tool, latency, token/cost, số lần fallback, câu bị người dùng đánh dấu sai và các prompt injection bị chặn. Gắn request id để nối log model với log ứng dụng nhưng không lưu secret.

Một dòng log đủ dùng có thể trông như:

```json
{"request_id": "req_8f2a", "buoc": 3, "tool": "tra_cuu_don", "latency_ms": 420, "token": 1850, "trang_thai": "ok"}
```
- Có `request_id` xuyên suốt: khi một yêu cầu lỗi, bạn lần được toàn bộ chuỗi bước của đúng nó thay vì mò trong biển log.
- Có `token`/`latency_ms`: để biết bước nào tốn tiền và chậm, tối ưu đúng chỗ.
- **Không** log nội dung nhạy cảm hay secret - chỉ log đủ để chẩn đoán. Xem lại [log, monitoring và chi phí](../03-ha-tang-thuc-chien/08-log-monitoring-va-chi-phi.md).

## Bài tập

Xây agent thời tiết chỉ dùng tool đọc. Sau đó thêm tool đặt lịch giả nhưng bắt buộc trả bản xem trước và chờ xác nhận. Test timeout, tool trả lỗi và người dùng nhập tham số ngoài schema.

## Checklist đạt bài

- [ ] Tool có schema và allowlist rõ.
- [ ] Có giới hạn vòng lặp, thời gian và chi phí.
- [ ] Hành động lớn có human approval.
- [ ] Có fallback khi model/tool lỗi.
- [ ] Có log metric và cách xem một request end-to-end.

## Bước tiếp theo

Đã có agent có kiểm soát, quay lại [Phần 5: train và fine-tune](../05-train-va-finetune/01-hieu-ve-training.md) chỉ khi eval chứng minh prompt/RAG chưa đủ.
