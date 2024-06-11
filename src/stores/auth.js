import router from "../router";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useAuthStore = defineStore("auth", ()=> {
    const user = ref({
        userId: "",
        email: "",
        phoneNumber: "",
        birthDay: "",
        RegisterDate: "",
        role:"",
        imageURL:""
    });

   // Get user information after login
    function updateUser(userData) {
        user.value = { ...user.value, ...userData };
        saveUserToLocalStorage();
      }

    // Save user data to localStorage
  function saveUserToLocalStorage() {
    localStorage.setItem("user", JSON.stringify(user.value));
  }

  // Load user data from localStorage
  function loadUserFromLocalStorage() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  }

  // Logout function to remove user data from localStorage
  function logout() {
    localStorage.removeItem("user");
    user.value = {
      userId: "",
      email: "",
      phoneNumber: "",
      birthDay: "",
      RegisterDate: "",
      role: "",
      imageURL:""
    };
    router.push("/login"); // Redirect to login page after logout
  }

  // Load user data from localStorage on store initialization
  loadUserFromLocalStorage();
  return {
    user,
    updateUser,
    saveUserToLocalStorage,
    loadUserFromLocalStorage,
    logout,
  };
});