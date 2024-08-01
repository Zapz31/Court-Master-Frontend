<template>
  <div class="slot">
    <div class="clubName">
      <h2>Club: {{ clubName }}</h2>
    </div>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>ID Khung giờ</th>
            <th>Ngày đặt</th>
            <th>Giờ bắt đầu</th>
            <th>Giờ kết thúc</th>
            <th>Giá/Giờ</th>
            <th>Trạng thái check-in</th>
            <th>Tên sân</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.bookingSlotId }}</td>
            <td>{{ item.bookingDate }}</td>
            <td>{{ item.startTime }}</td>
            <td>{{ item.endTime }}</td>
            <td>{{ item.price }}</td>
            <td v-if="item.isCheckIn === 0">Chưa checked in</td>
            <td v-else>Đã checked in</td>
            <td>{{ item.courtName }}</td>
            <td>
              <span class="status" :class="item.status">
                {{ item.status }}
              </span>
            </td>
            <td>
              <button class="button" @click="openPopup">Đổi giờ chơi</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Popup -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <h2>Các giờ chơi có thể thực hiện chuyển</h2>
        <select v-model="selectedTime" class="dropdown">
          <option v-for="time in availableTimes" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
        <div class="button-group">
          <button @click="confirmChange" class="confirm-button">
            Xác nhận
          </button>
          <button @click="cancelChange" class="cancel-button">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, onMounted, ref } from "vue";
import { useFilterHistoryStore } from "../../stores/FilterHistory";
const filterHistoryStore = useFilterHistoryStore();

const urlParams = new URLSearchParams(window.location.search);
const paymentData = Object.fromEntries(urlParams.entries());

const clubName = filterHistoryStore.currentClubName;

const items = computed(() => filterHistoryStore.bookingSlots);

// Registering the component
const components = {
  FontAwesomeIcon,
};

//----------------------------------POP UP----------------------------------------

// Popup related data
const showPopup = ref(false);
const selectedTime = ref("");
const availableTimes = ref([
  "Monday 10:00 AM - 11:00 AM AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "Monday 10:00 AM - 11:00 AM AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "Monday 10:00 AM - 11:00 AM AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "Monday 10:00 AM - 11:00 AM AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",

  // Add more available times as needed
]);

const openPopup = () => {
  showPopup.value = true;
};

const confirmChange = () => {
  // Handle confirmation logic here
  console.log("Confirmed new time:", selectedTime.value);
  showPopup.value = false;
};

const cancelChange = () => {
  showPopup.value = false;
};

//------------------------------------------------------------------------------

onMounted(async () => {
  filterHistoryStore.currentBookingScheduleId = paymentData.scheduleId;
  await filterHistoryStore.getBookingSlots(paymentData.scheduleId);
  items.value = filterHistoryStore.bookingSlots;
});
</script>

<style scoped>
.clubName {
  font-size: medium;
  color: #033f7a;
}

.button {
  border: none;
  background-color: blue;
  padding: 12px;
  border-radius: 10px;
  color: white;
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: none;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
}

tr {
  border-bottom: 1px solid #ddd;
}

tr:last-child {
  border-bottom: none;
}

thead {
  border-bottom: 1px solid #ddd;
}

input[type="checkbox"] {
  margin: 0;
}

.fa-icon {
  vertical-align: middle;
}

.status {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8em;
}

.Not.checked.in {
  background-color: #ffcccb;
  color: #d8000c;
}

.Checked.in {
  background-color: #dff2bf;
  color: #4f8a10;
}

a {
  color: #0066cc;
  text-decoration: none;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 68%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dropdown-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.dropdown {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button {
  background-color: #4caf50;
  color: white;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}
</style>