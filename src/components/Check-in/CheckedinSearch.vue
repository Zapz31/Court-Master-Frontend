<template>
  <div class="box" @click.self="closeAllDropdowns">
    <div class="search">
      <input
        v-model="searchQuery"
        @input="filterResults"
        placeholder="Nhập số điện thoại hoặc tên"
        type="text"
      />

      <!-- ===================================clear filterSearch BUTTON ===========================================-->
      <div class="button-func">
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
</template>
  
<script setup>
import { ref } from "vue";
import { useCheckInStore } from "../../stores/checkInStore";

const checkInStore = useCheckInStore();
const searchQuery = ref("");

const performSearch = async () => {
  if (searchQuery.value.trim()) {
    await checkInStore.searchCheckedInBookings(searchQuery.value);
  } else {
    // If the search query is empty, fetch all unchecked-in bookings
    await checkInStore.fetchUnCheckinList();
  }
};
</script>
  
<style scoped>
.box {
  /* margin-top: -50px; */
  width: 100%;
  font-style: bold;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border: solid #6babf4;
  border-radius: 25px;
  max-width: 50%;
  transition: transform 0.3s ease;
  flex-wrap: wrap;
}
.search {
  display: flex;
  justify-content: space-between;
}
.box:hover {
  transform: scale(1.05);
}

.search {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
}

.search input[type="text"] {
  background-color: white;
  color: black;
  padding: 8px 16px; /* Adjust padding for better height */
  border: none;
  border-radius: 20px 0 0 20px;
  font-size: 16px;
  outline: none;
  width: 100%;
  max-width: 600px; /* Adjust max-width for better length */
}

.button-func {
  display: flex;
  flex-wrap: wrap;
}

.button {
  display: flex;
}

.button button[type="submit"] {
  margin-left: -20px; /* Adjust overlap as needed */
  background-color: #6babf4;
  border: none;
  color: white;
  font-style: bold;
  cursor: pointer;
  padding: 8px 28px;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
}

.button button[type="submit"]:hover {
  border-radius: 20px 20px 20px 20px;
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
  text-align: center;
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  flex: 1;
  min-width: 100px;
  max-width: 130px;
}

.filter-item:hover {
  transform: scale(1.05);
  background-color: #6babf4;
  color: white;
}

.filter-item input {
  width: 78%;
  padding: 0px;
  border: none;
  border-radius: 5px;
  outline: none;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0px;
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

.dropdown-content div:hover {
  background-color: #f1f1f1;
}

.scroll-indicator {
  text-align: center;
  font-style: italic;
  color: #888;
  padding: 5px;
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
