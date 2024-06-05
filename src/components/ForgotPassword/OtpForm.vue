<template>
  <div class="parent_div">
    <form class="form" @submit.prevent="submitForm">
      <div class="title"><h2>OTP</h2></div>
      <div class="title"><h2>Verification Code</h2></div>

      <p class="message">
        We have sent a verification code to your {{ email }}
      </p>
      <div class="inputs">
        <input
          id="input1"
          type="text"
          maxlength="1"
          v-model="otp[0]"
          @input="handleOtpInput"
        />
        <input
          id="input2"
          type="text"
          maxlength="1"
          v-model="otp[1]"
          @input="handleOtpInput"
        />
        <input
          id="input3"
          type="text"
          maxlength="1"
          v-model="otp[2]"
          @input="handleOtpInput"
        />
        <input
          id="input4"
          type="text"
          maxlength="1"
          v-model="otp[3]"
          @input="handleOtpInput"
        />
      </div>
      <div class="btn_verify">
        <button class="action" type="submit">Verify</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});

const otp = ref(["", "", "", ""]);
const currentIndex = ref(0);

const handleOtpInput = (event) => {
  const value = event.target.value;
  otp.value[currentIndex.value] = value;

  if (value.length === 1 && currentIndex.value < 3) {
    currentIndex.value++;
  } else if (value.length === 0 && currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const submitForm = () => {
  const otpValue = otp.value.join("");
  if (otpValue.length === 4) {
    $emit("submit", otpValue);
  }
};

let inputs;

onMounted(() => {
  inputs = document.querySelectorAll("input");
});

watch(currentIndex, (newIndex) => {
  inputs[newIndex]?.focus();
});
</script>





<style scoped>
.parent_div {
  margin-top: 120px;
  display: flex;
  justify-content: center;
}

.form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 500px;
  /* background-color: white; */
  border-radius: 12px;
  padding: 12px;
  margin-top: 0px;
}

.title {
  padding-top: 0;
  /* font-size: 20px; */
  font-weight: bold;
  color: black;
}

.message {
  color: black;
  font-size: 14px;
  margin-top: 4px;
  text-align: center;
}

.inputs {
  margin-top: 10px;
}

.inputs input {
  width: 32px;
  height: 32px;
  text-align: center;
  border: none;
  border-bottom: 1.5px solid black;
  margin: 0 10px;
}

.inputs input:focus {
  border-bottom: 1.5px solid #6babf4;
  font-style: bold;
  outline: none;
}

.action {
  width: 180px;
  font-size: 16px;
  font-style: bold;
  margin-top: 36px;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background-color: #6babf4;
  color: white;
  cursor: pointer;
  align-self: end;
}
.action:hover {
  background-color: rgb(56, 90, 194);
  cursor: pointer;
}
</style>