import { defineConfig, type DefaultTheme } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// File .md công khai ở gốc repo — MỌI file .md khác ở gốc (CLAUDE.md, CONTEXT.md,
// BACKLOG.md, và bất kỳ file nội bộ nào thêm sau này) tự động bị loại khỏi bản
// build, không cần sửa danh sách này mỗi khi có file nội bộ mới — chỉ cần
// KHÔNG thêm tên nó vào đây.
const PUBLIC_ROOT_DOCS = new Set(['README.md', 'CONTRIBUTING.md'])
const internalRootDocs = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.endsWith('.md') && !PUBLIC_ROOT_DOCS.has(d.name))
  .map((d) => d.name)

// Điền địa chỉ repo GitHub dạng "ten-tai-khoan/learn-ai-vietnamese" sau khi đã đẩy code lên GitHub.
// Có giá trị này, web sẽ hiện nút "Đề xuất sửa bài này" và icon GitHub trên thanh menu.
const githubRepo = 'Roccat92/hoc-ai'

const sections = [
  { dir: '00-ban-do-gioi-ai', text: 'Bản đồ giới AI' },
  { dir: '01-bat-dau-tu-so-0', text: 'Bắt đầu từ số 0' },
  { dir: '02-code-voi-ai', text: 'Code với AI' },
  { dir: '03-ha-tang-thuc-chien', text: 'Hạ tầng thực chiến' },
  { dir: '04-build-ung-dung-ai', text: 'Build ứng dụng AI' },
  { dir: '05-train-va-finetune', text: 'Train và fine-tune (nâng cao)' },
  { dir: '06-kho-tai-nguyen', text: 'Kho tài nguyên' },
  { dir: '07-case-study', text: 'Case study' },
  { dir: '08-chuan-hoa-du-an', text: 'Chuẩn hóa dự án (nâng cao)' },
  { dir: '09-du-an-thuc-hanh', text: 'Dự án thực hành' },
  { dir: '10-bao-mat', text: 'Bảo mật tối thiểu' },
  { dir: '11-ra-thi-truong', text: 'Ra thị trường thật (Việt Nam)' },
]

// Thứ tự đọc ưu tiên cho 4 file chuẩn trong mỗi thư mục dự án ở 09-du-an-thuc-hanh/.
const PROJECT_FILE_ORDER = ['spec.md', 'backlog.md', 'CLAUDE.md', 'huong-dan.md']

function headingOf(file: string): string {
  const match = fs.readFileSync(file, 'utf8').match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : path.basename(file, '.md')
}

// Rút gọn tiêu đề cho sidebar: cắt ở dấu ":" hoặc " - " đầu tiên, không để ngoặc mở lửng.
function shortTitle(title: string): string {
  let short = title
  for (const sep of [': ', ' - ']) {
    const i = short.indexOf(sep)
    if (i > 0) {
      short = short.slice(0, i)
      break
    }
  }
  const opens = (short.match(/\(/g) ?? []).length
  const closes = (short.match(/\)/g) ?? []).length
  if (opens > closes) short = short.slice(0, short.lastIndexOf('(')).trim()
  return short
}

// 09-du-an-thuc-hanh/ không chứa bài học phẳng như các phần khác, mà chứa các thư
// mục dự án (du-an-01-..., du-an-02-...), mỗi thư mục gồm 4 file chuẩn
// (spec/backlog/CLAUDE/huong-dan). Dựng sidebar lồng nhau riêng cho trường hợp này.
function projectGroupsOf(dir: string, sectionDir: string): DefaultTheme.SidebarItem[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^du-an-\d+-/.test(d.name))
    .map((d) => d.name)
    .sort()
    .map((projectDir) => {
      const pdir = path.join(dir, projectDir)
      const files = fs.readdirSync(pdir).filter((f) => f.endsWith('.md'))
      const ordered = [
        ...PROJECT_FILE_ORDER.filter((f) => files.includes(f)),
        ...files.filter((f) => !PROJECT_FILE_ORDER.includes(f)).sort(),
      ]
      const specFile = path.join(pdir, 'spec.md')
      const label = fs.existsSync(specFile)
        ? shortTitle(headingOf(specFile).replace(/^Spec:\s*/i, ''))
        : projectDir
      return {
        text: label,
        collapsed: true,
        items: ordered.map((f) => ({
          text: f.replace(/\.md$/, ''),
          link: `/${sectionDir}/${projectDir}/${f.replace(/\.md$/, '')}`,
        })),
      }
    })
}

