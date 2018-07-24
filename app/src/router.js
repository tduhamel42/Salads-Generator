import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Api from './views/Api.vue'
import Salades from './views/Salades.vue'
import Generator from './views/Generator.vue'
import User from './views/User.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home/:id?',
      name: 'home',
      component: Home
    },
    {
      path: '/generator',
      name: 'generator',
      component: Generator
    },
    {
      path: '/api',
      name: 'api',
      component: Api
    },
    {
      path: '/salades',
      name: 'salades',
      component: Salades
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
