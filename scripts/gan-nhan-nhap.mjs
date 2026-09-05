// Chèn khối "Bản nháp" (VitePress custom container) ngay sau tiêu đề H1 của
// từng file trong danh sách. Chạy một lần, không phải script kiểm tra dài hạn -
// xóa khối này thủ công khi bài đã làm dày đủ 6 khối theo BACKLOG.md.
import fs from 'node:fs'

const FILES = [
  '01-bat-dau-tu-so-0/10-file-web-va-server-hoat-dong-the-nao.md',
  '01-bat-dau-tu-so-0/11-json-api-database-crud.md',
  '02-code-voi-ai/10-codex-cai-dat-va-chon-noi-lam-viec.md',
  '02-code-voi-ai/11-codex-task-dau-tien-va-quyen-han.md',
  '02-code-voi-ai/12-codex-prompt-ngu-canh-va-agents-md.md',
  '02-code-voi-ai/13-codex-sua-code-test-va-review.md',
  '02-code-voi-ai/14-codex-model-reasoning-va-han-muc.md',
  '02-code-voi-ai/15-codex-skills-plugins-mcp.md',
  '02-code-voi-ai/16-codex-subagent-va-tu-dong-hoa.md',
  '02-code-voi-ai/17-codex-xu-ly-loi.md',
  '02-code-voi-ai/18-debug-devtools-va-git-nang-cao.md',
  '03-ha-tang-thuc-chien/06-database-production-ci-cd-monitoring.md',
  '04-build-ung-dung-ai/06-structured-output-evals-va-reliability.md',
  '04-build-ung-dung-ai/07-evals-va-prompt-versioning.md',
  '04-build-ung-dung-ai/08-rag-quality-va-bao-mat.md',
  '04-build-ung-dung-ai/09-agent-guardrail-va-quan-sat.md',
  '05-train-va-finetune/05-eval-truoc-khi-fine-tune.md',
  '09-du-an-thuc-hanh/04-rubric-va-capstone.md',
  '10-bao-mat/07-bao-mat-ung-dung-ai.md',
  '11-ra-thi-truong/04-xac-thuc-van-de-va-analytics.md',
  '11-ra-thi-truong/05-thanh-toan-email-va-van-hanh.md',
]

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
