<template>
  <div class="category-page">
    <div class="layout">
      <aside class="sidebar">
        <h3 class="sidebar-title">Filtros</h3>

        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm8.707 17.293-4.387-4.387a9 9 0 1 0-1.414 1.414l4.387 4.387a1 1 0 0 0 1.414-1.414z"/>
          </svg>
          <input v-model="searchTerm" class="search-input" type="search" placeholder="Buscar..." />
        </div>

        <h4 class="filter-label">Rango de Precio</h4>
        <div class="radio-list" role="radiogroup" aria-label="Rango de precio">
          <label class="radio-item" v-for="opt in priceOptions" :key="opt.value">
            <input type="radio" name="price" :value="opt.value" v-model="selectedPriceRange" />
            <span>{{ opt.label }}</span>
          </label>
        </div>

        <h4 class="filter-label" style="margin-top: 1.1rem;">Estado</h4>
        <div class="radio-list" role="radiogroup" aria-label="Estado del producto">
          <label class="radio-item">
            <input type="radio" name="status" value="all" v-model="selectedStatus" />
            <span>Todos</span>
          </label>
          <label class="radio-item">
            <input type="radio" name="status" value="available" v-model="selectedStatus" />
            <span>Disponible</span>
          </label>
          <label class="radio-item">
            <input type="radio" name="status" value="coming-soon" v-model="selectedStatus" />
            <span>Proximamente</span>
          </label>
        </div>

        <label class="checkbox-item" style="margin-top: 1.1rem;">
          <input type="checkbox" v-model="showOnlyFavorites" />
          <span>Mis favoritos</span>
          <span v-if="favorites.size > 0" class="fav-count">{{ favorites.size }}</span>
        </label>

        <button class="clear-btn" type="button" @click="clearFilters">Limpiar Filtros</button>
      </aside>

      <main class="content">
        <header class="category-hero" v-if="categoryImage">
          <div class="category-hero-text">
            <h1 class="category-title">{{ pageTitle }}</h1>
            <p v-if="pageDescription" class="category-description">{{ pageDescription }}</p>
            <a href="#productos-grid" class="category-hero-btn" @click.prevent="scrollToProducts">Explorar</a>
          </div>
          <div class="category-hero-image">
            <img :src="categoryImage" :alt="pageTitle" loading="lazy" decoding="async" />
          </div>
        </header>

        <header class="category-hero category-hero--noimage" v-else>
          <div class="category-hero-text">
            <h1 class="category-title">{{ pageTitle }}</h1>
            <p v-if="pageDescription" class="category-description">{{ pageDescription }}</p>
            <a href="#productos-grid" class="category-hero-btn" @click.prevent="scrollToProducts">Explorar</a>
          </div>
        </header>

        <div class="topbar">
          <span class="meta-text">
            <span v-if="loading" class="animate-pulse">Cargando productos...</span>
            <span v-else><strong>{{ filteredProducts.length }}</strong> productos</span>
          </span>
          <div class="sort">
            <label class="sort-label" for="sort-select">Ordenar:</label>
            <select id="sort-select" v-model="sortBy" class="sort-select">
              <option value="featured">Destacados</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        <div v-if="error" class="error-box">{{ error }}</div>

        <div v-if="loading" id="productos-grid" class="grid">
          <div v-for="i in 6" :key="i" class="card skeleton">
            <div class="card-bg skeleton-img"></div>
            <div class="card-content">
              <div class="skeleton-line w30"></div>
              <div class="skeleton-line w60"></div>
              <div class="skeleton-line w40"></div>
            </div>
          </div>
        </div>

        <div v-else-if="filteredProducts.length > 0" id="productos-grid" class="grid">
          <article
            v-for="p in paginatedProducts"
            :key="p.id"
            class="card"
            role="button"
            tabindex="0"
            @click="openQuickView(p)"
            @keydown.enter.prevent="openQuickView(p)"
          >
            <div class="card-bg">
              <img :src="p.images[0] || placeholderImage" :alt="p.name" loading="lazy" decoding="async" @error="handleImageError" />
              <div class="card-overlay"></div>
              <div v-if="p.originalPrice && p.originalPrice > p.price" class="discount-badge">
                -{{ Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) }}%
              </div>
              <button
                class="heart-btn"
                :class="{ active: favorites.has(p.id) }"
                type="button"
                @click.stop="toggleFavorite(p.id)"
                :aria-label="favorites.has(p.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" :fill="favorites.has(p.id) ? '#E88D92' : 'none'" :stroke="favorites.has(p.id) ? '#E88D92' : 'white'" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <span :class="['status-badge', statusClass(p.status)]">{{ getStatusText(p.status) }}</span>
              <div class="card-content">
                <div class="cat-label">{{ categoryName(p.category) }}</div>
                <h3 class="prod-name">{{ p.name }}</h3>
                <div class="price-row">
                  <span class="price">${{ p.price.toLocaleString() }}</span>
                  <span v-if="p.originalPrice && p.originalPrice > p.price" class="old-price">${{ p.originalPrice.toLocaleString() }}</span>
                </div>
                <button
                  v-if="p.status === 'available'"
                  class="add-btn"
                  type="button"
                  @click.stop="addProductToCart(p)"
                >Agregar</button>
                <button v-else disabled class="add-btn disabled">{{ p.status === 'out-of-stock' ? 'Agotado' : 'Proximamente' }}</button>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="empty">
          <p>No hay productos para mostrar.</p>
          <button class="clear-btn" @click="clearFilters">Limpiar filtros</button>
        </div>

        <div v-if="totalPages > 1" class="pagination">
          <button class="page-btn" :disabled="currentPage <= 1" @click="currentPage--">&lsaquo;</button>
          <button
            v-for="pg in visiblePages" :key="pg"
            :class="['page-btn', { active: pg === currentPage }]"
            @click="currentPage = pg"
          >{{ pg }}</button>
          <button class="page-btn" :disabled="currentPage >= totalPages" @click="currentPage++">&rsaquo;</button>
        </div>
      </main>
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
      <div v-if="showSizeModal" class="fixed inset-0 z-[2300] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showSizeModal = false; selectedSizes = []">
        <div class="bg-white rounded-2xl p-5 w-full max-w-xs shadow-xl" @click.stop>
          <h4 class="font-fredoka font-bold text-lg text-pikiitos-brown mb-1">Escoge tu talla</h4>
          <p class="font-poppins text-xs text-pikiitos-text-muted mb-4">{{ selectedProduct?.name }}</p>
          <div class="flex flex-wrap gap-2 mb-5">
            <button
              v-for="color in selectedProduct?.colors"
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
import { computed, onMounted, ref, watch } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { useQuotation } from '@/composables/useQuotation'
import { useProductQuickView } from '@/composables/useProductQuickView'
import type { Product } from '@/types/ProductType'

