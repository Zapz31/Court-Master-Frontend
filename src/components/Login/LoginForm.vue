<template>
  <div class="logo_container"></div>

  <div class="title_container">
    <h1 class="title">Đăng nhập tài khoản</h1>
    <br />
  </div>
  <!-- <!===============================================================================================================>
   -->

  <div class="input_big_container">
    <div class="input_container">
      <label class="input_label" for="email_field">Email</label>

      <div class="input_wrapper">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
        >
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="#141B34"
            d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
          ></path>
          <path
            stroke-linejoin="round"
            stroke-width="1.5"
            stroke="#141B34"
            d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
          ></path>
        </svg>
        <input
          placeholder="name@mail.com"
          title="Inpit title"
          name="input-name"
          type="text"
          class="input_field"
          id="email_field"
          v-model="emailOrPhone"
        />
      </div>
    </div>
    <div class="loginMess">
      <p v-if="invalidMess === 'Your email is not registered'">
        Tài khoản của bạn chưa được đăng kí
      </p>
    </div>

    <!-- ------------------------------------------------------------------------------------- -->
    <div class="input_container">
      <label class="input_label" for="password_field">Mật khẩu</label>
      <div class="input_wrapper">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
        >
          <path
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="#141B34"
            d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
          ></path>
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="#141B34"
            d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
          ></path>
          <path
            fill="#141B34"
            d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"
          ></path>
        </svg>
        <input
          placeholder="Mật khẩu"
          title="Inpit title"
          name="input-name"
          type="password"
          class="input_field"
          id="password_field"
          v-model="password"
        />
      </div>
    </div>
  </div>
  <div class="loginMess">
    <p v-if="invalidMess === 'Invalid password'">Mật khẩu chưa chính xác</p>
  </div>

  <!-- ------------------------------------------------------------------------------------- -->

  <!-- ======================================================================================================================== -->
  <div class="remeber_forgot">
    <div class="remember_me">
      <div class="rememberMe_checkbox">
        <label class="container_checkbox">
          <div class="straigt_checkbox">
            <div>
              <span>Ghi nhớ</span>
            </div>
            <div>
              <input checked="checked" type="checkbox" class="checkbox" />
            </div>
          </div>

          <div class="checkmark"></div>
        </label>
      </div>
    </div>

    <div class="forgot_password">
      <span>Quên mật khẩu? </span>
      <!-- ><router-link to="/forgot">Click Here</router-link> -->
      <a href="/forgot">Quên mật khẩu</a>
    </div>
  </div>
  <!-- ======================================================================================================================== -->
  <button title="Sign In" @click="signin" type="submit" class="sign-in_btn">
    <span>Đăng nhập</span>
  </button>

  <div class="separator">
    <hr class="line" />
    <span>Or</span>
    <hr class="line" />
  </div>
  <button
    title="Sign In"
    type="submit"
    href="
  "
    class="sign-in_ggl"
  >
    <svg
      height="18"
      width="18"
      viewBox="0 0 32 32"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
          id="A"
        ></path>
      </defs>
      <clipPath id="B"></clipPath>
      <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
        <path fill="#fbbc05" clip-path="url(#B)" d="M0 37V11l17 13z"></path>
        <path
          fill="#ea4335"
          clip-path="url(#B)"
          d="M0 11l17 13 7-6.1L48 14V0H0z"
        ></path>
        <path
          fill="#34a853"
          clip-path="url(#B)"
          d="M0 37l30-23 7.9 1L48 0v48H0z"
        ></path>
        <path
          fill="#4285f4"
          clip-path="url(#B)"
          d="M48 48L17 24l-4-3 35-10z"
        ></path>
      </g>
    </svg>
    <div class="loginGG_line">
      <div class="logoGG_img">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
          alt="google logo"
        />
      </div>
      <div class="loginGG_text">
        <span>Đăng nhập với Google</span>
      </div>
    </div>
  </button>

  <p class="note">Terms of use &amp; Conditions</p>
</template>

<!-- ===============================================================================================================
=============================================================================================================== -->

<script setup>
import axios from "axios";
import { ref } from "vue";
import router from "../../router";
import { useAuthStore } from "../../stores/auth";

const API_END_POINT = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
const authStore = useAuthStore();
const invalidMess = ref("");
const emailOrPhone = ref("");
const password = ref("");
const token = ref("");

const newUser = ref({
  userId: "",
  email: "",
  phoneNumber: "",
  birthDay: "",
  RegisterDate: "",
  role: "",
  imageURL: "",
  fistName: "",
  lastName: "",
});

