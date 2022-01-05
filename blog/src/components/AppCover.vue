<template>
  <div class="container">
    <div v-if="auth_User" class="card_info d-flex flex-wrap">
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

          <v-carousel
            v-if="blog.media_url.length > 0"
            height="250"
            class="img"
            :show-arrows="false"
          >
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
          <v-img v-else height="250" src="@/assets/blogPhotos/blc.png"></v-img>

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
              <v-btn
                @click="
                  blog_ToUpdate = blog;
                  dialog_update = true;
                "
                class=""
                color="primary"
                fab
                small
                dark
              >
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
        <h4 class="not-margin">Message <b>Success</b></h4>
      </template>

      <div class="con-content">
        <p>{{ message_success }}</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button
            @click="
              active_remove = false;
              dialog_update = false;
            "
            transparent
          >
            Ok
          </vs-button>
        </div>
      </template>
    </vs-dialog>

    <!-- apdate blog dialog -->
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialog_update"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card v-if="blog_ToUpdate">
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog_update = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Update Blog Content</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="updateBlog(blog_ToUpdate)">
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
              <v-subheader>BLog Content</v-subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="my-3">Blog Title</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-text-field
                      v-model="blog_ToUpdate.title"
                      label="Blog Title*"
                      required
                    ></v-text-field>
                  </v-list-item-subtitle>

                  <v-list-item-subtitle>
                    <div class="editor">
                      <vue-editor
                        :editorOptions="editorSettings"
                        v-model="blog_ToUpdate.description"
                        useCustomImageHandler
                        @image-added="imageHandler"
                      />
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>


<script>
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { mapActions, mapGetters } from "vuex";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "Home",
  data() {
    return {
      message_success: null,
      dialog_update: false,
      loading: false,
      active_remove: false,
      active_confirmation: false,
      blog_delete_id: null,
      blog_ToUpdate: null,
      message_err: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
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

    updateBlog(blog) {
      if (blog.title.length > 0 && blog.description.length > 0) {
        this.$store
          .dispatch("updateBlog", blog)
          .then((result) => {
            console.log(result);
            this.message_success = "Bloge updated with success!";
            this.active_remove = true;
          })
          .catch((error) => {
            this.message_err = error;
            this.dialog_update = false;
          });
      }
    },

    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        "blogeMedia/" + Date.now() + "_" + file.name
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          // console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case "paused":
              // console.log('Upload is paused');
              break;
            case "running":
              // console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        () =>
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              // console.log('File available at ', downloadURL);
              // console.log(uploadTask.snapshot.ref.fullPath);
              const info = {
                path: uploadTask.snapshot.ref.fullPath,
                url: downloadURL,
              };

              Editor.insertEmbed(cursorLocation, "image", downloadURL);
              resetUploader();
            })
            .catch((error) => {
              console.log(error);
            })
      );
    },

    removeBlog(id) {
      if (id) {
        this.message_err = null;
        this.$store
          .dispatch("deleteBlog", id)
          .then(() => {
            this.message_success = "Bloge removed with success!";
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
          // console.log(error);
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
          // console.log(error);
          this.message_err = error;
        });
    },
  },
  beforeMount() {
    this.getBlogsUser();
    this.getdata();
  },
};
</script>

<style lang="scss" scoped>
.card_info {
  display: flex;
  margin-top: 40px;
  flex-wrap: wrap;
  justify-content: center;

  .item_img {
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
      margin-top: 50px;
      @media screen and (max-width: 500px) {
        text-align: center;
        margin-top: 20px;
      }
    }
    .item_follow {
      margin-top: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      @media screen and (max-width: 500px) {
        margin-top: 20px;
      }

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