const props = defineProps<{ slug: string; title?: string }>()

const { products, categories, loadProducts, loadCategories } = useProducts()
const { addToQuotation, openDrawer } = useQuotation()
const quickView = useProductQuickView()

const loading = ref(false)
const error = ref<string | null>(null)
const searchTerm = ref('')
const sortBy = ref<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured')
const selectedPriceRange = ref<'all' | 'lt100' | '100-300' | '300-500' | 'gt500'>('all')
const selectedStatus = ref<'all' | 'available' | 'coming-soon'>('all')
const showOnlyFavorites = ref(false)
const currentPage = ref(1)
const perPage = 12
const favorites = ref<Set<string>>(new Set(JSON.parse(localStorage.getItem('pikiitos-favorites') || '[]')))
const showSizeModal = ref(false)
const selectedProduct = ref<Product | null>(null)
const selectedSizes = ref<string[]>([])

const placeholderImage = 'https://placehold.co/400x300/f5f0e8/8B7355?text=Pikiitos'

const priceOptions = [
  { value: 'all' as const, label: 'Todos' },
  { value: 'lt100' as const, label: 'Menos de $100.000' },
  { value: '100-300' as const, label: '$100.000 - $300.000' },
  { value: '300-500' as const, label: '$300.000 - $500.000' },
  { value: 'gt500' as const, label: 'Mas de $500.000' },
]

