<template>
  <div>
    <v-container class="">
      <v-row class="text-center justify-center p-5">
        <v-col md="5">
          <template>
            <h4 class="not-margin my-4">Welcome to <b>Code Blog</b></h4>
          </template>
          <template>
            <h4 class="not-margin mb-5"><b>Login for continue</b></h4>
          </template>
          <vs-alert v-if="messageError" color="danger">
            <template #title> Warning Message </template>
            {{ messageError }}
          </vs-alert>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

            <div class="flex">
              <vs-button
                transparent
                :active="active_forgot == 1"
                @click.prevent="
                  active_forgot = 1;
                  active_dialog = true;
                "
              >
                Forgot Password?
              </vs-button>
            </div>

            <vs-button
              :disabled="!valid"
              color="rgb(59,222,200)"
              gradient
              class="mr-4 mt-8 w-100 py-1"
              @click.prevent="
                login(email, password);
                active_btn = 6;
              "
              :active_btn="active_btn == 6"
            >
              Login
            </vs-button>
            <vs-button
              class="w-100 mt-4 py-1"
              color="rgb(45, 97, 240)"
              gradient
              :active_btn="active_btn == 6"
              @click.prevent="
                active_btn = 6;
                $router.replace({ name: 'Register' });
              "
            >
              Register
            </vs-button>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <!-- ForgotPassword dialog -->
    <vs-dialog v-model="active_dialog">
      <template #header>
        <h4 class="not-margin">Forgot <b>Password</b></h4>
      </template>
      <div class="con-form my-5">
        <vs-input
          color="#7d33ff"
          border
          type="email"
          v-model="email_forgot"
          placeholder="Enter your Email"
        >
          <template #icon>
            <i class="bi bi-envelope-fill"></i>
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog my-5">
          <vs-button @click="passwordReset(email_forgot)" block>
            Send
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data: () => ({
    email_forgot: undefined,
    active_dialog: false,
    active_forgot: 0,
    active_btn: 0,
    valid: false,
    show1: false,
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    messageError: null,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    login(email, password) {
      const data = {
        email: email,
        password: password,
      };
      this.$store
        .dispatch("authenticateByEmailAndPassword", data)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential);
          this.$router.replace({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
          this.messageError = error;
        });
    },
    passwordReset(email) {
      if (email) {
        const data = {
          email: email,
        };
        this.$store
          .dispatch("resetPassword", data)
          .then(() => {
            // Signed in
            console.log("email sent");
            this.email_forgot = undefined;
            this.active_dialog = flase;
            // this.$router.replace({ name: "Home" });
          })
          .catch((error) => {
            console.log(error);
            this.messageError = error;
          });
      } else {
        console.log("err email empty");
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.vs-input-content {
  margin: 10px 0px;
  width: 100%;
  background-color: rgb(45, 97, 240);
  .vs-input {
    width: 100%;
  }
}

.vs-dialog {
  max-width: 1800px !important;
}
.vs-input {
  width: 100% !important;
}
</style>