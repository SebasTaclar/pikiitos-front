import { ref, computed, watch } from 'vue'
import { useCategories } from './useCategories'
import { useBackendProducts } from './useBackendProducts'

// Tipos para productos
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  status: 'available' | 'out-of-stock' | 'coming-soon'
  colors?: string[]
  isShowcase?: boolean
  showcaseImage?: string
  sku?: string
  brand?: string
  isAvailable?: boolean
  showPrice?: boolean
  allowQuote?: boolean
  isFeatured?: boolean
  isNew?: boolean
  isOffer?: boolean
  createdAt: Date
  updatedAt?: Date
}

export interface Category {
  id: string
  name: string
  description: string
  createdAt: Date
}

// Interface para productos de novedades (ProductShowcase)
export interface ShowcaseProduct {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  createdAt: Date
}

// Estado global de productos de showcase
const showcaseProducts = ref<ShowcaseProduct[]>([])
const isLoadingShowcase = ref(false)
const showcaseError = ref<string | null>(null)

// Usar el composable de productos (localStorage)
const backendProductsComposable = useBackendProducts()
const {
  products: backendProducts,
  loadProducts,
  createProduct,
  updateProduct: updateBackendProduct,
  deleteProduct: deleteBackendProduct
} = backendProductsComposable

// Usar el composable de categorías (localStorage)
const categoriesComposable = useCategories()
const { categories: backendCategories, loadCategories } = categoriesComposable

// Cache simple para nombres de categorías
const categoryNameCache = new Map<string, string>()
const getCategoryNameCached = (id: string): string | undefined => {
  if (categoryNameCache.has(id)) return categoryNameCache.get(id)
  const cat = backendCategories.value.find(c => c.id === id)
  if (cat) categoryNameCache.set(id, cat.name)
  return cat?.name
}

export function useProducts() {
  // Computed para productos disponibles (para ProductStore) - EXCLUYE productos showcase/novedades
  const availableProducts = computed(() =>
    backendProducts.value.filter(p =>
      (p.status === 'available' || p.status === 'coming-soon') &&
      !p.isShowcase
    )
  )

  // Computed para productos regulares (para AdminDashboard) - EXCLUYE productos showcase
  const regularProducts = computed(() =>
    backendProducts.value.filter(p => !p.isShowcase)
  )

  // Funciones para gestionar productos
  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const result = await createProduct({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      originalPrice: productData.originalPrice,
      images: productData.images,
      category: productData.category,
      status: productData.status,
      colors: productData.colors,
      isShowcase: productData.isShowcase,
      showcaseImage: productData.showcaseImage,
      sku: productData.sku,
      brand: productData.brand,
      isAvailable: productData.isAvailable,
      showPrice: productData.showPrice,
      allowQuote: productData.allowQuote,
      isFeatured: productData.isFeatured,
      isNew: productData.isNew,
      isOffer: productData.isOffer,
    })
    return result.success ? result.data : null
  }

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    const updateData: Record<string, unknown> = { ...productData }
    delete updateData.id
    delete updateData.createdAt
    delete updateData.updatedAt

    const result = await updateBackendProduct(id, updateData)
    return result.success ? result.data : null
  }

  const deleteProduct = async (id: string) => {
    const result = await deleteBackendProduct(id)
    return result.success
  }

  const getProductById = (id: string) => {
    return backendProducts.value.find(p => p.id === id)
  }

  const getProductsByCategory = (categoryId: string) => {
    return backendProducts.value.filter(p => p.category === categoryId)
  }

  const getCategoryById = (id: string) => {
    return backendCategories.value.find(c => c.id === id)
  }

  // Cargar productos de showcase desde localStorage (productos con isShowcase = true)
  const loadShowcaseProducts = async () => {
    isLoadingShowcase.value = true
    showcaseError.value = null

    try {
      // Filtrar productos showcase del estado global (ya cargados en localStorage)
      const showcaseItems = backendProducts.value
        .filter(p => p.isShowcase)
        .map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          image: p.showcaseImage || p.images[0] || '',
          category: p.category,
          createdAt: p.createdAt
        }))

      showcaseProducts.value = showcaseItems
    } catch (error) {
      console.error('Error cargando productos showcase:', error)
      showcaseError.value = 'Error al cargar productos destacados'
      showcaseProducts.value = []
    } finally {
      isLoadingShowcase.value = false
    }
  }

  // Funciones para gestionar showcase products
  const addShowcaseProduct = async (productData: Omit<ShowcaseProduct, 'id' | 'createdAt'>) => {
    try {
      const result = await createProduct({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        images: [productData.image],
        category: productData.category,
        status: 'available',
        isShowcase: true,
        showcaseImage: productData.image
      })

      if (result.success && result.data) {
        await loadShowcaseProducts()
        return showcaseProducts.value.find(p => p.id === result.data!.id)
      }

      throw new Error('Error al crear producto showcase')
    } catch (error) {
      console.error('Error creando producto showcase:', error)
      throw error
    }
  }

  const updateShowcaseProduct = async (id: string, productData: Partial<ShowcaseProduct>) => {
    try {
      const updateData: Record<string, unknown> = { isShowcase: true }
      if (productData.name) updateData.name = productData.name
      if (productData.description) updateData.description = productData.description
      if (productData.price) updateData.price = productData.price
      if (productData.image) {
        updateData.images = [productData.image]
        updateData.showcaseImage = productData.image
      }
      if (productData.category) updateData.category = productData.category

      const result = await updateBackendProduct(id, updateData)

      if (result.success) {
        await loadShowcaseProducts()
        return showcaseProducts.value.find(p => p.id === id)
      }

      throw new Error('Error al actualizar producto showcase')
    } catch (error) {
      console.error('Error actualizando producto showcase:', error)
      throw error
    }
  }

  const deleteShowcaseProduct = async (id: string) => {
    try {
      const result = await deleteBackendProduct(id)

      if (result.success) {
        await loadShowcaseProducts()
        return true
      }

      throw new Error('Error al eliminar producto showcase')
    } catch (error) {
      console.error('Error eliminando producto showcase:', error)
      throw error
    }
  }

  // Watchers para limpiar cache cuando las categorías cambien
  watch(backendCategories, () => {
    categoryNameCache.clear()
  }, { deep: true })

  return {
    // State
    products: backendProducts,
    regularProducts,
    categories: backendCategories,
    showcaseProducts,
    availableProducts,
    isLoadingShowcase,
    showcaseError,

    // Product methods
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    loadProducts,

    // Category methods
    addCategory: categoriesComposable.createCategory,
    updateCategory: categoriesComposable.updateCategory,
    deleteCategory: categoriesComposable.deleteCategory,
    getCategoryById,
    getCategoryNameCached,
    loadCategories,

    // Showcase product methods
    loadShowcaseProducts,
    addShowcaseProduct,
    updateShowcaseProduct,
    deleteShowcaseProduct
  }
}
