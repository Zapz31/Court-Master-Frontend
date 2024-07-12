<template>
  <div class="box" @click.self="closeAllDropdowns">
    <div class="search">
      <input
        v-model="searchQuery"
        @input="filterResults"
        placeholder="Nhập tên hoặc địa chỉ..."
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
        <!-- ===================== City/Province Dropdown =========================== -->
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
            v-for="(cities, index) in displayedCities"
            :key="index"
            @click="selectCity(cities)"
          >
            {{ cities }}
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

      <div class="filter-item">
        <!-- ===================== Ward Dropdown =========================== -->
        <div
          class="dropdown-toggle"
          @click.stop="toggleDropdown('ward')"
          :class="{ active: dropdowns.ward }"
        >
          <span>{{ selectedWard || wardLabel }}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div v-if="dropdowns.ward" class="dropdown-content">
          <input
            v-model="wardSearch"
            @input="filterWards"
            type="text"
            placeholder="Search wards..."
          />
          <div
            v-for="(ward, index) in displayedWards"
            :key="index"
            @click="selectWard(ward)"
          >
            {{ ward }}
          </div>
          <div v-if="filteredWards.length > 5" class="scroll-indicator">
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
      <!-- ===================================clear filterSearch BUTTON ===========================================-->
      <div class="button-func">
        <div class="button">
          <button @click="clearFilterSearch" type="button" class="button">
            <svg
              height="24"
              viewBox="0 0 1024 1024"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m899.1 869.6-53-305.6h17.9c14.4 0 26-11.6 26-26v-192c0-14.4-11.6-26-26-26h-246v-182c0-14.4-11.6-26-26-26h-160c-14.4 0-26 11.6-26 26v182h-246c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4 14.2-2.4 23.7-15.9 21.2-30zm-695.1-479.6h272v-208h72v208h272v104h-616zm468 440v-156c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156h-192v-156c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156h-149.2l45.1-260h528.1l45.1 260z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </div>
        <div class="button">
          <button @click="performSearch" type="submit" class="button">
            <svg
              width="24"
              height="24"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 15.5L19 19"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div></div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useAddressFilter } from "../../stores/addressFilter";
import { useClubStore } from "../../stores/clubMng";

const searchQuery = ref("");
const selectedCity = ref("");
const selectedDistrict = ref("");
const citySearch = ref("");
const districtSearch = ref("");
const selectedWard = ref("");
const wardSearch = ref("");

const cities = ref([]);
const districts = ref([]);
const wards = ref([]);

const addressFilter = useAddressFilter();

watch(selectedDistrict, async (newDistrict) => {
  if (newDistrict) {
    await addressFilter.fetchWards(selectedCity.value, newDistrict);
    wards.value = addressFilter.wardsList;
  } else {
    wards.value = [];
  }
  selectedWard.value = "";
});

const openTime = ref("");
const hoursExpect = ref("");
const dropdowns = ref({
  city: false,
  district: false,
  ward: false,
  openTime: false,
  hoursExpect: false,
});

const cityLabel = ref("Tỉnh/Thành phố");
const districtLabel = ref("Quận/Huyện");
const wardLabel = ref("Phường/Xã");
const openTimeLabel = ref("Giờ mở cửa");
const hoursExpectLabel = ref("Giờ chơi mong đợi");

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
  dropdowns.value.ward = false;
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

onMounted(async () => {
  document.addEventListener("click", handleOutsideClick);

  try {
    await addressFilter.fetchCities();
    cities.value = addressFilter.citiesList;
    console.log("day la cities: ");
    console.log(cities.value); // Kiểm tra giá trị cities
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
});

watch(selectedCity, async (newCity) => {
  if (newCity) {
    await addressFilter.fetchDistrict(newCity);
    districts.value = addressFilter.districtsList;
  } else {
    districts.value = [];
  }
  selectedDistrict.value = "";
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
  return filteredCities.value.slice(0, 63);
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
  return filteredDistricts.value.slice(0, 200);
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

//----------------------------------------------Ward
const filteredWards = computed(() => {
  return wards.value.filter((ward) =>
    ward.toLowerCase().includes(wardSearch.value.toLowerCase())
  );
});

const displayedWards = computed(() => {
  return filteredWards.value.slice(0, 200);
});

const filterWards = () => {
  dropdowns.value.ward = true;
};

const selectWard = (ward) => {
  selectedWard.value = ward;
  wardLabel.value = ward;
  dropdowns.value.ward = false;
  wardSearch.value = "";
};
//----------------------------------------------Ward
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

const performSearch = async () => {
  // console.log(`Searching for: ${searchQuery.value}`);
  // console.log(`City: ${selectedCity.value}`);
  // console.log(`District: ${selectedDistrict.value}`);
  // console.log(`Open Time: ${openTime.value}`);
  // console.log(`Hours Expect: ${hoursExpect.value}`);
  const dataFilter = {
    nameOrUnitNumber: searchQuery.value,
    province: selectedCity.value,
    district: selectedDistrict.value,
    ward: selectedWard.value,
    openedTime: openTime.value,
    hoursOfExpect: hoursExpect.value,
  };
  console.log(dataFilter);
  useClubStore().getFilteredClubs(dataFilter);
};

const clearFilterSearch = async () => {
  searchQuery.value = "";
  selectedCity.value = "";
  cityLabel.value = "Tỉnh/Thành phố";
  selectedDistrict.value = "";
  districtLabel.value = "Quận/Huyện";
  selectedWard.value = "";
  wardLabel.value = "Phường/Xã";
  openTime.value = "";
  openTimeLabel.value = "Giờ mở cửa";
  hoursExpect.value = "";
  hoursExpectLabel.value = "Giờ chơi mong đợi";
};
</script>

<style scoped>
.box {
  font-style: bold;
  background-color: white;
  display: flex;
  padding: 4px;
  border: solid#6babf4;
  border-radius: 25px;
  max-width: 88%;
  /* box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); */
  transition: transform 0.3s ease;
  flex-wrap: wrap;
}

.box:hover {
  transform: scale(1.05);
}

.search {
  display: flex;
  align-items: center;
  margin-right: 10px;
  position: relative;
  flex: 1;
}

.search input[type="text"] {
  width: 100%;
  background-color: white;
  color: black;
  padding: 8px;
  border: none;
  border-radius: 20px 0 0 20px;
  font-size: 16px;
  outline: none;
  width: 100%;
  max-width: 350px;
}

.button-func {
  display: flex;
  flex-wrap: wrap;
}

.button button[type="button"] {
  background-color: grey;
  border: none;
  color: white;
  font-style: bold;
  cursor: pointer;
  padding: 10px 36px;
  border-radius: 20px 0px 0px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
  margin-right: 5px;
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
  padding: 10px 36px;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
}

.button button[type="submit"]:hover {
  border-radius: 5px 20px 20px 5px;
  transform: scale(1.05);
  color: white;
  background-color: royalblue;
}

.filter {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.filter-item {
  font-weight: bold;
  font-size: 12px;
  margin-right: 8px;
  position: relative;
  cursor: pointer;
  padding: 5px;
  background-color: white;
  border-radius: 10px;
  text-align: left;
  transition: transform 0.3s ease;
  flex: 1;
  min-width: 100px;
  max-width: 130px;
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
  padding: 5px 0px;
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
  z-index: 1;
}

.dropdown-content div,
.dropdown-content input {
  padding: 10px;
  cursor: pointer;
}

.dropdown-content input[type="text"] {
  border: none;
  outline: none; /* Remove outline from dropdown input */
  width: 100%;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  background-color: white;
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