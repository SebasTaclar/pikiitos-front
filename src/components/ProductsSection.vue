<template>
  <section class="py-20 lg:py-28 bg-pikiitos-cream/30">
    <div class="section-padding">
      <div class="section-container">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row items-center justify-between mb-14 gap-4">
          <div class="text-center sm:text-left">
            <span class="inline-block font-poppins font-semibold text-sm text-pikiitos-pink tracking-widest uppercase mb-3">Lo mas querido</span>
            <h2 class="font-fredoka font-bold text-3xl sm:text-4xl lg:text-5xl text-pikiitos-brown">
              Productos Destacados
            </h2>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <button
                @click="scrollLeft"
                :disabled="!canScrollLeft"
                class="w-10 h-10 rounded-full border border-pikiitos-cream/60 bg-white flex items-center justify-center text-pikiitos-brown hover:bg-pikiitos-cream/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button
                @click="scrollRight"
                :disabled="!canScrollRight"
                class="w-10 h-10 rounded-full border border-pikiitos-cream/60 bg-white flex items-center justify-center text-pikiitos-brown hover:bg-pikiitos-cream/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
            <RouterLink to="/productos" class="btn-pikiitos-outline text-sm shrink-0">
              Ver todos
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </RouterLink>
          </div>
        </div>

        <!-- Products Carousel -->
        <div class="relative">
          <!-- Loading skeleton -->
          <div
            v-if="loading"
            class="flex gap-4 sm:gap-5 overflow-hidden pb-2"
          >
            <div
              v-for="i in 4"
              :key="i"
              class="flex-shrink-0 w-[calc(50%-0.5rem)] sm:w-[calc(25%-0.75rem)]"
            >
              <div class="skeleton-card rounded-2xl overflow-hidden bg-white shadow-sm">
                <div class="skeleton-img aspect-[3/4]"></div>
                <div class="p-4 space-y-3">
                  <div class="skeleton-line w-3/4"></div>
                  <div class="skeleton-line w-1/2"></div>
                  <div class="skeleton-line w-1/3"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actual products -->
          <div
            v-else
            ref="scrollContainer"
            class="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
            @scroll="updateScrollState"
          >
            <div
              v-for="product in featuredProducts"
              :key="product.id"
              class="flex-shrink-0 w-[calc(50%-0.5rem)] sm:w-[calc(25%-0.75rem)]"
            >
              <ProductCard
                :product="product"
                @quick-view="openQuickView"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'
import { useProductQuickView } from '@/composables/useProductQuickView'

const { products, loading, loadProducts, categories, loadCategories } = useProducts()
const { open: openQuickView } = useProductQuickView()

const scrollContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const scrollAmount = 320

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
}

const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: scrollAmount, behavior: 'smooth' })
}

const updateScrollState = () => {
  const el = scrollContainer.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 10
  canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 10
}

onMounted(async () => {
  if (categories.value.length === 0) await loadCategories()
  await loadProducts()
  updateScrollState()
})

onUnmounted(() => {})

const featuredProducts = computed(() => {
  return products.value.filter(p => p.isShowcase)
})

defineOptions({ name: 'ProductsSection' })
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.skeleton-card {
  pointer-events: none;
}
.skeleton-img {
  position: relative;
  background: linear-gradient(90deg, #f5f0e8 25%, #ece5d8 50%, #f5f0e8 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
.skeleton-line {
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(90deg, #f5f0e8 25%, #ece5d8 50%, #f5f0e8 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
