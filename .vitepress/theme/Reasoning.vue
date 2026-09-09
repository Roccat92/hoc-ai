<script setup>
// Playground reasoning cao/thấp: minh họa SỰ ĐÁNH ĐỔI (không phải số đo thật) khi
// bật mức "suy luận" cao hay thấp, tùy độ khó của việc. Bài học cần rút ra: việc dễ
// bật reasoning cao gần như không tăng chính xác mà tốn thời gian + token gấp mấy lần;
// việc khó mới thật sự bõ công nghĩ sâu.
//
// Trung thực: đây là minh họa QUAN HỆ (hình dạng đánh đổi có thật, được ghi nhận rộng
// rãi), KHÔNG phải benchmark đo được - mức cụ thể tùy model và việc. Ghi rõ ở cuối.
import { ref, computed } from 'vue'

const VIEC = ['Việc dễ', 'Việc cỡ vừa', 'Việc khó']
const MUC = ['Thấp', 'Vừa', 'Cao']

// Độ chính xác theo [độ khó][mức reasoning]. Việc dễ: reasoning thấp đã gần trần,
// bật cao thêm không mấy. Việc khó: chênh lệch rất lớn giữa thấp và cao.
const CHINH_XAC = [
  [90, 93, 96],
  [68, 78, 88],
  [42, 64, 86]
]
// Thời gian chờ và token suy luận chủ yếu tăng theo mức reasoning.
const GIAY = [2, 6, 16]
const TOKEN_NHAN = [1, 3.5, 8]

// Phân loại từng ô để tô màu + chọn lời khuyên.
const LOAI = [
  ['tot', 'thuong', 'phi'],
  ['thuong', 'tot', 'thuong'],
  ['thieu', 'thuong', 'tot']
]
const LOI = [
  [
    'Ngọt nhất: việc dễ + reasoning thấp = đúng, nhanh, rẻ. Không cần bật cao.',
    'Vẫn đúng, nhưng đã chờ lâu hơn mà độ chính xác gần như không nhích.',
    'Phí công: chính xác gần y hệt mức thấp, mà chờ lâu và tốn token gấp mấy lần.'
  ],
  [
    'Tạm được, nhưng việc cỡ vừa dễ hụt vài bước — cân nhắc nhích mức lên.',
    'Cân bằng hợp lý cho việc cỡ vừa: chính xác khá, chi phí vừa phải.',
    'Chính xác nhích thêm chút, nhưng thời gian/chi phí tăng nhanh — thường không bõ.'
  ],
  [
    'Việc khó mà reasoning thấp = dễ sai, hụt bước. Đây là lúc KHÔNG nên tiết kiệm.',
    'Khá hơn nhiều rồi, nhưng việc khó thường vẫn còn dư địa nếu nghĩ sâu hơn.',
    'Đáng công: việc khó cần nghĩ sâu nên chính xác hơn hẳn — đổi lại chậm và tốn hơn.'
  ]
]

const kho = ref(2)  // mặc định việc khó...
const muc = ref(0)  // ...+ reasoning thấp, để bấm tăng mức thấy chính xác vọt lên

const cx = computed(() => CHINH_XAC[kho.value][muc.value])
const giay = computed(() => GIAY[muc.value])
const nhanToken = computed(() => TOKEN_NHAN[muc.value])
const loai = computed(() => LOAI[kho.value][muc.value])
const loi = computed(() => LOI[kho.value][muc.value])
</script>

