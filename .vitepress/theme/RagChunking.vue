<script setup>
// Playground RAG: minh họa "núm" quan trọng nhất khi build RAG - kích thước mẩu
// (chunk size) và phần gối đầu (overlap). Người đọc kéo số là thấy ngay:
//  - Tài liệu bị cắt thành mấy mẩu.
//  - Câu trả lời còn nằm gọn trong MỘT mẩu không, hay bị xé qua nhiều mẩu.
//  - Token gửi cho model mỗi câu hỏi (top-k × cỡ mẩu) so với nhét cả tài liệu.
//
// Trung thực: việc cắt mẩu ở đây là THẬT (deterministic), không giả lập điểm số
// "gần nghĩa" của retrieval - phần đó cần embedding thật. Demo chỉ cho thấy mặt
// cơ học (cắt/gối/độ phủ) và mặt chi phí; xem ghi chú cuối.
import { ref, computed } from 'vue'

// "Tài liệu công ty" mẫu. Câu trả lời cho "Nghỉ phép mấy ngày?" là một câu nằm
// giữa tài liệu - đủ dài để thấy rõ hiện tượng bị cắt đôi khi mẩu quá nhỏ.
const TAI_LIEU =
  'Sổ tay nhân viên công ty Mây Xanh. Giờ làm việc từ tám giờ sáng đến năm giờ ' +
  'chiều, nghỉ trưa một tiếng. Nhân viên chính thức được nghỉ phép mười hai ngày ' +
  'mỗi năm, cộng thêm một ngày cho mỗi hai năm thâm niên. Đơn xin nghỉ phải gửi ' +
  'trước ít nhất ba ngày làm việc. Công ty hỗ trợ bữa trưa và gửi xe miễn phí. ' +
  'Máy tính cấp cho nhân viên phải cài phần mềm bảo mật của phòng kỹ thuật trước ' +
  'khi kết nối mạng nội bộ.'

const CAU_TRA_LOI =
  'Nhân viên chính thức được nghỉ phép mười hai ngày mỗi năm, cộng thêm một ngày ' +
  'cho mỗi hai năm thâm niên.'

const tuTaiLieu = TAI_LIEU.split(/\s+/)
const tuTraLoi = CAU_TRA_LOI.split(/\s+/)

// Vị trí (theo chỉ số từ) của câu trả lời trong tài liệu.
const dapAn = (() => {
  for (let i = 0; i + tuTraLoi.length <= tuTaiLieu.length; i++) {
    let khop = true
    for (let j = 0; j < tuTraLoi.length; j++) {
      if (tuTaiLieu[i + j] !== tuTraLoi[j]) { khop = false; break }
    }
    if (khop) return { dau: i, cuoi: i + tuTraLoi.length - 1 }
  }
  return { dau: -1, cuoi: -1 }
})()

const coMau = ref(20)   // số từ mỗi mẩu
const goiDau = ref(0)   // số từ gối đầu giữa hai mẩu liền nhau
const topK = ref(3)     // số mẩu lấy ra cho mỗi câu hỏi

// Gối đầu luôn nhỏ hơn cỡ mẩu.
const goiToiDa = computed(() => Math.max(0, coMau.value - 2))
const goiThat = computed(() => Math.min(goiDau.value, goiToiDa.value))

const cacMau = computed(() => {
  const buoc = Math.max(1, coMau.value - goiThat.value)
  const ds = []
  for (let i = 0; i < tuTaiLieu.length; i += buoc) {
    const cuoi = Math.min(i + coMau.value, tuTaiLieu.length)
    ds.push({ dau: i, cuoi: cuoi - 1 }) // chỉ số từ đầu..cuoi (bao gồm)
    if (cuoi >= tuTaiLieu.length) break
  }
  return ds
})

// Một mẩu chứa TRỌN câu trả lời khi bao phủ cả câu.
function chuaTronDapAn(m) {
  return dapAn.dau >= 0 && m.dau <= dapAn.dau && m.cuoi >= dapAn.cuoi
}
const conNguyen = computed(() => cacMau.value.some(chuaTronDapAn))

