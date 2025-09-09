<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSimuladorStore } from '../../stores/simuladorStore'
import { useRouter } from 'vue-router'
import preguntasData from '../../data/preguntas.json'

const router = useRouter()
const simuladorStore = useSimuladorStore()
const { configuracion } = storeToRefs(simuladorStore)
const { iniciarSimulador, cargarPreguntas } = simuladorStore

const cantidadesPreguntas = [5, 10, 15, 20, 25, 30, 50]
const duraciones = [10, 15, 30, 45, 60, 90, 120]

const iniciarSimuladorConfig = async () => {
  console.log('Configurando simulador...')
  console.log('Datos de preguntas:', preguntasData)
  await cargarPreguntas(preguntasData as any)
  console.log('Preguntas cargadas, iniciando simulador...')
  iniciarSimulador()
  console.log('Navegando a ejecutar...')
  router.push('/simulador/ejecutar')
}
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <Icon icon="lucide:brain" class="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 class="text-4xl font-bold text-base-content mb-2">Simulador de Pruebas</h1>
          <p class="text-base-content/70 text-lg">
            Configura tu simulador y pon a prueba tus conocimientos
          </p>
        </div>

        <!-- Configuración -->
        <div class="card bg-base-200 shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-6">
              <Icon icon="lucide:settings" class="w-6 h-6" />
              Configuración del Simulador
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Cantidad de preguntas -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-lg font-semibold">Cantidad de Preguntas</span>
                </label>
                <select
                  v-model="configuracion.cantidad_preguntas"
                  class="select select-bordered w-full"
                >
                  <option v-for="cantidad in cantidadesPreguntas" :key="cantidad" :value="cantidad">
                    {{ cantidad }} preguntas
                  </option>
                </select>
              </div>

              <!-- Duración -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-lg font-semibold">Duración (minutos)</span>
                </label>
                <select
                  v-model="configuracion.duracion_minutos"
                  class="select select-bordered w-full"
                >
                  <option v-for="duracion in duraciones" :key="duracion" :value="duracion">
                    {{ duracion }} minutos
                  </option>
                </select>
              </div>
            </div>

            <!-- Resumen de configuración -->
            <div class="mt-8">
              <div class="card bg-base-100 p-6">
                <h3 class="text-lg font-semibold mb-4">Resumen de Configuración</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex items-center gap-3">
                    <Icon icon="lucide:help-circle" class="w-5 h-5 text-primary" />
                    <span class="text-base">Preguntas: {{ configuracion.cantidad_preguntas }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <Icon icon="lucide:clock" class="w-5 h-5 text-primary" />
                    <span class="text-base"
                      >Duración: {{ configuracion.duracion_minutos }} minutos</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex justify-center gap-4 mt-8">
              <button @click="iniciarSimuladorConfig" class="btn btn-primary btn-lg gap-2">
                <Icon icon="lucide:play" class="w-5 h-5" />
                Iniciar Simulador
              </button>
              <button @click="router.push('/')" class="btn btn-ghost btn-lg gap-2">
                <Icon icon="lucide:arrow-left" class="w-5 h-5" />
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>

        <!-- Información adicional -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card bg-base-200 shadow-md">
            <div class="card-body text-center">
              <Icon icon="lucide:target" class="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 class="font-semibold">Evaluación Completa</h3>
              <p class="text-sm text-base-content/70">
                Preguntas variadas para evaluar tu nivel de conocimiento
              </p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-md">
            <div class="card-body text-center">
              <Icon icon="lucide:clock" class="w-8 h-8 text-info mx-auto mb-2" />
              <h3 class="font-semibold">Control de Tiempo</h3>
              <p class="text-sm text-base-content/70">
                Simula condiciones reales de examen con tiempo limitado
              </p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-md">
            <div class="card-body text-center">
              <Icon icon="lucide:bar-chart" class="w-8 h-8 text-success mx-auto mb-2" />
              <h3 class="font-semibold">Reporte Detallado</h3>
              <p class="text-sm text-base-content/70">
                Análisis completo de tu rendimiento y áreas de mejora
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
