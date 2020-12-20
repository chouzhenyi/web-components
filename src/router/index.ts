import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../views/Table.vue')
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: () => import('../views/exercise.vue')
  },
  {
    path: '/algorithm',
    name: 'Algorithm',
    component: () => import('../views/algorithm.vue')
  },
  {
    path: '/data-structure',
    name: 'DataStructure',
    component: () => import('../views/data-structure.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('../views/music.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
