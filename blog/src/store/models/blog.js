import {
    doc,
    setDoc,
    Timestamp,
    serverTimestamp,
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

        let data_url = new FormData();
        let cmp = 1
        console.log(data.media);

        return new Promise((resolve, reject) => {
            setDoc(doc(db, "blogProgression", data.id), {
                title: data.title,
                description: data.description,
                user_id: data.id,
                submit: false,
                nb_media: data.files.length,
                Timestamp: serverTimestamp(),
                // media_url: data_url
            }).then(
                response => {
                    // consoled for testing
                    console.log(response);
                    resolve(response)
                }
            ).catch(error => {

                console.log(error);

                reject("error")
            });
        })
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