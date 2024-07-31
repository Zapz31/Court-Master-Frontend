<template>
  <div class="schedule-controller-wrapper">
    <ScheduleController />
  </div>
  <div class="schedule-table-wrapper">
    <ScheduleTable :clubId="clubId" />
  </div>
</template>

<script setup>
import ScheduleController from "../components/ViewSchedule/ScheduleController.vue";
import ScheduleTable from "../components/ViewSchedule/ScheduleTable.vue";

import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useClubStore } from "../stores/clubMng";

const route = useRoute();
const clubStore = useClubStore();
const clubId = ref(route.params.clubId);

const fetchClubData = async () => {
  await clubStore.fetchClubById(clubId.value);
};

onMounted(fetchClubData);
onMounted(() => {
  // Check if the reload flag is set
  if (localStorage.getItem("shouldReload") === "true") {
    // Remove the flag
    localStorage.removeItem("shouldReload");
    // Reload the page
    window.location.reload();
  }
});

watch(() => route.params.clubId, fetchClubData);
</script>

<style>
.schedule-table-wrapper {
  padding-top: 50px;
}

.schedule-controller {
  margin-top: -20px;
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: #f5f5f5;
  padding: 16px;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
