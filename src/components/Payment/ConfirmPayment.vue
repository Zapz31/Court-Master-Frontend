<template>
  <div class="container">
    <div v-if="!isFlexibleBooking">
      <h1>Xác nhận đặt sân</h1>
    </div>
    <div v-else>
      <h1>Xác nhận mua giờ chơi</h1>
    </div>

    <div class="card-container">
      <div class="card club-info">
        <h2>Thông tin câu lạc bộ</h2>
        <div class="info-item">
          <span class="label">Tên:</span>
          <span class="value">{{ clubName }}</span>
        </div>
        <div class="info-item">
          <span class="label">Số điện thoại quản lí:</span>
          <span class="value">{{ courtManagerPhone }}</span>
        </div>
      </div>

      <div class="card personal-info">
        <h2>Thông tin cá nhân</h2>
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

      <div class="card payment-info">
        <h2>Thông tin thanh toán</h2>
        <div class="info-item total-cost">
          <span class="label">Tổng chi phí:</span>
          <span class="value">{{ formatPrice(calculatedTotalPrice) }} đ</span>
        </div>
        <div v-if="!isFlexibleBooking" class="payment-options">
          <h3>Chọn phương thức thanh toán</h3>
          <div class="option">
            <input id="fullyPay" v-model="paymentOption" value="Paid" name="paymentOption" type="radio" />
            <label for="fullyPay">Trả trước toàn bộ</label>
          </div>
          <div class="option">
            <input id="deposit50" v-model="paymentOption" value="Deposited 50%" name="paymentOption" type="radio" />
            <label for="deposit50">Trả trước 50%</label>
          </div>
          <div class="option">
            <input id="deposit25" v-model="paymentOption" value="Deposited 25%" name="paymentOption" type="radio" />
            <label for="deposit25">Trả trước 25%</label>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isFlexibleBooking" class="card booking-info">
      <h2>Thông tin đặt sân</h2>
      <div class="table-responsive">
        <table class="booking-table">
          <thead>
            <tr>
              <th>Sân</th>
              <th>Giờ bắt đầu</th>
              <th>Giờ kết thúc</th>
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
      </div>
    </div>

    <div class="actions">
      <button @click="goBack" class="btn back-btn">Trở về</button>
      <button @click="confirmPayment(calculatedTotalPrice)" class="btn confirm-btn">
        Xác nhận
      </button>
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

const bookingType = computed(() => {
  if (scheduleStore.flexibleBooking.totalPlayTime > 0) {
    return "Flexible";
  }
  return bookingResponse.value?.scheduleType || "One-time play";
});

const isFlexibleBooking = computed(() => {
  return bookingType.value === "Flexible";
});

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
  return (
    scheduleStore.flexibleBooking.totalPlayTime ||
    (bookingResponse.value ? bookingResponse.value.totalHour : "0")
  );
});

const totalPrice = computed(() => {
  return (
    scheduleStore.flexibleBooking.totalPrice ||
    (bookingResponse.value ? bookingResponse.value.totalPrice : 0)
  );
});

// const totalPlayingTime = computed(() => {
//   return bookingResponse.value ? bookingResponse.value.totalHour : "0";
// });

// const totalPrice = computed(() => {
//   return bookingResponse.value ? bookingResponse.value.totalPrice : 0;
// });

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
      isTemp: 1
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
  if (isFlexibleBooking.value) {
    return totalPrice.value;
  }
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

watch([bookingType], ([newBookingType]) => {
  if (newBookingType === "Flexible") {
    paymentOption.value = "Paid";
  }
});

function convertDateFormat(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

const confirmPayment = async (totalPrice) => {

  //paymentStore.savePaymentPayloadToSessionStorage();

  try {
    // Call API to insert booking schedule and booking slot to database before payment

    console.log('BookingSchedule value: ', bookingSchedule.value);
    const response = await axios.post('http://localhost:8080/courtmaster/booking/insert-temp-bookingscheduleslot', bookingSchedule.value);
    console.log('Response:', response.data.massage);
    if (response.data.massage === "dup") {

      console.log("Your booking is duplicate with other !")
    } else {
      paymentStore.paymentPayload.tempBookingId = response.data.massage;
      paymentStore.savePaymentPayloadToSessionStorage();
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
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  color: #6babf4;
  margin-top: 0;
  margin-bottom: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
  min-width: 300px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  color: #666;
}

.value {
  color: #333;
}

.total-cost {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 10px;
}

.payment-options {
  margin-top: 20px;
}

.payment-options h3 {
  margin-bottom: 10px;
  font-size: 1em;
  color: #666;
}

.option {
  margin-bottom: 10px;
}

.option label {
  margin-left: 10px;
  cursor: pointer;
}

.booking-info {
  position: relative;
  overflow: hidden;
}

.table-responsive {
  max-height: 400px;
  /* Điều chỉnh chiều cao tối đa theo nhu cầu */
  overflow-y: auto;
}

.booking-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.booking-table th,
.booking-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.booking-table th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 10;
}

.booking-table th::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: #ddd;
}

.booking-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.confirm-btn {
  background-color: #6babf4;
  color: white;
}

.back-btn {
  background-color: #ccc;
  color: #333;
}

.confirm-btn:hover,
.back-btn:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
  }

  .card {
    min-width: 100%;
  }

  .table-responsive {
    max-height: 300px;
    /* Điều chỉnh cho màn hình nhỏ hơn */
  }

  .booking-table {
    font-size: 0.9em;
  }

  .booking-table th,
  .booking-table td {
    padding: 8px;
  }

  .actions {
    flex-direction: column-reverse;
    gap: 10px;
  }

  .btn {
    width: 100%;
  }
}
</style>