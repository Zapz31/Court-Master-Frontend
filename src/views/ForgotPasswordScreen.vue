<template>
  <div class="container">
    <div class="left-side">
      <forgot-password-form
        v-if="state.step === 1"
        @submit="handleForgotPasswordSubmit"
      />
      <otp-form v-if="state.step === 2" />
      <input-password v-if="state.step === 3" @submit="handlePasswordSubmit" />
    </div>
    <div class="right-side">
      <logo />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import ForgotPasswordForm from "../components/ForgotPassword/ForgotPasswordForm.vue";
import InputPassword from "../components/ForgotPassword/InputPassword.vue";
import Logo from "../components/ForgotPassword/Logo.vue";
import OtpForm from "../components/ForgotPassword/OtpForm.vue";
import router from "../router";
import { useForgotPass } from "../stores/forgotpasswordStore";
const API_END_POINT = import.meta.env.VITE_API_URL;

const useForgotPss = useForgotPass();
const state = reactive({
  step: 1, // 1: ForgotPasswordForm, 2: OtpForm, 3: InputPassword

  otp: "",
  password: "",
  confirmPassword: "",
});

const handleForgotPasswordSubmit = async () => {
  try {
    const response = await axios.post(
      `${API_END_POINT}/courtmaster/auth/forgotpassword/${useForgotPss.email}`,
      {},
      { withCredentials: true }
    );

    console.log(response.data);
    if (response.data.massage !== "Your email is not registered") {
      state.step = 2;
    } else {
      useForgotPss.invalidMess = response.data.massage; // Invalid password // Your email is not registered
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
  }
};

watch(
  () => useForgotPss.otp,
  async (newOtp) => {
    if (newOtp.length === 6) {
      await handleOtpSubmit(newOtp);
    }
  }
);

const handleOtpSubmit = async (otp) => {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  var formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  var formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  var currentDateTime = `${formattedDate}T${formattedTime}`;
  console.log(currentDateTime);
  try {
    const response = await axios.post(
      `${API_END_POINT}/courtmaster/auth/forgotpassword/checktoken/${useForgotPss.email}`,
      {
        token: otp,
        expirationTime: currentDateTime,
      },
      { withCredentials: true }
    );

    console.log(response.data);
    if (response.data.massage === "Valid") {
      state.step = 3;
      useForgotPss.otp = "";
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Lấy giá trị của thuộc tính massage và gán vào biến khác
      const errorMessage = error.response.data.massage;
      console.error("Unauthorized error:", errorMessage);
      useForgotPss.invalidMess = errorMessage;
    } else {
      console.error("An error occurred:", error);
    }
  }
};

watch(
  () => useForgotPss.password,
  async (newPassword) => {
    if (newPassword.length === 1 && newPassword !== "") {
      await handlePasswordSubmit(newPassword, "aaa");
    }
  }
);

const handlePasswordSubmit = async (passwordd, confirmPassword) => {
  state.password = passwordd;
  state.confirmPassword = confirmPassword;
  // Gửi yêu cầu reset password tới server
  try {
    const response = await axios.put(
      `${API_END_POINT}/courtmaster/auth/updatepassword`,
      {
        email: useForgotPss.email,
        password: useForgotPss.password,
      },
      { withCredentials: true }
    );

    console.log(response.data);
    useForgotPss.clear();
    router.push("/login");
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
  }
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