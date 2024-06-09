<!-- src/components/Schedule/ScheduleInformation.vue -->
<template>
  <div class="schedule-information">
    <div class="info-item">
      <label>Time: {{ time }}</label>
      <br />
      <label for="">Hours: {{ hours }} h</label>
    </div>
    <div class="info-item">
      <label>Price: {{ price }} VNĐ</label>
    </div>
    <div class="info-item">
      <label>Date: {{ date }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Các giá trị ví dụ, bạn có thể thay thế bằng giá trị động
const time = ref("01:00 - 02:30");
const hours = ref("1.5");
const price = ref("200.000");
const date = ref("09/06/2024");
</script>

<style scoped>
.schedule-information {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 68px;
  background-color: #f5f5f5;
  padding: 16px;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000; /* Đảm bảo nằm trên cùng */
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  font-weight: italic;
  margin-bottom: 2.8px;
}
</style>