<template>
  <div class="rs">
    <div class="rs__rows">
      <div class="rs__row">
        <span class="rs__row-nhan">Độ khó việc</span>
        <div class="rs__seg">
          <button
            v-for="(v, i) in VIEC" :key="v" type="button"
            class="rs__opt" :class="{ 'rs__opt--on': kho === i }"
            @click="kho = i"
          >{{ v }}</button>
        </div>
      </div>
      <div class="rs__row">
        <span class="rs__row-nhan">Mức reasoning</span>
        <div class="rs__seg">
          <button
            v-for="(v, i) in MUC" :key="v" type="button"
            class="rs__opt" :class="{ 'rs__opt--on': muc === i }"
            @click="muc = i"
          >{{ v }}</button>
        </div>
      </div>
    </div>

    <div class="rs__meters">
      <div class="rs__m">
        <div class="rs__m-top"><span>Độ chính xác</span><b>{{ cx }}%</b></div>
        <div class="rs__m-track"><span class="rs__m-fill rs__m-fill--ok" :style="{ width: cx + '%' }"></span></div>
      </div>
      <div class="rs__m">
        <div class="rs__m-top"><span>Thời gian chờ</span><b>≈ {{ giay }}s</b></div>
        <div class="rs__m-track"><span class="rs__m-fill rs__m-fill--cost" :style="{ width: (giay / 16 * 100) + '%' }"></span></div>
      </div>
      <div class="rs__m">
        <div class="rs__m-top"><span>Token suy luận</span><b>× {{ nhanToken }}</b></div>
        <div class="rs__m-track"><span class="rs__m-fill rs__m-fill--cost" :style="{ width: (nhanToken / 8 * 100) + '%' }"></span></div>
      </div>
    </div>

    <div class="rs__verdict" :class="'rs__verdict--' + loai">{{ loi }}</div>

    <p class="rs__note">
      Mấu chốt: <b>reasoning cao không "biết nhiều hơn"</b> — nó chỉ nghĩ kỹ hơn trước khi
      trả lời, nên tốn thêm token nháp và thời gian. Với việc dễ, phần nghĩ thêm đó gần như
      vô ích; với việc khó, nó mới tạo ra khác biệt. Đừng bật cao cho mọi việc — chỉ tổ chờ
      lâu và tốn tiền oan.
      <span class="rs__caveat">(Đây là minh họa quan hệ đánh đổi, không phải số đo thật — mức cụ thể tùy model và việc.)</span>
    </p>
  </div>
</template>

<style scoped>
.rs {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 18px;
  margin: 22px 0;
  background: var(--vp-c-bg-soft);
}

.rs__rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.rs__row { display: flex; align-items: center; gap: 12px; }
.rs__row-nhan { font-size: 13px; color: var(--vp-c-text-2); width: 108px; flex-shrink: 0; }
.rs__seg { display: inline-flex; border: 1px solid var(--vp-c-border); border-radius: 8px; overflow: hidden; }
.rs__opt {
  font-size: 13px;
  padding: 7px 16px;
  border: none;
  border-right: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}
.rs__opt:last-child { border-right: none; }
.rs__opt--on { background: var(--vp-c-brand-1); color: var(--vp-c-bg); font-weight: 600; }

.rs__meters { display: flex; flex-direction: column; gap: 12px; }
.rs__m-top { display: flex; justify-content: space-between; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 4px; }
.rs__m-top b { font-variant-numeric: tabular-nums; }
.rs__m-track {
  height: 12px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;
}
.rs__m-fill { display: block; height: 100%; border-radius: 6px; transition: width .18s ease; }
.rs__m-fill--ok { background: var(--vp-c-brand-1); opacity: .7; }
.rs__m-fill--cost { background: #d98a24; opacity: .8; }

.rs__verdict {
  font-size: 13.5px;
  line-height: 1.5;
  border-radius: 8px;
  padding: 11px 13px;
  margin-top: 16px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.rs__verdict--tot { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.rs__verdict--phi, .rs__verdict--thieu {
  border-color: rgba(217, 138, 36, .5);
  background: rgba(217, 138, 36, .1);
}

.rs__note {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  margin: 16px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}
.rs__caveat { opacity: .85; }

@media (max-width: 640px) {
  .rs__row { flex-direction: column; align-items: flex-start; gap: 5px; }
  .rs__row-nhan { width: auto; }
  .rs__seg { width: 100%; }
  .rs__opt { flex: 1; padding: 8px 6px; }
}
</style>
