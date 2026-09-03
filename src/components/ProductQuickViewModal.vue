<template>
  <div v-if="open" class="qv-overlay" role="dialog" aria-modal="true" aria-label="Detalle del producto" @click="emit('close')">
    <div class="qv-modal" @click.stop>
      <button class="qv-close" type="button" aria-label="Cerrar" @click="emit('close')">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z"
          />
        </svg>
      </button>

      <div v-if="product" class="qv-body">
        <div class="qv-media">
          <div class="qv-hero">
            <img :src="activeImage" :alt="product.name" loading="lazy" decoding="async" />
          </div>

          <div v-if="product.images?.length" class="qv-thumbs" aria-label="GalerÃ­a">
            <button
              v-for="(img, idx) in product.images"
              :key="img + idx"
              type="button"
              class="qv-thumb"
              :class="{ active: idx === activeImageIndex }"
              @click="activeImageIndex = idx"
              :aria-label="`Ver imagen ${idx + 1}`"
            >
              <img :src="img" :alt="`${product.name} - ${idx + 1}`" loading="lazy" decoding="async" />
            </button>
          </div>
        </div>

        <div class="qv-info">
          <div class="qv-title">{{ product.name }}</div>
          <div class="qv-meta">{{ categoryLabel }}</div>

          <div v-if="product.brand" class="qv-brand">Marca: {{ product.brand }}</div>
          <div v-if="product.sku" class="qv-sku">SKU: {{ product.sku }}</div>

          <div class="qv-price">
            <span class="qv-price-current">${{ formatPrice(product.price) }} COP</span>
            <span v-if="product.originalPrice && product.originalPrice > product.price" class="qv-price-original">${{ formatPrice(product.originalPrice) }} COP</span>
          </div>

          <div v-if="product.description" class="qv-description">{{ product.description }}</div>

          <div v-if="product.colors?.length" class="qv-colors">
            <div class="qv-colors-title">Tallas</div>
            <div class="qv-colors-list">
              <button
                v-for="c in product.colors"
                :key="c"
                type="button"
                class="qv-color"
                :class="{ active: selectedColors.includes(c) }"
                @click="toggleColor(c)"
              >
                {{ c }}
              </button>
            </div>
            <p v-if="selectedColors.length > 0" class="text-center text-xs text-pikiitos-text-muted mt-2 font-poppins">{{ selectedColors.length }} talla(s) seleccionada(s)</p>
          </div>

          <div class="qv-observations">
          </div>

          <div class="qv-actions">
            <p v-if="showSizeWarning" class="text-center text-xs text-red-400 mb-2 font-poppins animate-pulse">Selecciona al menos una talla antes de agregar</p>
            <p v-else-if="product.status === 'available' && product.colors?.length && selectedColors.length === 0" class="text-center text-xs text-pikiitos-text-muted mb-2 font-poppins">Escoge tu(s) talla(s)</p>
            <button
              type="button"
              class="qv-add"
              :disabled="product.status !== 'available'"
              @click="addToQuotationFromModal"
            >
              {{ product.status === 'available' ? 'Agregar al carrito' : 'No disponible' }}
            </button>
          </div>

          <div class="qv-status" v-if="product.status !== 'available'">
            {{ statusText(product.status) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useQuotation, type QuotationProduct } from '@/composables/useQuotation'
import { useProducts } from '@/composables/useProducts'
import type { Product } from '@/types/ProductType'

const props = defineProps<{
  open: boolean
  product: Product | null
}>()

const emit = defineEmits<{ close: [] }>()

const { addToQuotation, openDrawer } = useQuotation()
const { categories, loadCategories, getCategoryById } = useProducts()

const activeImageIndex = ref(0)
const selectedColors = ref<string[]>([])
const observations = ref('')
const showSizeWarning = ref(false)

const toggleColor = (color: string) => {
  const idx = selectedColors.value.indexOf(color)
  if (idx > -1) selectedColors.value.splice(idx, 1)
  else selectedColors.value.push(color)
}

const categoryLabel = computed(() => {
  if (!props.product) return ''
  const id = String(props.product.category || '')
  const name = getCategoryById(id)?.name
  return (name || 'Sin categorÃ­a').toUpperCase()
})

const activeImage = computed(() => {
  const p = props.product
  if (!p) return ''
  const imgs = p.images || []
  return imgs[activeImageIndex.value] || imgs[0] || '/images/banner1.jpg'
})

const formatPrice = (value: number): string => {
  try {
    return Number(value || 0).toLocaleString()
  } catch {
    return String(value || 0)
  }
}

const statusText = (status: Product['status']): string => {
  switch (status) {
    case 'out-of-stock':
      return 'Agotado'
    case 'coming-soon':
      return 'Proximamente'
    default:
      return ''
  }
}

const ensureCategoriesLoaded = async () => {
  if (!categories.value.length) {
    await loadCategories()
  }
}

const addToQuotationFromModal = () => {
  if (!props.product) return
  if (props.product.status !== 'available') return

  if (props.product.colors && props.product.colors.length > 0 && selectedColors.value.length === 0) {
    showSizeWarning.value = true
    setTimeout(() => { showSizeWarning.value = false }, 2500)
    return
  }

  const catName = getCategoryById(String(props.product.category || ''))?.name || ''

  const mapped: QuotationProduct = {
    id: props.product.id,
    name: props.product.name,
    sku: props.product.sku || 'N/A',
    brand: props.product.brand || 'N/A',
    price: props.product.price,
    image: props.product.images?.[0] || '',
    category: String(props.product.category || ''),
    categoryName: catName,
    description: props.product.description,
    inStock: props.product.status === 'available',
    originalPrice: props.product.originalPrice
  }

  const sizesToAdd = selectedColors.value.length > 0 ? selectedColors.value : [undefined]
  for (const size of sizesToAdd) {
    addToQuotation(mapped, 1, size)
  }
  selectedColors.value = []
  observations.value = ''
  emit('close')
  openDrawer()
}

const onKeyDown = (e: KeyboardEvent) => {
  if (!props.open) return
  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
  }
}

