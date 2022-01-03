import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import CreateBlog from '../views/CreateBlog.vue'
import Dashboard from '../views/Dashboard.vue'
import Blogs from '../views/Blogs.vue'
import BlogPreview from '../views/BlogPreview.vue'
import {
  getAuth
} from "firebase/auth";

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home",
    }

  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,

    beforeEnter: (to, from, next) => {
      getAuth().onAuthStateChanged((user) => {
        if (!user) {
          next('/login');
        } else {
          next();
        }
      })
    },
    meta: {
      title: "Dashboard",
    }

  },
  {
    path: '/blog-view/:id',
    name: 'BlogPreview',
    component: BlogPreview,
    meta: {
      title: "Blog-View",
    }

  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,

    beforeEnter: (to, from, next) => {
      getAuth().onAuthStateChanged((user) => {
        if (!user) {
          next('/login');
        } else {
          next();
        }
      })
    },
    meta: {
      title: "Blogs",
    }

  },
  {
    path: '/create-blog',
    name: 'CreateBlog',
    component: CreateBlog,

    beforeEnter: (to, from, next) => {
      getAuth().onAuthStateChanged((user) => {
        if (!user) {
          next('/login');
        } else {
          next();
        }
      })
    },
    meta: {
      title: "Create Blog",
    }

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
    },
    meta: {
      title: "Register",
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
    },
    meta: {
      title: "Login",
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
// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title} | CodeBlogs`
// })



export default router