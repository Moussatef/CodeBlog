const state = {

}

const getters = {

}

const actions = {
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

}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}