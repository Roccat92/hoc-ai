// Dò các link nội bộ có kèm anchor (`...md#mot-muc`, hoặc `#mot-muc` cùng trang) xem
// đúng ID thật trong bản build chưa. `npm run docs:build` (dead-link check của
// VitePress) CHỈ xác minh đường dẫn file tồn tại, KHÔNG xác minh phần `#anchor` -
// nên một tiêu đề đổi chữ (kể cả chỉ đổi cách viết dấu) là link âm thầm chết,
// không rơi vào 404 mà chỉ đơn giản là cuộn tới đầu trang thay vì đúng mục.
// Lỗi này đã xảy ra thật nhiều lần (heading đổi tên nhưng quên sửa link trỏ tới nó).
//
// Cách làm: đọc thẳng bản đã build (.vitepress/dist) - lấy toàn bộ id="..." thật
// trên mỗi trang - rồi so với anchor mà các file .md nguồn khai báo. Không tự đoán
// quy tắc bỏ dấu của markdown-it-anchor (dễ đoán sai, đã từng đoán sai nhiều lần) -
// luôn so với ID có thật.
//
// Chạy sau khi đã `npm run docs:build` (hoặc gọi qua `npm run kiem-tra-anchor` -
// script tự build trước nếu chưa thấy dist). Không sửa file gì, chỉ báo cáo.

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, '.vitepress', 'dist')

function duongDanRa(mdRelPath) {
  // Suy ra đường dẫn trang đã build từ đường dẫn file .md (tương đối với ROOT) -
  // cùng logic rewrite với config.mts: README.md -> thư mục đó (index.html).
  let p = mdRelPath.replace(/\\/g, '/').replace(/\.md$/, '')
  if (p === 'README' || p.endsWith('/README')) p = p.replace(/README$/, 'index')
  return p
}

function* duyetMd(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* duyetMd(p)
    else if (e.name.endsWith('.md')) yield p
  }
}

function idsCuaTrang(urlPath) {
  const htmlFile = path.join(DIST, urlPath + '.html')
  if (!fs.existsSync(htmlFile)) return null
  const html = fs.readFileSync(htmlFile, 'utf8')
  const ids = new Set()
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1])
  return ids
}

if (!fs.existsSync(DIST)) {
  console.log('Chưa có .vitepress/dist - chạy build trước...')
  execFileSync('npx', ['vitepress', 'build'], { cwd: ROOT, stdio: 'inherit', shell: true })
}

const idCache = new Map()
function layIds(urlPath) {
  if (!idCache.has(urlPath)) idCache.set(urlPath, idsCuaTrang(urlPath))
  return idCache.get(urlPath)
}

// Khớp [chữ](đường-dẫn#anchor) hoặc [chữ](#anchor) - bỏ qua link http(s) tuyệt đối.
const RE_LINK = /\[[^\]]*\]\(([^)\s]+)\)/g

let loi = 0
let kiemTra = 0

for (const file of duyetMd(ROOT)) {
  if (file.includes(`${path.sep}.vitepress${path.sep}dist${path.sep}`)) continue
  if (file.includes(`${path.sep}node_modules${path.sep}`)) continue
  const relFile = path.relative(ROOT, file).split(path.sep).join('/')
  const src = fs.readFileSync(file, 'utf8')
  for (const m of src.matchAll(RE_LINK)) {
    const target = m[1]
    if (!target.includes('#')) continue
    if (/^https?:\/\//.test(target)) continue
    const [duongDanTho, anchor] = target.split('#')
    let urlPath
    if (!duongDanTho) {
      // Anchor trong cùng trang.
      urlPath = duongDanRa(relFile)
    } else if (duongDanTho.endsWith('.md')) {
      const targetAbs = path.resolve(path.dirname(file), duongDanTho)
      if (!fs.existsSync(targetAbs)) continue // đường dẫn sai - để dead-link check của VitePress lo
      urlPath = duongDanRa(path.relative(ROOT, targetAbs).split(path.sep).join('/'))
    } else {
      continue // không phải link .md nội bộ (ảnh, mã nguồn ngoài repo...)
    }
    kiemTra += 1
    const ids = layIds(urlPath)
    if (ids === null) {
      console.log(`⚠ ${relFile}: trỏ tới trang không thấy trong dist (${urlPath}) - anchor #${anchor}`)
      loi += 1
      continue
    }
    if (!ids.has(anchor)) {
      console.log(`✖ ${relFile}: anchor "#${anchor}" không tồn tại ở ${urlPath}.html`)
      loi += 1
    }
  }
}

console.log(`\nĐã kiểm tra ${kiemTra} link có anchor.`)
if (loi > 0) {
  console.log(`✖ ${loi} anchor chết - heading đích đã đổi chữ nhưng link chưa cập nhật.`)
  process.exit(1)
}
console.log('OK: mọi anchor nội bộ đều khớp ID thật trong bản build.')
