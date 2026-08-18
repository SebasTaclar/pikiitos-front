import { ref } from 'vue'
import type { Product } from '@/types/ProductType'
import defaultProducts from '@/data/products.json'

const STORAGE_KEY = 'pikiitos_products'

// Estado global de productos (inicializado vacío, se cargará desde localStorage)
const products = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Normaliza cualquier forma entrante al tipo Product del frontend
function normalizeProduct(input: unknown): Product {
  if (typeof input === 'object' && input !== null) {
    const anyProduct = input as Record<string, unknown>

    const id = anyProduct.id !== undefined ? String(anyProduct.id) : crypto.randomUUID()
    const name = String(anyProduct.name || '')
    const description = String(anyProduct.description || '')
    const price = Number(anyProduct.price || 0)
    const originalPrice = anyProduct.originalPrice !== null && anyProduct.originalPrice !== undefined
      ? Number(anyProduct.originalPrice)
      : undefined

    let images: string[] = []
    if (typeof anyProduct.images === 'string') {
      try {
        images = JSON.parse(anyProduct.images)
      } catch {
        images = [anyProduct.images]
      }
    } else if (Array.isArray(anyProduct.images)) {
      images = anyProduct.images.map(String)
    }

    const category = String(anyProduct.category || anyProduct.categoryId || '')

    const status = (anyProduct.status === 'available' ||
                   anyProduct.status === 'out-of-stock' ||
                   anyProduct.status === 'coming-soon')
      ? anyProduct.status as 'available' | 'out-of-stock' | 'coming-soon'
      : 'available'

    let colors: string[] | undefined
    if (anyProduct.colors) {
      if (typeof anyProduct.colors === 'string') {
        try {
          colors = JSON.parse(anyProduct.colors)
        } catch {
          colors = [anyProduct.colors]
        }
      } else if (Array.isArray(anyProduct.colors)) {
        colors = anyProduct.colors.map(String)
      }
    }

    const isShowcase = Boolean(anyProduct.isShowcase)
    const showcaseImage = anyProduct.showcaseImage !== null && anyProduct.showcaseImage !== undefined
      ? String(anyProduct.showcaseImage)
      : undefined
    const sku = anyProduct.sku ? String(anyProduct.sku) : undefined
    const brand = anyProduct.brand ? String(anyProduct.brand) : undefined
    const isAvailable = anyProduct.isAvailable !== undefined ? Boolean(anyProduct.isAvailable) : undefined
    const showPrice = anyProduct.showPrice !== undefined ? Boolean(anyProduct.showPrice) : undefined
    const allowQuote = anyProduct.allowQuote !== undefined ? Boolean(anyProduct.allowQuote) : undefined
    const isFeatured = anyProduct.isFeatured !== undefined ? Boolean(anyProduct.isFeatured) : undefined
    const isNew = anyProduct.isNew !== undefined ? Boolean(anyProduct.isNew) : undefined
    const isOffer = anyProduct.isOffer !== undefined ? Boolean(anyProduct.isOffer) : undefined

    const createdAtRaw = anyProduct.createdAt
    const updatedAtRaw = anyProduct.updatedAt

    return {
      id,
      name,
      description,
      price,
      originalPrice,
      images,
      category,
      status,
      colors,
      isShowcase,
      showcaseImage,
      sku,
      brand,
      isAvailable,
      showPrice,
      allowQuote,
      isFeatured,
      isNew,
      isOffer,
      createdAt: createdAtRaw ? new Date(String(createdAtRaw)) : new Date(),
      updatedAt: updatedAtRaw ? new Date(String(updatedAtRaw)) : undefined
    }
  }

  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    price: 0,
    images: [],
    category: '',
    status: 'available',
    createdAt: new Date()
  }
}

// Leer productos desde localStorage
function loadFromStorage(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown[]
      return parsed.map(normalizeProduct)
    }
  } catch {
    console.warn('Error al leer productos desde localStorage')
  }
  return []
}

// Guardar productos en localStorage
function saveToStorage(items: Product[]) {
  try {
    const serializable = items.map(p => ({
      ...p,
      createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : String(p.createdAt),
      updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : p.updatedAt
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable))
  } catch (e) {
    console.error('Error al guardar productos en localStorage:', e)
  }
}

// Cargar datos iniciales desde JSON si localStorage está vacío
function bootstrapIfNeeded() {
  const existing = loadFromStorage()
  if (existing.length === 0 && defaultProducts.products.length > 0) {
    const normalized = defaultProducts.products.map(normalizeProduct)
    saveToStorage(normalized)
    return normalized
  }
  return existing
}

export function useBackendProducts() {
  // Cargar productos desde localStorage (o bootstrap)
  const loadProducts = async (_filters?: {
    name?: string
    categoryId?: number
    showcase?: boolean
  }) => {
    loading.value = true
    error.value = null

    try {
      const stored = bootstrapIfNeeded()
      products.value = stored
      return { success: true, data: products.value }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  // Crear un nuevo producto
  const createProduct = async (productData: Omit<Product, 'id' | 'createdAt'> & { categoryId?: number }) => {
    loading.value = true
    error.value = null

    try {
      const newProduct: Product = {
        ...productData,
        id: crypto.randomUUID(),
        createdAt: new Date()
      }

      const normalized = normalizeProduct(newProduct)
      products.value.push(normalized)
      saveToStorage(products.value)

      return { success: true, data: normalized, message: 'Producto creado exitosamente' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear producto'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  // Actualizar un producto
  const updateProduct = async (id: number | string, productData: Partial<Product>) => {
    loading.value = true
    error.value = null

    try {
      const index = products.value.findIndex((prod) => prod.id === String(id))
      if (index === -1) {
        throw new Error('Producto no encontrado')
      }

      const updated = { ...products.value[index], ...productData, updatedAt: new Date() }
      const normalized = normalizeProduct(updated)
      products.value[index] = normalized
      saveToStorage(products.value)

      return { success: true, data: normalized, message: 'Producto actualizado exitosamente' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar producto'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  // Eliminar un producto
  const deleteProduct = async (id: number | string) => {
    loading.value = true
    error.value = null

    try {
      products.value = products.value.filter((prod) => prod.id !== String(id))
      saveToStorage(products.value)
      return { success: true, message: 'Producto eliminado exitosamente' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar producto'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  // Obtener un producto por ID
  const getProductById = (id: number | string): Product | undefined => {
    return products.value.find((prod) => prod.id === String(id))
  }

  const clearError = () => {
    error.value = null
  }

  const refreshProducts = async () => {
    return await loadProducts()
  }

  return {
    products,
    loading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    clearError,
    refreshProducts,
  }
}
