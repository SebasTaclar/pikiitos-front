<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <!-- Header -->
      <div class="checkout-header">
        <button class="back-button" @click="goBack">
          <span class="icon">←</span>
          {{ t('checkout.back') }}
        </button>
        <h1 class="checkout-title">{{ t('checkout.title') }}</h1>
      </div>

      <div class="checkout-content">
        <!-- Resumen del pedido (lado izquierdo) -->
        <div class="order-summary">
          <h2>{{ t('checkout.summaryTitle') }}</h2>

          <div class="cart-items">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="cart-item"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="item-image"
              >
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <div v-if="item.characteristic || item.categoryName" class="item-characteristics">
                  <span v-if="item.characteristic" class="item-char-badge">
                    {{ item.characteristic }}
                  </span>
                  <span v-if="item.categoryName" class="item-char-badge item-char-category">
                    {{ item.categoryName }}
                  </span>
                </div>
                <p class="item-quantity">Cantidad: {{ item.quantity }}</p>
                <p class="item-price">${{ ((item.price ?? 0) * item.quantity).toLocaleString() }} COP</p>
              </div>
            </div>

            <div v-if="cartItems.length === 0" class="empty-cart">
              <p>{{ t('checkout.emptyCart') }}</p>
              <button @click="goBack" class="btn-primary">{{ t('checkout.goStore') }}</button>
            </div>
          </div>

          <div v-if="cartItems.length > 0" class="order-total">
            <div class="total-row">
              <span>{{ t('checkout.subtotal') }}:</span>
              <span>${{ totalPrice.toLocaleString() }} COP</span>
            </div>
            <div class="total-row">
              <span>{{ t('checkout.shipping') }}:</span>
              <span>{{ t('checkout.shippingByDestination') }}</span>
            </div>
            <div class="total-row total-final">
              <span>{{ t('checkout.total') }}:</span>
              <span>{{ t('checkout.totalAtDelivery') }}</span>
            </div>
          </div>

          <!-- Botón seguir comprando -->
          <div v-if="cartItems.length > 0" class="continue-shopping">
            <button @click="goToHome" class="btn-continue">
              ← {{ t('checkout.continueShopping') }}
            </button>
          </div>
        </div>

        <!-- Formulario de contacto y entrega (lado derecho) -->
        <div class="checkout-form">
          <!-- Sección de contacto -->
          <div class="form-section">
            <h2>{{ t('checkout.contactTitle') }}</h2>
            <div class="form-group">
              <label for="name">{{ t('checkout.fullName') }} <span class="required">*</span></label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                :placeholder="t('checkout.fullNamePlaceholder')"
                :class="{ 'error': errors.name }"
                @input="clearError('name')"
              >
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="email">{{ t('checkout.email') }} <span class="required">*</span></label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                :placeholder="t('checkout.emailPlaceholder')"
                :class="{ 'error': errors.email }"
                @input="clearError('email')"
              >
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="identificationNumber">{{ t('checkout.idNumber') }} <span class="required">*</span></label>
                <input
                  id="identificationNumber"
                  v-model="formData.identificationNumber"
                  type="text"
                  :placeholder="t('checkout.idNumberPlaceholder')"
                  :class="{ 'error': errors.identificationNumber }"
                  @input="clearError('identificationNumber')"
                >
                <span v-if="errors.identificationNumber" class="error-message">{{ errors.identificationNumber }}</span>
              </div>

              <div class="form-group">
                <label for="contactNumber">{{ t('checkout.phone') }} <span class="required">*</span></label>
                <input
                  id="contactNumber"
                  v-model="formData.contactNumber"
                  type="tel"
                  :placeholder="t('checkout.phonePlaceholder')"
                  :class="{ 'error': errors.contactNumber }"
                  @input="clearError('contactNumber')"
                >
                <span v-if="errors.contactNumber" class="error-message">{{ errors.contactNumber }}</span>
              </div>
            </div>

            <div class="instagram-link-container">
              <p class="instagram-text">
                <a :href="instagramUrl" target="_blank" class="instagram-link" rel="noopener noreferrer">
                  <span class="ig-dot" aria-hidden="true"></span>
                  {{ t('social.instagramFollow') }}
                </a>
              </p>
            </div>

            <div class="form-group checkbox">
              <label class="checkbox-label">
                <input
                  v-model="formData.acceptTerms"
                  type="checkbox"
                >
                <span>
                  {{ t('checkout.termsAcceptPrefix') }}
                  <router-link to="/terms-and-conditions" class="privacy-link" target="_blank">
                    {{ t('checkout.termsAcceptLink') }}
                  </router-link>
                  <span class="required">*</span>
                </span>
              </label>
              <span v-if="errors.acceptTerms" class="error-message">{{ errors.acceptTerms }}</span>
            </div>
          </div>

          <!-- Sección de entrega -->
          <div class="form-section">
            <h2>{{ t('checkout.deliveryTitle') }}</h2>

            <p class="shipping-note">{{ t('checkout.shippingNote') }}</p>

            <!-- Dirección de envío -->
            <div class="address-section">
              <div class="form-group">
                <label for="address">{{ t('checkout.address') }} <span class="required">*</span></label>
                <input
                  id="address"
                  v-model="formData.address"
                  type="text"
                  :placeholder="t('checkout.addressPlaceholder')"
                  :class="{ 'error': errors.address }"
                  @input="clearError('address')"
                >
                <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="city">{{ t('checkout.city') }} <span class="required">*</span></label>
                  <input
                    id="city"
                    v-model="formData.city"
                    type="text"
                    :placeholder="t('checkout.cityPlaceholder')"
                    :class="{ 'error': errors.city }"
                    @input="clearError('city')"
                  >
                  <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
                </div>

                <div class="form-group">
                  <label for="phone">{{ t('checkout.deliveryPhone') }} <span class="required">*</span></label>
                  <input
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    :placeholder="t('checkout.phonePlaceholder')"
                    :class="{ 'error': errors.phone }"
                    @input="clearError('phone')"
                  >
                  <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensaje de error general -->
          <div v-if="errors.general" class="error-alert">
            <span>⚠️ {{ errors.general }}</span>
          </div>

          <!-- Botón de confirmar pedido -->
          <button
            v-if="cartItems.length > 0"
            class="btn-confirm"
            :disabled="isProcessing"
            @click="confirmOrder"
          >
            <span v-if="!isProcessing">{{ t('checkout.confirm') }} - ${{ finalTotal.toLocaleString() }}</span>
            <span v-else>{{ t('checkout.processing') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotation } from '@/composables/useQuotation'
import { paymentService } from '@/services/api/paymentService'
import type { CreateProductPaymentRequest } from '@/services/api/paymentService'
import { useI18n } from 'vue-i18n'
import { SOCIALS } from '@/config/brand'

defineOptions({
  name: 'CheckoutView'
})

const router = useRouter()
const { quotationItems, totalPrice, clearQuotation } = useQuotation()
const { t } = useI18n()

const cartItems = quotationItems

const instagramUrl = SOCIALS.instagramUrl

// Estado del formulario
const formData = ref({
  name: '',
  email: '',
  identificationNumber: '',
  contactNumber: '',
  acceptTerms: false,
  address: '',
  city: '',
  phone: ''
})

const isProcessing = ref(false)
const errors = ref<Record<string, string>>({})

// Función para verificar si el usuario ya aceptó los términos
const checkTermsAcceptance = () => {
  const termsAccepted = sessionStorage.getItem('termsAccepted')
  console.log('🔍 Verificando términos aceptados en sessionStorage:', termsAccepted)
  if (termsAccepted === 'true') {
    formData.value.acceptTerms = true
    console.log('✅ Términos marcados automáticamente')
  }
}

// Listener para cuando la ventana recupera el foco (usuario vuelve de otra pestaña)
const handleWindowFocus = () => {
  console.log('👀 Ventana recuperó el foco, verificando términos...')
  checkTermsAcceptance()
}

// Verificar al montar el componente
onMounted(() => {
  console.log('🏁 Componente Checkout montado')
  checkTermsAcceptance()

  // Agregar listener para cuando vuelve el foco a la ventana
  window.addEventListener('focus', handleWindowFocus)
})

// Limpiar el listener al desmontar
onUnmounted(() => {
  window.removeEventListener('focus', handleWindowFocus)
})

// Total final
const finalTotal = computed(() => {
  return totalPrice.value
})

// Validación
const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.name.trim()) {
    errors.value.name = t('checkout.errors.nameRequired')
  }

  if (!formData.value.email.trim()) {
    errors.value.email = t('checkout.errors.emailRequired')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = t('checkout.errors.emailInvalid')
  }

  if (!formData.value.identificationNumber.trim()) {
    errors.value.identificationNumber = t('checkout.errors.idRequired')
  }

  if (!formData.value.contactNumber.trim()) {
    errors.value.contactNumber = t('checkout.errors.phoneRequired')
  }

  if (!formData.value.address.trim()) {
    errors.value.address = t('checkout.errors.addressRequired')
  }
  if (!formData.value.city.trim()) {
    errors.value.city = t('checkout.errors.cityRequired')
  }
  if (!formData.value.phone.trim()) {
    errors.value.phone = t('checkout.errors.deliveryPhoneRequired')
  }

  if (!formData.value.acceptTerms) {
    errors.value.acceptTerms = t('checkout.errors.termsRequired')
  }

  return Object.keys(errors.value).length === 0
}

