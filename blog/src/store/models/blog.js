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
    createBlogProgression({
        commit
    }, data) {
        const db = getFirestore();
        console.log(data);

        return new Promise((resolve, reject) => {
            setDoc(doc(db, "blogProgression", data.id), {
                title: data.title,
                description: data.description,
                user_id: data.id,
                submit: false,
                nb_media: data.files.length,
                Timestamp: serverTimestamp(),
                media_url: data.media
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

    getBlogProgression({
        commit
    }, id) {
        const db = getFirestore();
        const docRef = doc(db, "blogProgression", id);

        return new Promise((resolve, reject) => {
            getDoc(docRef).then(
                result => {
                    console.log(result.data());
                    commit("addProgresBlog", result.data())
                    resolve(result)

                }
            ).catch(error => {
                console.log(error);
                reject(error)
            })

        })
    }

}

const mutations = {
    addProgresBlog: (state, data) => (state.blog_progression = data)

}

export default {
    state,
    getters,
    actions,
    mutations
}