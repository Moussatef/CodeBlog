import {
    getAuth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword
} from "firebase/auth";

const state = {

}

const getters = {

}

const actions = {
    registerByEmailPassword({
        commit
    }, param) {

        console.log(param.email);
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, param.email, param.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;

                    console.log(user);
                    resolve(user.uid)

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject(errorMessage)

                });
        })
    },

    authenticateByEmailAndPassword({
        commit
    }, param) {

        console.log(param.email);
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, param.email, param.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;

                    console.log(user.accessToken);
                    localStorage.setItem('accessToken', accessToken)
                    resolve(user.uid)

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject(errorMessage)

                });
        })
    },
    resetPassword({
        commit
    }, param) {

        console.log(param.email);
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            sendPasswordResetEmail(auth, param.email)
                .then(() => {
                    // sendPasswordResetEmail
                    console.log("email sent");
                    resolve("ok")

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