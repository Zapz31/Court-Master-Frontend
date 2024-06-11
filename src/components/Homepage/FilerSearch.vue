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
          v-for="(result, index) in displayedResults"
          :key="index"
          @click="selectResult(result)"
        >
          {{ result.name }} - {{ result.address }}
        </div>
        <div v-if="filteredResults.length > 5" class="scroll-indicator">
          Scroll for more results
        </div>
      </div>
    </div>
    <div class="filter">
      <div class="filter-item">
        <div
          class="dropdown-toggle"
          @click.stop="toggleDropdown('city')"
          :class="{ active: dropdowns.city }"
        >
          <span>{{ selectedCity || cityLabel }}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div v-if="dropdowns.city" class="dropdown-content">
          <input
            v-model="citySearch"
            @input="filterCities"
            type="text"
            placeholder="Search cities..."
          />
          <div
            v-for="(city, index) in displayedCities"
            :key="index"
            @click="selectCity(city)"
          >
            {{ city }}
          </div>
          <div v-if="filteredCities.length > 5" class="scroll-indicator">
            Scroll for more
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div
          class="dropdown-toggle"
          @click.stop="toggleDropdown('district')"
          :class="{ active: dropdowns.district }"
        >
          <span>{{ selectedDistrict || districtLabel }}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div v-if="dropdowns.district" class="dropdown-content">
          <input
            v-model="districtSearch"
            @input="filterDistricts"
            type="text"
            placeholder="Search districts..."
          />
          <div
            v-for="(district, index) in displayedDistricts"
            :key="index"
            @click="selectDistrict(district)"
          >
            {{ district }}
          </div>
          <div v-if="filteredDistricts.length > 5" class="scroll-indicator">
            Scroll for more
          </div>
        </div>
      </div>
      <div class="filter-item" @click.stop="toggleDropdown('openTime')">
        <span>{{ openTimeLabel }}</span>
        <div v-if="dropdowns.openTime" class="dropdown-content time-dropdown">
          <input
            type="time"
            v-model="openTime"
            @change="selectOpenTime"
            class="time-input"
          />
        </div>
      </div>
      <div class="filter-item" @click.stop="toggleDropdown('hoursExpect')">
        <span>{{ hoursExpectLabel }}</span>
        <div
          v-if="dropdowns.hoursExpect"
          class="dropdown-content time-dropdown"
        >
          <input
            type="time"
            v-model="hoursExpect"
            @change="selectHoursExpect"
            class="time-input"
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
const citySearch = ref("");
const districtSearch = ref("");

const cities = ref([
  "Hanoi",
  "Ho Chi Minh City",
  "Da Nang",
  "Hai Phong",
  "Can Tho",
  "Bien Hoa",
  "Rach Gia",
  "Vung Tau",
  "Nha Trang",
  "Quy Nhon",
]);
const districts = ref([
  "District 1",
  "District 2",
  "District 3",
  "District 4",
  "District 5",
  "District 6",
  "District 7",
  "District 8",
  "District 9",
  "District 10",
]);

const searchResults = ref([
  { id: 1, name: "Club A", address: "abc, Ho Chi Minh City" },
  { id: 2, name: "Club B", address: "def, Hanoi" },
  { id: 3, name: "Club C", address: "ghi, Da Nang" },
]);

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

const displayedResults = computed(() => {
  return filteredResults.value.slice(0, 5);
});

const filterResults = () => {};

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

const filteredCities = computed(() => {
  return cities.value.filter((city) =>
    city.toLowerCase().includes(citySearch.value.toLowerCase())
  );
});

const displayedCities = computed(() => {
  return filteredCities.value.slice(0, 5);
});

const filterCities = () => {
  dropdowns.value.city = true;
};

const selectCity = (city) => {
  selectedCity.value = city;
  cityLabel.value = city;
  dropdowns.value.city = false;
  citySearch.value = "";
};

const filteredDistricts = computed(() => {
  return districts.value.filter((district) =>
    district.toLowerCase().includes(districtSearch.value.toLowerCase())
  );
});

const displayedDistricts = computed(() => {
  return filteredDistricts.value.slice(0, 5);
});

const filterDistricts = () => {
  dropdowns.value.district = true;
};

const selectDistrict = (district) => {
  selectedDistrict.value = district;
  districtLabel.value = district;
  dropdowns.value.district = false;
  districtSearch.value = "";
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

.filter-item input {
  width: 78%;
  padding: 0px;
  border: none; /* Remove border from filter input */
  border-radius: 5px;
  outline: none; /* Remove outline */
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border: none; /* Remove border from dropdown toggle */
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
  left: 0;
  background-color: white;
  min-width: 160px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 10px;
  /* z-index: 1; */
}

.dropdown-content div,
.dropdown-content input {
  padding: 10px;
  cursor: pointer;
}

.dropdown-content input[type="text"] {
  border: none;
  outline: none; /* Remove outline from dropdown input */
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
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 10px;
  /* z-index: 1; */
  width: calc(100% - 60px);
}

.search-results div {
  padding: 10px;
  cursor: pointer;
}

.search-results div:hover {
  background-color: #ddd;
}

.scroll-indicator {
  text-align: center;
  color: #888;
  font-size: 12px;
  margin-top: 5px;
}

.selected-value {
  margin-top: 5px;
  font-size: 14px;
  color: gray;
}

.time-input {
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  width: 100%;
}

.time-dropdown {
  width: 180px;
}
</style>
