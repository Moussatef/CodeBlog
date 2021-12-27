<template>
  <div>
    <h1 class="text-center">Register Form</h1>
    <AppRegister />
  </div>
</template>

<script>
import AppRegister from "@/components/AppRegister.vue";

export default {
  name: "Register",

  components: {
    AppRegister,
  },
};
</script>