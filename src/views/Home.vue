<template>
  <main class="home-main">
    <Hero />

    <div id="categorias">
      <CategoriesSection />
    </div>

    <ProductsSection />

    <EmotionalBanner />

    <div id="nosotros">
      <StorySection />
    </div>

    <Benefits />

    <Testimonials />

    <div id="contacto">
      <Newsletter />
    </div>
  </main>
</template>

<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import CategoriesSection from '@/components/CategoriesSection.vue'
import ProductsSection from '@/components/ProductsSection.vue'
import EmotionalBanner from '@/components/EmotionalBanner.vue'
import StorySection from '@/components/StorySection.vue'
import Benefits from '@/components/Benefits.vue'
import Testimonials from '@/components/Testimonials.vue'
import Newsletter from '@/components/Newsletter.vue'

defineOptions({ name: 'HomeView' })
</script>

<style scoped>
.home-main {
  background: #FFF8E8;
}
</style>
