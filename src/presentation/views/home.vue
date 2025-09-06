<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Hero Section -->
        <div class="mb-12">
          <Icon icon="lucide:brain" class="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 class="text-5xl font-bold text-base-content mb-4">Simulador de Pruebas</h1>
          <p class="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
            Pon a prueba tus conocimientos con nuestro simulador interactivo. Practica con preguntas
            de diferentes complejidades y mejora tu rendimiento.
          </p>
          <button @click="router.push('/simulador/config')" class="btn btn-primary btn-lg gap-2">
            <Icon icon="lucide:play" class="w-5 h-5" />
            Iniciar Simulador
          </button>
        </div>

        <!-- Características -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body text-center">
              <Icon icon="lucide:target" class="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 class="text-xl font-bold mb-2">Evaluación Completa</h3>
              <p class="text-base-content/70">
                Preguntas de diferentes complejidades para evaluar tu nivel de conocimiento
              </p>
            </div>
          </div>

          <div class="card bg-base-200 shadow-lg">
            <div class="card-body text-center">
              <Icon icon="lucide:clock" class="w-12 h-12 text-info mx-auto mb-4" />
              <h3 class="text-xl font-bold mb-2">Control de Tiempo</h3>
              <p class="text-base-content/70">
                Simula condiciones reales de examen con tiempo limitado y cronómetro
              </p>
            </div>
          </div>

          <div class="card bg-base-200 shadow-lg">
            <div class="card-body text-center">
              <Icon icon="lucide:bar-chart" class="w-12 h-12 text-success mx-auto mb-4" />
              <h3 class="text-xl font-bold mb-2">Reportes Detallados</h3>
              <p class="text-base-content/70">
                Análisis completo de tu rendimiento y áreas de mejora
              </p>
            </div>
          </div>
        </div>

        <!-- Tipos de preguntas -->
        <div class="mb-12">
          <h2 class="text-3xl font-bold text-base-content mb-8">Tipos de Preguntas</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="card bg-base-200 shadow-md">
              <div class="card-body text-center">
                <Icon icon="lucide:check-circle" class="w-8 h-8 text-success mx-auto mb-2" />
                <h4 class="font-semibold">Verdadero/Falso</h4>
                <p class="text-sm text-base-content/70">Preguntas de opción binaria</p>
              </div>
            </div>

            <div class="card bg-base-200 shadow-md">
              <div class="card-body text-center">
                <Icon icon="lucide:list" class="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 class="font-semibold">Opción Múltiple</h4>
                <p class="text-sm text-base-content/70">Selecciona una o más opciones</p>
              </div>
            </div>

            <div class="card bg-base-200 shadow-md">
              <div class="card-body text-center">
                <Icon icon="lucide:arrow-up-down" class="w-8 h-8 text-warning mx-auto mb-2" />
                <h4 class="font-semibold">Ordenamiento</h4>
                <p class="text-sm text-base-content/70">Ordena elementos correctamente</p>
              </div>
            </div>

            <div class="card bg-base-200 shadow-md">
              <div class="card-body text-center">
                <Icon icon="lucide:link" class="w-8 h-8 text-info mx-auto mb-2" />
                <h4 class="font-semibold">Relacionar</h4>
                <p class="text-sm text-base-content/70">Conecta conceptos relacionados</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Final -->
        <div class="card bg-primary text-primary-content shadow-xl">
          <div class="card-body text-center">
            <h2 class="card-title text-2xl justify-center mb-4">
              <Icon icon="lucide:rocket" class="w-6 h-6" />
              ¿Listo para comenzar?
            </h2>
            <p class="mb-6">Configura tu simulador personalizado y demuestra tus conocimientos</p>
            <div class="card-actions justify-center">
              <button @click="router.push('/simulador/config')" class="btn btn-accent btn-lg gap-2">
                <Icon icon="lucide:play" class="w-5 h-5" />
                Iniciar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
