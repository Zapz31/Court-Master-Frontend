<template>
  <div class="slot">
    <div class="clubName">
      <h2>{{ clubName }}</h2>
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
            <th>Price</th>
            <th>Check in</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.col2 }}</td>
            <td>{{ item.col3 }}</td>
            <td>{{ item.col4 }}</td>
            <td>{{ item.col5 }}</td>
            <td>{{ item.col6 }}</td>
            <td>{{ item.col7 }}</td>
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
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const clubName = ref('BadmintonSpace Arena');

const items = ref([
  { col2: '1', col3: 'BS000001', col4: '16/05/2024', col5: '8:50', col6: '11:00', col7: '150.000 VNĐ', status: 'Checked in' },
  { col2: '2', col3: 'BS000002', col4: '17/05/2024', col5: '13:00', col6: '15:00', col7: '140.000 VNĐ', status: 'Not checked in' },
  { col2: '3', col3: 'BS000003', col4: '18/05/2024', col5: '11:00', col6: '13:00', col7: '160.000 VNĐ', status: 'Not checked in' },
  // Add other items as necessary
]);

// Registering the component
const components = {
  FontAwesomeIcon
};
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