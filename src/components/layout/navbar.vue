<script setup lang="ts">
import { useTheme } from '../../composables/useTheme'

const { currentTheme, setTheme, isDark, isAuto } = useTheme()

const toggleTheme = () => {
  if (currentTheme.value === 'light') {
    setTheme('dark')
  } else if (currentTheme.value === 'dark') {
    setTheme('auto')
  } else {
    setTheme('light')
  }
}

const getThemeIcon = () => {
  if (isAuto.value) return 'lucide:monitor'
  return isDark.value ? 'lucide:moon' : 'lucide:sun'
}

const getThemeLabel = () => {
  if (isAuto.value) return 'Auto'
  return isDark.value ? 'Oscuro' : 'Claro'
}
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Simulador</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <button
            @click="toggleTheme"
            class="btn btn-ghost btn-sm gap-2"
            :title="`Cambiar tema (${getThemeLabel()})`"
          >
            <Icon :icon="getThemeIcon()" class="w-5 h-5" />
            <span class="hidden sm:inline">{{ getThemeLabel() }}</span>
          </button>
        </li>
        <li><a>Link</a></li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul class="bg-base-100 rounded-t-none p-2">
              <li><a>Link 1</a></li>
              <li><a>Link 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>
