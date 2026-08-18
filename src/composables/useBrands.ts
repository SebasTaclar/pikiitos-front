import { ref } from 'vue'
import type { Brand } from '@/types/BrandType'
import defaultBrands from '@/data/brands.json'

const STORAGE_KEY = 'pikiitos_brands'

// Estado global de marcas
const brands = ref<Brand[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Normaliza cualquier forma entrante al tipo Brand
function normalizeBrand(input: unknown): Brand {
  if (typeof input === 'object' && input !== null) {
    const anyBrand = input as Record<string, unknown>
    const id = anyBrand.id !== undefined ? String(anyBrand.id) : crypto.randomUUID()
    const name = String(anyBrand.name || '')
    const description = anyBrand.description ? String(anyBrand.description) : undefined

    let imageUrls: string[] | undefined
    if (anyBrand.imageUrls) {
      if (typeof anyBrand.imageUrls === 'string') {
        try {
          imageUrls = JSON.parse(anyBrand.imageUrls)
        } catch {
          imageUrls = [anyBrand.imageUrls]
        }
      } else if (Array.isArray(anyBrand.imageUrls)) {
        imageUrls = anyBrand.imageUrls.map(String)
      }
    }

    const createdAtRaw = anyBrand.createdAt
    const updatedAtRaw = anyBrand.updatedAt

    return {
      id,
      name,
      description,
      imageUrls,
      createdAt: createdAtRaw ? new Date(String(createdAtRaw)) : undefined,
      updatedAt: updatedAtRaw ? new Date(String(updatedAtRaw)) : undefined,
    }
  }

  return {
    id: crypto.randomUUID(),
    name: '',
  }
}

// Leer marcas desde localStorage
function loadFromStorage(): Brand[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown[]
      return parsed.map(normalizeBrand)
    }
  } catch {
    console.warn('Error al leer marcas desde localStorage')
  }
  return []
}

// Guardar marcas en localStorage
function saveToStorage(items: Brand[]) {
  try {
    const serializable = items.map(b => ({
      ...b,
      createdAt: b.createdAt instanceof Date ? b.createdAt.toISOString() : b.createdAt,
      updatedAt: b.updatedAt instanceof Date ? b.updatedAt.toISOString() : b.updatedAt
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable))
  } catch (e) {
    console.error('Error al guardar marcas en localStorage:', e)
  }
}

// Cargar datos iniciales desde JSON si localStorage está vacío
function bootstrapIfNeeded() {
  const existing = loadFromStorage()
  if (existing.length === 0 && defaultBrands.brands.length > 0) {
    const normalized = defaultBrands.brands.map(normalizeBrand)
    saveToStorage(normalized)
    return normalized
  }
  return existing
}

export function useBrands() {
  const loadBrands = async (_filters?: { name?: string }) => {
    loading.value = true
    error.value = null

    try {
      const stored = bootstrapIfNeeded()
      brands.value = stored
      return { success: true, data: brands.value }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar marcas'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const createBrand = async (brandData: { name: string; description?: string; imageUrls?: string[] }) => {
    loading.value = true
    error.value = null

    try {
      const newBrand: Brand = {
        id: crypto.randomUUID(),
        name: brandData.name,
        description: brandData.description,
        imageUrls: brandData.imageUrls,
      }

      const normalized = normalizeBrand(newBrand)
      brands.value.push(normalized)
      saveToStorage(brands.value)

      return { success: true, data: normalized, message: 'Marca creada exitosamente' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear marca'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const updateBrand = async (id: number | string, brandData: Partial<{ name: string; description?: string; imageUrls?: string[] }>) => {
    loading.value = true
    error.value = null

    try {
      const index = brands.value.findIndex((b) => b.id === String(id))
      if (index === -1) {
        throw new Error('Marca no encontrada')
      }

      const updated = { ...brands.value[index], ...brandData, updatedAt: new Date() }
      const normalized = normalizeBrand(updated)
      brands.value[index] = normalized
      saveToStorage(brands.value)

      return { success: true, data: normalized, message: 'Marca actualizada exitosamente' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar marca'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const deleteBrand = async (id: number | string) => {
    loading.value = true
    error.value = null

    try {
      brands.value = brands.value.filter((b) => b.id !== String(id))
      saveToStorage(brands.value)
      return { success: true, message: 'Marca eliminada exitosamente' }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar marca'
      error.value = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const getBrandById = (id: number | string): Brand | undefined => {
    return brands.value.find((b) => b.id === String(id))
  }

  const clearError = () => {
    error.value = null
  }

  const refreshBrands = async () => {
    return await loadBrands()
  }

  return {
    brands,
    loading,
    error,
    loadBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    getBrandById,
    clearError,
    refreshBrands,
  }
}
