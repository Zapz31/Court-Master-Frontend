<template>
  <div class="schedule">
    <div class="table-container">
      <div class="button-container">
        <button @click="deleteSelected" :disabled="!hasSelection" class="delete-button">
          Xóa lựa chọn
        </button>
      </div>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>ID</th>
              <th>Tên câu lạc bộ</th>
              <th>Loại</th>
              <th>Trạng thái</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Tổng giá/giờ</th>
              <th>SĐT người quản lý</th>
              <th>Khung giờ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>
                <div class="center-content">
                  <input type="checkbox" v-model="item.checked">
                </div>
              </td>
              <td>{{ index + 1 }}</td>
              <td>{{ item.bookingScheduleId }}</td>
              <td>{{ item.clubName }}</td>
              <td>{{ item.scheduleType }}</td>
              <td>{{ item.bookingScheduleStatus }}</td>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>
              <td v-if="item.scheduleType === 'Flexible'">{{ item.totalPlayingTimeString }}</td>
              <td v-else>{{ item.totalPrice }}</td>
              <td>{{ item.courtManagerPhone }}</td>
              <td>
                <div class="center-content">
                  <router-link :to="{ name: 'BookingSlotScreen', params: { scheduleId: item.bookingScheduleId } }"
                  @click.native.prevent="setCurrentBooking(item)"
                  >
                    <font-awesome-icon icon="eye" />
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
import { useFilterHistoryStore } from '../../stores/FilterHistory';
import { useAuthStore } from '../../stores/auth';
import axios from 'axios';

const filterHistoryStore = useFilterHistoryStore();
const authStore = useAuthStore()
const router = useRouter();
const items = ref([]);

const deleteSelected = async() => {
  const selectedBookings = items.value.filter(item => item.checked).map(item => item.bookingScheduleId);
  try {
    const response = await axios.post(`http://localhost:8080/courtmaster/filter/history/remove/booking-schedule`,{
      bookingScheduleIds: selectedBookings
    });
    await filterHistoryStore.getBookingScheduleHitories();
    items.value = response.data
  } catch (error) {
    console.log(error)
  }
  items.value = items.value.filter(item => !item.checked);
};

const hasSelection = computed(() => {
  return items.value.some(item => item.checked);
});

const navigateToBookingSlot = (scheduleId) => {
  router.push({ name: 'BookingSlotScreen', params: { scheduleId } });
};

const components = {
  FontAwesomeIcon
};

// Lay du lieu ve booking schedule khi bam vao icon router link de set no vaof cho mot thuoc tinh pinia
const setCurrentBooking = (item) => {
  filterHistoryStore.currentClubName = item.clubName;
};

onMounted(async () => {
  filterHistoryStore.payload.customerId = authStore.user.userId
  await filterHistoryStore.getBookingScheduleHitories();
  items.value = filterHistoryStore.bookingScheduleHistoies;
  console.log('Items:', items.value); // Ensure items are being set correctly
});

watch(() => useFilterHistoryStore().bookingScheduleHistoies, (newHistories) => {
  items.value = newHistories;
}, { immediate: true });
</script>

<style scoped>
.table-container {
  position: relative;
  width: 100%;
  z-index: 15;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.delete-button {
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}

.delete-button:disabled {
  background-color: #cccccc;
  cursor: default;
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

th, td {
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

a {
  color: #0066cc;
  text-decoration: none;
}
</style>
