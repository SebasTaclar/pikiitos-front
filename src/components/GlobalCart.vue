<template>
  <div v-if="!isAdminRoute" class="global-quotation">
    <!-- Drawer overlay -->
    <div v-if="isDrawerOpen" class="drawer-overlay" @click="closeDrawer">
      <div class="drawer-panel" @click.stop>
        <!-- Header -->
        <div class="drawer-header">
          <div class="drawer-header-content">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <h3>Mi Carrito</h3>
          </div>
          <button type="button" @click="closeDrawer" class="drawer-close-btn" aria-label="Cerrar carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m18 6-12 12"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="drawer-content">
          <div v-if="quotationItems.length === 0" class="drawer-empty">
            <div class="empty-bag">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <p class="empty-title">Tu carrito esta vacio</p>
            <span class="empty-sub">Agrega productos desde el catalogo</span>
            <button type="button" @click="closeDrawer" class="empty-btn">Explorar productos</button>
          </div>

          <div v-else class="drawer-items">
            <div v-for="item in quotationItems" :key="item.id" class="drawer-item">
              <img :src="item.image" :alt="item.name" class="drawer-item-image" />
              <div class="drawer-item-info">
                <div class="drawer-item-header">
                  <h4 class="drawer-item-name">{{ item.name }}</h4>
                  <button
                    type="button"
                    class="drawer-item-remove"
                    @click="removeFromQuotation(item.id)"
                    aria-label="Eliminar producto"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                  </button>
                </div>

                <div class="drawer-item-tags">
                  <span v-if="item.characteristic" class="tag tag-size">Talla: {{ item.characteristic }}</span>
                  <span v-if="item.categoryName" class="tag tag-category">{{ item.categoryName }}</span>
                </div>

                <div class="drawer-item-bottom">
                  <div class="drawer-item-quantity">
                    <button
                      type="button"
                      class="qty-btn"
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      aria-label="Disminuir cantidad"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                    <span class="qty-value">{{ item.quantity }}</span>
                    <button
                      type="button"
                      class="qty-btn qty-plus"
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      aria-label="Aumentar cantidad"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                  </div>
                  <span v-if="item.price" class="drawer-item-price">${{ (item.price * item.quantity).toLocaleString('es-CO') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="quotationItems.length > 0" class="drawer-footer">
          <div class="drawer-summary">
            <div class="summary-row">
              <span class="summary-count">{{ totalItems }} {{ totalItems === 1 ? 'producto' : 'productos' }}</span>
              <span v-if="totalPrice > 0" class="summary-total">${{ totalPrice.toLocaleString('es-CO') }}</span>
            </div>
          </div>
          <div class="drawer-actions">
            <button type="button" @click="closeDrawer" class="btn-continue">
              Seguir explorando
            </button>
            <button type="button" @click="goToCheckout" class="btn-checkout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuotation } from '@/composables/useQuotation'

const route = useRoute()
const router = useRouter()

const { quotationItems, isDrawerOpen, totalItems, totalPrice, removeFromQuotation, updateQuantity, closeDrawer } = useQuotation()

const goToCheckout = () => {
  closeDrawer()
  router.push('/checkout')
}

const isAdminRoute = computed(() => route.path.startsWith('/admin'))

watch(
  () => isAdminRoute.value,
  (isAdmin) => {
    if (isAdmin) closeDrawer()
  },
  { immediate: true }
)
</script>

<style scoped>
.global-quotation {
  --pikiitos-brown: #4A3728;
  --pikiitos-brown-light: #6B5B4E;
  --pikiitos-gold: #D7AC43;
  --pikiitos-pink: #E88D92;
  --pikiitos-cream: #FFF8E8;
  --pikiitos-cream-dark: #f5edd8;
  --pikiitos-text: #4A3728;
  --pikiitos-text-light: #8B7355;
}

/* Overlay */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(74, 55, 40, 0.4);
  z-index: 3000;
  backdrop-filter: blur(6px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Panel */
.drawer-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 90vw;
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 40px rgba(74, 55, 40, 0.15);
  animation: slideIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

/* Header */
.drawer-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--pikiitos-cream-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--pikiitos-brown);
  color: #ffffff;
}

.drawer-header-content {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.drawer-header h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  font-family: 'Fredoka', sans-serif;
}

.drawer-close-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 8px;
  padding: 0.4rem;
  cursor: pointer;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.drawer-close-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* Content */
.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
}

/* Empty */
.drawer-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  gap: 0.5rem;
}

