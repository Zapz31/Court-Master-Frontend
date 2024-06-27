<template>
  <div class="confirm-payment-screen">
    <h1>Confirm Payment Information</h1>
    <div class="payment-info">
      <div class="info-item">
        <span class="label">Customer Name:</span>
        <span class="value">{{ customerFullName }}</span>
      </div>
      <div class="info-item">
        <span class="label">Phone Number:</span>
        <span class="value">{{ customerPhoneNumber }}</span>
      </div>
      <div class="info-item">
        <span class="label">Court Manager Phone:</span>
        <span class="value">{{ courtManagerPhone }}</span>
      </div>
      <div class="info-item">
        <span class="label">Payment Amount:</span>
        <span class="value">{{ paymentDetail.amount }} đ</span>
      </div>
      <!-- <div class="info-item">
        <span class="label">Payment Method:</span>
        <span class="value">{{ paymentDetail.paymentMethod }}</span>
      </div>
      <div class="info-item">
        <span class="label">Payment Time:</span>
        <span class="value">{{ paymentDetail.paymentTime }}</span>
      </div> -->
    </div>

    <!-- han muc thanh toan: them radio ve cach thanh toan (50% or 25% or 100% tra truoc) -->

    <h2>Booking Details</h2>
    <table class="booking-table">
      <thead>
        <tr>
          <th>Court ID</th>
          <th>Start Booking</th>
          <th>End Booking</th>
          <th>Booking Date</th>
          <th>Booking Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(slot, index) in pricePerSlotRequestDTOList" :key="index">
          <td>{{ slot.courtId }}</td>
          <td>{{ slot.startBooking }}</td>
          <td>{{ slot.endBooking }}</td>
          <td>{{ slot.bookingDate }}</td>
          <td>{{ slot.bookingType }}</td>
        </tr>
      </tbody>
    </table>

    <div class="actions">
      <button @click="confirmPayment" class="confirm-btn">Confirm</button>
      <button @click="goBack" class="back-btn">Go Back</button>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

const customerFullName = ref("Giap");
const customerPhoneNumber = ref("010101010");
const courtManagerPhone = ref("012345678");
const paymentDetail = ref({
  amount: 1000000,
  paymentMethod: "ATM",
  paymentTime: "2024-06-26T14:40:15",
});

const pricePerSlotRequestDTOList = ref([
  {
    courtId: "CO000001",
    startBooking: "18:30:00",
    endBooking: "22:00:00",
    bookingDate: "2024-06-15",
    bookingType: "one_time_play",
  },
  {
    courtId: "CO000001",
    startBooking: "18:00:00",
    endBooking: "22:00:00",
    bookingDate: "2024-06-15",
    bookingType: "one_time_play",
  },
]);

const confirmPayment = () => {
  // Logic để xác nhận thanh toán
  alert("Payment Confirmed");
};

const goBack = () => {
  // Logic để quay lại trang trước đó
  alert("Go Back to Previous Page");
};
</script>
  
  <style scoped>
.confirm-payment-screen {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  color: #6babf4;
  text-align: center;
}

.payment-info,
.booking-table {
  margin: 20px 0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  color: grey;
}

.value {
  color: #333;
}

.booking-table {
  width: 100%;
  border-collapse: collapse;
}

.booking-table th,
.booking-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.booking-table th {
  background-color: #f2f2f2;
  color: #333;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.confirm-btn {
  background-color: #6babf4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn {
  background-color: grey;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn:hover,
.back-btn:hover {
  opacity: 0.8;
}
</style>
  