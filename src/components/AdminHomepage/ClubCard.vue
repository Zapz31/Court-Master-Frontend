<template>
  <div>
    <div class="club-list">
      <router-link
        v-for="club in clubs"
        :key="club.clubId"
        :to="`/clubs/${club.clubId}`"
        class="club-card"
        @click="setCurrentClub(club)"
      >
        <img
          :src="getImageUrl(club.clubImageBase64)"
          :alt="club.clubName"
          class="club-image"
        />
        <h3>{{ club.clubName }}</h3>
        <span class="bold">Địa chỉ: </span>
        <span>{{ club.clubAddress }}</span
        ><br /><br />
        <span class="bold">Giá dao động: </span
        ><span>{{ formatPrice(club.averagePrice) }}₫/h</span>
      </router-link>
    </div>
  </div>
</template>
  
<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useClubStore } from "../../stores/clubMng";

const clubStore = useClubStore();
const { clubs } = storeToRefs(clubStore);

onMounted(async () => {
  await clubStore.fetchClubs();
});

const getImageUrl = (base64String) => {
  return `data:image/png;base64,${base64String}`;
};

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const setCurrentClub = (club) => {
  clubStore.setCurrentClub(club);
};
</script>
  
<style scoped>
.club-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.club-list h3 {
  color: #0d66cd;
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

.bold {
  font-weight: bold;
}

.club-image {
  border-radius: 20px;
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>