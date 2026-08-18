<template>
  <div class="group card-pikiitos overflow-hidden">
    <!-- Image -->
    <div class="relative aspect-square overflow-hidden bg-pikiitos-cream/50">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Badge -->
      <div v-if="product.badge" class="absolute top-3 left-3 z-10">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-poppins font-semibold" :class="badgeClass">
          {{ product.badge }}
        </span>
      </div>

      <!-- Quick actions -->
      <div class="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <button
          @click.prevent="toggleFavorite"
          class="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft transition-all hover:bg-white hover:scale-110"
          :aria-label="isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
        >
          <svg class="w-4 h-4 transition-colors" :class="isFavorite ? 'text-pikiitos-pink fill-pikiitos-pink' : 'text-pikiitos-text-muted'" viewBox="0 0 24 24" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </button>
        <button
          @click.prevent="$emit('quickView', product)"
          class="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft transition-all hover:bg-white hover:scale-110"
          aria-label="Vista rápida"
        >
          <svg class="w-4 h-4 text-pikiitos-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="p-4 sm:p-5">
      <p class="font-poppins text-xs text-pikiitos-text-muted uppercase tracking-wider mb-1.5">{{ product.category }}</p>
      <h3 class="font-nunito font-bold text-base sm:text-lg text-pikiitos-brown leading-snug mb-2 line-clamp-2 group-hover:text-pikiitos-yellow-dark transition-colors">
        {{ product.name }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center gap-1.5 mb-3">
        <div class="flex gap-0.5">
          <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5" :class="i <= product.rating ? 'text-pikiitos-yellow' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        </div>
        <span class="font-poppins text-xs text-pikiitos-text-muted">({{ product.reviews }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between">
        <div class="flex items-baseline gap-2">
          <span class="font-poppins font-semibold text-xl text-pikiitos-brown">${{ formatPrice(product.price) }}</span>
          <span v-if="product.originalPrice" class="font-poppins text-sm text-pikiitos-text-muted line-through">${{ formatPrice(product.originalPrice) }}</span>
        </div>
      </div>

      <!-- Add to cart -->
      <button
        @click.prevent="addToCart"
        class="w-full mt-4 py-3 px-4 bg-pikiitos-yellow/10 hover:bg-pikiitos-yellow text-pikiitos-brown font-poppins font-semibold text-sm rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-glow-yellow group/btn"
      >
        <svg class="w-4 h-4 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Product {
  id: number | string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
}

const props = defineProps<{
  product: Product
}>()

defineEmits<{
  quickView: [product: Product]
}>()

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const addToCart = () => {
  // TODO: integrate with cart store
}

const formatPrice = (price: number) => {
  return price.toLocaleString('es-CO')
}

const badgeClass = (() => {
  switch (props.product.badge) {
    case 'Nuevo': return 'bg-pikiitos-yellow text-pikiitos-brown'
    case 'Oferta': return 'bg-pikiitos-pink text-white'
    case 'Popular': return 'bg-pikiitos-mint text-pikiitos-brown'
    default: return 'bg-pikiitos-yellow text-pikiitos-brown'
  }
})()

defineOptions({ name: 'ProductCard' })
</script>
