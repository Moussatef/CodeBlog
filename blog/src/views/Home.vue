<template>
  <h1>Home BLOG</h1>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",

  components: {},
  methods: {
    ...mapActions(["sendData"]),
    testing() {
      this.$store.dispatch("sendData").then((res) => {
        console.log(res.id);
      });
    },
  },
  created() {
    // this.testing();
  },
};
</script>
