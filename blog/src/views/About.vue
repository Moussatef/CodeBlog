<template>
  <div class="about">
    <h1>This is an about page</h1>
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
                    <v-card
                      :elevation="hover ? 12 : 2"
                      class="mx-auto"
                      max-width="650"
                    >
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
                            <v-textarea
                              v-model="description"
                              name="input-7-1"
                              label="Default style"
                              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                              hint="Hint text"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12" md="12" class="mb-4">
                            <v-file-input
                              v-model="files"
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
                                  v-if="index < 2"
                                  color="deep-purple accent-4"
                                  dark
                                  label
                                  small
                                >
                                  {{ text }}
                                </v-chip>

                                <span
                                  v-else-if="index === 2"
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

            <v-btn color="primary" @click="testUploadFile()"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="500px"
            ></v-card>

            <v-btn color="primary"> submit </v-btn>

            <v-btn text @click="e1 = 1"> back </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>

    <!-- <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue-grey"
      class="ma-2 white--text"
      @click="
        loader = 'loading3';
        testUploadFile();
      "
    >
      Upload file
      <v-icon right dark> mdi-cloud-upload </v-icon>
    </v-btn> -->

    <!-- <img
      src="https://firebasestorage.googleapis.com/v0/b/blog-video-feadd.appspot.com/o/blogeMedia%2F1640824125582_pexels-suzy-hazelwood-3601081.jpg?alt=media&token=095d92aa-23f0-41d6-a346-7636543373ee"
      alt=""
      width="600"
    /> -->

    <v-row justify="center">
      <v-dialog v-model="dialog_loading" persistent max-width="590">
        <v-card>
          <v-card-title class="text-h5">
            Uploading File NB : {{ cmp }}
          </v-card-title>
          <v-card-text class="text-center">
            <!-- <v-overlay :value="overlay">
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay> -->
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
            <v-btn color="green darken-1" text @click="dialog_loading = false">
              Close and continue
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="490">
        <v-card>
          <v-card-title class="text-h5"> Messgae successfully. </v-card-title>

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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
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
    };
  },

  methods: {
    ...mapActions(["getUserInfo", "createBlogProgression", "stopUpload"]),

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
    },
    testUploadFile() {
      if (this.files.length) {
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
    },

    goSubmetBlog() {
      this.$store
        .dispatch("getBlogProgression", this.$store.getters.auth_User.user_id)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeDestroy() {
    // clearInterval(this.interval);
  },
  mounted() {
    this.getUserInfo();

    // this.interval = setInterval(() => {
    //   if (this.value === 100) {
    //     return (this.value = 0);
    //   }
    //   this.value += 5;
    // }, 1000);
  },
  computed: {
    ...mapGetters(["auth_User", "progress_upload", "blog_progression"]),
  },
  watch: {},
};
</script>
