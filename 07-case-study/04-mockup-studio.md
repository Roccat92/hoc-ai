# Mockup Studio: công cụ web xử lý ảnh ngay trên trình duyệt, gọi được từ dòng lệnh và MCP

**Người chia sẻ:** Nguyễn Ngọc Thư - Startee / StarteeX (liên hệ: thunguyen@startee.vn)
**Thời gian thực hiện:** là một phần của hệ sinh thái StarteeX (xem tổng thời gian và chi phí AI ở [case study StarteeX App](02-starteex-app.md)); kèm Codex/ChatGPT Pro để phản biện và làm assets. Vẫn được update đều, hiện làm bằng gói Max 5x.
**Trình độ trước khi bắt đầu:** đã làm thiết kế và xử lý file in nhiều năm bằng Photoshop, Illustrator

> Công cụ dùng được miễn phí tại [mockup.startee.vn](https://mockup.startee.vn).

## Dự án làm gì?

Mockup Studio là công cụ web giúp người đặt in tự chuẩn bị file và xem thử thiết kế trên sản phẩm, không cần biết dùng Photoshop và không cần chờ thiết kế viên.

Bốn việc chính nó làm:

- **Xóa nền ảnh** ngay trên trình duyệt
- **Chuyển ảnh sang vector** cho nét in sắc
- **Mô phỏng hiệu ứng in thật** - in DTG, chuyển nhiệt, thêu vi tính, in lụa, decal nhiệt, tie-dye, đính đá cho ra bề mặt khác nhau
- **Ghép thiết kế vào ảnh sản phẩm** để xem thử trước khi in

## Vì sao cần tới nó

Trong xưởng in, một tỉ lệ đáng kể thời gian không dùng để in, mà để **sửa file khách gửi**: ảnh có nền trắng cần xóa, ảnh mờ cần vector hóa, khách không hình dung được in ra trông thế nào nên chốt xong lại đổi.

Đẩy phần này ra cho khách tự làm bằng một công cụ đủ dễ thì cả hai bên cùng lợi: khách thấy trước kết quả, xưởng nhận được file dùng được ngay.

## Quyết định kỹ thuật đáng nói: xử lý ngay trên máy khách

Xóa nền và vector hóa đều là việc nặng. Cách thông thường là gửi ảnh lên máy chủ xử lý rồi trả về. Mockup Studio làm **ngay trong trình duyệt của người dùng**.

Đổi lại được ba thứ:

1. **Không tốn tiền máy chủ theo lượt dùng.** Công cụ miễn phí mà mỗi lượt xóa nền đều tốn tiền server thì càng đông người dùng càng lỗ.
2. **Nhanh hơn.** Không phải chờ tải ảnh lên rồi tải kết quả về.
3. **Riêng tư hơn.** Ảnh của khách không rời khỏi máy khách.

Đây là kiểu đánh đổi đáng để người mới học: **chỗ nào chạy được ở phía người dùng thì đừng đẩy lên máy chủ**, vừa rẻ vừa nhanh.

## Gọi được từ dòng lệnh và qua MCP

Ngoài giao diện web cho người dùng thường, công cụ còn dùng được theo hai cách dành cho tự động hóa:

- **CLI** (dòng lệnh) để xử lý hàng loạt file, thay vì ngồi kéo thả từng cái.
- **MCP** để một AI agent gọi thẳng công cụ này như một trong các "ổ cắm" của nó - xem lại [MCP là gì](../04-build-ung-dung-ai/03-ai-agent.md) và [Skills và MCP](../06-kho-tai-nguyen/03-skills-va-mcp.md).

Ý nghĩa thực tế: khi có MCP, [NEXA](03-nexa-agent.md) tự tạo được mockup cho khách mà không cần người mở web bấm tay.

## Công nghệ đã dùng

| Phần | Dùng gì |
|---|---|
| Giao diện | React |
| Xử lý ảnh | Canvas trong trình duyệt |
| Tự động hóa | CLI và MCP server |

## Chi phí thực tế (VND)

| Khoản | Chi phí | Ghi chú |
|---|---|---|
| Tên miền phụ `mockup.startee.vn` | 0đ | Dùng tên miền đã có |
| Máy chủ xử lý ảnh | 0đ | Vì xử lý ở trình duyệt người dùng |
| Vercel (chạy web) | 0đ | Dùng bậc miễn phí |
| Gói AI để build | nằm trong gói AI chung của [hệ sinh thái StarteeX](02-starteex-app.md) | Không cộng riêng cho Mockup Studio |

## Bài học rút ra

1. **Đẩy việc nặng về phía người dùng nếu được.** Một công cụ miễn phí chỉ sống lâu được nếu chi phí vận hành gần bằng không.
2. **Làm công cụ cho người dùng thường trước, mở API cho máy sau.** Bản web dùng tay có trước; CLI và MCP thêm vào sau, khi đã biết chắc luồng xử lý nào là đúng.
3. **Một công cụ có MCP thì agent dùng lại được.** Không phải viết lại logic cho agent - đây chính là ý nghĩa của việc chuẩn hóa mà bài MCP nói tới.

## Link

- Công cụ: [mockup.startee.vn](https://mockup.startee.vn)
- Mã nguồn: không công khai

## Bước tiếp theo

Dự án tiếp theo của bạn lớn hơn, cần làm qua nhiều phiên, nhiều ngày? Học cách làm việc với AI có kỷ luật để khỏi loạn ngữ cảnh: [Vì sao cần spec trước khi để AI code →](../08-chuan-hoa-du-an/01-tai-sao-can-spec.md)
