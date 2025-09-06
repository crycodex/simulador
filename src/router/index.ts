import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../presentation/views/home.vue'
import SimuladorConfig from '../presentation/views/SimuladorConfig.vue'
import SimuladorEjecutar from '../presentation/views/SimuladorEjecutar.vue'
import SimuladorReporte from '../presentation/views/SimuladorReporte.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/simulador',
      redirect: '/simulador/config',
    },
    {
      path: '/simulador/config',
      name: 'simulador-config',
      component: SimuladorConfig,
    },
    {
      path: '/simulador/ejecutar',
      name: 'simulador-ejecutar',
      component: SimuladorEjecutar,
    },
    {
      path: '/simulador/reporte',
      name: 'simulador-reporte',
      component: SimuladorReporte,
    },
  ],
})

export default router
