<!-- LOI CON TON TAI: KHI BO QUA FIRST NAME VA NHAP CAC O KHAC, LOI KO HIEN LEN 
  + Chưa check dc password va confirm
-->

<template>
  <div class="parent_container">
    <div class="Register_title">
      <p class="title">Register</p>
    </div>

    <div class="form_container">
      <form class="form" @submit.prevent="registerUser">
        <p class="message">Signup now and get full access to our app.</p>

        <div class="flex">
          <label>
            <input
              class="input"
              type="text"
              v-model="firstName"
              placeholder=""
              required
              @blur="showFirstNameError = true"
              @invalid="handleInvalid($event, 'firstName')"
            />
            <span>Firstname</span>
            <p v-if="showFirstNameError && !firstName" class="error">
              {{ firstNameErrorMessage }}
            </p>
          </label>

          <label>
            <input
              class="input"
              type="text"
              v-model="lastName"
              placeholder=""
              required
              @blur="showLastNameError = true"
              @invalid="handleInvalid($event, 'lastName')"
            />
            <span>Lastname</span>
            <p v-if="showLastNameError && !lastName" class="error">
              {{ lastNameErrorMessage }}
            </p>
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
            @blur="showPhoneNumberError = true"
            @invalid="handleInvalid($event, 'phoneNumber')"
          />
          <span>Phone Number (10 digits)</span>
          <p v-if="showPhoneNumberError && !isValidPhoneNumber" class="error">
            {{ phoneNumberErrorMessage }}
          </p>
        </label>

        <label>
          <input
            class="input"
            type="email"
            v-model="email"
            placeholder=""
            required
            @blur="showEmailError = true"
            @invalid="handleInvalid($event, 'email')"
          />
          <span>Email (example@gmail.com)</span>
          <p v-if="showEmailError && (!email || !isValidEmail)" class="error">
            {{ emailErrorMessage }}
          </p>
        </label>

        <label>
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder=""
            required
            @blur="showPasswordError = true"
            @invalid="handleInvalid($event, 'password')"
          />
          <span>Password</span>
          <p v-if="showPasswordError && !password" class="error">
            {{ passwordErrorMessage }}
          </p>
        </label>
        <label>
          <input
            class="input"
            type="password"
            v-model="confirmPassword"
            placeholder=""
            required
            @blur="showConfirmPasswordError = true"
            @invalid="handleInvalid($event, 'confirmPassword')"
          />
          <span>Confirm password</span>
          <p
            v-if="showConfirmPasswordError && password !== confirmPassword"
            class="error"
          >
            {{ confirmPasswordErrorMessage }}
          </p>
        </label>

        <button class="submit">Submit</button>
        <p class="signin">Already have an acount ? <a href="#">Signin</a></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, ref } from "vue";

const firstNameErrorMessage = ref("");
const lastNameErrorMessage = ref("");
const phoneNumberErrorMessage = ref("");
const emailErrorMessage = ref("");
const passwordErrorMessage = ref("");
const confirmPasswordErrorMessage = ref("");

const handleInvalid = (event, field) => {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt

  if (field === "firstName") {
    firstNameErrorMessage.value = "Please enter first name";
  } else if (field === "lastName") {
    lastNameErrorMessage.value = "Please enter last name";
  } else if (field === "phoneNumber") {
    phoneNumberErrorMessage.value =
      "Please enter phone number into correct format";
  } else if (field === "email") {
    emailErrorMessage.value = "Please enter email into correct format";
  } else if (field === "password") {
    passwordErrorMessage.value = "Please enter password";
  } else if (field === "confirmPassword") {
    confirmPasswordErrorMessage.value =
      "Please enter confirm password similarly with password";
  }
};

const firstName = ref("");
const showFirstNameError = ref(false);

const lastName = ref("");
const showLastNameError = ref(false);

const phoneNumber = ref("");
const isValidPhoneNumber = computed(() => /^\d{10}$/.test(phoneNumber.value));
const showPhoneNumberError = ref(false);

const validatePhoneNumber = () => {
  if (phoneNumber.value.length > 10) {
    phoneNumber.value = phoneNumber.value.slice(0, 10);
  } else {
    showPhoneNumberError.value = !isValidPhoneNumber.value;
  }
};

const email = ref("");
const showEmailError = ref(false);
const isValidEmail = computed(() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.value);
});

const password = ref("");
const showPasswordError = ref(false);

const confirmPassword = ref("");
const showConfirmPasswordError = ref(false);

const showFormError = ref(false);
const formErrorMessage = ref("");

const isFormValid = computed(() => {
  return (
    firstName.value &&
    lastName.value &&
    isValidPhoneNumber.value &&
    email.value &&
    password.value &&
    confirmPassword.value === password.value
  );
});

