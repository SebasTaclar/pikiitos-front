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
          <a href="https://wa.me/573206770595?text=%F0%9F%90%A5%20%C2%A1Hola!%20Soy%20Piki%20y%20te%20doy%20la%20bienvenida%20a%20Pikiitos.%20%C2%A1Qu%C3%A9%20alegr%C3%ADa%20tenerte%20aqu%C3%AD!%20%E2%98%80%EF%B8%8F%0A%0AEstamos%20felices%20de%20ayudarte%20a%20encontrar%20prendas%20dise%C3%B1adas%20para%20acompa%C3%B1ar%20los%20momentos%20m%C3%A1s%20bonitos%20de%20la%20infancia.%0A%0ACu%C3%A9ntanos%20en%20qu%C3%A9%20podemos%20ayudarte%20y%20muy%20pronto%20responderemos%20tu%20mensaje." target="_blank" class="flex items-center gap-1.5 hover:text-pikiitos-yellow transition-colors">
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
          <Logo :size="36" :show-text="true" />
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <template v-for="link in navLinks" :key="link.to">
            <!-- Tienda dropdown -->
            <div
              v-if="link.hasDropdown"
              class="relative"
              @mouseenter="tiendaDropdownOpen = true"
              @mouseleave="tiendaDropdownOpen = false"
            >
              <RouterLink
                :to="link.to"
                class="relative px-4 py-2 text-sm font-poppins font-medium text-pikiitos-text-light rounded-full transition-all duration-300 hover:text-pikiitos-brown hover:bg-pikiitos-cream inline-flex items-center gap-1"
                :class="{ '!text-pikiitos-brown !bg-pikiitos-yellow/15': isCurrentRoute(link) }"
                @click="closeMobileMenu"
              >
                {{ link.label }}
                <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="{ 'rotate-180': tiendaDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span
                  v-if="isCurrentRoute(link)"
                  class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-pikiitos-yellow rounded-full"
                ></span>
              </RouterLink>

              <!-- Dropdown -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                leave-active-class="transition-all duration-150 ease-in"
                enter-from-class="opacity-0 -translate-y-1 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 -translate-y-1 scale-95"
              >
                <div
                  v-if="tiendaDropdownOpen"
                  class="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-lg border border-pikiitos-cream/60 py-2 z-50"
                >
                  <RouterLink
                    to="/productos"
                    class="block px-4 py-2.5 text-sm font-poppins font-medium text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-colors"
                    @click="closeMobileMenu"
                  >
                    Ver todos
                  </RouterLink>
                  <div class="mx-4 my-1 border-t border-pikiitos-cream/50"></div>
                  <RouterLink
                    v-for="cat in navCategories"
                    :key="cat.id"
                    :to="`/categorias/${slugify(cat.name)}`"
                    class="block px-4 py-2.5 text-sm font-poppins text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-colors"
                    @click="closeMobileMenu"
                  >
                    {{ cat.name }}
                  </RouterLink>
                  <div class="mx-4 my-1 border-t border-pikiitos-cream/50"></div>
                  <RouterLink
                    to="/ofertas"
                    class="block px-4 py-2.5 text-sm font-poppins font-medium text-pikiitos-pink hover:bg-pikiitos-pink/10 transition-colors"
                    @click="closeMobileMenu"
                  >
                    Ofertas
                  </RouterLink>
                </div>
              </Transition>
            </div>

            <!-- Normal link -->
            <RouterLink
              v-else
              :to="link.to"
              class="relative px-4 py-2 text-sm font-poppins font-medium text-pikiitos-text-light rounded-full transition-all duration-300 hover:text-pikiitos-brown hover:bg-pikiitos-cream"
              :class="{ '!text-pikiitos-brown !bg-pikiitos-yellow/15': isCurrentRoute(link) }"
              @click="closeMobileMenu"
            >
              {{ link.label }}
              <span
                v-if="isCurrentRoute(link)"
                class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-pikiitos-yellow rounded-full"
              ></span>
            </RouterLink>
          </template>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-2">
          <!-- Search -->
          <button
            v-if="showSearch"
            @click="openSearch"
            class="flex items-center justify-center w-10 h-10 rounded-xl text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all"
            aria-label="Buscar productos"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>

          <!-- Account -->
          <RouterLink
            to="/login"
            class="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all"
            aria-label="Iniciar sesión"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
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
          <img src="https://res.cloudinary.com/dlwzazojt/image/upload/v1787459544/Gemini_Generated_Image_2gp6hd2gp6hd2gp6_o64izx.jpg" alt="" class="w-12.5 h-10 rounded-full object-cover hidden xl:block" />
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
      <div v-if="isMobileMenuOpen" class="lg:hidden bg-white border-t border-pikiitos-cream/50 shadow-soft-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div class="px-4 py-4 space-y-4">
          <template v-for="link in navLinks" :key="link.to">
            <!-- Tienda mobile with subcategories -->
            <div v-if="link.hasDropdown">
              <button
                @click="mobileTiendaOpen = !mobileTiendaOpen"
                class="w-full flex items-center justify-between px-4 py-3 text-base font-poppins font-medium rounded-2xl transition-all"
                :class="isCurrentRoute(link) ? 'bg-pikiitos-yellow/15 text-pikiitos-brown' : 'text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown'"
              >
                {{ link.label }}
                <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': mobileTiendaOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                leave-active-class="transition-all duration-150 ease-in"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96"
                leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="mobileTiendaOpen" class="overflow-hidden ml-4 mt-1 space-y-1">
                  <RouterLink
                    to="/productos"
                    class="block px-4 py-2.5 text-sm font-poppins font-medium text-pikiitos-text-light rounded-xl hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all"
                    @click="closeMobileMenu"
                  >
                    Ver todos
                  </RouterLink>
                  <RouterLink
                    v-for="cat in navCategories"
                    :key="cat.id"
                    :to="`/categorias/${slugify(cat.name)}`"
                    class="block px-4 py-2.5 text-sm font-poppins text-pikiitos-text-light rounded-xl hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all"
                    @click="closeMobileMenu"
                  >
                    {{ cat.name }}
                  </RouterLink>
                  <RouterLink
                    to="/ofertas"
                    class="block px-4 py-2.5 text-sm font-poppins font-medium text-pikiitos-pink rounded-xl hover:bg-pikiitos-pink/10 transition-all"
                    @click="closeMobileMenu"
                  >
                    Ofertas
                  </RouterLink>
                </div>
              </Transition>
            </div>

            <!-- Normal link -->
            <RouterLink
              v-else
              :to="link.to"
              class="block px-4 py-3 text-base font-poppins font-medium rounded-2xl transition-all"
              :class="isCurrentRoute(link) ? 'bg-pikiitos-yellow/15 text-pikiitos-brown' : 'text-pikiitos-text-light hover:bg-pikiitos-cream hover:text-pikiitos-brown'"
              @click="closeMobileMenu"
            >
              {{ link.label }}
            </RouterLink>
          </template>

          <div class="pt-3 border-t border-pikiitos-cream/50 mt-3 space-y-2">
            <div v-if="isLoggedIn" class="px-4 py-3 text-base font-poppins font-medium text-pikiitos-brown bg-pikiitos-cream/50 rounded-2xl">
              Hola, {{ username }}
            </div>

            <RouterLink v-if="!isLoggedIn" to="/login" class="block px-4 py-4 pt-16 text-base font-poppins font-medium text-pikiitos-text-light rounded-2xl hover:bg-pikiitos-cream hover:text-pikiitos-brown transition-all" @click="closeMobileMenu">
              Iniciar sesión
            </RouterLink>

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
import { useCategories } from '@/composables/useCategories'