function slugify(value: string): string {
  return value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

const isShowAll = computed(() => props.slug === 'todos' || props.slug === 'all')
const isOfertas = computed(() => props.slug === 'ofertas')

const currentCategoryId = computed(() => {
  if (isShowAll.value) return null
  const slug = props.slug
  const direct = categories.value.find(c => slugify(c.name) === slug)
  if (direct) return direct.id
  const relaxed = categories.value.find(c => {
    const s = slugify(c.name)
    return s.includes(slug) || slug.includes(s)
  })
  return relaxed?.id ?? null
})

const currentCategory = computed(() => {
  if (!currentCategoryId.value) return null
  return categories.value.find(c => c.id === currentCategoryId.value) || null
})

const pageTitle = computed(() => {
  if (props.title) return props.title
  if (isShowAll.value) return 'Todos los productos'
  if (isOfertas.value) return 'Ofertas'
  return currentCategory.value?.name || 'Tienda'
})

const categoryImage = computed(() => {
  if (currentCategory.value?.imageUrls && currentCategory.value.imageUrls.length > 0) {
    return currentCategory.value.imageUrls[0]
  }
  if (isShowAll.value) {
    return 'https://res.cloudinary.com/dlwzazojt/image/upload/v1787460163/pikiitos-_skfi4d.jpg'
  }
  if (isOfertas.value) {
    return 'https://res.cloudinary.com/dlwzazojt/image/upload/v1787456615/Gemini_Generated_Image_k4dtm7k4dtm7k4dt_dlylxe.jpg'
  }
  return null
})

const pageDescription = computed(() => {
  if (currentCategory.value?.description) return currentCategory.value.description
  if (isShowAll.value) return 'Descubre toda nuestra coleccion de ropa infantil. Prendas con disenos unicos, materiales suaves y la mejor calidad para que los mas pequenos vistan con comodidad y estilo en cada ocasion.'
  if (isOfertas.value) return 'Aprovecha nuestras ofertas especiales de pikiitos. Descuentos exclusivos de alta calidad para que vistan a tus peques con estilo ahorrando. No te pierdas estas promociones por tiempo limitado.'
  return ''
})

const allProductsForView = computed(() => {
  let list = products.value.filter(p => p.status !== 'out-of-stock')
  if (isOfertas.value) {
    return list.filter(p => p.originalPrice && p.originalPrice > p.price)
  }
  if (isShowAll.value) return list
  const id = currentCategoryId.value
  if (!id) return []
  return list.filter(p => String(p.category) === String(id))
})

const filteredProducts = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()
  let list = allProductsForView.value

  if (q) {
    list = list.filter(p => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q))
  }

  list = list.filter(p => {
    const price = p.price
    switch (selectedPriceRange.value) {
      case 'lt100': return price < 100000
      case '100-300': return price >= 100000 && price <= 300000
      case '300-500': return price > 300000 && price <= 500000
      case 'gt500': return price > 500000
      default: return true
    }
  })

  if (selectedStatus.value !== 'all') {
    list = list.filter(p => p.status === selectedStatus.value)
  }

  if (showOnlyFavorites.value) {
    list = list.filter(p => favorites.value.has(p.id))
  }

  if (sortBy.value === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
  if (sortBy.value === 'name') return [...list].sort((a, b) => a.name.localeCompare(b.name))
  return list
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredProducts.value.slice(start, start + perPage)
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const total = totalPages.value
  const current = currentPage.value
  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

function categoryName(categoryId: string): string {
  return categories.value.find(c => String(c.id) === String(categoryId))?.name?.toUpperCase() || ''
}

function addProductToCart(p: Product) {
  if (p.colors && p.colors.length > 0) {
    selectedProduct.value = p
    selectedSizes.value = []
    showSizeModal.value = true
  } else {
    addToQuotation({
      id: p.id, name: p.name, sku: p.sku || 'N/A', brand: p.brand || 'N/A',
      price: p.price, image: p.images?.[0] || '', category: String(p.category || ''),
      categoryName: categoryName(p.category),
      description: p.description, inStock: p.status === 'available', originalPrice: p.originalPrice,
    }, 1)
    openDrawer()
  }
}

function toggleSize(size: string) {
  const idx = selectedSizes.value.indexOf(size)
  if (idx > -1) selectedSizes.value.splice(idx, 1)
  else selectedSizes.value.push(size)
}

function confirmAddToCart() {
  if (!selectedProduct.value) return
  const p = selectedProduct.value
  for (const size of selectedSizes.value) {
    addToQuotation({
      id: p.id, name: p.name, sku: p.sku || 'N/A', brand: p.brand || 'N/A',
      price: p.price, image: p.images?.[0] || '', category: String(p.category || ''),
      categoryName: categoryName(p.category),
      description: p.description, inStock: p.status === 'available', originalPrice: p.originalPrice,
    }, 1, size)
  }
  showSizeModal.value = false
  selectedProduct.value = null
  selectedSizes.value = []
  openDrawer()
}

function openQuickView(p: Product) { quickView.open(p) }

function getStatusText(status: string) {
  switch (status) {
    case 'available': return 'Disponible'
    case 'coming-soon': return 'Proximamente'
    case 'out-of-stock': return 'Agotado'
    default: return 'No disponible'
  }
}

function statusClass(status: string) {
  switch (status) {
    case 'available': return 'st-available'
    case 'coming-soon': return 'st-soon'
    case 'out-of-stock': return 'st-out'
    default: return ''
  }
}

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement
  if (img.src !== placeholderImage) img.src = placeholderImage
}

