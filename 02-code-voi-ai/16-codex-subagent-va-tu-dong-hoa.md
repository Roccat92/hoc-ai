# Subagent, làm song song và tự động hóa với Codex

Bài này dành cho người có nhiều task độc lập hoặc muốn chạy Codex trong script/CI. Học xong bạn sẽ biết khi nào tách agent, khi nào giữ một luồng, và cách đặt điểm dừng trước hành động không hoàn tác.

## Chỉ song song khi thật sự độc lập

Có thể tách: một agent đọc tài liệu, một agent viết test, một agent rà thay đổi. Không nên tách hai agent cùng sửa một file hoặc cùng quyết định schema. Mỗi luồng phải có phạm vi, đầu ra và người chịu trách nhiệm review.

## Tự động hóa không có nghĩa là bỏ kiểm soát

`codex exec` phù hợp cho workflow lặp lại, script và CI. Trong chế độ không tương tác, prompt phải quy định rõ input, output, lệnh được phép và điều kiện thất bại. Deploy, gửi email, xóa dữ liệu hoặc merge production cần bước phê duyệt riêng.

## Mẫu hợp đồng cho job tự động

```text
Input: danh sách file Markdown đã thay đổi.
Output: báo cáo lỗi theo JSON, không sửa file.
Được phép: đọc file và chạy một lệnh kiểm tra đã chỉ định.
Không được phép: truy cập mạng, commit, deploy hoặc gửi dữ liệu.
Nếu thiếu file hoặc lệnh lỗi: trả trạng thái blocked và log ngắn.
```

## `codex exec` trông thế nào

Chế độ không tương tác nhận thẳng prompt trên dòng lệnh, không hỏi lại:

```bash
codex exec "Rà tất cả file Markdown trong docs/, liệt kê link chết theo dạng bảng. Chỉ đọc, không sửa file."
```
- `codex exec`: chạy Codex một lượt rồi thoát, hợp cho script/CI (khác `codex` bản tương tác ngồi hỏi đáp).
- Chuỗi trong ngoặc kép: prompt - phải tự chứa đủ input, output mong muốn và giới hạn, vì không có ai ngồi làm rõ giữa chừng.
- Xem `codex exec --help` để biết các cờ hiện có (chọn model, thư mục làm việc, định dạng đầu ra...) - tên cờ đổi theo phiên bản nên đừng chép từ bài cũ.

Dùng trong GitHub Actions, ví dụ rà link mỗi khi có pull request:

```yaml
name: Rà link tài liệu
on: [pull_request]
jobs:
  ra-link:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g @openai/codex
      - run: codex exec "Rà link chết trong docs/, in báo cáo. Không sửa file."
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```
- `secrets.OPENAI_API_KEY`: khóa để trong GitHub Secrets, **không** viết thẳng vào file - xem [giấu API key](../10-bao-mat/03-giau-api-key-va-secret.md).
- Job này chỉ đọc và in báo cáo; commit hay deploy thì tách bước riêng có phê duyệt.

## Bài tập

Tạo hai task độc lập: một rà link Markdown và một rà tiêu đề. Cho chạy song song trên bản sao, sau đó tự hợp nhất kết quả; không cho agent tự commit.

## Checklist đạt bài

- [ ] Chia được việc độc lập và việc phụ thuộc.
- [ ] Mỗi agent có phạm vi riêng.
- [ ] Job tự động có input/output và điều kiện lỗi.
- [ ] Không tự động hóa side effect nguy hiểm.
- [ ] Có bước review trước merge/deploy.

## Bước tiếp theo

Muốn dùng Codex bền vững, hãy học cách chẩn đoán lỗi thay vì thử lệnh ngẫu nhiên: [Các lỗi Codex thường gặp →](17-codex-xu-ly-loi.md)
