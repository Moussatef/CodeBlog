<template>
  <v-app>
    <v-app-bar id="mynavi" app color="">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h1>BLOG</h1>
      </div>

      <v-spacer></v-spacer>

      <div v-if="!isLogged">
        <router-link class="mr-6 fs-5" color="primary" to="/login"
          >Login</router-link
        >
        <router-link class="mr-6 fs-5" color="primary" to="/register"
          >Register</router-link
        >
      </div>
      <div v-else>
        <router-link class="mr-6 fs-5" color="primary" to="/">Blog</router-link>
        <router-link class="mr-6 fs-5" color="primary" to="/dashboard"
          >Dashboard</router-link
        >
        <router-link class="mr-6 fs-5" color="primary" to="/logout"
          >Logout</router-link
        >
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "App",

  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // console.log(uid);
        this.isLogged = true;
        this.currentUser = user.email;
      } else {
        this.isLogged = false;
        this.currentUser = false;
      }
    });
  },
  data: () => ({
    isLogged: false,
    currentUser: false,
    //
  }),
  methods: {
    ...mapActions([""]),
    // logoutEvent() {
    //   const auth = getAuth();
    //   signOut(auth)
    //     .then(() => {
    //       // Sign-out successful.
    //     })
    //     .catch((error) => {
    //       // An error happened.
    //     });
    // },
  },
};
</script>


<style lang="scss" scoped>
#mynavi a {
  color: #444444;
  text-decoration: none;
  font-size: 18px;
  // transition: 200ms;
  &.router-link-exact-active {
    color: #238a91;
    border-bottom: 2px solid #238a91;
    // transition: 200ms;
  }
}
</style>
