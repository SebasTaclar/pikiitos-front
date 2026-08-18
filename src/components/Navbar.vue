<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-pikiitos-cream/60 transition-all duration-300" :class="{ 'shadow-soft-md': isScrolled }">
    <!-- Top Bar -->
    <div class="hidden lg:block bg-pikiitos-cream/50 border-b border-pikiitos-yellow/10">
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
        <div class="flex items-center gap-4 text-xs font-poppins text-pikiitos-text-light">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-pikiitos-yellow" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>
            Envíos a todo Colombia
          </span>
          <span class="w-px h-3 bg-pikiitos-yellow/30"></span>
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-pikiitos-yellow" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            Calidad Premium
          </span>
          <span class="w-px h-3 bg-pikiitos-yellow/30"></span>
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-pikiitos-yellow" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
            Pago seguro
          </span>
        </div>
        <div class="flex items-center gap-4 text-xs font-poppins text-pikiitos-text-light">
          <a href="https://wa.me/573001234567" target="_blank" class="flex items-center gap-1.5 hover:text-pikiitos-yellow transition-colors">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0C4.477 0 0 4.477 0 10c0 1.89.525 3.66 1.438 5.168L0 20l4.928-1.394A9.955 9.955 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zm0 18c-1.67 0-3.22-.46-4.552-1.256l-.324-.192-2.924.822.78-2.852-.21-.33A7.954 7.954 0 012 10c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>

    <!-- Main Nav -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20 gap-4">
        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-pikiitos-text-light hover:bg-pikiitos-cream transition-colors"
          :aria-label="isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
          :aria-expanded="isMobileMenuOpen"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <!-- Logo -->
        <RouterLink to="/" class="flex-shrink-0 flex items-center" @click="closeMobileMenu" aria-label="Pikiitos - Ir al inicio">
          <Logo :size="36" :show-text="true" class="hidden sm:flex" />
          <Logo :size="36" class="sm:hidden" />
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="relative px-4 py-2 text-sm font-poppins font-medium text-pikiitos-text-light rounded-full transition-all duration-300 hover:text-pikiitos-brown hover:bg-pikiitos-cream"
            :class="{ '!text-pikiitos-brown !bg-pikiitos-yellow/15': isCurrentRoute(link.to) }"
            @click="closeMobileMenu"
          >
            {{ link.label }}
            <span
              v-if="isCurrentRoute(link.to)"
              class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-pikiitos-yellow rounded-full"
            ></span>
          </RouterLink>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-2">
          <!-- Search -->
          <button
            v-if="showSearch"
            @click="openSearch"
            class="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all"
            aria-label="Buscar productos"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>

          <!-- Account -->
          <RouterLink
            v-if="!isLoggedIn && showSearch"
            to="/login"
            class="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all"
            aria-label="Iniciar sesión"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </RouterLink>

          <RouterLink
            v-else-if="isLoggedIn && isAdmin && showSearch"
            to="/admin/products"
            class="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all"
            aria-label="Panel admin"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </RouterLink>

          <!-- Cart -->
          <button
            @click="toggleDrawer"
            class="relative flex items-center justify-center w-10 h-10 rounded-xl text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all"
            aria-label="Abrir carrito"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <span
              v-if="totalItems > 0"
              class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-pikiitos-pink text-white text-[10px] font-bold font-poppins rounded-full px-1"
            >
              {{ totalItems > 99 ? '99+' : totalItems }}
            </span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden bg-white border-t border-pikiitos-cream/50 shadow-soft-lg">
        <div class="px-4 py-4 space-y-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block px-4 py-3 text-base font-poppins font-medium rounded-2xl transition-all"
            :class="isCurrentRoute(link.to) ? 'bg-pikiitos-yellow/15 text-pikiitos-brown' : 'text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown'"
            @click="closeMobileMenu"
          >
            {{ link.label }}
          </RouterLink>

          <div class="pt-3 border-t border-pikiitos-cream/50 mt-3 space-y-2">
            <button
              v-if="showSearch"
              @click="openSearch(); closeMobileMenu()"
              class="w-full flex items-center gap-3 px-4 py-3 text-base font-poppins text-pikiitos-text-light rounded-2xl hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              Buscar
            </button>

            <RouterLink v-if="!isLoggedIn" to="/login" class="block px-4 py-3 text-base font-poppins font-medium text-pikiitos-text-light rounded-2xl hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all" @click="closeMobileMenu">
              Iniciar sesión
            </RouterLink>

            <div v-if="isLoggedIn" class="px-4 py-3 text-base font-poppins font-medium text-pikiitos-brown bg-pikiitos-cream/50 rounded-2xl">
              Hola, {{ username }}
            </div>

            <RouterLink v-if="isLoggedIn && isAdmin" to="/admin/products" class="block px-4 py-3 text-base font-poppins font-medium text-pikiitos-text-light rounded-2xl hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all" @click="closeMobileMenu">
              Panel admin
            </RouterLink>

            <button v-if="isLoggedIn" @click="handleMobileLogout" class="w-full text-left px-4 py-3 text-base font-poppins font-medium text-pikiitos-pink rounded-2xl hover:bg-pikiitos-pink/10 transition-all">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <GlobalSearchOverlay v-model:open="isSearchOpen" />
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { authService } from '@/services/api'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import router from '@/router'
import Logo from '@/components/Logo.vue'
import GlobalSearchOverlay from '@/components/GlobalSearchOverlay.vue'
import { useQuotation } from '@/composables/useQuotation'

const isLoggedIn = ref(false)
const username = ref('')
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const isScrolled = ref(false)

const { totalItems, toggleDrawer } = useQuotation()

const currentRoute = useRoute()
const isAdmin = computed(() => authService.isAdmin())
const showSearch = computed(() => !currentRoute.path.startsWith('/admin') && currentRoute.path !== '/login')

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Tienda' },
  { to: '/colecciones', label: 'Colecciones' },
  { to: '/nosotros', label: 'Nuestra Historia' },
]

const isCurrentRoute = (path: string): boolean => currentRoute.path === path

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const openSearch = () => {
  isSearchOpen.value = true
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const checkAuthStatus = () => {
  isLoggedIn.value = authService.isAuthenticated()
  if (isLoggedIn.value) {
    const currentUser = authService.getCurrentUser()
    username.value = currentUser?.name || ''
  } else {
    username.value = ''
  }
}

const logout = () => {
  authService.logout()
  isLoggedIn.value = false
  username.value = ''
  router.replace({ name: 'home' })
}

const handleMobileLogout = () => {
  closeMobileMenu()
  logout()
}

onMounted(() => {
  checkAuthStatus()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(currentRoute, () => {
  checkAuthStatus()
  closeMobileMenu()
})

defineOptions({ name: 'PikiitosNavbar' })
</script>
