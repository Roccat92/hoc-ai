// Sinh ảnh thumbnail (1200x630) cho TỪNG bài để khi chia sẻ link một bài lên
// Facebook/Zalo/X hiện đúng tên bài, phần, số bài và cấp độ - thay vì ảnh chung
// của site. Chạy lúc build (npm run docs:build gọi file này trước vitepress build).
//
// Cách làm: dựng bố cục bằng satori (HTML/CSS flex -> SVG), rồi resvg đổi SVG -> PNG.
// Đây đúng là bộ Vercel dùng cho ảnh OG, chạy được cả trong CI Linux, không cần
// trình duyệt. Font Inter (OFL) nằm sẵn ở scripts/fonts/ - có tiếng Việt.
//
// Kết quả ghi vào public/thumb/<đường-dẫn-bài>.png (thư mục này KHÔNG commit -
// xem .gitignore); config.mts đọc đúng đường dẫn đó để gắn thẻ og:image cho từng trang.
// Chỉ vẽ lại ảnh nào có file .md mới hơn ảnh (hoặc script này mới hơn), nên chạy
// lần hai rất nhanh.
//
// Dữ liệu lấy từ chính nội dung: tiêu đề = dòng "# " đầu tiên; tên phần = mảng
// `sections` trong .vitepress/config.mts; cấp độ = mảng CAP trong theme/LoTrinh.vue.
// Không nhập tay ở đâu cả, nên thêm bài mới không phải nhớ làm gì thêm.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'thumb')
const FONT_DIR = path.join(ROOT, 'scripts', 'fonts')
const SELF = fileURLToPath(import.meta.url)
const W = 1200
const H = 630

// ---------- 1. Đọc danh mục phần + cấp độ từ cấu hình có sẵn ----------

function docSections() {
  const src = fs.readFileSync(path.join(ROOT, '.vitepress', 'config.mts'), 'utf8')
  const block = src.match(/const sections = \[([\s\S]*?)\n\]/)
  if (!block) throw new Error('Không tìm thấy mảng sections trong config.mts')
  const out = []
  for (const m of block[1].matchAll(/dir:\s*'([^']+)',\s*text:\s*'([^']+)'/g)) out.push({ dir: m[1], text: m[2] })
  out.push({ dir: 'phu-luc-cong-cu', text: 'Phụ lục: hướng dẫn theo công cụ' })
  return out
}

function docCapDo() {
  // Trả về Map: '/02-code-voi-ai/03-du-an-dau-tien' -> 'Cấp 1'
  const src = fs.readFileSync(path.join(ROOT, '.vitepress', 'theme', 'LoTrinh.vue'), 'utf8')
  const map = new Map()
  let cap = -1
  for (const line of src.split('\n')) {
    if (/^\s*ten:\s*'/.test(line)) cap += 1
    const m = line.match(/link:\s*'([^']+)'/)
    if (m && cap >= 0) map.set(m[1], `Cấp ${cap}`)
  }
  return map
}

// ---------- 2. Gom danh sách bài ----------

