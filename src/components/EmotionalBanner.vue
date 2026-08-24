<template>
  <section class="py-4 sm:py-10 lg:py-14 relative overflow-hidden bg-white">
    <!-- Background image small -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <img src="https://res.cloudinary.com/dlwzazojt/image/upload/v1787584794/emotional_gnufw7.jpg" alt="" class="bg-emotional" />
    </div>

    <div class="section-padding relative z-10">
      <div class="section-container">
        <div class="text-center">
          <div class="mb-2 sm:mb-6">
            <svg class="w-12 h-12 mx-auto animate-heartbeat" viewBox="0 0 24 24" fill="#FFD84D" stroke="#3D2E1F" stroke-width="1.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <blockquote class="font-fredoka font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-pikiitos-brown leading-snug text-balance">
            Porque la ropa se queda pequeña con el tiempo,
            <span class="text-pikiitos-yellow">pero los recuerdos</span>
            que se crean con ella
            <span class="text-pikiitos-yellow">permanecen para siempre.</span>
          </blockquote>
          <div class="mt-4 sm:mt-8 flex items-center justify-center gap-0">
            <svg class="w-36 sm:w-48 h-4" viewBox="0 0 200 10" fill="none">
              <path d="M0 5 Q50 0, 100 5 Q150 10, 200 5" stroke="#8B6914" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span class="text-2xl mx-2 flex-shrink-0">🐣</span>
            <svg class="w-36 sm:w-48 h-4" viewBox="0 0 200 10" fill="none">
              <path d="M0 5 Q50 10, 100 5 Q150 0, 200 5" stroke="#8B6914" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'EmotionalBanner' })
</script>

<style scoped>
.bg-emotional {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140%;
  max-width: none;
  height: 100%;
  object-fit: contain;
  object-position: center;
  opacity: 0.3;
}
@media (min-width: 640px) {
  .bg-emotional {
    top: 80%;
    width: 100%;
    object-fit: contain;
    height: auto;
    opacity: 0.2;
  }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.2); }
  30% { transform: scale(1); }
  45% { transform: scale(1.15); }
  60% { transform: scale(1); }
}
.animate-heartbeat {
  animation: heartbeat 1.8s ease-in-out infinite;
}
</style>
