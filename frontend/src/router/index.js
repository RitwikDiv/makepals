import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Conduct from "../views/Conduct.vue"

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/conduct',
    name: 'Conduct',
    component: Conduct
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
