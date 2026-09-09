<template>
  <div class="admin-layout" :class="{ 'sidebar-open': sidebarOpen }">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <router-link to="/" class="sidebar-logo">
          <img src="https://res.cloudinary.com/dlwzazojt/image/upload/v1787367349/logo-pollito-removebg-preview_fhsilm.png" alt="Pollito" class="logo-pollito" />
          <img src="https://res.cloudinary.com/dlwzazojt/image/upload/v1787349262/logo-pikiitos-texto-removebg-preview_bn2t7l.png" alt="Pikiitos" class="logo-img" />
        </router-link>
        <p class="sidebar-subtitle">Panel de Administración</p>
      </div>

      <nav class="sidebar-nav">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav-item"
          :class="{ active: currentSection === item.id }"
          @click="setSection(item.id)"
        >
          <span class="nav-icon" v-html="item.icon"></span>
          <span class="nav-label">{{ item.label }}</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <button class="nav-item logout" @click="handleLogout">
          <span class="nav-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </span>
          <span class="nav-label">Cerrar sesión</span>
        </button>
        <p class="copyright">Pikiitos<br/>© 2026 Todos los derechos reservados.</p>
      </div>
    </aside>

    <!-- Sidebar overlay (mobile) -->
    <div class="sidebar-overlay" @click="sidebarOpen = false"></div>

    <!-- Main Area -->
    <div class="main-area">
      <!-- Topbar -->
      <header class="topbar">
        <router-link to="/" class="home-btn" title="Volver al inicio">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </router-link>
        <button class="menu-toggle" @click="sidebarOpen = !sidebarOpen">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div class="topbar-search">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Buscar productos, pedidos, clientes..." class="search-input" />
        </div>

        <div class="topbar-actions">
          <div class="topbar-user">
            <div class="user-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="user-info">
              <span class="user-name">{{ userName }}</span>
              <span class="user-role">Administrador</span>
            </div>
          </div>
          <button class="logout-btn" title="Cerrar sesión" @click="handleLogout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- Content -->
      <main class="main-content">
        <!-- ========== DASHBOARD ========== -->
        <div v-if="currentSection === 'dashboard'">
          <div class="content-header">
            <div>
              <h1 class="page-title">Bienvenido, {{ userName }}</h1>
              <p class="page-subtitle">Aqui tienes un resumen general de tu tienda.</p>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="stats-row stats-row-4">
            <div class="stat-card" v-for="stat in dashboardStats" :key="stat.label">
              <div class="stat-icon" :style="{ background: stat.iconBg }">
                <span v-html="stat.icon"></span>
              </div>
              <div class="stat-content">
                <span class="stat-label">{{ stat.label }}</span>
                <span class="stat-value">{{ stat.value }}</span>
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="dashboard-charts-grid">
            <!-- Productos por Categoría -->
            <div class="card chart-card">
              <div class="card-header">
                <h3>Productos por categoría</h3>
              </div>
              <div class="bar-chart">
                <div v-for="cat in productsByCategory" :key="cat.name" class="bar-row">
                  <span class="bar-label">{{ cat.name }}</span>
                  <div class="bar-track">
                    <div class="bar-fill" :style="{ width: cat.percent + '%', background: cat.color }"></div>
                  </div>
                  <span class="bar-value">{{ cat.count }}</span>
                </div>
              </div>
            </div>

            <!-- Productos por Estado -->
            <div class="card chart-card">
              <div class="card-header">
                <h3>Productos por estado</h3>
              </div>
              <div class="donut-chart-wrapper">
                <svg viewBox="0 0 120 120" class="donut-svg">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" stroke-width="14"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#FFD84D" stroke-width="14"
                    :stroke-dasharray="productStatusData.availableArc + ' ' + productStatusData.totalArc"
                    stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#FF8E8E" stroke-width="14"
                    :stroke-dasharray="productStatusData.unavailableArc + ' ' + productStatusData.totalArc"
                    :stroke-dashoffset="'-' + productStatusData.availableArc" transform="rotate(-90 60 60)"/>
                  <text x="60" y="56" text-anchor="middle" class="donut-total">{{ products.length }}</text>
                  <text x="60" y="70" text-anchor="middle" class="donut-subtitle">total</text>
                </svg>
                <div class="donut-legend">
                  <span class="legend-item"><span class="legend-dot" style="background:#FFD84D"></span> Disponibles ({{ productStatusData.availableCount }})</span>
                  <span class="legend-item"><span class="legend-dot" style="background:#FF8E8E"></span> Agotados ({{ productStatusData.unavailableCount }})</span>
                </div>
              </div>
            </div>

            <!-- Productos por Precio -->
            <div class="card chart-card">
              <div class="card-header">
                <h3>Productos por precio</h3>
              </div>
              <div class="bar-chart">
                <div v-for="range in productsByPrice" :key="range.label" class="bar-row">
                  <span class="bar-label">{{ range.label }}</span>
                  <div class="bar-track">
                    <div class="bar-fill" :style="{ width: range.percent + '%', background: range.color }"></div>
                  </div>
                  <span class="bar-value">{{ range.count }}</span>
                </div>
              </div>
            </div>

            <!-- Productos Destacados -->
            <div class="card chart-card">
              <div class="card-header">
                <h3>Productos destacados</h3>
              </div>
              <div class="featured-summary">
                <div class="featured-big-number">
                  <span class="featured-count">{{ featuredCount }}</span>
                  <span class="featured-label">productos destacados</span>
                </div>
                <div class="featured-bar-track">
                  <div class="featured-bar-fill" :style="{ width: featuredPercent + '%' }"></div>
                </div>
                <span class="featured-percent">{{ featuredPercent }}% del total</span>
              </div>
              <div class="featured-list">
                <div v-for="p in featuredProducts" :key="p.id" class="featured-item">
                  <div class="featured-item-img">
                    <img v-if="p.images && p.images[0]" :src="p.images[0]" :alt="p.name" />
                    <span v-else class="featured-item-emoji">👗</span>
                  </div>
                  <div class="featured-item-info">
                    <span class="featured-item-name">{{ p.name }}</span>
                    <span class="featured-item-price">${{ p.price.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========== PRODUCTS ========== -->
        <div v-if="currentSection === 'products'">
          <!-- Header -->
          <div class="section-top">
            <div>
              <h2 class="page-title">Productos</h2>
              <p class="page-subtitle">Gestiona y controla todos los productos de tu tienda.</p>
            </div>
            <button class="btn btn-primary" @click="showProductForm = true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Agregar productos
            </button>
          </div>

          <!-- Stats Cards -->
          <div class="cat-stats-row cat-stats-row-5">
            <div class="cat-stat-card">
              <div class="cat-stat-icon yellow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
              <div class="cat-stat-info">
                <span class="cat-stat-value">{{ products.length }}</span>
                <span class="cat-stat-label">Total productos</span>
              </div>
            </div>
            <div class="cat-stat-card">
              <div class="cat-stat-icon green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div class="cat-stat-info">
                <span class="cat-stat-value">{{ products.filter(p => p.status === 'available').length }}</span>
                <span class="cat-stat-label">Productos Disponibles</span>
              </div>
            </div>
            <div class="cat-stat-card">
              <div class="cat-stat-icon red">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <div class="cat-stat-info">
                <span class="cat-stat-value">{{ products.filter(p => p.status === 'out-of-stock').length }}</span>
                <span class="cat-stat-label">Productos sin stock</span>
              </div>
            </div>
            <div class="cat-stat-card">
              <div class="cat-stat-icon blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </div>
              <div class="cat-stat-info">
                <span class="cat-stat-value">{{ products.filter(p => p.originalPrice && p.originalPrice > p.price).length }}</span>
                <span class="cat-stat-label">Productos con descuento</span>
              </div>
            </div>
            <div class="cat-stat-card">
              <div class="cat-stat-icon orange">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div class="cat-stat-info">
                <span class="cat-stat-value">{{ products.filter(p => p.status === 'coming-soon').length }}</span>
                <span class="cat-stat-label">Próximamente</span>
                <span class="cat-stat-sub">Por lanzar</span>
              </div>
            </div>
          </div>

          <!-- Toolbar -->
          <div class="prod-toolbar">
            <div class="prod-toolbar-left">
              <select v-model="selectedCategoryFilter" class="prod-filter-select">
                <option value="">Todas las categorías</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <select v-model="productStatusFilter" class="prod-filter-select">
                <option value="">Estado: Todos</option>
                <option value="available">Disponible</option>
                <option value="out-of-stock">Sin stock</option>
                <option value="coming-soon">Próximamente</option>
              </select>
              <select v-model="productFeaturedFilter" class="prod-filter-select">
                <option value="">Destacado: Todos</option>
                <option value="yes">Destacados</option>
                <option value="no">No destacados</option>
              </select>
              <select v-model="productPriceFilter" class="prod-filter-select">
                <option value="">Precio: Todos</option>
                <option value="lt100">Menos de $100.000</option>
                <option value="100-300">$100.000 - $300.000</option>
                <option value="300-500">$300.000 - $500.000</option>
                <option value="gt500">Más de $500.000</option>
              </select>
            </div>
            <div class="prod-toolbar-right">
              <div class="search-input-wrapper search-sm">
                <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="search" v-model="searchProducts" placeholder="Buscar producto..." class="search-field" />
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="cat-table-wrap">
            <table class="cat-table products-table">
              <thead>
                <tr>
                  <th class="col-check"><input type="checkbox" /></th>
                  <th class="col-product">Producto</th>
                  <th class="col-category">Categoría</th>
                  <th class="col-price">Precio</th>
                  <th class="col-status">Estado</th>
                  <th class="col-featured">Destacado</th>
                  <th class="col-actions">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in paginatedProducts" :key="product.id">
                  <td class="col-check"><input type="checkbox" /></td>
                  <td class="col-product">
                    <div class="prod-cell">
                      <div class="prod-thumb">
                        <img v-if="product.images && product.images.length > 0" :src="product.images[0]" :alt="product.name" />
                        <span v-else class="prod-thumb-placeholder">📦</span>
                      </div>
                      <div class="prod-info">
                        <span class="prod-name">{{ product.name }}</span>
                        <span class="prod-desc">{{ product.description || 'Sin descripción' }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="col-category">
                    <span class="prod-category-badge">{{ getCategoryName(product.category) }}</span>
                  </td>
                  <td class="col-price">
                    <span class="prod-price">${{ product.price.toLocaleString() }}</span>
                  </td>
                  <td class="col-status">
                    <span :class="['prod-status-badge', product.status]">{{ getStatusText(product.status) }}</span>
                  </td>
                  <td class="col-featured">
                    <button class="prod-star-btn" :class="{ active: product.isShowcase }" @click="toggleProductFeatured(product)">
                      <svg width="18" height="18" viewBox="0 0 24 24" :fill="product.isShowcase ? '#FFD84D' : 'none'" :stroke="product.isShowcase ? '#FFD84D' : '#9CA3AF'" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </button>
                  </td>
                  <td class="col-actions">
                    <div class="cat-actions">
                      <button class="cat-action-btn" @click="editProduct(product)" title="Editar">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button class="cat-action-btn danger" @click="deleteProductConfirm(product.id)" title="Eliminar">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="cat-pagination" v-if="filteredProducts.length > 0 && totalProductPages > 1">
            <span class="cat-pagination-info">Mostrando {{ (productPage - 1) * productsPerPage + 1 }} a {{ Math.min(productPage * productsPerPage, filteredProducts.length) }} de {{ filteredProducts.length }} productos</span>
            <div class="cat-pagination-btns">
              <button class="page-btn" :disabled="productPage <= 1" @click="productPage--">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button v-for="p in totalProductPages" :key="p" class="page-btn" :class="{ active: p === productPage }" @click="productPage = p">{{ p }}</button>
              <button class="page-btn" :disabled="productPage >= totalProductPages" @click="productPage++">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          <!-- Empty states -->
          <div v-if="filteredProducts.length === 0 && !searchProducts" class="empty-state">
            <div class="empty-icon">📦</div>
            <h3>No hay productos</h3>
            <p>Comienza agregando tu primer producto</p>
            <button class="btn btn-primary" @click="showProductForm = true">Crear Primer Producto</button>
          </div>
          <div v-else-if="filteredProducts.length === 0 && searchProducts" class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3>No se encontraron resultados</h3>
            <p>No hay productos que coincidan con "{{ searchProducts }}"</p>
            <button class="btn btn-secondary" @click="searchProducts = ''">Limpiar búsqueda</button>
          </div>
        </div>

        <!-- ========== CATEGORIES ========== -->
        <div v-if="currentSection === 'categories'">
          <!-- Header -->
          <div class="section-top">
            <div>
              <h2 class="page-title">Categorías</h2>
              <p class="page-subtitle">Gestiona las categorías de productos de tu tienda.</p>
            </div>
            <button class="btn btn-primary" @click="showCategoryForm = true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Nueva categoría
            </button>
          </div>

          <!-- Stats Cards -->
          <div class="cat-stats-row cat-stats-cards">
            <div class="cat-stat-card">
              <div class="cat-stat-icon yellow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div class="cat-stat-info">
                <span class="cat-stat-value">{{ categories.length }}</span>
                <span class="cat-stat-label">Total categorías</span>
                <span class="cat-stat-sub">Categorías registradas</span>
              </div>
            </div>
            <div class="cat-stat-card" v-for="category in categories" :key="category.id">
              <div class="cat-stat-icon yellow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div class="cat-stat-info">
                <span class="cat-stat-value">{{ getProductsInCategory(category.id) }}</span>
                <span class="cat-stat-label">{{ category.name }}</span>
                <span class="cat-stat-sub">{{ getProductsInCategory(category.id) === 1 ? 'Producto asociado' : 'Productos asociados' }}</span>
              </div>
            </div>
          </div>

          <!-- Toolbar -->
          <div class="cat-toolbar">
            <div class="cat-toolbar-left">
              <select class="cat-filter-select" v-model="selectedCategoryFilter">
                <option value="">Todas las categorías</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div class="cat-toolbar-right">
              <div class="cat-search">
                <svg class="cat-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="search" v-model="searchCategories" placeholder="Buscar categoría..." class="cat-search-input" />
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="cat-table-container">
            <table class="cat-table">
              <thead>
                <tr>
                  <th class="col-check"><input type="checkbox" /></th>
                  <th class="col-img">Imagen</th>
                  <th class="col-name">Nombre de categoría</th>
                  <th class="col-desc">Descripción</th>
                  <th class="col-products">Productos</th>
                  <th class="col-actions">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in filteredCategories" :key="category.id">
                  <td class="col-check"><input type="checkbox" /></td>
                  <td class="col-img">
                    <div class="cat-thumb">
                      <img v-if="category.imageUrls && category.imageUrls.length > 0" :src="category.imageUrls[0]" :alt="category.name" />
                      <span v-else class="cat-thumb-placeholder">🏷️</span>
                    </div>
                  </td>
                  <td class="col-name">
                    <span class="cat-name-text">{{ category.name }}</span>
                  </td>
                  <td class="col-desc">
                    <span class="cat-desc-text">{{ category.description || 'Sin descripción' }}</span>
                  </td>
                  <td class="col-products">{{ getProductsInCategory(category.id) }}</td>
                  <td class="col-actions">
                    <div class="cat-actions">
                      <button class="cat-action-btn" @click="editCategory(category)" title="Editar">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button class="cat-action-btn danger" @click="handleDeleteCategory(category.id)" title="Eliminar">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="cat-pagination">
            <span class="cat-pagination-info">Mostrando 1 a {{ filteredCategories.length }} de {{ categories.length }} categorías</span>
            <div class="cat-pagination-btns">
              <button class="cat-page-btn" disabled>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button class="cat-page-btn active">1</button>
              <button class="cat-page-btn">2</button>
              <button class="cat-page-btn">3</button>
              <button class="cat-page-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Empty states -->
          <div v-if="filteredCategories.length === 0 && !searchCategories" class="empty-state">
            <div class="empty-icon">🏷️</div>
            <h3>No hay categorías</h3>
            <p>Crea categorías para organizar tus productos</p>
            <button class="btn btn-primary" @click="showCategoryForm = true">Crear Primera Categoría</button>
          </div>
          <div v-else-if="filteredCategories.length === 0 && searchCategories" class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3>No se encontraron resultados</h3>
            <p>No hay categorías que coincidan con "{{ searchCategories }}"</p>
            <button class="btn btn-secondary" @click="searchCategories = ''">Limpiar búsqueda</button>
          </div>
        </div>

        <!-- ========== BRANDS ========== -->
        <div v-if="currentSection === 'brands'">
          <!-- Header -->
          <div class="section-top">
            <div>
              <h2 class="page-title">Marcas</h2>
              <p class="page-subtitle">Gestiona las marcas de productos de tu tienda.</p>
            </div>
            <button class="btn btn-primary" @click="showBrandForm = true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Nueva marca
            </button>
          </div>

          <!-- Stats Cards -->
          <div class="cat-stats-row">
            <div class="cat-stat-card">
              <div class="cat-stat-icon yellow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                </svg>
              </div>
              <div class="cat-stat-info">
                <span class="cat-stat-value">{{ brands.length }}</span>
                <span class="cat-stat-label">Total marcas</span>
                <span class="cat-stat-sub">Marcas registradas</span>
              </div>
            </div>
            <div class="cat-stat-card">
              <div class="cat-stat-icon green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div class="cat-stat-info">
                <span class="cat-stat-value">{{ brands.length }}</span>
                <span class="cat-stat-label">Marcas activas</span>
                <span class="cat-stat-sub">Activadas</span>
              </div>
            </div>
          </div>

          <!-- Toolbar -->
          <div class="cat-toolbar">
            <div class="cat-toolbar-left">
              <select class="cat-bulk-select">
                <option>Acciones en lote</option>
              </select>
              <button class="btn btn-primary btn-sm">Aplicar</button>
            </div>
            <div class="cat-toolbar-right">
              <select class="cat-filter-select">
                <option>Todas las marcas</option>
              </select>
              <div class="cat-search">
                <svg class="cat-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="search" v-model="searchBrands" placeholder="Buscar marca..." class="cat-search-input" />
              </div>
              <button class="btn btn-outline btn-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                Filtros
              </button>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="brandsLoading" class="loading-state">
            <div class="spinner"></div>
            <p>Cargando marcas...</p>
          </div>

          <!-- Error -->
          <div v-else-if="brandsError" class="error-state">
            <div class="error-icon">⚠️</div>
            <p>{{ brandsError }}</p>
            <button @click="loadBrandsData" class="btn btn-primary">Reintentar</button>
          </div>

          <!-- Table -->
          <div v-else class="cat-table-container">
            <table class="cat-table">
              <thead>
                <tr>
                  <th class="col-check"><input type="checkbox" /></th>
                  <th class="col-img">Imagen</th>
                  <th class="col-name">Nombre de marca</th>
                  <th class="col-desc">Descripción</th>
                  <th class="col-actions">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="brand in filteredBrands" :key="brand.id">
                  <td class="col-check"><input type="checkbox" /></td>
                  <td class="col-img">
                    <div class="cat-thumb">
                      <img v-if="brand.imageUrls && brand.imageUrls.length > 0" :src="brand.imageUrls[0]" :alt="brand.name" />
                      <span v-else class="cat-thumb-placeholder">🏷️</span>
                    </div>
                  </td>
                  <td class="col-name">
                    <span class="cat-name-text">{{ brand.name }}</span>
                  </td>
                  <td class="col-desc">
                    <span class="cat-desc-text">{{ brand.description || 'Sin descripción' }}</span>
                  </td>
                  <td class="col-actions">
                    <div class="cat-actions">
                      <button class="cat-action-btn" @click="editBrand(brand)" title="Editar">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button class="cat-action-btn danger" @click="handleDeleteBrand(brand.id)" title="Eliminar">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="cat-pagination">
            <span class="cat-pagination-info">Mostrando 1 a {{ filteredBrands.length }} de {{ brands.length }} marcas</span>
            <div class="cat-pagination-btns">
              <button class="cat-page-btn" disabled>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button class="cat-page-btn active">1</button>
              <button class="cat-page-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Empty states -->
          <div v-if="filteredBrands.length === 0 && !searchBrands" class="empty-state">
            <div class="empty-icon">🏷️</div>
            <h3>No hay marcas</h3>
            <p>Crea marcas para asociar a tus productos</p>
            <button class="btn btn-primary" @click="showBrandForm = true">Crear Primera Marca</button>
          </div>
          <div v-else-if="filteredBrands.length === 0 && searchBrands" class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3>No se encontraron resultados</h3>
            <p>No hay marcas que coincidan con "{{ searchBrands }}"</p>
            <button class="btn btn-secondary" @click="searchBrands = ''">Limpiar búsqueda</button>
          </div>
        </div>

        <!-- ========== SALES ========== -->
        <div v-if="currentSection === 'sales'">
          <div class="section-top">
            <div>
              <h2 class="page-title">Pedidos</h2>
              <p class="page-subtitle">Gestiona los pedidos realizados por tus clientes.</p>
            </div>
            <button class="btn btn-primary" @click="loadPurchases" :disabled="isLoadingSales">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
              </svg>
              Actualizar
            </button>
          </div>

          <!-- Loading -->
          <div v-if="isLoadingSales" class="loading-state">
            <div class="spinner"></div>
            <p>Cargando pedidos...</p>
          </div>

          <!-- Error -->
          <div v-else-if="salesError" class="error-state">
            <div class="error-icon">⚠️</div>
            <p>{{ salesError }}</p>
            <button @click="loadPurchases" class="btn btn-primary">Reintentar</button>
          </div>

          <template v-else>
            <!-- Stats -->
            <div class="stats-row stats-row-4">
              <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #FFD84D, #FF8E8E)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                </div>
                <div class="stat-content">
                  <span class="stat-label">Total Pedidos</span>
                  <span class="stat-value">{{ totalSalesCount }}</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #FFD84D, #FF8E8E)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div class="stat-content">
                  <span class="stat-label">Pendientes</span>
                  <span class="stat-value">{{ pendingSales }}</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #FFD84D, #FF8E8E)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div class="stat-content">
                  <span class="stat-label">Completados</span>
                  <span class="stat-value">{{ completedSalesCount }}</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #FFD84D, #FF8E8E)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div class="stat-content">
                  <span class="stat-label">Ingresos</span>
                  <span class="stat-value">${{ totalRevenue.toLocaleString() }}</span>
                </div>
              </div>
            </div>

            <!-- Search + Filters -->
            <div class="orders-toolbar">
              <div class="orders-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="search" v-model="searchSales" placeholder="Buscar por cliente, email, teléfono o cédula..." class="orders-search-input" />
                <button v-if="searchSales" class="search-clear" @click="searchSales = ''">✕</button>
              </div>
              <select v-model="orderStatusFilter" class="orders-filter-select">
                <option value="">Estado de pago: Todos</option>
                <option value="completed">Pagado</option>
                <option value="pending">Pendiente pago</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            <!-- Orders Table -->
            <div v-if="filteredOrders.length > 0" class="orders-table-container">
              <table class="orders-table">
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Cliente</th>
                    <th>Contacto</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Pago</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in filteredOrders" :key="order.id">
                    <td>
                      <span class="order-id-cell">#{{ order.id }}</span>
                    </td>
                    <td>
                      <div class="cell-stack">
                        <span class="cell-primary">{{ order.customerName }}</span>
                        <span class="cell-secondary">{{ order.customerEmail }}</span>
                      </div>
                    </td>
                    <td>
                      <div class="cell-stack">
                        <span v-if="order.customerPhone" class="cell-primary">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 4px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          {{ order.customerPhone }}
                        </span>
                        <span v-if="order.customerIdNumber" class="cell-secondary">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 4px;"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                          CC: {{ order.customerIdNumber }}
                        </span>
                        <span v-if="order.shippingAddress" class="cell-secondary">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {{ order.shippingAddress }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div v-if="order.items && order.items.length > 1">
                        <span class="products-badge">{{ order.items.length }} productos</span>
                        <details class="products-details">
                          <summary class="products-toggle">Ver detalles</summary>
                          <ul class="products-list">
                            <li v-for="(item, idx) in order.items" :key="idx">
                              <span>{{ item.productName }}</span>
                              <span class="item-qty">x{{ item.quantity }}</span>
                            </li>
                          </ul>
                        </details>
                      </div>
                      <div v-else class="cell-stack">
                        <span class="cell-primary">{{ order.productName }}</span>
                        <span v-if="order.selectedColor" class="cell-secondary">
                          <span class="color-dot" :style="{ backgroundColor: getColorHex(order.selectedColor) }"></span>
                          {{ order.selectedColor }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span class="amount">${{ order.totalAmount.toLocaleString() }}</span>
                    </td>
                    <td>
                      <span :class="['status-pill', order.status]">{{ getPaymentStatusLabel(order.status) }}</span>
                    </td>
                    <td>
                      <span class="cell-secondary">{{ formatDateTime(order.date) }}</span>
                    </td>
                    <td>
                      <button class="cat-action-btn" @click="openOrderDetail(order)" title="Ver detalle">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Empty state -->
            <div v-else class="empty-state">
              <div class="empty-icon">📦</div>
              <h3>No hay pedidos</h3>
              <p>Los pedidos aparecerán aquí cuando los clientes realicen compras</p>
            </div>
          </template>
        </div>

        <!-- ========== WHATSAPP QUOTES ========== -->
        <div v-if="currentSection === 'whatsapp-quotes'">
          <div class="section-top">
            <h2>Cotizaciones WhatsApp</h2>
          </div>

          <div class="sales-stats-row">
            <div class="mini-stat">
              <span class="mini-stat-label">Total Solicitudes</span>
              <span class="mini-stat-value">{{ whatsappQuotes.length }}</span>
            </div>
            <div class="mini-stat">
              <span class="mini-stat-label">Pendientes</span>
              <span class="mini-stat-value">{{ whatsappQuotes.filter(q => q.status === 'pending').length }}</span>
            </div>
            <div class="mini-stat">
              <span class="mini-stat-label">Respondidas</span>
              <span class="mini-stat-value">{{ whatsappQuotes.filter(q => q.status === 'responded').length }}</span>
            </div>
          </div>

          <div v-if="whatsappQuotes.length === 0" class="empty-state">
            <div class="empty-icon">💬</div>
            <h3>No hay cotizaciones por WhatsApp</h3>
            <p>Las solicitudes de cotización aparecerán aquí cuando los clientes envíen mensajes desde el catálogo.</p>
          </div>

          <div v-else class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Empresa</th>
                  <th>Ciudad</th>
                  <th>Teléfono</th>
                  <th>Productos</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="quote in whatsappQuotes" :key="quote.id">
                  <td><span class="cell-primary">{{ quote.name }}</span></td>
                  <td><span class="cell-secondary">{{ quote.company }}</span></td>
                  <td><span class="cell-secondary">{{ quote.city }}</span></td>
                  <td><span class="cell-secondary">{{ quote.phone }}</span></td>
                  <td><span class="products-badge">{{ quote.productCount }} productos</span></td>
                  <td><span :class="['status-pill', quote.status]">{{ quote.status === 'pending' ? 'Pendiente' : 'Respondida' }}</span></td>
                  <td>
                    <button class="btn btn-sm btn-primary" @click="openWhatsApp(quote)">Responder</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- ========== MODALS ========== -->
    <!-- Modal de Producto -->
    <div v-if="showProductForm" class="modal-overlay" @click="closeProductForm">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ editingProduct ? 'Editar Producto' : 'Nuevo Producto' }}</h3>
          <button class="modal-close" @click="closeProductForm">✕</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveProduct">
            <div class="form-group">
              <label>Nombre del Producto *</label>
              <input v-model="productForm.name" type="text" class="form-input" required placeholder="Ej: Vestido de Flores" />
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <textarea v-model="productForm.description" class="form-input" rows="3" placeholder="Describe las características principales del producto"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Precio *</label>
                <div class="price-input">
                  <span class="currency">$</span>
                  <input :value="formatPriceInput(productForm.price)" @input="handlePriceInput($event, 'price')" type="text" class="form-input" required placeholder="0" />
                </div>
              </div>
              <div class="form-group">
                <label>Precio Original (descuento)</label>
                <div class="price-input">
                  <span class="currency">$</span>
                  <input :value="formatPriceInput(productForm.originalPrice)" @input="handlePriceInput($event, 'originalPrice')" type="text" class="form-input" placeholder="0" />
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Categoría *</label>
                <select v-model="productForm.category" class="form-input" required>
                  <option value="">Seleccionar categoría</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Estado de Disponibilidad *</label>
                <select v-model="productForm.status" class="form-input" required>
                  <option value="available">✅ Disponible</option>
                  <option value="out-of-stock">❌ Sin Stock</option>
                  <option value="coming-soon">🔜 Próximamente</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="productForm.isShowcase" />
                <span>⭐ Producto Destacado</span>
              </label>
              <p class="form-help">Marcar para mostrar en la sección de Productos Destacados del inicio</p>
            </div>
            <div class="form-group">
              <label>Tallas Disponibles</label>
              <div class="materials-grid">
                <button v-for="material in materialOptions" :key="material" type="button" class="material-chip" :class="{ selected: isMaterialSelected(material) }" @click="toggleProductMaterial(material)">
                  {{ material }}
                </button>
              </div>
              <div v-if="productForm.colors.length > 0" class="selected-materials">
                <span class="selected-label">Seleccionadas: </span>
                <span v-for="(color, idx) in productForm.colors" :key="idx" class="selected-tag">
                  {{ color }}
                  <button type="button" class="selected-tag-remove" @click="productForm.colors.splice(idx, 1)">✕</button>
                </span>
              </div>
            </div>
            <div class="form-group">
              <label>Imágenes del Producto (URL) *</label>
              <div class="image-urls">
                <div v-for="(img, idx) in productForm.images" :key="idx" class="image-url-row">
                  <input :value="img" @input="(e) => updateImageUrl(idx, (e.target as HTMLInputElement).value)" type="text" class="form-input" :placeholder="'URL imagen ' + (idx + 1)" />
                  <button v-if="productForm.images.length > 1" type="button" class="image-remove-btn" @click="removeImageUrl(idx)" title="Eliminar">✕</button>
                  <button type="button" class="image-main-btn" :class="{ active: idx === mainImageIndex }" @click="setMainImage(idx)" title="Marcar como principal">
                    <svg width="14" height="14" viewBox="0 0 24 24" :fill="idx === mainImageIndex ? '#FFD84D' : 'none'" :stroke="idx === mainImageIndex ? '#FFD84D' : '#9CA3AF'" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </button>
                </div>
                <button type="button" class="image-add-btn" @click="addImageUrl">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Agregar imagen
                </button>
              </div>

              <div v-if="productForm.images.some(img => img && img.trim())" class="images-preview-grid" style="margin-top: 12px;">
                <div v-for="(img, idx) in productForm.images" :key="idx" v-show="img && img.trim()" class="image-preview-item" :class="{ 'is-main': idx === mainImageIndex }">
                  <img :src="getPreviewUrl(img)" alt="Vista previa" />
                  <span v-if="idx === mainImageIndex" class="image-index">Principal</span>
                  <div class="image-preview-arrows">
                    <button v-if="idx > 0" type="button" class="preview-arrow-btn" @click="moveImageUrl(idx, -1)" title="Mover izquierda">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button v-if="idx < productForm.images.length - 1" type="button" class="preview-arrow-btn" @click="moveImageUrl(idx, 1)" title="Mover derecha">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              <div v-else class="preview-placeholder" style="margin-top: 12px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
                <p>Pega URLs de imágenes para ver la vista previa</p>
              </div>
            </div>
            <div v-if="productForm.originalPrice && productForm.originalPrice > productForm.price" class="discount-info">
              <span class="discount-badge">💰 Descuento: {{ Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100) }}%</span>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="closeProductForm" :disabled="savingProduct">Cancelar</button>
              <button type="submit" class="btn btn-primary" :disabled="!isFormValid || savingProduct">
                <span v-if="savingProduct" class="btn-loading-text">
                  <svg class="spinner-sm" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
                  {{ editingProduct ? 'Actualizando...' : 'Creando...' }}
                </span>
                <span v-else>{{ editingProduct ? 'Actualizar Producto' : 'Crear Producto' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de Categoría -->
    <div v-if="showCategoryForm" class="modal-overlay" @click="closeCategoryForm">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ editingCategory ? 'Editar Categoría' : 'Nueva Categoría' }}</h3>
          <button class="modal-close" @click="closeCategoryForm">✕</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveCategory">
            <div class="form-group">
              <label>Nombre de la Categoría</label>
              <input v-model="categoryForm.name" type="text" class="form-input" required />
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <textarea v-model="categoryForm.description" class="form-input" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Imágenes de la Categoría (URLs)</label>
              <div class="image-urls">
                <div v-for="(_, index) in categoryImageUrls" :key="index" class="image-url-row">
                  <input :value="categoryImageUrls[index]" @input="(e) => updateCategoryImageUrl(index, (e.target as HTMLInputElement).value)" type="text" class="form-input" placeholder="https://ejemplo.com/imagen.jpg" />
                  <button type="button" class="btn btn-secondary btn-sm" @click="removeCategoryImageUrl(index)" :disabled="categoryImageUrls.length <= 1">✕</button>
                </div>
              </div>
              <button type="button" class="btn btn-secondary btn-sm" @click="addCategoryImageUrl" style="margin-top: 8px;">+ Agregar otra URL</button>
              <div v-if="categoryImageUrls.some(i => i.trim())" class="images-preview-grid" style="margin-top: 12px;">
                <div v-for="(image, index) in categoryImageUrls" :key="`cat-${index}-${image}`" class="image-preview-item" v-show="image.trim()">
                  <img :src="image" :alt="`Preview ${index + 1}`" />
                  <span class="image-index">{{ index + 1 }}</span>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="closeCategoryForm">Cancelar</button>
              <button type="submit" class="btn btn-primary">{{ editingCategory ? 'Actualizar' : 'Crear' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Brand Form Modal -->
    <div v-if="showBrandForm" class="modal-overlay" @click="closeBrandForm">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ editingBrand ? 'Editar Marca' : 'Nueva Marca' }}</h3>
          <button class="modal-close" @click="closeBrandForm">✕</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveBrand">
            <div class="form-group">
              <label>Nombre de la Marca</label>
              <input v-model="brandForm.name" type="text" class="form-input" required />
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <textarea v-model="brandForm.description" class="form-input" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Imágenes de la Marca (URLs)</label>
              <div class="image-urls">
                <div v-for="(_, index) in brandImageUrls" :key="index" class="image-url-row">
                  <input :value="brandImageUrls[index]" @input="(e) => updateBrandImageUrl(index, (e.target as HTMLInputElement).value)" type="text" class="form-input" placeholder="https://ejemplo.com/imagen.jpg" />
                  <button type="button" class="btn btn-secondary btn-sm" @click="removeBrandImageUrl(index)" :disabled="brandImageUrls.length <= 1">✕</button>
                </div>
              </div>
              <button type="button" class="btn btn-secondary btn-sm" @click="addBrandImageUrl" style="margin-top: 8px;">+ Agregar otra URL</button>
              <div v-if="brandImageUrls.some(i => i.trim())" class="images-preview-grid" style="margin-top: 12px;">
                <div v-for="(image, index) in brandImageUrls" :key="`brand-${index}-${image}`" class="image-preview-item" v-show="image.trim()">
                  <img :src="image" :alt="`Preview ${index + 1}`" />
                  <span class="image-index">{{ index + 1 }}</span>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="closeBrandForm">Cancelar</button>
              <button type="submit" class="btn btn-primary">{{ editingBrand ? 'Actualizar' : 'Crear' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <div v-if="confirmModal.open" class="modal-overlay" @click.self="confirmModal.onCancel()">
      <div class="modal confirm-modal">
        <div class="confirm-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4A017" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3 class="confirm-title">{{ confirmModal.title }}</h3>
        <p class="confirm-message">{{ confirmModal.message }}</p>
        <div class="confirm-actions">
          <button class="btn btn-secondary" @click="confirmModal.onCancel()">Cancelar</button>
          <button class="btn btn-primary" @click="confirmModal.onConfirm()">Aceptar</button>
        </div>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div v-if="showOrderDetail && selectedOrderDetail" class="modal-overlay" @click="closeOrderDetail">
      <div class="modal order-detail-modal" @click.stop>
        <div class="modal-header">
          <h3>Detalle del Pedido #{{ selectedOrderDetail.id }}</h3>
          <button class="modal-close" @click="closeOrderDetail">✕</button>
        </div>
        <div class="modal-body">
          <!-- Customer Info -->
          <div class="order-detail-section">
            <h4 class="order-detail-section-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Datos del Cliente
            </h4>
            <div class="order-detail-grid">
              <div class="order-detail-field">
                <span class="order-detail-label">Nombre</span>
                <span class="order-detail-value">{{ selectedOrderDetail.customerName }}</span>
              </div>
              <div class="order-detail-field">
                <span class="order-detail-label">Email</span>
                <span class="order-detail-value">{{ selectedOrderDetail.customerEmail }}</span>
              </div>
              <div v-if="selectedOrderDetail.customerPhone" class="order-detail-field">
                <span class="order-detail-label">Teléfono</span>
                <span class="order-detail-value">{{ selectedOrderDetail.customerPhone }}</span>
              </div>
              <div v-if="selectedOrderDetail.customerIdNumber" class="order-detail-field">
                <span class="order-detail-label">Cédula / ID</span>
                <span class="order-detail-value">{{ selectedOrderDetail.customerIdNumber }}</span>
              </div>
              <div v-if="selectedOrderDetail.shippingAddress" class="order-detail-field order-detail-field-full">
                <span class="order-detail-label">Dirección de envío</span>
                <span class="order-detail-value">{{ selectedOrderDetail.shippingAddress }}</span>
              </div>
            </div>
          </div>

          <!-- Products -->
          <div class="order-detail-section">
            <h4 class="order-detail-section-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              Productos
            </h4>
            <div class="order-detail-products">
              <div v-for="(item, idx) in selectedOrderDetail.items" :key="idx" class="order-detail-product">
                <div class="order-detail-product-info">
                  <span class="order-detail-product-name">{{ item.productName }}</span>
                  <span v-if="item.selectedColor" class="order-detail-product-color">
                    <span class="color-dot" :style="{ backgroundColor: getColorHex(item.selectedColor) }"></span>
                    {{ item.selectedColor }}
                  </span>
                </div>
                <div class="order-detail-product-qty">
                  x{{ item.quantity }}
                </div>
                <div class="order-detail-product-price">
                  ${{ item.totalPrice.toLocaleString() }}
                </div>
              </div>
            </div>
          </div>

          <!-- Status & Total -->
          <div class="order-detail-section">
            <h4 class="order-detail-section-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Resumen
            </h4>
            <div class="order-detail-grid">
              <div class="order-detail-field">
                <span class="order-detail-label">Estado de pago</span>
                <span :class="['status-pill', selectedOrderDetail.status]">{{ getPaymentStatusLabel(selectedOrderDetail.status) }}</span>
              </div>
              <div class="order-detail-field">
                <span class="order-detail-label">Fecha de compra</span>
                <span class="order-detail-value">{{ selectedOrderDetail.createdAt ? formatDateTime(new Date(selectedOrderDetail.createdAt)) : formatDateTime(selectedOrderDetail.date) }}</span>
              </div>
              <div v-if="selectedOrderDetail.updatedAt" class="order-detail-field">
                <span class="order-detail-label">Última actualización</span>
                <span class="order-detail-value">{{ formatDateTime(new Date(selectedOrderDetail.updatedAt)) }}</span>
              </div>
              <div class="order-detail-field">
                <span class="order-detail-label">Moneda</span>
                <span class="order-detail-value">{{ selectedOrderDetail.currency || 'COP' }}</span>
              </div>
            </div>
            <div class="order-detail-total">
              <span class="order-detail-total-label">Total del pedido</span>
              <span class="order-detail-total-value">${{ selectedOrderDetail.totalAmount.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts } from '@/composables/useProducts'
import { useBrands } from '@/composables/useBrands'
import type { Product } from '@/types/ProductType'
import type { Category, CreateCategoryRequest } from '@/types/CategoryType'
import type { Brand, CreateBrandRequest } from '@/types/BrandType'
import { paymentService } from '@/services/api/paymentService'
import type { Purchase, ProductPaymentItem } from '@/services/api/paymentService'
import { authService } from '@/services/api/authService'

interface Sale {
  id: string
  productId: string
  productName: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerIdNumber?: string
  shippingAddress?: string
  quantity: number
  unitPrice: number
  totalAmount: number
  status: 'completed' | 'pending' | 'cancelled'
  orderStatus?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  date: Date
  selectedColor?: string
  items?: ProductPaymentItem[]
  currency?: string
  createdAt?: string
  updatedAt?: string
}

const router = useRouter()
const currentSection = ref('dashboard')
const sidebarOpen = ref(false)
const showProductForm = ref(false)
const showCategoryForm = ref(false)
const editingProduct = ref<Product | null>(null)
const editingCategory = ref<Category | null>(null)
const searchProducts = ref('')
const searchCategories = ref('')
const selectedCategoryFilter = ref('')
const searchSales = ref('')
const orderStatusFilter = ref('')
const orderShippingFilter = ref('')
const selectedOrderDetail = ref<Sale | null>(null)
const showOrderDetail = ref(false)
const productStatusFilter = ref('')
const productFeaturedFilter = ref('')
const productPriceFilter = ref('')
const productPage = ref(1)
const productsPerPage = 10

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
  { id: 'products', label: 'Productos', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
  { id: 'categories', label: 'Categorías', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' },
  { id: 'sales', label: 'Pedidos', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' }
]

const dashboardStats = computed(() => [
  {
    label: 'Productos',
    value: products.value.length.toString(),
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
    iconBg: 'linear-gradient(135deg, #FFD84D, #FF8E8E)'
  },
  {
    label: 'Categorías',
    value: categories.value.length.toString(),
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    iconBg: 'linear-gradient(135deg, #FFD84D, #FF8E8E)'
  },
  {
    label: 'Ventas',
    value: `$${totalRevenue.value.toLocaleString()}`,
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    iconBg: 'linear-gradient(135deg, #FFD84D, #FF8E8E)'
  },
  {
    label: 'Pedidos',
    value: totalSalesCount.value.toString(),
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    iconBg: 'linear-gradient(135deg, #FFD84D, #FF8E8E)'
  }
])

const categoryColors = ['#FFD84D', '#FF8E8E', '#8B6914', '#A0522D', '#D2691E', '#DAA520', '#F4A460', '#DEB887']

const productsByCategory = computed(() => {
  const map: Record<string, number> = {}
  categories.value.forEach(c => { map[c.name] = 0 })
  products.value.forEach(p => {
    const catId = p.category || ''
    const catObj = categories.value.find(c => String(c.id) === String(catId))
    const catName = catObj ? catObj.name : (catId || 'Sin categoría')
    map[catName] = (map[catName] || 0) + 1
  })
  const entries = Object.entries(map).sort((a, b) => b[1] - a[1])
  const max = entries.length > 0 ? Math.max(entries[0][1], 1) : 1
  return entries.map(([name, count], i) => ({
    name,
    count,
    percent: Math.round((count / max) * 100),
    color: categoryColors[i % categoryColors.length]
  }))
})

const productsByPrice = computed(() => {
  const ranges = [
    { label: '$0 - $20k', min: 0, max: 20000, color: '#FFD84D' },
    { label: '$20k - $50k', min: 20000, max: 50000, color: '#FF8E8E' },
    { label: '$50k - $100k', min: 50000, max: 100000, color: '#8B6914' },
    { label: '$100k - $200k', min: 100000, max: 200000, color: '#A0522D' },
    { label: '$200k+', min: 200000, max: Infinity, color: '#D2691E' }
  ]
  const counts = ranges.map(r => ({
    ...r,
    count: products.value.filter(p => p.price >= r.min && p.price < r.max).length
  }))
  const max = Math.max(...counts.map(c => c.count), 1)
  return counts.map(c => ({ ...c, percent: Math.round((c.count / max) * 100) }))
})

const productStatusData = computed(() => {
  const total = products.value.length || 1
  const availableCount = products.value.filter(p => p.status === 'available').length
  const unavailableCount = products.value.filter(p => p.status !== 'available').length
  const circumference = 2 * Math.PI * 50
  return {
    availableCount,
    unavailableCount,
    availableArc: Math.round((availableCount / total) * circumference),
    unavailableArc: Math.round((unavailableCount / total) * circumference),
    totalArc: circumference
  }
})

const featuredProducts = computed(() => products.value.filter(p => p.isShowcase).slice(0, 5))
const featuredCount = computed(() => products.value.filter(p => p.isShowcase).length)
const featuredPercent = computed(() => {
  const total = products.value.length || 1
  return Math.round((featuredCount.value / total) * 100)
})

const { products: backendProducts, categories, availableProducts, addProduct, updateProduct, deleteProduct, loadCategories, loadProducts, addCategory, updateCategory, deleteCategory } = useProducts()
const products = backendProducts

const categoryDropdownOpen = ref(false)
const categoryDropdownRef = ref<HTMLElement | null>(null)

const selectedCategoryLabel = computed(() => {
  const selectedId = selectedCategoryFilter.value
  if (!selectedId) return 'Todas'
  const found = categories.value.find(c => c.id === selectedId)
  return found?.name || 'Todas'
})

const toggleCategoryDropdown = () => { categoryDropdownOpen.value = !categoryDropdownOpen.value }
const closeCategoryDropdown = () => { categoryDropdownOpen.value = false }
const selectCategoryFilter = (categoryId: string) => { selectedCategoryFilter.value = categoryId; closeCategoryDropdown() }

const onCategoryDropdownDocumentClick = (event: MouseEvent) => {
  if (!categoryDropdownOpen.value) return
  const target = event.target as Node | null
  const root = categoryDropdownRef.value
  if (!target || !root) { closeCategoryDropdown(); return }
  if (!root.contains(target)) closeCategoryDropdown()
}

onMounted(async () => {
  await loadCategories()
  await loadProducts()
  await loadPurchases()
  await loadBrandsData()
  document.addEventListener('click', onCategoryDropdownDocumentClick)
})

onBeforeUnmount(() => { document.removeEventListener('click', onCategoryDropdownDocumentClick) })

watch(categories, (newCategories) => {
  console.log('Categorías:', newCategories.length)
}, { deep: true })

watch([selectedCategoryFilter, productStatusFilter, searchProducts], () => {
  productPage.value = 1
})

const sales = ref<Sale[]>([])
const isLoadingSales = ref(false)
const salesError = ref('')

const transformPurchaseToSale = (purchase: Purchase): Sale => {
  const firstItem = purchase.items?.[0]
  const itemCount = purchase.items?.length || 0
  const totalQuantity = purchase.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
  let productName = 'Múltiples productos'
  if (itemCount === 1) { productName = firstItem?.productName || 'Producto desconocido' }
  else if (itemCount > 1) { productName = `${itemCount} productos diferentes` }
  return {
    id: purchase.id.toString(),
    productId: '',
    productName,
    customerName: purchase.buyerName,
    customerEmail: purchase.buyerEmail,
    customerPhone: purchase.buyerContactNumber,
    customerIdNumber: purchase.buyerIdentificationNumber,
    shippingAddress: purchase.shippingAddress,
    quantity: totalQuantity,
    unitPrice: firstItem?.unitPrice || 0,
    totalAmount: purchase.amount,
    status: mapPurchaseStatus(purchase.status),
    orderStatus: purchase.orderStatus,
    date: new Date(purchase.createdAt),
    selectedColor: firstItem?.selectedColor,
    items: purchase.items,
    currency: purchase.currency,
    createdAt: purchase.createdAt,
    updatedAt: purchase.updatedAt
  }
}

const mapPurchaseStatus = (status: string): 'completed' | 'pending' | 'cancelled' => {
  if (!status) return 'pending'
  const upperStatus = status.toUpperCase().trim()
  if (upperStatus === 'COMPLETED' || upperStatus === 'APPROVED' || upperStatus === 'PAID' || upperStatus === 'SUCCESS' || upperStatus === 'APPROVED') return 'completed'
  if (upperStatus === 'CANCELLED' || upperStatus === 'REJECTED' || upperStatus === 'DECLINED' || upperStatus === 'VOIDED' || upperStatus === 'FAILED' || upperStatus === 'ERROR') return 'cancelled'
  return 'pending'
}

const loadPurchases = async () => {
  isLoadingSales.value = true
  salesError.value = ''
  try {
    const response = await paymentService.getAllPurchases()
    if (response.success && response.data) {
      sales.value = response.data.purchases.map(transformPurchaseToSale)
    } else {
      salesError.value = 'No se pudieron cargar las compras'
    }
  } catch {
    salesError.value = 'Error al cargar las compras'
  } finally {
    isLoadingSales.value = false
  }
}

const productForm = ref({
  name: '',
  description: '',
  price: 0,
  originalPrice: 0,
  images: [''] as string[],
  category: '',
  status: 'available' as 'available' | 'out-of-stock' | 'coming-soon',
  colors: [] as string[],
  isShowcase: false
})

const getPreviewUrl = (url: string) => url || ''

const materialOptions = ['Bebe', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'Otro']
const categoryForm = ref<CreateCategoryRequest>({ name: '', description: '' })
const categoryImageUrls = ref<string[]>([''])

const { brands, loading: brandsLoading, error: brandsError, loadBrands, createBrand, updateBrand, deleteBrand } = useBrands()
const showBrandForm = ref(false)
const editingBrand = ref<Brand | null>(null)
const searchBrands = ref('')
const brandForm = ref<CreateBrandRequest>({ name: '', description: '' })
const brandImageUrls = ref<string[]>([''])

const availableProductsCount = computed(() => availableProducts.value.length)
const totalValue = computed(() => sales.value.filter(s => s.status === 'completed').reduce((sum, s) => sum + s.totalAmount, 0))
const completedSales = computed(() => sales.value.filter(s => s.status === 'completed'))
const completedSalesCount = computed(() => completedSales.value.length)
const totalRevenue = computed(() => completedSales.value.reduce((sum, s) => sum + s.totalAmount, 0))
const pendingSales = computed(() => sales.value.filter(s => s.status === 'pending').length)
const totalSalesCount = computed(() => sales.value.length)

const filteredOrders = computed(() => {
  let result = sales.value
  if (orderStatusFilter.value) {
    result = result.filter(s => s.status === orderStatusFilter.value)
  }
  if (orderShippingFilter.value) {
    result = result.filter(s => s.orderStatus === orderShippingFilter.value)
  }
  if (searchSales.value.trim()) {
    const q = searchSales.value.toLowerCase().trim()
    result = result.filter(s => s.customerName.toLowerCase().includes(q) || s.customerEmail.toLowerCase().includes(q) || s.productName.toLowerCase().includes(q) || (s.items && s.items.some(i => i.productName.toLowerCase().includes(q))) || (s.customerPhone && s.customerPhone.includes(q)) || (s.customerIdNumber && s.customerIdNumber.includes(q)))
  }
  return result
})

const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const { apiClient } = await import('@/services/api')
    await apiClient.put(`/purchases/${orderId}`, { status: newStatus })
    await loadPurchases()
  } catch (e) {
    console.error('Error updating order status:', e)
  }
}

const updateOrderShippingStatus = async (orderId: string, newOrderStatus: string) => {
  try {
    const { apiClient } = await import('@/services/api')
    await apiClient.put(`/purchases/${orderId}`, { orderStatus: newOrderStatus })
    await loadPurchases()
  } catch (e) {
    console.error('Error updating order shipping status:', e)
  }
}

const openOrderDetail = (order: Sale) => {
  selectedOrderDetail.value = order
  showOrderDetail.value = true
}

const closeOrderDetail = () => {
  showOrderDetail.value = false
  selectedOrderDetail.value = null
}

const getOrderStatusLabel = (status?: string): string => {
  const labels: Record<string, string> = {
    'PENDING': 'Pendiente',
    'PROCESSING': 'Procesando',
    'SHIPPED': 'Enviado',
    'DELIVERED': 'Entregado',
    'CANCELLED': 'Cancelado'
  }
  return labels[status || ''] || status || 'Sin estado'
}

const getOrderStatusClass = (status?: string): string => {
  const classes: Record<string, string> = {
    'PENDING': 'pending',
    'PROCESSING': 'processing',
    'SHIPPED': 'shipped',
    'DELIVERED': 'delivered',
    'CANCELLED': 'cancelled'
  }
  return classes[status || ''] || 'pending'
}

const getPaymentStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    'completed': 'Pagado',
    'pending': 'Pendiente pago',
    'cancelled': 'Cancelado'
  }
  return labels[status] || status
}

const filteredProducts = computed(() => {
  let baseList = selectedCategoryFilter.value ? products.value.filter(p => p.category === selectedCategoryFilter.value) : products.value
  if (productStatusFilter.value) {
    baseList = baseList.filter(p => p.status === productStatusFilter.value)
  }
  if (productFeaturedFilter.value) {
    const isFeatured = productFeaturedFilter.value === 'yes'
    baseList = baseList.filter(p => Boolean(p.isShowcase) === isFeatured)
  }
  if (productPriceFilter.value) {
    baseList = baseList.filter(p => {
      switch (productPriceFilter.value) {
        case 'lt100': return p.price < 100000
        case '100-300': return p.price >= 100000 && p.price <= 300000
        case '300-500': return p.price > 300000 && p.price <= 500000
        case 'gt500': return p.price > 500000
        default: return true
      }
    })
  }
  if (!searchProducts.value.trim()) return baseList
  const q = searchProducts.value.toLowerCase().trim()
  return baseList.filter(p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q))
})

const totalProductPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / productsPerPage)))
const paginatedProducts = computed(() => {
  const start = (productPage.value - 1) * productsPerPage
  return filteredProducts.value.slice(start, start + productsPerPage)
})

