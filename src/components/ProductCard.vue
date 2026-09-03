<template>
  <div class="group card-pikiitos overflow-hidden">
    <!-- Image -->
    <div class="relative aspect-[4/5] overflow-hidden bg-pikiitos-cream/50 cursor-pointer" @click.prevent="$emit('quickView', product)">
      <img
        :src="productImage"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Discount badge -->
      <div v-if="product.originalPrice && product.originalPrice > product.price" class="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-10">
        <span class="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-poppins font-bold bg-pikiitos-pink text-white shadow-md">
          -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
        </span>
      </div>

      <!-- Status badge -->
      <div class="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
        <span class="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-poppins font-bold" :class="statusBadgeClass">
          {{ statusLabel }}
        </span>
      </div>

      <!-- Eye button -->
      <button
        @click.prevent="$emit('quickView', product)"
        class="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-black/50 hover:scale-110"
        aria-label="Vista rapida"
      >
        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
      </button>
    </div>

    <!-- Info -->
    <div class="p-3 sm:p-5 flex flex-col flex-1">
      <p class="font-poppins text-[10px] sm:text-xs text-pikiitos-text-muted uppercase tracking-wider mb-1">{{ categoryName }}</p>
      <h3 class="font-nunito font-bold text-sm sm:text-lg text-pikiitos-brown leading-snug mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-pikiitos-yellow-dark transition-colors">
        {{ product.name }}
      </h3>
      <div v-if="product.description" class="mb-2 sm:mb-3">
        <p class="font-poppins text-[10px] sm:text-xs text-pikiitos-text-muted leading-relaxed desc-clamp">
          {{ product.description }}
        </p>
        <button @click.prevent="$emit('quickView', product)" class="font-poppins text-[10px] sm:text-xs text-pikiitos-yellow font-semibold hover:underline mt-0.5 sm:mt-1">Ver mas</button>
      </div>

      <!-- Price -->
      <div class="flex items-baseline gap-1.5 sm:gap-2 mt-auto mb-2 sm:mb-3">
        <span class="font-poppins font-semibold text-lg sm:text-xl text-pikiitos-brown">${{ formatPrice(product.price) }}</span>
        <span v-if="product.originalPrice && product.originalPrice > product.price" class="font-poppins text-xs sm:text-sm text-pikiitos-text-muted line-through">${{ formatPrice(product.originalPrice) }}</span>
      </div>

      <!-- Add to cart / View product -->
      <button
        v-if="product.status === 'available'"
        @click.prevent="handleAddToCart"
        class="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-pikiitos-brown hover:bg-pikiitos-yellow text-white hover:text-pikiitos-brown font-poppins font-semibold text-xs sm:text-sm rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        Agregar al carrito
      </button>
      <button
        v-else
        @click.prevent="$emit('quickView', product)"
        class="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-pikiitos-brown hover:bg-pikiitos-yellow text-white hover:text-pikiitos-brown font-poppins font-semibold text-xs sm:text-sm rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        Ver producto
      </button>
    </div>
  </div>

  <!-- Size selection modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200"
      leave-active-class="transition-all duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showSizeModal" class="fixed inset-0 z-[2300] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showSizeModal = false">
        <div class="bg-white rounded-2xl p-5 w-full max-w-xs shadow-xl" @click.stop>
          <h4 class="font-fredoka font-bold text-lg text-pikiitos-brown mb-1">Escoge tu talla</h4>
          <p class="font-poppins text-xs text-pikiitos-text-muted mb-4">{{ product.name }}</p>
          <div class="flex flex-wrap gap-2 mb-5">
            <button
              v-for="color in product.colors"
              :key="color"
              type="button"
              @click="toggleSize(color)"
              :class="[
                'px-4 py-2.5 rounded-xl border font-poppins text-sm font-semibold transition-all',
                selectedSizes.includes(color)
                  ? 'bg-pikiitos-brown text-white border-pikiitos-brown'
                  : 'bg-white text-pikiitos-brown border-pikiitos-cream/60 hover:bg-pikiitos-brown hover:text-white hover:border-pikiitos-brown'
              ]"
            >
              {{ color }}
            </button>
          </div>
          <p v-if="selectedSizes.length > 0" class="font-poppins text-xs text-pikiitos-text-muted mb-3 text-center">{{ selectedSizes.length }} talla(s) seleccionada(s)</p>
          <button @click="confirmAddToCart" :disabled="selectedSizes.length === 0" :class="['w-full py-2.5 rounded-xl font-poppins text-sm font-medium transition-all mb-2', selectedSizes.length > 0 ? 'bg-pikiitos-brown text-white hover:bg-pikiitos-yellow hover:text-pikiitos-brown' : 'bg-gray-200 text-gray-400 cursor-not-allowed']">
            Agregar al carrito
          </button>
          <button @click="showSizeModal = false; selectedSizes = []" class="w-full py-2.5 rounded-xl border border-pikiitos-cream/60 text-pikiitos-text-light font-poppins text-sm font-medium hover:bg-pikiitos-cream/30 transition-all">
            Cancelar
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuotation } from '@/composables/useQuotation'
import { useCategories } from '@/composables/useCategories'
import type { Product } from '@/types/ProductType'

