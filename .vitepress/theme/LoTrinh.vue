<script setup>
// Lộ trình 5 cấp cho trang chủ - trả lời đúng nỗi sợ "wall of kiến thức":
// không phải đọc hết 12 phần mới thấy mình tiến bộ, mà có 5 mốc rõ ràng,
// mỗi mốc 5 bài đã có sẵn trong repo (không phải bài mới), tick được và
// lưu lại trên máy để người đọc thấy tiến độ của chính mình.
//
// Đường dẫn không có ".md" vì VitePress build ra URL sạch (cleanUrls: true
// trong config.mts). Đây KHÔNG thay thế chuỗi "Bước tiếp theo" đầy đủ - vẫn
// còn nguyên, chỉ là một lớp lộ trình rút gọn nằm phía trên.
// Icon dạng vector (không dùng emoji) cho huy hiệu mỗi cấp - xem lý do ở
// 02-code-voi-ai/19-font-va-icon.md. Mỗi mục là phần bên trong một <svg
// viewBox="0 0 24 24">, style stroke đồng bộ đặt sẵn ở nơi render.
const ICON = {
  compass: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.5 13 13l-3.5 1.5L11 11z" stroke-linejoin="round"/>',
  globe: '<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><ellipse cx="12" cy="12" rx="4" ry="9"/>',
  database: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  bot: '<rect x="5" y="9" width="14" height="10" rx="2"/><line x1="12" y1="5" x2="12" y2="9"/><circle cx="12" cy="4" r="1" fill="currentColor" stroke="none"/><circle cx="9" cy="14" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1" fill="currentColor" stroke="none"/>',
  rocket: '<path d="M12 3l4 6v6l-4 4-4-4V9z" stroke-linejoin="round"/><circle cx="12" cy="10" r="1.4" fill="currentColor" stroke="none"/><path d="M8 15l-2 4M16 15l2 4"/>',
  flag: '<path d="M5 3v18M5 4h13l-3 4 3 4H5" stroke-linejoin="round"/>',
}