const getCategoryName = (categoryId: string): string => {
  const cat = categories.value.find(c => c.id === categoryId)
  return cat?.name || 'Sin categoría'
}

const toggleProductFeatured = async (product: Product) => {
  await updateProduct(product.id, { isShowcase: !product.isShowcase })
  await loadProducts()
}

const filteredCategories = computed(() => {
  let result = categories.value
  if (selectedCategoryFilter.value) {
    result = result.filter(c => c.id === selectedCategoryFilter.value)
  }
  if (searchCategories.value.trim()) {
    const q = searchCategories.value.toLowerCase().trim()
    result = result.filter(c => c.name.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q))
  }
  return result
})

const getColorHex = (colorName: string): string => {
  const colorMap: Record<string, string> = { 'esmeralda': '#10b981', 'plata': '#c0c0c0', 'silver': '#c0c0c0', 'azul': '#1976d2', 'negro': '#000000', 'blanco': '#ffffff', 'oro': '#ffd700', 'gold': '#ffd700', 'rosa': '#ff69b4', 'amarillo': '#ffeb3b', 'verde': '#4caf50', 'púrpura': '#9c27b0' }
  return colorMap[colorName.toLowerCase().trim()] || '#9e9e9e'
}

const setSection = (section: string) => {
  currentSection.value = section
  sidebarOpen.value = false
}

