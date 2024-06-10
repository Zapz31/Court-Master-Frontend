import router from "../router";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useForgotPass = defineStore("forgotPass", ()=> {
    const state = ref("");
    const invalidMess = ref("");
    const email = ref("");
    const password = ref("");
    const otp = ref("");

    function clear(){
      invalidMess.value = "";
      email.value = "";
      password.value = "";
      otp .value = "";
    }

  return {
    state,
    invalidMess,
    email,
    password,
    otp,
    clear
  };
});