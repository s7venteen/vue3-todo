import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import AllTodo from '@/components/TodoItem.vue'
import ActiveTodo from '@/components/TodoItem.vue'
import CompletedTodo from '@/components/TodoItem.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/all',
      component: AllTodo
    },
    {
      path: '/active',
      component: ActiveTodo
    },
    {
      path: '/completed',
      component: CompletedTodo
    },
    {
      path: '/',
      redirect: '/all'
    }
  ] as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
