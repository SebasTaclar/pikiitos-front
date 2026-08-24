<template>
  <footer class="bg-pikiitos-brown text-white pt-10 lg:pt-20 pb-8">
    <div class="section-padding">
      <div class="section-container">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12 mb-8 lg:mb-12">
          <!-- Brand Column -->
          <div class="text-center">
            <div class="flex items-center justify-center gap-2 mb-4 lg:mb-5">
              <img src="@/assets/logo-pollito.png" alt="Pikiitos Logo" class="w-14 h-14 lg:w-20 lg:h-20 rounded-full object-cover" />
              <span class="font-fredoka font-semibold text-white text-2xl lg:text-[2.3rem]">Pikiitos</span>
            </div>
            <p class="font-poppins text-white/60 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 max-w-xs mx-auto">
              Ropa infantil diseñada con amor para que cada momento sea un recuerdo inolvidable!.
            </p>

            <!-- Social Media -->
            <p class="font-poppins text-white/50 text-[10px] lg:text-xs mb-2 lg:mb-3">Síguenos en nuestras redes</p>
            <div class="flex gap-2 lg:gap-3 justify-center">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-pikiitos-yellow hover:text-pikiitos-brown transition-all duration-300 hover:-translate-y-0.5"
                :aria-label="social.name"
              >
                <svg v-if="social.name === 'Instagram'" class="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <svg v-else-if="social.name === 'TikTok'" class="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13.2a8.19 8.19 0 005.58 2.16v-3.45a4.85 4.85 0 01-3.77-1.62V6.69h3.77z"/></svg>
                <svg v-else-if="social.name === 'WhatsApp'" class="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/></svg>
              </a>
            </div>
          </div>

          <!-- Links Columns -->
          <div v-for="section in footerLinks" :key="section.title" class="text-center lg:text-left">
            <h3 class="font-nunito font-bold text-xs lg:text-sm uppercase tracking-wider text-white/90 mb-3 lg:mb-4">
              {{ section.title }}
            </h3>
            <ul class="footer-links-grid">
              <li v-for="link in section.links" :key="link.label">
                <button
                  v-if="link.action"
                  class="font-poppins text-xs lg:text-sm text-white/50 hover:text-pikiitos-yellow transition-colors duration-200"
                  @click="link.action"
                >
                  {{ link.label }}
                </button>
                <RouterLink
                  v-else
                  :to="link.to"
                  class="font-poppins text-xs lg:text-sm text-white/50 hover:text-pikiitos-yellow transition-colors duration-200"
                >
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="border-t border-white/10 pt-6 lg:pt-8 mb-6 lg:mb-8">
          <h3 class="font-nunito font-bold text-xs lg:text-sm uppercase tracking-wider text-white/90 mb-3 lg:mb-4 text-center">Medios de pago</h3>
          <div class="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <div
              v-for="method in paymentMethods"
              :key="method"
              class="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 rounded-lg sm:rounded-xl font-poppins text-[10px] sm:text-xs text-white/60"
            >
              {{ method }}
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/10 pt-6 lg:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 lg:gap-4">
          <p class="font-poppins text-[10px] lg:text-xs text-white/40 text-center sm:text-left">
            &copy; {{ currentYear }} Pikiitos. Todos los derechos reservados. Hecho con 💛 para los más pequeños. | Desarrollado por: <a href="https://www.dataor.org/" target="_blank" rel="noopener noreferrer" class="hover:text-white/70 transition-colors">DataOr</a>
          </p>
          <div class="flex items-center gap-3 lg:gap-4">
            <RouterLink to="/terms-and-conditions" class="font-poppins text-[10px] lg:text-xs text-white/40 hover:text-white/70 transition-colors">
              Términos
            </RouterLink>
            <RouterLink to="/terms-and-conditions" class="font-poppins text-[10px] lg:text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacidad
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Cómo Comprar -->
    <Teleport to="body">
      <div v-if="showHowToBuy" class="modal-overlay" @click="showHowToBuy = false">
        <div class="modal-panel" @click.stop>
          <div class="modal-header">
            <h2>¿Cómo comprar?</h2>
            <button class="modal-close" @click="showHowToBuy = false">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m18 6-12 12"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Explora el catálogo</h3>
                  <p>Explora nuestras categorías o usa el buscador para encontrar las prendas que te gustan.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Agrega al carrito</h3>
                  <p>Selecciona la talla y cantidad, luego haz clic en "Agregar al carrito". Puedes agregar varios productos.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Confirma tu pedido</h3>
                  <p>En el carrito, haz clic en "Comprar ahora". Completa tus datos y dirección de envío.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Paga de forma segura</h3>
                  <p>Serás redirigido a Wompi para completar el pago con PSE, tarjeta, Nequi u otro medio disponible.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">5</div>
                <div class="step-content">
                  <h3>Recibe en casa</h3>
                  <p>Recibirás un número de guía para rastrear tu envío. ¡Cuidamos tu pedido con mucho amor!</p>
                </div>
              </div>
            </div>
            <div class="modal-help">
              <p>¿Tienes dudas? Escríbenos por <a href="https://wa.me/573206770595" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
