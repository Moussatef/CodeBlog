import Vue from 'vue'
import Vuex from 'vuex'
import {
  doc,
  setDoc,
  Timestamp,
  getFirestore,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";



import user from './models/user';
import blog from './models/blog';
import media from './models/media';
import auth from './models/auth';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  getters: {},

  mutations: {},

  actions: {
    async sendData() {
      const db = getFirestore();

      return new Promise((resolve, reject) => {
        setDoc(doc(db, "cities", "LA"), {
          name: "Los Angeles",
          state: "CA",
          country: "USA"
        }).then(
          response => {

            // consoled for testing
            console.log(response);
            resolve(response)
          }
        ).catch(error => reject(error));
      })
    },
  },
  modules: {
    user,
    blog,
    media,
    auth,
  }
})