<script setup>
// Playground temperature: minh họa ĐÚNG cơ chế thật - LLM chọn từ kế tiếp theo
// một danh sách xác suất, temperature làm phân phối đó "nhọn" (an toàn) hay "phẳng"
// (táo bạo). Đây là công thức softmax có chia temperature thật, không giả lập gọi API.
//
// Kéo temperature -> thanh xác suất mỗi từ tự giãn/co. Bấm "sinh thử" -> chọn từ
// theo đúng phân phối hiện tại, cho thấy: temp thấp gần như luôn ra một từ; temp
// cao ra đa dạng, và bắt đầu lòi ra từ "lạc".
import { ref, computed } from 'vue'

// Câu đang viết dở, và các từ có thể đứng tiếp. "diem" là điểm thô (logit) model
// gán cho mỗi từ trước khi tính xác suất - số cao = model thấy hợp lý hơn.
const CAU = 'Trời hôm nay đẹp, mình đi'
const TU = [
  { chu: 'dạo', diem: 2.6 },
  { chu: 'cà phê', diem: 2.2 },
  { chu: 'chụp ảnh', diem: 1.6 },
  { chu: 'leo núi', diem: 1.0 },
  { chu: 'ngủ', diem: 0.3 },
  { chu: 'lên Mặt Trăng', diem: -0.8, lac: true }
]

const temp = ref(0.7)

// Softmax có chia temperature. temp -> 0: gần như luôn chọn từ điểm cao nhất
// (phân phối dồn hết về một từ). temp lớn: các từ san bằng dần, từ "lạ" cũng có cửa.
const xacSuat = computed(() => {
  const diems = TU.map((t) => t.diem)
  if (temp.value <= 0.001) {
    const max = Math.max(...diems)
    return diems.map((d) => (d === max ? 1 : 0))
  }
  const chia = diems.map((d) => d / temp.value)
  const mx = Math.max(...chia)
  const mu = chia.map((s) => Math.exp(s - mx))
  const tong = mu.reduce((a, b) => a + b, 0)
  return mu.map((e) => e / tong)
})

const chiSoCao = computed(() => xacSuat.value.indexOf(Math.max(...xacSuat.value)))

function chon() {
  const p = xacSuat.value
  let r = Math.random(), c = 0
  for (let i = 0; i < p.length; i++) { c += p[i]; if (r <= c) return i }
  return p.length - 1
}

const ketQua = ref([])
function sinhThu() {
  const out = []
  for (let i = 0; i < 16; i++) out.push(chon())
  ketQua.value = out
}
const soTuKhac = computed(() => new Set(ketQua.value).size)

const pct = (x) => (x * 100 < 1 && x > 0 ? '<1' : Math.round(x * 100))
</script>

<template>
  <div class="tmp">
    <div class="tmp__cau">
      <span class="tmp__cau-txt">{{ CAU }} <span class="tmp__oval">___</span></span>
      <span class="tmp__cau-nhan">Model sẽ chọn từ nào điền vào chỗ trống?</span>
    </div>

    <label class="tmp__slider">
      <span>temperature = <b>{{ temp.toFixed(2) }}</b>
        <small v-if="temp <= 0.2">· rất ổn định</small>
        <small v-else-if="temp >= 1.3">· rất táo bạo</small>
        <small v-else>· cân bằng</small>
      </span>
      <input type="range" min="0" max="2" step="0.05" v-model.number="temp">
      <span class="tmp__slider-moc"><span>0 · an toàn</span><span>2 · phiêu</span></span>
    </label>

    <div class="tmp__bars">
      <div
        v-for="(t, i) in TU"
        :key="t.chu"
        class="tmp__bar"
        :class="{ 'tmp__bar--cao': i === chiSoCao, 'tmp__bar--lac': t.lac }"
      >
        <span class="tmp__bar-chu">{{ t.chu }}<span v-if="t.lac" class="tmp__tag">lạc đề</span></span>
        <span class="tmp__bar-track"><span class="tmp__bar-fill" :style="{ width: (xacSuat[i] * 100) + '%' }"></span></span>
        <span class="tmp__bar-pct">{{ pct(xacSuat[i]) }}%</span>
      </div>
    </div>

    <div class="tmp__sinh">
      <button type="button" class="tmp__btn" @click="sinhThu">Sinh thử 16 lần</button>
      <div class="tmp__chips" v-if="ketQua.length">
        <span
          v-for="(k, i) in ketQua"
          :key="i"
          class="tmp__chip"
          :class="{ 'tmp__chip--lac': TU[k].lac }"
        >{{ TU[k].chu }}</span>
      </div>
      <p class="tmp__ketluan" v-if="ketQua.length">
        16 lần sinh ra <b>{{ soTuKhac }}</b> từ khác nhau —
        <template v-if="soTuKhac === 1">temperature thấp nên lần nào cũng ra đúng một từ (đoán được, hợp việc cần chính xác).</template>
        <template v-else-if="soTuKhac <= 3">còn khá tập trung, đa dạng vừa phải.</template>
        <template v-else>rải rộng, sáng tạo nhưng dễ ra từ lạc như "lên Mặt Trăng".</template>
      </p>
    </div>

    <p class="tmp__note">
      Kéo temperature về gần <b>0</b>: xác suất dồn hết về từ hợp lý nhất, câu trả lời
      gần như cố định — hợp việc cần chính xác (viết code, trích xuất dữ liệu). Kéo
      <b>lên cao</b>: các từ san bằng dần, kể cả từ "lạc đề" cũng có cửa được chọn —
      đa dạng, sáng tạo hơn nhưng dễ chệch hướng. Đây chính là lý do hỏi cùng một câu
      hai lần có thể ra hai câu trả lời khác nhau.
    </p>
  </div>
