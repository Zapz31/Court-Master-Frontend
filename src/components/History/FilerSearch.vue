<template>
  <div class="box" @click.self="closeAllDropdowns">
    <div class="search">
      <input
        v-model="searchQuery"
        placeholder="Type a name..."
        type="text"
      />
    </div>
    <div class="filter">
      <div class="filter-item">
        <div
          class="dropdown-toggle"
          @click="toggleDropdown('startDate')"
          :class="{ active: dropdowns.startDate }"
        >
          <span>{{ startDate || startDateLabel }}</span>
          <i class="fas fa-calendar"></i>
        </div>
        <div v-if="dropdowns.startDate" class="dropdown-content" @click.stop>
          <input
            type="date"
            v-model="startDate"
            @change="selectStartDate"
            class="date-input"
          />
        </div>
      </div>
      <div class="filter-item">
        <div
          class="dropdown-toggle"
          @click="toggleDropdown('endDate')"
          :class="{ active: dropdowns.endDate }"
        >
          <span>{{ endDate || endDateLabel }}</span>
          <i class="fas fa-calendar"></i>
        </div>
        <div v-if="dropdowns.endDate" class="dropdown-content" @click.stop>
          <input
            type="date"
            v-model="endDate"
            @change="selectEndDate"
            class="date-input"
          />
        </div>
      </div>
      <div class="filter-item">
        <div
          class="dropdown-toggle"
          @click="toggleDropdown('status')"
          :class="{ active: dropdowns.status }"
        >
          <span>{{ selectedStatus || statusLabel }}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div v-if="dropdowns.status" class="dropdown-content" @click.stop>
          <div
            v-for="status in statuses"
            :key="status"
            @click="selectStatus(status)"
          >
            {{ status }}
          </div>
        </div>
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
import { onMounted, onUnmounted, ref } from "vue";

const searchQuery = ref("");
const startDate = ref("");
const endDate = ref("");
const selectedStatus = ref("");

const dropdowns = ref({
  startDate: false,
  endDate: false,
  status: false,
});

const startDateLabel = ref("Start Date");
const endDateLabel = ref("End Date");
const statusLabel = ref("Status");

const statuses = ["Status", "Not Started", "Ongoing", "Finished"];

const toggleDropdown = (dropdown) => {
  // Close all other dropdowns
  Object.keys(dropdowns.value).forEach(key => {
    if (key !== dropdown) {
      dropdowns.value[key] = false;
    }
  });
  
  // Toggle the clicked dropdown
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

const selectStartDate = () => {
  dropdowns.value.startDate = false;
};

const selectEndDate = () => {
  dropdowns.value.endDate = false;
};

const selectStatus = (status) => {
  selectedStatus.value = status;
  statusLabel.value = status;
  dropdowns.value.status = false;
};

const performSearch = async () => {
  const dataFilter = {
    name: searchQuery.value,
    startDate: startDate.value,
    endDate: endDate.value,
    status: selectedStatus.value
  };
  console.log("Searching with:", dataFilter);
  // Implement your search logic here
};
</script>

<style scoped>
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

.button button[type="submit"] {
  background-color: #6babf4;
  border: none;
  color: white;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
}

.button button[type="submit"]:hover {
  transform: scale(1.05);
  color: white;
  background-color: blue;
}

.date-input {
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 10px;
  width: 100%;
}
</style>