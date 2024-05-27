<template>
  <div class="container">
    <div class="left-side">
      <!-- <router-link to="/"></router-link> -->
      <login-form />
    </div>

    <div class="right-side">
      <logo />
      <register />
    </div>
  </div>
</template>

<script setup>
import LoginForm from "../components/Login/LoginForm.vue";
import Logo from "../components/Login/Logo.vue";
import Register from "../components/Login/RegisterBtn.vue";

// export default {
//   data() {
//     return {
//       posts: [],
//     };
//   },
//   mounted() {
//     this.fetchPosts();
//   },
//   methods: {
//     fetchPosts() {
//       axios
//         .get("http://localhost:8080/api/posts")
//         .then((response) => {
//           this.posts = response.data;
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     },
//   },
// };
</script>

  
 <style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  margin: -0.55%;
}

.left-side {
  width: 100%;
  flex: 1;
  background-color: white;
}
.right-side {
  width: 100%;
  flex: 1;
  background-color: #6babf4;
}
</style>