function tieuDeCua(file) {
  const src = fs.readFileSync(file, 'utf8')
  const m = src.match(/^#\s+(.+)$/m)
  if (!m) return null
  return m[1].replace(/\s*[#]+\s*$/, '').replace(/`/g, '').trim()
}

// Rút câu "Học xong bạn sẽ ..." từ đoạn mở đầu (mọi bài đều có theo quy tắc nội dung).
// Không có thì lấy câu đầu của đoạn mở đầu; không có đoạn nào thì bỏ trống.
function boMarkdown(s) {
  return s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
function moTaCua(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n')
  let i = lines.findIndex((l) => /^#\s+/.test(l))
  if (i < 0) return null
  let doan = ''
  for (i += 1; i < lines.length; i += 1) {
    const l = lines[i].trim()
    if (!l) { if (doan) break; else continue }
    if (/^(#|<|:::|!\[|\||-|\d+\.|>)/.test(l)) { if (doan) break; else continue }
    doan += (doan ? ' ' : '') + l
  }
  if (!doan) return null
  doan = boMarkdown(doan)
  const m = doan.match(/(?:Học|Đọc|Làm|Xem|Xong) xong,?\s+(bạn(?: sẽ)?[^.!?]*[.!?])/)
  let cau = m ? m[1] : doan.split(/(?<=[.!?])\s/)[0]
  cau = cau.replace(/^bạn sẽ\s*/i, '').replace(/\s*[.!?]$/, '')
  cau = cau.charAt(0).toUpperCase() + cau.slice(1)
  if (cau.length > 118) cau = cau.slice(0, 115).replace(/\s+\S*$/, '') + '…'
  return cau
}

function* duyetMd(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* duyetMd(p)
    else if (e.name.endsWith('.md')) yield p
  }
}

function gomBai() {
  const sections = docSections()
  const capDo = docCapDo()
  const bai = []
  for (const sec of sections) {
    const dir = path.join(ROOT, sec.dir)
    if (!fs.existsSync(dir)) continue
    const soPhan = sec.dir.match(/^(\d\d)-/)?.[1]
    const tenPhan = sec.text.replace(/\s*\((nâng cao|Việt Nam)\)\s*$/i, '')
    const baiPhang = fs.readdirSync(dir).filter((f) => /^\d\d-.*\.md$/.test(f)).sort()
    for (const file of duyetMd(dir)) {
      const rel = path.relative(ROOT, file).split(path.sep).join('/')
      const tieuDe = tieuDeCua(file)
      if (!tieuDe) continue
      const ten = path.basename(file)
      const laReadme = ten === 'README.md'
      const idx = baiPhang.indexOf(ten)
      const urlPath = '/' + rel.replace(/\.md$/, '').replace(/\/README$/, '/')
      bai.push({
        file,
        rel,
        urlPath,
        outPng: path.join(OUT, rel.replace(/\.md$/, '.png').replace(/README\.png$/, 'index.png')),
        tieuDe: laReadme ? tieuDe.replace(/^Phần \d+:\s*/, '') : tieuDe,
        moTa: laReadme ? (baiPhang.length ? `${baiPhang.length} bài trong phần này, đọc theo thứ tự hoặc nhảy thẳng tới bài bạn cần.` : null) : moTaCua(file),
        phan: soPhan ? `Phần ${Number(soPhan)} · ${tenPhan}` : tenPhan,
        soBai: idx >= 0 ? `Bài ${idx + 1}/${baiPhang.length}` : laReadme ? 'Mục lục phần' : null,
        cap: capDo.get(urlPath.replace(/\/$/, '')) || null,
        maPhan: soPhan || 'pl',
      })
    }
  }
  // Trang chủ: một thẻ riêng cùng phong cách, để chia sẻ hocaiviet.com không lệch tông với các bài.
  bai.push({
    file: path.join(ROOT, 'README.md'),
    rel: 'index.md',
    urlPath: '/',
    outPng: path.join(OUT, 'index.png'),
    tieuDe: 'Học lập trình và build sản phẩm với AI từ con số 0',
    moTa: 'Thư viện mở, miễn phí, tiếng Việt - từ chưa biết gì tới lúc deploy được sản phẩm AI thật, có người dùng thật.',
    phan: 'Học AI Việt · hocaiviet.com',
    soBai: null,
    cap: null,
    maPhan: 'home',
  })
  return bai
}

// ---------- 3. Bố cục ảnh (satori dùng cây object thay JSX) ----------

const h = (type, style, children, extra = {}) => ({ type, props: { style, ...extra, children } })

// Màu accent theo phần - lấy từ bảng màu hệ thống của Apple để mỗi phần có một
// màu nhận ra ngay trong feed; vẫn một màu accent trên một ảnh.
const MAU = {
  '00': '#0071e3', '01': '#30b0c7', '02': '#5e5ce6', '03': '#ff9f0a', '04': '#bf5af2',
  '05': '#ff375f', '06': '#a2845e', '07': '#34c759', '08': '#64748b', '09': '#00c7be',
  '10': '#ff453a', '11': '#ffb800', pl: '#8e8e93', home: '#5e5ce6',
}

// Glyph theo phần: vài khối hình đặc, đơn giản, cùng ngôn ngữ với logo.
const path_ = (d, fill, extra = {}) => ({ type: 'path', props: { d, fill, ...extra } })
const rect_ = (x, y, w, hh, rx, fill, opacity = 1) => ({ type: 'rect', props: { x, y, width: w, height: hh, rx, fill, opacity } })
const circ_ = (cx, cy, r, fill, opacity = 1) => ({ type: 'circle', props: { cx, cy, r, fill, opacity } })
const GLYPH = {
  '00': (c) => [circ_(50, 50, 40, c, 0.18), circ_(50, 50, 26, c, 0.35), circ_(50, 50, 11, c)],
  '01': (c) => [rect_(12, 58, 20, 30, 6, c, 0.35), rect_(40, 38, 20, 50, 6, c, 0.65), rect_(68, 12, 20, 76, 6, c)],
  '02': (c) => [path_('M38 22 12 50l26 28 9-9L28 50l19-19zM62 22l26 28-26 28-9-9 19-19-19-19z', c)],
  '03': (c) => [rect_(14, 14, 72, 20, 8, c), rect_(14, 40, 72, 20, 8, c, 0.6), rect_(14, 66, 72, 20, 8, c, 0.3)],
  '04': (c) => [rect_(12, 12, 34, 34, 9, c), rect_(54, 12, 34, 34, 9, c, 0.4), rect_(12, 54, 34, 34, 9, c, 0.4), rect_(54, 54, 34, 34, 9, c, 0.7)],
  '05': (c) => [rect_(12, 26, 76, 10, 5, c, 0.3), circ_(36, 31, 12, c), rect_(12, 64, 76, 10, 5, c, 0.3), circ_(66, 69, 12, c)],
  '06': (c) => [rect_(14, 14, 18, 72, 5, c), rect_(38, 14, 18, 72, 5, c, 0.6), path_('M62 20l16-5 20 66-16 5z', c, { opacity: 0.35 })],
  '07': (c) => [path_('M14 58c0-20 10-36 30-44l4 8c-10 6-16 14-18 24h14v28H14zM56 58c0-20 10-36 30-44l4 8c-10 6-16 14-18 24h14v28H56z', c)],
  '08': (c) => [rect_(16, 12, 68, 76, 12, c, 0.18), rect_(30, 30, 40, 8, 4, c), rect_(30, 46, 40, 8, 4, c, 0.7), rect_(30, 62, 26, 8, 4, c, 0.45)],
  '09': (c) => [rect_(12, 12, 76, 76, 20, c), path_('M42 32v36l26-18z', '#fff')],
  '10': (c) => [path_('M50 8 16 22v26c0 20 14 36 34 44 20-8 34-24 34-44V22z', c), path_('M34 50l11 11 21-22', 'none', { stroke: '#fff', 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })],
  '11': (c) => [circ_(50, 50, 42, c), path_('M36 64l28-28M40 34h26v26', 'none', { stroke: '#fff', 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })],
  pl: (c) => [circ_(28, 50, 12, c), circ_(50, 50, 12, c, 0.6), circ_(72, 50, 12, c, 0.3)],
  // Trang chủ: chính glyph của logo (trắng), quầng sáng lấy màu indigo của site.
  home: () => [{ type: 'g', props: { transform: 'scale(1.5625)', children: [path_(LOGO_D, '#ffffff', { 'fill-rule': 'evenodd' })] } }],
}
const svgGlyph = (ma, c, size) => ({ type: 'svg', props: { viewBox: '0 0 100 100', width: size, height: size, children: (GLYPH[ma] || GLYPH.pl)(c) } })

// Logo huy hiệu (đúng hình favicon.svg)
const LOGO_D = 'M32 6l9 10H23zM32 22a14 14 0 0 1 14 14v8a14 14 0 0 1-28 0v-8a14 14 0 0 1 14-14zm0 12a6 6 0 1 0 .01 0z'
const svgLogo = (size, nen, chu) => ({
  type: 'svg',
  props: {
    viewBox: '0 0 64 64', width: size, height: size,
    children: [
      { type: 'rect', props: { width: 64, height: 64, rx: 14, fill: nen } },
      { type: 'g', props: { transform: 'translate(8 8) scale(.75)', children: [path_(LOGO_D, chu, { 'fill-rule': 'evenodd' })] } },
    ],
  },
})

const coChu = (t) => (t.length > 78 ? 46 : t.length > 56 ? 54 : 62)

// Mẫu "Apple light": nền trắng ngả xám, chữ đen, glyph phần trong một đĩa màu nhạt.
function mauApple(b) {
  const c = MAU[b.maPhan] || MAU.pl
  const dong1 = [h('span', { color: c }, b.phan)]
  if (b.soBai) dong1.push(h('span', { color: '#86868b', fontWeight: 500 }, `· ${b.soBai}`))
  return h('div', {
    width: W, height: H, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    padding: '72px 80px', backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%)',
    fontFamily: 'Inter', position: 'relative',
  }, [
    h('div', { display: 'flex', flexDirection: 'column', gap: 22, width: 760 }, [
      h('div', { display: 'flex', gap: 14, fontSize: 26, fontWeight: 600, letterSpacing: -0.3 }, dong1),
      h('div', { fontSize: coChu(b.tieuDe), fontWeight: 700, color: '#1d1d1f', letterSpacing: -2, lineHeight: 1.08 }, b.tieuDe),
      ...(b.moTa ? [h('div', { fontSize: 26, color: '#6e6e73', lineHeight: 1.35, marginTop: 6 }, b.moTa)] : []),
    ]),
    h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }, [
      h('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
        svgLogo(64, '#111114', '#ffffff'),
        h('div', { display: 'flex', flexDirection: 'column' }, [
          h('div', { fontSize: 28, fontWeight: 700, color: '#1d1d1f', letterSpacing: -0.6 }, 'Học AI Việt'),
          h('div', { fontSize: 20, color: '#86868b' }, 'hocaiviet.com · miễn phí'),
        ]),
      ]),
      b.cap
        ? h('div', { fontSize: 22, fontWeight: 600, color: '#1d1d1f', backgroundColor: '#ffffff', border: '1.5px solid #d2d2d7', borderRadius: 999, padding: '10px 22px' }, b.cap)
        : h('div', {}, ''),
    ]),
    h('div', {
      position: 'absolute', right: 80, top: 72, width: 260, height: 260, borderRadius: 64,
      backgroundColor: c + '14', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }, [svgGlyph(b.maPhan, c, 150)]),
  ])
}

// Mẫu "Apple dark": nền đen keynote, quầng sáng màu phần phía sau glyph.
function mauDark(b) {
  const c = MAU[b.maPhan] || MAU.pl
  const dong1 = [h('span', { color: c }, b.phan)]
  if (b.soBai) dong1.push(h('span', { color: '#8e8e93', fontWeight: 500 }, `· ${b.soBai}`))
  return h('div', {
    width: W, height: H, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    padding: '72px 80px', backgroundColor: '#000000', fontFamily: 'Inter', position: 'relative', overflow: 'hidden',
  }, [
    h('div', {
      position: 'absolute', right: -80, top: -120, width: 620, height: 620, borderRadius: 999,
      backgroundImage: `radial-gradient(circle at 50% 50%, ${c}70 0%, ${c}00 70%)`,
    }, ''),
    h('div', { display: 'flex', flexDirection: 'column', gap: 22, width: 780 }, [
      h('div', { display: 'flex', gap: 14, fontSize: 26, fontWeight: 600, letterSpacing: -0.3 }, dong1),
      h('div', { fontSize: coChu(b.tieuDe), fontWeight: 700, color: '#f5f5f7', letterSpacing: -2, lineHeight: 1.08 }, b.tieuDe),
      ...(b.moTa ? [h('div', { fontSize: 26, color: '#a1a1a6', lineHeight: 1.35, marginTop: 6 }, b.moTa)] : []),
    ]),
    h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }, [
      h('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
        svgLogo(64, '#ffffff', '#000000'),
        h('div', { display: 'flex', flexDirection: 'column' }, [
          h('div', { fontSize: 28, fontWeight: 700, color: '#f5f5f7', letterSpacing: -0.6 }, 'Học AI Việt'),
          h('div', { fontSize: 20, color: '#8e8e93' }, 'hocaiviet.com · miễn phí'),
        ]),
      ]),
      b.cap
        ? h('div', { fontSize: 22, fontWeight: 600, color: '#f5f5f7', backgroundColor: '#1c1c1e', borderRadius: 999, padding: '10px 22px' }, b.cap)
        : h('div', {}, ''),
    ]),
    h('div', { position: 'absolute', right: 96, top: 92, display: 'flex' }, [svgGlyph(b.maPhan, c, 200)]),
  ])
}