const userName = computed(() => authService.getCurrentUser()?.name || 'Administrador')

const confirmModal = ref({
  open: false,
  title: '',
  message: '',
  onConfirm: () => {},
  onCancel: () => {}
})

function showConfirm(title: string, message: string): Promise<boolean> {
  return new Promise((resolve) => {
    confirmModal.value = {
      open: true,
      title,
      message,
      onConfirm: () => { confirmModal.value.open = false; resolve(true) },
      onCancel: () => { confirmModal.value.open = false; resolve(false) }
    }
  })
}

const handleLogout = async () => {
  if (await showConfirm('Cerrar sesión', '¿Estás seguro de cerrar sesión?')) {
    authService.logout()
    router.push('/')
  }
}

const getStatusText = (status: string) => ({ 'available': 'Disponible', 'out-of-stock': 'Sin Stock', 'coming-soon': 'Próximamente' }[status] || status)
const getSaleStatusText = (status: string) => ({ 'completed': 'Completada', 'pending': 'Pendiente', 'cancelled': 'Cancelada' }[status] || status)
const formatDate = (date: Date) => date.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })
const formatDateTime = (date: Date) => date.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
const getProductsInCategory = (categoryId: string) => products.value.filter(p => String(p.category) === String(categoryId)).length

const editProduct = (product: Product) => {
  editingProduct.value = product
  productForm.value = { name: product.name, description: product.description, price: product.price, originalPrice: product.originalPrice || 0, images: product.images && product.images.length > 0 ? [...product.images] : [''], category: product.category, status: product.status, colors: product.colors ? [...product.colors] : [], isShowcase: product.isShowcase || false }
  mainImageIndex.value = 0
  showProductForm.value = true
}
const editCategory = (category: Category) => {
  editingCategory.value = category
  categoryForm.value = { name: category.name, description: category.description || '', imageUrls: category.imageUrls || [] }
  categoryImageUrls.value = category.imageUrls && category.imageUrls.length > 0 ? [...category.imageUrls] : ['']
  showCategoryForm.value = true
}

