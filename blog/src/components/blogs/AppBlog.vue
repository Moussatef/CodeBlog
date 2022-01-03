<template>
  <div class="blog-wrapper no-user">
    <div class="blog-content">
      <div>
        <h2 v-if="post.welcomScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.title }}</h2>
        <p v-if="post.welcomScreen">{{ post.blogPost }}</p>
        <!-- <p v-else class="contant-preview" v-html="post.description"></p> -->

        <router-link
          v-if="post.welcomScreen"
          v-show="!isLogged"
          class="link link-light"
          :to="{ name: 'Login' }"
        >
          Login/Register</router-link
        >
        <router-link
          class="link"
          v-else
          :to="{ name: 'BlogPreview', params: { id: this.post.blogID } }"
        >
          View The Post</router-link
        >
      </div>
    </div>
    <div class="blogImg">
      <img
        v-if="post.welcomScreen"
        :src="require(`../../assets/blogPhotos/${post.photo}.jpg`)"
        alt=""
      />
      <!-- <img
        
        :src="require(`../../assets/blogPhotos/${post.blogCover}.jpg`)"
        alt=""
      /> -->
      <v-carousel v-else height="100%" :show-arrows="false">
        <v-carousel-item
          class="text-center"
          v-for="(video, index) in post.media_url"
          :key="index"
        >
          <Media
            :kind="'video'"
            :controls="true"
            :src="[video.URL]"
            :style="{ width: '100%', height: '93%' }"
          >
          </Media
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
import Media from "@dongido/vue-viaudio";
export default {
  name: "AppBlog",
  props: ["post", "isLogged"],
  components: { Media },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.075),
    0 2px 4px -1px rgba(0, 0, 0, 0.979);
  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media (min-width: 700px) {
      order: 1;
    }
    @media (min-width: 800px) {
      flex: 3;
    }
    div {
      max-width: 376px;
      padding: 72px 24px;
      @media (min-width: 700px) {
        padding: 0 24px;
      }
      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 700px) {
          font-size: 40px;
        }
      }
      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        width: 250px;
        font-size: 13px;
        max-height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;
        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #fff;
        }
      }
    }
  }
  .blogImg {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.082), 0 2px 4px -1px rgb(0, 0, 0);
    background-image: url("../../assets/blogPhotos/blog4.jpg");
    background-size: cover;
    @media (min-width: 700px) {
      order: 2;
    }
    @media (min-width: 800px) {
      flex: 4;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &:nth-child(even) {
    .blog-content {
      order: 2;
    }
    .blogImg {
      order: 1;
    }
  }
}
.no-user:first-child {
  .blog-content {
    background: linear-gradient(90deg, #444444 0%, #92feec88 100%);
    color: #fff;
  }
}
</style>