# 🎯 Simulador de Pruebas Complejivas

Un simulador interactivo de pruebas complejivas desarrollado con Vue 3, diseñado para ayudar a los estudiantes a prepararse para exámenes de manera eficiente y estructurada.

## ✨ Características

### 🎮 **Funcionalidades Principales**

- **Configuración Flexible**: Selecciona complejidad, cantidad de preguntas y duración
- **Múltiples Tipos de Preguntas**: Verdadero/Falso, Opción Múltiple, Ordenamiento, Relacionar, Opción Simple
- **Navegación Secuencial**: Progreso lineal sin posibilidad de retroceder
- **Timer Inteligente**: Cronómetro con pausa/reanudación automática
- **Reportes Detallados**: Análisis completo de rendimiento al finalizar
- **Tema Adaptativo**: Modo claro/oscuro con detección automática del sistema

### 🎨 **Interfaz de Usuario**

- **Diseño Moderno**: Interfaz limpia y profesional con DaisyUI
- **Responsive**: Optimizado para dispositivos móviles y desktop
- **Accesibilidad**: Cumple con estándares de accesibilidad web
- **Iconografía**: Iconos vectoriales con Iconify para mejor experiencia visual

## 🚀 Tecnologías Utilizadas

### **Frontend**

- **Vue 3** - Framework progresivo con Composition API
- **TypeScript** - Tipado estático para mayor robustez
- **Pinia** - Gestión de estado global
- **Vue Router** - Navegación entre vistas
- **Tailwind CSS** - Framework de utilidades CSS
- **DaisyUI** - Componentes UI pre-construidos

### **Herramientas de Desarrollo**

- **Vite** - Build tool rápido y moderno
- **ESLint** - Linter para mantener código limpio
- **Prettier** - Formateador de código automático

## 📁 Estructura del Proyecto

```
src/
├── components/
│   └── layout/
│       ├── navbar.vue          # Barra de navegación con tema
│       └── footer.vue          # Pie de página
├── composables/
│   └── useTheme.ts            # Lógica de temas claro/oscuro
├── data/
│   └── preguntas.json         # Base de datos de preguntas
├── presentation/
│   └── views/
│       ├── home.vue           # Página principal
│       ├── SimuladorConfig.vue    # Configuración del simulador
│       ├── SimuladorEjecutar.vue  # Ejecución del simulador
│       └── SimuladorReporte.vue   # Reporte de resultados
├── router/
│   └── index.ts               # Configuración de rutas
├── stores/
│   └── simuladorStore.ts      # Store global con Pinia
├── types/
│   └── quiz.ts                # Definiciones de tipos TypeScript
├── App.vue                    # Componente raíz
└── main.ts                    # Punto de entrada
```

## 🛠️ Instalación y Configuración

### **Prerrequisitos**

- Node.js 16+
- npm o yarn

### **Instalación**

```bash
# Clonar el repositorio
git clone <repository-url>
cd simulador

# Instalar dependencias
npm install
```

### **Desarrollo**

```bash
# Servidor de desarrollo con hot-reload
npm run dev

# El servidor estará disponible en http://localhost:5173
```

### **Producción**

```bash
# Build para producción
npm run build

# Preview del build de producción
npm run preview
```

## 🎯 Uso del Simulador

### **1. Configuración**

- Selecciona la **complejidad** de las preguntas (Básico, Intermedio, Avanzado)
- Elige la **cantidad** de preguntas (1-50)
- Define la **duración** del simulador en minutos

### **2. Ejecución**

- Responde las preguntas en orden secuencial
- Utiliza el botón **"Siguiente"** para avanzar
- El **timer** muestra el tiempo restante
- Puedes **pausar/reanudar** el simulador

### **3. Reporte**

- Visualiza tu **puntuación** y porcentaje de aciertos
- Revisa las **respuestas correctas** e incorrectas
- Analiza el **tiempo** utilizado por pregunta
- Exporta o comparte tus resultados

## 📊 Tipos de Preguntas Soportadas

| Tipo                | Descripción                    | Ejemplo                                             |
| ------------------- | ------------------------------ | --------------------------------------------------- |
| **Verdadero/Falso** | Selección binaria              | "La fotosíntesis ocurre en las hojas"               |
| **Opción Múltiple** | Múltiples respuestas correctas | Seleccionar todos los órganos del sistema digestivo |
| **Ordenamiento**    | Secuenciar elementos           | Ordenar las fases de la mitosis                     |
| **Relacionar**      | Conectar conceptos             | Relacionar enzimas con sus sustratos                |
| **Opción Simple**   | Una respuesta correcta         | ¿Cuál es la capital de Francia?                     |

## 🎨 Personalización

### **Temas**

El simulador incluye soporte para temas claro y oscuro:

- **Automático**: Detecta la preferencia del sistema
- **Manual**: Cambio manual entre claro/oscuro
- **Persistente**: Recuerda la preferencia del usuario

### **Configuración de Preguntas**

Las preguntas se almacenan en `src/data/preguntas.json` con la siguiente estructura:

```json
{
  "id": "pregunta_001",
  "pregunta": "¿Cuál es la función de las mitocondrias?",
  "tipo": "opcion_simple",
  "complejidad": "intermedio",
  "opciones": ["Respiración celular", "Fotosíntesis", "Digestión"],
  "respuesta_correcta": "Respiración celular",
  "explicacion": "Las mitocondrias son el centro energético de la célula"
}
```

## 🔧 Configuración Avanzada

### **Variables de Entorno**

```bash
# .env.local
VITE_APP_TITLE=Simulador de Pruebas Complejivas
VITE_APP_VERSION=1.0.0
```

### **Configuración de Vite**

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## 📱 Compatibilidad

- **Navegadores**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dispositivos**: Desktop, Tablet, Mobile
- **Resoluciones**: 320px - 4K

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Cry.code** - [GitHub](https://github.com/cry-code)

---

## 🆘 Soporte

Si encuentras algún problema o tienes sugerencias:

1. **Issues**: Abre un issue en GitHub
2. **Documentación**: Revisa la documentación de Vue 3
3. **Comunidad**: Únete a la comunidad de Vue.js

---

_Desarrollado con ❤️ usando Vue 3 y TypeScript_
