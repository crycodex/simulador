export interface Pregunta {
  id: string
  pregunta: string
  opciones: string[]
  respuesta_correcta: string | string[] | Record<string, string>
  tipo: 'verdadero_falso' | 'opcion_multiple' | 'ordenamiento' | 'relacionar'
  complejidad: 'basica' | 'intermedia' | 'avanzada'
  categoria?: string
  tiempo_estimado?: number // en segundos
}

export interface RespuestaUsuario {
  preguntaId: string
  respuesta: string | string[] | Record<string, string>
  tiempo_usado: number // en segundos
  es_correcta: boolean
  puntos_obtenidos: number
}

export interface ConfiguracionSimulador {
  complejidad: 'basica' | 'intermedia' | 'avanzada' | 'todas'
  cantidad_preguntas: number
  duracion_minutos: number
  categoria?: string
}

export interface ResultadoSimulador {
  id: string
  fecha: Date
  configuracion: ConfiguracionSimulador
  respuestas: RespuestaUsuario[]
  puntuacion_total: number
  puntuacion_maxima: number
  porcentaje: number
  tiempo_total_usado: number
  preguntas_correctas: number
  preguntas_incorrectas: number
  preguntas_sin_responder: number
  duracion: number
}

export interface EstadisticasPregunta {
  preguntaId: string
  pregunta: string
  es_correcta: boolean
  tiempo_usado: number
  respuesta_usuario: string | string[] | Record<string, string>
  respuesta_correcta: string | string[] | Record<string, string>
  explicacion?: string
}

export type EstadoSimulador = 'configurando' | 'ejecutando' | 'pausado' | 'finalizado' | 'revisando'
