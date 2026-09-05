// Dò toàn bộ mốc "(kiểm tra: DD/MM/YYYY)" trong các bài (quy ước ghi ở CONTEXT.md
// mục 3), báo mốc nào đã quá HAN_NGAY ngày kể từ lúc kiểm tra lần cuối - đây là
// những chỗ thông tin dễ đổi (giá, tên model, giới hạn gói...) đáng được rà lại.
//
// Khác với scripts/kiem-tra-chuoi.mjs: script này KHÔNG làm build fail (thông tin
// cũ không phải lỗi cấu trúc) - chỉ in báo cáo. Dùng làm bước đầu cho workflow
// GitHub Actions gọi Claude Code rà nội dung định kỳ (xem .github/workflows/).
//
// Chạy: node scripts/kiem-tra-ngay-cu.mjs [--han=180] [--json]
import fs from 'node:fs'
import path from 'node:path'

const IGNORE_DIRS = new Set(['node_modules', '.git', '.vitepress', '.github'])
const MARKER_RE = /\(kiểm tra:\s*(\d{2})\/(\d{2})\/(\d{4})\)/g

const args = process.argv.slice(2)
const hanNgay = Number(args.find((a) => a.startsWith('--han='))?.split('=')[1] ?? 180)
const dangJson = args.includes('--json')

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isDirectory()) {
      if (IGNORE_DIRS.has(e.name)) return []
      return walk(path.posix.join(dir, e.name))
    }
    return e.name.endsWith('.md') ? [path.posix.join(dir, e.name)] : []
  })
}

function parseNgay(dd, mm, yyyy) {
  // new Date(yyyy, mm-1, dd) - dùng UTC-agnostic, chỉ so ngày lịch, không giờ.
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd))
}

const homNay = new Date()
const ketQua = []

for (const file of walk('.')) {
  const txt = fs.readFileSync(file, 'utf8')
  const lines = txt.split('\n')
  lines.forEach((line, i) => {
    for (const m of line.matchAll(MARKER_RE)) {
      const [, dd, mm, yyyy] = m
      const ngayKiemTra = parseNgay(dd, mm, yyyy)
      const soNgay = Math.round((homNay - ngayKiemTra) / (1000 * 60 * 60 * 24))
      ketQua.push({
        file,
        line: i + 1,
        ngay: `${dd}/${mm}/${yyyy}`,
        soNgay,
        cu: soNgay > hanNgay,
        boCau: line.trim().slice(0, 160),
      })
    }
  })
}

const cu = ketQua.filter((k) => k.cu).sort((a, b) => b.soNgay - a.soNgay)
const conMoi = ketQua.filter((k) => !k.cu)

if (dangJson) {
  console.log(JSON.stringify({ hanNgay, tongSo: ketQua.length, cu, conMoi }, null, 2))
} else {
  console.log(`Tìm thấy ${ketQua.length} mốc "(kiểm tra: DD/MM/YYYY)" trong ${walk('.').length} file .md.`)
  console.log(`Hạn: ${hanNgay} ngày kể từ lần kiểm tra cuối.\n`)

  if (cu.length) {
    console.log(`=== ${cu.length} MỐC ĐÃ QUÁ HẠN, ĐÁNG RÀ LẠI ===`)
    for (const k of cu) {
      console.log(`- ${k.file}:${k.line} (${k.soNgay} ngày, kiểm tra lần cuối ${k.ngay})`)
      console.log(`    ${k.boCau}`)
    }
    console.log('')
  } else {
    console.log('Không có mốc nào quá hạn.\n')
  }

  console.log(`${conMoi.length} mốc vẫn còn trong hạn.`)
}

// Không exit code khác 0 - đây là báo cáo tham khảo, không phải cổng chặn build
// (thông tin cũ không phải lỗi cấu trúc như chuỗi "Bước tiếp theo" bị đứt).
