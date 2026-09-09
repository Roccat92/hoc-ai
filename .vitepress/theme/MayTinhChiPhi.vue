<script setup>
// Máy tính chi phí gọi API LLM: nhập số token + đơn giá -> ra tiền mỗi lần gọi
// và ước tính mỗi tháng, quy sang VND đã gồm VAT (tái dùng tỉ giá tự cập nhật
// chung của web ở ty-gia.js). Đây là "playground": kéo/nhập số là thấy đổi ngay.
//
// Nguyên tắc: KHÔNG chốt cứng giá model (giá đổi liên tục). Preset chỉ là ví dụ
// minh họa theo *hạng* model, có đánh dấu ngày; mọi ô giá đều sửa được, ai có
// giá thật thì gõ đè vào.
import { ref, computed, onMounted } from 'vue'
import { tiGia, THUE_VAT, layTiGia, laTiGiaThat } from './ty-gia.js'

// Ví dụ minh họa theo hạng model, USD cho mỗi 1 triệu token (kiểm tra: 09/2026).
// Số tròn để dễ hình dung khoảng cách giữa các hạng, KHÔNG phải giá chính thức.
const HANG = [
  { ten: 'Hạng nhẹ (mini / flash / haiku)', vao: 0.15, ra: 0.6 },
  { ten: 'Hạng trung (sonnet / gpt cỡ vừa)', vao: 3, ra: 15 },
  { ten: 'Đầu bảng (opus / gpt cỡ lớn)', vao: 15, ra: 75 }
]

const giaVao = ref(0.15)     // USD / 1 triệu token đầu vào
const giaRa = ref(0.6)       // USD / 1 triệu token đầu ra
const tokenVao = ref(1000)   // token đầu vào mỗi lần gọi
const tokenRa = ref(500)     // token đầu ra mỗi lần gọi
const soLan = ref(3000)      // số lần gọi mỗi tháng

onMounted(layTiGia)

function chonHang(h) {
  giaVao.value = h.vao
  giaRa.value = h.ra
}

const so = (v) => (Number.isFinite(+v) && +v >= 0 ? +v : 0)

// Chi phí 1 lần gọi, tính bằng USD (chưa thuế - đây là giá hãng niêm yết).
const usdMotLan = computed(
  () => (so(tokenVao.value) / 1e6) * so(giaVao.value)
    + (so(tokenRa.value) / 1e6) * so(giaRa.value)
)
const usdThang = computed(() => usdMotLan.value * so(soLan.value))

// Quy sang VND đã gồm VAT. Làm tròn "mềm" theo độ lớn để số nhỏ vẫn đọc được
// (doiSangVnd chung làm tròn tới nghìn, quá thô cho chi phí một lần gọi).
function vnd(usd) {
  const x = usd * (1 + THUE_VAT) * tiGia.value
  let buoc = 1
  if (x >= 100000) buoc = 1000
  else if (x >= 10000) buoc = 100
  else if (x >= 100) buoc = 10
  return (Math.round(x / buoc) * buoc).toLocaleString('vi-VN')
}

// USD hiển thị: số rất nhỏ thì cần nhiều chữ số sau dấu phẩy mới thấy được.
function usdText(x) {
  if (x === 0) return '$0'
  if (x >= 1) return '$' + x.toLocaleString('en-US', { maximumFractionDigits: 2 })
  if (x >= 0.01) return '$' + x.toFixed(3)
  return '$' + x.toFixed(6)
}
</script>

