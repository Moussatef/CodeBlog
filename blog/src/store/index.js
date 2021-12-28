import Vue from 'vue'
import Vuex from 'vuex'
import {
  doc,
  setDoc,
  Timestamp,
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {

    async sendData() {
      const db = getFirestore();

      return new Promise((resolve, reject) => {
        addDoc(collection(db, "cities"), {
          name: "Tokyo",
          country: "Japan"
        }).then(
          response => {

            // consoled for testing
            console.log(response);
            resolve(response)
          }
        ).catch(error => reject(error));
      })
    },

    async registerByEmailPassword({
      commit
    }, param) {
      console.log(param.email);
      const auth = getAuth();
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, param.email, param.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            resolve(userCredential.user)

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(errorMessage)

          });
      })
    },

    async createUser({
      commit
    }, data) {

      return new Promise((resolve, reject) => {
        addDoc(collection(db, "users", data.id), {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          id: data.id
        }).then(
          response => {

            // consoled for testing
            console.log(response);
            resolve(response)
          }
        ).catch(error => reject(error));
      })

    }

  },
  modules: {}
})