watch(
  () => props.open,
  async (value) => {
    if (value) {
      window.addEventListener('keydown', onKeyDown)
      await ensureCategoriesLoaded()
    } else {
      window.removeEventListener('keydown', onKeyDown)
    }
  },
  { immediate: true }
)

watch(
  () => props.product?.id,
  () => {
    activeImageIndex.value = 0
    selectedColors.value = []
    showSizeWarning.value = false
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.qv-overlay {
  position: fixed;
  inset: 0;
  z-index: 2200;
  background: rgba(74, 55, 40, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  backdrop-filter: blur(8px);
}

.qv-modal {
  width: min(1100px, calc(100% - 24px));
  max-height: 96vh;
  overflow: auto;
  background: white;
  border: 1px solid rgba(215, 172, 67, 0.15);
  border-radius: 20px;
  position: relative;
  box-shadow: 0 25px 60px rgba(74, 55, 40, 0.2), 0 0 0 1px rgba(215, 172, 67, 0.08);
}

.qv-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #6B5B4E;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 2;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.qv-close:hover {
  background: #4A3728;
  color: white;
  transform: rotate(90deg);
}

.qv-body {
  padding: 24px;
  display: grid;
  grid-template-columns: 0.7fr 0.8fr;
  gap: 24px;
}

.qv-media {
  display: flex;
  flex-direction: column;
}

.qv-hero {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 16px;
  background: #FFF8E8;
}

.qv-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s;
}

.qv-hero:hover img {
  transform: scale(1.03);
}

.qv-thumbs {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
}

.qv-thumb {
  border: 2px solid transparent;
  background: white;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.qv-thumb:hover {
  border-color: rgba(215, 172, 67, 0.4);
}

.qv-thumb.active {
  border-color: #D7AC43;
  box-shadow: 0 0 0 2px rgba(215, 172, 67, 0.2);
}

.qv-thumb img {
  width: 100%;
  height: 58px;
  object-fit: cover;
  display: block;
}

.qv-title {
  font-family: "Fredoka", sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #4A3728;
  line-height: 1.2;
}

.qv-meta {
  margin-top: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #D7AC43;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.qv-brand, .qv-sku {
  margin-top: 4px;
  font-size: 0.82rem;
  color: #8B7355;
  font-family: "Poppins", sans-serif;
}

.qv-price {
  margin-top: 14px;
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 10px 14px;
  background: #FFF8E8;
  border-radius: 12px;
  border: 1px solid rgba(215, 172, 67, 0.12);
}

.qv-price-current {
  font-family: "Fredoka", sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #4A3728;
}

.qv-price-original {
  font-size: 0.9rem;
  color: #8B7355;
  text-decoration: line-through;
}

.qv-description {
  margin-top: 14px;
  color: #6B5B4E;
  line-height: 1.6;
  font-size: 0.9rem;
  font-family: "Poppins", sans-serif;
  white-space: pre-line;
}

.qv-colors {
  margin-top: 16px;
}

.qv-colors-title {
  font-family: "Poppins", sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #4A3728;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.qv-colors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  margin-bottom: 8rem;
}

.qv-color {
  border: 1px solid rgba(215, 172, 67, 0.2);
  background: white;
  color: #4A3728;
  padding: 7px 14px;
  border-radius: 999px;
  font-family: "Poppins", sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
}

.qv-color.active {
  border-color: #D7AC43;
  background: #FFF8E8;
  box-shadow: 0 0 0 2px rgba(215, 172, 67, 0.15);
}

.qv-actions {
  margin-top: 18px;
}

.qv-add {
  width: 100%;
  height: 48px;
  border-radius: 14px;
  border: 0;
  background: #4A3728;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.2s;
}

.qv-add:hover {
  background: #D7AC43;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(215, 172, 67, 0.3);
}

.qv-add:active {
  transform: scale(0.98);
}

.qv-add:disabled {
  background: #E8DDD0;
  color: #8B7355;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.qv-status {
  margin-top: 10px;
  font-family: "Poppins", sans-serif;
  font-size: 0.85rem;
  color: #8B7355;
  text-align: center;
}

.qv-observations {
  margin-top: 14px;
}

@media (max-width: 980px) {
  .qv-body {
    grid-template-columns: 1fr;
  }

  .qv-thumbs {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .qv-price-current {
    font-size: 1.2rem;
  }
}
</style>

