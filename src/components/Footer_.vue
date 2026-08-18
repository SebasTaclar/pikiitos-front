<template>
  <footer class="bg-pikiitos-brown text-white pt-16 lg:pt-20 pb-8">
    <div class="section-padding">
      <div class="section-container">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <!-- Brand Column -->
          <div class="col-span-2 lg:col-span-1">
            <div class="flex items-center gap-2 mb-5">
              <Logo :size="32" />
              <span class="font-fredoka font-semibold text-xl text-white">Pikiitos</span>
            </div>
            <p class="font-poppins text-white/60 text-sm leading-relaxed mb-6">
              Ropa infantil diseñada con amor para que cada momento sea un recuerdo inolvidable.
            </p>

            <!-- Social Media -->
            <div class="flex gap-3">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-pikiitos-yellow hover:text-pikiitos-brown transition-all duration-300 hover:-translate-y-0.5"
                :aria-label="social.name"
              >
                <span class="text-lg">{{ social.icon }}</span>
              </a>
            </div>
          </div>

          <!-- Links Columns -->
          <div v-for="section in footerLinks" :key="section.title">
            <h3 class="font-nunito font-bold text-sm uppercase tracking-wider text-white/90 mb-4">
              {{ section.title }}
            </h3>
            <ul class="space-y-2.5">
              <li v-for="link in section.links" :key="link.label">
                <RouterLink
                  :to="link.to"
                  class="font-poppins text-sm text-white/50 hover:text-pikiitos-yellow transition-colors duration-200"
                >
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="border-t border-white/10 pt-8 mb-8">
          <h3 class="font-nunito font-bold text-sm uppercase tracking-wider text-white/90 mb-4 text-center">Medios de pago</h3>
          <div class="flex items-center justify-center gap-4 flex-wrap">
            <div
              v-for="method in paymentMethods"
              :key="method"
              class="px-4 py-2 bg-white/10 rounded-xl font-poppins text-xs text-white/60"
            >
              {{ method }}
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="font-poppins text-xs text-white/40 text-center sm:text-left">
            &copy; {{ currentYear }} Pikiitos. Todos los derechos reservados. Hecho con 💛 para los más pequeños.
          </p>
          <div class="flex items-center gap-4">
            <RouterLink to="/terms-and-conditions" class="font-poppins text-xs text-white/40 hover:text-white/70 transition-colors">
              Términos
            </RouterLink>
            <RouterLink to="/privacidad" class="font-poppins text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacidad
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Logo from '@/components/Logo.vue'

const currentYear = new Date().getFullYear()

const socials = [
  { name: 'Instagram', icon: '📷', url: 'https://instagram.com/pikiitos' },
  { name: 'Facebook', icon: '📘', url: 'https://facebook.com/pikiitos' },
  { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com/@pikiitos' },
  { name: 'WhatsApp', icon: '💬', url: 'https://wa.me/573001234567' },
]

const footerLinks = [
  {
    title: 'Tienda',
    links: [
      { label: 'Niñas', to: '/categorias/ninas' },
      { label: 'Niños', to: '/categorias/ninos' },
      { label: 'Bebés', to: '/categorias/bebes' },
      { label: 'Novedades', to: '/productos?sort=newest' },
      { label: 'Ofertas', to: '/ofertas' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nuestra Historia', to: '/nosotros' },
      { label: 'Contacto', to: '/contacto' },
      { label: 'Blog', to: '/blog' },
      { label: 'Trabaja con nosotros', to: '/careers' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: '¿Cómo comprar?', to: '/help/how-to-buy' },
      { label: 'Envíos', to: '/help/shipping' },
      { label: 'Devoluciones', to: '/help/returns' },
      { label: 'Preguntas frecuentes', to: '/help/faq' },
      { label: 'Términos y condiciones', to: '/terms-and-conditions' },
    ],
  },
]

const paymentMethods = [
  'PSE',
  'Visa',
  'Mastercard',
  'Nequi',
  'Daviplata',
  'Efecty',
]

defineOptions({ name: 'FooterSection' })
</script>