</template>

<style scoped>
.tmp {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 18px;
  margin: 22px 0;
  background: var(--vp-c-bg-soft);
}

.tmp__cau { display: flex; flex-direction: column; gap: 3px; margin-bottom: 16px; }
.tmp__cau-txt { font-size: 16px; color: var(--vp-c-text-1); }
.tmp__oval {
  border-bottom: 2px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 700;
  padding: 0 2px;
}
.tmp__cau-nhan { font-size: 12px; color: var(--vp-c-text-2); }

.tmp__slider { display: flex; flex-direction: column; gap: 5px; margin-bottom: 16px; }
.tmp__slider > span:first-child { font-size: 13px; color: var(--vp-c-text-1); }
.tmp__slider small { color: var(--vp-c-text-2); font-weight: 400; }
.tmp__slider input[type=range] { width: 100%; accent-color: var(--vp-c-brand-1); }
.tmp__slider-moc {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.tmp__bars { display: flex; flex-direction: column; gap: 8px; }
.tmp__bar { display: grid; grid-template-columns: 110px 1fr 42px; align-items: center; gap: 10px; }
.tmp__bar-chu { font-size: 13px; color: var(--vp-c-text-1); display: flex; align-items: center; gap: 6px; }
.tmp__bar--cao .tmp__bar-chu { font-weight: 700; color: var(--vp-c-brand-1); }
.tmp__tag {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(217, 138, 36, .14);
  color: #b9701a;
  font-weight: 600;
}
.tmp__bar-track {
  height: 14px;
  border-radius: 7px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;
}
.tmp__bar-fill {
  display: block;
  height: 100%;
  background: var(--vp-c-brand-1);
  opacity: .55;
  border-radius: 7px;
  transition: width .12s linear;
}
.tmp__bar--cao .tmp__bar-fill { opacity: 1; }
.tmp__bar--lac .tmp__bar-fill { background: #d98a24; }
.tmp__bar-pct { font-size: 12px; color: var(--vp-c-text-2); text-align: right; font-variant-numeric: tabular-nums; }

.tmp__sinh { margin-top: 18px; }
.tmp__btn {
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  cursor: pointer;
}
.tmp__btn:hover { opacity: .9; }
.tmp__chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.tmp__chip {
  font-size: 12.5px;
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
}
.tmp__chip--lac { border-color: #d98a24; color: #b9701a; background: rgba(217, 138, 36, .08); }
.tmp__ketluan { font-size: 13px; color: var(--vp-c-text-1); line-height: 1.5; margin: 12px 0 0; }

.tmp__note {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  margin: 16px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

@media (max-width: 640px) {
  .tmp__bar { grid-template-columns: 92px 1fr 38px; gap: 8px; }
  .tmp__bar-chu { font-size: 12px; }
}
</style>
