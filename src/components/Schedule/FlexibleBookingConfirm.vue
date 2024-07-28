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
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => {
  emit("confirm");
};

const cancel = () => {
  emit("cancel");
};
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