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
      <div class="club-list">
        <club-card />
        <!-- Add more club cards here as needed -->
      </div>
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
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.logo {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.filter_search {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px;
  margin-bottom: auto;
  margin-top: -100px;
}

.content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.footer {
  background-color: lightgray;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
  margin: -5px;
}

.club-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.club-card {
  padding: 20px;
  width: 250px;
  height: 350px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.club-card:hover {
  transform: scale(1.05);
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */
}

.club-image {
  border-radius: 20px;
  width: 100%;
  height: 200px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .filter_search {
    padding: 20px;
    margin-top: 0;
  }

  .content {
    margin-left: 0;
    padding: 0.5rem;
  }

  .footer {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .filter_search {
    padding: 10px;
  }

  .footer {
    font-size: 0.8rem;
  }
}
</style>