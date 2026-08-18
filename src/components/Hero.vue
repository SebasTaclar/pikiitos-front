<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-pikiitos-cream via-white to-pikiitos-yellow/10 min-h-[85vh] lg:min-h-[90vh] flex items-center">
    <!-- Floating decorative elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div class="absolute top-20 left-[8%] w-16 h-16 bg-pikiitos-yellow/20 rounded-full animate-float blur-sm"></div>
      <div class="absolute top-40 right-[12%] w-12 h-12 bg-pikiitos-pink/15 rounded-full animate-float-slow blur-sm"></div>
      <div class="absolute bottom-32 left-[15%] w-10 h-10 bg-pikiitos-mint/25 rounded-full animate-float-delayed blur-sm"></div>
      <div class="absolute bottom-20 right-[20%] w-14 h-14 bg-pikiitos-baby/20 rounded-full animate-float blur-sm"></div>
      <div class="absolute top-[60%] left-[5%] w-8 h-8 bg-pikiitos-lavender/20 rounded-full animate-float-slow blur-sm"></div>
      <div class="absolute top-[15%] right-[5%] w-20 h-20 bg-pikiitos-peach/15 rounded-full animate-float-delayed blur-sm"></div>

      <!-- Subtle star shapes -->
      <svg class="absolute top-32 left-[30%] w-6 h-6 text-pikiitos-yellow/30 animate-wiggle" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6.4-4.8-6.4 4.8 2.4-7.4-6-4.6h7.6z"/></svg>
      <svg class="absolute bottom-40 right-[35%] w-5 h-5 text-pikiitos-pink/25 animate-wiggle" style="animation-delay: 0.5s" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6.4-4.8-6.4 4.8 2.4-7.4-6-4.6h7.6z"/></svg>
      <svg class="absolute top-[50%] right-[8%] w-4 h-4 text-pikiitos-mint/30 animate-wiggle" style="animation-delay: 1s" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6.4-4.8-6.4 4.8 2.4-7.4-6-4.6h7.6z"/></svg>
    </div>

    <div class="section-padding w-full relative z-10">
      <div class="section-container">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Text Content -->
          <div class="text-center lg:text-left order-2 lg:order-1">
            <div class="inline-flex items-center gap-2 bg-pikiitos-yellow/15 border border-pikiitos-yellow/20 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <span class="text-lg">🐣</span>
              <span class="text-sm font-poppins font-medium text-pikiitos-brown">Nueva colección disponible</span>
            </div>

            <h1 class="font-fredoka font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-pikiitos-brown leading-tight mb-6 animate-fade-in-up" style="animation-delay: 0.1s">
              Cada prenda guarda
              <span class="relative inline-block">
                <span class="text-pikiitos-yellow">un recuerdo</span>
                <svg class="absolute -bottom-2 left-0 w-full h-3 text-pikiitos-yellow/40" viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M0 8 Q50 0 100 8 Q150 16 200 8" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/></svg>
              </span>
            </h1>

            <p class="font-poppins text-lg sm:text-xl text-pikiitos-text-light max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s">
              Diseños llenos de amor, color y alegría para que los más pequeños vivan cada momento con estilo y comodidad.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style="animation-delay: 0.3s">
              <RouterLink to="/productos" class="btn-pikiitos text-base">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                Explorar Tienda
              </RouterLink>
              <RouterLink to="/colecciones" class="btn-pikiitos-outline text-base">
                Ver Colecciones
              </RouterLink>
            </div>

            <!-- Trust signals -->
            <div class="flex items-center gap-6 mt-10 justify-center lg:justify-start animate-fade-in-up" style="animation-delay: 0.4s">
              <div class="flex items-center gap-2">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 rounded-full bg-pikiitos-pink/20 border-2 border-white flex items-center justify-center text-xs">👶</div>
                  <div class="w-8 h-8 rounded-full bg-pikiitos-baby/20 border-2 border-white flex items-center justify-center text-xs">👧</div>
                  <div class="w-8 h-8 rounded-full bg-pikiitos-mint/20 border-2 border-white flex items-center justify-center text-xs">👦</div>
                </div>
                <span class="text-sm font-poppins text-pikiitos-text-muted">+2,000 familias felices</span>
              </div>
            </div>
          </div>

          <!-- Hero Image / Illustration -->
          <div class="order-1 lg:order-2 flex justify-center animate-fade-in" style="animation-delay: 0.2s">
            <div class="relative">
              <!-- Main circle -->
              <div class="w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] rounded-full bg-gradient-to-br from-pikiitos-yellow/30 via-pikiitos-peach/20 to-pikiitos-pink/10 flex items-center justify-center relative">
                <!-- Inner circle -->
                <div class="w-56 h-56 sm:w-64 sm:h-64 lg:w-[320px] lg:h-[320px] xl:w-[370px] xl:h-[370px] rounded-full bg-gradient-to-br from-pikiitos-yellow/20 via-white to-pikiitos-cream flex items-center justify-center">
                  <!-- Center illustration -->
                  <div class="text-center">
                    <img src="@/assets/logo-pollito.png" alt="Pikiitos Pollito" class="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 animate-bounce-gentle mix-blend-multiply" />
                    <p class="font-fredoka font-semibold text-pikiitos-brown text-lg lg:text-xl mt-4">Pikiitos</p>
                    <p class="font-poppins text-pikiitos-text-muted text-sm">pequeños momentos</p>
                  </div>
                </div>

                <!-- Floating elements around circle -->
                <div class="absolute -top-4 -right-4 lg:top-2 lg:right-4 bg-white rounded-2xl shadow-soft px-4 py-3 animate-float">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl">🧸</span>
                    <div>
                      <p class="font-poppins font-semibold text-pikiitos-brown text-sm">Diseños Únicos</p>
                      <p class="font-poppins text-pikiitos-text-muted text-xs">Hechos con amor</p>
                    </div>
                  </div>
                </div>

                <div class="absolute -bottom-2 -left-4 lg:bottom-4 lg:left-0 bg-white rounded-2xl shadow-soft px-4 py-3 animate-float-slow">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl">⭐</span>
                    <div>
                      <p class="font-poppins font-semibold text-pikiitos-brown text-sm">Calidad Premium</p>
                      <p class="font-poppins text-pikiitos-text-muted text-xs">Materiales suaves</p>
                    </div>
                  </div>
                </div>

                <div class="absolute top-1/2 -right-8 lg:-right-6 bg-white rounded-2xl shadow-soft px-4 py-3 animate-float-delayed">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl">🚚</span>
                    <div>
                      <p class="font-poppins font-semibold text-pikiitos-brown text-sm">Envío Gratis</p>
                      <p class="font-poppins text-pikiitos-text-muted text-xs">A todo Colombia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'HeroSection' })
</script>
