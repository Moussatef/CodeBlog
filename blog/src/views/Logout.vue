<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  beforeMount() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
        console.log("An error happened. " + error);
      });
  },
};
</script>

<template>
    
</template>