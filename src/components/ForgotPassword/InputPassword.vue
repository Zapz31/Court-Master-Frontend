<!-- LOI CON TON TAI: KHI BO QUA FIRST NAME VA NHAP CAC O KHAC, LOI KO HIEN LEN 
  + Chưa check dc password va confirm
-->

<template>
  <div class="parent_container">
    <div class="title">
      <p class="message">Please set up your new password.</p>
    </div>

    <div class="form_container">
      <form class="form" @submit.prevent="submitForm">
        <label>
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder=""
            required
            @input="validatePassword"
            @blur="validatePassword"
            @invalid="handleInvalid($event, 'password')"
          />
          <span>Password</span>
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </label>
        <label>
          <input
            class="input"
            type="password"
            v-model="confirmPassword"
            placeholder=""
            required
            @input="validateConfirmPassword"
            @blur="validateConfirmPassword"
            @invalid="handleInvalid($event, 'confirmPassword')"
          />
          <span>Confirm password</span>
          <p v-if="confirmPasswordError" class="error">
            {{ confirmPasswordError }}
          </p>
        </label>
        <h3 v-if="formError" class="error">{{ formErrorMessage }}</h3>
        <button class="submit" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

const password = ref("");
const confirmPassword = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const formError = ref(false);
const formErrorMessage = ref("");

const validatePassword = () => {
  // Validate password
  if (password.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters long";
  } else {
    passwordError.value = "";
  }
};

const validateConfirmPassword = () => {
  // Validate confirm password
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.value = "Passwords do not match";
  } else {
    confirmPasswordError.value = "";
  }
};

const handleInvalid = (event, field) => {
  event.preventDefault();
  if (field === "password") {
    validatePassword();
  } else if (field === "confirmPassword") {
    validateConfirmPassword();
  }
};

const submitForm = () => {
  if (passwordError.value === "" && confirmPasswordError.value === "") {
    formError.value = false;
    $emit("submit", password.value, confirmPassword.value);
  } else {
    formError.value = true;
    formErrorMessage.value = "Please fix the errors before submitting.";
  }
};
</script>
  
  
  
  <style scoped>
.parent_container {
  margin-top: 86px;
}

.password .title {
  display: flex;
  text-align: center;
}
.form_container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
}

.title {
  margin-bottom: 5px;
  font-size: 28px;
  color: black;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
  display: block;
  /* Ensure label takes full width */
  margin-bottom: 20px;
  /* Add some space between labels */
}

.form label .input {
  width: 100%;
  padding: 10px;
  padding-top: 10px;
  /* Add extra padding on top to make space for the label */
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  font-size: 1em;
  /* Ensure consistent font size */
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 10px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
  pointer-events: none;
  /* Prevent the span from interfering with input focus */
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,
.form label .input:not(:placeholder-shown) + span {
  top: -10px;
  font-size: 0.7em;
  font-weight: 600;
  background-color: white;
  /* Add background color to prevent text overlap */
  padding: 0 5px;
  /* Add padding to create space around the text */
}

.form label .input:valid + span {
  color: green;
}

.form,
.submit {
  margin-left: 20px;
}
.submit {
  border: none;
  outline: none;
  background-color: #6babf4;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: 0.3s ease;
}

.submit:hover {
  background-color: rgb(56, 90, 194);
  cursor: pointer;
}

.error {
  color: red;
  font-size: 0.8em;
  margin-top: 0;
  padding: 0;
}

/* ----------------------------------------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------------------------------------- */

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>
  
  
  
  
  