<template>
  <div class="container">
    <div class="left-side">
      <!-- <router-link to="/"></router-link> -->
      <register-form />
    </div>

    <div class="right-side">
      <logo />
      <otp-form />
    </div>
  </div>
</template>

<script setup>
import Logo from "../components/Register/Logo.vue";
import OtpForm from "../components/Register/OtpForm.vue";
import RegisterForm from "../components/Register/RegisterForm.vue";
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  margin: -4.5px;
}

.left-side {
  width: 100%;
  flex: 1;
  background-color: white;
}
.right-side {
  margin: -40px;
  width: 100%;
  flex: 1;
  background-color: #6babf4;
}
</style>