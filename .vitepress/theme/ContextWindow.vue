<script setup>
// Playground context window: ẩn dụ "cái bàn làm việc kích thước cố định" thành
// thao tác được. Hội thoại dài dần (bấm thêm lượt), cửa sổ chỉ giữ được các token
// GẦN NHẤT - khi tràn, phần cũ nhất bị đẩy khỏi tầm nhìn. Có một "lời dặn đầu cuộc"
// ghim ở trên: khi nó rớt ra, minh họa đúng lúc "AI quên điều bạn dặn lúc đầu".
//
// Kế toán token là THẬT (deterministic): duyệt từ tin mới nhất về cũ, cộng dồn tới
// khi chạm trần cửa sổ; mọi tin cũ hơn coi như ngoài tầm nhìn. Token là ước lượng thô.
import { ref, computed } from 'vue'

const BAN_DAU = [
  { ai: false, ghim: true, txt: 'Ghi nhớ giúp mình: mình tên Thư, xưng hô là "Thư" nhé.', tok: 40 },
  { ai: true, txt: 'Rõ rồi, mình sẽ gọi là Thư.', tok: 24 }
]

// Vài lượt hỏi–đáp mẫu để "thêm lượt" cho ra nội dung thật, xoay vòng.
const LUOT_MAU = [
  { hoi: 'Giải thích giúp mình REST API là gì, cho ví dụ dễ hiểu.', th: 190, ta: 300 },
  { hoi: 'Giờ viết một hàm Python đọc file CSV và tính trung bình cột giá.', th: 210, ta: 340 },
  { hoi: 'Bug: chạy lên báo KeyError "gia". Nguyên nhân có thể là gì?', th: 180, ta: 320 },
  { hoi: 'Ổn rồi. Thêm phần bỏ qua dòng trống và in ra số dòng đã đọc.', th: 200, ta: 300 }
]

const tinNhan = ref(BAN_DAU.map((m) => ({ ...m })))
const cua = ref(1200) // kích thước cửa sổ (token)
let dem = 0

function themLuot() {
  const m = LUOT_MAU[dem % LUOT_MAU.length]
  dem++
  tinNhan.value.push({ ai: false, txt: m.hoi, tok: m.th })
  tinNhan.value.push({ ai: true, txt: '(trả lời) ' + m.hoi.slice(0, 24) + '…', tok: m.ta })
}
function lamLai() {
  dem = 0
  tinNhan.value = BAN_DAU.map((m) => ({ ...m }))
}

// Duyệt từ tin mới nhất về cũ: cộng token tới khi chạm trần cửa sổ.
const trangThai = computed(() => {
  const res = new Array(tinNhan.value.length).fill(false)
  let acc = 0, tran = false
  for (let i = tinNhan.value.length - 1; i >= 0; i--) {
    if (!tran && acc + tinNhan.value[i].tok <= cua.value) {
      acc += tinNhan.value[i].tok
      res[i] = true
    } else {
      tran = true
    }
  }
  return res
})

const tongToken = computed(() => tinNhan.value.reduce((a, m) => a + m.tok, 0))
const dangThay = computed(() =>
  tinNhan.value.reduce((a, m, i) => a + (trangThai.value[i] ? m.tok : 0), 0)
)
const dauTamNhin = computed(() => trangThai.value.indexOf(true))
const quenLoiDan = computed(() =>
  tinNhan.value.some((m, i) => m.ghim && !trangThai.value[i])
)
const phanTramDay = computed(() => Math.min(100, Math.round((dangThay.value / cua.value) * 100)))
</script>

