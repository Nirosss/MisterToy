import { createRouter, createWebHashHistory } from 'vue-router'
import toyApp from '../views/toy-app.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'toy-app',
      component: toyApp
    },
    {
      path: '/toy:toyId',
      name: 'toy-details',
      component: toyDetails,
    },
    {
      path: '/toy:toyId?',
      name: 'toy-edit',
      component: toyEdit,
    },
  ]
})

export default router
