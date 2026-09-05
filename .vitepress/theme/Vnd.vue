<script setup>
import { computed, onMounted } from 'vue'
import { tiGia, doiSangVnd, layTiGia, laTiGiaThat } from './ty-gia.js'

const props = defineProps({
  usd: { type: [Number, String], required: true },
  sau: { type: String, default: '' }
})

onMounted(layTiGia)

const soTien = computed(() => doiSangVnd(props.usd).toLocaleString('vi-VN'))
const chuThich = computed(
  () =>
    '1 USD ≈ ' +
    Math.round(tiGia.value).toLocaleString('vi-VN') +
    'đ' +
    (laTiGiaThat.value ? ' (tỉ giá thật, tự cập nhật)' : ' (tỉ giá dự phòng)')
)
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
