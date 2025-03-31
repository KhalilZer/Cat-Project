import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import StatsView from '../views/StatsView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/stats',
    name: 'Stats',
    component: StatsView
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;
