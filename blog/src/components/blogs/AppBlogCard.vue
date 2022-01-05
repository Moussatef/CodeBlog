<template>
  <div class="blog-card">
    <div class="icons">
      <!-- <div class="icon"> -->
      <!-- <Edit class="edit" /> -->
      <!-- </div> -->
      <!-- <div class="icon"> -->
      <!-- <Delete class="delete" /> -->
      <!-- </div> -->
    </div>

    <v-carousel
      v-if="post.media_url.length > 0"
      height="320"
      :show-arrows="false"
    >
      <v-carousel-item
        class="text-center"
        v-for="(video, index) in post.media_url"
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
    <img v-else src="@/assets/blogPhotos/blc.png" />
    <div class="info">
      <h4>{{ post.title }}</h4>
      <h6>Postef on : {{ post.created_at }}</h6>
      <router-link
        class="link"
        :to="{ name: 'BlogPreview', params: { id: this.post.blogID } }"
      >
        View The Post
        <!-- <ArrowRight class="arrow" /> -->
      </router-link>
    </div>
  </div>
</template>

<script>
import Media from "@dongido/vue-viaudio";
export default {
  name: "AppBlogCard",
  props: ["post"],
  components: {
    Media,
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff !important;
  min-height: 420px;
  transition: 0.5s ease all;
  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.082), 0 2px 4px -1px rgb(0, 0, 0);
  }
  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5 ease all;
      &:hover {
        background-color: #303030;
        .edit,
        .delete {
          path {
            fill: #fff;
          }
        }
      }
      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }
  .info {
    display: flex;
    flex-direction: column;
    height: 200px;
    z-index: 3;
    padding: 32px 16px;
    color: #000;
    background-color: #fff !important;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }
    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-top: 4px;
      transition: 0.5 ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }
    }
  }
}
</style>