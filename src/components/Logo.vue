<template>
  <div class="flex items-center gap-2 select-none" role="img" :aria-label="ariaLabel">
    <img
      src="https://res.cloudinary.com/dlwzazojt/image/upload/v1787367349/logo-pollito-removebg-preview_fhsilm.png"
      :width="size"
      :height="size"
      alt="Pikiitos Logo"
      class="flex-shrink-0 object-contain"
    />
    <img
      v-if="showText"
      src="https://res.cloudinary.com/dlwzazojt/image/upload/v1787349262/logo-pikiitos-texto-removebg-preview_bn2t7l.png"
      alt="Pikiitos"
      class="flex-shrink-0 object-contain h-8 lg:h-10"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: number
  showText?: boolean
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  size: 40,
  showText: false,
  ariaLabel: 'Pikiitos - marca de ropa infantil',
})

defineOptions({ name: 'PikiitosLogo' })
</script>
