<template>
  <div class="booking-type">
    <h1><strong>III. Khung giờ</strong></h1>
    <div v-for="(slot, slotIndex) in slots" :key="slotIndex" class="slot-section">
      <div class="slot-container">
        <h2><strong>Khung giờ {{ slot.number }}</strong></h2>
        <div class="time-slots">
          <div class="time-slot">
            <h4><i>Bắt đầu lúc</i></h4>
            <input type="time" v-model="slot.starTime" @change="validateTimeSlot(slot)" />
          </div>
          <div class="time-slot">
            <h4><i>Kết thúc lúc</i></h4>
            <input type="time" v-model="slot.endTime" @change="validateTimeSlot(slot)" />
          </div>
        </div>
        <p v-if="slot.timeError" class="error-message">{{ slot.timeError }}</p>

        <!-- Price and Apply for subform -->
        <div v-for="(subform, subformIndex) in slot.subforms" :key="subformIndex" class="subform">
          <div class="price-section">
            <h3><strong>Giá cả:</strong></h3>
            <div class="price-options">
              <div class="price-row" v-for="type in priceTypes" :key="type.value">
                <h4>{{ type.label }}</h4>
                <div class="price-input">
                  <input type="text" v-model="subform[type.value]" @input="validatePrice(subform, type.value)"
                    @keypress="allowOnlyNumbers" />
                </div>
              </div>
            </div>
          </div>
          <p v-if="subform.priceError" class="error-message">{{ subform.priceError }}</p>

          <div class="apply-for-section">
            <h3><strong>Áp dụng cho:</strong></h3>
            <div class="select-container">
              <select v-model="subform.selectedDay" required>
                <option value="" disabled selected>Chọn thứ</option>
                <option v-for="day in weekdays" :key="day" :value="day">
                  {{ day }}
                </option>
              </select>
            </div>
          </div>
          <p v-if="subform.dayError" class="error-message">{{ subform.dayError }}</p>
        </div>

        <!-- Subform buttons -->
        <div class="button-group">
          <button @click="removeSubform(slot)" class="remove-subform-btn" :disabled="slot.subforms.length === 1">
            Bỏ Giá
          </button>
          <button @click="addSubform(slot)" class="add-subform-btn">
            Thêm Giá
          </button>
        </div>
      </div>
    </div>

    <!-- Slot buttons -->
    <div class="button-group">
      <button @click="removeTimeSlot" class="remove-slot-btn" :disabled="slots.length === 1">
        Bỏ khung giờ
      </button>
      <button @click="addTimeSlot" class="add-slot-btn">Thêm khung giờ</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['submitForm']);
const emit = defineEmits(['update']);

const priceTypes = [
  { value: "oneTimePlay", label: "One time" },
  { value: "flexible", label: "Flexible" },
  { value: "fixed", label: "Fix" },
];

const weekdays = [
  "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật",
];

const createSubform = () => ({
  oneTimePlay: 0, // Đổi tên từ oneTimePrice
  flexible: 0, // Đổi tên từ flexiblePrice
  fixed: 0, // Đổi tên từ fixPrice
  selectedDay: "", // Đổi tên từ dateOfWeek
  priceError: "",
  dayError: ""
});

const createSlot = (number) => ({
  number,
  starTime: "", // Đổi tên từ startTimeSlot
  endTime: "", // Đổi tên từ endTimeSlot
  timeError: "",
  subforms: [createSubform()]
});

const slots = ref([createSlot(1)]);

const isFormValid = computed(() => {
  return slots.value.every(slot =>
    !slot.timeError &&
    slot.starTime &&
    slot.endTime &&
    slot.subforms.every(subform =>
      !subform.priceError &&
      !subform.dayError &&
      (subform.oneTimePlay || subform.flexible || subform.fixed) &&
      subform.selectedDay
    )
  );
});

function addTimeSlot() {
  slots.value.push(createSlot(slots.value.length + 1));
}

