<template>
  <div class="blog-card-wrap">
    <h1 class="text-center">Pgae Blogs</h1>
    <div class="blog-cards container">
      <AppBlogCard
        v-for="(post, index) in blog_submited"
        :key="index"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppBlogCard from "@/components/blogs/AppBlogCard";
export default {
  name: "Blogs",
  components: {
    AppBlogCard,
  },

  computed: {
    ...mapGetters(["blog_submited"]),
  },
  methods: {
    ...mapActions(["getBlogSubmited"]),
  },
  beforeMount() {
    this.getBlogSubmited();
  },
};
</script>

<style>
</style>