const deleteProductConfirm = async (id: string) => {
  if (await showConfirm('Eliminar producto', '¿Estás seguro de eliminar este producto?')) deleteProduct(id)
}

const handleDeleteCategory = async (id: string) => {
  const count = getProductsInCategory(id)
  let msg = '¿Estás seguro de eliminar esta categoría?'
  if (count > 0) msg = `⚠️ Esta categoría tiene ${count} producto(s) asociado(s). ¿Estás seguro de que deseas continuar?`
  if (await showConfirm('Eliminar categoría', msg)) await deleteCategory(id)
}

const isFormValid = computed(() => {
  const hasImage = productForm.value.images.some(i => i.trim().length > 0)
  return productForm.value.name.trim() !== '' && productForm.value.price > 0 && productForm.value.category !== '' && hasImage
})

const updateImageUrl = (index: number, value: string) => { productForm.value.images[index] = value }
const mainImageIndex = ref(0)
const setMainImage = (idx: number) => {
  if (idx === 0) return
  const images = productForm.value.images
  const selected = images.splice(idx, 1)[0]
  images.unshift(selected)
  mainImageIndex.value = 0
}
const addImageUrl = () => { productForm.value.images.push('') }
const removeImageUrl = (index: number) => {
  productForm.value.images.splice(index, 1)
  if (mainImageIndex.value >= productForm.value.images.length) {
    mainImageIndex.value = Math.max(0, productForm.value.images.length - 1)
  }
}
const moveImageUrl = (index: number, direction: -1 | 1) => {
  const images = productForm.value.images
  const newIndex = index + direction
  if (newIndex < 0 || newIndex >= images.length) return
  const temp = images[index]
  images[index] = images[newIndex]
  images[newIndex] = temp
  if (mainImageIndex.value === index) {
    mainImageIndex.value = newIndex
  } else if (mainImageIndex.value === newIndex) {
    mainImageIndex.value = index
  }
}