// Mẫu "Card": thẻ trắng nổi trên nền màu phần rất nhạt (kiểu App Store / Newsroom).
function mauCard(b) {
  const c = MAU[b.maPhan] || MAU.pl
  const phu = [b.soBai, b.cap].filter(Boolean).join(' · ')
  return h('div', {
    width: W, height: H, display: 'flex', padding: 56, fontFamily: 'Inter',
    backgroundImage: `linear-gradient(135deg, ${c}22 0%, ${c}08 60%, #f5f5f7 100%)`,
  }, [
    h('div', {
      flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      backgroundColor: '#ffffff', borderRadius: 40, padding: '60px 64px',
      boxShadow: `0 30px 80px ${c}33, 0 2px 6px rgba(0,0,0,0.06)`,
    }, [
      h('div', { display: 'flex', alignItems: 'center', gap: 20 }, [
        h('div', { width: 72, height: 72, borderRadius: 20, backgroundColor: c, display: 'flex', alignItems: 'center', justifyContent: 'center' }, [svgGlyph(b.maPhan, '#ffffff', 44)]),
        h('div', { display: 'flex', flexDirection: 'column' }, [
          h('div', { fontSize: 26, fontWeight: 600, color: '#1d1d1f' }, b.phan),
          h('div', { fontSize: 21, color: '#86868b' }, phu || ' '),
        ]),
      ]),
      h('div', { display: 'flex', flexDirection: 'column', gap: 16, width: 940 }, [
        h('div', { fontSize: coChu(b.tieuDe), fontWeight: 700, color: '#1d1d1f', letterSpacing: -2, lineHeight: 1.08 }, b.tieuDe),
        ...(b.moTa ? [h('div', { fontSize: 25, color: '#6e6e73', lineHeight: 1.35 }, b.moTa)] : []),
      ]),
      h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, [
        h('div', { display: 'flex', alignItems: 'center', gap: 14 }, [
          svgLogo(44, '#111114', '#ffffff'),
          h('div', { fontSize: 24, fontWeight: 600, color: '#1d1d1f' }, 'Học AI Việt'),
          h('div', { fontSize: 20, color: '#86868b' }, '· hocaiviet.com'),
        ]),
        h('div', { fontSize: 20, fontWeight: 600, color: c }, 'Miễn phí · Tiếng Việt'),
      ]),
    ]),
  ])
}

