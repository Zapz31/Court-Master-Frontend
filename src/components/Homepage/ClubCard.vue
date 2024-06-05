<template>
  <div>
    <div class="club-list">
      <router-link
        v-for="club in clubs"
        :key="club.id"
        :to="`/clubs/${club.id}`"
        class="club-card"
      >
        <img :src="club.imageUrl" :alt="club.name" class="club-image" />
        <h3>{{ club.name }}</h3>
        <p>Address: {{ club.address }}</p>
        <p>Average price: {{ club.averagePrice }} VND/hour</p>
      </router-link>
    </div>
  </div>
</template>
  
  <script setup>
// import { ref } from "vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// const clubs = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch("/api/clubs");
    clubs.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch clubs:", error);
  }
});

// ============================= TEMP LIST CLUB========================================================================================
const clubs = ref([
  {
    id: 1,
    name: "Club Name 1",
    address: "abc, Ho Chi Minh city",
    averagePrice: 80000,
    imageUrl:
      "https://sieuthicaulong.vn/userfiles/files/san-cau-long-quan-3-1.jpg",
  },
  {
    id: 2,
    name: "Club Name 2",
    address: "abc, Ho Chi Minh city",
    averagePrice: 80000,
    imageUrl:
      "https://shopvnb.com/uploads/tin_tuc/review-san-cau-long-quan-12-san-cau-long-nhat-pham.webp",
  },

  {
    id: 3,
    name: "Club Name 1",
    address: "abc, Ho Chi Minh city",
    averagePrice: 80000,
    imageUrl:
      "https://shopvnb.com/uploads/tin_tuc/review-san-cau-long-quan-12-san-cau-long-nhat-pham.webp",
  },

  {
    id: 3,
    name: "Club Name 1",
    address: "abc, Ho Chi Minh city",
    averagePrice: 80000,
    imageUrl:
      "https://shopvnb.com/uploads/tin_tuc/review-san-cau-long-quan-12-san-cau-long-nhat-pham.webp",
  },
  {
    id: 3,
    name: "Club Name 1",
    address: "abc, Ho Chi Minh city",
    averagePrice: 80000,
    imageUrl:
      "https://shopvnb.com/uploads/tin_tuc/review-san-cau-long-quan-12-san-cau-long-nhat-pham.webp",
  },
  // ============================= TEMP LIST CLUB========================================================================================

  //Add more club objects as needed
]);
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