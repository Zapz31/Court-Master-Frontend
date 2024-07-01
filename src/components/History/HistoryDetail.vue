<template>
  <div class="schedule">
    <div class="table-container">
      <div class="button-container">
        <button @click="deleteSelected" :disabled="!hasSelection" class="delete-button">
          Delete Selected
        </button>
      </div>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>No</th>
              <th>ID</th>
              <th>Club Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total price/hours</th>
              <th>Manager Phone</th>
              <th>Booking Slot</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>
                <div class="center-content">
                  <input type="checkbox" v-model="item.checked">
                </div>
              </td>
              <td>{{ item.col2 }}</td>
              <td>{{ item.col3 }}</td>
              <td>{{ item.col4 }}</td>
              <td>{{ item.col5 }}</td>
              <td>{{ item.col6 }}</td>
              <td>{{ item.col7 }}</td>
              <td>{{ item.col8 }}</td>
              <td>{{ item.col9 }}</td>
              <td>{{ item.col10 }}</td>             
              <td>
                <div class="center-content">
                  <router-link :to="{ name: 'BookingSlotScreen', params: { scheduleId: item.col3 } }">
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
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
  { checked: false, col2: '1', col3: 'SD0000001', col4: 'BadmintonSpace Arena', col5: 'One-time play', col6: 'Deposited 50%', col7: '20/05/2024', col8: '25/05/2024', col9: '900.000 VNĐ', col10: '0123456789' },
  { checked: false, col2: '2', col3: 'SD0000002', col4: 'San cua Tien', col5: 'Fixed', col6: 'Deposited 25%', col7: '15/10/2024', col8: '20/10/2024', col9: '1.000.000 VNĐ', col10: '9876543210' },
  { checked: false, col2: '3', col3: 'SD0000003', col4: 'San khong ten', col5: 'Fixed', col6: 'Paid', col7: '16/07/2024', col8: '20/07/2024', col9: '1.237.000 VNĐ', col10: '0246813579' },
  // Add other items as necessary
]);

const hasSelection = computed(() => {
  return items.value.some(item => item.checked);
});

const deleteSelected = () => {
  items.value = items.value.filter(item => !item.checked);
};

const navigateToBookingSlot = (scheduleId) => {
  router.push({ name: 'BookingSlotScreen', params: { scheduleId } });
};

// Registering the component
const components = {
  FontAwesomeIcon
};
</script>

<style scoped>
.table-container {
  position: relative;
  width: 100%;
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

a {
  color: #0066cc;
  text-decoration: none;
}
</style>