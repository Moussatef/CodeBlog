<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row class="text-center justify-center p-5">
        <v-col md="5">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="first_name"
              :rules="namelRules"
              label="First name"
              required
            ></v-text-field>
            <v-text-field
              v-model="last_name"
              :rules="nameRules"
              label="Last name"
              required
            ></v-text-field>
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

            <v-text-field
              v-model="password_confirmation"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="password confirmation"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 w-100"
              v-if="valid"
              @click="validate"
            >
              Register
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { mapActions } from "vuex";

export default {
  data: () => ({
    valid: false,
    show1: false,
    valid_pass: false,

    first_name: "",
    last_name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],

    password_confirmation: "",
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.register();
      } else console.log("Error validation inputs");
    },

    register() {
      const data = {
        email: this.email,
        password: this.password,
      };

      this.$store
        .dispatch("registerByEmailPassword", data)
        .then((res) => {
          console.log(res.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    creatUser(id) {
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        id: id,
      };
      this.$store
        .dispatch("createUser", data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>