const normalizeString = (str: string): string => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().replace(/\s+/g, ' ')
const isMaterialSelected = (material: string) => productForm.value.colors.some(c => normalizeString(c) === normalizeString(material))
const toggleProductMaterial = (material: string) => {
  const idx = productForm.value.colors.findIndex(c => normalizeString(c) === normalizeString(material))
  if (idx > -1) productForm.value.colors.splice(idx, 1)
  else productForm.value.colors.push(material)
}

const formatPriceInput = (value: number): string => { if (!value || value === 0) return ''; return value.toLocaleString('es-CO') }
const handlePriceInput = (event: Event, field: 'price' | 'originalPrice') => {
  const raw = (event.target as HTMLInputElement).value.replace(/\./g, '').replace(/[^\d]/g, '')
  productForm.value[field] = raw ? parseInt(raw, 10) : 0
}

const savingProduct = ref(false)

const saveProduct = async () => {
  const payload = { ...productForm.value, images: productForm.value.images.map(i => i.trim()).filter(Boolean) }
  if (editingProduct.value) {
    if (!await showConfirm('Actualizar producto', `¿Actualizar producto "${editingProduct.value.name}"?`)) return
    savingProduct.value = true
    try {
      await updateProduct(editingProduct.value.id, payload)
      closeProductForm()
    } finally {
      savingProduct.value = false
    }
  } else {
    savingProduct.value = true
    try {
      await addProduct(payload)
      closeProductForm()
    } finally {
      savingProduct.value = false
    }
  }
}

const saveCategory = async () => {
  const urls = categoryImageUrls.value.map(i => i.trim()).filter(Boolean)
  const payload: CreateCategoryRequest = { name: categoryForm.value.name, description: categoryForm.value.description, imageUrls: urls.length > 0 ? urls : undefined }
  if (editingCategory.value) {
    if (!await showConfirm('Actualizar categoría', `¿Actualizar categoría "${editingCategory.value.name}"?`)) return
    await updateCategory(editingCategory.value.id, payload)
  } else { await addCategory(payload) }
  closeCategoryForm()
}

const closeProductForm = () => {
  showProductForm.value = false
  editingProduct.value = null
  productForm.value = { name: '', description: '', price: 0, originalPrice: 0, images: [''], category: '', status: 'available', colors: [], isShowcase: false }
}

const closeCategoryForm = () => {
  showCategoryForm.value = false
  editingCategory.value = null
  categoryForm.value = { name: '', description: '' }
  categoryImageUrls.value = ['']
}

const addCategoryImageUrl = () => { categoryImageUrls.value.push('') }
const updateCategoryImageUrl = (index: number, value: string) => { categoryImageUrls.value[index] = value }
const removeCategoryImageUrl = (index: number) => { categoryImageUrls.value.splice(index, 1); if (categoryImageUrls.value.length === 0) categoryImageUrls.value = [''] }

const loadBrandsData = async () => {
  await loadBrands()
}

const filteredBrands = computed(() => {
  if (!searchBrands.value.trim()) return brands.value
  const q = searchBrands.value.toLowerCase().trim()
  return brands.value.filter(b => b.name.toLowerCase().includes(q) || b.description?.toLowerCase().includes(q))
})

const editBrand = (brand: Brand) => {
  editingBrand.value = brand
  brandForm.value = { name: brand.name, description: brand.description || '', imageUrls: brand.imageUrls || [] }
  brandImageUrls.value = brand.imageUrls && brand.imageUrls.length > 0 ? [...brand.imageUrls] : ['']
  showBrandForm.value = true
}

const handleDeleteBrand = async (id: string) => {
  const msg = '¿Estás seguro de eliminar esta marca?'
  if (await showConfirm('Eliminar marca', msg)) await deleteBrand(Number(id))
}

