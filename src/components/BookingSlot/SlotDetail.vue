<template>
    <div class="history">
      <div class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>No</th>
              <th>Schedules ID</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
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
              <td>
                <span class="status" :class="item.status">
                  {{ item.status }}
                </span>
              </td>
              <td>
                <div class="center-content">
                  <a :href="item.link" target="_blank">
                    <font-awesome-icon icon="eye" />
                  </a>
                </div>
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
  
  const items = ref([
    { checked: false, col2: '1', col3: '00000001', col4: 'BadmintonSpace Arena', col5: '15/05/2024', col6: 'N/A', status: 'not-started', link: 'https://example.com' },
    { checked: false, col2: '2', col3: '00000002', col4: 'San cua Tien', col5: '15/05/2024', col6: '15/10/2024', status: 'ongoing', link: 'https://example.com' },
    { checked: false, col2: '3', col3: '00000003', col4: 'San khong ten', col5: '16/05/2024', col6: '16/07/2024', status: 'finished', link: 'https://example.com' },
    // Add other items as necessary
  ]);
  
  // Registering the component
  const components = {
    FontAwesomeIcon
  };
  </script>
  
  <style scoped>
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
  
  .not-started {
    background-color: #ffcccb;
    color: #d8000c;
  }
  
  .ongoing {
    background-color: #fff6dd;
    color: #9f6000;
  }
  
  .finished {
    background-color: #dff2bf;
    color: #4f8a10;
  }
  
  a {
    color: #0066cc;
    text-decoration: none;
  }
  </style>