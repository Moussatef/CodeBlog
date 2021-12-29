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

            <v-btn
              color="primary"
              @click="
                createBlogProgressionTest(
                  title,
                  description,
                  files,
                  auth_User.user_id
                )
              "
            >
              Continue
            </v-btn>

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

    <v-btn
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
    </v-btn>

    <v-row justify="center">
      <v-dialog v-model="dialog_loading" persistent max-width="590">
        <v-card>
          <v-card-title class="text-h5"> Uploading Files.. </v-card-title>
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
              :value="value"
              color="teal"
            >
              {{ value }}
            </v-progress-circular>

            .</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog_loading = false">
              Cancel upload
            </v-btn>
            <v-btn color="green darken-1" text @click="dialog_loading = false">
              Pause upload
            </v-btn>
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

            <v-btn color="green darken-1" text @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
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
    };
  },
  methods: {
    ...mapActions(["getUserInfo", "createBlogProgression"]),
    handleRemove(file) {
      // console.log(file.raw);
      this.file.push(file.raw);
      console.log(this.file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    testUploadFile() {
      const storage = getStorage();
      if (this.files.length) {
        this.dialog_loading = true;
        this.overlay = true;
        // 'file' comes from the Blob or File API
        this.files.forEach((file) => {
          const storageRef = ref(
            storage,
            "blogeMedia/" + Date.now() + "_" + file.name
          );
          uploadBytes(storageRef, file).then((snapshot) => {
            console.log("Uploaded a blob or file! " + snapshot);
            this.overlay = false;
            this.dialog_loading = false;
            this.dialog = true;
          });
        });
        this.files = [];
      } else console.log("no file selected");
    },

    stopUpload() {
      // Upload the file and metadata
      const uploadTask = uploadBytesResumable(storageRef, file);
    },

    createBlogProgressionTest(title, description, files, uid) {
      const data = {
        title: title,
        description: description,
        files: files,
        id: uid,
      };
      this.testUploadFile();
      this.createBlogProgression(data);

      // this.$store
      //   .dispatch("createBlogProgression", data)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((error) => {
      //     console.log("error");
      //   });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.getUserInfo();

    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 5;
    }, 1000);
  },
  computed: {
    ...mapGetters(["auth_User"]),
  },
  watch: {},
};
</script>
