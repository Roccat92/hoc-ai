// Theme của web = theme mặc định VitePress + phần thêm của dự án:
// - minh-hoa.css: chuyển động cho các sơ đồ minh họa trong bài
// - <Vnd usd="20" />: quy đổi USD sang VND theo tỉ giá tự cập nhật (xem ty-gia.js)
// - <TyGia />: dòng ghi chú cho biết đang dùng tỉ giá nào
import DefaultTheme from 'vitepress/theme'
import './minh-hoa.css'
import Vnd from './Vnd.vue'
import TyGia from './TyGia.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Vnd', Vnd)
    app.component('TyGia', TyGia)
  }
}
