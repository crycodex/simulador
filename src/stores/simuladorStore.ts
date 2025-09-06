import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Pregunta,
  RespuestaUsuario,
  ConfiguracionSimulador,
  ResultadoSimulador,
  EstadoSimulador,
} from '../types/quiz'

export const useSimuladorStore = defineStore('simulador', () => {
  // Estado del simulador
  const estado = ref<EstadoSimulador>('configurando')
  const configuracion = ref<ConfiguracionSimulador>({
    complejidad: 'todas',
    cantidad_preguntas: 10,
    duracion_minutos: 30,
  })

  // Preguntas y respuestas
  const preguntas = ref<Pregunta[]>([])
  const preguntasSeleccionadas = ref<Pregunta[]>([])
  const respuestas = ref<RespuestaUsuario[]>([])
  const preguntaActual = ref(0)
  const tiempoInicio = ref<Date | null>(null)
  const tiempoPausa = ref<number>(0)

  // Timer
  const tiempoRestante = ref(0)
  const tiempoTranscurrido = ref(0)
  const timerInterval = ref<number | null>(null)

  // Computed
  const preguntaActualData = computed(() => {
    return preguntasSeleccionadas.value[preguntaActual.value] || null
  })

  const totalPreguntas = computed(() => preguntasSeleccionadas.value.length)

  const progreso = computed(() => {
    if (totalPreguntas.value === 0) return 0
    return Math.round((preguntaActual.value / totalPreguntas.value) * 100)
  })

  const tiempoRestanteFormateado = computed(() => {
    const minutos = Math.floor(tiempoRestante.value / 60)
    const segundos = tiempoRestante.value % 60
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
  })

  const tiempoTranscurridoFormateado = computed(() => {
    const minutos = Math.floor(tiempoTranscurrido.value / 60)
    const segundos = tiempoTranscurrido.value % 60
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
  })

  // Métodos
  const cargarPreguntas = async (preguntasData: Pregunta[]) => {
    preguntas.value = preguntasData
  }

  const seleccionarPreguntas = () => {
    let preguntasFiltradas = [...preguntas.value]

    // Filtrar por complejidad
    if (configuracion.value.complejidad !== 'todas') {
      preguntasFiltradas = preguntasFiltradas.filter(
        (p) => p.complejidad === configuracion.value.complejidad,
      )
    }

    // Mezclar y seleccionar cantidad
    const preguntasMezcladas = [...preguntasFiltradas].sort(() => Math.random() - 0.5)
    preguntasSeleccionadas.value = preguntasMezcladas.slice(
      0,
      configuracion.value.cantidad_preguntas,
    )
  }

  const iniciarSimulador = () => {
    console.log('Iniciando simulador...')
    seleccionarPreguntas()
    console.log('Preguntas seleccionadas:', preguntasSeleccionadas.value.length)
    estado.value = 'ejecutando'
    tiempoInicio.value = new Date()
    tiempoRestante.value = configuracion.value.duracion_minutos * 60
    tiempoTranscurrido.value = 0
    preguntaActual.value = 0
    respuestas.value = []

    // Iniciar timer
    timerInterval.value = setInterval(() => {
      if (estado.value === 'ejecutando') {
        tiempoTranscurrido.value++
        tiempoRestante.value--

        if (tiempoRestante.value <= 0) {
          finalizarSimulador()
        }
      }
    }, 1000)
    console.log('Simulador iniciado correctamente')
  }

  const pausarSimulador = () => {
    estado.value = 'pausado'
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  const reanudarSimulador = () => {
    estado.value = 'ejecutando'
    timerInterval.value = setInterval(() => {
      if (estado.value === 'ejecutando') {
        tiempoTranscurrido.value++
        tiempoRestante.value--

        if (tiempoRestante.value <= 0) {
          finalizarSimulador()
        }
      }
    }, 1000)
  }

  const responderPregunta = (respuesta: string | string[] | Record<string, string>) => {
    if (!preguntaActualData.value) return

    const tiempoInicioPregunta = tiempoInicio.value
      ? new Date().getTime() - tiempoInicio.value.getTime()
      : 0
    const tiempoUsado = Math.floor(tiempoInicioPregunta / 1000)

    const esCorrecta = evaluarRespuesta(preguntaActualData.value, respuesta)
    const puntos = esCorrecta ? 1 : 0

    const respuestaUsuario: RespuestaUsuario = {
      preguntaId: preguntaActualData.value.id,
      respuesta,
      tiempo_usado: tiempoUsado,
      es_correcta: esCorrecta,
      puntos_obtenidos: puntos,
    }

    // Actualizar o agregar respuesta
    const index = respuestas.value.findIndex((r) => r.preguntaId === preguntaActualData.value!.id)
    if (index >= 0) {
      respuestas.value[index] = respuestaUsuario
    } else {
      respuestas.value.push(respuestaUsuario)
    }
  }

  const manejarRespuesta = (respuesta: string | string[] | Record<string, string>) => {
    responderPregunta(respuesta)
  }

  const evaluarRespuesta = (
    pregunta: Pregunta,
    respuesta: string | string[] | Record<string, string>,
  ): boolean => {
    const correcta = pregunta.respuesta_correcta

    if (Array.isArray(correcta)) {
      if (!Array.isArray(respuesta)) return false
      return JSON.stringify([...correcta].sort()) === JSON.stringify([...respuesta].sort())
    }

    if (typeof correcta === 'object') {
      if (typeof respuesta !== 'object') return false
      return JSON.stringify(correcta) === JSON.stringify(respuesta)
    }

    return correcta === respuesta
  }

  const siguientePregunta = () => {
    if (preguntaActual.value < totalPreguntas.value - 1) {
      preguntaActual.value++
    }
  }

  const preguntaAnterior = () => {
    if (preguntaActual.value > 0) {
      preguntaActual.value--
    }
  }

  const irAPregunta = (indice: number) => {
    if (indice >= 0 && indice < totalPreguntas.value) {
      preguntaActual.value = indice
    }
  }

  const finalizarSimulador = () => {
    estado.value = 'finalizado'
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  const generarReporte = (): ResultadoSimulador => {
    const puntuacionTotal = respuestas.value.reduce((sum, r) => sum + r.puntos_obtenidos, 0)
    const puntuacionMaxima = totalPreguntas.value
    const porcentaje =
      puntuacionMaxima > 0 ? Math.round((puntuacionTotal / puntuacionMaxima) * 100) : 0
    const preguntasCorrectas = respuestas.value.filter((r) => r.es_correcta).length
    const preguntasIncorrectas = respuestas.value.filter((r) => !r.es_correcta).length
    const preguntasSinResponder = totalPreguntas.value - respuestas.value.length

    return {
      id: `sim_${Date.now()}`,
      fecha: new Date(),
      configuracion: configuracion.value,
      respuestas: respuestas.value,
      puntuacion_total: puntuacionTotal,
      puntuacion_maxima: puntuacionMaxima,
      porcentaje,
      tiempo_total_usado: tiempoTranscurrido.value,
      preguntas_correctas: preguntasCorrectas,
      preguntas_incorrectas: preguntasIncorrectas,
      preguntas_sin_responder: preguntasSinResponder,
      duracion: configuracion.value.duracion_minutos * 60,
    }
  }

  const reiniciarSimulador = () => {
    estado.value = 'configurando'
    preguntaActual.value = 0
    respuestas.value = []
    tiempoInicio.value = null
    tiempoTranscurrido.value = 0
    tiempoRestante.value = 0
    preguntasSeleccionadas.value = []

    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  return {
    // Estado
    estado,
    configuracion,
    preguntas,
    preguntasSeleccionadas,
    respuestas,
    preguntaActual,
    tiempoRestante,
    tiempoTranscurrido,

    // Computed
    preguntaActualData,
    totalPreguntas,
    progreso,
    tiempoRestanteFormateado,
    tiempoTranscurridoFormateado,

    // Métodos
    cargarPreguntas,
    seleccionarPreguntas,
    iniciarSimulador,
    pausarSimulador,
    reanudarSimulador,
    responderPregunta,
    manejarRespuesta,
    siguientePregunta,
    preguntaAnterior,
    irAPregunta,
    finalizarSimulador,
    generarReporte,
    reiniciarSimulador,
  }
})
