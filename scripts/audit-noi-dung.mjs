// Audit nội dung + SEO cho cả thư viện - CHẠY MIỄN PHÍ, KHÔNG gọi API.
// Quét mọi bài học công khai, chấm theo các quy tắc biên tập ở CONTEXT.md và vài
// tiêu chí SEO cơ bản, rồi in một BÁO CÁO xếp theo mức ưu tiên để mỗi ngày người
// duy trì (hoặc Claude trong phiên làm việc) đọc và biết nên phát triển/sửa gì.
//
// Khác các script kiem-tra-*.mjs (cổng chặn build: chuỗi bài, link, anchor, code):
// script này KHÔNG làm fail, chỉ báo cáo tham khảo (giống kiem-tra-ngay-cu.mjs).
// Nó bổ sung cho .github/workflows/ra-noi-dung.yml (job tuần chỉ lo giá/model quá
// hạn) - ở đây lo "sức khỏe nội dung": bài cũ, bài mỏng, thiếu chuẩn biên tập,
// tiêu đề trùng, trang mồ côi (không ai link tới - xấu cho SEO internal link).
//
// Chạy:  node scripts/audit-noi-dung.mjs            (báo cáo cho người đọc)
//        node scripts/audit-noi-dung.mjs --json     (JSON cho máy/CI dùng)
//        node scripts/audit-noi-dung.mjs --cu=120   (đổi ngưỡng "bài cũ", mặc định 120 ngày)
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

// Các phần công khai được quét (khớp mảng `sections` + phụ lục trong config.mts).
// KHÔNG quét file nội bộ ở gốc (CONTEXT/BACKLOG/CLAUDE...) vì chúng không lên web.
const SECTION_DIRS = [
  '00-ban-do-gioi-ai', '01-bat-dau-tu-so-0', '02-code-voi-ai', '03-ha-tang-thuc-chien',
  '04-build-ung-dung-ai', '05-train-va-finetune', '06-kho-tai-nguyen', '07-case-study',
  '08-chuan-hoa-du-an', '09-du-an-thuc-hanh', '10-bao-mat', '11-ra-thi-truong',
  'phu-luc-cong-cu',
]

const args = process.argv.slice(2)
const nguongCu = Number(args.find((a) => a.startsWith('--cu='))?.split('=')[1] ?? 120)
const dangJson = args.includes('--json')

// --- Thu thập file .md công khai ---------------------------------------------
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.posix.join(dir, e.name)
    if (e.isDirectory()) return e.name === 'node_modules' ? [] : walk(p)
    return e.name.endsWith('.md') ? [p] : []
  })
}
const files = SECTION_DIRS.filter((d) => fs.existsSync(d)).flatMap((d) => walk(d))

// Phân loại từng file để áp đúng quy tắc, tránh báo nhầm:
// - 'index'  : README.md của một phần/công cụ (trang mục lục) - không áp quy tắc bài học
// - 'du-an'  : file trong 09-.../du-an-*/ (spec/backlog/CLAUDE/huong-dan) - bản chất khác bài học
// - 'bai'    : bài học NN-*.md thường - áp đủ quy tắc biên tập
function loaiFile(f) {
  const base = path.posix.basename(f)
  if (base === 'README.md') return 'index'
  if (/\/du-an-\d+-[^/]+\//.test(f)) return 'du-an'
  if (/^\d+-.+\.md$/.test(base)) return 'bai'
  return 'khac'
}
function phanCua(f) {
  return f.split('/')[0]
}

// --- Tiện ích đọc nội dung ----------------------------------------------------
function docFile(f) {
  return fs.readFileSync(f, 'utf8')
}
function tieuDeH1(txt) {
  const m = txt.match(/^#\s+(.+)$/m)
  // Bỏ phần HTML (ví dụ <img ...>) và khoảng trắng thừa để đo/đối chiếu tiêu đề.
  return m ? m[1].replace(/<[^>]+>/g, '').trim() : null
}
// Đếm chữ phần thân: bỏ khối code ```...```, thẻ HTML/SVG, tiêu đề markdown, để
// ước lượng độ dày thật của nội dung (không tính code mẫu, sơ đồ).
function demChuThan(txt) {
  const sach = txt
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s.*$/gm, ' ')
    .replace(/[#*`_>|\-]+/g, ' ')
  const chu = sach.split(/\s+/).filter((w) => /\p{L}/u.test(w))
  return chu.length
}
function ngaySuaCuoi(f) {
  // Ngày commit cuối chạm file (YYYY-MM-DD). File chưa commit -> null (bỏ qua tuổi).
  try {
    const s = execFileSync('git', ['log', '-1', '--format=%cs', '--', f], { encoding: 'utf8' }).trim()
    return s || null
  } catch {
    return null
  }
}

// --- Xây đồ thị link nội bộ để tìm trang "mồ côi" -----------------------------
// Trang không được BẤT KỲ trang nào khác trỏ tới (kể cả README của phần) là điểm
// yếu internal-linking: người đọc lẫn Google khó tới, dễ bị bỏ quên khỏi lộ trình.
function chuanHoaDich(fromFile, target) {
  let t = target.split('#')[0].split('?')[0].trim()
  if (!t) return null
  if (/^https?:|^mailto:/i.test(t)) return null
  let abs = t.startsWith('/') ? t.slice(1) : path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), t))
  if (abs.endsWith('/')) abs += 'README.md'
  else if (!abs.endsWith('.md')) abs += '.md' // link dạng cleanUrl (không .md)
  return abs.replace(/^\.\//, '')
}
const duocTroToi = new Set()
const noiDungCache = new Map()
for (const f of files) {
  const txt = docFile(f)
  noiDungCache.set(f, txt)
  for (const m of txt.matchAll(/\]\(([^)]+)\)/g)) {
    const dich = chuanHoaDich(f, m[1])
    if (dich) duocTroToi.add(dich)
  }
}
// README gốc (trang chủ) cũng trỏ tới nhiều mục lục phần -> tính vào để không báo nhầm.
if (fs.existsSync('README.md')) {
  for (const m of docFile('README.md').matchAll(/\]\(([^)]+)\)/g)) {
    const dich = chuanHoaDich('README.md', m[1])
    if (dich) duocTroToi.add(dich)
  }
}

