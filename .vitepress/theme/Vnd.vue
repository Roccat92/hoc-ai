<script setup>
import { computed, onMounted } from 'vue'
import { tiGia, doiSangVnd, layTiGia, laTiGiaThat, THUE_VAT } from './ty-gia.js'

const props = defineProps({
  usd: { type: [Number, String], required: true },
  sau: { type: String, default: '' },
  // Mặc định cộng VAT vì đây là số người mua ở Việt Nam thực trả.
  // Dùng <Vnd usd="10" khong-thue /> cho khoản không chịu thuế.
  khongThue: { type: Boolean, default: false }
})

onMounted(layTiGia)

const soTien = computed(() =>
  doiSangVnd(props.usd, !props.khongThue).toLocaleString('vi-VN')
)

const chuThich = computed(() => {
  const tg = Math.round(tiGia.value).toLocaleString('vi-VN')
  return (
    props.usd +
    ' USD' +
    (props.khongThue ? '' : ' cộng VAT ' + Math.round(THUE_VAT * 100) + '%') +
    ', tỉ giá 1 USD ≈ ' + tg + 'đ' +
    (laTiGiaThat.value ? ' (tỉ giá thật, tự cập nhật)' : ' (tỉ giá dự phòng)')
  )
})
</script>

<template>
  <span class="vnd" :title="chuThich">≈ {{ soTien }}đ<span v-if="sau">{{ sau }}</span></span>
</template>

<style scoped>
.vnd {
  white-space: nowrap;
  color: var(--vp-c-text-2);
  border-bottom: 1px dotted var(--vp-c-divider);
  cursor: help;
}
</style>
