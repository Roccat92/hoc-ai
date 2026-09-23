// Worker đứng trước phần assets tĩnh (xem wrangler.jsonc): việc duy nhất nó làm
// thêm so với chỉ deploy assets thuần là chặn hai domain phụ và 301 chúng về
// domain chính, để công cụ tìm kiếm dồn hết điểm xếp hạng vào một chỗ thay vì
// coi ba domain là ba bản sao nội dung giống hệt nhau.
//
// CHỈ liệt kê domain phụ thật sự cần gộp vào đây - KHÔNG thêm hoc-ai.*.workers.dev
// (bản chính thức lẫn bản preview theo PR), vì đó là domain nội bộ dùng để xem thử
// trước khi lên hocaiviet.com, không phải nơi cần dồn SEO.
const DOMAIN_CHINH = 'hocaiviet.com'
// www.hocaiviet.com hiện chưa có bản ghi DNS; thêm sẵn vào đây để khi nào gắn thêm
// domain đó vào worker (Cloudflare dashboard -> Workers -> Domains) nó tự 301 về apex.
const DOMAIN_PHU = new Set(['ai.startee.vn', 'ai.starteex.app', 'www.hocaiviet.com'])

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    // Hai trường hợp cần gom về đúng một địa chỉ chuẩn https://hocaiviet.com/...:
    // 1) domain phụ, 2) http:// không mã hóa trên domain chính (audit 23/09/2026 thấy
    //    http://hocaiviet.com/ trả 200 thay vì chuyển sang https - thành hai bản sao).
    const laDomainPhu = DOMAIN_PHU.has(url.hostname)
    const laHttpThuong = url.protocol === 'http:' && url.hostname === DOMAIN_CHINH
    if (laDomainPhu || laHttpThuong) {
      url.hostname = DOMAIN_CHINH
      url.protocol = 'https:'
      url.port = ''
      return Response.redirect(url.toString(), 301)
    }
    // Không phải domain cần redirect (domain chính hoặc *.workers.dev) -> phục vụ
    // bình thường từ thư mục assets đã build, không đổi hành vi gì thêm.
    return env.ASSETS.fetch(request)
  },
}
