<template>
  <section class="py-20 lg:py-28 bg-white">
    <div class="section-padding">
      <div class="section-container">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="group text-center p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1"
            :class="benefit.bgClass"
          >
            <div class="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">
              {{ benefit.emoji }}
            </div>
            <h3 class="font-nunito font-bold text-base sm:text-lg text-pikiitos-brown mb-2">
              {{ benefit.title }}
            </h3>
            <p class="font-poppins text-sm text-pikiitos-text-light leading-relaxed">
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
    description: 'Recibe tu pedido en la puerta de tu casa sin costo en compras superiores a $150.000',
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
    description: 'Colecciones exclusivas diseñadas con amor para que tu hijo sea el más tierno',
    bgClass: 'bg-pikiitos-pink/5 hover:bg-pikiitos-pink/10',
  },
  {
    emoji: '🔒',
    title: 'Pago Seguro',
    description: 'Compra con total confianza. Tus datos están protegidos con encriptación SSL',
    bgClass: 'bg-pikiitos-mint/10 hover:bg-pikiitos-mint/20',
  },
]

defineOptions({ name: 'BenefitsSection' })
</script>
