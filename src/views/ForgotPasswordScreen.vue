<template>
  <div class="container">
    <div class="left-side">
      <forgot-password-form
        v-if="state.step === 1"
        @submit="handleForgotPasswordSubmit"
      />
      <otp-form
        v-if="state.step === 2"
        @submit="handleOtpSubmit"
        :email="state.email"
      />
      <input-password v-if="state.step === 3" @submit="handlePasswordSubmit" />
    </div>
    <div class="right-side">
      <logo />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import ForgotPasswordForm from "../components/ForgotPassword/ForgotPasswordForm.vue";
import InputPassword from "../components/ForgotPassword/InputPassword.vue";
import Logo from "../components/ForgotPassword/Logo.vue";
import OtpForm from "../components/ForgotPassword/OtpForm.vue";

const state = reactive({
  step: 1, // 1: ForgotPasswordForm, 2: OtpForm, 3: InputPassword
  email: "",
  otp: "",
  password: "",
  confirmPassword: "",
});

const handleForgotPasswordSubmit = (email) => {
  state.email = email;
  state.step = 2; // Hiển thị OtpForm
};

const handleOtpSubmit = (otp) => {
  state.otp = otp;
  state.step = 3; // Hiển thị InputPassword
};

const handlePasswordSubmit = (password, confirmPassword) => {
  state.password = password;
  state.confirmPassword = confirmPassword;
  // Gửi yêu cầu reset password tới server
};
</script>

<style scoped>
/* Styles ... */
</style>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  margin: -4.5px;
}

.left-side {
  margin-top: 0px;
  margin-left: -80px;
  display: block;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  background-color: white;
}
.right-side {
  margin: -80px;
  width: 100%;
  flex: 1;
  background-color: #6babf4;
}
</style>