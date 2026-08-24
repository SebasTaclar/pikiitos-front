import { apiClient, type ApiResponse } from './apiConfig'
import type {
  Brand,
  CreateBrandRequest,
  CreateBrandResponse,
  UpdateBrandRequest,
  GetBrandsResponse,
} from '@/types/BrandType'

class BrandService {
  async getBrands(params?: { name?: string }): Promise<ApiResponse<GetBrandsResponse>> {
    try {
      let endpoint = '/brands'

      if (params?.name) {
        endpoint += `?name=${encodeURIComponent(params.name)}`
      }

      return await apiClient.get<GetBrandsResponse>(endpoint)
    } catch (error) {
      console.error('Error fetching brands:', error)
      throw error
    }
  }

  async getBrandById(id: number): Promise<ApiResponse<Brand>> {
    try {
      return await apiClient.get<Brand>(`/brands/${id}`)
    } catch (error) {
      console.error('Error fetching brand by ID:', error)
      throw error
    }
  }

  async createBrand(brandData: CreateBrandRequest): Promise<ApiResponse<CreateBrandResponse>> {
    try {
      return await apiClient.post<CreateBrandResponse>('/brands', brandData)
    } catch (error) {
      console.error('Error creating brand:', error)
      throw error
    }
  }

  async updateBrand(
    id: number,
    brandData: UpdateBrandRequest,
  ): Promise<ApiResponse<Brand>> {
    try {
      return await apiClient.put<Brand>(`/brands/${id}`, brandData)
    } catch (error) {
      console.error('Error updating brand:', error)
      throw error
    }
  }

  async deleteBrand(id: number): Promise<ApiResponse<{ message: string }>> {
    try {
      return await apiClient.delete<{ message: string }>(`/brands/${id}`)
    } catch (error) {
      console.error('Error deleting brand:', error)
      throw error
    }
  }
}

export const brandService = new BrandService()
