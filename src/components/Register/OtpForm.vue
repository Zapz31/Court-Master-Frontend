<template>
  <div class="parent_div">
    <form class="form">
      <div class="title">OTP</div>
      <div class="title">Verification Code</div>
      <p class="message">
        We have sent a verification code to your mobile number
      </p>
      <div class="inputs">
        <input id="input1" type="text" maxlength="1" />
        <input id="input2" type="text" maxlength="1" />
        <input id="input3" type="text" maxlength="1" />
        <input id="input4" type="text" maxlength="1" />
      </div>
      <div class="btn_verify">
        <button class="action">verify me</button>
      </div>
    </form>
  </div>
</template>

<script setup>
</script>

<style scoped>
.parent_div {
  display: flex;
  justify-content: center;
}

.form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  /* background-color: white; */
  border-radius: 12px;
  padding: 20px;
  margin-top: -168px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: aliceblue;
}

.message {
  color: white;
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
  border-bottom: 1.5px solid #d2d2d2;
  margin: 0 10px;
}

.inputs input:focus {
  border-bottom: 1.5px solid royalblue;
  outline: none;
}

.action {
  font-style: bold;
  margin-top: 24px;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background-color: white;
  color: #6babf4;
  cursor: pointer;
  align-self: end;
}
</style>