import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {
  initializeApp
} from "firebase/app";
import {
  getStorage
} from "firebase/storage";
import {
  getFirestore
} from "firebase/firestore";


import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'normalize.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

const firebaseConfig = {

  apiKey: "AIzaSyDd8JVpuZWgtEv4r97N3qe_TrbcHOfbjhs",

  authDomain: "blog-video-feadd.firebaseapp.com",

  databaseURL: "https://blog-video-feadd-default-rtdb.firebaseio.com",

  projectId: "blog-video-feadd",

  storageBucket: "blog-video-feadd.appspot.com",

  messagingSenderId: "630822024405",

  appId: "1:630822024405:web:94fd156abc79b59a0fde5c"


};


// Initialize Firebase

const app = initializeApp(firebaseConfig);




// Use the shorthand notation to access the default project's Firebase services
const defaultStorage = getStorage();




Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')