// phu-luc-cong-cu/ nằm ngoài lộ trình chính (00-11): không đánh số, không bắt buộc
// đọc theo thứ tự. Mỗi thư mục con (chatgpt/, claude-code/, codex/) là một nhóm
// công cụ, có README.md riêng làm trang giới thiệu nhóm và các file NN-*.md bên
// trong liệt kê theo thứ tự số.
function toolGroupsOf(dir: string, sectionDir: string): DefaultTheme.SidebarItem[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map((toolDir) => {
      const tdir = path.join(dir, toolDir)
      const readme = path.join(tdir, 'README.md')
      const label = fs.existsSync(readme) ? headingOf(readme).replace(/^Phụ lục:\s*/i, '') : toolDir
      const files = fs
        .readdirSync(tdir)
        .filter((f) => /^\d+-.*\.md$/.test(f))
        .sort()
      return {
        text: label,
        collapsed: true,
        link: fs.existsSync(readme) ? `/${sectionDir}/${toolDir}/` : undefined,
        items: files.map((f) => ({
          text: shortTitle(headingOf(path.join(tdir, f))),
          link: `/${sectionDir}/${toolDir}/${f.replace(/\.md$/, '')}`,
        })),
      }
    })
}

function buildSidebar(): DefaultTheme.SidebarItem[] {
  const groups = sections.map((section) => {
    const dir = path.join(root, section.dir)
    const isProjectSection = fs
      .readdirSync(dir, { withFileTypes: true })
      .some((d) => d.isDirectory() && /^du-an-\d+-/.test(d.name))
    // Trong 09-du-an-thuc-hanh/, ngoài các thư mục dự án (du-an-NN-...) còn có
    // thể có file bài học phẳng ở gốc phần (ví dụ 04-rubric-va-capstone.md) -
    // gộp cả hai loại, dự án trước rồi tới các file phẳng, để không có bài nào
    // "biến mất" khỏi sidebar chỉ vì phần này có cấu trúc hỗn hợp.
    const flatLessonFiles = fs
      .readdirSync(dir)
      .filter((f) => /^\d+-.*\.md$/.test(f))
      .sort()
    const lessons = isProjectSection
      ? [
          ...projectGroupsOf(dir, section.dir),
          ...flatLessonFiles.map((f) => ({
            text: shortTitle(headingOf(path.join(dir, f))),
            link: `/${section.dir}/${f.replace(/\.md$/, '')}`,
          })),
        ]
      : flatLessonFiles.map((f, i) => ({
          text: `${i + 1}. ${shortTitle(headingOf(path.join(dir, f)))}`,
          link: `/${section.dir}/${f.replace(/\.md$/, '')}`,
        }))
    // Số hiển thị lấy từ chính tiền tố thư mục (vd "10-bao-mat" -> 10), không phải
    // vị trí trong mảng `sections` — để đúng ngay cả khi các phần chưa liền số
    // (ví dụ 09 chưa tồn tại nhưng 10 đã có).
    const sectionNumber = section.dir.match(/^(\d+)/)?.[1] ?? ''
    const text = `${sectionNumber}. ${section.text}`
    const link = `/${section.dir}/`
    // collapsed: true - thu gọn mặc định để sidebar không phải "wall of kiến thức"
    // đập vào mắt người mới ngay lần mở đầu. VitePress tự bung đúng nhóm chứa
    // trang đang đọc, nên không mất khả năng điều hướng khi đang ở giữa một phần.
    return lessons.length ? { text, link, collapsed: true, items: lessons } : { text, link }
  })
  const phuLucDir = path.join(root, 'phu-luc-cong-cu')
  const phuLuc = {
    text: 'Phụ lục: hướng dẫn theo công cụ',
    link: '/phu-luc-cong-cu/',
    collapsed: true,
    items: toolGroupsOf(phuLucDir, 'phu-luc-cong-cu'),
  }
  return [
    { text: 'Trang chủ & lộ trình', link: '/' },
    ...groups,
    phuLuc,
    { text: 'Đóng góp cho thư viện', link: '/CONTRIBUTING' },
  ]
}