// Câu trả lời dài bao nhiêu từ - để phân biệt hai nguyên nhân "bị xé":
// mẩu nhỏ hơn cả câu (phải tăng cỡ mẩu) vs mẩu đủ to nhưng ranh giới cắt ngang
// (tăng gối đầu là cứu được).
const doDaiDapAn = tuTraLoi.length
const mauNhoHonCau = computed(() => coMau.value < doDaiDapAn)

// Ước lượng token (thô): tiếng Việt ~2 token mỗi "từ" âm tiết.
const TOKEN_MOI_TU = 2
const tokenMoiCauHoi = computed(
  () => Math.min(topK.value, cacMau.value.length) * coMau.value * TOKEN_MOI_TU
)
const tokenCaTaiLieu = computed(() => tuTaiLieu.length * TOKEN_MOI_TU)

// Dựng chuỗi hiển thị cho một mẩu, đánh dấu các từ thuộc câu trả lời.
function tuCuaMau(m) {
  const out = []
  for (let i = m.dau; i <= m.cuoi; i++) {
    out.push({ chu: tuTaiLieu[i], la: i >= dapAn.dau && i <= dapAn.cuoi })
  }
  return out
}
</script>

<template>
  <div class="rag">
    <div class="rag__doc">
      <span class="rag__doc-nhan">Tài liệu mẫu · câu hỏi: <b>"Nghỉ phép mấy ngày?"</b></span>
      <span class="rag__doc-goc">Phần <mark>tô đậm</mark> là câu chứa câu trả lời.</span>
    </div>

    <div class="rag__ctrl">
      <label class="rag__f">
        <span>Cỡ mẩu <small>({{ coMau }} từ)</small></span>
        <input type="range" min="6" max="40" step="2" v-model.number="coMau">
      </label>
      <label class="rag__f">
        <span>Gối đầu <small>({{ goiThat }} từ)</small></span>
        <input type="range" min="0" :max="goiToiDa" step="1" v-model.number="goiDau">
      </label>
      <label class="rag__f">
        <span>Số mẩu lấy ra <small>(top-{{ topK }})</small></span>
        <input type="range" min="1" max="5" step="1" v-model.number="topK">
      </label>
    </div>

    <div class="rag__mau">
      <div
        v-for="(m, i) in cacMau"
        :key="i"
        class="rag__chip"
        :class="{ 'rag__chip--dap': chuaTronDapAn(m) }"
      >
        <span class="rag__chip-nhan">mẩu {{ i + 1 }}<span v-if="chuaTronDapAn(m)"> ✓</span></span>
        <span class="rag__chip-noi"><span
          v-for="(t, j) in tuCuaMau(m)"
          :key="j"
          :class="{ 'rag__hl': t.la }"
        >{{ t.chu }}{{ ' ' }}</span></span>
      </div>
    </div>

    <div class="rag__out">
      <div class="rag__stat">
        <div class="rag__stat-so">{{ cacMau.length }}</div>
        <div class="rag__stat-nhan">mẩu tạo ra</div>
      </div>
      <div class="rag__stat" :class="conNguyen ? 'rag__stat--ok' : 'rag__stat--xau'">
        <div class="rag__stat-so">{{ conNguyen ? '✓' : '✗' }}</div>
        <div class="rag__stat-nhan">{{ conNguyen ? 'Câu trả lời nằm gọn trong 1 mẩu' : 'Câu trả lời bị xé qua nhiều mẩu' }}</div>
      </div>
      <div class="rag__stat">
        <div class="rag__stat-so">≈ {{ tokenMoiCauHoi.toLocaleString('vi-VN') }}</div>
        <div class="rag__stat-nhan">token gửi model mỗi câu hỏi<br><small>nhét cả tài liệu: ≈ {{ tokenCaTaiLieu.toLocaleString('vi-VN') }}</small></div>
      </div>
    </div>

    <p class="rag__note" v-if="!conNguyen && mauNhoHonCau">
      Mẩu ({{ coMau }} từ) còn <b>nhỏ hơn cả câu trả lời</b> ({{ doDaiDapAn }} từ) nên
      không cách nào chứa trọn — gối đầu bao nhiêu cũng vô ích. Phải <b>tăng cỡ mẩu</b> trước đã.
    </p>
    <p class="rag__note" v-else-if="!conNguyen">
      Mẩu đã đủ to, nhưng <b>ranh giới đang cắt ngang</b> câu trả lời nên không mẩu nào
      phủ trọn — retrieval dễ lấy nhầm nửa câu. Đây đúng lúc cần <b>tăng gối đầu (overlap)</b>
      để một mẩu chồm qua phủ hết câu.
    </p>
    <p class="rag__note" v-else>
      Câu trả lời đang nằm gọn trong một mẩu — retrieval lấy đúng mẩu đó là đủ trả lời.
      Nhưng để ý: mẩu càng to / top-k càng lớn thì token gửi model càng nhiều (tốn tiền hơn).
      Việc cần cân là <b>đủ ngữ cảnh</b> mà <b>không thừa</b>.
    </p>

    <p class="rag__caveat">
      Demo này cắt mẩu <b>thật</b> để bạn thấy mặt cơ học (cắt / gối / độ phủ) và chi phí.
      Việc chọn <i>đúng</i> mẩu nào gần nghĩa với câu hỏi là do embedding + vector database
      lo (không mô phỏng ở đây). Token là ước lượng thô (~2 token/từ tiếng Việt).
    </p>
  </div>
