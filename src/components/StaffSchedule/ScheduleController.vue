<template>
  <div class="controller">
    <a href="/">
      <img src="../../../public/img/mono_blue_crop.png" class="logo" alt="" />
    </a>
    <div class="title">Vận hành câu lạc bộ</div>

    <div class="date-picker" v-if="selectedType !== 'fixed'">
      <input
        type="date"
        :value="selectedDate"
        @input="handleDateChange"
        pattern="\d{4}-\d{2}-\d{2}"
      />
    </div>
    <div v-else class="date-range-picker">
      <div class="date-picker">
        <label>Ngày bắt đầu:</label>
        <input
          type="date"
          :value="selectedDate"
          @input="handleDateChange"
          pattern="\d{4}-\d{2}-\d{2}"
        />
      </div>
      <div class="date-picker">
        <label>Ngày kết thúc:</label>
        <input
          type="date"
          :value="endDate"
          @input="handleEndDateChange"
          :min="minEndDate"
          pattern="\d{4}-\d{2}-\d{2}"
        />
      </div>
    </div>

    <ScheduleErrorMessage
      :message="scheduleStore.errorMessage"
      :visible="scheduleStore.errorMessageVisible"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useClubStore } from "../../stores/clubMng";
import { usePaymentStore } from "../../stores/PaymentStore";
import { useScheduleStore } from "../../stores/scheduleStore";
import ScheduleErrorMessage from "./ScheduleErrorMessage.vue";

const selectedDate = ref("");
const endDate = ref("");
const selectedType = ref("one-time");
const scheduleStore = useScheduleStore();
const clubStore = useClubStore();
const paymentStore = usePaymentStore();
const currentClub = computed(() => clubStore.currentClub);
const route = useRoute();
const router = useRouter();

const handleBooking = () => {
  const bookingInfo = scheduleStore.getFormattedBookings();
  paymentStore.setBookingSchedule(bookingInfo);
};

const goToConfirmPayment = () => {
  scheduleStore.saveSelectedSlots();
  router.push({
    name: "ConfirmPaymentScreen",
    params: { clubId: currentClub.value.clubId },
  });
};

const minEndDate = computed(() => {
  if (!selectedDate.value) return "";
  const minDate = new Date(selectedDate.value);
  minDate.setMonth(minDate.getMonth() + 1);
  return minDate.toISOString().split("T")[0];
});

onMounted(async () => {
  const currentDate = new Date().toISOString().split("T")[0];
  selectedDate.value = currentDate;
  paymentStore.bookingSchedule.startDate = selectedDate.value;

  if (!currentClub.value) {
    await clubStore.fetchClubById(route.params.clubId);
  }
});

const handleDateChange = (e) => {
  selectedDate.value = e.target.value;
  scheduleStore.updateSelectedDate(selectedDate.value);
};

const handleEndDateChange = (e) => {
  endDate.value = e.target.value;
  scheduleStore.updateEndDate(endDate.value);
  paymentStore.bookingSchedule.endDate = endDate.value;
};

watch(
  () => scheduleStore.bookingResponse,
  (newBookingResponse) => {
    if (
      newBookingResponse &&
      newBookingResponse.unpaidBookingList.length > 0 &&
      newBookingResponse.unpaidBookingList.every(
        (booking) =>
          booking.bookingType ===
          newBookingResponse.unpaidBookingList[0].bookingType
      )
    ) {
      scheduleStore.clearErrorMessage();
    }
  },
  { deep: true }
);
</script>

<style scoped>
.controller {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.title {
  font-size: 28px;
  color: #6babf4;
  font-weight: bold;
}

.book-btn {
  padding: 10px 20px;
  font-weight: bold;
  background-color: #6babf4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.book-btn:hover {
  background-color: #4a93e7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.book-btn:active {
  background-color: #3b7ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(0);
}

.date-picker,
.date-range-picker {
  display: flex;
  align-items: center;
}

.date-picker label,
.date-range-picker label {
  margin-right: 8px;
  color: #6babf4;
  font-weight: bold;
}

.date-picker input[type="date"],
.date-range-picker input[type="date"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #333;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}

.date-picker input[type="date"]:hover,
.date-range-picker input[type="date"]:hover {
  border-color: #6babf4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-picker input[type="date"]:focus,
.date-range-picker input[type="date"]:focus {
  outline: none;
  border-color: #6babf4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.type-dropdown {
  display: flex;
  align-items: center;
}

.type-dropdown label {
  margin-right: 8px;
  color: #6babf4;
  font-weight: bold;
}

.type-dropdown select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #333;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}

.type-dropdown select:hover {
  border-color: #6babf4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.type-dropdown select:focus {
  outline: none;
  border-color: #6babf4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.logo {
  margin: -10px;
  height: 33px;
  width: 78px;
}

.date-range-picker {
  display: flex;
  gap: 16px;
}
</style>
