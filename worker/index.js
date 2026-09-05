// Worker đứng trước phần assets tĩnh (xem wrangler.jsonc): việc duy nhất nó làm
// thêm so với chỉ deploy assets thuần là chặn hai domain phụ và 301 chúng về
// domain chính, để công cụ tìm kiếm dồn hết điểm xếp hạng vào một chỗ thay vì
// coi ba domain là ba bản sao nội dung giống hệt nhau.
//
// CHỈ liệt kê domain phụ thật sự cần gộp vào đây - KHÔNG thêm hoc-ai.*.workers.dev
// (bản chính thức lẫn bản preview theo PR), vì đó là domain nội bộ dùng để xem thử
// trước khi lên hocaiviet.com, không phải nơi cần dồn SEO.
const DOMAIN_CHINH = 'hocaiviet.com'
const DOMAIN_PHU = new Set(['ai.startee.vn', 'ai.starteex.app'])

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (DOMAIN_PHU.has(url.hostname)) {
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
