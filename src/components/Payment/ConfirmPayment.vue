<template>
  <div class="container">
    <h1>Thông tin thanh toán</h1>

    <section class="info-section">
      <h2>Thông tin câu lạc bộ</h2>
      <div class="payment-info">
        <div class="info-item">
          <span class="label">Tên:</span>
          <span class="value">{{ clubName }}</span>
        </div>
        <div class="info-item">
          <span class="label">Số điện thoại quản lí:</span>
          <span class="value">{{ courtManagerPhone }}</span>
        </div>
      </div>
    </section>

    <section class="info-section">
      <h2>Thông tin cá nhân</h2>
      <div class="payment-info">
        <div class="info-item">
          <span class="label">Họ và tên:</span>
          <span class="value">{{ fullName }}</span>
        </div>
        <div class="info-item">
          <span class="label">Số điện thoại:</span>
          <span class="value">{{ user.phoneNumber }}</span>
        </div>
        <div class="info-item">
          <span class="label">Email:</span>
          <span class="value">{{ user.email }}</span>
        </div>
        <div class="info-item">
          <span class="label">Tổng giờ chơi (h):</span>
          <span class="value">{{ totalPlayingTime }}</span>
        </div>
      </div>
    </section>

    <section class="info-section">
      <h2>Thông tin thanh toán</h2>
      <div class="info-item">
        <span class="label">Tổng chi phí:</span>
        <span class="value">{{ formatPrice(calculatedTotalPrice) }} đ</span>
      </div>
      <div class="wrapper">
        <div class="option">
          <input
            id="fullyPay"
            v-model="paymentOption"
            value="Paid"
            name="btn"
            type="radio"
            class="input"
          />
          <label for="fullyPay" class="btn">
            <span class="span">Trả trước toàn bộ</span>
          </label>
        </div>
        <div class="option">
          <input
            id="deposit50"
            v-model="paymentOption"
            value="Deposited 50%"
            name="btn"
            type="radio"
            class="input"
          />
          <label for="deposit50" class="btn">
            <span class="span">Trả trước 50%</span>
          </label>
        </div>
        <div class="option">
          <input
            id="deposit25"
            v-model="paymentOption"
            value="Deposited 25%"
            name="btn"
            type="radio"
            class="input"
          />
          <label for="deposit25" class="btn">
            <span class="span">Trả trước 25%</span>
          </label>
        </div>
      </div>
    </section>

    <section class="info-section">
      <h2>Thông tin đặt sân</h2>
      <table class="booking-table">
        <thead>
          <tr>
            <th>Sân</th>
            <th>Giờ bắt đầu</th>
            <th>Giờ bắt kết thúc</th>
            <th>Ngày đặt</th>
            <th>Loại lịch</th>
            <th>Chi phí</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(slot, index) in formattedBookings" :key="index">
            <td>{{ slot.courtName }}</td>
            <td>{{ slot.startBooking }}</td>
            <td>{{ slot.endBooking }}</td>
            <td>{{ slot.bookingDate }}</td>
            <td>{{ translateBookingType(slot.bookingType) }}</td>
            <td>{{ formatPrice(slot.price) }} đ</td>
          </tr>
        </tbody>
      </table>
    </section>

    <div class="actions">
      <button @click="confirmPayment(calculatedTotalPrice)" class="confirm-btn">
        Xác nhận
      </button>
      <button @click="goBack" class="back-btn">Trở về</button>
    </div>
  </div>
</template>

<script setup>
// import axios from "axios";
import axios from "axios";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useClubStore } from "../../stores/clubMng";
import { usePaymentStore } from "../../stores/PaymentStore";
import { useScheduleStore } from "../../stores/scheduleStore";
axios.defaults.withCredentials = true;

const paymentStore = usePaymentStore();
const clubStore = useClubStore();
const scheduleStore = useScheduleStore();
const { bookingResponse } = storeToRefs(scheduleStore);
const router = useRouter();
const authStore = useAuthStore();