const clearError = (field: string) => {
  delete errors.value[field]
}

const confirmOrder = async () => {
  console.log('🔵 Iniciando confirmOrder...')

  if (!validateForm()) {
    console.log('❌ Validación fallida')
    return
  }

  console.log('✅ Validación exitosa')
  isProcessing.value = true

  // Limpiar errores previos
  errors.value.general = ''

  try {
    // Verificar que haya items en el carrito
    if (cartItems.value.length === 0) {
      throw new Error('El carrito está vacío')
    }

    // Preparar los items del carrito para el backend
    const items = cartItems.value.map(item => {
      const productId = parseInt(item.id)

      // Validar que el ID sea un número válido
      if (isNaN(productId)) {
        console.error('❌ ID de producto inválido:', item.id)
        throw new Error(`ID de producto inválido: ${item.id}`)
      }

      const cartItem: {
        productId: number
        quantity: number
        selectedColor?: string
      } = {
        productId: productId,
        quantity: item.quantity
      }

      // Solo agregar selectedColor si existe
      if (item.characteristic) {
        cartItem.selectedColor = item.characteristic
      }

      return cartItem
    })

    console.log('📦 Items preparados:', items)
    console.log('📦 CartItems originales:', cartItems.value)

    // Preparar el request para el backend
    const paymentRequest: CreateProductPaymentRequest = {
      buyerEmail: formData.value.email,
      buyerName: formData.value.name,
      buyerIdentificationNumber: formData.value.identificationNumber,
      buyerContactNumber: formData.value.contactNumber,
      items: items
    }

    // Dirección de envío
    paymentRequest.shippingAddress = `${formData.value.address}, ${formData.value.city}`

    console.log('📤 Enviando request de pago:', paymentRequest)

    // Llamar al backend para crear el pago
    const response = await paymentService.createProductPayment(paymentRequest)

    console.log('📥 Respuesta completa del backend:', response)
    console.log('📥 response.success:', response.success)
    console.log('📥 response.data:', response.data)

    if (response.success && response.data) {
      // Redirigir a la URL de pago de Wompi
      const paymentUrl = response.data.payment.paymentUrl
      console.log('💳 URL de pago obtenida:', paymentUrl)
      console.log('💳 Tipo de paymentUrl:', typeof paymentUrl)
      console.log('💳 paymentUrl válida:', !!paymentUrl)

      if (!paymentUrl) {
        throw new Error('No se recibió URL de pago del servidor')
      }

      // Guardar info de la compra antes de redirigir
      sessionStorage.setItem('pendingPurchaseId', response.data.purchase.id.toString())
      console.log('💾 Purchase ID guardado:', response.data.purchase.id)

      // Limpiar carrito
      clearQuotation()
      console.log('🗑️ Carrito limpiado')

      // Redirigir a Wompi
      console.log('🚀 Redirigiendo a:', paymentUrl)
      window.location.href = paymentUrl
    } else {
      console.error('❌ Response no exitoso:', response)
      throw new Error(response.message || 'Error al crear el pago')
    }
  } catch (error: unknown) {
    console.error('❌ Error capturado en catch:', error)
    console.error('❌ Tipo de error:', typeof error)
    console.error('❌ Error completo:', JSON.stringify(error, null, 2))

    // Mostrar error al usuario
    let errorMessage = 'Hubo un problema al procesar tu pago. '

    if (error instanceof Error) {
      errorMessage = error.message
      console.error('❌ Error message:', error.message)
      console.error('❌ Error stack:', error.stack)
    }

    // Si es un error de axios/fetch
    if (typeof error === 'object' && error !== null) {
      const err = error as Record<string, unknown>
      if (err.response) {
        console.error('❌ Error response:', err.response)
        const response = err.response as Record<string, unknown>
        console.error('❌ Error response.data:', response.data)

        if (response.data && typeof response.data === 'object') {
          const data = response.data as Record<string, unknown>
          const backendMessage = (data.message as string) || (data.error as string)

          if (backendMessage) {
            // Si es error 500 del servidor
            if (response.status === 500) {
              errorMessage = '⚠️ Error en el servidor de pagos. Por favor contacta a soporte o intenta más tarde.'
            } else {
              errorMessage = backendMessage
            }
          }
        }
      }
    }

    errors.value.general = errorMessage
    console.error('❌ Error mostrado al usuario:', errorMessage)

    isProcessing.value = false
  }
}

