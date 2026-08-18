<template>
  <section class="py-24 lg:py-32 bg-white relative overflow-hidden">
    <!-- Decorative background -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute top-0 left-0 w-72 h-72 bg-pikiitos-yellow/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-pikiitos-pink/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
    </div>

    <div class="section-padding relative z-10">
      <div class="section-container">
        <div class="max-w-4xl mx-auto text-center">
          <div class="text-5xl mb-8">💛</div>
          <blockquote class="font-fredoka font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-pikiitos-brown leading-snug text-balance">
            Porque la ropa se queda pequeña con el tiempo,
            <span class="text-pikiitos-yellow">pero los recuerdos</span>
            que se crean con ella
            <span class="text-pikiitos-yellow">permanecen para siempre.</span>
          </blockquote>
          <div class="mt-10 flex items-center justify-center gap-3">
            <span class="w-12 h-0.5 bg-pikiitos-yellow/40 rounded-full"></span>
            <span class="text-xl">🐣</span>
            <span class="w-12 h-0.5 bg-pikiitos-yellow/40 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'EmotionalBanner' })
</script>
