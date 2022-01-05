<template>
  <div>
    <div class="col">
      <div class="card shadow-sm card-blog">
        <v-carousel
          v-if="post.media_url.length > 0"
          height="225"
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
              :style="{ width: '100%', height: '93%' }"
            >
            </Media
          ></v-carousel-item>
        </v-carousel>
        <img
          height="225"
          width="200"
          class="text-center mx-auto"
          v-else
          src="@/assets/blogPhotos/blogH.png"
        />

        <div class="card-body">
          <p class="card-text">
            {{ post.title }}
          </p>
        </div>
        <div
          class="d-flex justify-content-between align-items-center card-footer"
        >
          <div class="btn-group">
            <vs-button
              color="#7d33ff"
              gradient
              :active="active == 5"
              @click="active = 5"
              :to="{
                name: 'BlogPreview',
                params: { id: this.post.blogID },
              }"
            >
              View The Post
            </vs-button>
          </div>
          <small class="text-muted">{{ post.created_at }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Media from "@dongido/vue-viaudio";
export default {
  name: "AppHomeBlog",
  props: ["post", "isLogged"],
  data() {
    return {
      active: 0,
    };
  },
  components: { Media },
};
</script>

<style lang="scss" scoped>
.card-blog {
  min-height: 400px !important;
}
</style>