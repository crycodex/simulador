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
  <div class="navbar shadow-sm fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl" href="/">Simulador</a>
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
        <li>
          <!-- github icon -->
          <a href="https://github.com/crycodex/simulador" target="_blank" class="btn btn-ghost btn-sm gap-2">
            <Icon icon="lucide:github" class="w-5 h-5" />
          </a>
        </li>
        <!-- issue icon -->
        <li>
          <a href="https://github.com/crycodex/simulador/issues/new" target="_blank" class="btn btn-ghost btn-sm gap-2">
            <Icon icon="pajamas:issue-type-feature-flag" class="w-5 h-5" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
