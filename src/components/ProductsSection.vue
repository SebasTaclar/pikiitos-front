<template>
  <section class="py-20 lg:py-28 bg-pikiitos-cream/30">
    <div class="section-padding">
      <div class="section-container">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row items-center justify-between mb-14 gap-4">
          <div class="text-center sm:text-left">
            <span class="inline-block font-poppins font-semibold text-sm text-pikiitos-pink tracking-widest uppercase mb-3">Lo más querido</span>
            <h2 class="font-fredoka font-bold text-3xl sm:text-4xl lg:text-5xl text-pikiitos-brown">
              Productos Destacados
            </h2>
          </div>
          <RouterLink to="/productos" class="btn-pikiitos-outline text-sm shrink-0">
            Ver todos
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </RouterLink>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
            @quick-view="$emit('quickView', $event)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'

interface FeaturedProduct {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: '1',
    name: 'Vestido Floral de Verano',
    category: 'Niñas',
    price: 45900,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop',
    rating: 5,
    reviews: 42,
    badge: 'Nuevo',
  },
  {
    id: '2',
    name: 'Camiseta Dinosaurio Explorer',
    category: 'Niños',
    price: 32900,
    originalPrice: 39900,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
    rating: 5,
    reviews: 38,
    badge: 'Oferta',
  },
  {
    id: '3',
    name: 'Body Bebé Estrellitas',
    category: 'Bebés',
    price: 28900,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=400&fit=crop',
    rating: 5,
    reviews: 56,
    badge: 'Popular',
  },
  {
    id: '4',
    name: 'Conjunto Panda Suave',
    category: 'Bebés',
    price: 52900,
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
    rating: 4,
    reviews: 29,
    badge: 'Nuevo',
  },
  {
    id: '5',
    name: 'Falda Tutú Rosa',
    category: 'Niñas',
    price: 38900,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop',
    rating: 5,
    reviews: 67,
  },
  {
    id: '6',
    name: 'Jeans Comfort Stretch',
    category: 'Niños',
    price: 42900,
    originalPrice: 49900,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
    rating: 4,
    reviews: 31,
    badge: 'Oferta',
  },
  {
    id: '7',
    name: 'Chaqueta Mini Explorer',
    category: 'Niños',
    price: 68900,
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
    rating: 5,
    reviews: 24,
    badge: 'Nuevo',
  },
  {
    id: '8',
    name: 'Enterizo Corazón Bebé',
    category: 'Bebés',
    price: 35900,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=400&fit=crop',
    rating: 5,
    reviews: 48,
  },
]

defineEmits<{
  quickView: [product: FeaturedProduct]
}>()

defineOptions({ name: 'ProductsSection' })
</script>
