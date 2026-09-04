import { defineConfig, type DefaultTheme } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// File .md công khai ở gốc repo — MỌI file .md khác ở gốc (CLAUDE.md, CONTEXT.md,
// MO-RONG-REPO.md, PROMPT-CHO-CLAUDE-CODE.md, BACKLOG.md, và bất kỳ file nội bộ
// nào thêm sau này) tự động bị loại khỏi bản build, không cần sửa danh sách này
// mỗi khi có file nội bộ mới — chỉ cần KHÔNG thêm tên nó vào đây.
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

function buildSidebar(): DefaultTheme.SidebarItem[] {
  const groups = sections.map((section) => {
    const dir = path.join(root, section.dir)
    const isProjectSection = fs
      .readdirSync(dir, { withFileTypes: true })
      .some((d) => d.isDirectory() && /^du-an-\d+-/.test(d.name))
    const lessons = isProjectSection
      ? projectGroupsOf(dir, section.dir)
      : fs
          .readdirSync(dir)
          .filter((f) => /^\d+-.*\.md$/.test(f))
          .sort()
          .map((f, i) => ({
            text: `${i + 1}. ${shortTitle(headingOf(path.join(dir, f)))}`,
            link: `/${section.dir}/${f.replace(/\.md$/, '')}`,
          }))
    // Số hiển thị lấy từ chính tiền tố thư mục (vd "10-bao-mat" -> 10), không phải
    // vị trí trong mảng `sections` — để đúng ngay cả khi các phần chưa liền số
    // (ví dụ 09 chưa tồn tại nhưng 10 đã có).
    const sectionNumber = section.dir.match(/^(\d+)/)?.[1] ?? ''
    const text = `${sectionNumber}. ${section.text}`
    const link = `/${section.dir}/`
    return lessons.length ? { text, link, collapsed: false, items: lessons } : { text, link }
  })
  return [
    { text: 'Trang chủ & lộ trình', link: '/' },
    ...groups,
    { text: 'Đóng góp cho thư viện', link: '/CONTRIBUTING' },
  ]
}

const description =
  'Thư viện mở, miễn phí, tiếng Việt: học lập trình và build sản phẩm với AI từ con số 0.'

export default defineConfig({
  lang: 'vi-VN',
  title: 'Học AI Việt',
  description,
  srcExclude: ['**/node_modules/**', ...internalRootDocs],
  rewrites: {
    'README.md': 'index.md',
    ':dir/README.md': ':dir/index.md',
  },
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: [(url) => /LICENSE$/.test(url)],
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%93%9A%3C/text%3E%3C/svg%3E",
      },
    ],
    ['meta', { property: 'og:title', content: 'Học AI Việt' }],
    ['meta', { property: 'og:description', content: description }],
  ],
  themeConfig: {
    siteTitle: 'Học AI Việt',
    nav: [
      { text: 'Bắt đầu học', link: '/00-ban-do-gioi-ai/01-ai-la-gi' },
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
