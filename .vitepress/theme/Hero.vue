<script setup>
// Hero trang chủ: trả lời trong vài giây "đây là gì, cho ai, bắt đầu ở đâu".
// Chỉ hiện trên web - GitHub bỏ qua thẻ component, nên phần chữ dành cho GitHub
// nằm ngay dưới trong README.md (tiêu đề + dòng mô tả + tuyên ngôn). Giống cách
// <LoTrinh /> vốn đã chỉ hiện trên web.
//
// KHÔNG dùng thẻ <h1>/<h2> trong hero: trang đã có đúng một H1 (dòng "# ..." đầu
// README), thêm heading nữa sẽ làm rối outline bên phải và thứ bậc heading (xấu
// cho SEO/accessibility). Tiêu đề hero là <p> tạo kiểu, không phải heading thật.
// Icon là SVG nét, không emoji - theo bài "trị bệnh UI phèn" và nhận diện đen/trắng.
const DIEM = [
  'Miễn phí 100%',
  'Không cần biết code để bắt đầu',
  'Học bằng dự án thật',
  'Từ cơ bản đến production',
]
</script>

<template>
  <section class="hero" aria-label="Giới thiệu Học AI Việt">
    <p class="hero-eyebrow">Thư viện mở · Miễn phí · Tiếng Việt</p>
    <p class="hero-title">Học AI bằng cách xây sản phẩm thật.</p>
    <p class="hero-sub">
      Từ chưa biết code đến tự build, deploy và vận hành sản phẩm thật với AI —
      đi theo một lộ trình rõ ràng, hoàn toàn miễn phí và mã nguồn mở.
    </p>

    <ul class="hero-diem">
      <li v-for="d in DIEM" :key="d">
        <svg
          class="tick" viewBox="0 0 24 24" width="16" height="16" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
          stroke-linejoin="round" aria-hidden="true"
        ><path d="M20 6 9 17l-5-5" /></svg>
        {{ d }}
      </li>
    </ul>

    <div class="hero-cta">
      <a class="btn btn-primary" href="/00-ban-do-gioi-ai/00-ai-lam-duoc-gi">Bắt đầu học</a>
      <a class="btn btn-alt" href="#lo-trinh-5-cap">Xem lộ trình 5 cấp</a>
    </div>

    <p class="hero-note">
      Chưa từng viết một dòng code nào? Cứ bắt đầu ở bài đầu tiên — mọi thứ đều
      được giải thích lại từ đầu bằng tiếng Việt.
    </p>
  </section>
</template>

<style scoped>
.hero {
  margin: 22px 0 30px;
  padding: 30px 30px 26px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}
.hero-eyebrow {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: var(--vp-c-brand-1);
}
.hero-title {
  margin: 0 0 12px;
  font-size: clamp(26px, 4.6vw, 36px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}
.hero-sub {
  margin: 0 0 20px;
  max-width: 62ch;
  font-size: clamp(15px, 2.2vw, 17px);
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.hero-diem {
  list-style: none;
  margin: 0 0 22px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
}
.hero-diem li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 7px 13px 7px 11px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}
.hero-diem .tick {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}
/* Nút dùng đúng biến của nút VitePress mặc định để khớp màu brand + sáng/tối. */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}
.btn-primary {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background: var(--vp-button-brand-bg);
}
.btn-primary:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background: var(--vp-button-brand-hover-bg);
}
.btn-alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background: var(--vp-button-alt-bg);
}
.btn-alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background: var(--vp-button-alt-hover-bg);
}

.hero-note {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .hero {
    padding: 22px 18px 20px;
    border-radius: 12px;
  }
  /* Nút giãn đầy hàng cho dễ bấm trên điện thoại. */
  .hero-cta .btn {
    flex: 1 1 auto;
  }
}
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
</style>
