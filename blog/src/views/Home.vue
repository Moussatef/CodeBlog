<template>
  <div class="home">
    <div>
      <div
        class="
          position-relative
          overflow-hidden
          p-3 p-md-5
          m-md-3
          text-center
          bg-light
        "
      >
        <div class="col-md-5 p-lg-5 mx-auto my-5">
          <h1 class="display-4 fw-normal">Code Blogs</h1>
          <p class="lead fw-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            culpa magni, minima corporis nesciunt deleniti fugit officiis
            voluptatem maxime pariatur laudantium ipsum quaerat
          </p>
        </div>
        <div class="product-device shadow-sm d-none d-md-block"></div>
        <div
          class="product-device product-device-2 shadow-sm d-none d-md-block"
        ></div>
      </div>
    </div>
    <AppBlog :post="welcomScreen" :isLogged="isLogged" />

    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <AppHomeBlog
          v-for="(post, index) in blog_submited.slice(0, 6)"
          :key="index"
          :post="post"
        />
      </div>
    </div>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <AppBlogCard
            v-for="(post, index) in blog_submited.slice(3, 7)"
            :key="index"
            :post="post"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppBlog from "@/components/blogs/AppBlog";
import AppBlogCard from "@/components/blogs/AppBlogCard";
import AppHomeBlog from "@/components/blogs/AppHomeBlog";
export default {
  name: "Home",

  components: {
    AppBlog,
    AppBlogCard,
    AppHomeBlog,
  },
  data() {
    return {
      isLogged: false,
      welcomScreen: {
        title: "Welcom",
        blogPost:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam culpa magni, minima corporis nesciunt deleniti fugit officiis voluptatem maxime pariatur laudantium ipsum quaerat. Quisquam quo dolores pariatur officia ex doloremque?",
        welcomScreen: true,
        photo: "blog3",
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
  methods: {
    ...mapActions(["getBlogSubmited", "getUserInfo"]),
  },
  computed: {
    ...mapGetters(["blog_submited", "auth_User"]),
  },
  created() {
    this.getBlogSubmited();
    this.getUserInfo();
  },
  watch: {
    auth_User: function (value) {
      if (value) {
        this.isLogged = true;
      }
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

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
