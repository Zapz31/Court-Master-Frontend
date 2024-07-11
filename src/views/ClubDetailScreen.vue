<template>
  <div class="container">
    <div class="logo">
      <logo />
      <user-avatar />
    </div>

    <div class="content">
      <!-- Nội dung của trang ở đây -->
      <club-detail :clubId="clubId" />
    </div>

    <div class="footer">
      <h2>Developed by Court Master team</h2>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ClubDetail from "../components/Detail/ClubDetail.vue";
import Logo from "../components/Detail/Logo.vue";
import UserAvatar from "../components/Detail/UserAvatar.vue";

const route = useRoute();
const clubId = ref(route.params.clubId);

onMounted(() => {
  console.log("Club ID:", clubId.value);
});
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
  margin-bottom: auto;
}

.content {
  flex-grow: 1;
  padding: 1rem;
  margin: 0 20%;
}

.footer {
  margin: -6px;
  background-color: lightgray;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
}

/* Responsive styles */
@media (max-width: 1200px) {
  .content {
    margin: 0 10%;
  }
}

@media (max-width: 768px) {
  .content {
    margin: 0 5%;
  }

  .logo {
    flex-direction: column;
    align-items: center;
  }

  .footer {
    padding: 0.5rem;
  }
}
</style>