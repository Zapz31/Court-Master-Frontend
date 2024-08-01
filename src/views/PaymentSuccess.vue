<template>
  <div class="payment-success">
    <div class="message">
      <span class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      </span>
      <h1>Thanh toán thành công!</h1>
    </div>
    <p class="subtitle">Cảm ơn bạn đã tin tưởng thanh toán</p>
    <div class="actions">
      <router-link to="/" class="button primary">Trở về</router-link>
      <router-link to="/customer/booking" class="button secondary"
        >Xem lịch đã đặt</router-link
      >
    </div>
    <p class="redirect-message">Trở về trang chủ sau {{ seconds }} giây...</p>
  </div>
</template>
    
    <script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const seconds = ref(60);
const router = useRouter();

onMounted(() => {
  const interval = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value -= 1;
    } else {
      clearInterval(interval);
      router.push("/");
    }
  }, 1000);
});
</script>
    
<style scoped>
.payment-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  font-family: "Arial", sans-serif;
}

.message {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  width: 80px;
  height: 80px;
  color: #4caf50;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin: 0;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin: 1rem 0 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.primary {
  background-color: #4caf50;
  color: white;
}

.primary:hover {
  background-color: #45a049;
}

.secondary {
  background-color: white;
  color: #4caf50;
  border: 2px solid #4caf50;
}

.secondary:hover {
  background-color: #4caf50;
  color: white;
}

.redirect-message {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #888;
}
</style>