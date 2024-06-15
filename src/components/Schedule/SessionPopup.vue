<template>
  <div v-if="showPopup" class="session-popup">
    <div class="popup-content">
      <p><strong>Start time:</strong> {{ startTime }}</p>
      <p><strong>End time:</strong> {{ endTime }}</p>
      <p><strong>Hours:</strong> {{ hours }} h</p>
      <p><strong>Price:</strong> {{ price }} VNĐ</p>
    </div>
  </div>
</template>
  
  <script setup>
import { computed } from "vue";

const props = defineProps({
  startTime: String,
  endTime: String,
  show: Boolean,
});

const hours = computed(() => {
  const [startHour, startMinute] = props.startTime.split(":").map(Number);
  const [endHour, endMinute] = props.endTime.split(":").map(Number);
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  if (endTotalMinutes < startTotalMinutes) {
    // If the end time is earlier than the start time, assume it spans to the next day
    endTotalMinutes += 24 * 60;
  }

  const totalMinutes = endTotalMinutes - startTotalMinutes;
  return (totalMinutes / 60).toFixed(1);
});

const price = computed(() => {
  const hourRate = 80000; // Giá mặc định 80.000 VNĐ/giờ
  return hours.value * hourRate;
});

const showPopup = computed(() => {
  return props.show && props.startTime && props.endTime;
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