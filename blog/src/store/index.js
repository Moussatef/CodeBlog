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
  state: {

    blog_progression: null,
  },
  getters: {

    blog_progression: state => state.blog_progression,


  },
  mutations: {



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







    async createBlogProgression({
      commit
    }, data) {
      const db = getFirestore();


      localStorage.setItem("blogProgression", data);
      let test = localStorage.getItem("blogProgression")
      console.log(test);

      // return new Promise((resolve, reject) => {
      console.log(data);
      setDoc(doc(db, "blogProgression", data.id), {
        title: data.title,
        description: data.description,
        user_id: data.id,
        submit: false,
        nb_media: data.files.length
        // file_info: [table_fale]
      }).then(
        response => {
          // consoled for testing
          console.log(response);
          // resolve(response)
        }
      ).catch(error => {

        console.log(error);

        // reject("error")
      });
      // })
    },

  },
  modules: {
    user,
    blog,
    media,
    auth,
  }
})