const goBack = () => {
  router.push('/')
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #FFF8E8;
  padding: 10px 5rem;
  padding-bottom: 3rem;
}

.checkout-container {
  max-width: 1400px;
  margin: 0 auto;
}

.checkout-header {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-button {
  background: #ffffff;
  border: 2px solid #f5edd8;
  padding: 0.65rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  color: #4A3728;
}

.back-button:hover {
  background: #4A3728;
  color: #ffffff;
  border-color: #4A3728;
}

.checkout-title {
  font-size: 2rem;
  color: #4A3728;
  margin: 0;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 1.5rem;
  align-items: start;
}

/* Resumen del pedido */
.order-summary {
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(74, 55, 40, 0.06);
  height: fit-content;
  position: sticky;
  top: 6rem;
  border: 1px solid #f5edd8;
}

.order-summary h2 {
  font-size: 1.3rem;
  margin-bottom: 1.25rem;
  color: #4A3728;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
}

.cart-items {
  max-height: 380px;
  overflow-y: auto;
  margin-bottom: 1.25rem;
}

.cart-items::-webkit-scrollbar {
  width: 4px;
}

.cart-items::-webkit-scrollbar-thumb {
  background: #f5edd8;
  border-radius: 10px;
}

.cart-item {
  display: flex;
  gap: 0.85rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid #f5edd8;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #f5edd8;
}

.item-details h3 {
  font-size: 0.9rem;
  margin: 0 0 0.3rem 0;
  color: #4A3728;
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
}

.item-characteristics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.35rem 0;
}

