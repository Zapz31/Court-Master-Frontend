<template>
  <div class="parent_container">
    <div class="Register_title">
      <p class="title">Đăng kí tài khoản</p>
    </div>

    <div class="form_container">
      <form class="form" @submit.prevent="registerUser">
        <br />

        <!-- User Role Dropdown -->
        <label class="dropdown-role">
          <select class="input" v-model="roleId">
            <option :value="1">Customer</option>
            <option :value="2">Manager</option>
          </select>
          <span>Bạn là:</span>
        </label>

        <div class="flex">
          <label>
            <input
              class="input"
              type="text"
              v-model="firstName"
              placeholder=""
              required
              @input="validateInput('firstName')"
              @blur="validateInput('firstName')"
              @invalid="handleInvalid($event, 'firstName')"
            />
            <span>Họ</span>
            <p v-if="firstNameError" class="error">{{ firstNameError }}</p>
          </label>

          <label>
            <input
              class="input"
              type="text"
              v-model="lastName"
              placeholder=""
              required
              @input="validateInput('lastName')"
              @blur="validateInput('lastName')"
              @invalid="handleInvalid($event, 'lastName')"
            />
            <span>Tên</span>
            <p v-if="lastNameError" class="error">{{ lastNameError }}</p>
          </label>
        </div>

        <label>
          <input
            class="input"
            type="text"
            v-model="phoneNumber"
            placeholder=""
            required
            pattern="^\d{10}$"
            @input="validatePhoneNumber"
            @blur="validatePhoneNumber"
            @invalid="handleInvalid($event, 'phoneNumber')"
          />
          <span>Số điện thoại (10 số)</span>
          <p v-if="phoneNumberError" class="error">{{ phoneNumberError }}</p>
        </label>

        <label>
          <input
            class="input"
            type="email"
            v-model="email"
            placeholder=""
            required
            @input="validateInput('email')"
            @blur="validateInput('email')"
            @invalid="handleInvalid($event, 'email')"
          />
          <span>Email (example@gmail.com)</span>
          <p v-if="emailError" class="error">{{ emailError }}</p>
        </label>

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
          <span>Mật khẩu</span>
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
          <span>Nhập lại mật khẩu</span>
          <p v-if="confirmPasswordError" class="error">
            {{ confirmPasswordError }}
          </p>
        </label>
        <p
          v-if="duplicateError === 'Email or phone number has already exsit'"
          class="error"
        >
          {{ duplicateErrorVietnamese }}
        </p>
        <h3 v-if="formError" class="error">{{ formErrorMessage }}</h3>

        <button class="submit">Đăng kí</button>
        <!-- <p class="signin">Already have an acount ? <a href="#">Signin</a></p> -->
        <div>
          <p
            class="signin"
            v-if="
              duplicateError === 'Email or phone number has already exsit' ||
              duplicateError === ''
            "
          >
            Bạn đã có tài khoản ?
            <router-link to="/login">Đăng nhập</router-link>
          </p>
          <p class="signin" v-else>
            Đăng kí thành công, vui lòng đăng nhập tại đây:
            <router-link to="/login">Đăng nhập</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
const API_END_POINT = import.meta.env.VITE_API_URL;

const roleId = ref(1); // Mặc định là Customer
const duplicateError = ref("");
const firstNameError = ref("");
const lastNameError = ref("");
const phoneNumberError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const formError = ref(false);
const formErrorMessage = ref();

const firstName = ref("");
const lastName = ref("");
const phoneNumber = ref("");
const isValidPhoneNumber = computed(() => /^\d{10}$/.test(phoneNumber.value));
const email = ref("");
const isValidEmail = computed(() => {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailPattern.test(email.value);
});
const password = ref("");
const confirmPassword = ref("");
const role = ref("customer"); // Add the role ref

const handleInvalid = (event, field) => {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
};

const roleName = computed(() => {
  return roleId.value === 1 ? "customer" : "manager";
});

const duplicateErrorVietnamese = computed(() => {
  if (duplicateError.value === "Email or phone number has already exsit") {
    return "Email hoặc số điện thoại đã tồn tại";
  }
  return duplicateError.value;
});

const validateInput = (field) => {
  if (field === "firstName") {
    firstNameError.value = firstName.value ? "" : "Vui lòng điền họ !";
  } else if (field === "lastName") {
    lastNameError.value = lastName.value ? "" : "Vui lòng điền tên";
  } else if (field === "email") {
    emailError.value =
      email.value && isValidEmail.value ? "" : "Vui lòng điền email";
  }
};

const validatePhoneNumber = () => {
  if (phoneNumber.value.length > 10) {
    phoneNumber.value = phoneNumber.value.slice(0, 10);
  }
  phoneNumberError.value = isValidPhoneNumber.value
    ? ""
    : "Vui lòng điền số điện thoại đúng theo hướng dẫn !";
};

const validatePassword = () => {
  passwordError.value = password.value ? "" : "Vui lòng điền mật khẩu";
};

const validateConfirmPassword = () => {
  confirmPasswordError.value =
    confirmPassword.value === password.value
      ? ""
      : "Vui lòng điền mật khẩu nhắc lại giống với mật khẩu đã nhập!";
};

const validateForm = () => {
  const isFirstNameValid = !!firstName.value;
  const isLastNameValid = !!lastName.value;
  const isPhoneNumberValid = isValidPhoneNumber.value;
  const isEmailValid = isValidEmail.value;
  const isPasswordValid = !!password.value;
  const isConfirmPasswordValid = confirmPassword.value === password.value;

  return (
    isFirstNameValid &&
    isLastNameValid &&
    isPhoneNumberValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  );
};

const registerUser = async () => {
  formError.value = false;
  const currentDate = new Date().toISOString().split("T")[0];
  const isFormValid = validateForm();

  if (!isFormValid) {
    formError.value = true;
    formErrorMessage.value = "Vui lòng điền đầy đủ thông tin trong form!";
    return;
  }

  try {
    const response = await axios.post(
      `${API_END_POINT}/courtmaster/auth/register`,
      {
        userId: 3,
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        password: password.value,
        role: roleId.value, // Sử dụng roleId thay vì role
        registerDate: currentDate,
      }
    );
    console.log(response.data);

    if (
      response.data.duplicateError === "Email or phone number has already exsit"
    ) {
      duplicateError.value = "Email or phone number has already exsit";
    } else {
      duplicateError.value = "Đăng kí thành công";
    }
  } catch (error) {
    console.error(error);
  }
};
</script>


<style scoped>
.form_container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.dropdown-role {
  width: 106%;
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

.signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: royalblue;
}

.signin a:hover {
  text-decoration: underline royalblue;
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

.submit {
  border: none;
  outline: none;
  background-color: royalblue;
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
