<template>
  <div class="box" @click.self="closeAllDropdowns">
    <div class="search">
      <input v-model="searchQuery" placeholder="Nhập tên câu lạc bộ/SĐT" type="text" />
    </div>
    <div class="filter">
      <div class="filter-item">
        <div class="dropdown-toggle" @click="toggleDropdown('startDate')" :class="{ active: dropdowns.startDate }">
          <span>{{ startDate || startDateLabel }}</span>
          <i class="fas fa-calendar"></i>
        </div>
        <div v-if="dropdowns.startDate" class="dropdown-content" @click.stop>
          <input type="date" v-model="startDate" @change="selectStartDate" class="date-input" />
        </div>
      </div>
      <div class="filter-item">
        <div class="dropdown-toggle" @click="toggleDropdown('endDate')" :class="{ active: dropdowns.endDate }">
          <span>{{ endDate || endDateLabel }}</span>
          <i class="fas fa-calendar"></i>
        </div>
        <div v-if="dropdowns.endDate" class="dropdown-content" @click.stop>
          <input type="date" v-model="endDate" @change="selectEndDate" class="date-input" />
        </div>
      </div>
      <div class="filter-item">
        <div class="dropdown-toggle" @click="toggleDropdown('type')" :class="{ active: dropdowns.type }">
          <span>{{ selectedType || typeLabel }}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div v-if="dropdowns.type" class="dropdown-content" @click.stop>
          <div v-for="type in types" :key="type" @click="selectType(type)">
            {{ type }}
          </div>
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
import { onMounted, onUnmounted, ref } from "vue";
import { useFilterHistoryStore } from "../../stores/FilterHistory";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const searchQuery = ref("");
const startDate = ref("");
const endDate = ref("");
const selectedType = ref("");

const dropdowns = ref({
  startDate: false,
  endDate: false,
  type: false,
});

const startDateLabel = ref("Ngày bắt đầu");
const endDateLabel = ref("Ngày kết thúc");
const typeLabel = ref("Loại lịch");

const types = ["One-time play", "Fixed", "Flexible"];

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

const selectType = (type) => {
  selectedType.value = type;
  typeLabel.value = type;
  dropdowns.value.type = false;
};

const performSearch = async () => {
  // const dataFilter = {
  //   name: searchQuery.value,
  //   startDate: startDate.value,
  //   endDate: endDate.value,
  //   type: selectedType.value
  // };
  // console.log("Searching with:", dataFilter);
  // // Implement your search logic here

  // clubNameOrCMPhone: "",
  //       customerId: "STF000002",
  //       startDate: "",
  //       endDate: "",
  //       scheduleType: ""
  useFilterHistoryStore().payload.clubNameOrCMPhone = searchQuery.value
  useFilterHistoryStore().payload.customerId = authStore.user.userId
  useFilterHistoryStore().payload.startDate = startDate.value
  useFilterHistoryStore().payload.endDate = endDate.value
  useFilterHistoryStore().payload.scheduleType = selectedType.value
  await useFilterHistoryStore().getBookingScheduleHitories();
};

const clearFilterSearch = () => {
  searchQuery.value = '';
  startDate.value = '';
  endDate.value = '';
  selectedType.value = '';
  startDateLabel.value = 'Ngày bắt đầu';
  endDateLabel.value = 'Ngày kết thúc';
  typeLabel.value = 'Loại lịch';
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
  margin-bottom: 45px;
  display: flex;
  padding: 10px;
  border-radius: 25px;
  max-width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
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
  min-width: 150px; /* Thêm độ rộng tối thiểu */
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
  width: 100%;
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
  left: 0; /* Căn chỉnh với cạnh trái của filter-item */
  right: 0; /* Căn chỉnh với cạnh phải của filter-item */
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 10px 10px;
  z-index: 1; /* Đảm bảo dropdown hiển thị trên các phần tử khác */
}

.dropdown-content div,
.dropdown-content input,
.dropdown-content select {
  padding: 10px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}

.dropdown-content div:hover,
.dropdown-content input:hover,
.dropdown-content select:hover {
  background-color: #f1f1f1;
}

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

.button button[type="button"] {
  background-color: grey;
  border: none;
  color: white;
  font-style: bold;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 20px 0px 0px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
}

.button button[type="button"]:hover {
  transform: scale(1.05);
  border-radius: 20px 5px 5px 20px;
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
  border-radius: 5px 20px 20px 5px;
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