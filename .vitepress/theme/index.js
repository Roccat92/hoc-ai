// Theme của web = theme mặc định VitePress + phần thêm của dự án:
// - minh-hoa.css: chuyển động cho các sơ đồ minh họa trong bài
// - <Vnd usd="20" />: quy đổi USD sang VND theo tỉ giá tự cập nhật (xem ty-gia.js)
// - <TyGia />: dòng ghi chú cho biết đang dùng tỉ giá nào
// - <LoTrinh />: lộ trình 5 cấp có tick tiến độ, dùng ở trang chủ (README.md)
import DefaultTheme from 'vitepress/theme'
import './minh-hoa.css'
import './ui-demo.css'
import Vnd from './Vnd.vue'
import TyGia from './TyGia.vue'
import LoTrinh from './LoTrinh.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Vnd', Vnd)
    app.component('TyGia', TyGia)
    app.component('LoTrinh', LoTrinh)
  }
}
