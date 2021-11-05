import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/:catchAll(.*)', redirect: '/' },
  { path: '/', name: 'Home', component: () => import('./views/Home.vue') },
  { path: '/:category', name: 'Category', component: () => import('./views/Category.vue') },
  // { path: '/view_list', name: 'View_list', component: () => import('./views/View_list.vue') },
  { path: '/detail/:detail', name: 'Detail', component: () => import('./views/Detail.vue') }
]

const router = createRouter({ history: createWebHashHistory(), routes })

export default router
