<template>
  <div>
    <template>
      <v-card class="mx-auto" max-width="804" tile>
        <v-img height="300" src="@/assets/pic/blog.jpg">
          <v-row align="end" class="">
            <v-col align-self="start" class="pa-0" cols="12">
              <v-avatar class="profile" color="white" size="160" tile>
                <v-img src="@/assets/pic/pr2.png"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="py-0 mt-5">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="text-h3">
                    {{ auth_User.first_name }} {{ auth_User.last_name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-h6">{{
                    auth_User.email
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getAuth } from "firebase/auth";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["auth_User"]),
  },
  components: {},
  methods: {
    ...mapActions(["sendData", "getUserInfo"]),

    async getdata() {
      this.$store
        .dispatch("getUserInfo")
        .then((res) => {
          const docSnap = res;

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getdata();
  },
};
</script>