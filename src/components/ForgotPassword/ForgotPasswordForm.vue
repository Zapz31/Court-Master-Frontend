<!-- LOI CON TON TAI: KHI BO QUA FIRST NAME VA NHAP CAC O KHAC, LOI KO HIEN LEN 
  + Chưa check dc password va confirm
-->

<template>
  <div class="parent_container">
    <div class="Register_title">
      <p class="title">Forgot Password</p>
    </div>
    <div class="form_container">
      <form class="form" @submit.prevent="submitForm">
        <div class="instruction">
          <p class="message">Please enter your email.</p>
        </div>

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
        <h3 v-if="formError" class="error">{{ formErrorMessage }}</h3>
        <button class="submit" type="submit">Submit</button>
      </form>
      <p v-if="invalidMess === 'Your email is not registered'">Email của bạn chưa được đăng ký</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../../router";
const email = ref("");
const emailError = ref("");
const formError = ref(false);
const formErrorMessage = ref("");
const invalidMess = ref("");

const validateInput = (field) => {
  // Validate email input
  if (field === "email") {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.value)) {
      emailError.value = "Please enter a valid email address";
    } else {
      emailError.value = "";
    }
  }
};

const handleInvalid = (event, field) => {
  event.preventDefault();
  validateInput(field);
};

const submitForm = async() => {
  if (emailError.value === "") {
    formError.value = false;
    // $emit('submit', email.value);
    try {
        const response = await axios.post('http://localhost:8080/courtmaster/auth/forgotpassword/aaaa', {
        } 
      );
        
        console.log(response.data);
        if(response.data.massage !== "Your email is not registered"){
            router.push("");
        } else {
            invalidMess.value = response.data.massage;  
        } 
        
        
      } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
        
      }
  } else {
    formError.value = true;
    formErrorMessage.value = "Please fix the errors before submitting.";
  }
};
</script>


<style scoped>
.parent_container {
  margin-top: 150px;
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

.message {
  text-align: left;
}

.title {
  margin-bottom: 20px;
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
  margin-left: -168px;
  position: relative;
  display: block;
  /* Ensure label takes full width */
  margin-bottom: 20px;
  /* Add some space between labels */
}

.form label .input {
  width: 150%;
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




