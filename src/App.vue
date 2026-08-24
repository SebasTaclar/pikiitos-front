<template>
  <div class="min-h-screen bg-pikiitos-cream">
    <Navbar v-if="!isAdminRoute" />

    <RouterView />

    <Footer_ v-if="showLayout" />

    <ProductQuickViewModal
      :open="quickViewOpen"
      :product="quickViewProduct"
      @close="closeQuickView"
    />

    <GlobalCart v-if="showLayout" />
    <SocialFloating v-if="showLayout" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer_ from '@/components/Footer_.vue'
import GlobalCart from '@/components/GlobalCart.vue'
import SocialFloating from '@/components/SocialFloating.vue'
import ProductQuickViewModal from '@/components/ProductQuickViewModal.vue'
import { useProductQuickView } from '@/composables/useProductQuickView'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
const isLoginRoute = computed(() => route.path === '/login')
const showLayout = computed(() => !isAdminRoute.value && !isLoginRoute.value)

const { isOpen: quickViewOpen, product: quickViewProduct, close: closeQuickView } = useProductQuickView()

defineOptions({ name: 'App' })
</script>