const registerUser = async () => {
  showFormError.value = false;
  formErrorMessage.value = "";

  if (!isFormValid.value) {
    showFormError.value = true;
    formErrorMessage.value =
      "Please complete the form correctly base on instruction";
    return;
  }

  try {
    const respone = await axios.post(
      "http://localhost:8080/courtmaster/users/register",
      {
        userId: 3,
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        password: password.value,
        role: 3,
      }
    );
    console.log(respone.data);
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

/* .title::before,
.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
} */

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




<!-- ========================================BACK-UP============================================================= -->
<!-- <template>
  <div class="parent_container">
    <div class="Register_title">
      <p class="title">Register</p>
    </div>

    <div class="form_container">
      <form class="form" @submit.prevent="registerUser">
        <p class="message">Signup now and get full access to our app.</p>

        <div class="flex">
          <label>
            <input
              class="input"
              type="text"
              v-model="firstName"
              placeholder=""
              required
              @blur="showFirstNameError = true"
            />
            <span>Firstname</span>
            <p v-if="showFirstNameError && !firstName" class="error">
              Please enter your first name
            </p>
          </label>

          <label>
            <input
              class="input"
              type="text"
              v-model="lastName"
              placeholder=""
              required
              @blur="showLastNameError = true"
            />
            <span>Lastname</span>
            <p v-if="showLastNameError && !lastName" class="error">
              Please enter your last name
            </p>
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
            @blur="showPhoneNumberError = true"
          />
          <span>Phone Number (10 digits)</span>
          <span
            v-if="showPhoneNumberError && !isValidPhoneNumber"
            class="error"
          >
            Please enter your phone number validatedly
          </span>
        </label>

        <label>
          <input
            class="input"
            type="email"
            v-model="email"
            placeholder=""
            required
            @blur="showEmailError = true"
            @invalid="handlePhoneNumberInvalid"
          />
          <span>Email (example@gmail.com)</span>
          <p v-if="showEmailError && (!email || !isValidEmail)" class="error">
            Please enter your email validatedly
          </p>
        </label>

        <label>
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder=""
            required
            @blur="showPasswordError = true"
          />
          <span>Password</span>
          <p v-if="showPasswordError && !password" class="error">
            Please enter password
          </p>
        </label>
        <label>
          <input
            class="input"
            type="password"
            v-model="confirmPassword"
            placeholder=""
            required
            @blur="showConfirmPasswordError = true"
          />
          <span>Confirm password</span>
          <p
            v-if="showConfirmPasswordError && password !== confirmPassword"
            class="error"
          >
            Please enter confirm password similarly with password
          </p>
        </label>

        <h3 v-if="showFormError" class="error">{{ formErrorMessage }}</h3>

        <button class="submit">Submit</button>
        <p class="signin">Already have an acount ? <a href="#">Signin</a></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, ref } from "vue";

const handleInvalidMessage = (event) => {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
  firstNameErrorMessage.value = "Please enter first name";
  lastNameErrorMessage.value = "Please enter last name";

  phoneNumberErrorMessage.value =
    "Please enter phone number into correct format";
  emailErrorMessage.value = "Please enter email into correct format";
  passwordErrorMessage.value = "Please enter password";
  confirmPasswordErrorMessage.value =
    "Please enter confirm password similarly with password";
};

const firstName = ref("");
const showFirstNameError = ref(false);

const lastName = ref("");

const phoneNumber = ref("");
const isValidPhoneNumber = computed(() => /^\d{10}$/.test(phoneNumber.value));
const showPhoneNumberError = ref(false);

const validatePhoneNumber = () => {
  if (phoneNumber.value.length > 10) {
    phoneNumber.value = phoneNumber.value.slice(0, 10);
  } else {
    showPhoneNumberError.value = !isValidPhoneNumber.value;
  }
};

// -------------------------------------------------------------------------------------
const email = ref("");
const showEmailError = ref(false);
const isValidEmail = computed(() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.value);
});
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
const password = ref("");
const showPasswordError = ref(false);
// -------------------------------------------------------------------------------------

const confirmPassword = ref("");
const showConfirmPasswordError = ref(false);
// -------------------------------------------------------------------------------------

const showFormError = ref(false);
const formErrorMessage = ref("");
// -------------------------------------------------------------------------------------
const isFormValid = computed(() => {
  return (
    firstName.value &&
    lastName.value &&
    isValidPhoneNumber.value &&
    email.value &&
    password.value &&
    confirmPassword.value === password.value
  );
});

const registerUser = async () => {
  showFormError.value = false;
  formErrorMessage.value = "";

  if (!isFormValid.value) {
    showFormError.value = true;
    formErrorMessage.value =
      "Please complete the form correctly base on instruction";
    return;
  }

  try {
    const respone = await axios.post(
      "http://localhost:8080/courtmaster/users/register",
      {
        userId: 3,
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        password: password.value,
        role: 3,
      }
    );
    console.log(respone.data);
  } catch (error) {
    console.error(error);
  }
};
</script> -->