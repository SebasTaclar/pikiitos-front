import { ref, computed } from 'vue'
import { categoryService } from '@/services/api/categoryService'
import type { Category } from '@/types/CategoryType'

// Estado global de categorías
const categories = ref<Category[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export function useCategories() {
  const loadCategories = async (filters?: { name?: string; description?: string }) => {
    loading.value = true
    error.value = null

    try {
      const result = await categoryService.getCategories(filters)

      if (result.success && result.data) {
        const rawData = result.data
        const items = Array.isArray(rawData) ? rawData : rawData.categories || []

        categories.value = items.map((item: any) => ({
          id: String(item.id),
          name: item.name || '',
          description: item.description || '',
          imageUrls: Array.isArray(item.imageUrls) ? item.imageUrls : undefined,
          createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
          updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
        }))
      }

      return { success: true, data: categories.value }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar categorías'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (categoryData: { name: string; description?: string; imageUrls?: string[] }) => {
    loading.value = true
    error.value = null

    try {
      const result = await categoryService.createCategory(categoryData)

      if (result.success && result.data) {
        const item = result.data as any
        const newCategory: Category = {
          id: String(item.id),
          name: item.name,
          description: item.description || '',
          imageUrls: item.imageUrls || undefined,
          createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
        }
        categories.value.push(newCategory)
        return { success: true, data: newCategory, message: 'Categoría creada exitosamente' }
      }

      return { success: false, message: 'Error al crear categoría' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear categoría'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const updateCategory = async (id: number | string, categoryData: Partial<{ name: string; description?: string; imageUrls?: string[] }>) => {
    loading.value = true
    error.value = null

    try {
      const result = await categoryService.updateCategory(Number(id), categoryData)

      if (result.success) {
        const index = categories.value.findIndex(c => c.id === String(id))
        if (index !== -1) {
          categories.value[index] = { ...categories.value[index], ...categoryData, updatedAt: new Date() }
        }
        return { success: true, data: categories.value[index], message: 'Categoría actualizada exitosamente' }
      }

      return { success: false, message: 'Error al actualizar categoría' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar categoría'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const deleteCategory = async (id: number | string) => {
    loading.value = true
    error.value = null

    try {
      const result = await categoryService.deleteCategory(Number(id))

      if (result.success) {
        categories.value = categories.value.filter(c => c.id !== String(id))
        return { success: true, message: 'Categoría eliminada exitosamente' }
      }

      return { success: false, message: 'Error al eliminar categoría' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar categoría'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const getCategoryById = (id: number | string): Category | undefined => {
    return categories.value.find(c => c.id === String(id))
  }

  const clearError = () => {
    error.value = null
  }

  const refreshCategories = async () => {
    return await loadCategories()
  }

  return {
    categories,
    loading,
    error,
    categoriesCount: computed(() => categories.value.length),
    hasCategories: computed(() => categories.value.length > 0),
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    clearError,
    refreshCategories,
  }
}
