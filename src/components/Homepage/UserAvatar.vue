<template>
  <div class="dropdown" @click="toggleMenu">
    <div class="box">
      <div class="username"><h4>Doan Minh Tien</h4></div>
      <div class="avatar">
        <img src="../../../public/img/avatarCourtMaster.jpg" alt="Avatar" />
      </div>
    </div>
    <div v-if="menuVisible" class="dropdown-content">
      <router-link to="/home">Home</router-link>
      <router-link to="/login">Log in</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/setting">Setting</router-link>
      <router-link to="/logout">Logout</router-link>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

const menuVisible = ref(false);

function toggleMenu() {
  menuVisible.value = !menuVisible.value;
}
</script>
  
  <style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.box {
  margin-top: 50px;
  background: #6babf4;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}
.box,
h4 {
  color: white;
}
.box:hover {
  background-color: royalblue;
}
.username h4 {
  margin: 0;
}
.avatar img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
.dropdown-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 12px;
  z-index: 1;
  border-radius: 8px;
  top: 68%;
  left: 10px;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: #ddd;
}
</style>