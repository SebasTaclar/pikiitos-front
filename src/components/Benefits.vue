<template>
  <section class="py-10 lg:py-28 relative overflow-hidden bg-white">
    <!-- Background image -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <img src="https://res.cloudinary.com/dlwzazojt/image/upload/v1787344559/Gemini_Generated_Image_1al3ii1al3ii1al3_ihzjux.jpg" alt="" class="benefits-bg" />
    </div>

    <div class="section-padding relative z-10">
      <div class="section-container">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="group text-center p-4 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1"
            :class="benefit.bgClass"
          >
            <div class="text-3xl sm:text-5xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-500">
              {{ benefit.emoji }}
            </div>
            <h3 class="font-nunito font-bold text-sm sm:text-lg text-pikiitos-brown mb-1 sm:mb-2">
              {{ benefit.title }}
            </h3>
            <p class="font-poppins text-[11px] sm:text-sm text-pikiitos-text-light leading-relaxed">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const benefits = [
  {
    emoji: '🚚',
    title: 'Envíos a todo Colombia',
    description: 'Recibe tu pedido en la puerta de tu casa',
    bgClass: 'bg-pikiitos-cream/40 hover:bg-pikiitos-cream/70',
  },
  {
    emoji: '💛',
    title: 'Calidad Premium',
    description: 'Tejidos suaves, duraderos y seguros para la piel más delicada de los pequeños',
    bgClass: 'bg-pikiitos-yellow/5 hover:bg-pikiitos-yellow/10',
  },
  {
    emoji: '🧸',
    title: 'Diseños Únicos',
    description: 'Colecciones exclusivas diseñadas con amor para que tu pequeño/pequeña sea el más tierno',
    bgClass: 'bg-pikiitos-pink/5 hover:bg-pikiitos-pink/10',
  },
  {
    emoji: '🔒',
    title: 'Pago Seguro',
    description: 'Compra con total confianza. Tus datos están protegidos.',
    bgClass: 'bg-pikiitos-mint/10 hover:bg-pikiitos-mint/20',
  },
]

defineOptions({ name: 'BenefitsSection' })
</script>

<style scoped>
.benefits-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.15;
}
@media (min-width: 640px) {
  .benefits-bg {
    object-fit: contain;
    height: auto;
  }
}
</style>
