<template>
  <div class="container">
    <div class="logo">
      <logo />
      <user-avatar />
    </div>
    <div class="filter_search" v-click-outside="closeDropdowns">
      <filter-search ref="filterSearchRef" />
    </div>
    <div class="content">
      <club-card />
      <!-- Nội dung của trang ở đây -->
    </div>
    <div class="footer">
      <h2>Developed by Court Master team</h2>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ClubCard from "../components/Homepage/ClubCard.vue";
import FilterSearch from "../components/Homepage/FilerSearch.vue";
import Logo from "../components/Homepage/Logo.vue";
import UserAvatar from "../components/Homepage/UserAvatar.vue";

const filterSearchRef = ref(null);

const closeDropdowns = () => {
  if (filterSearchRef.value) {
    filterSearchRef.value.closeAllDropdowns();
  }
};
</script>

  <style>
.filter_search {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px;
  margin-bottom: auto;
  margin-top: -100px;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.logo {
  display: flex;
  justify-content: space-between;
}

.content {
  flex-grow: 1;
  padding: 1rem;
  margin-left: 140px; 
}

.footer {
  margin: -6px;
  background-color: lightgray;
  padding: 1rem;
  text-align: center;
  margin-top: auto; /* Đẩy footer xuống cuối trang */
}
</style>