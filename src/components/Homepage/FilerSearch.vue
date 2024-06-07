<template>
  <div class="box" @click.self="closeAllDropdowns">
    <div class="search">
      <input
        v-model="searchQuery"
        @input="filterResults"
        placeholder="Type a name or address..."
        type="text"
      />
      <div v-if="filteredResults.length > 0" class="search-results">
        <div
          v-for="result in filteredResults"
          :key="result.id"
          @click="selectResult(result)"
        >
          {{ result.name }} - {{ result.address }}
        </div>
      </div>
    </div>
    <div class="filter">
      <div class="filter-item" @click.stop="toggleDropdown('city')">
        <span>{{ selectedCity || cityLabel }}</span>
        <div v-if="dropdowns.city" class="dropdown-content">
          <div v-for="city in cities" :key="city" @click="selectCity(city)">
            {{ city }}
          </div>
        </div>
      </div>
      <div class="filter-item" @click.stop="toggleDropdown('district')">
        <span>{{ selectedDistrict || districtLabel }}</span>
        <div v-if="dropdowns.district" class="dropdown-content">
          <div
            v-for="district in districts"
            :key="district"
            @click="selectDistrict(district)"
          >
            {{ district }}
          </div>
        </div>
      </div>
      <div class="filter-item" @click.stop="toggleDropdown('openTime')">
        <span>{{ openTimeLabel }}</span>
        <div v-if="dropdowns.openTime" class="dropdown-content">
          <input type="time" v-model="openTime" @change="selectOpenTime" />
        </div>
      </div>
      <div class="filter-item" @click.stop="toggleDropdown('hoursExpect')">
        <span>{{ hoursExpectLabel }}</span>
        <div v-if="dropdowns.hoursExpect" class="dropdown-content">
          <input
            type="time"
            v-model="hoursExpect"
            @change="selectHoursExpect"
          />
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
import { computed, onMounted, onUnmounted, ref } from "vue";

const searchQuery = ref("");
const selectedCity = ref("");
const selectedDistrict = ref("");

// ===============================TEST DATA=====================================
const cities = ref(["Hanoi", "Ho Chi Minh City", "Da Nang"]);
const districts = ref(["District 1", "District 2", "District 3"]);

// Dummy data for search results
const searchResults = ref([
  { id: 1, name: "Club A", address: "abc, Ho Chi Minh City" },
  { id: 2, name: "Club B", address: "def, Hanoi" },
  { id: 3, name: "Club C", address: "ghi, Da Nang" },
  // Add more results as needed
]);

// =============================================================================

const openTime = ref("");
const hoursExpect = ref("");
const dropdowns = ref({
  city: false,
  district: false,
  openTime: false,
  hoursExpect: false,
});

const cityLabel = ref("City/Province");
const districtLabel = ref("District");
const openTimeLabel = ref("Opened time");
const hoursExpectLabel = ref("Hours of expect");

const filteredResults = computed(() => {
  if (!searchQuery.value) return [];
  return searchResults.value.filter(
    (result) =>
      result.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      result.address.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filterResults = () => {
  // No additional logic needed here
};

const toggleDropdown = (dropdown) => {
  closeAllDropdowns();
  dropdowns.value[dropdown] = !dropdowns.value[dropdown];
};

const closeAllDropdowns = () => {
  dropdowns.value.city = false;
  dropdowns.value.district = false;
  dropdowns.value.openTime = false;
  dropdowns.value.hoursExpect = false;
};

defineExpose({
  closeAllDropdowns,
});

const handleOutsideClick = (event) => {
  const filterSearch = document.querySelector(".filter_search");
  if (filterSearch && !filterSearch.contains(event.target)) {
    closeAllDropdowns();
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const selectCity = (city) => {
  selectedCity.value = city;
  cityLabel.value = city;
  dropdowns.value.city = false;
};

const selectDistrict = (district) => {
  selectedDistrict.value = district;
  districtLabel.value = district;
  dropdowns.value.district = false;
};

const selectOpenTime = () => {
  openTimeLabel.value = openTime.value;
  dropdowns.value.openTime = false;
};

const selectHoursExpect = () => {
  hoursExpectLabel.value = hoursExpect.value;
  dropdowns.value.hoursExpect = false;
};

const selectResult = (result) => {
  searchQuery.value = `${result.name} - ${result.address}`;
};

const performSearch = () => {
  console.log(`Searching for: ${searchQuery.value}`);
  console.log(`City: ${selectedCity.value}`);
  console.log(`District: ${selectedDistrict.value}`);
  console.log(`Open Time: ${openTime.value}`);
  console.log(`Hours Expect: ${hoursExpect.value}`);
};
</script>

<style scoped>
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

.button button[type="submit"] {
  background-color: #6babf4;
  border: none;
  color: white;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
}

.button button[type="submit"]:hover {
  transform: scale(1.05);
  color: white;
  background-color: blue;
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

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 10px;
  z-index: 1;
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

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 10px;
  z-index: 1;
  width: calc(100% - 60px);
}

.search-results div {
  padding: 10px;
  cursor: pointer;
}

.search-results div:hover {
  background-color: #ddd;
}

.selected-value {
  margin-top: 5px;
  font-size: 14px;
  color: gray;
}
</style>
