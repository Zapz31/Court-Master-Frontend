<template>
  <div class="controller">
    <a href="/">
      <img src="../../../public/img/mono_blue_crop.png" class="logo" alt="" />
    </a>
    <div class="date-picker">
      <input type="date" v-model="selectedDate" @change="handleDateChange" />
    </div>
    <div class="type-dropdown">
      <label>Type:</label>
      <select v-model="selectedType">
        <option value="one-time">One Time</option>
        <option value="flexible">Flexible</option>
        <option value="fixed">Fixed</option>
      </select>
    </div>
    <button class="book-btn">Book</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useScheduleStore } from "../../stores/scheduleStore";

const selectedDate = ref("");
const selectedType = ref("one-time");
const scheduleStore = useScheduleStore();

onMounted(() => {
  // Khởi tạo giá trị mặc định cho selectedDate là ngày hiện tại
  const currentDate = new Date().toISOString().split("T")[0];
  selectedDate.value = currentDate;
  handleDateChange();
});

const handleDateChange = () => {
  scheduleStore.updateSelectedDate(selectedDate.value);
};
</script>
  
  <style scoped>
.controller {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed; /* Fixed position */
  top: 0; /* Position at the top of the screen */
  left: 0; /* Position at the left of the screen */
  width: 100%; /* Full width */
  z-index: 1000; /* Ensure it's above other elements */
}

.book-btn {
  padding: 10px 20px;
  background-color: #6babf4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.book-btn:hover {
  background-color: #4a93e7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.book-btn:active {
  background-color: #3b7ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(0);
}

.date-picker input[type="date"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #333;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}

.date-picker input[type="date"]:hover {
  border-color: #6babf4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-picker input[type="date"]:focus {
  outline: none;
  border-color: #6babf4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.type-dropdown {
  display: flex;
  align-items: center;
}

.type-dropdown label {
  margin-right: 8px;
  color: #6babf4;
  font-weight: bold;
}

.type-dropdown select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #333;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}

.type-dropdown select:hover {
  border-color: #6babf4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.type-dropdown select:focus {
  outline: none;
  border-color: #6babf4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.logo {
  height: 32px;
  width: 120px;
}
</style>
  