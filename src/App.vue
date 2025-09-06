<script setup lang="ts">
import Navbar from './components/layout/navbar.vue'
import { useTheme } from './composables/useTheme'

// Inicializar el sistema de temas
useTheme()
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <div class="prose max-w-none">
        <h1 class="text-3xl font-bold text-base-content mb-6">Bienvenido al Simulador</h1>
        <p class="text-base-content/70 mb-4">
          Esta aplicación incluye soporte completo para modo claro y oscuro.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="card bg-base-200 shadow-md">
            <div class="card-body">
              <div class="flex items-center gap-3 mb-2">
                <Icon icon="lucide:sun" class="w-6 h-6 text-warning" />
                <h2 class="card-title text-base-content">Modo Claro</h2>
              </div>
              <p class="text-base-content/70">Interfaz limpia y clara para uso durante el día.</p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-md">
            <div class="card-body">
              <div class="flex items-center gap-3 mb-2">
                <Icon icon="lucide:moon" class="w-6 h-6 text-info" />
                <h2 class="card-title text-base-content">Modo Oscuro</h2>
              </div>
              <p class="text-base-content/70">
                Interfaz suave para uso nocturno o en ambientes con poca luz.
              </p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-md">
            <div class="card-body">
              <div class="flex items-center gap-3 mb-2">
                <Icon icon="lucide:monitor" class="w-6 h-6 text-success" />
                <h2 class="card-title text-base-content">Modo Automático</h2>
              </div>
              <p class="text-base-content/70">
                Se adapta automáticamente a la preferencia de tu sistema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
