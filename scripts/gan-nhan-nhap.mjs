// Chèn khối "Bản nháp" (VitePress custom container) ngay sau tiêu đề H1 của
// từng file trong danh sách. Chạy một lần, không phải script kiểm tra dài hạn.
// TẤT CẢ bài nháp đã được làm dày và gỡ nhãn -> danh sách rỗng. Chỉ thêm lại
// đường dẫn vào đây khi có bài nháp mới cần gắn nhãn tạm.
import fs from 'node:fs'

const FILES = []

const BLOCK = [
  '::: warning Bản nháp - đang hoàn thiện',
  'Bài này mới là khung nội dung: đủ ý chính nhưng còn thiếu ví dụ chạy được, lệnh cụ thể hoặc chi phí ước tính so với chuẩn của thư viện. Đang được làm dày dần - xem tiến độ ở `BACKLOG.md`. Nội dung dưới đây vẫn đúng hướng, chỉ chưa đầy đủ.',
  ':::',
  '',
].join('\n')

let changed = 0
for (const file of FILES) {
  if (!fs.existsSync(file)) {
    console.log(`BỎ QUA (không tồn tại): ${file}`)
    continue
  }
  const txt = fs.readFileSync(file, 'utf8')
  if (txt.includes('::: warning Bản nháp')) {
    console.log(`Đã có nhãn, bỏ qua: ${file}`)
    continue
  }
  const lines = txt.split('\n')
  const h1Index = lines.findIndex((l) => l.startsWith('# '))
  if (h1Index === -1) {
    console.log(`KHÔNG TÌM THẤY H1: ${file}`)
    continue
  }
  // Chèn sau H1 và dòng trống theo sau nó (nếu có).
  let insertAt = h1Index + 1
  if (lines[insertAt] === '') insertAt += 1
  lines.splice(insertAt, 0, '', BLOCK.trimEnd())
  fs.writeFileSync(file, lines.join('\n'))
  changed++
  console.log(`Đã gắn nhãn: ${file}`)
}
console.log(`\nXong: ${changed} file được gắn nhãn.`)
