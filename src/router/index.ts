import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/api'
import Home from '@/views/Home.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresGuest?: boolean
    requiredRole?: string
    requiredRoles?: string[]
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          const el = document.querySelector(to.hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            resolve(false)
            return
          }
          resolve({ left: 0, top: 0 })
        })
      })
    }
    return { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/CategoryProducts.vue'),
      props: { slug: 'todos' },
    },
    {
      path: '/categorias/:slug',
      name: 'categoria',
      component: () => import('../views/CategoryProducts.vue'),
      props: true,
    },
    {
      path: '/colecciones',
      name: 'colecciones',
      component: () => import('../views/CategoryProducts.vue'),
      props: { slug: 'colecciones', title: 'Colecciones' },
    },
    {
      path: '/nosotros',
      name: 'nosotros',
      component: () => import('../components/StorySection.vue'),
    },

    {
      path: '/ofertas',
      name: 'ofertas',
      component: () => import('../views/CategoryProducts.vue'),
      props: { slug: 'ofertas' },
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('../views/AdminDashboardNew.vue'),
      meta: { requiresAuth: true, requiredRole: 'admin' },
    },
    {
      path: '/payment/success',
      name: 'payment-success',
      component: () => import('../views/PaymentSuccess.vue'),
    },
    {
      path: '/payment/failure',
      name: 'payment-failure',
      component: () => import('../views/PaymentFailure.vue'),
    },
    {
      path: '/payment/pending',
      name: 'payment-pending',
      component: () => import('../views/PaymentPending.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue'),
    },
    {
      path: '/terms-and-conditions',
      name: 'TermsAndConditions',
      component: () => import('../views/TermsAndConditions.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/',
    },
  ],
})

// Guard de navegación global
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()
  const userRole = authService.getUserRole()

  if (to.path === '/login' && isAuthenticated && userRole === 'admin') {
    next('/admin/products')
    return
  }

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/login')
      return
    }
    if (to.meta.requiredRole && userRole !== to.meta.requiredRole) {
      next('/')
      return
    }
    if (to.meta.requiredRoles && (!userRole || !to.meta.requiredRoles.includes(userRole))) {
      next('/')
      return
    }
  }

  if (to.meta.requiresGuest && isAuthenticated) {
    if (userRole === 'admin') {
      next('/admin/products')
    } else {
      next('/')
    }
    return
  }

  next()
})

export default router
