<template>
  <section class="py-20 lg:py-28 bg-white">
    <div class="section-padding">
      <div class="section-container">
        <!-- Section Header -->
        <div class="text-center mb-14">
          <span class="inline-block font-poppins font-semibold text-sm text-pikiitos-yellow tracking-widest uppercase mb-3">Explora por categoría</span>
          <h2 class="font-fredoka font-bold text-3xl sm:text-4xl lg:text-5xl text-pikiitos-brown">
            Encuentra lo perfecto
          </h2>
          <p class="font-poppins text-pikiitos-text-light mt-4 max-w-lg mx-auto text-lg">
            Ropa pensada para acompañar cada aventura de los más pequeños
          </p>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <RouterLink
            v-for="category in categories"
            :key="category.slug"
            :to="category.to"
            class="group relative overflow-hidden rounded-3xl aspect-[3/4] sm:aspect-[4/5] cursor-pointer"
            :class="category.bgClass"
          >
            <!-- Background pattern -->
            <div class="absolute inset-0 opacity-10" :class="category.patternClass"></div>

            <!-- Content -->
            <div class="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6 z-10">
              <div class="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-500">{{ category.emoji }}</div>
              <h3 class="font-fredoka font-semibold text-lg sm:text-xl text-pikiitos-brown mb-1">{{ category.name }}</h3>
              <p class="font-poppins text-xs sm:text-sm text-pikiitos-text-light">{{ category.count }}</p>
            </div>

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-pikiitos-brown/0 group-hover:bg-pikiitos-brown/5 transition-all duration-500"></div>

            <!-- Arrow -->
            <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <svg class="w-4 h-4 text-pikiitos-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  {
    name: 'Niñas',
    slug: 'ninas',
    to: '/categorias/ninas',
    count: '120+ diseños',
    emoji: '👧',
    bgClass: 'bg-gradient-to-br from-pikiitos-pink/15 via-pikiitos-peach/10 to-pikiitos-cream',
    patternClass: 'bg-[radial-gradient(circle_at_30%_70%,rgba(255,142,142,0.15)_0%,transparent_60%)]',
  },
  {
    name: 'Niños',
    slug: 'ninos',
    to: '/categorias/ninos',
    count: '95+ diseños',
    emoji: '👦',
    bgClass: 'bg-gradient-to-br from-pikiitos-baby/15 via-pikiitos-mint/10 to-pikiitos-cream',
    patternClass: 'bg-[radial-gradient(circle_at_70%_30%,rgba(158,219,255,0.15)_0%,transparent_60%)]',
  },
  {
    name: 'Bebés',
    slug: 'bebes',
    to: '/categorias/bebes',
    count: '80+ diseños',
    emoji: '👶',
    bgClass: 'bg-gradient-to-br from-pikiitos-yellow/15 via-pikiitos-peach/10 to-pikiitos-cream',
    patternClass: 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,216,77,0.15)_0%,transparent_60%)]',
  },
  {
    name: 'Novedades',
    slug: 'novedades',
    to: '/productos?sort=newest',
    count: ' Colección 2026',
    emoji: '✨',
    bgClass: 'bg-gradient-to-br from-pikiitos-lavender/15 via-pikiitos-baby/10 to-pikiitos-cream',
    patternClass: 'bg-[radial-gradient(circle_at_40%_40%,rgba(216,196,255,0.15)_0%,transparent_60%)]',
  },
]

defineOptions({ name: 'CategoriesSection' })
</script>
