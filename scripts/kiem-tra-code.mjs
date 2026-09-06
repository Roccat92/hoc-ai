// Dò lỗi trong các khối code (```bash, ```python, ```json...) mà mắt thường
// dễ bỏ sót và VitePress không hề kiểm tra - nó chỉ render markdown thành HTML,
// không quan tâm code bên trong có chạy được hay không.
//
// Bug có thật đã tìm thấy (2026-09-06): gõ dấu ngoặc kép "thông minh" của trình
// soạn thảo (" ") thay vì ngoặc thẳng ("") trong ví dụ Python/bash - nhìn y hệt
// trên màn hình, nhưng Python/bash coi đó là ký tự thường, không phải dấu đóng
// mở chuỗi, nên báo lỗi cú pháp ngay nếu ai copy-paste chạy thật. Tìm thấy 9
// dòng lỗi kiểu này ở 3 bài khác nhau chỉ bằng cách quét tay - đủ để viết hẳn
// một script quét toàn bộ thay vì trông chờ mắt người.
//
// Cách làm, xếp từ chắc chắn nhất tới ít chắc chắn nhất:
// 1. Mọi khối code (trừ các fence chỉ mang tính minh họa như ```text/```diff -
//    xem PROSE_TAGS) đều bị quét tìm ký tự ngoặc kép/ngoặc đơn "thông minh"
//    (“ ” ‘ ’) - những ký tự này KHÔNG BAO GIỜ nên xuất hiện trong code thật ở
//    bất kỳ ngôn ngữ nào trong repo này, nên quét được 100% các ngôn ngữ mà
//    không cần hiểu cú pháp từng ngôn ngữ, và gần như không bao giờ báo nhầm.
// 2. Khối ```json được kiểm bằng JSON.parse thật - JSON luôn phải là một khối
//    hoàn chỉnh (không như JS/Python có thể là đoạn trích minh họa dở dang),
//    nên parse thật không sợ báo nhầm.
// 3. Khối ```bash/```sh/```shell được kiểm bằng `bash -n` thật (chỉ kiểm cú
//    pháp, không chạy) - bỏ qua êm nếu máy không có bash.
// 4. Khối ```python được kiểm bằng `python3 -c "ast.parse(...)"` thật - bỏ qua
//    êm nếu máy không có python3.
//
// Cố ý KHÔNG kiểm cú pháp sâu cho JS/TS/JSX (```js/ts/jsx/tsx) dù đây là nhóm
// đông nhất trong repo: rất nhiều khối chỉ là một đoạn trích minh họa dở dang
// (thiếu hàm bao ngoài, dùng import/export, JSX...) - ép chạy qua một trình
// phân tích cú pháp thật (`new Function(...)`) sẽ báo sai rất nhiều, làm CI đỏ
// oan. Bước 1 (quét ngoặc thông minh) vẫn áp dụng cho nhóm này và đã đủ bắt
// đúng loại lỗi thật từng xảy ra.

import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BO_QUA_THU_MUC = new Set(['node_modules', '.git', '.vitepress'])

// Các fence chỉ mang tính minh họa (ví dụ prompt mẫu, đoạn diff) - không phải
// code sẽ được chạy, nên không quét gì cả.
const PROSE_TAGS = new Set(['', 'text', 'txt', 'markdown', 'md', 'diff', 'csv'])

const KY_TU_NGOAC_THONG_MINH = /[“”‘’]/

function* duyetMd(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (BO_QUA_THU_MUC.has(e.name)) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* duyetMd(p)
    else if (e.name.endsWith('.md')) yield p
  }
}

