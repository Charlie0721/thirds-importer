import { createRouter, createWebHistory } from 'vue-router'
import importer from '../components/thirds-importer.vue'
const routes = [
  {
    path: '/',
    name: 'importer',
    component: importer
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
