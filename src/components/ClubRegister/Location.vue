<template>
  <div class="location-form">
    <h1 class="title"><strong>II. Địa chỉ</strong></h1>
    <div class="grid-container">
      <div class="grid-item">
        <h4 class="sub-title"><strong><em>Tỉnh/Thành phố</em></strong></h4>
        <select v-model="form.selectedCity" class="dropdown" @change="onCityChange">
          <option value=""></option>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
        <p v-if="errors.city" class="error-message">{{ errors.city }}</p>
      </div>
      <div class="grid-item">
        <h4 class="sub-title"><strong><em>Quận/Huyện</em></strong></h4>
        <select v-model="form.selectedDistrict" class="dropdown" @change="onDistrictChange">
          <option value=""></option>
          <option v-for="district in filteredDistricts" :key="district" :value="district">{{ district }}</option>
        </select>
        <p v-if="errors.district" class="error-message">{{ errors.district }}</p>
      </div>
      <div class="grid-item">
        <h4 class="sub-title"><strong><em>Phường/Thị trấn/Xã</em></strong></h4>
        <select v-model="form.selectedWard" class="dropdown" @change="onWardChange">
          <option value=""></option>
          <option v-for="ward in filteredWards" :key="ward" :value="ward">{{ ward }}</option>
        </select>
        <p v-if="errors.ward" class="error-message">{{ errors.ward }}</p>
      </div>
    </div>

    <div class="address-container">
      <h4 class="sub-title"><strong><em>Địa chỉ</em></strong></h4>
      <textarea v-model="form.unitNumber" class="input-field address-input" @input="validateAddress"></textarea>
      <p v-if="errors.unitNumber" class="error-message">{{ errors.unitNumber }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const form = reactive({
  selectedCity: '',
  selectedDistrict: '',
  selectedWard: '',
  unitNumber: '' // Thay đổi từ 'address' thành 'unitNumber'
});

const errors = reactive({
  city: '',
  district: '',
  ward: '',
  unitNumber: '' // Thay đổi từ 'address' thành 'unitNumber'
});

const validateAddress = () => {
  if (!form.unitNumber.trim()) {
    errors.unitNumber = 'Address is required';
  } else if (form.unitNumber.length < 5) {
    errors.unitNumber = 'Address must be at least 5 characters long';
  } else {
    errors.unitNumber = '';
  }
};

// Example data - replace with actual data or API calls
const cities = ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Can Tho', 'Hai Phong'];
const districtsByCity = {
  'Ho Chi Minh City': ['District 1', 'District 2', 'District 3', 'Binh Thanh', 'Thu Duc'],
  'Hanoi': ['Ba Dinh', 'Hoan Kiem', 'Hai Ba Trung', 'Dong Da', 'Cau Giay'],
  // Add more cities and their districts
};
const wardsByDistrict = {
  'District 1': ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'],
  'District 2': ['Thao Dien', 'An Phu', 'Binh An', 'Binh Trung Tay', 'Binh Trung Dong'],
  // Add more districts and their wards
};

const filteredDistricts = computed(() => {
  return form.selectedCity ? districtsByCity[form.selectedCity] || [] : [];
});

const filteredWards = computed(() => {
  return form.selectedDistrict ? wardsByDistrict[form.selectedDistrict] || [] : [];
});

const onCityChange = () => {
  form.selectedDistrict = '';
  form.selectedWard = '';
  validateCity();
};

const onDistrictChange = () => {
  form.selectedWard = '';
  validateDistrict();
};

const onWardChange = () => {
  validateWard();
};

const validateCity = () => {
  errors.city = form.selectedCity ? '' : 'Please select a city';
};

const validateDistrict = () => {
  errors.district = form.selectedDistrict ? '' : 'Please select a district';
};

const validateWard = () => {
  errors.ward = form.selectedWard ? '' : 'Please select a ward';
};
</script>

<style scoped>
.location-form {
  max-width: 810px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 0px 0px 0px 0px;
  box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.1);
}

.title {
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.sub-title {
  font-weight: bold;
  font-style: italic;
  margin-bottom: 10px;
  color: #555;
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
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.dropdown:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.dropdown:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.address-container {
  margin-top: 20px;
}

.input-field {
  width: 790px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.address-input {
  min-height: 60px;
}

.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>