</template>

<style scoped>
.rag {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 18px;
  margin: 22px 0;
  background: var(--vp-c-bg-soft);
}

.rag__doc { display: flex; flex-direction: column; gap: 2px; margin-bottom: 14px; }
.rag__doc-nhan { font-size: 13px; color: var(--vp-c-text-1); }
.rag__doc-goc { font-size: 12px; color: var(--vp-c-text-2); }
.rag__doc mark, .rag__hl {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  border-radius: 3px;
  padding: 0 1px;
}

.rag__ctrl {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
  margin-bottom: 16px;
}
.rag__f { display: flex; flex-direction: column; gap: 4px; }
.rag__f > span { font-size: 13px; color: var(--vp-c-text-1); }
.rag__f small { color: var(--vp-c-text-2); font-weight: 400; }
.rag__f input[type=range] { width: 100%; accent-color: var(--vp-c-brand-1); }

.rag__mau {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.rag__chip {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 8px 10px;
  background: var(--vp-c-bg);
  max-width: 240px;
  font-size: 12.5px;
  line-height: 1.5;
}
.rag__chip--dap { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 1px var(--vp-c-brand-1) inset; }
.rag__chip-nhan {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  margin-bottom: 3px;
}
.rag__chip--dap .rag__chip-nhan { color: var(--vp-c-brand-1); }
.rag__chip-noi { color: var(--vp-c-text-1); }

.rag__out {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.rag__stat {
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  padding: 12px 14px;
  background: var(--vp-c-bg);
  text-align: center;
}
.rag__stat--ok { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.rag__stat--xau { border-color: #d98a24; background: rgba(217, 138, 36, .08); }
.rag__stat-so { font-size: 22px; font-weight: 700; color: var(--vp-c-text-1); line-height: 1.1; }
.rag__stat--xau .rag__stat-so { color: #b9701a; }
.rag__stat-nhan { font-size: 12px; color: var(--vp-c-text-2); margin-top: 5px; line-height: 1.4; }
.rag__stat-nhan small { opacity: .85; }

.rag__note {
  font-size: 13px;
  color: var(--vp-c-text-1);
  line-height: 1.55;
  margin: 16px 0 0;
}
.rag__caveat {
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 12px 0 0;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

@media (max-width: 640px) {
  .rag__ctrl { grid-template-columns: 1fr; gap: 10px; }
  .rag__out { grid-template-columns: 1fr; }
  .rag__chip { max-width: none; }
}
</style>
