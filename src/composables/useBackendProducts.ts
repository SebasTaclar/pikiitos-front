import { ref } from 'vue'
import { productService } from '@/services/api/productService'
import type { Product } from '@/types/ProductType'

// Estado global de productos
const products = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export function useBackendProducts() {
  const loadProducts = async (params?: {
    name?: string
    categoryId?: number
    showcase?: boolean
  }) => {
    loading.value = true
    error.value = null

    try {
      const result = await productService.getProducts(params)

      if (result.success && result.data) {
        const rawData = result.data
        const items = Array.isArray(rawData) ? rawData : rawData.products || []

        products.value = items.map((item: any) => ({
          id: String(item.id),
          name: item.name || '',
          description: item.description || '',
          price: Number(item.price || 0),
          originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
          images: parseImages(item.images),
          category: String(item.categoryId || item.category || ''),
          status: item.status || 'available',
          colors: parseColors(item.colors),
          isShowcase: Boolean(item.isShowcase),
          showcaseImage: item.showcaseImage || undefined,
          sku: item.sku || undefined,
          brand: item.brand || undefined,
          isAvailable: item.isAvailable !== undefined ? Boolean(item.isAvailable) : undefined,
          showPrice: item.showPrice !== undefined ? Boolean(item.showPrice) : undefined,
          allowQuote: item.allowQuote !== undefined ? Boolean(item.allowQuote) : undefined,
          isFeatured: item.isFeatured !== undefined ? Boolean(item.isFeatured) : undefined,
          isNew: item.isNew !== undefined ? Boolean(item.isNew) : undefined,
          isOffer: item.isOffer !== undefined ? Boolean(item.isOffer) : undefined,
          createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
          updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
        }))
      }

      return { success: true, data: products.value }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (productData: Omit<Product, 'id' | 'createdAt'> & { categoryId?: number }) => {
    loading.value = true
    error.value = null

    try {
      const result = await productService.createProduct({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        originalPrice: productData.originalPrice,
        images: productData.images,
        categoryId: Number(productData.category || productData.categoryId || 0),
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

      if (result.success && result.data) {
        const item = result.data as any
        const newProduct: Product = {
          id: String(item.id),
          name: item.name,
          description: item.description,
          price: Number(item.price),
          originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
          images: parseImages(item.images),
          category: String(item.categoryId || ''),
          status: item.status || 'available',
          colors: parseColors(item.colors),
          isShowcase: Boolean(item.isShowcase),
          showcaseImage: item.showcaseImage || undefined,
          sku: item.sku || undefined,
          brand: item.brand || undefined,
          createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
        }
        products.value.push(newProduct)
        return { success: true, data: newProduct, message: 'Producto creado exitosamente' }
      }

      return { success: false, message: 'Error al crear producto' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear producto'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (id: number | string, productData: Partial<Product>) => {
    loading.value = true
    error.value = null

    try {
      const rawPayload: Record<string, unknown> = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        originalPrice: productData.originalPrice && productData.originalPrice > 0 ? productData.originalPrice : undefined,
        images: productData.images,
        categoryId: productData.category ? Number(productData.category) : undefined,
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
      }
      const payload = Object.fromEntries(
        Object.entries(rawPayload).filter(([, v]) => v !== undefined)
      )
      const result = await productService.updateProduct(Number(id), payload as any)

      if (result.success) {
        const index = products.value.findIndex(p => p.id === String(id))
        if (index !== -1) {
          products.value[index] = { ...products.value[index], ...productData, updatedAt: new Date() }
        }
        return { success: true, data: products.value[index], message: 'Producto actualizado exitosamente' }
      }

      return { success: false, message: 'Error al actualizar producto' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar producto'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id: number | string) => {
    loading.value = true
    error.value = null

    try {
      const result = await productService.deleteProduct(Number(id))

      if (result.success) {
        products.value = products.value.filter(p => p.id !== String(id))
        return { success: true, message: 'Producto eliminado exitosamente' }
      }

      return { success: false, message: 'Error al eliminar producto' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar producto'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const getProductById = (id: number | string): Product | undefined => {
    return products.value.find(p => p.id === String(id))
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

function parseImages(images: any): string[] {
  if (!images) return []
  if (typeof images === 'string') {
    try {
      return JSON.parse(images)
    } catch {
      return [images]
    }
  }
  if (Array.isArray(images)) return images.map(String)
  return []
}

function parseColors(colors: any): string[] | undefined {
  if (!colors) return undefined
  if (typeof colors === 'string') {
    try {
      return JSON.parse(colors)
    } catch {
      return [colors]
    }
  }
  if (Array.isArray(colors)) return colors.map(String)
  return undefined
}
