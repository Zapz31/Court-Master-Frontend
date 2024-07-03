<template>
    <div class="booking-type">
        <h1><strong>III. Booking Type</strong></h1>
        <div v-for="(slot, index) in slots" :key="index" class="slot-section">
            <div class="slot-container">
                <h2><strong>Slot {{ slot.number }}</strong></h2>
                <div class="time-slots">
                    <div class="time-slot">
                        <h4><i>Start Time Slot</i></h4>
                        <input type="time" v-model="slot.startTimeSlot">
                    </div>
                    <div class="time-slot">
                        <h4><i>End Time Slot</i></h4>
                        <input type="time" v-model="slot.endTimeSlot">
                    </div>
                </div>

                <div class="price-section">
                    <h2><strong>Price:</strong></h2>
                    <div class="price-options">
                        <div class="price-row">
                            <input type="checkbox" v-model="slot.oneTime">
                            <h4>One time</h4>
                            <div class="price-input">
                                <input type="text" v-model="slot.oneTimePrice"
                                    @input="validatePrice(slot, 'oneTimePrice')" @keypress="allowOnlyNumbers">
                            </div>
                        </div>
                        <div class="price-row">
                            <input type="checkbox" v-model="slot.flexible">
                            <h4>Flexible</h4>
                            <div class="price-input">
                                <input type="text" v-model="slot.flexiblePrice"
                                    @input="validatePrice(slot, 'flexiblePrice')" @keypress="allowOnlyNumbers">
                            </div>
                        </div>
                        <div class="price-row">
                            <input type="checkbox" v-model="slot.fix">
                            <h4>Fix</h4>
                            <div class="price-input">
                                <input type="text" v-model="slot.fixPrice" @input="validatePrice(slot, 'fixPrice')"
                                    @keypress="allowOnlyNumbers">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="apply-for-section">
                    <h2><strong>Apply for:</strong></h2>
                    <div class="weekdays">
                        <div v-for="day in weekdays" :key="day" class="weekday">
                            <span>{{ day }}</span>
                            <input type="checkbox" v-model="slot.selectedDays" :value="day">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-group">
            <button @click="removeTimeSlot" class="remove-slot-btn" :disabled="slots.length === 1">Remove time
                slot</button>
            <button @click="addTimeSlot" class="add-slot-btn">Add time slot</button>
        </div>
        <div class="safety-submit">
      <div class="assurance">
        <h4><i>I assure that all information provided in this form is correct</i></h4>
        <input type="checkbox" v-model="isAssured">
      </div>
      <button 
        class="register-btn" 
        :disabled="!isAssured"
        @click="register"
      >
        Register
      </button>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

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
        selectedDays: []
    }
]);

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
        selectedDays: []
    });
}

function removeTimeSlot() {
    if (slots.value.length > 1) {
        slots.value.pop();
    }
}

function validatePrice(slot, priceType) {
    slot[priceType] = slot[priceType].replace(/[^0-9]/g, '');
}

function allowOnlyNumbers(event) {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
  }
}

const isAssured = ref(false);

function register() {
  // Xử lý logic đăng ký ở đây
  console.log("Registered!");
}
</script>

<style scoped>
.booking-type {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

h1,
h2,
h4 {
    text-align: left;
}

.slot-section {
    width: 100%;
    margin-bottom: 20px;
}

.slot-container {
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 20px;
    background-color: #f9f9f9;
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
  padding: 5px;
  margin-top: 5px;
}

.price-input input {
  width: 100%;
  padding: 5px;
  padding-right: 55px;
  margin-top: 5px;
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
    /* Điều chỉnh chiều rộng nếu cần */
}

.price-input input {
    width: 100%;
    padding: 5px;
    padding-right: 55px;
    /* Tăng padding bên phải để tránh viết đè */
    margin-top: 5px;
    -moz-appearance: textfield;
}

.price-input input::-webkit-outer-spin-button,
.price-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.price-input::after {
    content: 'VNĐ/h';
    position: absolute;
    right: 8px;
    /* Điều chỉnh vị trí sang phải một chút */
    top: 50%;
    transform: translateY(-50%);
    color: black;
    /* Đổi màu thành đen */
    pointer-events: none;
    background-color: white;
    /* Thêm nền trắng để tránh bị viết đè */
    padding-left: 5px;
    /* Thêm padding bên trái để tạo khoảng cách với số */
}

.weekdays {
    display: flex;
    flex-wrap: wrap;
}

.weekday {
    margin-right: 15px;
    margin-bottom: 10px;
}

select,
input[type="number"] {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
}

input[type="checkbox"] {
    margin-right: 5px;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.add-slot-btn,
.remove-slot-btn {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    border-radius: 20px;
}

.add-slot-btn {
    background-color: blue;
    color: white;
}

.remove-slot-btn {
    background-color: red;
    color: white;
}

.remove-slot-btn:disabled {
    background-color: grey;
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
  background-color: blue;
  color: white;
  padding: 15px 200px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  border-radius: 20px;
}

.register-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>