const saveBrand = async () => {
  const urls = brandImageUrls.value.map(i => i.trim()).filter(Boolean)
  const payload: CreateBrandRequest = { name: brandForm.value.name, description: brandForm.value.description, imageUrls: urls.length > 0 ? urls : undefined }
  if (editingBrand.value) {
    if (!await showConfirm('Actualizar marca', `¿Actualizar marca "${editingBrand.value.name}"?`)) return
    await updateBrand(Number(editingBrand.value.id), payload)
  } else { await createBrand(payload) }
  closeBrandForm()
}

const closeBrandForm = () => {
  showBrandForm.value = false
  editingBrand.value = null
  brandForm.value = { name: '', description: '' }
  brandImageUrls.value = ['']
}

const addBrandImageUrl = () => { brandImageUrls.value.push('') }
const updateBrandImageUrl = (index: number, value: string) => { brandImageUrls.value[index] = value }
const removeBrandImageUrl = (index: number) => { brandImageUrls.value.splice(index, 1); if (brandImageUrls.value.length === 0) brandImageUrls.value = [''] }

// Cotizaciones WhatsApp
const whatsappQuotes = ref([
  { id: 1, name: 'Laura Martínez', company: 'Mamá de Sofía', city: 'Bogotá', phone: '3206770595', productCount: 3, status: 'pending', products: 'Camiseta infantil, Pantalón jeans, Chaqueta' },
  { id: 2, name: 'Andrés Ramírez', company: 'Papá de Mateo', city: 'Medellín', phone: '3101234567', productCount: 2, status: 'responded', products: 'Vestido floral, Falda plisada' },
  { id: 3, name: 'Valentina López', company: 'Mamá de Lucas', city: 'Cali', phone: '3159876543', productCount: 5, status: 'pending', products: 'Body bebé, Enterizo, Gorro, Medias, Zapatos' },
])

const openWhatsApp = (quote: { phone: string; name: string }) => {
  const message = encodeURIComponent(`Hola ${quote.name}, gracias por tu solicitud de cotización. ¿En qué podemos ayudarte?`)
  window.open(`https://wa.me/57${quote.phone}?text=${message}`, '_blank')
}
</script>

<style scoped>
/* ===== RESET & VARIABLES ===== */
.admin-layout, .admin-layout *, .admin-layout *::before, .admin-layout *::after { box-sizing: border-box; margin: 0; padding: 0; }

.admin-layout {
  --c-primary: #FFD84D;
  --c-primary-hover: #8B6914;
  --c-accent: #FF8E8E;
  --c-black: #3D2B1F;
  --c-dark: #5C3D1A;
  --c-sidebar: #FFF8E8;
  --c-white: #FFFFFF;
  --c-light: #F5F5F5;
  --c-gray: #6B7280;
  --c-gray-light: #9CA3AF;
  --c-border: #E5E7EB;
  --c-success: #10B981;
  --c-danger: #EF4444;
  --c-warning: #F59E0B;
  --c-info: #3B82F6;
  --sidebar-w: 240px;
  --topbar-h: 64px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  min-height: 100vh;
  background: var(--c-light);
  color: var(--c-black);
  overflow-x: hidden;
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: var(--sidebar-w);
  background: var(--c-sidebar);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
}

.sidebar-header {
  padding: 24px 20px 16px;
  border-bottom: 1px solid rgba(139,105,20,0.1);
}

.sidebar-logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 52px;
  width: auto;
  object-fit: contain;
}

.logo-pollito {
  height: 40px;
  width: 40px;
  object-fit: contain;
  margin-right: 6px;
}

.sidebar-subtitle {
  font-size: 0.7rem;
  color: #8B6914;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: none;
  color: #5C3D1A;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.nav-item:hover {
  background: rgba(255,216,77,0.15);
  color: #3D2B1F;
}

.nav-item.active {
  background: var(--c-primary);
  color: #3D2B1F;
  font-weight: 600;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  flex-shrink: 0;
}

.nav-item.active .nav-icon { color: #3D2B1F; }

.nav-badge {
  margin-left: auto;
  background: var(--c-danger);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

.sidebar-footer {
  padding: 16px 10px 20px;
  border-top: 1px solid rgba(139,105,20,0.1);
}

.logout { color: #8B6914; }
.logout:hover { background: rgba(239,68,68,0.12); color: #EF4444; }

.copyright {
  font-size: 0.65rem;
  color: #8B6914;
  text-align: center;
  line-height: 1.5;
  margin-top: 12px;
  padding: 0 10px;
}

.sidebar-overlay { display: none; }

/* ===== MAIN AREA ===== */
.main-area {
  flex: 1;
  margin-left: var(--sidebar-w);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ===== TOPBAR ===== */
.topbar {
  height: var(--topbar-h);
  background: var(--c-white);
  border-bottom: 1px solid var(--c-border);
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--c-gray);
  padding: 6px;
  border-radius: 8px;
}
.menu-toggle:hover { background: var(--c-light); }

.home-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid var(--c-border);
  background: var(--c-white);
  color: var(--c-gray);
  text-decoration: none;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.home-btn:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
  background: rgba(244, 180, 0, 0.04);
}

.topbar-search {
  flex: 1;
  max-width: 560px;
  position: relative;
  display: flex;
  align-items: center;
}

.topbar-search .search-icon {
  position: absolute;
  left: 14px;
  color: var(--c-gray-light);
  pointer-events: none;
}

.topbar-search .search-input {
  width: 100%;
  padding: 10px 80px 10px 42px;
  border: 1px solid var(--c-border);
  border-radius: 10px;
  background: var(--c-light);
  font-size: 0.88rem;
  color: var(--c-black);
  outline: none;
  transition: all 0.2s ease;
}
.topbar-search .search-input:focus { border-color: var(--c-primary); background: var(--c-white); box-shadow: 0 0 0 3px rgba(255,216,77,0.1); }
.topbar-search .search-input::placeholder { color: var(--c-gray-light); }

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.action-btn {
  position: relative;
  background: none;
  border: none;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  color: var(--c-gray);
  transition: all 0.2s ease;
}
.action-btn:hover { background: var(--c-light); color: var(--c-black); }

.action-btn .badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: var(--c-primary);
  color: var(--c-black);
  font-size: 0.6rem;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topbar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 6px;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 8px;
}
.topbar-user:hover { background: var(--c-light); }

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--c-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-black);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name { font-size: 0.82rem; font-weight: 600; color: var(--c-black); }
.user-role { font-size: 0.68rem; color: var(--c-gray); }

.topbar-divider {
  width: 1px;
  height: 28px;
  background: var(--c-border);
  margin: 0 4px;
}

.logout-btn {
  background: none;
  border: 1px solid var(--c-border);
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  color: var(--c-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.logout-btn:hover {
  background: rgba(239, 68, 68, 0.08);
  border-color: var(--c-danger);
  color: var(--c-danger);
}

/* ===== MAIN CONTENT ===== */
.main-content {
  flex: 1;
  padding: 28px;
  overflow-y: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--c-black);
  margin-bottom: 4px;
}

.page-subtitle {
  font-size: 0.9rem;
  color: var(--c-gray);
}

.date-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  font-size: 0.82rem;
  color: var(--c-gray);
  cursor: pointer;
}
.date-filter:hover { border-color: var(--c-primary); }

/* ===== STATS ROW ===== */
.stats-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 14px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;
}
.stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); transform: translateY(-1px); }

.stat-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--c-gray);
  font-weight: 500;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--c-black);
  line-height: 1.1;
}

.stat-change {
  font-size: 0.72rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
}

.stat-change.up { color: var(--c-success); }
.stat-change.down { color: var(--c-danger); }

/* ===== CARDS ===== */
.card {
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 14px;
  overflow: hidden;
  padding-right: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid var(--c-border);
}

.card-header h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--c-black);
}

.link-btn {
  background: none;
  border: none;
  color: var(--c-primary);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}
.link-btn:hover { color: var(--c-primary-hover); }

.chart-filter {
  padding: 6px 12px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  font-size: 0.8rem;
  background: var(--c-white);
  color: var(--c-black);
  cursor: pointer;
}

/* ===== CHART ===== */
.chart-card { grid-column: span 1; }

.chart-placeholder {
  padding: 20px;
  display: flex;
  gap: 12px;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.7rem;
  color: var(--c-gray);
  padding: 0 0 24px;
  min-width: 40px;
}

.chart-area { flex: 1; }

.chart-svg { width: 100%; height: 180px; }

.chart-x-axis {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: var(--c-gray);
  padding-top: 8px;
}

.chart-legend {
  display: flex;
  gap: 20px;
  padding: 12px 20px 16px;
  border-top: 1px solid var(--c-border);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: var(--c-gray);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* ===== DASHBOARD GRIDS ===== */
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.dashboard-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.dashboard-charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

/* ===== STATS ROW 4 ===== */
.stats-row-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* ===== BAR CHART ===== */
.bar-chart { padding: 8px 0; }

.bar-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.bar-label {
  min-width: 110px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--c-black);
  text-align: right;
}

.bar-track {
  flex: 1;
  height: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 0.6s ease;
}

.bar-value {
  min-width: 24px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--c-black);
  text-align: right;
}

/* ===== DONUT CHART ===== */
.donut-chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
}

.donut-svg {
  width: 140px;
  height: 140px;
}

.donut-total {
  font-size: 16px;
  font-weight: 800;
  fill: var(--c-black);
}

.donut-subtitle {
  font-size: 9px;
  fill: var(--c-gray);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.donut-legend {
  display: flex;
  gap: 16px;
  font-size: 0.78rem;
  color: var(--c-black);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

/* ===== FEATURED PRODUCTS ===== */
.featured-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 0;
}

.featured-big-number {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.featured-count {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--c-primary);
}

.featured-label {
  font-size: 0.78rem;
  color: var(--c-gray);
}

.featured-bar-track {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.featured-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFD84D, #FF8E8E);
  border-radius: 4px;
  transition: width 0.6s ease;
}

.featured-percent {
  font-size: 0.75rem;
  color: var(--c-gray);
}

.featured-list {
  display: flex;
  flex-direction: column;
}

.featured-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-top: 1px solid var(--c-border);
}

.featured-item:first-child { border-top: none; }

.featured-item-img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--c-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-item-emoji {
  font-size: 1.2rem;
}

.featured-item-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.featured-item-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--c-black);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.featured-item-price {
  font-size: 0.72rem;
  color: var(--c-primary);
  font-weight: 600;
}

/* ===== ORDERS LIST ===== */
.orders-list { padding: 0; }

.order-item {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid var(--c-border);
  gap: 12px;
}
.order-item:last-child { border-bottom: none; }

.order-info {
  display: flex;
  flex-direction: column;
  min-width: 90px;
}

.order-id { font-size: 0.85rem; font-weight: 600; color: var(--c-black); }
.order-date { font-size: 0.7rem; color: var(--c-gray); }

.order-status {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}

.order-status.pending { background: #FEF3C7; color: #92400E; }
.order-status.completed { background: #D1FAE5; color: #065F46; }
.order-status.cancelled { background: #FEE2E2; color: #991B1B; }

.order-amount {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--c-black);
  margin-left: auto;
  white-space: nowrap;
}

.order-view {
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: var(--c-gray);
  border-radius: 6px;
}
.order-view:hover { background: var(--c-light); color: var(--c-black); }

.card-footer-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 14px;
  background: none;
  border: none;
  border-top: 1px solid var(--c-border);
  color: var(--c-primary);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}
.card-footer-btn:hover { background: rgba(255,216,77,0.04); }

/* ===== TOP PRODUCTS ===== */
.products-top-list { padding: 0; }

.top-product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--c-border);
}
.top-product-item:last-child { border-bottom: none; }

.top-product-img {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--c-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.top-product-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.top-product-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--c-black);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.top-product-sales {
  font-size: 0.72rem;
  color: var(--c-gray);
}

.top-product-price {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--c-black);
  white-space: nowrap;
}

/* ===== INVENTORY ALERTS ===== */
.alerts-list { padding: 0; }

.alert-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--c-border);
}
.alert-item:last-child { border-bottom: none; }

.alert-img {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--c-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.alert-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.alert-name { font-size: 0.82rem; font-weight: 600; color: var(--c-black); }
.alert-stock { font-size: 0.72rem; color: var(--c-gray); }

.alert-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  background: #FEE2E2;
  color: #991B1B;
  white-space: nowrap;
}

/* ===== QUOTATIONS ===== */
.quotations-list { padding: 0; }

.quotation-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--c-border);
}
.quotation-item:last-child { border-bottom: none; }

.quotation-info {
  display: flex;
  flex-direction: column;
  min-width: 80px;
}

.quotation-id { font-size: 0.82rem; font-weight: 600; color: var(--c-black); }
.quotation-date { font-size: 0.7rem; color: var(--c-gray); }

.quotation-status {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}

