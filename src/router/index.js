import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue' 
import Layout from '../views/Layout.vue' 
import login from '../views/Login.vue'
import Add from '../views/Add.vue'
import Home from '../views/Home.vue'
import Update from '../views/Update.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/Home',
    children: [
      {
        path: 'home',
        name: '/Home',
        component:Home
      },
      {
        path: 'add',
        name: '/add',
        component:Add
      },
      {
        path: 'update',
        name: '/update',
        component:Update
      }
    ]
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
