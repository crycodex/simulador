import { ref, computed, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

const THEME_STORAGE_KEY = 'simulador-theme'

export function useTheme() {
  const currentTheme = ref<Theme>('auto')
  const systemTheme = ref<'light' | 'dark'>('light')

  // Detectar preferencia del sistema
  const detectSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  // Tema efectivo (resuelve 'auto' al tema del sistema)
  const effectiveTheme = computed(() => {
    return currentTheme.value === 'auto' ? systemTheme.value : currentTheme.value
  })

  // Aplicar tema al documento
  const applyTheme = (theme: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  // Cambiar tema
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    applyTheme(effectiveTheme.value)
  }

  // Cargar tema guardado
  const loadSavedTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      currentTheme.value = savedTheme
    }
  }

  // Escuchar cambios en la preferencia del sistema
  const setupSystemThemeListener = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const handleChange = (e: MediaQueryListEvent) => {
        systemTheme.value = e.matches ? 'dark' : 'light'
        if (currentTheme.value === 'auto') {
          applyTheme(systemTheme.value)
        }
      }

      mediaQuery.addEventListener('change', handleChange)

      // Cleanup function
      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }

  // Inicializar
  onMounted(() => {
    systemTheme.value = detectSystemTheme()
    loadSavedTheme()
    applyTheme(effectiveTheme.value)

    const cleanup = setupSystemThemeListener()

    // Cleanup al desmontar
    return cleanup
  })

  // Observar cambios en el tema efectivo
  watch(
    effectiveTheme,
    (newTheme) => {
      applyTheme(newTheme)
    },
    { immediate: true },
  )

  return {
    currentTheme: computed(() => currentTheme.value),
    effectiveTheme,
    systemTheme: computed(() => systemTheme.value),
    setTheme,
    isDark: computed(() => effectiveTheme.value === 'dark'),
    isLight: computed(() => effectiveTheme.value === 'light'),
    isAuto: computed(() => currentTheme.value === 'auto'),
  }
}
