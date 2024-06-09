<template>
  <div class="schedule-controller-wrapper">
    <schedule-controller />
  </div>
  <div class="schedule-table-wrapper">
    <schedule-table />
  </div>

  <div class="shedule-information-wrapper">
    <schedule-information />
  </div>
</template>

<script setup>
import ScheduleController from "../components/Schedule/ScheduleController.vue";
import ScheduleInformation from "../components/Schedule/ScheduleInformation.vue";
import ScheduleTable from "../components/Schedule/ScheduleTable.vue";
</script>

<style>
.schedule-table-wrapper {
  padding-top: 50px;
  padding-bottom: 100px; /* Khoảng trống để không bị che bởi thanh thông tin cố định */
}

.schedule-controller {
  margin-top: -20px;
  position: sticky;
  top: 0;
  z-index: 3; /* Z-index cao hơn th */
  background-color: #f5f5f5;
  padding: 16px;
  height: 50px; /* Chiều cao tương ứng để không chồng lên phần th */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.schedule-information-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>