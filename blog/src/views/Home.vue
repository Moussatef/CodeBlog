<template>
  <div class="home">
    <AppBlog :post="welcomScreen" />
    <AppBlog v-for="(post, index) in simplBlog" :key="index" :post="post" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <AppBlogCard
            v-for="(post, index) in sampleBlogCards"
            :key="index"
            :post="post"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBlog from "@/components/blogs/AppBlog";
import AppBlogCard from "@/components/blogs/AppBlogCard";
export default {
  name: "Home",

  components: {
    AppBlog,
    AppBlogCard,
  },
  data() {
    return {
      welcomScreen: {
        title: "Welcom",
        blogPost:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam culpa magni, minima corporis nesciunt deleniti fugit officiis voluptatem maxime pariatur laudantium ipsum quaerat. Quisquam quo dolores pariatur officia ex doloremque?",
        welcomScreen: true,
        photo: "coding",
      },
      simplBlog: [
        {
          title: "Designed For Everyone",
          blogContent:
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam culpa magni, minima corporis nesciunt deleniti fugit officiis voluptatem maxime pariatur laudantium ipsum quaerat. Quisquam quo dolores pariatur officia ex doloremque?",

          blogCover: "designed-for-everyone",
        },
        {
          title: "Beautiful Stories",
          blogContent:
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam culpa magni, minima corporis nesciunt deleniti fugit officiis voluptatem maxime pariatur laudantium ipsum quaerat. Quisquam quo dolores pariatur officia ex doloremque?",

          blogCover: "beautiful-stories",
        },
      ],
    };
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
  },
};
</script>

<style lang="scss">
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
</style>
