<template>
  <div class="container">
    <div class="post-preview">
      <div class="container-b quillWrapper">
        <h2>{{ blog.title }}</h2>
        <v-carousel height="340" class="img" :show-arrows="false">
          <v-carousel-item
            class="text-center"
            v-for="(video, index) in blog.media_url"
            :key="index"
          >
            <Media
              :kind="'video'"
              :controls="true"
              :src="[video.URL]"
              :style="{ width: '100%', height: '300px' }"
            >
            </Media
          ></v-carousel-item>
        </v-carousel>
        <div class="post-content ql-editor" v-html="blog.description"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Media from "@dongido/vue-viaudio";
export default {
  // name: "BlogPreview",
  data() {
    return {
      blog: null,
      blogHTML: null,
    };
  },
  components: {
    Media,
  },

  computed: {
    ...mapGetters(["blog_submited", "blog_filter"]),
  },
  methods: {
    ...mapActions(["filterBlog", "getBlogSubmited"]),
  },
  created() {
    // console.log("TESSSST");
  },

  beforeMount() {
    // this.blog = this.blog_submited.filter((result) => {
    //   return result.blogID === this.$route.params.id;
    // });
    this.getBlogSubmited();
    this.filterBlog(this.$route.params.id);
  },
  watch: {
    blog_filter: function (v) {
      if (v) {
        this.blog = this.blog_filter;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post-preview {
  min-height: 100%;

  .container-b {
    max-width: 1000px;
    padding: 60px 25px;
  }
  .ql-editor {
    padding: 0;
  }
  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }
  .img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>