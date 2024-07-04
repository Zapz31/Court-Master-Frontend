<template>
  <div class="container">
    <h1>Confirm Payment Information</h1>

    <section class="info-section">
      <h2>Club Information</h2>
      <div class="payment-info">
        <div class="info-item">
          <span class="label">Club Name:</span>
          <span class="value">{{ clubName }}</span>
        </div>
        <div class="info-item">
          <span class="label">Phone number:</span>
          <span class="value">{{ courtManagerPhone }}</span>
        </div>
      </div>
    </section>

    <section class="info-section">
      <h2>Individual Information</h2>
      <div class="payment-info">
        <div class="info-item">
          <span class="label">Fullname:</span>
          <span class="value">{{ fullName }}</span>
        </div>
        <div class="info-item">
          <span class="label">Phone number:</span>
          <span class="value">{{ user.phoneNumber }}</span>
        </div>
        <div class="info-item">
          <span class="label">Email:</span>
          <span class="value">{{ user.email }}</span>
        </div>
        <div class="info-item">
          <span class="label">Total Playing Time (hours):</span>
          <span class="value">{{ totalPlayingTime }}</span>
        </div>
      </div>
    </section>

    <section class="info-section">
      <h2>Payment Information</h2>
      <div class="info-item">
        <span class="label">Total Price:</span>
        <span class="value">{{ formatPrice(totalPrice) }} đ</span>
      </div>
      <div class="wrapper">
        <div class="option">
          <input
            id="fullyPay"
            v-model="paymentOption"
            value="fullyPay"
            name="btn"
            type="radio"
            class="input"
          />
          <label for="fullyPay" class="btn">
            <span class="span">Fully Pay</span>
          </label>
        </div>
        <div class="option">
          <input
            id="deposit50"
            v-model="paymentOption"
            value="deposit50"
            name="btn"
            type="radio"
            class="input"
          />
          <label for="deposit50" class="btn">
            <span class="span">Deposited 50%</span>
          </label>
        </div>
        <div class="option">
          <input
            id="deposit25"
            v-model="paymentOption"
            value="deposit25"
            name="btn"
            type="radio"
            class="input"
          />
          <label for="deposit25" class="btn">
            <span class="span">Deposited 25%</span>
          </label>
        </div>
      </div>
    </section>

    <section class="info-section">
      <h2>Booking Details</h2>
      <table class="booking-table">
        <thead>
          <tr>
            <th>Court Name</th>
            <th>Start Booking</th>
            <th>End Booking</th>
            <th>Booking Date</th>
            <th>Booking Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(slot, index) in formattedBookings" :key="index">
            <td>{{ slot.courtName }}</td>
            <td>{{ slot.startBooking }}</td>
            <td>{{ slot.endBooking }}</td>
            <td>{{ slot.bookingDate }}</td>
            <td>{{ slot.bookingType }}</td>
            <td>{{ formatPrice(slot.price) }} đ</td>
          </tr>
        </tbody>
      </table>
    </section>

    <div class="actions">
      <button @click="confirmPayment" class="confirm-btn">Confirm</button>
      <button @click="goBack" class="back-btn">Go Back</button>
    </div>
  </div>
</template>

<script setup>
// import axios from "axios";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useClubStore } from "../../stores/clubMng";
import { useScheduleStore } from "../../stores/scheduleStore";

const clubStore = useClubStore();
const scheduleStore = useScheduleStore();
const { bookingResponse } = storeToRefs(scheduleStore);
const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.user);
const paymentOption = ref("fullyPay");

const fullName = computed(() => {
  return `${user.value.firstName} ${user.value.lastName}`.trim();
});

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const clubName = computed(() => clubStore.currentClub?.clubName || "");
const courtManagerPhone = computed(
  () => clubStore.currentClub?.courtManagerPhone || ""
);

const totalPlayingTime = computed(() => {
  return bookingResponse.value ? bookingResponse.value.totalHour : "0";
});

const totalPrice = computed(() => {
  return bookingResponse.value ? bookingResponse.value.totalPrice : 0;
});

const getCourtName = (courtId) => {
  const court = clubStore.currentClub?.courtList.find(
    (c) => c.courtId === courtId
  );
  return court ? court.courtName : courtId;
};

