<template>
  <div class="controller">
    <a href="/">
      <img src="../../../public/img/mono_blue_crop.png" class="logo" alt="" />
    </a>
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

    <div v-if="selectedType === 'flexible'" class="play-time-control">
      <div class="total-play-time">
        <span>Tổng giờ chơi: </span>
        <span class="total-play-time-value">{{
          formattedCustomerPlayableTime
        }}</span>
      </div>
      <button class="add-play-time-btn" @click="showBuyPlayTimePopup">
        Mua thêm giờ chơi
      </button>
    </div>

    <div class="type-dropdown">
      <label>Loại lịch:</label>
      <select v-model="selectedType" @change="updateCurrentBookingType">
        <option value="one-time">Lịch trong ngày</option>
        <option value="flexible">Lịch linh hoạt</option>
        <option value="fixed">Lịch cố định</option>
      </select>
    </div>

    <button v-if="currentClub" class="book-btn" @click="prepareBookingData">
      Đặt sân
    </button>
    <button v-else class="book-btn" disabled>Please choose your slot</button>

    <ScheduleErrorMessage
      :message="scheduleStore.errorMessage"
      :visible="scheduleStore.errorMessageVisible"
    />
  </div>

  <!-- Thêm component popup vào cuối template -->
  <BuyPlayTime
    :isVisible="isBuyPlayTimePopupVisible"
    :flexiblePrice="flexiblePrice"
    :minPlayTime="minPlayTime"
    :maxPlayTime="maxPlayTime"
    @close="closeBuyPlayTimePopup"
    @confirm="handleBuyPlayTime"
    @updateTotalPrice="updateTotalPrice"
  />

  <FlexibleBookingConfirm
    :isVisible="isFlexiblePopupVisible"
    @confirm="confirmFlexibleBooking"
    @cancel="cancelFlexibleBooking"
  />
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useClubStore } from "../../stores/clubMng";
import { usePaymentStore } from "../../stores/PaymentStore";
import { useScheduleStore } from "../../stores/scheduleStore";
import BuyPlayTime from "./BuyPlayTime.vue";
import FlexibleBookingConfirm from "./FlexibleBookingConfirm.vue";
import ScheduleErrorMessage from "./ScheduleErrorMessage.vue";

const isFlexiblePopupVisible = ref(false);
const selectedDate = ref("");
const endDate = ref("");
const selectedType = ref("one-time");
const scheduleStore = useScheduleStore();
const clubStore = useClubStore();
const paymentStore = usePaymentStore();
const currentClub = computed(() => clubStore.currentClub);
const route = useRoute();
const router = useRouter();

const isBuyPlayTimePopupVisible = ref(false);

const currentTotalPrice = ref(0);

const formattedCustomerPlayableTime = computed(() => {
  const time = clubStore.customerPlayableTime;
  const [hours, minutes] = time.split(":");
  return `${parseInt(hours)}h${minutes !== "00" ? ` ${minutes}m` : ""}`;
});

const showBuyPlayTimePopup = () => {
  isBuyPlayTimePopupVisible.value = true;
};

const closeBuyPlayTimePopup = () => {
  isBuyPlayTimePopupVisible.value = false;
};

const updateTotalPrice = (price) => {
  currentTotalPrice.value = price;
};