const CAC_MAU = { light: mauApple, dark: mauDark, card: mauCard }
// Mặc định "dark" - chủ dự án chọn (2026-09-06) sau khi xem cả ba; hai mẫu kia giữ
// lại để thử nhanh bằng THUMB_MAU=light|card.
const TEN_MAU = process.env.THUMB_MAU || 'dark'
const veMau = CAC_MAU[TEN_MAU]
if (!veMau) throw new Error(`THUMB_MAU không hợp lệ: ${TEN_MAU} (light | dark | card)`)
const OUT_DIR = process.env.THUMB_OUT || OUT

// ---------- 4. Render ----------

const fonts = [400, 600, 700].map((weight) => ({
  name: 'Inter', weight, style: 'normal',
  data: fs.readFileSync(path.join(FONT_DIR, `Inter-${weight}.ttf`)),
}))

async function venAnh(b) {
  const svg = await satori(veMau(b), { width: W, height: H, fonts })
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng()
  const out = duongDanRa(b)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, png)
}

const duongDanRa = (b) => (OUT_DIR === OUT ? b.outPng : path.join(OUT_DIR, path.relative(OUT, b.outPng)))

function canVeLai(b) {
  const out = duongDanRa(b)
  if (!fs.existsSync(out)) return true
  const t = fs.statSync(out).mtimeMs
  return fs.statSync(b.file).mtimeMs > t || fs.statSync(SELF).mtimeMs > t
}

const chiMot = process.argv[2] // tuỳ chọn: chỉ vẽ các bài có đường dẫn chứa chuỗi này (để thử nhanh)
const tatCa = gomBai().filter((b) => !chiMot || b.rel.includes(chiMot))
let ve = 0
const t0 = Date.now()
for (const b of tatCa) {
  if (!canVeLai(b)) continue
  await venAnh(b)
  ve += 1
}
// Ghi kèm mô tả từng bài để config.mts dùng làm <meta name="description"> và og:description
// (chỉ khi chạy đủ, không lọc - để file luôn đầy đủ).
if (!chiMot && OUT_DIR === OUT) {
  const meta = {}
  for (const b of tatCa) if (b.moTa) meta[b.rel] = b.moTa
  fs.writeFileSync(path.join(OUT, '_mo-ta.json'), JSON.stringify(meta, null, 1))
}
console.log(`thumbnail: ${tatCa.length} bài, vẽ lại ${ve} ảnh trong ${((Date.now() - t0) / 1000).toFixed(1)}s -> public/thumb/`)
