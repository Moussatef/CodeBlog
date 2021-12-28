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


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth_User: null
  },
  getters: {
    auth_User: state => state.auth_User,


  },
  mutations: {

    setUser: (state, user) => (state.auth_User = user),

  },
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

            console.log(user.uid);
            resolve(user.uid)

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
      const db = getFirestore();

      return new Promise((resolve, reject) => {
        setDoc(doc(db, "users", data.id), {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          user_id: data.id
        }).then(
          response => {

            // consoled for testing
            console.log(response);
            resolve(response)
          }
        ).catch(error => reject("error"));
      })

    },

    async getUserInfo({
      commit
    }) {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);

      return new Promise((resolve, reject) => {
        getDoc(docRef).then(
          response => {
            const u_data = response.data()
            commit("setUser", u_data)
            // console.log(u_data)
            resolve(response)
          }
        ).catch(error => reject(error));

      })
    }

  },
  modules: {}
})