<template>
  <section class="py-20 lg:py-28 bg-gradient-to-br from-pikiitos-cream via-white to-pikiitos-yellow/5">
    <div class="section-padding">
      <div class="section-container">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <!-- Illustration side -->
          <div class="relative flex justify-center">
            <div class="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px]">
              <!-- Background circle -->
              <div class="absolute inset-0 rounded-full bg-gradient-to-br from-pikiitos-yellow/20 via-pikiitos-peach/15 to-pikiitos-pink/10 animate-pulse-soft"></div>

              <!-- Inner content -->
              <div class="absolute inset-8 rounded-full bg-white shadow-soft-lg flex items-center justify-center">
                <div class="text-center px-8">
                  <div class="text-6xl sm:text-7xl mb-4">📖</div>
                  <p class="font-fredoka font-semibold text-pikiitos-brown text-lg">Una historia</p>
                  <p class="font-poppins text-pikiitos-text-muted text-sm">hecha con amor</p>
                </div>
              </div>

              <!-- Floating story elements -->
              <div class="absolute -top-4 right-8 bg-white rounded-2xl shadow-soft px-4 py-3 animate-float">
                <span class="text-2xl">🌊</span>
                <p class="font-poppins text-xs text-pikiitos-text-light mt-1">Primer viaje</p>
              </div>

              <div class="absolute bottom-8 -left-6 bg-white rounded-2xl shadow-soft px-4 py-3 animate-float-slow">
                <span class="text-2xl">🎂</span>
                <p class="font-poppins text-xs text-pikiitos-text-light mt-1">Celebración</p>
              </div>

              <div class="absolute top-1/2 -right-8 bg-white rounded-2xl shadow-soft px-4 py-3 animate-float-delayed">
                <span class="text-2xl">📸</span>
                <p class="font-poppins text-xs text-pikiitos-text-light mt-1">Recuerdo</p>
              </div>
            </div>
          </div>

          <!-- Text content -->
          <div>
            <span class="inline-block font-poppins font-semibold text-sm text-pikiitos-yellow tracking-widest uppercase mb-4">Nuestra Historia</span>
            <h2 class="font-fredoka font-bold text-3xl sm:text-4xl lg:text-5xl text-pikiitos-brown leading-tight mb-8">
              Érase una vez donde todo comenzó con una pregunta muy sencilla:
            </h2>

            <div class="space-y-5 font-poppins text-pikiitos-text-light text-base lg:text-lg leading-relaxed">
              <p class="text-xl lg:text-2xl font-medium text-pikiitos-brown italic">
                ¿Qué pasaría si la ropa pudiera guardar recuerdos?
              </p>

              <p>Así nació <strong class="text-pikiitos-brown font-semibold">Pikiitos</strong>.</p>

              <p>Inspirados en esos momentos que las familias atesoran para siempre:</p>

              <ul class="space-y-3 pl-1">
                <li class="flex items-start gap-3">
                  <span class="text-pikiitos-yellow mt-1">✦</span>
                  <span>el primer viaje a la playa,</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-pikiitos-pink mt-1">✦</span>
                  <span>una celebración llena de sonrisas,</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-pikiitos-mint mt-1">✦</span>
                  <span>una tarde de juegos,</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-pikiitos-baby mt-1">✦</span>
                  <span>o esa fotografía que algún día despertará un</span>
                </li>
              </ul>

              <p class="text-xl lg:text-2xl font-medium text-pikiitos-brown italic pl-7">
                "¿Te acuerdas de ese día?"
              </p>

              <p>Desde entonces diseñamos prendas pensadas para acompañar cada aventura con comodidad, calidad y un estilo que refleje la alegría de ser niño.</p>

              <p class="font-semibold text-pikiitos-brown">Porque sabemos que la ropa se queda pequeña con el tiempo, pero los recuerdos que se crean con ella permanecen para siempre.</p>

              <p class="text-pikiitos-yellow-dark font-semibold text-lg">
                Pikiitos, donde con cada prenda comienza una nueva historia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'StorySection' })
</script>
