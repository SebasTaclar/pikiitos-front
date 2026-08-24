<template>
  <main class="login-main">
    <div class="login-container">
      <div class="login-header">
        <h1>Acceder</h1>
        <h2>Ingrese Usuario/Email y contraseña</h2>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input type="email" id="email" v-model="email" placeholder="tu@email.com" required @invalid="setCustomValidityMessage"
              @input="clearCustomValidityMessage" class="form-input" />
          </div>
        </div>

        <div class="input-group">
          <label for="password">Contraseña</label>
          <div class="input-wrapper">
            <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input type="password" id="password" v-model="password" placeholder="••••••••" required @invalid="setCustomValidityMessage"
              @input="clearCustomValidityMessage" class="form-input" />
          </div>
        </div>

        <button type="submit" :disabled="loading" class="btn-primary">
          <span v-if="!loading">Acceder</span>
          <span v-else class="btn-loading">
            <svg class="spinner" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            </svg>
            Accediendo...
          </span>
        </button>
      </form>
    </div>

    <Spinner v-if="loading" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService, type LoginCredentials } from '@/services/api';
import Spinner from '@/components/Spinner.vue';

defineOptions({
  name: 'LoginView',
});

const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  try {
    const credentials: LoginCredentials = {
      email: email.value,
      password: password.value,
    };

    const response = await authService.login(credentials);

    if (response.success) {
      // Redirigir según el rol del usuario
      const userInfo = authService.getCurrentUser();

      if (userInfo?.role === 'admin') {
        router.push('/admin/products');
      } else {
        router.push('/');
      }
    } else {
      alert(response.message || 'Credenciales inválidas');
    }
  } catch (error: unknown) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error en el servidor. Intente nuevamente.';
    alert('Error en el login: ' + errorMessage);
  } finally {
    loading.value = false;
  }
};

const setCustomValidityMessage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.validity.valid) {
    target.setCustomValidity('Este campo es obligatorio.');
  }
};

const clearCustomValidityMessage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  target.setCustomValidity('');
};
</script>

<style scoped>
.login-main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f3e8 0%, #e8e4d0 50%, #d9d4b8 100%);
  position: relative;
  transition: all 0.3s ease;
}

/* Estilos específicos para modo oscuro */
:root[data-theme='dark'] .login-main {
  background: linear-gradient(135deg, #001122 0%, #002244 50%, #001833 100%);
}

:root[data-theme='dark'] .login-container {
  background: rgba(0, 30, 60, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

:root[data-theme='dark'] .login-header h1 {
  color: #fff;
}

:root[data-theme='dark'] .login-header h2 {
  color: rgba(255, 255, 255, 0.7);
}

:root[data-theme='dark'] .input-group label {
  color: rgba(255, 255, 255, 0.9);
}

:root[data-theme='dark'] .form-input {
  background: rgba(0, 20, 40, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #fff;
}

:root[data-theme='dark'] .form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

:root[data-theme='dark'] .form-input:focus {
  border-color: #FFD84D;
  background: rgba(0, 30, 60, 0.9);
  box-shadow: 0 0 0 4px rgba(255, 216, 77, 0.15);
}

:root[data-theme='dark'] .input-icon {
  color: rgba(255, 255, 255, 0.5);
}

:root[data-theme='dark'] .input-wrapper:focus-within .input-icon {
  color: #FFD84D;
}

.login-main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(194, 189, 116, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255, 216, 77, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.login-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: var(--backdrop-blur);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(194, 189, 116, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1);
  text-align: center;
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.login-header {
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d2d2d;
  margin: 0 0 0.5rem 0;
  font-family: var(--font-primary);
}

.login-header h2 {
  font-size: 1rem;
  color: #666;
  margin: 0;
  font-weight: 400;
  font-family: var(--font-primary);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: var(--font-primary);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: #999;
  pointer-events: none;
  transition: color 0.3s ease;
}

.input-wrapper:focus-within .input-icon {
  color: #c2bd74;
}

.form-input {
  width: 100%;
  padding: 14px 16px 14px 44px;
  background: #f8f8f8;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  color: #333;
  font-size: 1rem;
  font-family: var(--font-primary);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: #aaa;
}

.form-input:focus {
  outline: none;
  border-color: #c2bd74;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(194, 189, 116, 0.15);
}

.form-input:invalid {
  border-color: rgba(0, 94, 180, 0.6);
  box-shadow: 0 0 8px rgba(0, 94, 180, 0.2);
}

.btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #FFD84D 0%, #FFC107 100%);
  color: #333;
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 216, 77, 0.4);
  font-family: var(--font-primary);
  margin-top: 0.5rem;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 216, 77, 0.5);
  background: linear-gradient(135deg, #ffe066 0%, #ffd54f 100%);
}

.btn-primary:disabled {
  background: var(--bg-tertiary);
  color: var(--text-disabled);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-main {
    padding: 1rem;
    padding-top: 2rem;
  }

  .login-container {
    padding: 2rem 1.5rem;
    max-width: 380px;
  }

  .login-header h1 {
    font-size: 2rem;
  }

  .login-header h2 {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 1.5rem 1.25rem;
    max-width: 100%;
  }

  .login-header h1 {
    font-size: 1.75rem;
  }
}
</style>
