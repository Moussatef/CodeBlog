import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,

    beforeEnter: (to, from, next) => {
      getAuth().onAuthStateChanged((user) => {
        if (!user) {
          next('/login');
        } else {
          next();
        }
      })
    },

  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          next('/');
        } else {
          next();
        }
      })
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          next('/');
        } else {
          next();
        }
      })
    }

  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter: (to, from, next) => {
      getAuth().onAuthStateChanged((user) => {
        if (!user) {
          next('/login');
        } else {
          next();
        }
      })
    }

  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue'),
    beforeEnter: (to, from, next) => {
      getAuth().onAuthStateChanged((user) => {
        if (!user) {
          next('/login');
        } else {
          next();
        }
      })
    }

  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router