<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSimuladorStore } from '../../stores/simuladorStore'
import type { ResultadoSimulador } from '../../types/quiz'

const router = useRouter()
const route = useRoute()
const simuladorStore = useSimuladorStore()
const resultado = ref<ResultadoSimulador | null>(null)
const mostrarDetalles = ref(false)

const porcentajeColor = computed(() => {
  if (!resultado.value) return 'text-base-content'
  const pct = resultado.value.porcentaje
  if (pct >= 80) return 'text-success'
  if (pct >= 60) return 'text-warning'
  return 'text-error'
})

const nivelRendimiento = computed(() => {
  if (!resultado.value) return 'N/A'
  const pct = resultado.value.porcentaje
  if (pct >= 90) return 'Excelente'
  if (pct >= 80) return 'Muy Bueno'
  if (pct >= 70) return 'Bueno'
  if (pct >= 60) return 'Regular'
  return 'Necesita Mejora'
})

const tiempoPromedioPorPregunta = computed(() => {
  if (
    !resultado.value ||
    resultado.value.preguntas_correctas + resultado.value.preguntas_incorrectas === 0
  )
    return 0
  return Math.round(
    resultado.value.tiempo_total_usado /
      (resultado.value.preguntas_correctas + resultado.value.preguntas_incorrectas),
  )
})

const formatearTiempo = (segundos: number) => {
  const minutos = Math.floor(segundos / 60)
  const segs = segundos % 60
  return `${minutos}:${segs.toString().padStart(2, '0')}`
}

onMounted(() => {
  const resultadoData = route.query.resultado
  if (resultadoData) {
    try {
      resultado.value = JSON.parse(resultadoData as string)
    } catch (error) {
      console.error('Error parsing resultado:', error)
      router.push('/simulador/config')
    }
  } else {
    router.push('/simulador/config')
  }
})

const reiniciarSimulador = () => {
  simuladorStore.reiniciarSimulador()
  router.push('/simulador/config')
}

