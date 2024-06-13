<template>
  <div class="schedule-information">
    <div
      v-if="
        scheduleStore.startTime && scheduleStore.endTime && scheduleStore.court
      "
      class="info-item"
    >
      <!-- Hiển thị thông tin khi có dữ liệu -->
      <label
        >Time: {{ scheduleStore.startTime }} -
        {{ scheduleStore.endTime }}</label
      >
      <br />
      <label for="">Hours: {{ hours }} h</label>
    </div>
    <div v-else class="info-item">
      <label>Chưa chọn khung giờ chơi</label>
    </div>
    <div
      v-if="
        scheduleStore.startTime && scheduleStore.endTime && scheduleStore.court
      "
      class="info-item"
    >
      <label>Price: {{ scheduleStore.price }} VNĐ</label>
    </div>
    <div
      v-if="
        scheduleStore.startTime && scheduleStore.endTime && scheduleStore.court
      "
      class="info-item"
    >
      <label>Court: {{ scheduleStore.court }}</label>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useScheduleStore } from "../../stores/scheduleStore";

const scheduleStore = useScheduleStore();

const hours = computed(() => {
  const [startHour, startMinute] = scheduleStore.startTime
    .split(":")
    .map(Number);
  const [endHour, endMinute] = scheduleStore.endTime.split(":").map(Number);
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  const totalMinutes = endTotalMinutes - startTotalMinutes;
  return (totalMinutes / 60).toFixed(1);
});
</script>

<style>
.schedule-information {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f5;
  padding: 16px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.info-item {
  margin: 0 20px;
  text-align: center;
}

.info-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.info-item label:first-child {
  font-size: 16px;
}

.info-item label:last-child {
  font-size: 14px;
  color: #666;
}
</style>
