import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {
  initializeApp
} from "firebase/app";

import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'normalize.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const firebaseConfig = {

  apiKey: "AIzaSyDd8JVpuZWgtEv4r97N3qe_TrbcHOfbjhs",

  authDomain: "blog-video-feadd.firebaseapp.com",

  databaseURL: "https://blog-video-feadd-default-rtdb.firebaseio.com",

  projectId: "blog-video-feadd",

  storageBucket: "blog-video-feadd.appspot.com",

  messagingSenderId: "630822024405",

  appId: "1:630822024405:web:94fd156abc79b59a0fde5c"

};

const app = initializeApp(firebaseConfig);

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')