.item-char-badge {
  font-size: 0.7rem;
  color: #4A3728;
  background: #D7AC43;
  padding: 0.2rem 0.55rem;
  border-radius: 50px;
  display: inline-block;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.item-char-category {
  background: rgba(74, 55, 40, 0.08);
  color: #6B5B4E;
}

.item-quantity {
  font-size: 0.8rem;
  color: #8B7355;
  margin: 0.15rem 0;
  font-family: 'Poppins', sans-serif;
}

.item-price {
  font-size: 1rem;
  font-weight: 700;
  color: #4A3728;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  color: #8B7355;
}

.order-total {
  border-top: 2px solid #f5edd8;
  padding-top: 1rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #8B7355;
  font-family: 'Poppins', sans-serif;
}

.total-final {
  border-top: 2px solid #f5edd8;
  margin-top: 0.5rem;
  padding-top: 0.85rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #4A3728;
  font-family: 'Poppins', sans-serif;
}

.continue-shopping {
  margin-top: 1.25rem;
  text-align: center;
}

.btn-continue {
  background: #FFF8E8;
  color: #4A3728;
  border: 2px solid #f5edd8;
  padding: 0.7rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.btn-continue:hover {
  background: #4A3728;
  color: #ffffff;
  border-color: #4A3728;
}

/* Formulario */
.checkout-form {
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(74, 55, 40, 0.06);
  border: 1px solid #f5edd8;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h2 {
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  color: #4A3728;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f5edd8;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #4A3728;
  font-size: 0.85rem;
  font-family: 'Poppins', sans-serif;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"] {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #f5edd8;
  border-radius: 12px;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.2s ease;
  background: #FFF8E8;
  color: #4A3728;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #D7AC43;
  box-shadow: 0 0 0 3px rgba(215, 172, 67, 0.15);
  background: #ffffff;
}

.form-group input::placeholder {
  color: #8B7355;
  opacity: 0.6;
}

.form-group input.error {
  border-color: #E88D92;
  background: #FFF0F0;
}

.error-message {
  color: #E88D92;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: block;
  font-family: 'Poppins', sans-serif;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-weight: normal;
  color: #4A3728;
  font-size: 0.85rem;
  font-family: 'Poppins', sans-serif;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #D7AC43;
}

.instagram-link-container {
  background: linear-gradient(135deg, #FFF8E8, #f5edd8);
  padding: 1rem;
  border-radius: 14px;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #f5edd8;
}

.instagram-text {
  margin: 0;
}

.instagram-link {
  color: #4A3728;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.ig-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #D7AC43;
  box-shadow: 0 0 0 4px rgba(215, 172, 67, 0.2);
  flex-shrink: 0;
}

.instagram-link:hover {
  color: #D7AC43;
}

.privacy-link {
  color: #D7AC43;
  text-decoration: underline;
  font-weight: 600;
}

.privacy-link:hover {
  color: #4A3728;
}

.required {
  color: #E88D92;
  margin-left: 0.15rem;
}

/* Dirección de envío */
.shipping-note {
  font-size: 0.85rem;
  color: #8B7355;
  margin-bottom: 1.25rem;
  font-family: 'Poppins', sans-serif;
}

.address-section {
  margin-top: 1rem;
}

/* Alerta de error */
.error-alert {
  background: #FFF0F0;
  border: 1px solid #E88D92;
  border-radius: 14px;
  padding: 1rem;
  margin-top: 1.5rem;
  color: #E88D92;
  font-weight: 600;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
}

/* Botón de confirmar */
.btn-confirm {
  width: 100%;
  padding: 1.15rem;
  background: #D7AC43;
  color: #4A3728;
  border: none;
  border-radius: 14px;
  font-size: 1.05rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1.5rem;
}

.btn-confirm:hover:not(:disabled) {
  background: #4A3728;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(74, 55, 40, 0.2);
}

.btn-confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  padding: 0.85rem 2rem;
  background: #D7AC43;
  color: #4A3728;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #4A3728;
  color: #ffffff;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 968px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
    order: 2;
  }

  .checkout-form {
    order: 1;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .checkout-page {
    padding: 0;
  }

  .checkout-title {
    font-size: 1.5rem;
  }

  .order-summary,
  .checkout-form {
    padding: 1.25rem;
    border-radius: 16px;
  }
}
</style>
