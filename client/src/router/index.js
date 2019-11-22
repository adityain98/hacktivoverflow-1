import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/question/:id',
    name: 'question',
    component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue')
  },
  {
    path: '/ask',
    name: 'ask',
    component: () => import(/* webpackChunkName: "askQuestion" */ '../views/AskQuestion.vue'),
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('token')){
        console.log(localStorage.getItem('token'))
        next()
      }
      else{
        console.log(localStorage.getItem('token'))
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
