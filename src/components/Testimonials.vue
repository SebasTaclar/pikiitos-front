<template>
  <section class="py-10 lg:py-12 bg-pikiitos-cream/30">
    <div class="section-padding">
      <div class="section-container">
        <!-- Section Header -->
        <div class="text-center mb-8 lg:mb-14">
          <span class="inline-block font-poppins font-semibold text-[11px] sm:text-sm tracking-widest uppercase mb-2 sm:mb-3" style="color: #FF8E8E">Lo que dicen las familias</span>
          <h2 class="font-fredoka font-bold text-2xl sm:text-4xl lg:text-5xl text-pikiitos-brown">
            Testimonios
          </h2>
        </div>

        <!-- Testimonials Slider -->
        <div class="relative overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(group, groupIndex) in testimonialGroups"
              :key="groupIndex"
              class="w-full flex-shrink-0 px-2"
            >
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div
                  v-for="testimonial in group"
                  :key="testimonial.name"
                  class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-soft border border-pikiitos-cream/50 transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1"
                >
                  <!-- Stars -->
                  <div class="flex gap-1 mb-3 sm:mb-4">
                    <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pikiitos-yellow" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </div>

                  <p class="font-poppins text-sm text-pikiitos-text-light leading-relaxed mb-4 sm:mb-6">
                    "{{ testimonial.text }}"
                  </p>

                  <div class="flex items-center gap-2.5 sm:gap-3">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg" :class="testimonial.avatarBg">
                      {{ testimonial.emoji }}
                    </div>
                    <div>
                      <p class="font-nunito font-bold text-xs sm:text-sm text-pikiitos-brown">{{ testimonial.name }}</p>
                      <p class="font-poppins text-[10px] sm:text-xs text-pikiitos-text-muted">{{ testimonial.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation dots -->
          <div class="flex justify-center gap-2 mt-5 sm:mt-8">
            <button
              v-for="(_, index) in testimonialGroups"
              :key="index"
              @click="currentSlide = index"
              class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300"
              :class="currentSlide === index ? 'bg-pikiitos-yellow w-6 sm:w-8' : 'bg-pikiitos-yellow/30 hover:bg-pikiitos-yellow/50'"
              :aria-label="`Grupo de testimonios ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const testimonials = [
  {
    name: 'María García',
    role: 'Mamá de Sofía (3 años)',
    text: 'La calidad de las prendas es increíble. Sofía no se quiere quitar el vestido de flores. ¡Es súper suave y los colores no se lavan!',
    emoji: '👩‍👧',
    avatarBg: 'bg-pikiitos-pink/15',
  },
  {
    name: 'Laura Rodríguez',
    role: 'Mamá de Mateo (5 años)',
    text: 'Los diseños son únicos y súper tiernos. Mi hijo se siente el más guapo con sus camisetas. El envío fue rapidísimo.',
    emoji: '👩‍👦',
    avatarBg: 'bg-pikiitos-baby/15',
  },
  {
    name: 'Ana Martínez',
    role: 'Mamá de Valentina (1 año)',
    text: 'Los bodies son de una calidad excepcional. Súper suaves para la piel de mi bebé. Ya hice 4 pedidos y seguiré comprando.',
    emoji: '👩‍👶',
    avatarBg: 'bg-pikiitos-mint/15',
  },
  {
    name: 'Carolina López',
    role: 'Mamá de Lucas (4 años)',
    text: 'Las prendas son hermosas y muy cómodas. Mi hijo juega todo el día y la ropa aguanta perfecto. 100% recomendado.',
    emoji: '👩‍👦',
    avatarBg: 'bg-pikiitos-yellow/15',
  },
  {
    name: 'Isabella Torres',
    role: 'Mamá de Emma (2 años)',
    text: 'Me encanta que los diseños sean tan originales. Emma siempre recibe cumplidos. La tela es de primera calidad.',
    emoji: '👩‍👧',
    avatarBg: 'bg-pikiitos-lavender/15',
  },
  {
    name: 'Daniela Ruiz',
    role: 'Mamá de Santiago (6 años)',
    text: 'Excelente relación calidad-precio. Los colores son preciosos y la ropa no pierde forma después de varios lavados.',
    emoji: '👩‍👦',
    avatarBg: 'bg-pikiitos-peach/15',
  },
]

const itemsPerSlide = computed(() => {
  if (typeof window !== 'undefined' && window.innerWidth >= 1024) return 3
  if (typeof window !== 'undefined' && window.innerWidth >= 640) return 2
  return 1
})

const testimonialGroups = computed(() => {
  const groups = []
  for (let i = 0; i < testimonials.length; i += itemsPerSlide.value) {
    groups.push(testimonials.slice(i, i + itemsPerSlide.value))
  }
  return groups
})

const currentSlide = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % testimonialGroups.value.length
}

const startAutoplay = () => {
  autoplayTimer = setInterval(nextSlide, 5000)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

defineOptions({ name: 'TestimonialsSection' })
</script>