.empty-bag {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: var(--pikiitos-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  color: var(--pikiitos-gold);
}

.empty-title {
  margin: 0;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--pikiitos-brown);
  font-family: 'Fredoka', sans-serif;
}

.empty-sub {
  font-size: 0.85rem;
  color: var(--pikiitos-text-light);
  margin-bottom: 0.5rem;
}

.empty-btn {
  margin-top: 0.5rem;
  padding: 0.6rem 1.5rem;
  background: var(--pikiitos-brown);
  color: #ffffff;
  border: none;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;
}

.empty-btn:hover {
  background: var(--pikiitos-gold);
  color: var(--pikiitos-brown);
}

/* Items */
.drawer-items {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.drawer-item {
  display: flex;
  gap: 0.85rem;
  padding: 0.9rem;
  background: var(--pikiitos-cream);
  border-radius: 14px;
  border: 1px solid transparent;
  position: relative;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.drawer-item:hover {
  border-color: var(--pikiitos-gold);
  box-shadow: 0 2px 12px rgba(215, 172, 67, 0.15);
}

.drawer-item-image {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.drawer-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.drawer-item-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.drawer-item-name {
  margin: 0;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--pikiitos-brown);
  line-height: 1.3;
  font-family: 'Fredoka', sans-serif;
}

.drawer-item-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--pikiitos-text-light);
  padding: 0.2rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.drawer-item-remove:hover {
  color: #e53935;
  background: rgba(229, 57, 53, 0.08);
}

.drawer-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 50px;
  font-family: 'Poppins', sans-serif;
}

.tag-size {
  background: var(--pikiitos-gold);
  color: var(--pikiitos-brown);
}

.tag-category {
  background: rgba(74, 55, 40, 0.08);
  color: var(--pikiitos-brown-light);
}

.drawer-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
}

.drawer-item-quantity {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--pikiitos-cream-dark);
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
}

.qty-btn {
  border: none;
  background: #ffffff;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  color: var(--pikiitos-brown-light);
}

.qty-btn:hover {
  background: var(--pikiitos-cream);
  color: var(--pikiitos-brown);
}

.qty-plus {
  background: var(--pikiitos-brown);
  color: #ffffff;
}

.qty-plus:hover {
  background: var(--pikiitos-gold);
  color: var(--pikiitos-brown);
}

.qty-value {
  min-width: 32px;
  text-align: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--pikiitos-brown);
  border-left: 1px solid var(--pikiitos-cream-dark);
  border-right: 1px solid var(--pikiitos-cream-dark);
  padding: 0.2rem 0;
  font-family: 'Poppins', sans-serif;
}

.drawer-item-price {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--pikiitos-brown);
  font-family: 'Poppins', sans-serif;
}

/* Footer */
.drawer-footer {
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid var(--pikiitos-cream-dark);
  background: #ffffff;
}

.drawer-summary {
  margin-bottom: 1rem;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-count {
  font-size: 0.85rem;
  color: var(--pikiitos-text-light);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.summary-total {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--pikiitos-brown);
  font-family: 'Poppins', sans-serif;
}

.drawer-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.btn-continue,
.btn-checkout {
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1rem;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.btn-continue {
  background: var(--pikiitos-cream);
  color: var(--pikiitos-brown-light);
  border: 1px solid var(--pikiitos-cream-dark);
}

.btn-continue:hover {
  background: var(--pikiitos-cream-dark);
  color: var(--pikiitos-brown);
}

.btn-checkout {
  background: var(--pikiitos-gold);
  color: var(--pikiitos-brown);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-checkout:hover {
  background: var(--pikiitos-brown);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(74, 55, 40, 0.25);
}

/* Responsive */
@media (max-width: 640px) {
  .drawer-panel {
    width: 100%;
    max-width: 100%;
  }

  .drawer-header {
    padding: 1rem;
  }

  .drawer-header h3 {
    font-size: 1rem;
  }

  .drawer-content {
    padding: 0.75rem;
  }

  .drawer-item {
    padding: 0.75rem;
  }

  .drawer-item-image {
    width: 60px;
    height: 60px;
  }

  .drawer-item-info {
    min-width: 0;
    width: 0;
    flex: 1;
  }

  .drawer-item-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .drawer-item-bottom {
    gap: 0.5rem;
  }

  .drawer-item-price {
    white-space: nowrap;
  }

  .drawer-footer {
    padding: 0.75rem 1rem 1rem;
  }

  .summary-row {
    gap: 0.5rem;
  }
}
</style>
