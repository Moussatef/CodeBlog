<template>
  <div class="post-view">
    <div class="container-b quillWrapper">
      <h2></h2>
      <img src="" alt="" />
      <div class="post-content ql-editor" v-html="blogHTML"></div>
    </div>
  </div>
</template>

<script>
export default {};
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
  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>