const showHowToBuy = ref(false)

const socials = [
  { name: 'Instagram', icon: '📷', url: 'https://www.instagram.com/pikiitos.co?igsi=MWljd2NsY3p6NTJvcQ%3D%3D&utm_source=qr' },
  { name: 'TikTok', icon: '🎵', url: 'https://www.tiktok.com/@pikiitos?_r=1&_t=ZS-994hJPhcsEu' },
  { name: 'WhatsApp', icon: '💬', url: 'https://wa.me/573206770595' },
]

const footerLinks = [
  {
    title: 'Tienda',
    links: [
      { label: 'Niñas', to: '/categorias/ninas' },
      { label: 'Niños', to: '/categorias/ninos' },
      { label: 'Bebés', to: '/categorias/bebes' },
      { label: 'Accesorios', to: '/categorias/accesorios' },
      { label: 'Novedades', to: '/colecciones' },
      { label: 'Ofertas', to: '/ofertas' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nuestra Historia', to: '/nosotros' },
      { label: 'Contacto', to: '/#contacto' },
      { label: 'Colecciones', to: '/#categorias' },
      { label: 'Tienda', to: '/productos' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: '¿Cómo comprar?', action: () => { showHowToBuy.value = true } },
      { label: 'Envíos', to: '/terms-and-conditions' },
      { label: 'Devoluciones', to: '/terms-and-conditions' },
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

<style scoped>
.footer-links-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.375rem 1rem;
  list-style-type: disc;
  padding-left: 1rem;
}
.footer-links-grid li {
  padding-left: 0;
}
@media (min-width: 640px) {
  .footer-links-grid {
    display: block;
    gap: normal;
    row-gap: 0.375rem;
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(74, 55, 40, 0.5);
  z-index: 3500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-panel {
  background: #ffffff;
  border-radius: 20px;
  max-width: 480px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(74, 55, 40, 0.25);
  animation: slideUp 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0;
}

.modal-header h2 {
  margin: 0;
  font-family: 'Fredoka', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #4A3728;
}

.modal-close {
  background: #FFF8E8;
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  cursor: pointer;
  color: #4A3728;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.modal-close:hover {
  background: #f5edd8;
}

.modal-body {
  padding: 1.5rem;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  background: #D7AC43;
  color: #4A3728;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-content h3 {
  margin: 0 0 0.25rem;
  font-family: 'Fredoka', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #4A3728;
}

.step-content p {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: #8B7355;
  line-height: 1.5;
}

.modal-help {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f5edd8;
  text-align: center;
}

.modal-help p {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: #8B7355;
}

.modal-help a {
  color: #D7AC43;
  font-weight: 700;
  text-decoration: none;
}

.modal-help a:hover {
  text-decoration: underline;
}
</style>
