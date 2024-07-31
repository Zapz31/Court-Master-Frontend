<template>
  <div class="container">
    <img src="../../public/img/mono_blue_crop.png" alt="" />
    <h1 class="message">
      Bạn chưa đăng ký câu lạc bộ để thực hiện chức năng này, vui lòng đăng ký
      tại đây
    </h1>
    <div class="button-group">
      <button @click="goBack" class="back-button">TRỞ VỀ</button>
      <router-link to="/clubregister" class="register-button"
        >ĐĂNG KÝ THÔNG TIN CÂU LẠC BỘ</router-link
      >
    </div>
  </div>
</template>
  
  <script setup>
const goBack = () => {
  // Set a flag in local storage to indicate that a reload is needed
  localStorage.setItem("shouldReload", "true");
  // Navigate back
  window.history.back();
};
</script>
  
  <style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
}

.message {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  max-width: 600px;
}

.button-group {
  display: flex;
  gap: 20px;
}

.register-button,
.back-button {
  display: inline-block;
  padding: 15px 30px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}

.register-button {
  background-color: #6babf4;
}

.register-button:hover {
  background-color: #4a90e2;
}

.back-button {
  background-color: #808080;
}

.back-button:hover {
  background-color: #666666;
}

@media (max-width: 768px) {
  .message {
    font-size: 20px;
  }

  .register-button,
  .back-button {
    padding: 12px 24px;
    font-size: 14px;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>