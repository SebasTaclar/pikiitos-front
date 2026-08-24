<template>
  <section id="categorias" class="py-6 lg:py-20 bg-white">
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
        <!-- Loading skeleton -->
        <div v-if="loading" class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div
            v-for="i in 4"
            :key="i"
            class="skeleton-card rounded-3xl aspect-[3/4] sm:aspect-[4/5] overflow-hidden"
          >
            <div class="skeleton-img w-full h-full"></div>
          </div>
        </div>

        <!-- Actual categories -->
        <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <RouterLink
            v-for="(cat, index) in displayCategories"
            :key="cat.id"
            :to="'/categorias/' + slugify(cat.name)"
            class="group relative overflow-hidden rounded-3xl aspect-[3/4] sm:aspect-[4/5] cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500"
          >
            <!-- Background with image or gradient -->
            <div class="absolute inset-0">
              <img
                v-if="cat.image"
                :src="cat.image"
                :alt="cat.name"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <!-- Gradient fallback when no image -->
              <div
                v-else
                class="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                :class="cat.bgClass"
              ></div>
            </div>

            <!-- Color overlay for brand consistency -->
            <div class="absolute inset-0 transition-opacity duration-500" :class="cat.overlayClass"></div>

            <!-- Gradient overlay for text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <!-- Content -->
            <div class="absolute inset-0 flex flex-col items-center justify-end p-5 sm:p-6 z-10">
              <!-- Category icon circle -->
              <h3 class="font-fredoka font-semibold text-lg sm:text-xl text-white mb-1.5 drop-shadow-lg text-center">{{ cat.name }}</h3>
              <p class="font-poppins text-xs sm:text-sm text-white/90 drop-shadow-md text-center line-clamp-2">{{ cat.description }}</p>

              <!-- Arrow indicator -->
              <div class="mt-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCategories } from '@/composables/useCategories'

const { categories, loading, loadCategories } = useCategories()

onMounted(async () => {
  await loadCategories()
})

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const categoryStyles: Record<string, { emoji: string; bgClass: string; overlayClass: string }> = {
  default: {
    emoji: '👗',
    bgClass: 'bg-gradient-to-br from-pikiitos-baby via-pikiitos-mint to-pikiitos-cream',
    overlayClass: 'bg-pikiitos-baby/10',
  },
}

const getStyleForCategory = (name: string, index: number) => {
  const lower = name.toLowerCase()
  if (lower.includes('niña') || lower.includes('nina')) {
    return {
      emoji: '👧',
      bgClass: 'bg-gradient-to-br from-pink-300 via-pink-200 to-pikiitos-cream',
      overlayClass: 'bg-pink-400/10',
    }
  }
  if (lower.includes('niño') || lower.includes('nino')) {
    return {
      emoji: '👦',
      bgClass: 'bg-gradient-to-br from-blue-300 via-blue-200 to-pikiitos-cream',
      overlayClass: 'bg-blue-400/10',
    }
  }
  if (lower.includes('bebé') || lower.includes('bebe')) {
    return {
      emoji: '👶',
      bgClass: 'bg-gradient-to-br from-pikiitos-baby via-pikiitos-lavender/30 to-pikiitos-cream',
      overlayClass: 'bg-pikiitos-baby/15',
    }
  }
  if (lower.includes('accesorio')) {
    return {
      emoji: '🎀',
      bgClass: 'bg-gradient-to-br from-pikiitos-yellow via-pikiitos-peach to-pikiitos-cream',
      overlayClass: 'bg-pikiitos-yellow/10',
    }
  }
  if (lower.includes('oferta') || lower.includes('sale')) {
    return {
      emoji: '🏷️',
      bgClass: 'bg-gradient-to-br from-pikiitos-pink via-pikiitos-peach to-pikiitos-cream',
      overlayClass: 'bg-pikiitos-pink/10',
    }
  }

  const emojis = ['👗', '👕', '👚', '🩳', '🧒', '🎏']
  const gradients = [
    'bg-gradient-to-br from-pikiitos-baby via-pikiitos-mint to-pikiitos-cream',
    'bg-gradient-to-br from-pikiitos-pink via-pikiitos-peach to-pikiitos-cream',
    'bg-gradient-to-br from-pikiitos-yellow via-pikiitos-peach to-pikiitos-cream',
    'bg-gradient-to-br from-pikiitos-lavender via-pikiitos-baby/30 to-pikiitos-cream',
  ]
  const overlays = [
    'bg-pikiitos-baby/10',
    'bg-pikiitos-pink/10',
    'bg-pikiitos-yellow/10',
    'bg-pikiitos-lavender/10',
  ]

  return {
    emoji: emojis[index % emojis.length],
    bgClass: gradients[index % gradients.length],
    overlayClass: overlays[index % overlays.length],
  }
}

const fallbackImages = [
  'https://res.cloudinary.com/dlwzazojt/image/upload/v1787339851/ni%C3%B1os_ao0byf.jpg',
  'https://res.cloudinary.com/dlwzazojt/image/upload/v1787340570/Gemini_Generated_Image_b2np74b2np74b2np_sra002.jpg',
  'https://res.cloudinary.com/dlwzazojt/image/upload/v1787340240/ChatGPT_Image_21_ago_2026_14_22_37_kiusrx.png',
  'https://res.cloudinary.com/dlwzazojt/image/upload/v1787340364/Gemini_Generated_Image_pa0v3jpa0v3jpa0v_ryqdca.jpg',
]

const displayCategories = computed(() => {
  return categories.value.map((cat, i) => {
    const image = (cat.imageUrls && cat.imageUrls.length > 0)
      ? cat.imageUrls[0]
      : fallbackImages[i % fallbackImages.length]
    const style = getStyleForCategory(cat.name, i)
    return {
      id: cat.id,
      name: cat.name,
      description: cat.description || '',
      image,
      ...style,
    }
  })
})

defineOptions({ name: 'CategoriesSection' })
</script>

<style scoped>
.skeleton-card {
  pointer-events: none;
}
.skeleton-img {
  position: relative;
  background: linear-gradient(90deg, #f5f0e8 25%, #ece5d8 50%, #f5f0e8 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