const CAP = [
  {
    ten: 'Hiểu AI trong một buổi',
    huyHieu: 'compass',
    thanhTich: 'Dùng chatbot làm xong một việc thật trong công việc của bạn',
    bai: [
      { link: '/00-ban-do-gioi-ai/00-ai-lam-duoc-gi', ten: 'AI làm được gì, và cảnh giác "mỏ vàng"' },
      { link: '/00-ban-do-gioi-ai/01-ai-la-gi', ten: 'Phân biệt AI, ML, Deep Learning, GenAI' },
      { link: '/00-ban-do-gioi-ai/02-llm-la-gi', ten: 'LLM là gì: token, context, temperature' },
      { link: '/01-bat-dau-tu-so-0/01-tu-duy-hoc-voi-ai', ten: 'Học đúng cách: hiểu để sửa, không copy mù' },
      { link: '/00-ban-do-gioi-ai/06-tu-dien-thuat-ngu', ten: 'Từ điển thuật ngữ (bookmark để tra khi cần)' },
    ],
  },
  {
    ten: 'Trang web đầu tiên lên mạng',
    huyHieu: 'globe',
    thanhTich: 'Một link public gửi được cho bạn bè bấm vào xem',
    bai: [
      { link: '/01-bat-dau-tu-so-0/02-cai-dat-moi-truong', ten: 'Cài VS Code, Git, Node, Python' },
      { link: '/02-code-voi-ai/01-cai-mot-coding-agent', ten: 'Cài một coding agent, chạy task đầu tiên' },
      { link: '/02-code-voi-ai/03-du-an-dau-tien', ten: 'Build web app đầu tiên chỉ bằng mô tả tiếng Việt' },
      { link: '/02-code-voi-ai/05-git-github-co-ban', ten: 'Lưu code lên GitHub, không sợ mất' },
      { link: '/03-ha-tang-thuc-chien/03-deploy-mien-phi', ten: 'Deploy miễn phí - web của bạn có link thật' },
    ],
  },
  {
    ten: 'Sản phẩm có dữ liệu thật',
    huyHieu: 'database',
    thanhTich: 'App có đăng nhập, lưu được dữ liệu, chạy trên hosting thật',
    bai: [
      { link: '/01-bat-dau-tu-so-0/10-file-web-va-server-hoat-dong-the-nao', ten: 'Hiểu client-server, request/response' },
      { link: '/01-bat-dau-tu-so-0/11-json-api-database-crud', ten: 'JSON, API, database và CRUD' },
      { link: '/02-code-voi-ai/13-codex-sua-code-test-va-review', ten: 'Đọc diff, chạy test, review code AI viết' },
      { link: '/03-ha-tang-thuc-chien/06-database-production-backup', ten: 'Database production: migration và backup thật' },
      { link: '/09-du-an-thuc-hanh/du-an-02-quan-ly-don-hang/spec', ten: 'Dự án: app quản lý đơn hàng có đăng nhập' },
    ],
  },
  {
    ten: 'Sản phẩm có AI',
    huyHieu: 'bot',
    thanhTich: 'Chatbot đọc tài liệu riêng, có bộ eval tự chấm',
    bai: [
      { link: '/04-build-ung-dung-ai/01-goi-api-llm', ten: 'Gọi API LLM, tính chi phí token' },
      { link: '/04-build-ung-dung-ai/02-rag-la-gi-va-build', ten: 'RAG: cho AI đọc tài liệu riêng của bạn' },
      { link: '/04-build-ung-dung-ai/06-structured-output-evals-va-reliability', ten: 'Structured output và tool use đáng tin' },
      { link: '/04-build-ung-dung-ai/07-evals-va-prompt-versioning', ten: 'Bộ eval tự chấm, không đoán mò' },
      { link: '/09-du-an-thuc-hanh/du-an-03-chatbot-tai-lieu/spec', ten: 'Dự án: chatbot RAG hỏi đáp tài liệu' },
    ],
  },
  {
    ten: 'Cho người khác dùng, và thu tiền',
    huyHieu: 'rocket',
    thanhTich: 'Có người dùng thật, viết được case study của chính bạn',
    bai: [
      { link: '/08-chuan-hoa-du-an/06-setup-mot-lan-de-agent-tu-chay', ten: 'Setup một lần, giao việc trọn gói cho agent' },
      { link: '/10-bao-mat/01-checklist-truoc-khi-public', ten: 'Checklist bảo mật trước khi public' },
      { link: '/10-bao-mat/07-bao-mat-ung-dung-ai', ten: 'Chống prompt injection và rủi ro AI' },
      { link: '/11-ra-thi-truong/04-xac-thuc-van-de-va-analytics', ten: 'Xác thực vấn đề thật, đo bằng analytics' },
      { link: '/09-du-an-thuc-hanh/04-rubric-va-capstone', ten: 'Rubric tự chấm và capstone của riêng bạn' },
    ],
  },
]

import { reactive, computed, onMounted } from 'vue'

const KHOA = 'hocai-tien-do-v1'
const daXong = reactive({})

onMounted(() => {
  try {
    Object.assign(daXong, JSON.parse(localStorage.getItem(KHOA) || '{}'))
  } catch (e) {}
})

function luuLai() {
  try {
    localStorage.setItem(KHOA, JSON.stringify(daXong))
  } catch (e) {}
}

function doiTrangThai(link) {
  daXong[link] = !daXong[link]
  luuLai()
}

function xoaTienDo() {
  if (typeof window !== 'undefined' && !window.confirm('Xoá toàn bộ tiến độ đã tick trên trình duyệt này?')) return
  for (const k of Object.keys(daXong)) delete daXong[k]
  luuLai()
}

function soXongCua(cap) {
  return cap.bai.filter((b) => daXong[b.link]).length
}

const tongSoBai = CAP.reduce((n, c) => n + c.bai.length, 0)
const tongSoXong = computed(() => CAP.reduce((n, c) => n + soXongCua(c), 0))
const phanTramTong = computed(() => Math.round((tongSoXong.value / tongSoBai) * 100))
</script>