const signin = async () => {
  try {
    const response = await axios.post(
      `${API_END_POINT}/courtmaster/auth/signin`,
      {
        emailOrPhoneNumber: emailOrPhone.value,
        password: password.value,
      },
      { withCredentials: true }
    );

    console.log(response.data);
    if (
      response.data.massage !== "Invalid password" &&
      response.data.massage !== "Your email is not registered"
    ) {
      authStore.user.userId = response.data.userId;
      authStore.user.email = response.data.email;
      authStore.user.birthDay = response.data.birthDay;
      authStore.user.RegisterDate = response.data.registerDate;
      authStore.user.phoneNumber = response.data.phoneNumber;
      authStore.user.role = response.data.role;
      authStore.user.imageURL = response.data.imageUrlString;
      authStore.user.firstName = response.data.firstName;
      authStore.user.lastName = response.data.lastName;
      token.value = response.data.token;

      // authStore.updateUser(newUser);
      authStore.saveUserToLocalStorage();

      setCookie("uwu", token.value, 10);
      if (authStore.user.role === "USER_COURT_STAFF") {
        router.push("/staff");
      } else if (authStore.user.role === "SYSTEM_ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
    invalidMess.value = response.data.massage; // Invalid password // Your email is not registered
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
  }
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
</script>
<style>
.form_container {
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 50px 40px 20px 40px;
  background-color: #ffffff;
  box-shadow: 0px 106px 42px rgba(0, 0, 0, 0.01),
    0px 59px 36px rgba(0, 0, 0, 0.05), 0px 26px 26px rgba(0, 0, 0, 0.09),
    0px 7px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 11px;
  font-family: "Inter", sans-serif;
}

.loginMess {
  display: flex;
  justify-content: center;
  color: red;
}

.title_container {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #212121;
}

.subtitle {
  font-size: 0.725rem;
  max-width: 80%;
  text-align: center;
  line-height: 1.1rem;
  color: #8b8e98;
}

/* ----------------------------------------------------------------------- */

.icon {
  width: 20px;
  position: absolute;
  z-index: 99;
  left: 24px;
  bottom: 14px;
}

/* ----------------------------------------------------------------------- */

.input_big_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input_container {
  padding: 5px;
  width: 95%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input_label {
  text-align: left;
  font-size: 0.75rem;
  color: #8b8e98;
  font-weight: 600;
}

.input_field {
  width: auto;
  height: 40px;
  padding: 0 0 0 40px;
  border-radius: 7px;
  outline: none;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field {
  width: 91%;
  padding: -6px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.input_field:focus {
  background-color: white;
  color: black;
  outline: none;
  border-color: #141b34;
}

.input_field::placeholder {
  color: #999;
  /* Customize placeholder color */
  opacity: 1;
  /* Make sure the placeholder is fully opaque */
}

.input_field:focus {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}

/* ----------------------------------------------------------------------- */
.remeber_forgot {
  padding-top: 18px;
  color: black;
  display: flex;
  justify-content: space-around;
}

/* ----------------------------------------------------------------------- */

.sign-in_btn {
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  width: 90%;
  height: 40px;
  border: 2px;
  background: rgba(105, 171, 245, 255);
  border-radius: 7px;
  outline: none;
  color: #ffffff;
  font-style: bold;
  cursor: pointer;
  margin-left: 28px;
  transition: background-color 0.3s, transform 0.3s;
}

.sign-in_btn:hover {
  background-color: #6babf4;
  transform: scale(1.05);
}

.sign-in_btn:active {
  transform: scale(1);
}

.sign-in_ggl {
  margin-top: 10px;
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #ffffff;
  border-radius: 7px;
  outline: none;
  color: #242424;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  cursor: pointer;
  margin-left: 28px;
  transition: background-color 0.3s, transform 0.3s;
}

.sign-in_ggl:hover {
  background-color: white;
  transform: scale(1.05);
}

.sign-in_ggl:active {
  transform: scale(1);
}

.loginGG_line {
  margin-bottom: -3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Center-aligns items vertically */
  height: 60px;
  /* Set a fixed height for alignment */
}

.logoGG_img {
  width: 30px;
  /* Set a consistent width */
  height: 30px;
  /* Set a consistent height */
  display: flex;
  align-items: center;
  /* Center-aligns the image within the div */
}

.logoGG_img img {
  width: 80%;
  /* Ensure the image fills the parent div */
  height: auto;
}

.logoGG_text {
  display: flex;
  align-items: center;
  /* Center-aligns the text within the div */
  font-size: 16px;
  /* Adjust font size as needed */
  margin-left: 10px;
  /* Add margin to space out from the image */
}

/* =========================================================================================================== */

.separator {
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  color: #8b8e98;
}

.separator .line {
  display: block;
  width: 100%;
  height: 1px;
  border: 0;
  background-color: #e8e8e8;
}

.container_checkbbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.straigt_checkbox {
  display: flex;
}

.note {
  text-align: center;
  font-size: 0.75rem;
  color: #8b8e98;
  text-decoration: underline;
}
</style>