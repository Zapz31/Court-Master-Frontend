<template>
  <div class="unable-access">
    <div class="message">
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
          <path
            fill="#DD2E44"
            d="M18 0C8.059 0 0 8.059 0 18s8.059 18 18 18 18-8.059 18-18S27.941 0 18 0zm13 18c0 2.565-.753 4.95-2.035 6.965L11.036 7.036C13.05 5.753 15.435 5 18 5c7.18 0 13 5.821 13 13zM5 18c0-2.565.753-4.95 2.036-6.964l17.929 17.929C22.95 30.247 20.565 31 18 31c-7.179 0-13-5.82-13-13z"
          />
        </svg>
      </span>
      <h1>Truy cập bị từ chối</h1>
    </div>
    <p class="description">Bạn không có quyền truy cập vào dịch vụ này.</p>
    <div class="actions">
      <button @click="goBack" class="button">Quay lại</button>
      <button @click="goHome" class="button">Về trang chủ</button>
    </div>
    <p class="redirect-message">Sẽ quay lại sau {{ seconds }} giây...</p>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const seconds = ref(60);

const goBack = () => {
  if (document.referrer) {
    window.history.go(-1);
  } else {
    goHome();
  }
};

const goHome = () => {
  window.location.replace("/");
};

let interval;

onMounted(() => {
  interval = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value -= 1;
    } else {
      clearInterval(interval);
      goBack();
    }
  }, 1000);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<style scoped>
.unable-access {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: white;
  color: black;
}

.message {
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: #dd2e44;
  margin-bottom: 1rem;
}

.icon {
  font-size: 3rem;
  margin-right: 1rem;
}

.description {
  font-size: 1.25rem;
  color: black;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.button {
  padding: 0.75rem 1.5rem;
  color: white;
  background-color: #6babf4;
  border: none;
  border-radius: 0.25rem;
  text-decoration: none;
  cursor: pointer;
}

.button:hover {
  background-color: #5aa2e1;
}

.redirect-message {
  font-size: 1rem;
  color: gray;
}
</style>
