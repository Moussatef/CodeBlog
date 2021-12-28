import Vue from 'vue'
import Vuex from 'vuex'
import {
  doc,
  setDoc,
  Timestamp,
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";


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



      // console.log("Document written with ID: ", docRef.id);



    },

    async registerByEmailPassword(data) {
      const auth = getAuth();
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            resolve(userCredential.user)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(errorMessage)
            // ..
          });
      })
    },

    async createUser(data) {

      return new Promise((resolve, reject) => {
        addDoc(collection(db, "cities"), {
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