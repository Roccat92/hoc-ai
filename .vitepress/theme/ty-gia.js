// Tỉ giá USD sang VND dùng chung cho cả web.
// Mọi giá USD trong bài được quy đổi qua đây, nên chỉ cần sửa/cập nhật một chỗ.
// Cách chạy: khi mở trang, trình duyệt lấy tỉ giá thật từ nguồn miễn phí (không cần
// đăng ký, không gửi thông tin gì của người đọc), nhớ lại 12 tiếng để khỏi gọi lại.
// Nếu mạng lỗi hoặc bị chặn thì dùng luôn số dự phòng bên dưới, trang vẫn hiện bình thường.
import { ref } from 'vue'

// Số dự phòng, cũng là số hiện ra trong bản build tĩnh trước khi trình duyệt lấy được tỉ giá thật.
export const TI_GIA_DU_PHONG = 26000

export const tiGia = ref(TI_GIA_DU_PHONG)
export const ngayTiGia = ref('')
export const laTiGiaThat = ref(false)

const KHOA_CACHE = 'hocai-ti-gia-usd-vnd'
const HAN_CACHE = 12 * 60 * 60 * 1000 // 12 tiếng

const NGUON = [
  {
    url: 'https://latest.currency-api.pages.dev/v1/currencies/usd.json',
    doc: (d) => [d && d.usd && d.usd.vnd, d && d.date]
  },
  {
    url: 'https://open.er-api.com/v6/latest/USD',
    doc: (d) => [d && d.rates && d.rates.VND, d && d.time_last_update_utc]
  }
]

let daChay = false

export function layTiGia() {
  if (daChay || typeof window === 'undefined') return
  daChay = true

  let conHan = false
  try {
    const luu = JSON.parse(localStorage.getItem(KHOA_CACHE) || 'null')
    if (luu && luu.tiGia > 1000) {
      tiGia.value = luu.tiGia
      ngayTiGia.value = luu.ngay || ''
      laTiGiaThat.value = true
      conHan = Date.now() - luu.luc < HAN_CACHE
    }
  } catch (e) {}
  if (conHan) return

  ;(async () => {
    for (const nguon of NGUON) {
      try {
        const res = await fetch(nguon.url)
        if (!res.ok) continue
        const [gia, ngay] = nguon.doc(await res.json())
        if (typeof gia === 'number' && gia > 1000) {
          tiGia.value = gia
          ngayTiGia.value = ngay || ''
          laTiGiaThat.value = true
          try {
            localStorage.setItem(
              KHOA_CACHE,
              JSON.stringify({ tiGia: gia, ngay: ngay || '', luc: Date.now() })
            )
          } catch (e) {}
          return
        }
      } catch (e) {}
    }
  })()
}

// Quy đổi và làm tròn cho dễ đọc: dưới 1 triệu làm tròn nghìn, từ 1 triệu làm tròn chục nghìn.
export function doiSangVnd(usd) {
  const so = Number(usd) * tiGia.value
  const buoc = so >= 1000000 ? 10000 : 1000
  return Math.round(so / buoc) * buoc
}
