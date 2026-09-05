# CI/CD cơ bản: kiểm tra tự động trước khi deploy

Bài này dành cho người đã deploy tay được vài lần và bắt đầu thấy phiền vì phải tự nhớ chạy test/build trước mỗi lần đẩy code lên. Học xong bạn sẽ có một workflow chạy tự động mỗi khi có thay đổi, và biết vì sao không nên bỏ qua bước kiểm tra chỉ để deploy cho nhanh.

## CI/CD là gì, tại sao cần dù chỉ một mình làm

**CI** (Continuous Integration) là chạy tự động các bước kiểm tra (cài dependency, test, build) mỗi khi có thay đổi code. **CD** (Continuous Deployment/Delivery) là tự động đưa thay đổi đã qua kiểm tra lên staging hoặc production. Ngay cả khi chỉ một mình bạn code (kể cả cùng AI), CI vẫn hữu ích: nó là người gác cổng không bao giờ quên chạy test, không bị cám dỗ bỏ qua bước kiểm tra vì "chắc không sao đâu" lúc đang vội.

## Một workflow thật, giải thích từng dòng

GitHub Actions là dịch vụ CI/CD miễn phí cho repo công khai (và có hạn mức miễn phí cho repo riêng), tích hợp sẵn trong GitHub. Tạo file `.github/workflows/kiem-tra.yml` trong dự án:

```yaml
name: Kiểm tra trước khi deploy

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test-va-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Cài dependency
        run: npm ci
      - name: Chạy test
        run: npm test
      - name: Build
        run: npm run build
```

- `on:` - workflow chạy khi nào: mỗi lần có pull request nhắm vào `main`, và mỗi lần có push thẳng vào `main`.
- `runs-on: ubuntu-latest` - GitHub tự cấp một máy ảo Ubuntu sạch để chạy, bạn không cần tự chuẩn bị máy.
- `actions/checkout@v4` - tải code của bạn vào máy ảo đó (không có bước này thì máy ảo trống, không có gì để test).
- `actions/setup-node@v4` - cài Node.js đúng phiên bản bạn khai báo; `cache: 'npm'` giúp lần chạy sau nhanh hơn vì không phải tải lại dependency đã tải trước đó.
- `npm ci` - cài dependency đúng y hệt phiên bản ghi trong lockfile (`package-lock.json`), khác `npm install` ở chỗ không tự ý nâng cấp phiên bản nào - quan trọng để CI test đúng cái bạn thật sự sẽ deploy.
- `npm test`, `npm run build` - đổi thành đúng lệnh test/build dự án bạn đang dùng; nếu dự án chưa có test, tạm thời bỏ dòng này và ghi lại trong backlog là việc cần thêm.

Đây chính là dạng workflow bản thân thư viện Học AI Việt đang dùng thật để tự kiểm tra mỗi khi có thay đổi, không phải ví dụ lý thuyết.

## Không phải dự án nào cũng có "test" theo nghĩa truyền thống

Một trang tĩnh HTML/CSS/JS thuần như dự án [landing page](../09-du-an-thuc-hanh/du-an-01-landing-page/spec.md) không có bước build hay test tự động. CI vẫn có ích: ít nhất kiểm tra không có lỗi cú pháp HTML/JS rõ ràng, hoặc kiểm tra link nội bộ không bị chết trước khi deploy - "kiểm tra tự động" không nhất thiết phải là unit test, miễn nó bắt được lỗi sớm hơn một cặp mắt người mệt mỏi lúc 11 giờ đêm.

## Preview trước khi production

Nhiều nền tảng deploy miễn phí (xem lại [deploy miễn phí](03-deploy-mien-phi.md)) tự tạo một **preview deployment** riêng cho mỗi pull request - một URL tạm để bạn hoặc người khác xem trước khi merge vào `main` và đẩy lên production thật. Thói quen tốt: luôn merge qua pull request thay vì push thẳng vào `main`, để có cơ hội xem preview và để CI chạy xong trước khi thay đổi chạm tới người dùng thật.

## Bài tập

Thêm file workflow ở trên vào một dự án của bạn (đổi đúng lệnh test/build, hoặc bỏ dòng test nếu dự án tĩnh không cần). Tạo một pull request nhỏ (ví dụ sửa một dòng chữ), xem tab **Actions** trên GitHub để thấy workflow tự chạy, và xem trạng thái pull request báo xanh (đạt) hay đỏ (lỗi) trước khi merge.

## Checklist đạt bài

- [ ] Có file workflow CI chạy tự động khi có pull request/push.
- [ ] Giải thích được từng bước trong workflow làm gì.
- [ ] Biết phân biệt `npm ci` và `npm install`.
- [ ] Tự thấy được workflow chạy thật trên tab Actions của GitHub.
- [ ] Biết vì sao nên merge qua pull request thay vì push thẳng vào `main`.

## Bước tiếp theo

Kiểm tra tự động đã có, giờ tới lúc biết sản phẩm đang chạy ra sao sau khi lên production: [Log, monitoring và cảnh báo chi phí →](08-log-monitoring-va-chi-phi.md)
