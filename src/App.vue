<script setup lang="ts">
import Navbar from './components/layout/navbar.vue'
import { useTheme } from './composables/useTheme'

// Inicializar el sistema de temas
useTheme()
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <Navbar />
    <router-view />
  </div>
</template>

<style scoped></style>
