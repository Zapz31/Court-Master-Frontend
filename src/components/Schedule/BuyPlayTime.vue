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
          :max="maxPlayTime"
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
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  isVisible: Boolean,
  flexiblePrice: {
    type: Number,
    required: true,
  },
  minPlayTime: {
    type: Number,
    required: true,
  },
  maxPlayTime: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["close", "confirm", "updateTotalPrice"]);

const playTime = ref(props.minPlayTime);
const errorMessage = ref("");

const totalPrice = computed(() => {
  return playTime.value * props.flexiblePrice;
});

const formattedTotalPrice = computed(() => {
  return formatCurrency(totalPrice.value);
});

watch(playTime, (newValue) => {
  errorMessage.value = "";
  if (newValue < props.minPlayTime) {
    playTime.value = props.minPlayTime;
  } else if (newValue > props.maxPlayTime) {
    playTime.value = props.maxPlayTime;
  }
  emit("updateTotalPrice", totalPrice.value);
});

const closePopup = () => {
  emit("close");
};

const confirmPurchase = () => {
  if (
    playTime.value < props.minPlayTime ||
    playTime.value > props.maxPlayTime ||
    !Number.isInteger(playTime.value)
  ) {
    errorMessage.value = `Vui lòng nhập số giờ hợp lệ (từ ${props.minPlayTime} đến ${props.maxPlayTime} giờ).`;
    return;
  }
  emit("confirm", { hours: playTime.value, totalPrice: totalPrice.value });
  closePopup();
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

onMounted(() => {
  console.log("BuyPlayTime component mounted");
  console.log("Props:", props);
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