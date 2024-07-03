<template>
  <div class="location-form">
    <h1 class="title"><strong>II. Location</strong></h1>
    
    <div class="grid-container">
      <div class="grid-item">
        <h4 class="sub-title"><strong><em>City/Province</em></strong></h4>
        <select v-model="selectedCity" class="dropdown">
          <option value="" disabled selected>Select City/Province</option>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
      
      <div class="grid-item">
        <h4 class="sub-title"><strong><em>District</em></strong></h4>
        <select v-model="selectedDistrict" class="dropdown">
          <option value="" disabled selected>Select District</option>
          <option v-for="district in districts" :key="district" :value="district">{{ district }}</option>
        </select>
      </div>
      
      <div class="grid-item">
        <h4 class="sub-title"><strong><em>Ward/Commune</em></strong></h4>
        <select v-model="selectedWard" class="dropdown">
          <option value="" disabled selected>Select Ward/Commune</option>
          <option v-for="ward in wards" :key="ward" :value="ward">{{ ward }}</option>
        </select>
      </div>
    </div>
    
    <div class="address-container">
      <h4 class="sub-title"><strong><em>Address</em></strong></h4>
      <textarea v-model="address" class="input-field address-input"></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedCity = ref('');
const selectedDistrict = ref('');
const selectedWard = ref('');
const address = ref('');

// Ví dụ danh sách các thành phố, quận/huyện, phường/xã
const cities = ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Can Tho', 'Hai Phong'];
const districts = ['District 1', 'District 2', 'District 3', 'Binh Thanh', 'Thu Duc'];
const wards = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'];

// Trong thực tế, bạn sẽ cần thêm logic để lọc districts và wards dựa trên city được chọn
</script>

<style scoped>
.location-form {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-weight: bold;
  margin-bottom: 20px;
}

.sub-title {
  font-weight: bold;
  font-style: italic;
  margin-bottom: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.grid-item {
  display: flex;
  flex-direction: column;
}

.dropdown {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

.address-container {
  margin-top: 20px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.address-input {
  min-height: 15px;
}
</style>