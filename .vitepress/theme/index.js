// Theme của web = theme mặc định VitePress + phần thêm của dự án:
// - minh-hoa.css: chuyển động cho các sơ đồ minh họa trong bài
// - <Vnd usd="20" />: quy đổi USD sang VND theo tỉ giá tự cập nhật (xem ty-gia.js)
// - <TyGia />: dòng ghi chú cho biết đang dùng tỉ giá nào
// - <LoTrinh />: lộ trình 5 cấp có tick tiến độ, dùng ở trang chủ (README.md)
// - <MayTinhChiPhi />: máy tính chi phí gọi API LLM (token -> VND), dùng ở bài 04-01
// - <RagChunking />: playground cắt mẩu RAG (chunk size / overlap / top-k), dùng ở bài 04-02
// - <Temperature />: playground temperature (softmax) - kéo để thấy ổn định vs sáng tạo, bài 00-02
import DefaultTheme from 'vitepress/theme'
import './minh-hoa.css'
import './ui-demo.css'
import Vnd from './Vnd.vue'
import TyGia from './TyGia.vue'
import LoTrinh from './LoTrinh.vue'
import MayTinhChiPhi from './MayTinhChiPhi.vue'
import RagChunking from './RagChunking.vue'
import Temperature from './Temperature.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Vnd', Vnd)
    app.component('TyGia', TyGia)
    app.component('LoTrinh', LoTrinh)
    app.component('MayTinhChiPhi', MayTinhChiPhi)
    app.component('RagChunking', RagChunking)
    app.component('Temperature', Temperature)
  }
}
