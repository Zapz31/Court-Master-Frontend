<template>
  <div class="schedule-controller-wrapper">
    <schedule-controller />
  </div>
  <div class="schedule-table-wrapper">
    <schedule-table />
  </div>
  <schedule-information />
</template>

<script setup>
import ScheduleController from "../components/Schedule/ScheduleController.vue";
import ScheduleInformation from "../components/Schedule/ScheduleInformation.vue";
import ScheduleTable from "../components/Schedule/ScheduleTable.vue";
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