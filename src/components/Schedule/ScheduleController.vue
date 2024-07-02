<template>
  <div class="controller">
    <a href="/">
      <img src="../../../public/img/mono_blue_crop.png" class="logo" alt="" />
    </a>
    <div class="date-picker" v-if="selectedType !== 'fixed'">
      <input type="date" v-model="selectedDate" @change="handleDateChange" />
    </div>
    <div v-else class="date-range-picker">
      <div class="date-picker">
        <label>Start Date:</label>
        <input
          type="date"
          v-model="startDate"
          @change="handleStartDateChange"
        />
      </div>
      <div class="date-picker">
        <label>End Date:</label>
        <input
          type="date"
          v-model="endDate"
          @change="handleEndDateChange"
          :min="minEndDate"
        />
      </div>
    </div>
    <div class="type-dropdown">
      <label>Type:</label>
      <select v-model="selectedType" @change="updateCurrentBookingType">
        <option value="one-time">One Time</option>
        <option value="flexible">Flexible</option>
        <option value="fixed">Fixed</option>
      </select>
    </div>
    <button class="book-btn">Book</button>
    <p v-if="dateRangeError" class="error-message">{{ dateRangeError }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useScheduleStore } from "../../stores/scheduleStore";

const selectedDate = ref("");
const startDate = ref("");
const endDate = ref("");
const selectedType = ref("one-time");
const dateRangeError = ref("");
const scheduleStore = useScheduleStore();

const minEndDate = computed(() => {
  if (!startDate.value) return "";
  const minDate = new Date(startDate.value);
  minDate.setMonth(minDate.getMonth() + 1);
  return minDate.toISOString().split("T")[0];
});

onMounted(() => {
  const currentDate = new Date().toISOString().split("T")[0];
  selectedDate.value = currentDate;
  startDate.value = currentDate;
  handleDateChange();
  updateCurrentBookingType();
});

const updateCurrentBookingType = () => {
  scheduleStore.setCurrentBookingType(selectedType.value);
  if (selectedType.value === "fixed") {
    scheduleStore.updateSelectedDateRange({
      start: startDate.value,
      end: endDate.value,
    });
  } else {
    scheduleStore.updateSelectedDate(selectedDate.value);
  }
  dateRangeError.value = ""; // Clear any existing error when changing booking type
};

const handleDateChange = () => {
  scheduleStore.updateSelectedDate(selectedDate.value);
};

const handleStartDateChange = () => {
  endDate.value = ""; // Reset end date when start date changes
  dateRangeError.value = ""; // Clear any existing error
  scheduleStore.updateSelectedDateRange({
    start: startDate.value,
    end: endDate.value,
  });
};

const handleEndDateChange = () => {
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const minEndDate = new Date(start);
  minEndDate.setMonth(minEndDate.getMonth() + 1);

  if (end < minEndDate) {
    dateRangeError.value =
      "End date must be at least one month after the start date.";
    endDate.value = ""; // Reset invalid end date
  } else {
    dateRangeError.value = "";
    scheduleStore.updateSelectedDateRange({
      start: startDate.value,
      end: endDate.value,
    });
  }
};

watch(selectedType, updateCurrentBookingType);
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
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

.date-picker,
.date-range-picker {
  display: flex;
  align-items: center;
}

.date-picker label,
.date-range-picker label {
  margin-right: 8px;
  color: #6babf4;
  font-weight: bold;
}

.date-picker input[type="date"],
.date-range-picker input[type="date"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #333;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}

.date-picker input[type="date"]:hover,
.date-range-picker input[type="date"]:hover {
  border-color: #6babf4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-picker input[type="date"]:focus,
.date-range-picker input[type="date"]:focus {
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

.date-range-picker {
  display: flex;
  gap: 16px;
}
</style>