function clearFilters() {
  searchTerm.value = ''
  sortBy.value = 'featured'
  selectedPriceRange.value = 'all'
  selectedStatus.value = 'all'
  showOnlyFavorites.value = false
  currentPage.value = 1
}

function scrollToProducts() {
  document.getElementById('productos-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function toggleFavorite(id: string) {
  if (favorites.value.has(id)) {
    favorites.value.delete(id)
  } else {
    favorites.value.add(id)
  }
  favorites.value = new Set(favorites.value)
  localStorage.setItem('pikiitos-favorites', JSON.stringify([...favorites.value]))
}

watch([searchTerm, selectedPriceRange, selectedStatus, showOnlyFavorites, sortBy], () => { currentPage.value = 1 })

watch(() => props.slug, () => { clearFilters(); error.value = null })

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    if (categories.value.length === 0) await loadCategories()
    if (products.value.length === 0) await loadProducts()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al cargar productos'
  } finally {
    loading.value = false
  }
})

defineOptions({ name: 'CategoryProductsView' })
</script>

<style scoped>
.category-page {
  width: 100%;
  padding-top: 10px;
  background: #FFF8E8;
  min-height: 100vh;
}

.layout {
  max-width: 1360px;
  margin: 0 auto;
  padding: 1rem 2rem 3rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .layout { grid-template-columns: 1fr; }
}