<template>
  <div class="cw">
    <div class="cw__ctrl">
      <label class="cw__f">
        <span>Kích thước cửa sổ <small>({{ cua.toLocaleString('vi-VN') }} token)</small></span>
        <input type="range" min="400" max="3000" step="100" v-model.number="cua">
      </label>
      <div class="cw__btns">
        <button type="button" class="cw__btn" @click="themLuot">+ Thêm một lượt hỏi–đáp</button>
        <button type="button" class="cw__btn cw__btn--phu" @click="lamLai">Làm lại</button>
      </div>
    </div>

    <div class="cw__meter">
      <div class="cw__meter-track"><span class="cw__meter-fill" :style="{ width: phanTramDay + '%' }"></span></div>
      <div class="cw__meter-txt">
        Trên bàn: <b>{{ dangThay.toLocaleString('vi-VN') }}</b> / {{ cua.toLocaleString('vi-VN') }} token
        <span v-if="tongToken > cua">· hội thoại đã dài {{ tongToken.toLocaleString('vi-VN') }} token, phần cũ tràn ra ngoài</span>
      </div>
    </div>

    <div class="cw__banner" v-if="quenLoiDan">
      Lời dặn đầu cuộc đã <b>rớt khỏi cửa sổ</b> — giờ hỏi "mình tên gì?", AI không còn thấy để trả lời "Thư" nữa.
    </div>

    <div class="cw__chat">
      <template v-for="(m, i) in tinNhan" :key="i">
        <div v-if="i === dauTamNhin && dauTamNhin > 0" class="cw__mep">── mép bàn · phía trên đã ngoài tầm nhìn của AI ──</div>
        <div
          class="cw__msg"
          :class="[m.ai ? 'cw__msg--ai' : 'cw__msg--nguoi', { 'cw__msg--ngoai': !trangThai[i] }]"
        >
          <span class="cw__msg-vai">{{ m.ai ? 'AI' : 'Bạn' }}<span v-if="m.ghim" class="cw__ghim">lời dặn</span></span>
          <span class="cw__msg-txt">{{ m.txt }}</span>
          <span class="cw__msg-tok">{{ m.tok }}t</span>
        </div>
      </template>
    </div>

    <p class="cw__note">
      Cửa sổ chỉ giữ được các token <b>gần nhất</b>. Hội thoại càng dài, phần cũ nhất càng
      bị đẩy ra — đó là lý do AI đôi khi "quên" điều bạn nói lúc đầu, dù vẫn trong cùng
      một cuộc chat. Cửa sổ to hơn thì giữ được lâu hơn, nhưng token nào cũng tính tiền và
      làm chậm; nên khi thread quá dài, mở cuộc mới và tóm tắt lại điều cần nhớ vẫn tốt hơn
      là kéo vô hạn. <span class="cw__caveat">(Token ở đây là ước lượng thô để hình dung.)</span>
    </p>
  </div>
</template>

<style scoped>
.cw {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 18px;
  margin: 22px 0;
  background: var(--vp-c-bg-soft);
}

.cw__ctrl {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 16px;
  margin-bottom: 14px;
}
.cw__f { display: flex; flex-direction: column; gap: 5px; }
.cw__f > span { font-size: 13px; color: var(--vp-c-text-1); }
.cw__f small { color: var(--vp-c-text-2); font-weight: 400; }
.cw__f input[type=range] { width: 100%; accent-color: var(--vp-c-brand-1); }
.cw__btns { display: flex; gap: 8px; }
.cw__btn {
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  cursor: pointer;
  white-space: nowrap;
}
.cw__btn:hover { opacity: .9; }
.cw__btn--phu { background: transparent; color: var(--vp-c-text-1); border-color: var(--vp-c-border); }

.cw__meter { margin-bottom: 12px; }
.cw__meter-track {
  height: 12px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;
}
.cw__meter-fill {
  display: block;
  height: 100%;
  background: var(--vp-c-brand-1);
  opacity: .7;
  border-radius: 6px;
  transition: width .15s linear;
}
.cw__meter-txt { font-size: 12px; color: var(--vp-c-text-2); margin-top: 5px; }

.cw__banner {
  font-size: 13px;
  line-height: 1.5;
  color: #b9701a;
  background: rgba(217, 138, 36, .1);
  border: 1px solid rgba(217, 138, 36, .4);
  border-radius: 8px;
  padding: 9px 12px;
  margin-bottom: 12px;
}

.cw__chat { display: flex; flex-direction: column; gap: 6px; }
.cw__mep {
  text-align: center;
  font-size: 11px;
  color: var(--vp-c-text-2);
  letter-spacing: .2px;
  margin: 4px 0;
}
.cw__msg {
  display: grid;
  grid-template-columns: 62px 1fr auto;
  align-items: baseline;
  gap: 10px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  font-size: 13px;
}
.cw__msg--ai { background: var(--vp-c-bg-soft); }
.cw__msg--ngoai { opacity: .38; filter: grayscale(.6); }
.cw__msg-vai { font-size: 11px; font-weight: 700; color: var(--vp-c-text-2); display: flex; align-items: center; gap: 5px; }
.cw__ghim {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.cw__msg-txt { color: var(--vp-c-text-1); line-height: 1.4; }
.cw__msg-tok { font-size: 11px; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; }

.cw__note {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  margin: 16px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}
.cw__caveat { opacity: .85; }

@media (max-width: 640px) {
  .cw__ctrl { grid-template-columns: 1fr; align-items: stretch; }
  .cw__btns { flex-wrap: wrap; }
  .cw__msg { grid-template-columns: 46px 1fr auto; gap: 7px; }
}
</style>