const formattedBookings = computed(() => {
  if (!bookingResponse.value || !bookingResponse.value.unpaidBookingList)
    return [];
  return bookingResponse.value.unpaidBookingList.map((slot) => ({
    courtName: getCourtName(slot.courtId),
    startBooking: scheduleStore.formatTimeFromBackend(slot.startBooking),
    endBooking: scheduleStore.formatTimeFromBackend(slot.endBooking),
    bookingDate: scheduleStore.formatDateFromBackend(slot.bookingDate),
    bookingType: slot.bookingType,
    price: slot.price,
  }));
});

// const getScheduleType = () => {
//   const bookingTypes = new Set(
//     bookingResponse.value.unpaidBookingList.map((slot) => slot.bookingType)
//   );
//   if (bookingTypes.has("one_time_play")) return "One-time play";
//   if (bookingTypes.has("flexible")) return "Flexible";
//   if (bookingTypes.has("fixed")) return "Fixed";
//   return "Unknown";
// };

//format DateTime
// const formatDateTimeForAPI = (date) => {
//   const offset = date.getTimezoneOffset();
//   const localDate = new Date(date.getTime() - offset * 60 * 1000);
//   return localDate.toISOString().slice(0, 19);
// };

// const confirmPayment = async () => {
//   try {
//     const paymentStatus =
//       paymentOption.value === "fullyPay"
//         ? "Paid"
//         : `Deposited ${paymentOption.value.slice(-2)}%`;

//     const payload = {
//       courtManagerPhone: courtManagerPhone.value,
//       clubId: clubStore.currentClub.clubId,
//       clubName: clubName.value,
//       bookingSchedule: {
//         customerFullName: fullName.value,
//         bookingScheduleStatus: paymentStatus,
//         customerId: user.value.userId,
//         customerPhoneNumber: user.value.phoneNumber,
//         startDate: bookingResponse.value.unpaidBookingList[0].bookingDate,
//         endDate:
//           bookingResponse.value.unpaidBookingList[
//             bookingResponse.value.unpaidBookingList.length - 1
//           ].bookingDate,
//         totalPrice: totalPrice.value.toString(),
//         scheduleType: getScheduleType(),
//         totalPlayingTime: totalPlayingTime.value,
//         bookingSlotResponseDTOs: bookingResponse.value.unpaidBookingList.map(
//           (slot) => ({
//             courtId: slot.courtId,
//             startBooking: slot.startBooking,
//             endBooking: slot.endBooking,
//             bookingDate: slot.bookingDate,
//             bookingType: slot.bookingType,
//             price: slot.price,
//           })
//         ),
//       },
//       paymentDetail: {
//         amount: totalPrice.value,
//         paymentMethod: "ATM",
//         paymentTime: formatDateTimeForAPI(new Date()),
//       },
//     };

//     console.log("Payload being sent:", JSON.stringify(payload, null, 2));

//     const response = await axios.post(
//       "http://localhost:8080/courtmaster/booking/payment-handle",
//       payload
//     );
//     console.log("Payment confirmed:", response.data);
//     // Xử lý phản hồi thành công (ví dụ: hiển thị thông báo thành công, chuyển hướng)
//   } catch (error) {
//     console.error("Error confirming payment:", error);
//     if (error.response) {
//       // Lỗi phản hồi từ server
//       console.error("Server responded with error:", error.response.data);
//       console.error("Status code:", error.response.status);
//       console.error("Headers:", error.response.headers);
//     } else if (error.request) {
//       // Yêu cầu được gửi nhưng không nhận được phản hồi
//       console.error("No response received:", error.request);
//     } else {
//       // Lỗi khi thiết lập yêu cầu
//       console.error("Error setting up request:", error.message);
//     }
//     // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
//   }
// };

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #6babf4;
  text-align: center;
}

h2 {
  color: #6babf4;
  margin-top: 20px;
}

.info-section {
  margin-bottom: 20px;
}

.payment-info {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  overflow-x: auto;
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
  position: sticky;
  top: 0;
  z-index: 1;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-btn,
.back-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn {
  background-color: #6babf4;
  color: white;
}

.back-btn {
  background-color: grey;
  color: white;
}

.confirm-btn:hover,
.back-btn:hover {
  opacity: 0.8;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.option {
  flex: 1;
  margin-right: 10px;
}

.option:last-child {
  margin-right: 0;
}

.option:hover {
  background-color: #e0e0e0;
}

.input {
  display: none;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}

.input:checked + .btn {
  background-color: #6babf4;
  color: white;
}
</style>