.sidebar {
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 4px 20px rgba(139, 115, 85, 0.08);
  border: 1px solid rgba(215, 172, 67, 0.12);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.sidebar-title {
  margin: 0 0 1rem;
  font-family: 'Fredoka', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #4A3728;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #FFF8E8;
  border: 1px solid rgba(215, 172, 67, 0.2);
  border-radius: 999px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1.25rem;
}

.search-icon { color: #8B7355; flex-shrink: 0; }

.search-input {
  border: 0;
  outline: 0;
  width: 100%;
  font-size: 0.85rem;
  background: transparent;
  color: #4A3728;
  font-family: 'Poppins', sans-serif;
}

.search-input::placeholder { color: #8B7355; opacity: 0.6; }

.filter-label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: #4A3728;
  margin: 0 0 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.radio-list { display: grid; gap: 0.45rem; }

.radio-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: #6B5B4E;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

.radio-item input[type="radio"] {
  accent-color: #D7AC43;
  width: 15px;
  height: 15px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: #6B5B4E;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

.checkbox-item input[type="checkbox"] {
  accent-color: #D7AC43;
  width: 15px;
  height: 15px;
}

.fav-count {
  background: #E88D92;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
}

.clear-btn {
  margin-top: 1.25rem;
  width: 100%;
  height: 40px;
  border-radius: 999px;
  background: white;
  border: 1px solid rgba(215, 172, 67, 0.3);
  color: #4A3728;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #FFF8E8;
  border-color: #D7AC43;
}

.content { min-width: 0; }

.category-hero {
  display: grid;
  grid-template-columns: 1fr 0.6fr;
  gap: 2rem;
  align-items: center;
  background: white;
  border-radius: 18px;
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 20px rgba(139, 115, 85, 0.08);
  border: 1px solid rgba(215, 172, 67, 0.12);
  margin-bottom: 1rem;
  overflow: hidden;
}

@media (max-width: 768px) {
  .category-hero { grid-template-columns: 1fr; }
}

.category-hero--noimage {
  grid-template-columns: 1fr;
}

.category-title {
  margin: 0;
  font-family: 'Fredoka', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #4A3728;
}

.category-description {
  margin: 0.9rem 5rem 1rem 0;
  color: #6B5B4E;
  line-height: 1.6;
  font-family: 'Poppins', sans-serif;
  font-size: 0.92rem;
  text-align: justify;
}

.category-hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  padding: 0.6rem 1.5rem;
  background: #4A3728;
  color: white;
  border-radius: 999px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}

.category-hero-btn:hover {
  background: #D7AC43;
  transform: translateY(-1px);
}

.category-hero-image {
  width: 110%;
  border-radius: 14px;
  overflow: hidden;
  background: #FFF8E8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10%;
}

.category-hero-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .topbar { flex-direction: column; align-items: stretch; }
}

.meta-text {
  font-size: 0.88rem;
  color: #6B5B4E;
  font-family: 'Poppins', sans-serif;
}

.meta-text strong { color: #4A3728; font-weight: 700; }

.sort { display: flex; align-items: center; gap: 0.5rem; }

.sort-label {
  font-size: 0.85rem;
  color: #6B5B4E;
  font-family: 'Poppins', sans-serif;
}

.sort-select {
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(215, 172, 67, 0.2);
  padding: 0 0.9rem;
  background: white;
  color: #4A3728;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
}

.error-box {
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: rgba(220, 38, 38, 0.9);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.88rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
}

@media (max-width: 1280px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }

.card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(139, 115, 85, 0.08);
  border: 1px solid rgba(215, 172, 67, 0.1);
  transition: all 0.3s;
  aspect-ratio: 3 / 5;
}

.card:hover {
  box-shadow: 0 8px 30px rgba(139, 115, 85, 0.2);
  transform: translateY(-3px);
}

.card-bg {
  position: absolute;
  inset: 0;
}

.card-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s;
}

.card:hover .card-bg img { transform: scale(1.08); }

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(30, 20, 10, 0.75) 0%, rgba(30, 20, 10, 0.15) 50%, transparent 100%);
}

