import {
    doc,
    setDoc,
    Timestamp,
    getFirestore,
    collection,
    addDoc,
    getDoc,
} from "firebase/firestore";

const state = {
    blog_progression: [],

}

const getters = {
    blog_progression: state => state.blog_progression,

}

const actions = {
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

}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}