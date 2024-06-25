<template>
  <div class="schedule-information-wrapper" :class="{ 'is-open': isOpen }">
    <div class="schedule-information" ref="infoPanel">
      <h3>Thông tin đặt sân</h3>
      <div class="info-scroll">
        <div v-if="scheduleSessions.length > 0">
          <div
            v-for="(session, index) in scheduleSessions"
            :key="index"
            class="info-item"
          >
            <label>
              Time: {{ session.startTime }} - {{ session.endTime }}
            </label>
            <label>
              Hours: {{ calculateHours(session.startTime, session.endTime) }} h
            </label>
            <label>Price: {{ session.price }} VNĐ</label>
            <label>Court: {{ session.court }}</label>
          </div>
        </div>
        <div v-else class="info-item">
          <label>Chưa chọn khung giờ chơi</label>
        </div>
      </div>
    </div>
    <button @click="toggleDropdown" class="toggle-button">
      <span v-if="isOpen">&#9654;</span>
      <span v-else>&#9664;</span>
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useScheduleStore } from "../../stores/scheduleStore";

const scheduleStore = useScheduleStore();
const isOpen = ref(false);
const infoPanel = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const scheduleSessions = computed(() => scheduleStore.sessions);

const calculateHours = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  const totalMinutes = endTotalMinutes - startTotalMinutes;
  return (totalMinutes / 60).toFixed(1);
};

const updateHeight = () => {
  const table = document.querySelector(".schedule-table-wrapper table");
  const tbody = table ? table.querySelector("tbody") : null;
  if (tbody && infoPanel.value) {
    const tbodyRect = tbody.getBoundingClientRect();
    infoPanel.value.style.height = `${tbodyRect.height}px`;
    infoPanel.value.style.top = `${tbodyRect.top}px`;
  }
};

onMounted(() => {
  updateHeight();
  window.addEventListener("resize", updateHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateHeight);
});
</script>

<style scoped>
.schedule-information-wrapper {
  position: fixed;
  right: -33.33%;
  top: 0;
  height: 100%;
  width: 33.33%;
  transition: right 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
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
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.info-scroll {
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
  max-height: calc(
    3 * (80px + 4 * 8px + 38px)
  ); /* Adjust based on your info-item structure */
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