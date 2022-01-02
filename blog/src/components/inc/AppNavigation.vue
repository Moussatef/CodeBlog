<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"></router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <div v-if="!isLogged">
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'Login' }"
              >Login</router-link
            >
            <router-link class="link" :to="{ name: 'Register' }"
              >Register</router-link
            >
          </div>
          <div v-else>
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'Blogs' }"
              >Blogs</router-link
            >
            <router-link class="link" :to="{ name: 'CreateBlog' }"
              >Crate Blog</router-link
            >
          </div>
        </ul>

        <div v-if="isLogged" class="profile" @click="toggleMenu" ref="profile">
          <span>MS</span>
          <div class="profile-menu" v-show="profileMenu">
            <div class="info">
              <p class="initials">MS</p>
              <div class="right">
                <p>Moussatef Othman</p>
                <p>Othman.moussatef@gmail.com</p>
                <p></p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Dashboard' }">
                  <userIcon class="icon" />
                  <p>Dashboard</p>
                </router-link>
              </div>
              <div @click="logout()" class="option">
                <span class="option">
                  <signOutIcon class="icon" />
                  <p>Sign Out</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon
      @click="mobileNav = !mobileNav"
      v-show="mobile"
      class="menu-icon"
    />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>

        <div v-if="!isLogged">
          <router-link class="link" :to="{ name: 'CreateBlog' }"
            >Login</router-link
          >
          <router-link class="link" :to="{ name: 'CreateBlog' }"
            >Register</router-link
          >
        </div>
        <div v-else>
          <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link class="link" :to="{ name: 'CreateBlog' }"
            >Crate Blog</router-link
          >
        </div>
      </ul>
    </transition>
  </header>
</template>

<script>
import menuIcon from "../../assets/Icons/bars-regular.svg";
import userIcon from "../../assets/Icons/user-crown-light.svg";
import signOutIcon from "../../assets/Icons/sign-out-alt-regular.svg";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "AppNavigation",
  components: {
    menuIcon,
    userIcon,
    signOutIcon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      profileMenu: false,
      isLogged: false,
      currentUser: false,
    };
  },
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

    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },

    toggleMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("Sign-out successful.");
        })
        .catch((error) => {
          // An error happened.
          console.log("An error happened. " + error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }
  nav {
    display: flex;
    padding: 35px 0;

    .branding {
      display: flex;
      align-items: center;
      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }
    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }
        .link:last-child {
          margin-right: 0;
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 16px 12px;
            border-bottom: 1px solid #fff;
            background-color: #303030 !important;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              color: #303030;
              background-color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }
            .right {
              flex: 1;
              margin-left: 14px;
              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }
          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              .icon {
                width: 18px;
                height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }
  .mobile-nav-enter {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0);
  }
  .mobile-nav-leave {
    transform: translateX(0);
  }
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>