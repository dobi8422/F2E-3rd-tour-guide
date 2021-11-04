import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/:catchAll(.*)', redirect: '/' },
  { path: '/', name: 'Home', component: () => import('./views/Home.vue') },
  { path: '/view', name: 'View', component: () => import('./views/View.vue') },
  // { path: '/view_list', name: 'View_list', component: () => import('./views/View_list.vue') },
  { path: '/food', name: 'Food', component: () => import('./views/Food.vue') },
  // { path: '/view_list', name: 'Food_list', component: () => import('./views/Food_list.vue') },
  { path: '/active', name: 'Active', component: () => import('./views/Active.vue') },
  // { path: '/view_list', name: 'View_list', component: () => import('./views/View_list.vue') }
  { path: '/room', name: 'Room', component: () => import('./views/Room.vue') },
  { path: '/view/:detail', name: 'Detail', component: () => import('./views/Detail.vue') }
]

const router = createRouter({ history: createWebHashHistory(), routes })

export default router
