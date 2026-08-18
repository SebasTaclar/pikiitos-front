<template>
  <div class="min-h-screen bg-pikiitos-cream">
    <Navbar />

    <RouterView />

    <Footer_ />

    <ProductQuickViewModal
      :open="quickViewOpen"
      :product="quickViewProduct"
      @close="closeQuickView"
    />

    <GlobalCart />
    <SocialFloating />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer_ from '@/components/Footer_.vue'
import GlobalCart from '@/components/GlobalCart.vue'
import SocialFloating from '@/components/SocialFloating.vue'
import ProductQuickViewModal from '@/components/ProductQuickViewModal.vue'
import { useProductQuickView } from '@/composables/useProductQuickView'

const { isOpen: quickViewOpen, product: quickViewProduct, close: closeQuickView } = useProductQuickView()

defineOptions({ name: 'App' })
</script>
