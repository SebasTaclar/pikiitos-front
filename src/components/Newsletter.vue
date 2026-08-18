<template>
  <section class="py-20 lg:py-28 bg-white">
    <div class="section-padding">
      <div class="section-container">
        <div class="relative bg-gradient-to-r from-pikiitos-yellow via-pikiitos-yellow-light to-pikiitos-yellow rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
          <!-- Decorative elements -->
          <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div class="absolute top-6 left-8 text-4xl opacity-30 animate-float">⭐</div>
            <div class="absolute bottom-6 right-12 text-3xl opacity-25 animate-float-slow">🐣</div>
            <div class="absolute top-1/2 right-1/4 text-2xl opacity-20 animate-float-delayed">💛</div>
          </div>

          <div class="relative z-10 px-8 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20 text-center">
            <span class="text-4xl mb-4 block">💌</span>
            <h2 class="font-fredoka font-bold text-2xl sm:text-3xl lg:text-4xl text-pikiitos-brown mb-4">
              ¡No te pierdas nada!
            </h2>
            <p class="font-poppins text-pikiitos-brown/80 text-base sm:text-lg max-w-lg mx-auto mb-8">
              Suscríbete y recibe primero nuestras novedades, ofertas exclusivas y mucho cariño para tus pequeños.
            </p>

            <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                v-model="email"
                type="email"
                placeholder="Tu correo electrónico"
                required
                class="flex-1 px-6 py-4 rounded-full bg-white/80 backdrop-blur-sm font-poppins text-pikiitos-brown placeholder-pikiitos-text-muted border-2 border-transparent focus:border-pikiitos-yellow-dark focus:outline-none focus:bg-white transition-all shadow-soft"
                aria-label="Correo electrónico para newsletter"
              />
              <button
                type="submit"
                class="px-8 py-4 bg-pikiitos-brown text-white font-poppins font-semibold rounded-full hover:bg-pikiitos-text transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                Suscribirme
              </button>
            </form>

            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-200 ease-in"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <p v-if="subscribed" class="mt-4 font-poppins text-sm text-pikiitos-brown font-medium">
                ¡Gracias por suscribirte! 💛 Pronto recibirás noticias nuestras.
              </p>
            </Transition>

            <p class="font-poppins text-xs text-pikiitos-brown/50 mt-4">
              No compartimos tu información. Puedes darte de baja cuando quieras.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

const handleSubscribe = () => {
  if (email.value) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => {
      subscribed.value = false
    }, 5000)
  }
}

defineOptions({ name: 'NewsletterSection' })
</script>