<template>
  <div class="lo-trinh">
    <div class="tong">
      <div class="tong-so">
        Tiến độ của bạn: <strong>{{ tongSoXong }}/{{ tongSoBai }}</strong> bài mốc ({{ phanTramTong }}%)
      </div>
      <div class="thanh-tong"><div class="thanh-tong-fill" :style="{ width: phanTramTong + '%' }" /></div>
      <button v-if="tongSoXong > 0" class="reset" type="button" @click="xoaTienDo">Xoá tiến độ đã lưu</button>
    </div>

    <div v-for="(cap, i) in CAP" :key="cap.ten" class="cap" :class="{ xong: soXongCua(cap) === cap.bai.length }">
      <div class="cap-dau">
        <span class="cap-huy-hieu">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="ICON[cap.huyHieu]" />
        </span>
        <div class="cap-chu">
          <div class="cap-ten">Cấp {{ i }} · {{ cap.ten }}</div>
          <div class="cap-thanh-tich">
            <svg class="icon-flag" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="ICON.flag" />
            {{ cap.thanhTich }}
          </div>
        </div>
        <div class="cap-dem">{{ soXongCua(cap) }}/{{ cap.bai.length }}</div>
      </div>
      <!-- Mỗi bài là một thẻ: ảnh thumbnail (sinh bởi scripts/tao-thumbnail.mjs, bản 480px
           ở /thumb/nho/...), bên dưới là ô tick + tên bài. Ảnh chỉ là minh họa (alt rỗng),
           tên bài mới là nội dung đọc được. -->
      <ul class="cap-bai">
        <li v-for="b in cap.bai" :key="b.link" class="the" :class="{ 'da-xong': daXong[b.link] }">
          <a :href="b.link" class="the-anh" tabindex="-1" aria-hidden="true">
            <!-- Thiếu ảnh (chưa chạy npm run tao-thumbnail ở máy dev) thì ẩn khung ảnh, thẻ vẫn dùng được. -->
            <img :src="'/thumb/nho' + b.link + '.png'" alt="" loading="lazy" width="480" height="252" @error="$event.target.closest('.the-anh').hidden = true" />
          </a>
          <div class="the-chu">
            <input
              type="checkbox"
              :checked="!!daXong[b.link]"
              :aria-label="'Đánh dấu đã xong: ' + b.ten"
              @change="doiTrangThai(b.link)"
            />
            <a :href="b.link">{{ b.ten }}</a>
          </div>
        </li>
      </ul>
    </div>

    <p class="ghi-chu">
      Tiến độ lưu ngay trên trình duyệt này (không đồng bộ giữa các máy, không gửi đi đâu) - tick để tự
      theo dõi, không ai chấm điểm bạn. Đây là 25 bài mốc rút gọn; toàn bộ nội dung đầy đủ vẫn còn nguyên
      trong mục lục và sidebar bên trái.
    </p>
  </div>
</template>

<style scoped>
.lo-trinh {
  margin: 24px 0;
}
.tong {
  margin-bottom: 20px;
}
.tong-so {
  font-weight: 600;
  margin-bottom: 6px;
}
.thanh-tong {
  height: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}
.thanh-tong-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}
.reset {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 2px 8px;
  cursor: pointer;
}
.reset:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-2);
}

.cap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 12px;
  transition: border-color 0.2s ease;
}
.cap.xong {
  border-color: var(--vp-c-brand-1);
}
.cap-dau {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cap-huy-hieu {
  display: inline-flex;
  filter: grayscale(1);
  opacity: 0.5;
  line-height: 1;
}
.cap.xong .cap-huy-hieu {
  filter: none;
  opacity: 1;
}
.cap-chu {
  flex: 1;
  min-width: 0;
}
.cap-ten {
  font-weight: 600;
}
.cap-thanh-tich {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}
.icon-flag {
  flex-shrink: 0;
}
.cap-dem {
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.cap-bai {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 16px 12px;
}
.the {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
}
.the-anh {
  display: block;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: #000;
  line-height: 0;
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.2s ease;
}
.the-anh:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}
.the-anh img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1200 / 630;
  margin: 0;
}
.the.da-xong .the-anh {
  opacity: 0.5;
}
.the-chu {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13.5px;
  line-height: 1.35;
}
.the-chu input {
  margin-top: 3px;
  cursor: pointer;
  flex-shrink: 0;
}
.the-chu a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-weight: 500;
}
.the-chu a:hover {
  color: var(--vp-c-brand-1);
}
.the.da-xong .the-chu a {
  color: var(--vp-c-text-2);
  text-decoration: line-through;
}
@media (prefers-reduced-motion: reduce) {
  .the-anh, .the-anh:hover {
    transition: none;
    transform: none;
  }
}
/* Điện thoại: thẻ nằm ngang (ảnh trái, tên phải) để 5 bài không kéo quá dài.
   Phải đặt SAU các rule .the/.the-anh ở trên vì cùng độ ưu tiên, rule sau thắng. */
@media (max-width: 480px) {
  .cap-bai {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .the {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .the-anh {
    width: 128px;
    flex-shrink: 0;
  }
}

.ghi-chu {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 8px;
}
</style>
