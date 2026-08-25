import { apiClient } from './apiConfig'
import type { ApiResponse } from './apiConfig'

// Tipos para el sistema de pagos de productos
export interface CreateProductPaymentRequest {
  buyerEmail: string
  buyerName: string
  buyerIdentificationNumber: string
  buyerContactNumber: string
  shippingAddress?: string
  items: {
    productId: number
    quantity: number
    selectedColor?: string
  }[]
}

export interface ProductPaymentItem {
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  selectedColor?: string
}

export interface ProductPaymentResponse {
  message: string
  purchase: {
    id: number
    totalAmount: number
    currency: string
    status: string
    orderStatus: string
    items: ProductPaymentItem[]
  }
  payment: {
    wompiTransactionId: string
    paymentUrl: string
    provider: string
  }
}

export interface Purchase {
  id: number
  items: ProductPaymentItem[]
  buyerEmail: string
  buyerName: string
  buyerContactNumber?: string
  buyerIdentificationNumber?: string
  shippingAddress?: string
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'REJECTED' | 'CANCELLED'
  orderStatus?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  amount: number
  currency: string
  createdAt: string
  updatedAt: string
}

export interface GetPurchasesResponse {
  email?: string
  count: number
  purchases: Purchase[]
}

export class PaymentService {
  /**
   * Crear un nuevo pago para productos del checkout
   */
  async createProductPayment(
    request: CreateProductPaymentRequest,
  ): Promise<ApiResponse<ProductPaymentResponse>> {
    try {
      const response = await apiClient.post<ProductPaymentResponse>('/payment/create', request)
      return response
    } catch (error) {
      console.error('Error creating product payment:', error)
      throw error
    }
  }

  /**
   * Obtener todas las compras de un usuario por email
   */
  async getPurchasesByEmail(email: string): Promise<ApiResponse<GetPurchasesResponse>> {
    try {
      const response = await apiClient.get<GetPurchasesResponse>(
        `/purchases?email=${encodeURIComponent(email)}`,
      )
      return response
    } catch (error) {
      console.error('Error getting purchases:', error)
      throw error
    }
  }

  /**
   * Obtener todas las compras (solo para administradores)
   */
  async getAllPurchases(): Promise<ApiResponse<GetPurchasesResponse>> {
    try {
      const response = await apiClient.get<GetPurchasesResponse>('/purchases')
      return response
    } catch (error) {
      console.error('Error getting all purchases:', error)
      throw error
    }
  }

  /**
   * Verificar si un usuario ya compró un producto específico
   */
  async hasUserPurchasedProduct(email: string, productName: string): Promise<boolean> {
    try {
      const response = await this.getPurchasesByEmail(email)
      if (response.success && response.data) {
        return response.data.purchases.some(
          (purchase) =>
            purchase.items?.some((item) => item.productName === productName) &&
            (purchase.status === 'APPROVED' || purchase.status === 'COMPLETED'),
        )
      }
      return false
    } catch (error) {
      console.error('Error checking product purchase:', error)
      return false
    }
  }

  /**
   * Reenviar email de compra exitosa
   */
  async resendPurchaseEmail(purchaseId: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<{ message: string }>('/purchase/resend-email', {
        purchaseId,
      })
      return response
    } catch (error) {
      console.error('Error resending purchase email:', error)
      throw error
    }
  }

  /**
   * Actualizar email de una compra
   */
  async updatePurchaseEmail(
    purchaseId: string,
    buyerEmail: string,
  ): Promise<ApiResponse<{ message: string; purchase: Purchase }>> {
    try {
      const response = await apiClient.put<{ message: string; purchase: Purchase }>(
        `/purchase/${purchaseId}/update`,
        { buyerEmail },
      )
      return response
    } catch (error) {
      console.error('Error updating purchase email:', error)
      throw error
    }
  }
}

// Instancia singleton del servicio de pagos
export const paymentService = new PaymentService()
