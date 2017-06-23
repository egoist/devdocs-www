import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default () => {
  const router = new Router({
    mode: 'history',
    routes: [{
      path: '/',
      component: () => import('../views/Home.vue')
    }]
  })

  return router
}