// --- Chấm từng file -----------------------------------------------------------
const P = { cao: 'cao', vua: 'vua', thap: 'thap' } // mức ưu tiên
const phatHien = []
function bao(muc, loai, file, thongDiep, line) {
  phatHien.push({ muc, loai, file, line: line ?? null, thongDiep })
}

// CHỈ bắt dấu nháp THẬT: badge "::: warning Bản nháp", chỗ trống "(Phần ... sẽ được
// bổ sung", "(điền...", TODO/TBD. KHÔNG bắt từ "bản nháp" dùng trong nội dung bình
// thường (prototype, "nhờ AI soạn bản nháp"...) - đó không phải nợ nội dung.
const DRAFT_RE = /(warning\s+Bản nháp|\(Phần bài học sẽ được bổ sung|\(sẽ bổ sung|\(điền [^)]|\bTODO\b|\bTBD\b|coming soon)/i
const tieuDeDaGap = new Map() // tiêu đề (thường hóa) -> [file...] để dò trùng

for (const f of files) {
  const loai = loaiFile(f)
  const txt = noiDungCache.get(f)
  const lines = txt.split('\n')
  const h1 = tieuDeH1(txt)

  // 1) Bản nháp / chỗ trống chưa điền - ưu tiên cao, đây là nợ nội dung lộ ra ngoài.
  lines.forEach((l, i) => {
    if (DRAFT_RE.test(l)) {
      bao(P.cao, 'ban-nhap', f, `Còn dấu nháp/chỗ trống: "${l.trim().slice(0, 80)}"`, i + 1)
    }
  })

  // 2) Nhiều H1 (chỉ nên có đúng một) - xấu cho cấu trúc heading + SEO.
  //    Bỏ khối code trước khi đếm: dòng "# comment" trong ví dụ bash KHÔNG phải H1.
  const soH1 = ((txt.replace(/```[\s\S]*?```/g, '')).match(/^#\s+/gm) || []).length
  if (soH1 > 1) bao(P.vua, 'heading', f, `Có ${soH1} thẻ H1 (nên chỉ 1).`)
  if (soH1 === 0) bao(P.vua, 'heading', f, 'Không có H1 (thiếu tiêu đề trang).')

  // 3) Tiêu đề quá dài -> dễ bị cắt trên kết quả tìm kiếm.
  if (h1 && h1.length > 70) bao(P.thap, 'seo-tieu-de', f, `Tiêu đề dài ${h1.length} ký tự (>70, dễ bị cắt trên Google): "${h1.slice(0, 60)}…"`)
  if (h1) {
    const khoa = h1.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    if (!tieuDeDaGap.has(khoa)) tieuDeDaGap.set(khoa, [])
    tieuDeDaGap.get(khoa).push(f)
  }

  // Các quy tắc CHỈ áp cho bài học thường (không cho mục lục/dự án).
  if (loai === 'bai') {
    // 4) Bài mỏng - ít chữ, thường là nội dung chưa làm dày hoặc bài stub.
    const soChu = demChuThan(txt)
    if (soChu < 150) bao(P.cao, 'bai-mong', f, `Rất mỏng: ~${soChu} chữ (bài học nên >300).`)
    else if (soChu < 300) bao(P.vua, 'bai-mong', f, `Hơi mỏng: ~${soChu} chữ.`)

    // 5) Thiếu "Một câu để nhớ:" ở bài có luồng (nhận diện qua "## Bước tiếp theo").
    //    Bài tham khảo (từ điển, kho tài nguyên) được CONTEXT miễn quy tắc này.
    const laThamKhao = phanCua(f) === '06-kho-tai-nguyen' || path.posix.basename(f).includes('tu-dien')
    const coBuocTiepTheo = /##\s+Bước tiếp theo/.test(txt)
    if (coBuocTiepTheo && !laThamKhao && !/Một câu để nhớ/.test(txt)) {
      // Ưu tiên THẤP: chuẩn hóa "làm dần", không khẩn (xem BACKLOG Đợt 2C) - nhưng
      // là kho "việc nhỏ làm nhanh" tốt cho vòng phát triển nội dung hằng ngày.
      bao(P.thap, 'cau-de-nho', f, 'Bài có luồng nhưng thiếu dòng "Một câu để nhớ:" trước "Bước tiếp theo".')
    }

    // 6) Trang mồ côi - không phần nào link tới (kể cả README phần). Yếu internal link.
    if (!duocTroToi.has(f)) {
      bao(P.vua, 'mo-coi', f, 'Không trang nào link tới bài này (thêm vào README phần / nối "Bước tiếp theo").')
    }
  }

  // 7) Tuổi nội dung - bài lâu chưa đụng tới, đáng rà lại để "phát triển đều đặn".
  if (loai === 'bai' || loai === 'index') {
    const ngay = ngaySuaCuoi(f)
    if (ngay) {
      const soNgay = Math.round((Date.now() - new Date(ngay).getTime()) / 86400000)
      if (soNgay > nguongCu * 2) bao(P.vua, 'cu', f, `Chưa cập nhật ${soNgay} ngày (từ ${ngay}).`)
      else if (soNgay > nguongCu) bao(P.thap, 'cu', f, `Chưa cập nhật ${soNgay} ngày (từ ${ngay}).`)
    }
  }
}

// 8) Tiêu đề trùng nhau giữa các bài - gây "từ khóa ăn thịt nhau" trên tìm kiếm.
for (const [, ds] of tieuDeDaGap) {
  if (ds.length > 1) {
    bao(P.vua, 'tieu-de-trung', ds[0], `Tiêu đề trùng với: ${ds.slice(1).join(', ')}`)
  }
}

// --- In báo cáo ---------------------------------------------------------------
const thuTu = { cao: 0, vua: 1, thap: 2 }
phatHien.sort((a, b) => thuTu[a.muc] - thuTu[b.muc] || a.loai.localeCompare(b.loai) || a.file.localeCompare(b.file))

if (dangJson) {
  console.log(JSON.stringify({ nguongCu, tongSoFile: files.length, tongPhatHien: phatHien.length, phatHien }, null, 2))
} else {
  const nhan = { cao: 'CAO', vua: 'VỪA', thap: 'THẤP' }
  const tenLoai = {
    'ban-nhap': 'Bản nháp / chỗ trống', 'bai-mong': 'Bài mỏng', 'mo-coi': 'Trang mồ côi',
    'cau-de-nho': 'Thiếu "Một câu để nhớ"', 'cu': 'Nội dung cũ', 'heading': 'Cấu trúc heading',
    'seo-tieu-de': 'Tiêu đề SEO', 'tieu-de-trung': 'Tiêu đề trùng',
  }
  console.log(`# Audit nội dung + SEO — ${new Date().toISOString().slice(0, 10)}`)
  console.log(`Quét ${files.length} file trong ${SECTION_DIRS.length} phần. Ngưỡng "cũ": ${nguongCu} ngày.\n`)

  const theoLoai = {}
  for (const p of phatHien) (theoLoai[p.loai] ??= []).push(p)
  console.log('## Tổng quan')
  console.log(`- Tổng: ${phatHien.length} phát hiện (CAO ${phatHien.filter(p=>p.muc==='cao').length} · VỪA ${phatHien.filter(p=>p.muc==='vua').length} · THẤP ${phatHien.filter(p=>p.muc==='thap').length})`)
  for (const [loai, ds] of Object.entries(theoLoai).sort((a,b)=>b[1].length-a[1].length)) {
    console.log(`- ${tenLoai[loai] ?? loai}: ${ds.length}`)
  }
  console.log('')

  // Gom theo loại trong mỗi mức và cắt bớt để báo cáo đọc được trong một màn hình;
  // muốn xem đủ mọi mục thì dùng --json.
  const CAP = 8
  for (const muc of ['cao', 'vua', 'thap']) {
    const ds = phatHien.filter((p) => p.muc === muc)
    if (!ds.length) continue
    console.log(`## Ưu tiên ${nhan[muc]} (${ds.length})`)
    const nhomLoai = {}
    for (const p of ds) (nhomLoai[p.loai] ??= []).push(p)
    for (const [loai, ps] of Object.entries(nhomLoai).sort((a, b) => b[1].length - a[1].length)) {
      console.log(`### ${tenLoai[loai] ?? loai} (${ps.length})`)
      for (const p of ps.slice(0, CAP)) {
        const viTri = p.line ? `${p.file}:${p.line}` : p.file
        console.log(`- ${viTri} — ${p.thongDiep}`)
      }
      if (ps.length > CAP) console.log(`- …và ${ps.length - CAP} mục nữa (xem \`--json\` để đủ).`)
    }
    console.log('')
  }
  if (!phatHien.length) console.log('Không có phát hiện nào. Nội dung đang rất gọn gàng.')
}
