<template>
  <div class="create-post">
    <div class="about">
      <h1>This is an about page</h1>
      <v-overlay :value="uploading_data">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <div class="m-3">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              Name of step 1
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Name of step 2
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12" color="white lighten-1">
                <v-row align="center" justify="center">
                  <v-col cols="12">
                    <v-hover v-slot="{ hover }" disabled>
                      <v-card :elevation="hover ? 12 : 2" class="mx-auto">
                        <v-card-text class="my-4 text-center text-h6">
                          NEW BLOG
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="title"
                                label="Blog title"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                              <div class="editor">
                                <vue-editor
                                  :editorOptions="editorSettings"
                                  v-model="description"
                                  useCustomImageHandler
                                  @image-added="imageHandler"
                                />
                              </div>
                            </v-col>
                            <v-col cols="12" md="12" class="mb-4">
                              <v-file-input
                                v-model="files"
                                accept=".mp4"
                                class="w-100"
                                color="deep-purple accent-4"
                                counter
                                label="File input"
                                multiple
                                placeholder="Select your files"
                                prepend-icon="mdi-paperclip"
                                outlined
                                :show-size="1000"
                              >
                                <template v-slot:selection="{ index, text }">
                                  <v-chip
                                    v-if="index < 3"
                                    color="deep-purple accent-4"
                                    dark
                                    label
                                    small
                                  >
                                    {{ text }}
                                  </v-chip>

                                  <span
                                    v-else-if="index === 3"
                                    class="
                                      text-overline
                                      grey--text
                                      text--darken-3
                                      mx-2
                                    "
                                  >
                                    +{{ files.length - 2 }} File(s)
                                  </span>
                                </template>
                              </v-file-input>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </v-card>

              <v-btn color="primary" @click="testUploadFile()">
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card v-if="blog_progression" class="mb-12" color="white">
                <h5>Blog Content</h5>
                <div>
                  <h6>Title : {{ blog_progression.title }}</h6>
                  <h6>Description :</h6>
                  <div
                    class="post-content"
                    v-html="blog_progression.description"
                  ></div>
                </div>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-col
                    v-for="(card, index) in blog_progression.media_url"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-card>
                      <!-- <v-img :src="card.URL" height="300px">
                        <span
                          class="text-h5 white--text pl-4 pt-4 d-inline-block"
                          text="TEST"
                        ></span>
                      </v-img> -->

                      <div>
                        <Media
                          :kind="'video'"
                          :controls="true"
                          :src="[card.URL]"
                          :style="{ width: '500px' }"
                        >
                        </Media>
                      </div>

                      <v-card-actions class="white justify-center">
                        <v-btn
                          v-if="blog_progression.media_url.length > 1"
                          color="indigo"
                          class="white--text"
                          fab
                          icon
                          small
                        >
                          <i class="bi bi-trash"></i>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>

              <v-btn
                @click="
                  blogSubmiting(
                    blog_progression.title,
                    blog_progression.description,
                    blog_progression.user_id,
                    blog_progression.media_url,
                    blog_progression.nb_media
                  )
                "
                color="primary"
              >
                submit
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>

      <v-row justify="center">
        <v-dialog v-model="dialog_loading" persistent max-width="590">
          <v-card>
            <v-card-title class="text-h5">
              Uploading File NB : {{ cmp }}
            </v-card-title>
            <v-card-text class="text-center">
              <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="progress_upload"
                color="teal"
              >
                {{ parseInt(progress_upload) }} %
              </v-progress-circular>

              .</v-card-text
            >

            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="green darken-1" text @click="dialog_loading = false">
              Cancel upload
            </v-btn>
            <v-btn color="green darken-1" text @click="stopUpload">
              Pause upload
            </v-btn> -->

              <v-btn
                color="green darken-1"
                text
                @click="dialog_loading = false"
              >
                Close and continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="490">
          <v-card>
            <v-card-title class="text-h5"> Messgae Success. </v-card-title>

            <v-card-text> File successfully uploaded ! </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="goSubmetBlog()">
                Go To Step 2
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- dialog confirm submit -->
      <vs-dialog width="550px" not-center v-model="active_submission">
        <template #header>
          <h4 class="not-margin">Message <b>Success</b></h4>
        </template>

        <div class="con-content">
          <p>Submited successfully</p>
        </div>

        <template #footer>
          <div class="con-footer">
            <vs-button @click="redirectBlog" transparent> Ok </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Media from "@dongido/vue-viaudio";