const { bookingSchedule } = storeToRefs(paymentStore);

const user = computed(() => authStore.user);
const paymentOption = ref("Deposited 25%");

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

const clubId = computed(() => clubStore.currentClub?.clubId || "");

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

const translateBookingType = (bookingType) => {
  switch (bookingType) {
    case "One-time play":
      return "Lịch trong ngày";
    case "Flexible":
      return "Lịch linh hoạt";
    case "Fixed":
      return "Lịch cố định";
    default:
      return bookingType; // Trả về giá trị gốc nếu không khớp
  }
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
    courtId: slot.courtId,
  }));
});

onMounted(() => {
  paymentStore.currentClubInfo.courtManagerPhone = courtManagerPhone.value;
  paymentStore.currentClubInfo.clubId = clubId.value;
  paymentStore.currentClubInfo.clubName = clubName.value;

  bookingSchedule.value = {
    ...bookingSchedule.value,
    customerFullName: fullName.value,
    customerPhoneNumber: user.value.phoneNumber,
    scheduleType: bookingResponse.value?.scheduleType || "One-time play",
    customerId: user.value.userId,
    totalPlayingTime: totalPlayingTime.value,
    bookingSlotResponseDTOs: formattedBookings.value.map((booking) => ({
      courtId: booking.courtId, // Assuming courtName is actually the courtId
      startBooking: booking.startBooking,
      endBooking: booking.endBooking,
      bookingDate: convertDateFormat(booking.bookingDate),
      bookingType: booking.bookingType,
      price: booking.price,
    })),
    totalPrice: totalPrice,
  };
  console.log(
    "Start date of booking schedule in paymentStore: ",
    bookingSchedule.value.startDate
  );
  console.log(
    "End date of booking schedule in paymentStore: ",
    bookingSchedule.value.endDate
  );
  paymentStore.paymentPayload.bookingSchedule = paymentStore.bookingSchedule;
  paymentStore.paymentPayload.currentClubInfo = paymentStore.currentClubInfo;
});

// Computed property for the recalculated total price
const calculatedTotalPrice = computed(() => {
  switch (paymentOption.value) {
    case "Deposited 50%":
      return totalPrice.value * 0.5;
    case "Deposited 25%":
      return totalPrice.value * 0.25;
    case "Paid":
    default:
      return totalPrice.value;
  }
});

// LUU GIU GIA TRI THAY DOI CUA BOOKINGSCHEDULE STATUS
// watch([paymentOption, calculatedTotalPrice], ([newPaymentOption, newTotalPrice]) => {
//   bookingSchedule.value = {
//     ...bookingSchedule.value,
//     bookingScheduleStatus: newPaymentOption,
//     totalPrice: newTotalPrice
//   };
// });
watch([paymentOption], ([newPaymentOption]) => {
  paymentStore.paymentPayload.bookingSchedule.bookingScheduleStatus =
    newPaymentOption;
});

function convertDateFormat(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

const confirmPayment = async (totalPrice) => {
  paymentStore.savePaymentPayloadToSessionStorage();
  try {
    const getPaymentUrlResponse = await axios.get(
      `http://localhost:8080/courtmaster/payment/vn-pay?amount=${totalPrice}`,
      { withCredentials: true }
    );
    console.log(
      "Day la data cua getPaymentUrlResponse: ",
      getPaymentUrlResponse.data
    );
    const paymentUrl = getPaymentUrlResponse.data.data.paymentUrl;
    if (paymentUrl) {
      // Second API call using the extracted payment URL
      window.location.href = paymentUrl;
      console.log(
        "This is the data of paymentResponse: ",
        paymentResponse.data
      );
    } else {
      console.log("Payment URL not found in the response.");
    }
  } catch (error) {
    console.log(
      "Error at confirmPayment function in ConfirmPayment.vue: ",
      error
    );
  }
};
const goBack = () => {
  // Set a flag in local storage to indicate that a reload is needed
  localStorage.setItem("shouldReload", "true");
  // Navigate back
  window.history.back();
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
