<template>
  <div v-if="isVisible" class="popup-overlay">
    <div class="popup-content">
      <h2>Đặt sân linh hoạt</h2>
      <p>Bạn muốn đặt giờ chơi theo kiểu linh hoạt?</p>
      <p>Giờ chơi sẽ được trừ vào tổng giờ chơi bạn đã đăng kí</p>
      <div class="button-group">
        <button @click="confirm" class="confirm-btn">Xác nhận</button>
        <button @click="cancel" class="cancel-btn">Hủy</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { computed, defineEmits, defineProps, onMounted, ref } from "vue";
import router from "../../router";
import { useAuthStore } from "../../stores/auth";
import { useClubStore } from "../../stores/clubMng";
import { usePaymentStore } from "../../stores/PaymentStore";
import { useScheduleStore } from "../../stores/scheduleStore";
const API_END_POINT = import.meta.env.VITE_API_URL;

const paymentStore = usePaymentStore();
const { bookingSchedule } = storeToRefs(paymentStore);
const clubStore = useClubStore();

const authStore = useAuthStore();
const scheduleStore = useScheduleStore();
const user = computed(() => authStore.user);
const { bookingResponse } = storeToRefs(scheduleStore);
const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["confirm", "cancel"]);

// Club information
const clubName = computed(() => clubStore.currentClub?.clubName || "");
const courtManagerPhone = computed(
  () => clubStore.currentClub?.courtManagerPhone || ""
);
const clubId = computed(() => clubStore.currentClub?.clubId || "");

const fullName = computed(() =>
  `${user.value.firstName} ${user.value.lastName}`.trim()
);

const totalPlayingTime = computed(() => {
  return (
    scheduleStore.flexibleBooking.totalPlayTime ||
    (bookingResponse.value ? bookingResponse.value.totalHour : "00:00")
  );
});

const formattedBookings = computed(() => {
  if (!bookingResponse.value || !bookingResponse.value.unpaidBookingList)
    return [];
  return bookingResponse.value.unpaidBookingList.map((slot) => ({
    courtId: slot.courtId,
    startBooking: scheduleStore.formatTimeFromBackend(slot.startBooking),
    endBooking: scheduleStore.formatTimeFromBackend(slot.endBooking),
    bookingDate: scheduleStore.formatDateFromBackend(slot.bookingDate),
    price: slot.price,
  }));
});

const startDate = ref("");
const endDate = ref("");
const errorMessage = ref("");

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

const formatTime = (timeString) => {
  return timeString.padStart(5, "0");
};

onMounted(() => {
  paymentStore.currentClubInfo.courtManagerPhone = courtManagerPhone.value;
  paymentStore.currentClubInfo.clubId = clubId.value;
  paymentStore.currentClubInfo.clubName = clubName.value;

  if (formattedBookings.value.length > 0) {
    startDate.value = formatDate(formattedBookings.value[0].bookingDate);
    endDate.value = formatDate(
      formattedBookings.value[formattedBookings.value.length - 1].bookingDate
    );
  }

  bookingSchedule.value = {
    customerFullName: fullName.value,
    customerPhoneNumber: user.value.phoneNumber,
    bookingScheduleStatus: "Paid",
    scheduleType: "Flexible",
    customerId: user.value.userId.trim(), // Ensure no extra spaces
    totalPlayingTime: totalPlayingTime.value,
    startDate: startDate.value,
    endDate: endDate.value,
    totalPrice: 0, // Set to 0 or calculate if needed
    bookingSlotResponseDTOs: formattedBookings.value.map((booking) => ({
      courtId: booking.courtId,
      startBooking: formatTime(booking.startBooking),
      endBooking: formatTime(booking.endBooking),
      bookingDate: formatDate(booking.bookingDate),
      price: Number(booking.price), // Ensure price is a number
    })),
  };
});

const paymentDetailFlex = computed(() => ({
  amount: calculateTotalAmount(), // Calculate based on bookings
  paymentMethod: "Time",
  paymentTime: getCurrentDateTime(),
}));

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function calculateTotalAmount() {
  return bookingSchedule.value.bookingSlotResponseDTOs.reduce(
    (total, booking) => total + booking.price,
    0
  );
}

const confirm = async () => {
  console.log(paymentStore.currentClubInfo.clubName);
  console.log("This is formatbooking: ", formattedBookings.value);
  try {
    const payload = {
      courtManagerPhone: paymentStore.currentClubInfo.courtManagerPhone,
      clubId: paymentStore.currentClubInfo.clubId,
      clubName: paymentStore.currentClubInfo.clubName,
      bookingSchedule: {
        ...bookingSchedule.value,

        totalPrice: 0,
        totalPlayingTime: totalPlayingTime.value,
        bookingSlotResponseDTOs: formattedBookings.value.map((booking) => ({
          courtId: booking.courtId,
          startBooking: formatTime(booking.startBooking),
          endBooking: formatTime(booking.endBooking),
          bookingDate: formatDate(booking.bookingDate),
          price: Number(booking.price), // Ensure price is a number
        })),
      },
      paymentDetail: paymentDetailFlex.value,
    };
    console.log("Payload being sent:", JSON.stringify(payload, null, 2));
    const response = await axios.post(
      `${API_END_POINT}/courtmaster/booking/flexible-payment`,
      payload
    );
    console.log("Response:", response.data);
    router.push("/payment-success");
    emit("confirm");
  } catch (error) {
    console.error("Error at FlexibleBookingConfirm: ", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      errorMessage.value = `Error: ${error.response.status} - ${JSON.stringify(
        error.response.data
      )}`;
    } else if (error.request) {
      console.error("No response received:", error.request);
      errorMessage.value = "No response received from the server.";
    } else {
      console.error("Error setting up request:", error.message);
      errorMessage.value = `Error: ${error.message}`;
    }
  }
};

const cancel = () => {
  emit("cancel");
};
const getCourtName = (courtId) => {
  const court = clubStore.currentClub?.courtList.find(
    (c) => c.courtId === courtId
  );
  return court ? court.courtName : courtId;
};

function convertDateFormat(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}
</script>




<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

h2 {
  margin-top: 0;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-btn {
  background-color: #4caf50;
  color: white;
}

.confirm-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.cancel-btn:hover {
  background-color: #da190b;
}

.total-price {
  margin-bottom: 15px;
  font-weight: bold;
  color: #4caf50;
}
</style>