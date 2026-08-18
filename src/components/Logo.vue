<template>
  <div class="flex items-center gap-2 select-none" role="img" :aria-label="ariaLabel">
    <img
      src="@/assets/logo-pollito.png"
      :width="size"
      :height="size"
      alt="Pikiitos Logo"
      class="flex-shrink-0 object-contain"
    />
    <img
      v-if="showText"
      src="@/assets/logo-pikiitos-texto.png"
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
