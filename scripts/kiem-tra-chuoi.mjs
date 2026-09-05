// Dò chuỗi "Bước tiếp theo" từ bài đầu tiên của toàn bộ lộ trình, báo bài nào
// bị đứt mạch hoặc rớt khỏi đường đi chính. Chạy: node scripts/kiem-tra-chuoi.mjs
//
// Vì sao cần script này: mỗi bài kết bằng một liên kết thủ công "## Bước tiếp
// theo" trỏ sang bài kế tiếp. Chèn một bài mới vào giữa chuỗi rất dễ làm bài
// trước trỏ nhầm sang chỗ khác, khiến cả một mảng bài phía sau bị "rớt" khỏi
// đường đi chính mà không ai nhận ra cho tới khi có người đọc lần lượt.
import fs from 'node:fs'
import path from 'node:path'

const START = '00-ban-do-gioi-ai/00-ai-lam-duoc-gi.md'
const IGNORE_DIRS = new Set(['node_modules', '.git', '.vitepress'])

// 09-du-an-thuc-hanh/ không phải chuỗi bài học phẳng - đây là 3 dự án độc lập,
// mỗi dự án có spec.md/backlog.md/CLAUDE.md/huong-dan.md điều hướng bằng sidebar
// (xem PROJECT_FILE_ORDER trong .vitepress/config.mts), không phải bằng
// "Bước tiếp theo" trong nội dung. Khi chuỗi chính đi vào một trong các file
// này, dừng đi theo link tự động và chuyển sang kiểm tra riêng bằng HANDOFFS.
const PROJECT_FILE_RE = /^09-du-an-thuc-hanh\/du-an-\d+-[^/]+\/(spec|backlog|CLAUDE)\.md$/

// Các cặp (từ, phải-tới) phải đúng dù không đi qua bằng cách dò link tuần tự -
// dùng để xác nhận nhánh 09-du-an-thuc-hanh nối đúng vào từng dự án.
const HANDOFFS = [
  ['09-du-an-thuc-hanh/du-an-01-landing-page/huong-dan.md', '09-du-an-thuc-hanh/du-an-02-quan-ly-don-hang/spec.md'],
  ['09-du-an-thuc-hanh/du-an-02-quan-ly-don-hang/huong-dan.md', '09-du-an-thuc-hanh/du-an-03-chatbot-tai-lieu/spec.md'],
  ['09-du-an-thuc-hanh/du-an-03-chatbot-tai-lieu/huong-dan.md', '09-du-an-thuc-hanh/04-rubric-va-capstone.md'],
]

// Sau khi 09-du-an-thuc-hanh/ tạm dừng dò link tự động (gặp PROJECT_FILE_RE),
// chuỗi chính được nối tiếp thủ công từ đây để đi hết phần còn lại của lộ trình.
const RESUME_FROM = '09-du-an-thuc-hanh/04-rubric-va-capstone.md'

// Bài cuối cùng của toàn bộ lộ trình được phép trỏ ngược về một phần đã đi
// qua, khi đó là một tham chiếu có chủ đích (ví dụ: "giờ đi viết case study
// của bạn") chứ không phải đường học tiếp theo còn thiếu. Không dùng để che
// giấu một điểm nối bị đứt thật sự - chỉ thêm vào đây khi đã xác nhận thủ công.
const TERMINAL_REFERENCES = new Set(['11-ra-thi-truong/05-thanh-toan-email-va-van-hanh.md'])

const errors = []
const infos = []