.discount-badge {
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  padding: 0.3rem 0.65rem;
  background: linear-gradient(135deg, #E88D92, #D4738A);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  z-index: 2;
}

.status-badge {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  padding: 0.25rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  z-index: 2;
}

.st-available { background: #22c55e; color: white; }
.st-out { background: #ef4444; color: white; }
.st-soon { background: #f59e0b; color: white; }

.heart-btn {
  position: absolute;
  top: 2.7rem;
  right: 1.0rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 2;
}

.heart-btn:hover {
  background: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
}

.heart-btn.active {
  background: rgba(255, 255, 255, 0.9);
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem 1.2rem;
  z-index: 2;
}

.cat-label {
  font-size: 0.80rem;
  letter-spacing: 0.5px;
  font-weight: 800;
  color: #FFE87A;
  font-family: 'Poppins', sans-serif;
}

.prod-name {
  margin: 0.25rem 0 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: white;
  font-family: 'Fredoka', sans-serif;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
}

.price-row {
  margin-top: 0.4rem;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.price {
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: white;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
}

.old-price {
  font-size: 0.8rem;
  text-decoration: line-through;
  color: rgba(255,255,255,0.6);
}

.add-btn {
  margin-top: 0.7rem;
  width: 100%;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: #4A3728;
  border: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
}

.add-btn:hover { background: #D7AC43; color: white; }
.add-btn:active { transform: scale(0.97); }
.add-btn.disabled { background: rgba(255,255,255,0.4); color: rgba(255,255,255,0.7); cursor: not-allowed; }

.skeleton { pointer-events: none; position: relative; }
.skeleton-img { position: absolute; inset: 0; background: linear-gradient(90deg, #f5f0e8 25%, #ece5d8 50%, #f5f0e8 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
.skeleton-line { height: 12px; border-radius: 999px; background: rgba(255,255,255,0.3); margin-bottom: 8px; }
.w30 { width: 30%; } .w40 { width: 40%; } .w60 { width: 60%; }

@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

.empty {
  text-align: center;
  padding: 3rem 0;
  color: #6B5B4E;
  font-family: 'Poppins', sans-serif;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 2rem;
}

.page-btn {
  min-width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid rgba(215, 172, 67, 0.2);
  background: white;
  color: #6B5B4E;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) { background: #FFF8E8; border-color: #D7AC43; }
.page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.page-btn.active { background: #4A3728; color: white; border-color: #4A3728; }

/* ===== MOBILE STYLES ===== */
@media (max-width: 640px) {
  .category-page { padding-top: 0; }

  .layout {
    padding: 0.75rem 1rem 2rem;
    gap: 1rem;
  }

  .sidebar {
    padding: 1rem;
    border-radius: 14px;
    position: static;
  }

  .sidebar-title { font-size: 1rem; margin-bottom: 0.75rem; }

  .search-box { margin-bottom: 1rem; padding: 0.4rem 0.65rem; }

  .filter-label { font-size: 0.75rem; margin-bottom: 0.4rem; }

  .radio-item { font-size: 0.82rem; }

  .category-hero {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 0.75rem;
    border-radius: 14px;
  }

  .category-hero-image {
    width: 100%;
    margin-left: 0;
    border-radius: 10px;
    max-height: 160px;
  }

  .category-title {
    font-size: 1.3rem;
  }

  .category-description {
    margin: 0.5rem 0 0.75rem;
    font-size: 0.8rem;
    text-align: left;
  }

  .category-hero-btn {
    padding: 0.5rem 1.2rem;
    font-size: 0.8rem;
  }

  .topbar {
    margin-bottom: 0.75rem;
  }

  .meta-text { font-size: 0.8rem; }

  .sort-select { height: 36px; font-size: 0.8rem; padding: 0 0.7rem; }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.65rem;
  }

  .card {
    border-radius: 14px;
    aspect-ratio: 3 / 4;
  }

  .card-content {
    padding: 0.6rem 0.75rem;
  }

  .cat-label { font-size: 0.65rem; }

  .prod-name {
    font-size: 0.95rem;
    -webkit-line-clamp: 1;
  }

  .price { font-size: 1.05rem; }

  .old-price { font-size: 0.7rem; }

  .add-btn {
    height: 30px;
    font-size: 0.75rem;
    border-radius: 8px;
    margin-top: 0.4rem;
  }

  .discount-badge {
    padding: 0.2rem 0.5rem;
    font-size: 0.65rem;
    border-radius: 6px;
    top: 0.5rem;
    left: 0.5rem;
  }

  .status-badge {
    padding: 0.2rem 0.45rem;
    font-size: 0.6rem;
    border-radius: 6px;
    top: 0.5rem;
    right: 0.5rem;
  }

  .heart-btn {
    width: 28px;
    height: 28px;
    top: 2.2rem;
    right: 0.6rem;
  }

  .heart-btn svg { width: 14px; height: 14px; }

  .pagination { gap: 0.25rem; margin-top: 1.5rem; }

  .page-btn {
    min-width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
}
</style>
