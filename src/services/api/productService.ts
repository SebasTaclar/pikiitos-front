import { apiClient, type ApiResponse } from './apiConfig'
import type {
  Product,
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  GetProductsResponse,
} from '@/types/ProductType'

class ProductService {
  /**
   * Obtiene todos los productos con filtros opcionales
   */
  async getProducts(params?: {
    name?: string
    categoryId?: number
    showcase?: boolean
  }): Promise<ApiResponse<GetProductsResponse>> {
    try {
      let endpoint = '/products'

      if (params) {
        const queryParams = new URLSearchParams()
        if (params.name) queryParams.append('name', params.name)
        if (params.categoryId) queryParams.append('categoryId', String(params.categoryId))
        if (params.showcase !== undefined) queryParams.append('showcase', String(params.showcase))

        const queryString = queryParams.toString()
        if (queryString) {
          endpoint += `?${queryString}`
        }
      }

      return await apiClient.get<GetProductsResponse>(endpoint)
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  /**
   * Obtiene un producto por ID
   */
  async getProductById(id: number): Promise<ApiResponse<Product>> {
    try {
      return await apiClient.get<Product>(`/products/${id}`)
    } catch (error) {
      console.error('Error fetching product by ID:', error)
      throw error
    }
  }

  /**
   * Crea un nuevo producto
   */
  async createProduct(
    productData: CreateProductRequest,
  ): Promise<ApiResponse<CreateProductResponse>> {
    try {
      return await apiClient.post<CreateProductResponse>('/products', productData)
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  /**
   * Actualiza un producto existente
   */
  async updateProduct(
    id: number,
    productData: UpdateProductRequest,
  ): Promise<ApiResponse<Product>> {
    try {
      return await apiClient.put<Product>(`/products/${id}`, productData)
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  /**
   * Elimina un producto
   */
  async deleteProduct(id: number): Promise<ApiResponse<{ message: string }>> {
    try {
      return await apiClient.delete<{ message: string }>(`/products/${id}`)
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }
}

export const productService = new ProductService()
