import {
    initializeApp
} from "firebase/app";

import "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyDd8JVpuZWgtEv4r97N3qe_TrbcHOfbjhs",

    authDomain: "blog-video-feadd.firebaseapp.com",

    databaseURL: "https://blog-video-feadd-default-rtdb.firebaseio.com",

    projectId: "blog-video-feadd",

    storageBucket: "blog-video-feadd.appspot.com",

    messagingSenderId: "630822024405",

    appId: "1:630822024405:web:94fd156abc79b59a0fde5c"


};

const app = initializeApp(firebaseConfig);