<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSimuladorStore } from '../../stores/simuladorStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const simuladorStore = useSimuladorStore()
const {
  estado,
  preguntaActualData,
  totalPreguntas,
  progreso,
  tiempoRestanteFormateado,
  tiempoTranscurridoFormateado,
  preguntaActual,
} = storeToRefs(simuladorStore)

const {
  manejarRespuesta,
  siguientePregunta,
  preguntaAnterior,
  irAPregunta,
  finalizarSimulador,
  pausarSimulador,
  reanudarSimulador,
  generarReporte,
} = simuladorStore

const respuestaActual = ref<string | string[] | Record<string, string>>('')
const mostrarConfirmacion = ref(false)
const esPausado = computed(() => estado.value === 'pausado')

const manejarRespuestaUsuario = (respuesta: string | string[] | Record<string, string>) => {
  respuestaActual.value = respuesta
  manejarRespuesta(respuesta)
}

const manejarSiguiente = () => {
  console.log('Pregunta actual:', preguntaActual.value, 'Total:', totalPreguntas.value)
  if (preguntaActual.value < totalPreguntas.value - 1) {
    siguientePregunta()
    respuestaActual.value = ''
    console.log('Navegando a siguiente pregunta:', preguntaActual.value)
  } else {
    console.log('Mostrando confirmación de finalización')
    mostrarConfirmacion.value = true
  }
}

const manejarAnterior = () => {
  console.log('Pregunta actual:', preguntaActual.value)
  if (preguntaActual.value > 0) {
    preguntaAnterior()
    respuestaActual.value = ''
    console.log('Navegando a pregunta anterior:', preguntaActual.value)
  }
}

const confirmarFinalizar = () => {
  finalizarSimulador()
  const reporte = generarReporte()
  router.push({
    path: '/simulador/reporte',
    query: { resultado: JSON.stringify(reporte) },
  })
}

const alternarPausa = () => {
  if (esPausado.value) {
    reanudarSimulador()
  } else {
    pausarSimulador()
  }
}

const getTipoPregunta = (pregunta: any) => {
  if (
    pregunta.opciones.length === 2 &&
    pregunta.opciones.includes('Verdadero') &&
    pregunta.opciones.includes('Falso')
  ) {
    return 'verdadero_falso'
  }
  if (Array.isArray(pregunta.respuesta_correcta)) {
    return 'opcion_multiple'
  }
  if (typeof pregunta.respuesta_correcta === 'object') {
    return 'relacionar'
  }
  return 'opcion_simple'
}

onMounted(() => {
  console.log('Estado del simulador al montar:', estado.value)
  console.log('Preguntas disponibles:', totalPreguntas.value)
  if (estado.value === 'configurando' || totalPreguntas.value === 0) {
    console.log('Redirigiendo a configuración...')
    router.push('/simulador/config')
  }
})