<template>
  <div class="mtc">
    <div class="mtc__presets">
      <span class="mtc__presets-nhan">Ví dụ theo hạng model:</span>
      <button
        v-for="h in HANG"
        :key="h.ten"
        type="button"
        class="mtc__preset"
        :class="{ 'mtc__preset--on': +giaVao === h.vao && +giaRa === h.ra }"
        @click="chonHang(h)"
      >{{ h.ten }}</button>
    </div>

    <div class="mtc__grid">
      <label class="mtc__f">
        <span>Giá token <b>đầu vào</b> <small>(USD / 1 triệu token)</small></span>
        <input type="number" min="0" step="0.01" v-model.number="giaVao" inputmode="decimal">
      </label>
      <label class="mtc__f">
        <span>Giá token <b>đầu ra</b> <small>(USD / 1 triệu token)</small></span>
        <input type="number" min="0" step="0.01" v-model.number="giaRa" inputmode="decimal">
      </label>
      <label class="mtc__f">
        <span>Token đầu vào <small>mỗi lần gọi</small></span>
        <input type="number" min="0" step="100" v-model.number="tokenVao" inputmode="numeric">
      </label>
      <label class="mtc__f">
        <span>Token đầu ra <small>mỗi lần gọi</small></span>
        <input type="number" min="0" step="100" v-model.number="tokenRa" inputmode="numeric">
      </label>
      <label class="mtc__f mtc__f--wide">
        <span>Số lần gọi <small>mỗi tháng</small></span>
        <input type="number" min="0" step="100" v-model.number="soLan" inputmode="numeric">
      </label>
    </div>

    <div class="mtc__out">
      <div class="mtc__card">
        <div class="mtc__card-nhan">Mỗi lần gọi</div>
        <div class="mtc__vnd">≈ {{ vnd(usdMotLan) }}đ</div>
        <div class="mtc__usd">{{ usdText(usdMotLan) }} <span>(giá hãng, chưa VAT)</span></div>
      </div>
      <div class="mtc__card mtc__card--to">
        <div class="mtc__card-nhan">Ước tính mỗi tháng · {{ so(soLan).toLocaleString('vi-VN') }} lần</div>
        <div class="mtc__vnd">≈ {{ vnd(usdThang) }}đ</div>
        <div class="mtc__usd">{{ usdText(usdThang) }} <span>(giá hãng, chưa VAT)</span></div>
      </div>
    </div>

    <p class="mtc__note">
      Số VND đã cộng VAT {{ Math.round(THUE_VAT * 100) }}% và quy đổi theo tỉ giá
      {{ laTiGiaThat ? 'thật, tự cập nhật' : 'dự phòng' }} (1 USD ≈ {{ Math.round(tiGia).toLocaleString('vi-VN') }}đ).
      Đơn giá điền sẵn chỉ là <b>ví dụ theo hạng model</b> — giá thật đổi liên tục,
      hãy tra trang pricing của hãng rồi gõ đè vào hai ô giá.
    </p>
  </div>
</template>

<style scoped>
.mtc {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 18px;
  margin: 22px 0;
  background: var(--vp-c-bg-soft);
}

.mtc__presets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.mtc__presets-nhan {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-right: 2px;
}
.mtc__preset {
  font-size: 13px;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: border-color .15s, background .15s;
}
.mtc__preset:hover { border-color: var(--vp-c-brand-1); }
.mtc__preset--on {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.mtc__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.mtc__f { display: flex; flex-direction: column; gap: 5px; }
.mtc__f--wide { grid-column: 1 / -1; max-width: 50%; }
.mtc__f > span { font-size: 13px; color: var(--vp-c-text-1); }
.mtc__f small { color: var(--vp-c-text-2); font-weight: 400; }
.mtc__f input {
  font-size: 15px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  width: 100%;
  box-sizing: border-box;
}
.mtc__f input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.mtc__out {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 18px;
}
.mtc__card {
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  padding: 14px 16px;
  background: var(--vp-c-bg);
}
.mtc__card--to {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.mtc__card-nhan { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px; }
.mtc__vnd {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.15;
}
.mtc__usd { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }
.mtc__usd span { opacity: .8; }

.mtc__note {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  margin: 16px 0 0;
}

@media (max-width: 640px) {
  .mtc__grid { grid-template-columns: 1fr; }
  .mtc__f--wide { max-width: none; }
  .mtc__out { grid-template-columns: 1fr; }
}
</style>
