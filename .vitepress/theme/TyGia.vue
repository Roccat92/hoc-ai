<script setup>
import { computed, onMounted } from 'vue'
import { tiGia, ngayTiGia, laTiGiaThat, layTiGia } from './ty-gia.js'

onMounted(layTiGia)

const so = computed(() => Math.round(tiGia.value).toLocaleString('vi-VN'))
</script>

<template>
  <p class="ty-gia">
    Mọi số tiền VND trong bài được quy đổi theo tỉ giá
    <strong>1 USD ≈ {{ so }}đ</strong>.
    <template v-if="laTiGiaThat">
      Tỉ giá này trang tự lấy mới khi bạn mở bài<template v-if="ngayTiGia">
        (cập nhật {{ ngayTiGia }})</template
      >, nên số bạn thấy luôn sát thực tế.
    </template>
    <template v-else>
      Đây là tỉ giá dự phòng vì trình duyệt chưa lấy được tỉ giá mới.
    </template>
    Giá gốc do hãng công bố bằng USD và có thể thay đổi - luôn kiểm tra lại trang chủ của
    hãng trước khi quyết định trả tiền.
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