const description =
  'Thư viện mở, miễn phí, tiếng Việt: học lập trình và build sản phẩm với AI từ con số 0.'

// hocaiviet.com là domain chính cho SEO - ai.startee.vn và ai.starteex.app cùng
// trỏ vào bản build này (xem worker/index.js: hai domain đó bị 301 redirect
// thẳng về đây) nên mọi trang phải khai canonical về đúng domain chính, tránh
// bị công cụ tìm kiếm coi là nội dung trùng lặp giữa nhiều domain.
const CANONICAL_ORIGIN = 'https://hocaiviet.com'

// Mô tả riêng từng bài, sinh cùng lúc với thumbnail (public/thumb/_mo-ta.json, không commit).
const MO_TA_BAI: Record<string, string> = (() => {
  const f = path.join(root, 'public', 'thumb', '_mo-ta.json')
  try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch { return {} }
})()

// Suy ra đường dẫn công khai (sau rewrite, sau khi bỏ .md) từ relativePath VitePress
// đưa vào transformPageData - relativePath ở bước này ĐÃ được áp rewrite
// (README.md -> index.md) nên chỉ cần bỏ .md và xử lý riêng trang "index".
function canonicalPathOf(relativePath: string): string {
  const clean = relativePath.replace(/\.md$/, '')
  if (clean === 'index') return '/'
  if (clean.endsWith('/index')) return `/${clean.slice(0, -'index'.length)}`
  return `/${clean}`
}

