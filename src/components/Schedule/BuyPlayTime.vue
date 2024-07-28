<template>
  <div v-if="isVisible" class="popup-overlay">
    <div class="popup-content">
      <h2>Mua thêm giờ chơi</h2>
      <div class="input-group">
        <label for="playTime">Số giờ muốn mua:</label>
        <input
          type="number"
          id="playTime"
          v-model.number="playTime"
          :min="minPlayTime"
          step="1"
        />
      </div>
      <div class="total-price">Tổng tiền: {{ formattedTotalPrice }}</div>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="button-group">
        <button @click="confirmPurchase" class="confirm-btn">Xác nhận</button>
        <button @click="closePopup" class="cancel-btn">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useClubStore } from "../../stores/clubMng";
import { useScheduleStore } from "../../stores/scheduleStore";

const props = defineProps({
  isVisible: Boolean,
  minPlayTime: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["close", "confirm", "updateTotalPrice"]);

const clubStore = useClubStore();
const { currentClub } = storeToRefs(clubStore);
const scheduleStore = useScheduleStore();
const playTime = ref(props.minPlayTime);
const errorMessage = ref("");
const calculatedPrice = ref(0);
const route = useRoute();
const router = useRouter();

const totalPrice = computed(() => {
  return calculatedPrice.value;
});

const formattedTotalPrice = computed(() => {
  return formatCurrency(totalPrice.value);
});

const formatCurrency = (value) => {
  if (isNaN(value)) return "NaN đ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const fetchCalculatedPrice = async () => {
  if (!currentClub.value) {
    console.error("Current club is not set");
    errorMessage.value = "Không thể tính toán giá. Vui lòng thử lại sau.";
    return;
  }

  try {
    const response = await axios.get(
      "http://localhost:8080/courtmaster/booking/total-hours-calculated-price",
      {
        params: {
          clubId: currentClub.value.clubId,
          totalHours: playTime.value,
        },
      }
    );
    if (response.data && typeof response.data.totalPrice === "number") {
      calculatedPrice.value = response.data.totalPrice;
    } else {
      console.error("Invalid price data:", response.data);
      errorMessage.value = "Dữ liệu giá không hợp lệ.";
    }
    emit("updateTotalPrice", calculatedPrice.value);
  } catch (error) {
    console.error("Error fetching calculated price:", error);
    errorMessage.value = "Không thể tính toán giá. Vui lòng thử lại sau.";
  }
};

const closePopup = () => {
  emit("close");
};

const confirmPurchase = () => {
  if (playTime.value < props.minPlayTime || !Number.isInteger(playTime.value)) {
    errorMessage.value = `Vui lòng nhập số giờ hợp lệ (từ ${props.minPlayTime} đến ${props.maxPlayTime} giờ).`;
    return;
  }
  scheduleStore.updateFlexibleBooking(playTime.value, totalPrice.value);
  emit("confirm", { hours: playTime.value, totalPrice: totalPrice.value });
  closePopup();
  router.push({
    name: "ConfirmPaymentScreen",
    params: { clubId: currentClub.value.clubId },
  });
};

watch(playTime, async (newValue) => {
  errorMessage.value = "";
  if (typeof newValue !== "number" || isNaN(newValue)) {
    playTime.value = props.minPlayTime;
  } else if (newValue < props.minPlayTime) {
    playTime.value = props.minPlayTime;
  }
  await fetchCalculatedPrice();
});

watch(
  () => currentClub.value,
  (newClub) => {
    if (newClub) {
      fetchCalculatedPrice();
    }
  }
);

onMounted(() => {
  console.log("BuyPlayTime component mounted");
  console.log("Props:", props);
  if (currentClub.value) {
    fetchCalculatedPrice();
  }
});
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


