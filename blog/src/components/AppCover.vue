<template>
  <div class="container">
    <!-- <template>
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
    </template> -->

    <div class="card_info">
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

          <span id="NB_repos" class="item_f">Blogs :</span>
        </div>
      </div>
    </div>
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