import { mapActions, mapGetters } from "vuex";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "AppCreateBlog",
  components: {
    Media,
  },
  data() {
    return {
      active_submission: false,
      uploading_data: false,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      dialog: false,
      dialog_loading: false,

      loader: null,
      overlay: false,

      loading3: false,

      interval: {},
      value: 0,

      e1: 1,

      title: null,
      description: null,
      files: [],
      cmp: 1,
      url_media: [],
      blogTitle: undefined,
      blogHTML: undefined,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  methods: {
    ...mapActions(["getUserInfo", "createBlogProgression", "stopUpload"]),

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
    open1() {
      const h = this.$createElement;

      this.$notify({
        title: "Successfull upmoad",
        message: h(
          "i",
          { style: "color: teal" },
          "This is a reminder File nb " + this.cmp + " is uploaded"
        ),
      });
    },

    justUploading(file) {
      if (file) {
        this.$store
          .dispatch("UploadFile", file)
          .then((snapshot) => {
            console.log(snapshot.path);
            this.url_media.push({
              URL: snapshot.url,
              Path: snapshot.path,
            });
            this.open1();
            this.cmp++;
            this.testUploadFile();
          })
          .catch((error) => {
            console.log(error);
          });
      } else console.log("file is empty");
    },
    testUploadFile() {
      if (this.files.length && this.title.length && this.description) {
        if (this.cmp <= this.files.length) {
          let index_f = this.cmp;
          this.dialog_loading = true;
          this.overlay = true;
          this.justUploading(this.files[index_f - 1]);
        } else {
          this.createBlogProgressionTest(
            this.title,
            this.description,
            this.$store.getters.auth_User.user_id
          );
          this.overlay = false;
          this.dialog_loading = false;
          this.dialog = true;
          this.files = [];
          this.cmp = 1;
        }
      } else console.log("no file selected");
    },

    // stopUpload() {
    //   // Upload the file and metadata

    // },

    createBlogProgressionTest(title, description, uid) {
      if (
        title.length > 0 &&
        description.length > 0 &&
        uid.length > 0 &&
        this.files.length > 0 &&
        this.url_media.length > 0
      ) {
        const data = {
          title: title,
          description: description,
          id: uid,
          files: this.files,
          media: this.url_media,
        };
        // this.createBlogProgression(data);

        this.$store
          .dispatch("createBlogProgression", data)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    goSubmetBlog() {
      this.uploading_data = true;
      this.$store
        .dispatch("getBlogProgression", this.$store.getters.auth_User.user_id)
        .then((result) => {
          console.log(result);
          if (!result.submit) {
            this.e1 = 2;
            this.uploading_data = false;
          } else {
            this.e1 = 1;
            this.uploading_data = false;
          }

          this.dialog = false;
        })
        .catch((error) => {
          console.log(error);
          this.uploading_data = false;
        });
    },
    blogSubmiting(title, description, uid, url_media, nb_file) {
      if (
        title.length > 0 &&
        description.length > 0 &&
        uid.length > 0 &&
        nb_file > 0 &&
        url_media.length > 0
      ) {
        this.uploading_data = true;
        const data = {
          title: title,
          description: description,
          id: uid,
          files: nb_file,
          media: url_media,
        };
        // this.createBlogProgression(data);

        this.$store
          .dispatch("submitBlog", data)
          .then((res) => {
            console.log(res);
            this.uploading_data = false;
            this.active_submission = true;
          })
          .catch((error) => {
            console.log(error);
            this.uploading_data = false;
          });
      } else {
        console.log("Some data maybe empty");
      }
    },
    redirectBlog() {
      this.active_submission = false;
      this.$router.replace({ name: "Blogs" });
    },
  },
  beforeDestroy() {},
  mounted() {
    this.goSubmetBlog();
  },
  beforeMount() {},
  computed: {
    ...mapGetters(["auth_User", "progress_upload", "blog_progression"]),
  },
  watch: {
    auth_User: function (value) {
      if (value) {
        this.uploading_data = false;
        this.goSubmetBlog();
        // console.log(value);
      } else {
        this.uploading_data = true;
      }
    },
  },
};
</script>

<style lang="scss" >
.editor {
  height: 60vh;
  display: flex;
  flex-direction: column;

  .quillWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .ql-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
  }
}
</style>