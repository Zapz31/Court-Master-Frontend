<template>
  <div class="container">
    <div class="logo"><logo /><user-avatar /></div>

    <div class="content">
      <!-- Nội dung của trang ở đây -->
      <confirm-payment />
      <!-- <club-detail :clubId="clubId" /> -->
    </div>

    <div class="footer">
      <h2>Developed by Court Master team</h2>
    </div>
  </div>
</template>

<script setup>
import ConfirmPayment from "../components/Payment/ConfirmPayment.vue";
import Logo from "../components/Payment/Logo.vue";
import UserAvatar from "../components/Payment/UserAvatar.vue";
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.logo {
  display: flex;
  justify-content: space-between;
  margin-bottom: auto;
}

.content {
  flex-grow: 1;
  padding: 1rem;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: -100px;
}

.footer {
  margin: -6px;
  background-color: lightgray;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
  /* Đẩy footer xuống cuối trang */
}
</style>