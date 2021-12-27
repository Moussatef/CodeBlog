<template>
  <div>
    <h1 class="text-center">Login Form</h1>
    <AppLogin />
  </div>
</template>

<script>
import AppLogin from "@/components/AppLogin.vue";
export default {
  name: "Login",
  components: {
    AppLogin,
  },
};
</script>