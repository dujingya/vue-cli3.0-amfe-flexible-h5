/*
 * @Description: 路由管理表
 * @Autor: zhan
 * @Date: 2019-08-02 15:51:47
 * @LastEditors: zhan
 * @LastEditTime: 2020-03-12 14:11:51
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/register',    
    component: () => import('./views/register/index')
  },
  {
    path: '/register', 
    component: () => import('./views/register/index')
  },
  {
    path: '/user',
    component: () => import('./views/user/index')
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()


export default router