export default defineConfig({
  lang: 'vi-VN',
  title: 'Học AI Việt',
  description,
  srcExclude: ['**/node_modules/**', ...internalRootDocs],
  rewrites: {
    'README.md': 'index.md',
    ':dir/README.md': ':dir/index.md',
    // phu-luc-cong-cu/ có thêm một cấp thư mục con theo công cụ (chatgpt/,
    // claude-code/, codex/), nên cần khai riêng - quy tắc ":dir/README.md" ở trên
    // chỉ khớp đúng một cấp.
    'phu-luc-cong-cu/:tool/README.md': 'phu-luc-cong-cu/:tool/index.md',
  },
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: [(url) => /LICENSE$/.test(url)],
  transformPageData(pageData) {
    if (pageData.relativePath === '404.md') return
    const head = (pageData.frontmatter.head ??= [])
    const duongDan = canonicalPathOf(pageData.relativePath)
    head.push(['link', { rel: 'canonical', href: `${CANONICAL_ORIGIN}${duongDan}` }])
    // Thẻ Open Graph theo TỪNG trang: tiêu đề bài, mô tả và ảnh thumbnail riêng
    // (public/thumb/... do scripts/tao-thumbnail.mjs sinh trước khi build - xem
    // "docs:build" trong package.json). Trang chủ hoặc trang chưa có ảnh riêng
    // thì dùng ảnh chung /og.png (trang chủ cũng có thẻ riêng: thumb/index.png).
    const anhRieng = pageData.relativePath.replace(/.md$/, '.png')
    const coAnhRieng = fs.existsSync(path.join(root, 'public', 'thumb', anhRieng))
    const ogImage = coAnhRieng ? `${CANONICAL_ORIGIN}/thumb/${anhRieng}` : `${CANONICAL_ORIGIN}/og.png`
    const ogTitle = duongDan === '/' ? 'Học AI Việt' : `${pageData.title} | Học AI Việt`
    // Mô tả riêng từng bài (câu "học xong bạn sẽ...") do scripts/tao-thumbnail.mjs rút ra.
    if (!pageData.description && MO_TA_BAI[pageData.relativePath]) pageData.description = MO_TA_BAI[pageData.relativePath]
    head.push(
      ['meta', { property: 'og:type', content: duongDan === '/' ? 'website' : 'article' }],
      ['meta', { property: 'og:url', content: `${CANONICAL_ORIGIN}${duongDan}` }],
      ['meta', { property: 'og:title', content: ogTitle }],
      ['meta', { property: 'og:description', content: pageData.description || description }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: ogTitle }],
      ['meta', { name: 'twitter:image', content: ogImage }],
    )
  },
  head: [
    // Nhận diện: số 0 có lỗ + dấu mũ nêm, nền đen - file gốc ở public/, PNG sinh bằng scripts/tao-icon.ps1.
    // Thẻ og:*/twitter:* sinh theo từng trang trong transformPageData ở trên.
    ["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
    ["link", { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }],
    // Google Analytics (gtag.js) - theo dõi lượt xem trang, không gắn thông tin cá nhân.
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-Y4CJYVYEV4' }],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-Y4CJYVYEV4');",
    ],
  ],
  themeConfig: {
    logo: { light: "/logo.svg", dark: "/logo-dark.svg", alt: "" },
    siteTitle: 'Học AI Việt',
    nav: [
      { text: 'Bắt đầu học', link: '/00-ban-do-gioi-ai/00-ai-lam-duoc-gi' },
      { text: 'Từ điển thuật ngữ', link: '/00-ban-do-gioi-ai/06-tu-dien-thuat-ngu' },
      { text: 'Đóng góp', link: '/CONTRIBUTING' },
    ],
    sidebar: buildSidebar(),
    outline: { level: [2, 3], label: 'Trong bài này' },
    docFooter: { prev: 'Bài trước', next: 'Bài tiếp theo' },
    lastUpdated: {
      text: 'Cập nhật lần cuối',
      formatOptions: { dateStyle: 'long', forceLocale: true },
    },
    sidebarMenuLabel: 'Mục lục',
    returnToTopLabel: 'Lên đầu trang',
    darkModeSwitchLabel: 'Giao diện',
    lightModeSwitchTitle: 'Chuyển sang giao diện sáng',
    darkModeSwitchTitle: 'Chuyển sang giao diện tối',
    skipToContentLabel: 'Bỏ qua tới nội dung',
    externalLinkIcon: true,
    notFound: {
      title: 'Không tìm thấy trang',
      quote: 'Trang này không tồn tại hoặc đã được chuyển đi.',
      linkLabel: 'về trang chủ',
      linkText: 'Về trang chủ',
    },
    footer: {
      message: 'Phát hành theo giấy phép MIT - dùng, sửa, chia sẻ lại thoải mái.',
      copyright: '© 2026 Học AI Việt - cộng đồng đóng góp',
    },
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: { buttonText: 'Tìm kiếm', buttonAriaLabel: 'Tìm kiếm' },
          modal: {
            displayDetails: 'Hiện chi tiết',
            resetButtonTitle: 'Xóa',
            backButtonTitle: 'Đóng',
            noResultsText: 'Không tìm thấy kết quả cho',
            footer: {
              selectText: 'chọn',
              selectKeyAriaLabel: 'enter',
              navigateText: 'di chuyển',
              navigateUpKeyAriaLabel: 'mũi tên lên',
              navigateDownKeyAriaLabel: 'mũi tên xuống',
              closeText: 'đóng',
              closeKeyAriaLabel: 'escape',
            },
          },
        },
        // Bỏ dấu tiếng Việt khi lập chỉ mục và khi tìm, để gõ "hoc ai" vẫn ra "học AI".
        // Hai hàm dưới đây được VitePress chuyển sang trình duyệt dưới dạng chuỗi,
        // nên phải tự chứa, không được gọi biến/hàm bên ngoài.
        miniSearch: {
          options: {
            processTerm: (term: string) =>
              term.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'),
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 },
            processTerm: (term: string) =>
              term.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'),
          },
        },
      },
    },
    ...(githubRepo
      ? {
          editLink: {
            pattern: `https://github.com/${githubRepo}/edit/main/:path`,
            text: 'Đề xuất sửa bài này trên GitHub',
          },
          socialLinks: [{ icon: 'github', link: `https://github.com/${githubRepo}` }],
        }
      : {}),
  },
})
