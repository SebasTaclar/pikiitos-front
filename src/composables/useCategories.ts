import { ref, computed } from 'vue'
import type { Category } from '@/types/CategoryType'
import defaultCategories from '@/data/categories.json'

const STORAGE_KEY = 'pikiitos_categories'

// Estado global de categorías
const categories = ref<Category[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Normaliza cualquier forma entrante al tipo Category
function normalizeCategory(input: unknown): Category {
  if (typeof input === 'object' && input !== null) {
    const anyCat = input as Record<string, unknown>
    const id = anyCat.id !== undefined ? String(anyCat.id) : crypto.randomUUID()
    const name = String(anyCat.name || '')
    const description = anyCat.description ? String(anyCat.description) : undefined
    const imageUrls = Array.isArray(anyCat.imageUrls) ? anyCat.imageUrls.map(String) : undefined
    const createdAtRaw = anyCat.createdAt
    const updatedAtRaw = anyCat.updatedAt
    return {
      id,
      name,
      description,
      imageUrls,
      createdAt: createdAtRaw ? new Date(String(createdAtRaw)) : new Date(),
      updatedAt: updatedAtRaw ? new Date(String(updatedAtRaw)) : undefined
    }
  }
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    createdAt: new Date()
  }
}

// Leer categorías desde localStorage
function loadFromStorage(): Category[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown[]
      return parsed.map(normalizeCategory)
    }
  } catch {
    console.warn('Error al leer categorías desde localStorage')
  }
  return []
}

// Guardar categorías en localStorage
function saveToStorage(items: Category[]) {
  try {
    const serializable = items.map(c => ({
      ...c,
      createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : String(c.createdAt),
      updatedAt: c.updatedAt instanceof Date ? c.updatedAt.toISOString() : c.updatedAt
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable))
  } catch (e) {
    console.error('Error al guardar categorías en localStorage:', e)
  }
}

// Cargar datos iniciales desde JSON si localStorage está vacío
function bootstrapIfNeeded() {
  const existing = loadFromStorage()
  if (existing.length === 0 && defaultCategories.categories.length > 0) {
    const normalized = defaultCategories.categories.map(normalizeCategory)
    saveToStorage(normalized)
    return normalized
  }
  return existing
}

export function useCategories() {
  const loadCategories = async (_filters?: { name?: string; description?: string }) => {
    loading.value = true
    error.value = null

    try {
      const stored = bootstrapIfNeeded()
      categories.value = stored
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
      const newCategory: Category = {
        id: crypto.randomUUID(),
        name: categoryData.name,
        description: categoryData.description,
        imageUrls: categoryData.imageUrls,
        createdAt: new Date()
      }

      const normalized = normalizeCategory(newCategory)
      categories.value.push(normalized)
      saveToStorage(categories.value)

      return { success: true, data: normalized, message: 'Categoría creada exitosamente' }
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
      const index = categories.value.findIndex((cat) => cat.id === String(id))
      if (index === -1) {
        throw new Error('Categoría no encontrada')
      }

      const updated = { ...categories.value[index], ...categoryData, updatedAt: new Date() }
      const normalized = normalizeCategory(updated)
      categories.value[index] = normalized
      saveToStorage(categories.value)

      return { success: true, data: normalized, message: 'Categoría actualizada exitosamente' }
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
      categories.value = categories.value.filter((cat) => cat.id !== String(id))
      saveToStorage(categories.value)
      return { success: true, message: 'Categoría eliminada exitosamente' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar categoría'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const getCategoryById = (id: number | string): Category | undefined => {
    return categories.value.find((cat) => cat.id === String(id))
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
