<script setup>
import { computed, onMounted } from 'vue'
import { tiGia, ngayTiGia, laTiGiaThat, layTiGia, THUE_VAT } from './ty-gia.js'

onMounted(layTiGia)

const so = computed(() => Math.round(tiGia.value).toLocaleString('vi-VN'))
const phanTramThue = Math.round(THUE_VAT * 100)
</script>

<template>
  <p class="ty-gia">
    Số tiền VND trong bài là <strong>số bạn thực trả</strong>: đã cộng thuế VAT
    {{ phanTramThue }}% cho dịch vụ mua từ nước ngoài, quy đổi theo tỉ giá
    <strong>1 USD ≈ {{ so }}đ</strong>.
    <template v-if="laTiGiaThat">
      Tỉ giá này trang tự lấy mới khi bạn mở bài<template v-if="ngayTiGia">
        (cập nhật {{ ngayTiGia }})</template
      >, nên số bạn thấy luôn sát thực tế.
    </template>
    <template v-else>
      Đây là tỉ giá dự phòng vì trình duyệt chưa lấy được tỉ giá mới.
    </template>
    Cột USD là giá hãng công bố, chưa thuế. Giá gốc có thể thay đổi - luôn kiểm tra lại
    trang chủ của hãng trước khi quyết định trả tiền.
  </p>
</template>

<style scoped>
.ty-gia {
  font-size: 14px;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-divider);
  padding: 8px 0 8px 12px;
  margin: 16px 0;
}
</style>
