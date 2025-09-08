<script setup lang="ts">
import Navbar from './components/layout/navbar.vue'
import { useTheme } from './composables/useTheme'
import Footer from './components/layout/footer.vue'

// Inicializar el sistema de temas
useTheme()
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <Navbar />
    <div class="mt-16"></div>
    <router-view />
    <Footer />
  </div>
</template>

<style scoped></style>
