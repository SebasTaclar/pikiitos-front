<template>
  <section class="pt-10 pb-10 lg:pb-16" style="background: linear-gradient(135deg, #FFFDF9 0%, #FFFFFF 40%, #FFF8E8 100%);">
    <div class="section-padding">
      <div class="section-container">

        <!-- Top: Quiénes somos -->
        <div class="grid lg:grid-cols-[0.5fr_0.9fr] gap-6 lg:gap-14 items-start">
          <div class="space-y-2 lg:space-y-3">
            <p class="font-poppins font-semibold text-[11px] lg:text-sm uppercase tracking-[0.2em] text-pikiitos-yellow">
              Quiénes somos
            </p>
            <h2 class="font-fredoka font-bold text-2xl sm:text-4xl lg:text-5xl text-pikiitos-brown leading-[0.95]">
              Más que ropa,
              <span class="block font-dancing text-pikiitos-yellow text-[1.15em]" style="font-family: 'Dancing Script', cursive;">
                creamos recuerdos♡
              </span>
            </h2>
            <p class="font-poppins text-pikiitos-text-light text-xs lg:text-lg leading-relaxed max-w-xl">
              Pikiitos nació del amor por los detalles, los colores y esos pequeños momentos que se convierten en los más grandes recuerdos. Cada prenda está diseñada para acompañar a los niños en sus aventuras, juegos y sonrisas, con comodidad, calidad y mucha alegría.
            </p>
          </div>

          <div class="story-image-wrapper">
            <div class="story-image-glow"></div>
            <div class="story-image-container">
              <img
                src="/images/pikitos1.png"
                alt="Ropa y detalles de Pikiitos"
                class="story-image"
              />
              <div class="story-image-fade-left"></div>
              <div class="story-image-fade-right"></div>
              <div class="story-image-fade-top"></div>
              <div class="story-image-fade-bottom"></div>
            </div>
          </div>
        </div>

        <!-- Bottom: La diseñadora -->
        <div class="mt-8 lg:mt-14">
          <div class="grid lg:grid-cols-[1.05fr_1.2fr] items-center gap-5 lg:gap-8 p-3 sm:p-5 lg:p-8">
            <div class="overflow-hidden rounded-[1.4rem] lg:rounded-[1.8rem] shadow-soft-sm">
              <img
                src="/images/pikitos2.jpeg"
                alt="Paula Salcedo, diseñadora de Pikiitos"
                class="w-full h-[260px] sm:h-[420px] object-cover"
              />
            </div>

            <div class="px-1 py-2 sm:px-4 lg:px-6">
              <div class="flex items-center gap-2 lg:gap-3">
                <svg class="w-5 h-5 lg:w-7 lg:h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#FF8E8E" stroke-width="1.4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8c-1.2-1.8-4-2.2-5 0s0 4.5 5 7.5c5-3 5-5.7 5-7.5s-3.8-1.8-5 0z" stroke="#FF8E8E" fill="none" stroke-width="1.4" />
                </svg>
                <span
                  class="font-poppins font-semibold text-[11px] sm:text-sm uppercase tracking-[0.18em]"
                  style="color: #FF8E8E;"
                >
                  La diseñadora
                </span>
              </div>

              <h3
                class="mt-3 lg:mt-5 font-fredoka font-bold text-2xl sm:text-4xl lg:text-5xl leading-none"
                style="color: #4A4A4A;"
              >
                Hola, soy Paula
              </h3>
              <p
                class="mt-1.5 lg:mt-2 text-lg sm:text-2xl lg:text-[2.15rem]"
                style="font-family: 'Dancing Script', cursive; color: #FFD84D;"
              >
                y este es mi sueño hecho realidad
                <span style="color: #FFD84D;">♡</span>
              </p>

              <div class="mt-4 lg:mt-6 space-y-3 lg:space-y-4 font-poppins text-xs sm:text-base leading-[1.75]" style="color: #6B6B6B;">
                <p>
                  Desde siempre he creído que hay prendas que no olvidamos porque acompañan momentos únicos. Por eso creé Pikiitos, una marca pensada para vestir la infancia con amor, diseño y calidad, y para ser parte de esos recuerdos que los niños llevarán para siempre.
                </p>
                <p>
                  Gracias por permitirnos ser parte de su historia.
                </p>
              </div>

              <div class="mt-5 lg:mt-7">
                <p
                  class="text-xl sm:text-3xl"
                  style="font-family: 'Dancing Script', cursive; color: #4A4A4A;"
                >
                  Paula Salcedo
                  <span style="color: #FFD84D;">♡</span>
                </p>
                <p
                  class="mt-1 font-poppins text-[11px] sm:text-sm"
                  style="color: #888888;"
                >
                  Fundadora y Diseñadora de Pikiitos
                </p>
              </div>
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

<style scoped>
.story-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.story-image-glow {
  position: absolute;
  inset: -20px;
  border-radius: 2.5rem;
  background: radial-gradient(ellipse at center, rgba(255, 248, 232, 0.4) 0%, transparent 70%);
  filter: blur(20px);
  z-index: 0;
  pointer-events: none;
}

.story-image-container {
  position: relative;
  border-radius: 1.4rem;
  overflow: hidden;
  z-index: 1;
}

.story-image {
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
  object-position: center 30%;
  mask-image: radial-gradient(ellipse 90% 85% at 60% 50%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 90% 85% at 60% 50%, black 40%, transparent 100%);
}

.story-image-fade-left {
  position: absolute;
  inset: 0;
  width: 50%;
  background: linear-gradient(to right, #FFFDF9 0%, rgba(255, 253, 249, 0.8) 25%, rgba(255, 253, 249, 0.3) 60%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}

.story-image-fade-right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 25%;
  background: linear-gradient(to left, rgba(255, 253, 249, 0.6) 0%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}

.story-image-fade-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to bottom, rgba(255, 253, 249, 0.5) 0%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}

.story-image-fade-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to top, rgba(255, 253, 249, 0.5) 0%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}

@media (min-width: 640px) {
  .story-image-container {
    border-radius: 2rem;
  }
  .story-image {
    height: 350px;
    object-position: center 25%;
  }
}
</style>