function readLinks(file) {
  const txt = fs.readFileSync(file, 'utf8')
  const m = txt.match(/## Bước tiếp theo([\s\S]*)/)
  if (!m) return { links: null, error: 'KHÔNG CÓ mục "Bước tiếp theo"' }
  const links = [...m[1].matchAll(/\]\(([^)#]+?)(?:#[^)]*)?\)/g)]
    .map((x) => x[1])
    .filter((l) => !/^https?:\/\//.test(l))
  if (!links.length) return { links: null, error: 'Mục "Bước tiếp theo" không có link nội bộ nào' }
  return { links, error: null }
}

function resolveLink(from, link) {
  let nxt = path.posix.normalize(path.posix.join(path.posix.dirname(from), link))
  if (nxt.endsWith('/')) nxt += 'README.md'
  return nxt
}

// Đi theo "Bước tiếp theo" từ `start`, thêm từng trang đi qua vào `seen`
// (dùng chung một mảng cho toàn bộ hành trình để phát hiện vòng lặp xuyên
// suốt cả trước và sau khi tạm dừng ở 09-du-an-thuc-hanh/).
function walkChain(start, seen) {
  let cur = start
  while (cur) {
    if (seen.includes(cur)) {
      const from = seen[seen.length - 1]
      if (TERMINAL_REFERENCES.has(from)) {
        infos.push(`${from} trỏ ngược về "${cur}" một cách có chủ đích (tham chiếu cuối lộ trình), không phải lỗi`)
      } else {
        errors.push(`VÒNG LẶP HOẶC RẼ NHẦM: "${from}" trỏ tới "${cur}" - trang này đã đi qua trước đó trong chuỗi`)
      }
      return
    }
    seen.push(cur)
    if (!fs.existsSync(cur)) {
      errors.push(`THIẾU FILE: "${cur}" (link từ "${seen[seen.length - 2] ?? '(bắt đầu)'}")`)
      return
    }
    if (PROJECT_FILE_RE.test(cur)) {
      infos.push(`${cur}: chuyển sang điều hướng sidebar trong 09-du-an-thuc-hanh/, không cần "Bước tiếp theo"`)
      return
    }
    const { links, error } = readLinks(cur)
    if (error) {
      errors.push(`${error}: ${cur}`)
      return
    }
    if (links.length > 1) {
      infos.push(`${cur} có ${links.length} link trong "Bước tiếp theo" (${links.join(' | ')}) - chỉ link đầu tiên được coi là đường chính`)
    }
    cur = resolveLink(cur, links[0])
  }
}

function walkAllFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isDirectory()) {
      if (IGNORE_DIRS.has(e.name)) return []
      return walkAllFiles(path.posix.join(dir, e.name))
    }
    return [path.posix.join(dir, e.name)]
  })
}

const seen = []
walkChain(START, seen)
// 09-du-an-thuc-hanh/ dừng dò tự động ở một trong các file dự án; nối tiếp
// thủ công từ điểm quay lại đường chính để kiểm tra hết phần còn lại.
if (!seen.includes(RESUME_FROM)) walkChain(RESUME_FROM, seen)

// Kiểm tra riêng các điểm nối bên trong 09-du-an-thuc-hanh/ (không đi qua
// bằng walkChain vì chuỗi chính không tự động dò link ở các file dự án).
for (const [from, expected] of HANDOFFS) {
  if (!fs.existsSync(from)) {
    errors.push(`THIẾU FILE: "${from}" (khai báo trong HANDOFFS)`)
    continue
  }
  const { links, error } = readLinks(from)
  if (error) {
    errors.push(`${error}: ${from}`)
    continue
  }
  const actual = resolveLink(from, links[0])
  if (actual !== expected) {
    errors.push(`SAI ĐIỂM NỐI: "${from}" phải trỏ tới "${expected}" nhưng đang trỏ tới "${actual}"`)
  }
}

const allLessons = walkAllFiles('.')
  .map((f) => f.replace(/^\.\//, ''))
  .filter((f) => /^\d\d-[^/]+\/\d\d-[^/]+\.md$/.test(f))
  .sort()

const missing = allLessons.filter((l) => !seen.includes(l))

console.log(`Chuỗi đi qua ${seen.length} trang, bắt đầu từ ${START}.`)
console.log(`Kết thúc tại: ${seen[seen.length - 1]}`)
console.log('')

if (infos.length) {
  console.log('=== GHI CHÚ ===')
  infos.forEach((n) => console.log('- ' + n))
  console.log('')
}

if (errors.length) {
  console.log('=== LỖI ===')
  errors.forEach((e) => console.log('- ' + e))
  console.log('')
}

if (missing.length) {
  console.log(`=== ${missing.length} BÀI HỌC KHÔNG NẰM TRÊN ĐƯỜNG CHÍNH ===`)
  missing.forEach((m) => console.log('- ' + m))
  console.log('')
}

if (!errors.length && !missing.length) {
  console.log('OK: chuỗi liền mạch, không bài nào bị rớt.')
}

process.exit(errors.length || missing.length ? 1 : 0)
