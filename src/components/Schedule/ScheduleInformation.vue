<template>
  <div class="schedule-information-wrapper" :class="{ 'is-open': isOpen }">
    <button @click="toggleDropdown" class="toggle-button">
      <span v-if="isOpen">&#9654;</span>
      <span v-else>&#9664;</span>
    </button>
    <div class="schedule-information" ref="infoPanel">
      <h3>Booking Information</h3>
      <div class="info-scroll">
        <div v-if="selectedSlots.length > 0">
          <div
            v-for="(slot, index) in selectedSlots"
            :key="index"
            class="info-item"
          >
            <label>Date: {{ slot.date }}</label>
            <label>Time: {{ slot.startTime }} - {{ slot.endTime }}</label>
            <label
              >Duration:
              {{ calculateHours(slot.startTime, slot.endTime) }}</label
            >
            <label>Price: {{ slot.price }} VNĐ</label>
            <label>
              Booking Type:
              {{ capitalizeFirstLetter(slot.bookingType) }}
            </label>
            <label>Court: {{ getCourtName(slot.court) }}</label>
          </div>
        </div>
        <div v-else class="info-item">
          <label>Not selected time yet</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useClubStore } from "../../stores/clubMng";
import { useScheduleStore } from "../../stores/scheduleStore";

const scheduleStore = useScheduleStore();
const clubStore = useClubStore();
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectedSlots = computed(() => {
  return scheduleStore.slots.filter((slot) => slot.status === "selected");
});

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const calculateHours = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  const totalMinutes = endTotalMinutes - startTotalMinutes;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

const getCourtName = (courtId) => {
  const court = clubStore.currentClub?.courtList.find(
    (c) => c.courtId === courtId
  );
  return court ? court.courtName : courtId;
};
</script>


<style scoped>
.schedule-information-wrapper {
  position: fixed;
  right: -33.33%;
  top: 100px;
  height: calc(
    100% - 100px
  ); /* Adjusted to fit within the screen, accounting for the top offset */
  width: 33.33%;
  transition: right 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: stretch;
}

.schedule-information-wrapper.is-open {
  right: 0;
}

.toggle-button {
  border-radius: 10px;
  color: white;
  position: absolute;
  left: -46px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #6babf4;
  border: none;
  padding-top: 50px;
  padding-bottom: 50px;
  cursor: pointer;
  font-size: 16px;
  width: 36px;
  height: auto;
  white-space: normal;
  text-align: center;
  line-height: 1.2;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
}

.schedule-information {
  background-color: #f5f5f5;
  padding: 16px;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.info-scroll {
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
}

.info-item {
  border-radius: 14px;
  margin-bottom: 20px;
  padding: 10px;
  background: #6babf4;
  color: white;
  position: relative;
}

.info-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

/* Scrollbar styles */
.info-scroll::-webkit-scrollbar {
  width: 8px;
}

.info-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.info-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.info-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 1200px) {
  .schedule-information-wrapper {
    width: 40%;
    right: -40%;
  }
}

@media (max-width: 992px) {
  .schedule-information-wrapper {
    width: 50%;
    right: -50%;
  }
}

@media (max-width: 768px) {
  .schedule-information-wrapper {
    width: 60%;
    right: -60%;
  }
  .toggle-button {
    left: -60px;
    width: 60px;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .schedule-information-wrapper {
    width: 80%;
    right: -80%;
  }
  .toggle-button {
    left: -50px;
    width: 50px;
    font-size: 12px;
  }
}
</style>