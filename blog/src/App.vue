<template>
  <v-app>
    <AppNavogation />
    <!-- <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item
      >
    </el-menu> -->

    <v-main>
      <!-- <v-overlay :value="uploading_data">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay> -->
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import AppNavogation from "@/components/inc/AppNavigation.vue";
import AppFooter from "@/components/inc/AppFooter.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "App",
  components: {
    AppNavogation,
    AppFooter,
  },

  data: () => ({
    activeIndex2: "1",
    user: {
      uploading_data: false,
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
  }),
  methods: {
    // ...mapActions(["getUserInfo"]),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getUserInfo() {
      this.uploading_data = false;
      this.$store
        .dispatch("getUserInfo")
        .then((result) => {
          console.log(result);
          // this.uploading_data = false;
        })
        .catch((error) => {
          console.log(error);
          // this.uploading_data = false;
        });
    },
  },
  computed: {
    // ...mapGetters([]),
  },
  created() {
    this.getUserInfo();
  },
};
</script>


<style lang="scss" >
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
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

.vs-dialog {
  min-width: 700px !important;
  max-width: 500px !important;
}
.vs-input {
  width: 100% !important;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}
.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}
.arrow-light {
  path {
    fill: #fff;
  }
}
.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }
  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
