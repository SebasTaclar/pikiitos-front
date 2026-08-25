// Exportar configuración de API
export * from './apiConfig'

// Exportar servicios
export * from './authService'
export * from './brandService'
export * from './categoryService'
export * from './productService'
export * from './paymentService'

// Exportar tipos comunes
export type { ApiResponse, ApiError } from './apiConfig'
export type { LoginCredentials, LoginResponse, DecodedToken, UserInfo } from './authService'
export type {
  Brand,
  CreateBrandRequest,
  CreateBrandResponse,
  GetBrandsResponse,
} from '@/types/BrandType'
export type {
  Category,
  CreateCategoryRequest,
  CreateCategoryResponse,
  GetCategoriesResponse,
} from '@/types/CategoryType'
