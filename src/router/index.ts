import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'
import { useUserStore } from '@/store/user'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LandingView,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && localStorage.getItem('token')===null) {
      next({ name: 'Login' })
  }
  else if(to.name === 'Login' && localStorage.getItem('token')!==null){
    next({ name: 'Home' })
  }
  next();
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth) && isLoggedIn()==='') {
//       next({ name: 'Login' })
//   }
//   if (to.name === 'Login' && isLoggedIn()!=='') {
//     next({ name: 'Home' })
//   }
//   next() // go to wherever I'm going

// })
export default router
