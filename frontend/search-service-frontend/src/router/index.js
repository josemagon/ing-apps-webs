import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Inicio from '../views/Inicio.vue'
import PaginasListado from '../views/paginas/Listado.vue'
import NuevaPagina from '../views/paginas/NuevaPagina.vue'
import SinglePagina from '../views/paginas/SinglePagina.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio
    },

    // Paginas
    {
      path: '/paginas',
      name: 'paginas',
      component: PaginasListado
    },
    {
      path: '/nueva-pagina',
      name: 'nueva-pagina',
      component: NuevaPagina
    },
    {
      path: '/paginas/:id',
      name: 'single-pagina',
      component: SinglePagina,
      props : true
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ],
  linkActiveClass: 'active'
})

export default router