.quotation-status.pending { background: #FEF3C7; color: #92400E; }
.quotation-status.completed { background: #D1FAE5; color: #065F46; }
.quotation-status.cancelled { background: #FEE2E2; color: #991B1B; }

.quotation-amount {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--c-black);
  margin-left: auto;
  white-space: nowrap;
}

/* ===== SECTION TOP ===== */
.section-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.section-top h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--c-black);
}

/* ===== SEARCH BAR ===== */
.search-bar {
  margin-bottom: 20px;
}

.search-input-wrapper {
  position: relative;
  max-width: 480px;
}

.search-input-wrapper .search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--c-gray-light);
  pointer-events: none;
}

.search-field {
  width: 100%;
  padding: 10px 40px 10px 42px;
  border: 1px solid var(--c-border);
  border-radius: 10px;
  background: var(--c-white);
  font-size: 0.88rem;
  color: var(--c-black);
  outline: none;
  transition: all 0.2s ease;
}
.search-field:focus { border-color: var(--c-primary); box-shadow: 0 0 0 3px rgba(255,216,77,0.1); }
.search-field::placeholder { color: var(--c-gray-light); }

.search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--c-light);
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  color: var(--c-gray);
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-clear:hover { background: var(--c-danger); color: white; }

/* ===== PRODUCTS TABLE ===== */
.prod-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.prod-toolbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.prod-toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.prod-bulk-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.prod-bulk-select {
  padding: 8px 12px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  background: var(--c-white);
  font-size: 0.82rem;
  color: var(--c-black);
  cursor: pointer;
}

.prod-filter-select {
  padding: 8px 12px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  background: var(--c-white);
  font-size: 0.82rem;
  color: var(--c-black);
  cursor: pointer;
  min-width: 150px;
}
.prod-filter-select:focus { border-color: var(--c-primary); outline: none; }

.search-sm { max-width: 220px; }

.products-table .col-product { min-width: 250px; }
.products-table .col-category { min-width: 140px; }
.products-table .col-price { min-width: 100px; }
.products-table .col-status { min-width: 100px; }
.products-table .col-featured { min-width: 70px; text-align: center; }

.prod-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.prod-thumb {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--c-light);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prod-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prod-thumb-placeholder { font-size: 1.2rem; }

.prod-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.prod-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--c-black);
}

.prod-desc {
  font-size: 0.76rem;
  color: var(--c-gray);
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.prod-category-badge {
  display: inline-block;
  padding: 4px 10px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}

.prod-price {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--c-black);
}

.prod-status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
}

.prod-status-badge.available {
  background: #D1FAE5;
  color: #065F46;
}

.prod-status-badge.out-of-stock {
  background: #FEE2E2;
  color: #991B1B;
}

.prod-status-badge.coming-soon {
  background: #FEF3C7;
  color: #92400E;
}

.prod-star-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.15s;
}

.prod-star-btn:hover {
  background: #FEF3C7;
}

.prod-star-btn.active {
  transform: scale(1.1);
}

/* ===== BREADCRUMB ===== */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 0.82rem;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--c-primary);
  text-decoration: none;
  font-weight: 500;
}
.breadcrumb-link:hover { color: var(--c-primary-hover); }

.breadcrumb-sep { color: var(--c-gray-light); }
.breadcrumb-current { color: var(--c-gray); }

/* ===== CATEGORIES TABLE ===== */
.cat-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.cat-stats-row-5 {
  grid-template-columns: repeat(5, 1fr);
}

.cat-stat-card {
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.cat-stats-cards {
  grid-template-columns: repeat(5, 1fr);
}

.cat-stat-card-full {
  grid-column: 1 / -1;
}

.cat-stat-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cat-stat-icon.yellow { background: rgba(255,216,77,0.12); color: var(--c-primary); }
.cat-stat-icon.green { background: rgba(16,185,129,0.12); color: var(--c-success); }
.cat-stat-icon.red { background: rgba(239,68,68,0.12); color: var(--c-danger); }
.cat-stat-icon.blue { background: rgba(59,130,246,0.12); color: var(--c-info); }
.cat-stat-icon.orange { background: rgba(249,115,22,0.12); color: #f97316; }

.cat-stat-info {
  display: flex;
  flex-direction: column;
}

.cat-stat-value {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--c-black);
  line-height: 1.1;
}

.cat-stat-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--c-black);
}

.cat-stat-sub {
  font-size: 0.65rem;
  color: var(--c-gray);
}

/* Toolbar */
.cat-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 16px;
  gap: 12px;
  flex-wrap: wrap;
}

.cat-toolbar-left,
.cat-toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cat-bulk-select,
.cat-filter-select {
  padding: 8px 12px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  font-size: 0.82rem;
  background: var(--c-white);
  color: var(--c-black);
  cursor: pointer;
}

.cat-search {
  position: relative;
}

.cat-search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--c-gray-light);
  pointer-events: none;
}

.cat-search-input {
  padding: 8px 12px 8px 32px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  font-size: 0.82rem;
  width: 200px;
  outline: none;
  background: var(--c-white);
  color: var(--c-black);
}
.cat-search-input:focus { border-color: var(--c-primary); }

/* Table */
.cat-table-container {
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  overflow: hidden;
}

.cat-table {
  width: 100%;
  border-collapse: collapse;
}

.cat-table th {
  text-align: left;
  padding: 14px 16px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--c-gray);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  border-bottom: 1px solid var(--c-border);
  background: var(--c-light);
  white-space: nowrap;
}

.cat-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--c-border);
  font-size: 0.85rem;
  color: var(--c-black);
  vertical-align: middle;
}

.cat-table tbody tr:hover { background: rgba(255,216,77,0.02); }
.cat-table tbody tr:last-child td { border-bottom: none; }

.col-check { width: 40px; text-align: center; }
.col-check input { width: 16px; height: 16px; accent-color: var(--c-primary); cursor: pointer; }

.col-img { width: 60px; }

.cat-thumb {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--c-border);
  background: var(--c-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cat-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cat-thumb-placeholder {
  font-size: 1.2rem;
}

.cat-name-text {
  font-weight: 600;
  color: var(--c-black);
}

.cat-desc-text {
  font-size: 0.82rem;
  color: var(--c-gray);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 280px;
}

.cat-status-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
}

.cat-status-badge.active {
  background: #D1FAE5;
  color: #065F46;
}

.cat-status-badge.inactive {
  background: #FEE2E2;
  color: #991B1B;
}

.cat-actions {
  display: flex;
  gap: 6px;
}

.cat-action-btn {
  background: none;
  border: 1px solid var(--c-border);
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--c-gray);
  display: flex;
  align-items: center;
  transition: all 0.2s;
}
.cat-action-btn:hover { border-color: var(--c-primary); color: var(--c-primary); }
.cat-action-btn.danger:hover { border-color: var(--c-danger); color: var(--c-danger); }

/* Pagination */
.cat-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.cat-pagination-info {
  font-size: 0.82rem;
  color: var(--c-gray);
}

.cat-pagination-btns {
  display: flex;
  gap: 4px;
}

.cat-page-btn {
  width: 32px;
  height: 32px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  background: var(--c-white);
  color: var(--c-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 500;
}
.cat-page-btn:hover:not(:disabled) { border-color: var(--c-primary); color: var(--c-primary); }
.cat-page-btn.active {
  background: var(--c-primary);
  color: var(--c-black);
  border-color: var(--c-primary);
}
.cat-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.page-btn {
  min-width: 32px;
  height: 32px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  background: var(--c-white);
  color: var(--c-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 500;
  padding: 0 8px;
}
.page-btn:hover:not(:disabled):not(.active) { border-color: var(--c-primary); color: var(--c-primary); }
.page-btn.active {
  background: var(--c-primary);
  color: var(--c-black);
  border-color: var(--c-primary);
}
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ===== SALES ===== */
.sales-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.mini-stat {
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mini-stat-label { font-size: 0.78rem; color: var(--c-gray); }
.mini-stat-value { font-size: 1.3rem; font-weight: 800; color: var(--c-black); }

.table-container {
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.data-table th {
  text-align: left;
  padding: 14px 18px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--c-gray);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  border-bottom: 1px solid var(--c-border);
  background: var(--c-light);
}

.data-table td {
  padding: 14px 18px;
  border-bottom: 1px solid var(--c-border);
}

.data-table tbody tr:hover { background: rgba(255,216,77,0.02); }
.data-table tbody tr:last-child td { border-bottom: none; }

.cell-stack { display: flex; flex-direction: column; gap: 2px; }
.cell-primary { font-weight: 500; color: var(--c-black); font-size: 0.85rem; }
.cell-secondary { font-size: 0.75rem; color: var(--c-gray); }

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}

.qty-badge {
  background: var(--c-primary);
  color: var(--c-black);
  padding: 3px 10px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8rem;
}

.amount { font-weight: 700; color: var(--c-success); font-size: 0.85rem; }

.status-pill {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
}

.status-pill.completed { background: #D1FAE5; color: #065F46; }
.status-pill.pending { background: #FEF3C7; color: #92400E; }
.status-pill.cancelled { background: #FEE2E2; color: #991B1B; }

.products-badge {
  background: var(--c-primary);
  color: var(--c-black);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  display: inline-block;
}

.products-details { margin-top: 4px; }
.products-toggle {
  cursor: pointer;
  color: var(--c-primary);
  font-size: 0.72rem;
  font-weight: 500;
}
.products-list {
  list-style: none;
  padding: 6px 0 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.products-list li {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  padding: 4px 8px;
  background: var(--c-light);
  border-radius: 6px;
}
.item-qty { font-weight: 600; }

/* ===== BUTTONS ===== */
.btn {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--c-primary);
  color: var(--c-black);
}
.btn-primary:hover { background: var(--c-primary-hover); transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-secondary {
  background: var(--c-light);
  color: var(--c-gray);
  border: 1px solid var(--c-border);
}
.btn-secondary:hover { border-color: var(--c-primary); color: var(--c-primary); }

.btn-outline {
  background: transparent;
  color: var(--c-gray);
  border: 1px solid var(--c-border);
}
.btn-outline:hover { border-color: var(--c-primary); color: var(--c-primary); }

.btn-outline-danger {
  background: transparent;
  color: var(--c-gray);
  border: 1px solid var(--c-border);
}
.btn-outline-danger:hover { border-color: var(--c-danger); color: var(--c-danger); background: rgba(239,68,68,0.04); }

.btn-sm { padding: 7px 12px; font-size: 0.78rem; border-radius: 8px; }

/* ===== FORMS ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: var(--c-white);
  border-radius: 18px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.modal-header {
  padding: 24px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 { font-size: 1.2rem; font-weight: 700; color: var(--c-black); }

.modal-close {
  background: var(--c-light);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--c-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
.modal-close:hover { background: var(--c-danger); color: white; }

.modal-body { padding: 24px; }

.confirm-modal {
  max-width: 400px;
  text-align: center;
  padding: 32px;
}
.confirm-icon { margin-bottom: 16px; }
.confirm-title { font-size: 1.15rem; font-weight: 700; color: var(--c-black); margin-bottom: 8px; }
.confirm-message { font-size: 0.9rem; color: #666; margin-bottom: 24px; line-height: 1.5; }
.confirm-actions { display: flex; gap: 12px; justify-content: center; }
.confirm-actions .btn { min-width: 120px; }

.form-group { margin-bottom: 18px; }
.form-group label { display: block; font-weight: 600; font-size: 0.85rem; color: var(--c-black); margin-bottom: 6px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--c-border);
  border-radius: 10px;
  font-size: 0.9rem;
  background: var(--c-white);
  color: var(--c-black);
  outline: none;
  transition: border-color 0.2s;
}
.form-input:focus { border-color: var(--c-primary); box-shadow: 0 0 0 3px rgba(255,216,77,0.1); }
.form-input::placeholder { color: var(--c-gray-light); }

.price-input { position: relative; display: flex; align-items: center; }
.currency { position: absolute; left: 14px; font-weight: 600; color: var(--c-gray); font-size: 0.9rem; z-index: 1; }
.price-input .form-input { padding-left: 32px; }

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
}
.checkbox-label input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--c-primary); }

.form-help { font-size: 0.78rem; color: var(--c-gray); margin-top: 4px; }

.materials-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }

.material-chip {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--c-border);
  background: var(--c-white);
  font-weight: 600;
  font-size: 0.82rem;
  cursor: pointer;
  color: var(--c-black);
  transition: all 0.2s;
}
.material-chip:hover { border-color: var(--c-primary); }
.material-chip.selected { background: rgba(255,216,77,0.1); border-color: var(--c-primary); color: var(--c-primary); }

.selected-materials {
  padding: 8px 12px;
  background: var(--c-light);
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.selected-label { font-weight: 600; color: var(--c-primary); font-size: 0.82rem; }
.selected-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: rgba(255,216,77,0.15);
  border: 1px solid rgba(255,216,77,0.4);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--c-primary);
  font-weight: 500;
}
.selected-tag-remove {
  background: none;
  border: none;
  color: var(--c-primary);
  cursor: pointer;
  font-size: 0.7rem;
  padding: 0 2px;
  line-height: 1;
  opacity: 0.6;
  transition: opacity 0.15s;
}
.selected-tag-remove:hover { opacity: 1; }

.image-urls { display: flex; flex-direction: column; gap: 8px; }
.image-url-row { display: grid; grid-template-columns: 1fr auto auto; gap: 6px; align-items: center; }

.image-preview-arrows {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2px;
  background: rgba(0,0,0,0.5);
  border-radius: 6px;
  padding: 2px;
}

.preview-arrow-btn {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.preview-arrow-btn:hover { background: rgba(255,255,255,0.25); }

.image-remove-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  transition: all 0.2s;
}
.image-remove-btn:hover { background: #fef2f2; border-color: #ef4444; }

.image-main-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}
.image-main-btn svg { pointer-events: none; width: 16px; height: 16px; }
.image-main-btn:hover { border-color: #FFD84D; background: #fffbeb; }
.image-main-btn.active { border-color: #FFD84D; background: #FFD84D; }

.image-add-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  background: transparent;
  color: #6b7280;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;
}
.image-add-btn:hover { border-color: #9ca3af; color: #374151; }

.images-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.image-preview-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--c-border);
  background: var(--c-light);
}

.image-preview-item.is-main {
  border: 2px solid #FFD84D;
}

.image-preview-item img { width: 100%; height: 80px; object-fit: cover; display: block; }

.img-action-btn {
  position: absolute;
  bottom: 4px;
  left: 4px;
  background: rgba(0,0,0,0.6);
  color: white;
  border: none;
  padding: 2px 6px;
  font-size: 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}
.img-action-btn.primary { background: var(--c-primary); color: var(--c-black); }
.img-action-btn:disabled { opacity: 0.4; cursor: default; }

.image-index {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0,0,0,0.5);
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
}

.discount-info {
  background: rgba(16,185,129,0.06);
  border: 1px solid rgba(16,185,129,0.15);
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 16px;
}

.discount-badge {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--c-success);
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid var(--c-border);
}

/* ===== EMPTY / LOADING / ERROR ===== */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}
.empty-icon { font-size: 3.5rem; margin-bottom: 16px; opacity: 0.4; }
.empty-state h3 { font-size: 1.2rem; font-weight: 600; color: var(--c-black); margin-bottom: 8px; }
.empty-state p { font-size: 0.9rem; color: var(--c-gray); margin-bottom: 20px; }

.loading-state, .error-state { text-align: center; padding: 60px 20px; }
.loading-state p, .error-state p { margin-top: 16px; color: var(--c-gray); }

.spinner {
  border: 3px solid var(--c-border);
  border-left-color: var(--c-primary);
  border-radius: 50%;
  width: 40px;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

.spinner-sm {
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
}

.btn-loading-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ===== ORDERS / PEDIDOS ===== */
.orders-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}

.orders-search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 10px 14px;
}

.orders-search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.88rem;
  font-family: var(--font-body);
  color: var(--c-black);
  background: transparent;
}

.orders-filter-select {
  padding: 10px 14px;
  border: 1px solid var(--c-border);
  border-radius: 10px;
  font-size: 0.88rem;
  font-family: var(--font-body);
  color: var(--c-black);
  background: var(--c-white);
  cursor: pointer;
  min-width: 180px;
}

.orders-table-container {
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 14px;
  overflow: hidden;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table thead {
  background: var(--c-light);
}

.orders-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--c-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.orders-table td {
  padding: 14px 16px;
  border-top: 1px solid var(--c-border);
  font-size: 0.88rem;
}

.orders-table tbody tr:hover {
  background: var(--c-light);
}

.order-id-cell {
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--c-dark);
  font-size: 0.82rem;
}

.status-select {
  padding: 6px 10px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  font-size: 0.82rem;
  font-family: var(--font-body);
  cursor: pointer;
  background: var(--c-white);
}

.status-select.completed { border-color: #10b981; color: #10b981; }
.status-select.pending { border-color: #f59e0b; color: #f59e0b; }
.status-select.cancelled { border-color: #ef4444; color: #ef4444; }
.status-select.processing { border-color: #3b82f6; color: #3b82f6; }
.status-select.shipped { border-color: #8b5cf6; color: #8b5cf6; }
.status-select.delivered { border-color: #10b981; color: #10b981; }

/* ===== ORDER DETAIL MODAL ===== */
.order-detail-modal {
  max-width: 680px;
}

.order-detail-section {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--c-border);
}

.order-detail-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.order-detail-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--c-black);
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--c-border);
}

.order-detail-section-title svg {
  color: var(--c-primary);
}

.order-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.order-detail-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.order-detail-field-full {
  grid-column: 1 / -1;
}

.order-detail-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--c-gray);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.order-detail-value {
  font-size: 0.88rem;
  color: var(--c-black);
  font-weight: 500;
}

.order-detail-products {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-detail-product {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--c-light);
  border-radius: 10px;
}

.order-detail-product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.order-detail-product-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--c-black);
}

.order-detail-product-color {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  color: var(--c-gray);
}

.order-detail-product-qty {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--c-gray);
  min-width: 32px;
  text-align: center;
}

.order-detail-product-price {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--c-success);
  min-width: 80px;
  text-align: right;
}