const verDetalles = () => {
  mostrarDetalles.value = !mostrarDetalles.value
}
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <Icon icon="lucide:bar-chart" class="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 class="text-4xl font-bold text-base-content mb-2">Reporte de Resultados</h1>
          <p class="text-base-content/70 text-lg">Análisis detallado de tu rendimiento</p>
        </div>

        <div v-if="resultado" class="space-y-6">
          <!-- Resumen principal -->
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body">
              <h2 class="card-title text-2xl mb-6">
                <Icon icon="lucide:target" class="w-6 h-6" />
                Resumen General
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Puntuación -->
                <div class="stat bg-base-100 rounded-lg">
                  <div class="stat-figure">
                    <Icon icon="lucide:trophy" class="w-8 h-8 text-warning" />
                  </div>
                  <div class="stat-title">Puntuación</div>
                  <div class="stat-value" :class="porcentajeColor">
                    {{ resultado.puntuacion_total }}/{{ resultado.puntuacion_maxima }}
                  </div>
                  <div class="stat-desc" :class="porcentajeColor">
                    {{ resultado.porcentaje }}% - {{ nivelRendimiento }}
                  </div>
                </div>

                <!-- Tiempo usado -->
                <div class="stat bg-base-100 rounded-lg">
                  <div class="stat-figure">
                    <Icon icon="lucide:clock" class="w-8 h-8 text-info" />
                  </div>
                  <div class="stat-title">Tiempo Usado</div>
                  <div class="stat-value text-info">
                    {{ formatearTiempo(resultado.tiempo_total_usado) }}
                  </div>
                  <div class="stat-desc">de {{ formatearTiempo(resultado.duracion) }} total</div>
                </div>

                <!-- Preguntas correctas -->
                <div class="stat bg-base-100 rounded-lg">
                  <div class="stat-figure">
                    <Icon icon="lucide:check-circle" class="w-8 h-8 text-success" />
                  </div>
                  <div class="stat-title">Correctas</div>
                  <div class="stat-value text-success">
                    {{ resultado.preguntas_correctas }}
                  </div>
                  <div class="stat-desc">
                    {{
                      Math.round(
                        (resultado.preguntas_correctas / resultado.puntuacion_maxima) * 100,
                      )
                    }}% del total
                  </div>
                </div>

                <!-- Preguntas incorrectas -->
                <div class="stat bg-base-100 rounded-lg">
                  <div class="stat-figure">
                    <Icon icon="lucide:x-circle" class="w-8 h-8 text-error" />
                  </div>
                  <div class="stat-title">Incorrectas</div>
                  <div class="stat-value text-error">
                    {{ resultado.preguntas_incorrectas }}
                  </div>
                  <div class="stat-desc">
                    {{
                      Math.round(
                        (resultado.preguntas_incorrectas / resultado.puntuacion_maxima) * 100,
                      )
                    }}% del total
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Gráfico de rendimiento -->
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body">
              <h3 class="card-title text-xl mb-4">
                <Icon icon="lucide:pie-chart" class="w-5 h-5" />
                Distribución de Respuestas
              </h3>

              <div class="flex items-center justify-center">
                <div
                  class="radial-progress text-6xl"
                  :class="porcentajeColor.replace('text-', 'text-')"
                  :style="`--value:${resultado.porcentaje}`"
                  role="progressbar"
                >
                  {{ resultado.porcentaje }}%
                </div>
              </div>

              <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-success rounded"></div>
                  <span>Correctas: {{ resultado.preguntas_correctas }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-error rounded"></div>
                  <span>Incorrectas: {{ resultado.preguntas_incorrectas }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-base-300 rounded"></div>
                  <span>Sin responder: {{ resultado.preguntas_sin_responder }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Estadísticas adicionales -->
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body">
              <h3 class="card-title text-xl mb-4">
                <Icon icon="lucide:activity" class="w-5 h-5" />
                Estadísticas Adicionales
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="font-medium">Tiempo promedio por pregunta:</span>
                    <span class="badge badge-info">
                      {{ formatearTiempo(tiempoPromedioPorPregunta) }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="font-medium">Complejidad seleccionada:</span>
                    <span class="badge badge-outline">
                      {{ resultado.configuracion.complejidad }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="font-medium">Fecha del simulador:</span>
                    <span class="text-sm">
                      {{ new Date(resultado.fecha).toLocaleDateString() }}
                    </span>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="font-medium">Duración configurada:</span>
                    <span class="badge badge-outline">
                      {{ formatearTiempo(resultado.duracion) }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="font-medium">Eficiencia de tiempo:</span>
                    <span
                      class="badge"
                      :class="
                        resultado.tiempo_total_usado < resultado.duracion * 0.8
                          ? 'badge-success'
                          : 'badge-warning'
                      "
                    >
                      {{ Math.round((resultado.tiempo_total_usado / resultado.duracion) * 100) }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex justify-center gap-4">
            <button @click="reiniciarSimulador" class="btn btn-primary btn-lg gap-2">
              <Icon icon="lucide:refresh-cw" class="w-5 h-5" />
              Nuevo Simulador
            </button>
            <button @click="verDetalles" class="btn btn-outline btn-lg gap-2">
              <Icon icon="lucide:eye" class="w-5 h-5" />
              {{ mostrarDetalles ? 'Ocultar' : 'Ver' }} Detalles
            </button>
            <button @click="router.push('/')" class="btn btn-ghost btn-lg gap-2">
              <Icon icon="lucide:home" class="w-5 h-5" />
              Inicio
            </button>
          </div>

          <!-- Detalles de preguntas (expandible) -->
          <div v-if="mostrarDetalles" class="card bg-base-200 shadow-lg">
            <div class="card-body">
              <h3 class="card-title text-xl mb-4">
                <Icon icon="lucide:list" class="w-5 h-5" />
                Detalle por Pregunta
              </h3>

              <div class="space-y-4">
                <div
                  v-for="(respuesta, index) in resultado.respuestas"
                  :key="respuesta.preguntaId"
                  class="card bg-base-100 p-4"
                >
                  <div class="flex items-start gap-4">
                    <div
                      class="badge badge-lg"
                      :class="respuesta.es_correcta ? 'badge-success' : 'badge-error'"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <Icon
                          :icon="respuesta.es_correcta ? 'lucide:check-circle' : 'lucide:x-circle'"
                          class="w-5 h-5"
                          :class="respuesta.es_correcta ? 'text-success' : 'text-error'"
                        />
                        <span class="font-medium">
                          {{ respuesta.es_correcta ? 'Correcta' : 'Incorrecta' }}
                        </span>
                        <span class="text-sm text-base-content/70">
                          ({{ formatearTiempo(respuesta.tiempo_usado) }})
                        </span>
                      </div>
                      <div class="text-sm text-base-content/70">
                        <strong>Tu respuesta:</strong>
                        {{
                          Array.isArray(respuesta.respuesta)
                            ? respuesta.respuesta.join(', ')
                            : respuesta.respuesta
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
