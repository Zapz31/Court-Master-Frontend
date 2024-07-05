<template>
  <div class="box" @click.self="closeAllDropdowns">
    <!-- <div class="search">
      <input v-model="searchQuery" placeholder="Type a name..." type="text" />
    </div> -->
    <div class="filter">
      <div class="filter-item">
        <div class="dropdown-toggle" @click="toggleDropdown('startTime')" :class="{ active: dropdowns.startTime }">
          <span>{{ startTime || startTimeLabel }}</span>
          <i class="fas fa-clock"></i>
        </div>
        <div v-if="dropdowns.startTime" class="dropdown-content" @click.stop>
          <input type="time" v-model="startTime" @change="selectStartTime" class="time-input" />
        </div>
      </div>
      <div class="filter-item">
        <div class="dropdown-toggle" @click="toggleDropdown('endTime')" :class="{ active: dropdowns.endTime }">
          <span>{{ endTime || endTimeLabel }}</span>
          <i class="fas fa-clock"></i>
        </div>
        <div v-if="dropdowns.endTime" class="dropdown-content" @click.stop>
          <input type="time" v-model="endTime" @change="selectEndTime" class="time-input" />
        </div>
      </div>

      <!-- filter booking date -->
      <div class="filter-item">
        <div class="dropdown-toggle" @click="toggleDropdown('bookingDate')" :class="{ active: dropdowns.bookingDate }">
          <span>{{ bookingDate || bookingDateLabel }}</span>
          <i class="fas fa-calendar"></i>
        </div>
        <div v-if="dropdowns.bookingDate" class="dropdown-content" @click.stop>
          <input type="date" v-model="bookingDate" @change="selectBookingDate" class="date-input" />
        </div>
      </div>

      <!-- filter Check in status -->
      <div class="filter-item">
        <div class="dropdown-toggle" @click="toggleDropdown('checkInStatus')"
          :class="{ active: dropdowns.checkInStatus }">
          <span>{{ checkInStatus || checkInStatusLabel }}</span>
          <i class="fas fa-check"></i>
        </div>
        <div v-if="dropdowns.checkInStatus" class="dropdown-content" @click.stop>
          <select v-model="checkInStatus" @change="selectCheckInStatus" class="status-select">
            <option value="">Select Status</option>
            <option value="Checked in">Checked in</option>
            <option value="Not checked in">Not checked in</option>
          </select>
        </div>
      </div>


      <div class="button">
        <button @click="clearFilterSearch" type="button" class="button">
          Clear all filter
        </button>
      </div>

      <div class="button">
        <button @click="performSearch" type="submit" class="button">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, reactive, watch } from "vue";
import { useFilterHistoryStore } from "../../stores/FilterHistory";
const filterHistoryStore = useFilterHistoryStore();
const bookingDate = ref("");
const startTime = ref("");
const endTime = ref("");
const isCheckin = ref(2);
const checkInStatus = ref("");
const dropdowns = ref({
  startTime: false,
  endTime: false,
  bookingDate: false,
  checkInStatus: false
});
const startTimeLabel = ref("Start Time");
const endTimeLabel = ref("End Time");
const bookingDateLabel = ref("Booking Date");
const checkInStatusLabel = 'Check In Status';

const toggleDropdown = (dropdown) => {
  Object.keys(dropdowns.value).forEach(key => {
    if (key !== dropdown) {
      dropdowns.value[key] = false;
    }
  });
  dropdowns.value[dropdown] = !dropdowns.value[dropdown];
};

const closeAllDropdowns = () => {
  Object.keys(dropdowns.value).forEach(key => {
    dropdowns.value[key] = false;
  });
};

const handleOutsideClick = (event) => {
  const isOutsideClick = !event.target.closest('.filter-item');
  if (isOutsideClick) {
    closeAllDropdowns();
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const selectStartTime = () => {
  dropdowns.value.startTime = false;
};

const selectEndTime = () => {
  dropdowns.value.endTime = false;
};

const selectBookingDate = () => {
  dropdowns.value.bookingDate = false;
};

const selectCheckInStatus = () => {
  dropdowns.value.checkInStatus = false;
};

watch(checkInStatus, (newStatus) => {
  if (newStatus === 'Checked in') {
    isCheckin.value = 1;
  } else if (newStatus === 'Not checked in') {
    isCheckin.value = 0;
  } else {
    isCheckin.value = 2; // Default value if no status is selected
  }
});

const performSearch = async () => {
  const dataFilter = reactive({
    startTime: startTime.value,
    endTime: endTime.value,
    bookingDate: bookingDate.value,
    isCheckIn: isCheckin.value
  });
  await filterHistoryStore.getFilterBookingSlots(dataFilter);


  console.log("Searching with:", dataFilter);
  // Implement your search logic here
};

const clearFilterSearch = () => {
  isCheckin.value = 2;
  startTime.value = "";
  endTime.value = "";
  bookingDate.value = "",
    startTimeLabel.value = "Start Time";
  endTimeLabel.value = "End Time";
};
</script>

<style scoped>
.button button[type="button"].clear-button {
  background-color: grey;
  border: none;
  color: white;
  font-style: bold;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 20px;
  margin-right: 10px;
  transition: 0.3s ease;
}

.button button[type="button"].clear-button:hover {
  transform: scale(1.05);
  color: white;
  background-color: lightslategrey;
}

.time-input {
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 10px;
  width: 100%;
}

.search {
  display: flex;
  align-items: center;
  margin-right: 20px;
  position: relative;
}

.search input[type="text"] {
  background-color: white;
  color: black;
  padding: 10px;
  border: none;
  border-radius: 20px 0 0 20px;
  font-size: 16px;
  outline: none;
}

.box {
  background-color: white;
  display: flex;
  padding: 10px;
  border-radius: 25px;
  max-width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.box:hover {
  transform: scale(1.05);
}

.filter {
  display: flex;
  align-items: center;
}

.filter-item {
  margin-right: 10px;
  position: relative;
  cursor: pointer;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;
}

.filter-item:hover {
  transform: scale(1.1);
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dropdown-toggle.active {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.dropdown-toggle i {
  margin-left: 5px;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: -29px;
  background-color: white;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.dropdown-content div,
.dropdown-content input {
  padding: 10px;
  cursor: pointer;
}

.dropdown-content div:hover,
.dropdown-content input:hover {
  background-color: #ddd;
}

.button button[type="button"] {
  background-color: grey;
  border: none;
  color: white;
  font-style: bold;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 0px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  transition: 0.3s ease;
}

.button button[type="button"]:hover {
  transform: scale(1.05);
  color: white;
  background-color: lightslategrey;
}

.button button[type="submit"] {
  background-color: #6babf4;
  border: none;
  color: white;
  font-style: bold;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
}

.button button[type="submit"]:hover {
  transform: scale(1.05);
  color: white;
  background-color: rgb(28, 144, 183);
}

.date-input {
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 10px;
  width: 100%;
}
</style>