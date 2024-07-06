<template>
    <div class="booking-type">
      <h1><strong>III. Booking Type</strong></h1>
      <div v-for="(slot, index) in slots" :key="index" class="slot-section">
        <div class="slot-container">
          <h2><strong>Slot {{ slot.number }}</strong></h2>
          <div class="time-slots">
            <div class="time-slot">
              <h4><i>Start Time Slot</i></h4>
              <input type="time" v-model="slot.startTimeSlot" @change="validateTimeSlot(slot)">
            </div>
            <div class="time-slot">
              <h4><i>End Time Slot</i></h4>
              <input type="time" v-model="slot.endTimeSlot" @change="validateTimeSlot(slot)">
            </div>
          </div>
          <p v-if="slot.timeError" class="error-message">{{ slot.timeError }}</p>
          
          <div class="price-section">
            <h2><strong>Price:</strong></h2>
            <div class="price-options">
              <div class="price-row" v-for="type in priceTypes" :key="type.value">
                <input type="checkbox" v-model="slot[type.value]">
                <h4>{{ type.label }}</h4>
                <div class="price-input">
                  <input type="text" 
                         v-model="slot[`${type.value}Price`]"
                         @input="validatePrice(slot, `${type.value}Price`)" 
                         @keypress="allowOnlyNumbers"
                         :disabled="!slot[type.value]">
                </div>
              </div>
            </div>
          </div>
          <p v-if="slot.priceError" class="error-message">{{ slot.priceError }}</p>
          
          <div class="apply-for-section">
            <h2><strong>Apply for:</strong></h2>
            <div class="weekdays">
              <div v-for="day in weekdays" :key="day" class="weekday">
                <span>{{ day }}</span>
                <input type="checkbox" v-model="slot.selectedDays" :value="day">
              </div>
            </div>
          </div>
          <p v-if="slot.dayError" class="error-message">{{ slot.dayError }}</p>
        </div>
      </div>
      
      <div class="button-group">
        <button @click="removeTimeSlot" class="remove-slot-btn" :disabled="slots.length === 1">Remove time slot</button>
        <button @click="addTimeSlot" class="add-slot-btn">Add time slot</button>
      </div>
  
      <div class="safety-submit">
        <div class="assurance">
          <h4><i>I assure that all information provided in this form is correct</i></h4>
          <input type="checkbox" v-model="isAssured">
        </div>
        <button class="register-btn" :disabled="!isAssured || !isFormValid" @click="register">
          Register
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const priceTypes = [
    { value: 'oneTime', label: 'One time' },
    { value: 'flexible', label: 'Flexible' },
    { value: 'fix', label: 'Fix' }
  ];
  
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const slots = ref([
    {
      number: 1,
      startTimeSlot: '',
      endTimeSlot: '',
      oneTime: false,
      flexible: false,
      fix: false,
      oneTimePrice: '',
      flexiblePrice: '',
      fixPrice: '',
      selectedDays: [],
      timeError: '',
      priceError: '',
      dayError: ''
    }
  ]);
  
  const isAssured = ref(false);
  
  const isFormValid = computed(() => {
    return slots.value.every(slot => 
      !slot.timeError && 
      !slot.priceError && 
      !slot.dayError && 
      slot.startTimeSlot && 
      slot.endTimeSlot && 
      (slot.oneTime || slot.flexible || slot.fix) && 
      slot.selectedDays.length > 0
    );
  });
  
  function addTimeSlot() {
    slots.value.push({
      number: slots.value.length + 1,
      startTimeSlot: '',
      endTimeSlot: '',
      oneTime: false,
      flexible: false,
      fix: false,
      oneTimePrice: '',
      flexiblePrice: '',
      fixPrice: '',
      selectedDays: [],
      timeError: '',
      priceError: '',
      dayError: ''
    });
  }
  
  function removeTimeSlot() {
    if (slots.value.length > 1) {
      slots.value.pop();
    }
  }
  
  function validateTimeSlot(slot) {
    if (slot.startTimeSlot && slot.endTimeSlot) {
      if (slot.startTimeSlot >= slot.endTimeSlot) {
        slot.timeError = 'End time must be after start time';
      } else {
        slot.timeError = '';
      }
    } else {
      slot.timeError = 'Both start and end times are required';
    }
  }
  
  function validatePrice(slot, priceType) {
    slot[priceType] = slot[priceType].replace(/[^0-9]/g, '');
    if (slot[priceType] && parseInt(slot[priceType]) <= 0) {
      slot.priceError = 'Price must be greater than 0';
    } else {
      slot.priceError = '';
    }
  }
  
  function allowOnlyNumbers(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }
  
  function register() {
    if (isFormValid.value) {
      console.log("Registered!", slots.value);
      // Here you would typically send the data to your backend
    } else {
      console.log("Form is not valid");
    }
  }
  </script>
  
  <style scoped>
  .booking-type {
    width: 100%;
    max-width: 810px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 0px 0px 8px 8px;
    box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.1);
  }
  
  h1, h2, h4 {
    text-align: left;
    color: #333;
  }
  
  .slot-section {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .slot-container {
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 20px;
    background-color: #fff;
  }
  
  .time-slots {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .time-slot {
    width: 45%;
  }
  
  .time-slot input[type="time"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .price-section {
    margin-top: 20px;
  }
  
  .price-options {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .price-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
    width: 100%;
    max-width: 400px;
  }
  
  .price-input {
    display: flex;
    align-items: center;
    margin-left: auto;
    position: relative;
    width: 290px;
  }
  
  .price-input input {
    width: 100%;
    padding: 10px;
    padding-right: 55px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .price-input::after {
    content: 'VNĐ/h';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
    background-color: white;
    padding-left: 5px;
  }
  
  .weekdays {
    display: flex;
    flex-wrap: wrap;
  }
  
  .weekday {
    margin-right: 15px;
    margin-bottom: 10px;
  }
  
  input[type="checkbox"] {
    margin-right: 5px;
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .add-slot-btn, .remove-slot-btn {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    border-radius: 20px;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
  
  .add-slot-btn {
    background-color: #007bff;
    color: white;
  }
  
  .add-slot-btn:hover {
    background-color: #0056b3;
  }
  
  .remove-slot-btn {
    background-color: #dc3545;
    color: white;
  }
  
  .remove-slot-btn:hover {
    background-color: #c82333;
  }
  
  .remove-slot-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .safety-submit {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .assurance {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .assurance h4 {
    margin-right: 10px;
  }
  
  .register-btn {
    background-color: #28a745;
    color: white;
    padding: 15px 200px;
    border: none;
    cursor: pointer;
    font-size: 20px;
    border-radius: 20px;
    transition: background-color 0.3s ease;
  }
  
  .register-btn:hover {
    background-color: #218838;
  }
  
  .register-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .error-message {
    color: #dc3545;
    font-size: 0.8em;
    margin-top: 5px;
  }
  </style>