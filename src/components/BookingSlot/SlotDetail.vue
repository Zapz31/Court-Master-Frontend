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
            <th>Slot ID</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Price/Hours</th>
            <th>Check in</th>
            <th>Court name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.courtId }}</td>
            <td>{{ item.bookingDate }}</td>
            <td>{{ item.startTime }}</td>
            <td>{{ item.endTime }}</td>
            <td>{{ item.price }}</td>
            <td v-if="item.isCheckIn === 0">Not checked in</td>
            <td v-else>Checked in</td>
            <td>{{ item.courtName }}</td>
            <td>
              <span class="status" :class="item.status">
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup> 
import { ref, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useFilterHistoryStore } from '../../stores/FilterHistory';
const filterHistoryStore = useFilterHistoryStore()

const urlParams = new URLSearchParams(window.location.search);
const paymentData = Object.fromEntries(urlParams.entries());

const clubName = filterHistoryStore.currentClubName;

const items = computed(() => filterHistoryStore.bookingSlots);

// Registering the component
const components = {
  FontAwesomeIcon
};

onMounted(async() => {
  filterHistoryStore.currentBookingScheduleId = paymentData.scheduleId
  await filterHistoryStore.getBookingSlots(paymentData.scheduleId)
  items.value = filterHistoryStore.bookingSlots
});
</script>

<style scoped>
.clubName {
  font-size: medium;
  color: #033f7a;
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
</style>