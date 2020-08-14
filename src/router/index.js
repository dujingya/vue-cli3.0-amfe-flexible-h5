import Vue from 'vue'
import Router from 'vue-router'
import notFound from '../views/404.vue'
import index from '../views/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'index'}
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        notRequireAuth: true,
        isBack: false
      }
    },
    // {
    //   path: '/report',
    //   name: 'report',
    //   component: report,
    //   meta: { notRequireAuth: true }
    // },
    {
      path: '*',
      name: 'notFound',
      component: notFound,
      meta: { notRequireAuth: true }
    }
  ]
})