onUnmounted(() => {
  if (estado.value === 'ejecutando') {
    pausarSimulador()
  }
})
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header con información del simulador -->
    <div class="navbar bg-base-200 shadow-sm">
      <div class="flex-1">
        <h1 class="text-xl font-semibold">Simulador en Progreso</h1>
      </div>
      <div class="flex-none gap-4">
        <div class="flex items-center gap-2">
          <Icon icon="lucide:clock" class="w-4 h-4" />
          <span class="font-mono">{{ tiempoRestanteFormateado }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="lucide:help-circle" class="w-4 h-4" />
          <span>{{ preguntaActual + 1 }} / {{ totalPreguntas }}</span>
        </div>
        <button
          @click="alternarPausa"
          class="btn btn-sm"
          :class="esPausado ? 'btn-success' : 'btn-warning'"
        >
          <Icon :icon="esPausado ? 'lucide:play' : 'lucide:pause'" class="w-4 h-4" />
          {{ esPausado ? 'Reanudar' : 'Pausar' }}
        </button>
      </div>
    </div>

    <div class="container mx-auto px-4 py-6">
      <div class="max-w-4xl mx-auto">
        <!-- Barra de progreso -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium">Progreso</span>
            <span class="text-sm font-medium">{{ progreso }}%</span>
          </div>
          <progress class="progress progress-primary w-full" :value="progreso" max="100"></progress>
        </div>

        <!-- Pregunta actual -->
        <div v-if="preguntaActualData" class="card bg-base-200 shadow-lg mb-6">
          <div class="card-body">
            <div class="flex items-start gap-4 mb-6">
              <div class="badge badge-primary badge-lg font-bold">
                {{ preguntaActual + 1 }}
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-semibold mb-4">
                  {{ preguntaActualData.pregunta }}
                </h2>

                <!-- Verdadero/Falso -->
                <div
                  v-if="getTipoPregunta(preguntaActualData) === 'verdadero_falso'"
                  class="space-y-3"
                >
                  <label
                    v-for="opcion in preguntaActualData.opciones"
                    :key="opcion"
                    class="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-base-100"
                    :class="{ 'border-primary bg-primary/10': respuestaActual === opcion }"
                    :for="`vf-${preguntaActual}-${opcion}`"
                  >
                    <input
                      type="radio"
                      :value="opcion"
                      v-model="respuestaActual"
                      @change="manejarRespuestaUsuario(opcion)"
                      class="radio radio-primary"
                      :id="`vf-${preguntaActual}-${opcion}`"
                    />
                    <span class="text-lg font-medium">{{ opcion }}</span>
                  </label>
                </div>

                <!-- Opción múltiple -->
                <div
                  v-else-if="getTipoPregunta(preguntaActualData) === 'opcion_multiple'"
                  class="space-y-3"
                >
                  <label
                    v-for="opcion in preguntaActualData.opciones"
                    :key="opcion"
                    class="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-base-100"
                    :class="{
                      'border-primary bg-primary/10':
                        Array.isArray(respuestaActual) && respuestaActual.includes(opcion),
                    }"
                    :for="`om-${preguntaActual}-${opcion}`"
                  >
                    <input
                      type="checkbox"
                      :value="opcion"
                      v-model="respuestaActual"
                      @change="manejarRespuestaUsuario(respuestaActual)"
                      class="checkbox checkbox-primary"
                      :id="`om-${preguntaActual}-${opcion}`"
                    />
                    <span class="text-lg font-medium">{{ opcion }}</span>
                  </label>
                </div>

                <!-- Opción simple -->
                <div v-else class="space-y-3">
                  <label
                    v-for="opcion in preguntaActualData.opciones"
                    :key="opcion"
                    class="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-base-100"
                    :class="{ 'border-primary bg-primary/10': respuestaActual === opcion }"
                    :for="`os-${preguntaActual}-${opcion}`"
                  >
                    <input
                      type="radio"
                      :value="opcion"
                      v-model="respuestaActual"
                      @change="manejarRespuestaUsuario(opcion)"
                      class="radio radio-primary"
                      :id="`os-${preguntaActual}-${opcion}`"
                    />
                    <span class="text-lg font-medium">{{ opcion }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navegación -->
        <div class="flex justify-between items-center">
          <button
            @click="manejarAnterior"
            :disabled="preguntaActual === 0"
            class="btn btn-outline gap-2"
            :class="{ 'btn-disabled': preguntaActual === 0 }"
          >
            <Icon icon="lucide:arrow-left" class="w-4 h-4" />
            Anterior
          </button>

          <div class="flex gap-2">
            <button @click="manejarSiguiente" class="btn btn-primary gap-2">
              {{ preguntaActual === totalPreguntas - 1 ? 'Finalizar' : 'Siguiente' }}
              <Icon icon="lucide:arrow-right" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Navegación rápida -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-3">Navegación Rápida</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(_, index) in totalPreguntas"
              :key="index"
              @click="irAPregunta(index)"
              class="btn btn-sm"
              :class="{
                'btn-primary': index === preguntaActual,
                'btn-outline': index !== preguntaActual,
              }"
            >
              {{ index + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="mostrarConfirmacion" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">¿Finalizar Simulador?</h3>
        <p class="mb-6">
          ¿Estás seguro de que quieres finalizar el simulador? Una vez finalizado, podrás ver tu
          reporte de resultados.
        </p>
        <div class="modal-action">
          <button @click="mostrarConfirmacion = false" class="btn btn-ghost">Cancelar</button>
          <button @click="confirmarFinalizar" class="btn btn-primary">Finalizar</button>
        </div>
      </div>
    </div>
  </div>
</template>