const isLoggedIn = ref(false)
const username = ref('')
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const isScrolled = ref(false)
const tiendaDropdownOpen = ref(false)
const mobileTiendaOpen = ref(false)
const currentSection = ref('')

const { totalItems, toggleDrawer } = useQuotation()
const { categories: navCategories, loadCategories } = useCategories()

const currentRoute = useRoute()
const isAdmin = computed(() => authService.isAdmin())
const showSearch = computed(() => !currentRoute.path.startsWith('/admin') && currentRoute.path !== '/login')

const navLinks = [
  { to: '/', label: 'Inicio', section: 'inicio' },
  { to: '/#categorias', label: 'Colecciones', section: 'categorias' },
  { to: '/#nosotros', label: 'Nosotros', section: 'nosotros' },
  { to: '/productos', label: 'Tienda', hasDropdown: true },
  { to: '/#contacto', label: 'Contacto', section: 'contacto' },
]

const sectionIds = ['inicio', 'categorias', 'nosotros', 'contacto']

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const isCurrentRoute = (link: { to: string; section?: string }): boolean => {
  if (currentRoute.path !== '/') return currentRoute.path === link.to
  if (link.section) return currentSection.value === link.section
  return currentRoute.path === link.to
}

const detectSection = () => {
  if (currentRoute.path !== '/') {
    currentSection.value = ''
    return
  }

  const scrollY = window.scrollY + 120

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const el = document.getElementById(sectionIds[i])
    if (el && el.offsetTop <= scrollY) {
      currentSection.value = sectionIds[i]
      return
    }
  }

  currentSection.value = 'inicio'
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  mobileTiendaOpen.value = false
}

const openSearch = () => {
  isSearchOpen.value = true
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
  detectSection()
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
  loadCategories()
  detectSection()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(currentRoute, () => {
  checkAuthStatus()
  closeMobileMenu()
  detectSection()
})

defineOptions({ name: 'PikiitosNavbar' })
</script>