// Tách các khối ```lang ... ``` trong một file, trả về {lang, code, dongBatDau}.
// Chuẩn hóa CRLF -> LF trước để không lẫn ký tự \r vào code khi ghi ra file tạm.
function tachKhoiCode(noiDung) {
  const dong = noiDung.replace(/\r\n/g, '\n').split('\n')
  const ketQua = []
  let dangTrongFence = false
  let lang = ''
  let buffer = []
  let dongBatDau = 0
  for (let i = 0; i < dong.length; i++) {
    const trimmed = dong[i].trim()
    if (!dangTrongFence) {
      const m = trimmed.match(/^```+(\S*)/)
      if (m) {
        dangTrongFence = true
        lang = m[1].toLowerCase()
        buffer = []
        dongBatDau = i + 2 // dòng đầu tiên của code, 1-based, sau dòng mở fence
      }
    } else if (/^```+\s*$/.test(trimmed)) {
      dangTrongFence = false
      ketQua.push({ lang, code: buffer.join('\n'), dongBatDau })
    } else {
      buffer.push(dong[i])
    }
  }
  return ketQua
}

let pythonCoSan = null
function coPython3() {
  if (pythonCoSan === null) {
    try {
      execFileSync('python3', ['--version'], { stdio: 'ignore' })
      pythonCoSan = true
    } catch {
      pythonCoSan = false
    }
  }
  return pythonCoSan
}

let bashCoSan = null
function coBash() {
  if (bashCoSan === null) {
    try {
      execFileSync('bash', ['--version'], { stdio: 'ignore' })
      bashCoSan = true
    } catch {
      bashCoSan = false
    }
  }
  return bashCoSan
}

function fileTamThoi(noiDung, duoi) {
  const p = path.join(os.tmpdir(), `hocai-kiemtra-code-${process.pid}-${Math.random().toString(36).slice(2)}${duoi}`)
  fs.writeFileSync(p, noiDung, 'utf8')
  return p
}

let loi = 0
let daQuet = 0
let boQuaPython = false
let boQuaBash = false

for (const file of duyetMd(ROOT)) {
  const relFile = path.relative(ROOT, file).split(path.sep).join('/')
  const noiDung = fs.readFileSync(file, 'utf8')
  for (const { lang, code, dongBatDau } of tachKhoiCode(noiDung)) {
    if (PROSE_TAGS.has(lang)) continue
    daQuet += 1

    // 1. Ngoặc kép/ngoặc đơn "thông minh" - áp dụng cho MỌI ngôn ngữ code.
    const dongCode = code.split('\n')
    dongCode.forEach((d, idx) => {
      if (KY_TU_NGOAC_THONG_MINH.test(d)) {
        console.log(`✖ ${relFile}:${dongBatDau + idx} [${lang || '(không rõ ngôn ngữ)'}] dùng dấu ngoặc "thông minh" (“ ” ‘ ’) thay vì ngoặc thẳng trong code - sẽ lỗi cú pháp nếu copy-paste chạy thật:`)
        console.log(`    ${d.trim()}`)
        loi += 1
      }
    })

    // 2. JSON - parse thật.
    if (lang === 'json') {
      try {
        JSON.parse(code)
      } catch (e) {
        console.log(`✖ ${relFile}:${dongBatDau} [json] JSON không hợp lệ - ${e.message}`)
        loi += 1
      }
    }

    // 3. bash/sh/shell - kiểm cú pháp thật bằng `bash -n` (không chạy lệnh).
    if (['bash', 'sh', 'shell'].includes(lang)) {
      if (!coBash()) {
        boQuaBash = true
      } else {
        const tmp = fileTamThoi(code, '.sh')
        try {
          execFileSync('bash', ['-n', tmp], { stdio: 'pipe' })
        } catch (e) {
          const thongBao = (e.stderr || '').toString().trim().split('\n').pop()
          console.log(`✖ ${relFile}:${dongBatDau} [${lang}] lỗi cú pháp shell - ${thongBao}`)
          loi += 1
        } finally {
          fs.unlinkSync(tmp)
        }
      }
    }

    // 4. python - kiểm cú pháp thật bằng ast.parse (không chạy code).
    if (lang === 'python') {
      if (!coPython3()) {
        boQuaPython = true
      } else {
        const tmp = fileTamThoi(code, '.py')
        try {
          execFileSync(
            'python3',
            ['-c', 'import ast, sys\nast.parse(open(sys.argv[1], encoding="utf-8").read())', tmp],
            { stdio: 'pipe' },
          )
        } catch (e) {
          const thongBao = (e.stderr || '').toString().trim().split('\n').pop()
          console.log(`✖ ${relFile}:${dongBatDau} [python] lỗi cú pháp - ${thongBao}`)
          loi += 1
        } finally {
          fs.unlinkSync(tmp)
        }
      }
    }
  }
}

console.log(`\nĐã quét ${daQuet} khối code.`)
if (boQuaBash) console.log('(bỏ qua kiểm `bash -n` vì máy này không có bash)')
if (boQuaPython) console.log('(bỏ qua kiểm cú pháp Python vì máy này không có python3)')

if (loi > 0) {
  console.log(`✖ ${loi} lỗi - sửa xong chạy lại script này trước khi commit.`)
  process.exit(1)
}
console.log('OK: mọi khối code đều sạch ngoặc "thông minh", và cú pháp JSON/bash/Python (khi kiểm được) đều hợp lệ.')