function removeTimeSlot() {
  if (slots.value.length > 1) {
    slots.value.pop();
  }
}

function addSubform(slot) {
  if (slot && slot.subforms) {
    slot.subforms.push(createSubform());
  }
}

function removeSubform(slot) {
  if (slot && slot.subforms && slot.subforms.length > 1) {
    slot.subforms.pop();
  }
}

function validateTimeSlot(slot) {
  if (slot.starTime && slot.endTime) {
    if (slot.starTime >= slot.endTime) {
      slot.timeError = "Giờ kết thúc phải sau giờ bắt đầu";
    } else {
      slot.timeError = "";
    }
  } else {
    slot.timeError = "Giờ không được bỏ trống";
  }
}

function validatePrice(subform, priceType) {
  subform[priceType] = parseInt(subform[priceType]) || 0;
  if (subform[priceType] < 0) {
    subform.priceError = "Giá không phải là số âm";
  } else {
    subform.priceError = "";
  }
}

function allowOnlyNumbers(event) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
  }
}

const convertDayToEng = (day) => {
  const dayMap = {
    "Thứ Hai": "Mon",
    "Thứ Ba": "Tue",
    "Thứ Tư": "Wed",
    "Thứ Năm": "Thu",
    "Thứ Sáu": "Fri",
    "Thứ Bảy": "Sat",
    "Chủ Nhật": "Sun"
  };
  return dayMap[day] || day;
};

const formatTimeFrames = () => {
  return slots.value.map(slot => ({
    starTime: slot.starTime,
    endTime: slot.endTime,
    clubPricingRegister: slot.subforms.map(subform => ({
      dateOfWeek: convertDayToEng(subform.selectedDay),
      oneTimePlay: subform.oneTimePlay,
      flexible: subform.flexible,
      fixed: subform.fixed
    }))
  }));
};

const register = () => {
  if (isFormValid.value) { 
    const formattedData = {
      timeFramesList: formatTimeFrames(),
      courtList: formatCourtList()
    };
    emit('update', formattedData);
    props.submitForm();
  } else {
    console.log("Form is not valid");
    // Hiển thị thông báo lỗi cho người dùng
  }
};
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.add-slot-btn,
.remove-slot-btn,
.add-subform-btn,
.remove-subform-btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 20px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.add-slot-btn,
.add-subform-btn {
  background-color: #007bff;
  color: white;
}

.add-slot-btn:hover,
.add-subform-btn:hover {
  background-color: #0056b3;
}

.remove-slot-btn,
.remove-subform-btn {
  background-color: #dc3545;
  color: white;
}

.remove-slot-btn:hover,
.remove-subform-btn:hover {
  background-color: #c82333;
}

.remove-slot-btn:disabled,
.remove-subform-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}


.subform {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  margin-top: 15px;
  border-radius: 8px;
}

.subform-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.subform-buttons button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.subform-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.apply-for-section {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.apply-for-section h3 {
  margin-right: 15px;
  white-space: nowrap;
}

.select-container {
  width: 140px;
  /* Điều chỉnh giá trị này để phù hợp với thiết kế của bạn */
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%;
  background-size: 0.65em auto;
}

select:required:invalid {
  color: gray;
}

option[value=""][disabled] {
  display: none;
}

option {
  color: black;
}

.booking-type {
  width: 100%;
  max-width: 810px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0px 4px 2px 2px rgba(0, 0, 0, 0.1);
}

h1,
h2,
h4 {
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
  justify-content: space-around;
}

.time-slot {
  width: 30%;
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
  content: "VNĐ/h";
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

.add-slot-btn,
.remove-slot-btn {
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

.error-message {
  color: #dc3545;
  font-size: 0.8em;
  margin-top: 5px;
}

.add-subform-btn,
.remove-subform-btn {
  font-size: 12px;
  padding: 8px 16px;
}
</style>