const getMostCommonPrice = (timeFrameList) => {
  if (!timeFrameList || timeFrameList.length === 0) return 0;

  const priceCounts = timeFrameList.reduce((acc, tf) => {
    if (tf.type === "flexible") {
      acc[tf.price] = (acc[tf.price] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.entries(priceCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
};

const flexiblePrice = computed(() => {
  if (clubStore.currentClub && clubStore.currentClub.timeFrameList) {
    return Number(getMostCommonPrice(clubStore.currentClub.timeFrameList));
  }
  return 0;
});

const minPlayTime = computed(() => {
  if (clubStore.currentClub && clubStore.currentClub.timeFrameList) {
    return Math.min(
      ...clubStore.currentClub.timeFrameList
        .filter((tf) => tf.type === "Flexible")
        .map((tf) => tf.minPlayTime || 1)
    );
  }
  return 1;
});

const maxPlayTime = computed(() => {
  if (clubStore.currentClub && clubStore.currentClub.timeFrameList) {
    return Math.max(
      ...clubStore.currentClub.timeFrameList
        .filter((tf) => tf.type === "flexible")
        .map((tf) => tf.maxPlayTime || 24)
    );
  }
  return 24;
});

const handleBuyPlayTime = ({ hours, totalPrice }) => {
  console.log(`Mua thêm ${hours} giờ chơi với tổng giá ${totalPrice} VND`);
  // Cập nhật tổng giờ chơi
  totalPlayTime.value += hours;
  // Thêm các xử lý khác nếu cần, ví dụ như cập nhật state hoặc gửi request đến server
};

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

const prepareBookingData = () => {
  if (
    !scheduleStore.bookingResponse ||
    !scheduleStore.bookingResponse.unpaidBookingList.length
  ) {
    scheduleStore.setErrorMessage("Vui lòng chọn ít nhất 1 giờ chơi.");
    return;
  }

  const allSameType = scheduleStore.bookingResponse.unpaidBookingList.every(
    (booking) =>
      booking.bookingType ===
      scheduleStore.bookingResponse.unpaidBookingList[0].bookingType
  );

  if (!allSameType) {
    scheduleStore.setErrorMessage(
      "Tất cả giờ chơi cần có chung một loại lịch."
    );
    return;
  }

  const bookingType =
    scheduleStore.bookingResponse.unpaidBookingList[0].bookingType;

  console.log("Current booking type:", bookingType); // Debugging line

  if (bookingType === "flexible" || selectedType.value === "flexible") {
    isFlexiblePopupVisible.value = true;
  } else {
    // Luồng 1: One-time play hoặc Fixed
    handleNormalBooking();
  }
};

const cancelFlexibleBooking = () => {
  isFlexiblePopupVisible.value = false;
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
  updateCurrentBookingType();

  if (!currentClub.value) {
    await clubStore.fetchClubById(route.params.clubId /* userId here */);
  }
});

const updateCurrentBookingType = () => {
  scheduleStore.setCurrentBookingType(selectedType.value);
  if (selectedType.value === "fixed") {
    scheduleStore.updateSelectedDateRange({
      start: selectedDate.value,
      end: endDate.value,
    });
  } else {
    scheduleStore.updateSelectedDate(selectedDate.value);
  }
};

const handleDateChange = (e) => {
  selectedDate.value = e.target.value;
  scheduleStore.updateSelectedDate(selectedDate.value);
};

const handleEndDateChange = (e) => {
  endDate.value = e.target.value;
  scheduleStore.updateEndDate(endDate.value);
  paymentStore.bookingSchedule.endDate = endDate.value;
};

watch(selectedType, updateCurrentBookingType);
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

watch(selectedType, (newType) => {
  console.log("Selected type changed to:", newType);
  updateCurrentBookingType();
});

const totalPlayTime = computed(() => {
  if (selectedType.value !== "flexible" || !scheduleStore.bookingResponse)
    return 0;
  return scheduleStore.bookingResponse.unpaidBookingList.reduce(
    (total, booking) => {
      return total + (booking.endTime - booking.startTime) / (60 * 60 * 1000); // Convert milliseconds to hours
    },
    0
  );
});
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

.play-time-control {
  display: flex;
  align-items: center;
  gap: 16px;
}

.total-play-time {
  font-weight: bold;
  color: #6babf4;
}
.total-play-time-value {
  color: black;
}

.add-play-time-btn {
  padding: 8px 16px;
  font-weight: bold;
  background-color: #6babf4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.add-play-time-btn:hover {
  background-color: #4a93e7;
}

.add-play-time-btn:active {
  background-color: #3b7ccc;
}
</style>
