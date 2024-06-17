<template>
  <div v-if="showPopup" class="session-popup">
    <div class="popup-content">
      <p><strong>Start time:</strong> {{ scheduleStore.startTime }}</p>
      <p><strong>End time:</strong> {{ scheduleStore.endTime }}</p>
      <p><strong>Hours:</strong> {{ hours }} h</p>
      <p><strong>Price:</strong> {{ scheduleStore.price }} VNĐ</p>
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

const price = computed(() => {
  const hourRate = 80000; // Giá mặc định 80.000 VNĐ/giờ
  return hours.value * hourRate;
});

const showPopup = computed(() => {
  return scheduleStore.startTime && scheduleStore.endTime;
});
</script>

<style scoped>
.session-popup {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.popup-content {
  font-size: 14px;
}

.popup-content p {
  margin: 5px 0;
}
</style>
