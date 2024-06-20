<template>
  <div>
    <div class="club-list">
      <router-link
        v-for="club in clubs"
        :key="club.clubId"
        :to="`/clubs/${club.clubId}`"
        class="club-card"
      >
        <img
          :src="getImageUrl(club.clubImageBase64)"
          :alt="club.clubName"
          class="club-image"
        />
        <h3>{{ club.clubName }}</h3>
        <p>Address: {{ club.clubAddress }}</p>
        <p>Average price: {{ club.averagePrice }} VND/hour</p>
      </router-link>
    </div>
  </div>
</template>
  
  <script setup>
// import { ref } from "vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// const clubs = ref([]);
const router = useRouter();
const clubs = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/courtmaster/clubs/clubsView"
    );
    clubs.value = await response.data;
  } catch (error) {
    console.error("Failed to fetch clubs:", error);
  }
});

const getImageUrl = (base64String) => {
  return `data:image/png;base64,${base64String}`;
};
</script>
  
<style scoped>
.club-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.club-card {
  padding: 15px;
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
</style>