.order-detail-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 14px 16px;
  background: rgba(255,216,77,0.08);
  border: 1px solid rgba(255,216,77,0.2);
  border-radius: 10px;
}

.order-detail-total-label {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--c-black);
}

.order-detail-total-value {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--c-success);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) {
  .stats-row { grid-template-columns: repeat(3, 1fr); }
  .dashboard-grid-3 { grid-template-columns: 1fr; }
}

@media (max-width: 1024px) {
  .dashboard-grid { grid-template-columns: 1fr; }
  .chart-card { grid-column: span 1; }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar-open .sidebar {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 99;
  }

  .sidebar-open .sidebar-overlay { display: block; }

  .main-area { margin-left: 0; overflow-x: hidden; }

  .menu-toggle { display: flex; }

  .topbar-search { display: none; }

  .topbar-user .user-info { display: none; }

  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .stats-row-4 { grid-template-columns: repeat(2, 1fr); }
  .dashboard-grid-3 { grid-template-columns: 1fr; }
  .dashboard-charts-grid { grid-template-columns: repeat(2, 1fr); }

  .main-content { padding: 16px; }

  .content-header { flex-direction: column; }

  .form-row { grid-template-columns: 1fr; }

  .sales-stats-row { grid-template-columns: 1fr; }

  .products-grid { grid-template-columns: 1fr; }

  .cat-stats-row { grid-template-columns: repeat(2, 1fr); }
  .cat-stats-row-5 { grid-template-columns: repeat(3, 1fr); }
  .cat-toolbar { flex-direction: column; align-items: stretch; }
  .cat-toolbar-left,
  .cat-toolbar-right { flex-wrap: wrap; }
  .cat-search-input { width: 100%; }
  .cat-table-container { overflow-x: auto; }
  .cat-pagination { flex-direction: column; gap: 12px; align-items: center; }
}

@media (max-width: 480px) {
  .stats-row { grid-template-columns: 1fr; }
  .stats-row-4 { grid-template-columns: 1fr; }
  .stat-card { padding: 14px; }
  .stat-value { font-size: 1.1rem; }
}

/* ===== MOBILE DASHBOARD FIXES ===== */
@media (max-width: 640px) {
  .main-content { padding: 12px; overflow-x: hidden; }

  .page-title { font-size: 1.1rem; }
  .page-subtitle { font-size: 0.78rem; }

  .content-header { flex-direction: column; gap: 12px; }

  .section-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .section-top .btn { width: 100%; justify-content: center; }

  .stats-row,
  .stats-row-4,
  .cat-stats-row,
  .cat-stats-row-5,
  .cat-stats-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    width: 100%;
    overflow: hidden;
  }

  .stat-card,
  .cat-stat-card {
    padding: 10px;
    gap: 8px;
  }

  .stat-icon,
  .cat-stat-icon {
    width: 34px;
    height: 34px;
  }

  .stat-icon svg,
  .cat-stat-icon svg {
    width: 18px;
    height: 18px;
  }

  .stat-label { font-size: 0.68rem; }
  .stat-value { font-size: 1rem; }

  .cat-stat-value { font-size: 1rem; }
  .cat-stat-label { font-size: 0.68rem; }
  .cat-stat-sub { font-size: 0.6rem; }

  .dashboard-charts-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .prod-toolbar {
    flex-direction: column;
    gap: 10px;
  }

  .prod-toolbar-left {
    width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
    max-width: 100%;
  }

  .prod-filter-select {
    min-width: auto;
    white-space: nowrap;
    padding: 7px 10px;
    font-size: 0.78rem;
  }

  .search-sm { max-width: 100%; width: 100%; }

  .prod-toolbar-right { width: 100%; }

  /* ===== PRODUCTS TABLE -> CARDS ON MOBILE ===== */
  .cat-table-wrap {
    background: transparent;
    border: none;
    border-radius: 0;
    overflow: visible;
  }

  .cat-table-wrap .cat-table {
    display: block;
  }

  .cat-table-wrap .cat-table thead {
    display: none;
  }

  .cat-table-wrap .cat-table tbody {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .cat-table-wrap .cat-table tbody tr {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: var(--c-white);
    border: 1px solid var(--c-border);
    border-radius: 12px;
    padding: 12px;
    gap: 8px 12px;
  }

  .cat-table-wrap .cat-table td {
    padding: 0;
    border: none;
    font-size: 0.82rem;
  }

  .cat-table-wrap .col-check { display: none; }

  .cat-table-wrap .col-product {
    min-width: 0;
    flex: 1 1 100%;
  }

  .cat-table-wrap .col-product .prod-cell {
    gap: 10px;
  }

  .cat-table-wrap .prod-thumb {
    width: 48px;
    height: 48px;
    border-radius: 10px;
  }

  .cat-table-wrap .prod-name {
    font-size: 0.9rem;
    line-height: 1.3;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cat-table-wrap .prod-desc {
    max-width: 100%;
    font-size: 0.72rem;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  .cat-table-wrap .col-category {
    min-width: 0;
  }

  .cat-table-wrap .col-category .prod-category-badge {
    font-size: 0.68rem;
    padding: 3px 8px;
  }

  .cat-table-wrap .col-price {
    min-width: 0;
  }

  .cat-table-wrap .col-price .prod-price {
    font-size: 1rem;
  }

  .cat-table-wrap .col-status {
    min-width: 0;
  }

  .cat-table-wrap .prod-status-badge {
    font-size: 0.68rem;
    padding: 3px 8px;
  }

  .cat-table-wrap .col-featured {
    min-width: 0;
    text-align: left;
  }

  .cat-table-wrap .prod-star-btn {
    padding: 2px;
  }

  .cat-table-wrap .col-actions {
    min-width: 0;
    margin-left: auto;
  }

  .cat-table-wrap .cat-actions {
    justify-content: flex-end;
  }

  .cat-table-wrap .cat-table tbody tr:hover {
    background: var(--c-white);
  }

  /* Other tables still scroll horizontally */
  .cat-table-container,
  .orders-table-container,
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .cat-toolbar {
    flex-direction: column;
    gap: 10px;
  }

  .cat-toolbar-left,
  .cat-toolbar-right {
    width: 100%;
  }

  .cat-toolbar-right {
    flex-direction: column;
  }

  .cat-search-input { width: 100%; }

  .orders-toolbar {
    flex-direction: column;
    gap: 10px;
  }

  .orders-search { width: 100%; }

  .orders-filter-select {
    width: 100%;
    min-width: auto;
  }

  .sales-stats-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .mini-stat { padding: 14px; }

  .cat-pagination {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .cat-pagination-info { font-size: 0.75rem; text-align: center; }

  .empty-state { padding: 40px 16px; }
  .empty-icon { font-size: 2.5rem; }
  .empty-state h3 { font-size: 1rem; }
  .empty-state p { font-size: 0.82rem; }

  .modal { max-width: calc(100vw - 32px); margin: 0 16px; }
  .modal-header { padding: 16px 16px 0; }
  .modal-body { padding: 16px; }
  .form-row { grid-template-columns: 1fr; }
  .form-actions { flex-direction: column; }
  .form-actions .btn { width: 100%; justify-content: center; }

  .topbar {
    padding: 0 12px;
    gap: 8px;
    overflow: hidden;
  }

  .home-btn { display: none; }
}
</style>
