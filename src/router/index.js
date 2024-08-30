import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePort',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../views/LoginView.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/RegisterView.vue')
        }
      ]
    },
    {
      path: '/todoList',
      name: 'todoList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TodoListView.vue')
    }
  ]
})

export default router