const props = defineProps<{
  product: Product
}>()

const { categories } = useCategories()

const categoryName = computed(() => {
  const cat = categories.value.find(c => String(c.id) === String(props.product.category))
  return cat?.name || props.product.category
})

const productImage = computed(() => {
  return props.product.images && props.product.images.length > 0 ? props.product.images[0] : ''
})

const statusLabel = computed(() => {
  switch (props.product.status) {
    case 'out-of-stock': return 'Agotado'
    case 'coming-soon': return 'Proximamente'
    case 'available': return 'Disponible'
    default: return 'Disponible'
  }
})

const statusBadgeClass = computed(() => {
  switch (props.product.status) {
    case 'out-of-stock': return 'bg-red-500 text-white'
    case 'coming-soon': return 'bg-amber-500 text-white'
    case 'available': return 'bg-emerald-500 text-white'
    default: return 'bg-emerald-500 text-white'
  }
})

defineEmits<{
  quickView: [product: Product]
}>()

const { addToQuotation, openDrawer } = useQuotation()

const showSizeModal = ref(false)
const selectedSizes = ref<string[]>([])

const toggleSize = (size: string) => {
  const idx = selectedSizes.value.indexOf(size)
  if (idx > -1) selectedSizes.value.splice(idx, 1)
  else selectedSizes.value.push(size)
}

const handleAddToCart = () => {
  if (props.product.colors && props.product.colors.length > 0) {
    selectedSizes.value = []
    showSizeModal.value = true
  } else {
    addToQuotation({
      id: props.product.id,
      name: props.product.name,
      sku: props.product.id,
      brand: 'Pikiitos',
      price: props.product.price,
      image: productImage.value,
      category: props.product.category,
      categoryName: categoryName.value,
      description: props.product.description || '',
      inStock: true
    }, 1)
    openDrawer()
  }
}

const confirmAddToCart = () => {
  for (const size of selectedSizes.value) {
    addToQuotation({
      id: props.product.id,
      name: props.product.name,
      sku: props.product.id,
      brand: 'Pikiitos',
      price: props.product.price,
      image: productImage.value,
      category: props.product.category,
      categoryName: categoryName.value,
      description: props.product.description || '',
      inStock: true
    }, 1, size)
  }
  showSizeModal.value = false
  selectedSizes.value = []
  openDrawer()
}

const formatPrice = (price: number) => {
  return price.toLocaleString('es-CO')
}

defineOptions({ name: 'ProductCard' })
</script>

<style scoped>
.desc-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-line;
}
</style>
