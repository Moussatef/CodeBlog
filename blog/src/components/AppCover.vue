<template>
  <div class="container">
    <div v-if="auth_User" class="card_info">
      <div class="item_img">
        <img
          id="avatar"
          src="@/assets/pic/pr2.png"
          alt=""
          width="200px"
          height="200px"
        />
        <h6 id="fullname">
          {{ auth_User.first_name }} {{ auth_User.last_name }}
        </h6>
        <hr />

        <p id="bio"></p>
        <div class="media">
          <p id="place">Email : {{ auth_User.email }}</p>
          <p id="twitter"></p>
          <p id="blog"></p>
        </div>
      </div>
      <div class="item_info">
        <div class="username">
          <h2 id="username">
            {{ auth_User.first_name }} {{ auth_User.last_name }}
          </h2>
        </div>

        <div class="item_follow">
          <span id="followers" class="item_f">followers : 30 K</span>

          <span id="following" class="item_f">following : 25 K</span>

          <span id="NB_repos" v-if="blogs_user" class="item_f"
            >Blogs : {{ blogs_user.length }}</span
          >
        </div>
      </div>
    </div>
    <vs-alert v-show="message_err" color="danger">
      <template #title> Something went wrong</template>
      {{ message_err }}
    </vs-alert>
    <div v-if="blogs_user" class="d-flex flex-wrap justify-content-evenly">
      <div v-for="(blog, bl) in blogs_user" :key="bl">
        <v-card
          :loading="loading"
          class="mx-auto my-12"
          max-width="374"
          width="374"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-carousel height="250" class="img" :show-arrows="false">
            <v-carousel-item
              class="text-center"
              v-for="(video, index) in blog.media_url"
              :key="index"
            >
              <Media
                :kind="'video'"
                :controls="true"
                :src="[video.URL]"
                :style="{ width: '100%', height: '200px' }"
              >
              </Media
            ></v-carousel-item>
          </v-carousel>

          <v-card-title>{{ blog.title }}</v-card-title>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>Created at : {{ blog.created_at }}</v-card-text>

          <v-card-actions>
            <router-link
              class="link"
              :to="{
                name: 'BlogPreview',
                params: { id: blog.blogID },
              }"
              ><v-btn color="deep-purple lighten-2" text>
                View Blog
              </v-btn></router-link
            >
          </v-card-actions>
          <v-card-text style="height: 80px; position: relative">
            <v-fab-transition> </v-fab-transition>
            <div class="my-2">
              <v-btn class="" color="primary" fab small dark>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                class="ma-2"
                @click="
                  active_confirmation = true;
                  blog_delete_id = blog.blogID;
                "
                color="red"
                dark
              >
                Delete
                <v-icon dark right> mdi-cancel </v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <!-- Dialog confirmation delete -->
    <vs-dialog
      width="550px"
      prevent-close
      not-center
      v-model="active_confirmation"
    >
      <template #header>
        <h4 class="not-margin">Confirmation for <b>Delete</b></h4>
      </template>

      <div class="con-content">
        <p>Are you sure you want to delete this blog</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="removeBlog(blog_delete_id)" transparent>
            Ok
          </vs-button>
          <vs-button @click="active_confirmation = false" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <!--  dialog message finish delete blog -->
    <vs-dialog width="550px" not-center v-model="active_remove">
      <template #header>
        <h4 class="not-margin">Welcome to <b>Vuesax</b></h4>
      </template>

      <div class="con-content">
        <p>Bloge removed from with success!</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="active_remove = false" transparent> Ok </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getAuth } from "firebase/auth";

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      active_remove: false,
      active_confirmation: false,
      blog_delete_id: null,
      message_err: null,
    };
  },
  computed: {
    ...mapGetters(["auth_User", "blogs_user"]),
  },
  components: {},
  methods: {
    ...mapActions([
      "sendData",
      "getUserInfo",
      "userBlogsFilter",
      "getBlogSubmited",
    ]),

    removeBlog(id) {
      if (id) {
        this.message_err = null;
        this.$store
          .dispatch("deleteBlog", id)
          .then(() => {
            this.active_remove = true;
            this.active_confirmation = false;
          })
          .catch((error) => {
            console.log(error);
            this.message_err = error;
          });
      }
    },

    async getdata() {
      this.message_err = null;
      this.$store
        .dispatch("getUserInfo")
        .then((res) => {
          const docSnap = res;

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const user_data = docSnap.data();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log(error);
          this.message_err = error;
        });
    },

    getBlogsUser() {
      this.message_err = null;
      this.$store
        .dispatch("getBlogSubmited")
        .then((res) => {
          this.userBlogsFilter(this.auth_User.user_id);
          // console.log(this.blogs_user);
        })
        .catch((error) => {
          console.log(error);
          this.message_err = error;
        });
    },
  },
  created() {
    this.getBlogsUser();
    this.getdata();
  },
};
</script>

<style lang="scss" scoped>
.card_info {
  width: 110%;
  display: flex;
  margin-top: 40px;
  flex-wrap: wrap;
  justify-content: center;

  .item_img {
    width: 30%;
    text-align: center;
    align-items: center;
    #avatar {
      border-radius: 50%;
    }
    h6 {
      font-size: 24px;
      box-sizing: border-box;
      margin-bottom: 3px;
    }
    hr {
      border-bottom: 1px solid rgb(97, 97, 97);
      margin: 3px;
    }
  }
  .item_info {
    width: 70%;

    .username {
      margin: 50px 50px 30px 50px;
    }
    .item_follow {
      margin: 10px 50px 50px 100px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

      .item_f {
        margin-left: 10px;
        margin-right: 30px;
        font-size: 25px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }
    }
  }
}
</style>