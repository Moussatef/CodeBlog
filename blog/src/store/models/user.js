import {
    doc,
    setDoc,
    getFirestore,
    getDoc,
} from "firebase/firestore";
import {
    getAuth,
} from "firebase/auth";

const state = {
    auth_User: null,


}

const getters = {
    auth_User: state => state.auth_User,
}

const actions = {
    createUser({
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
            ).catch(error => reject(error));
        })

    },
    getUserInfo({
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
    },

}

const mutations = {
    setUser: (state, user) => (state.auth_User = user),

}

export default {
    state,
    getters,
    actions,
    mutations
}