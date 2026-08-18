<template>
  <section class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="about-hero-content">
        <div class="about-hero-text">
          <span class="about-kicker">QUIÉNES SOMOS</span>
          <h1 class="about-title">
            Más que ropa,<br />
            <span class="about-title-accent">creamos recuerdos</span>
            <span class="about-heart">♡</span>
          </h1>
          <div class="about-title-underline"></div>
          <p class="about-description">
            Pikiitos nació del amor por los detalles, los colores y esos pequeños momentos que se convierten en los más grandes recuerdos. Cada prenda está diseñada para acompañar a los niños en sus aventuras, juegos y sonrisas, con comodidad, calidad y mucha alegría.
          </p>
        </div>
        <div class="about-hero-image">
          <img
            src="https://res.cloudinary.com/dlwzazojt/image/upload/v1783533124/ChatGPT_Image_8_jul_2026_12_45_14_plultb.png"
            alt="Pikiitos - pequeños momentos, grandes recuerdos"
          />
        </div>
      </div>
    </section>

    <!-- Designer Section -->
    <section class="about-designer">
      <div class="about-designer-card">
        <div class="about-designer-image">
          <img
            src="https://res.cloudinary.com/dlwzazojt/image/upload/v1784053605/WhatsApp_Image_2026-07-04_at_12.02.46_PM_1_sdgzrg.jpg"
            alt="Paula Salcedo - Fundadora de Pikiitos"
          />
        </div>
        <div class="about-designer-content">
          <div class="designer-icon">
            <span class="designer-heart">♡</span>
          </div>
          <span class="designer-label">LA DISEÑADORA</span>
          <h2 class="designer-greeting">
            Hola, soy Paula
          </h2>
          <p class="designer-subtitle">
            <span class="designer-subtitle-accent">y este es mi sueño hecho realidad</span>
            <span class="about-heart">♡</span>
          </p>
          <p class="designer-description">
            Desde siempre he creído que hay prendas que no olvidamos porque acompañan momentos únicos. Por eso creé Pikiitos, una marca pensada para vestir la infancia con amor, diseño y calidad, y para ser parte de esos recuerdos que los niños llevarán para siempre.
          </p>
          <p class="designer-thanks">
            Gracias por permitirnos ser parte de su historia.
          </p>
          <div class="designer-signature">
            <span class="signature-name">Paula Salcedo</span>
            <span class="signature-heart">♡</span>
          </div>
          <p class="designer-role">
            Fundadora y Diseñadora de Pikiitos
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'AboutSection' })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

.about-page {
  width: 100%;
  overflow-x: hidden;
}

/* Hero Section */
.about-hero {
  position: relative;
  width: 100%;
  min-height: 420px;
  background: linear-gradient(135deg, #FDF5EC 0%, #F9E8D0 100%);
  overflow: hidden;
}

.about-hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 420px;
}

.about-hero-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px clamp(40px, 6vw, 80px);
  z-index: 2;
}

.about-kicker {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #E88B9C;
  margin-bottom: 16px;
}

.about-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  color: #2D2D2D;
  line-height: 1.2;
  margin: 0 0 8px;
}

.about-title-accent {
  font-family: 'Dancing Script', cursive;
  font-weight: 600;
  color: #F5A623;
  font-size: clamp(30px, 3.8vw, 44px);
}

.about-heart {
  font-family: 'Dancing Script', cursive;
  color: #F5A623;
  font-size: 0.9em;
  margin-left: 4px;
}

.about-title-underline {
  width: 80px;
  height: 3px;
  background: #F5A623;
  border-radius: 2px;
  margin-bottom: 24px;
}

.about-description {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #666666;
  line-height: 1.8;
  max-width: 480px;
  margin: 0;
}

.about-hero-image {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
}

/* Designer Section */
.about-designer {
  padding: 80px clamp(20px, 5vw, 80px);
  background: #FFFFFF;
}

.about-designer-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  margin: 0 auto;
  background: #FFFFFF;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.about-designer-image {
  position: relative;
  min-height: 500px;
  overflow: hidden;
}

.about-designer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.about-designer-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px clamp(32px, 4vw, 60px);
}

.designer-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #F5A623;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.designer-heart {
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
  color: #F5A623;
}

.designer-label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #E88B9C;
  margin-bottom: 12px;
}

.designer-greeting {
  font-family: 'Playfair Display', serif;
  font-size: clamp(28px, 3vw, 38px);
  font-weight: 700;
  color: #2D2D2D;
  margin: 0 0 4px;
  line-height: 1.2;
}

.designer-subtitle {
  margin: 0 0 24px;
}

.designer-subtitle-accent {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(22px, 2.5vw, 30px);
  color: #F5A623;
  font-weight: 500;
}

.designer-description {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #666666;
  line-height: 1.8;
  margin: 0 0 20px;
}

.designer-thanks {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #666666;
  margin: 0 0 24px;
  line-height: 1.6;
}

.designer-signature {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.signature-name {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 700;
  color: #2D2D2D;
}

.signature-heart {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(24px, 2.5vw, 30px);
  color: #F5A623;
}

.designer-role {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #999999;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .about-hero-content {
    grid-template-columns: 1fr;
  }

  .about-hero-image {
    display: none;
  }

  .about-designer-card {
    grid-template-columns: 1fr;
  }

  .about-designer-image {
    min-height: 400px;
  }
}

@media (max-width: 768px) {
  .about-hero {
    min-height: auto;
  }

  .about-hero-text {
    padding: 48px 24px;
  }

  .about-designer {
    padding: 48px 16px;
  }

  .about-designer-image {
    min-height: 350px;
  }

  .about-designer-content {
    padding: 36px 24px;
  }
}
</style>
