import {
    doc,
    setDoc,
    Timestamp,
    serverTimestamp,
    getFirestore,
    collection,
    addDoc,
    getDoc,
    updateDoc,
    query,
    where,
    getDocs,
    deleteDoc
} from "firebase/firestore";

const state = {
    blog_progression: [],
    blog_submited: [],
    blog_filter: null,
    blogs_user: null,

}

const getters = {
    blog_progression: state => state.blog_progression,
    blog_submited: state => state.blog_submited,
    blog_filter: state => state.blog_filter,
    blogs_user: state => state.blogs_user,

}

const actions = {
    createBlogProgression({
        commit
    }, data) {
        const db = getFirestore();
        console.log(data);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        return new Promise((resolve, reject) => {
            setDoc(doc(db, "blogProgression", data.id), {
                title: data.title,
                description: data.description,
                user_id: data.id,
                submit: false,
                nb_media: data.files.length,
                Timestamp: serverTimestamp(),
                created_at: dateTime,
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
    submitBlog({
        commit
    }, data) {
        const db = getFirestore();
        console.log(data);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;


        return new Promise((resolve, reject) => {
            const newBlog = doc(collection(db, "blogSubmited"));
            const blog = {
                blogID: newBlog.id,
                title: data.title,
                description: data.description,
                user_id: data.id,
                nb_media: data.files,
                submet: true,
                Timestamp: serverTimestamp(),
                created_at: dateTime,
                media_url: data.media
            }
            setDoc(newBlog, blog).then(
                response => {

                    const progressionRef = doc(db, "blogProgression", data.id);

                    // Set the "submit" field of the blogProgression true
                    updateDoc(progressionRef, {
                        submit: true
                    }).then(() => {
                        commit("updateSubmitFilde")
                        resolve(response)
                    });
                    commit("addBlogSubmited", blog)
                    // consoled for testing
                    console.log(response);

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
                    const data = result.data()
                    commit("addProgresBlog", data)
                    resolve(data)

                }
            ).catch(error => {
                console.log(error);
                reject(error)
            })

        })
    },
    async getBlogSubmited({
        commit
    }) {
        const db = getFirestore();
        let blogTable = []
        // const docRef = collection(db, "blogSubmited");
        const querySnapshot = await getDocs(collection(db, "blogSubmited"));
        querySnapshot

        return new Promise((resolve, reject) => {
            getDocs(collection(db, "blogSubmited")).then(
                result => {
                    result.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        const blogInfo = doc.data()
                        blogTable.push(blogInfo)
                    });
                    commit("setAllBlogs", blogTable)
                    resolve(blogTable)
                }
            ).catch(error => {
                // console.log(error);
                reject(error)
            })

        })
    },

    async filterBlog({
        commit
    }, id) {

        const blogf = await state.blog_submited.filter((result) => {
            return result.blogID === id;
        });
        commit("filterBlog", blogf)
        // console.log(blogf);
    },

    async userBlogsFilter({
        commit
    }, id) {

        const blogf = await state.blog_submited.filter((result) => {
            return result.user_id === id;
        });
        commit("userBlogs", blogf)
        // console.log(blogf);

    },

    deleteBlog({
        commit
    }, id) {
        const db = getFirestore();
        return new Promise((resolve, reject) => {
            deleteDoc(doc(db, "blogSubmited", id)).then(
                result => {
                    console.log(result);
                    commit("removeBlog", id)
                    resolve(result)
                }
            ).catch(error => {
                console.log(error);
                reject(error)
            })

        })
    },

    updateBlog({
        commit
    }, data) {
        const db = getFirestore();
        const blog = {
            blogID: data.id,
            title: data.title,
            description: data.description,
        }

        const documentRef = doc(db, "blogSubmited", data.blogID);

        return new Promise((resolve, reject) => {
            updateDoc(documentRef, {
                title: data.title,
                description: data.description,
            }).then(
                result => {
                    console.log(result);
                    commit("updateBlog", data)
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

    setAllBlogs: (state, data) => (state.blog_submited = data),
    addProgresBlog: (state, data) => (state.blog_progression = data),
    addBlogSubmited: (state, data) => (state.blog_submited.push(data)),
    updateSubmitFilde: (state) => state.blog_progression.submit = true,
    filterBlog: (state, data) => (state.blog_filter = data[0]),
    userBlogs: (state, data) => (state.blogs_user = data),
    removeBlog: (state, data) => {
        state.blog_submited.splice(state.blog_submited.indexOf(el => el.blogID == data), 1)
        state.blogs_user.splice(state.blog_submited.indexOf(el => el.blogID == data), 1)

    },

    updateBlog: (state, data) => {
        state.blog_submited.splice(state.blog_submited.indexOf(el => el.blogID == data.blogID), 1, data)
        state.blogs_user.splice(state.blog_submited.indexOf(el => el.blogID == data.blogID), 1, data)

    }
    // state.postsProblem.splice(state.postsProblem.findIndex(el => el.id == putPost.id), 1, putPost);
}

export default {
    state,
    getters,
    actions,
    mutations
}