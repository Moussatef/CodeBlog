<template>
  <div class="blog-card-wrap">
    <h1 class="text-center">Pgae Blogs</h1>
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <AppHomeBlog
          v-for="(post, index) in blog_submited"
          :key="index"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppBlogCard from "@/components/blogs/AppBlogCard";
import AppHomeBlog from "@/components/blogs/AppHomeBlog";
export default {
  name: "Blogs",
  components: {
    AppBlogCard,
    AppHomeBlog,
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