<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <AppBlogCard
        v-for="(post, index) in sampleBlogCards"
        :key="index"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import AppBlogCard from "@/components/blogs/AppBlogCard";
export default {
  name: "Blogs",
  components: {
    AppBlogCard,
  },

  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
  },
};
</script>

<style>
</style>