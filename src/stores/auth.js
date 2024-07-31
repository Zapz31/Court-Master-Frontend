import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../router";
axios.defaults.withCredentials = true;
export const useAuthStore = defineStore("auth", ()=> {
    const user = ref({
        userId: "",
        email: "",
        phoneNumber: "",
        birthDay: "",
        RegisterDate: "",
        role:"",
        imageURL:"",
        firstName:"",
        lastName:"",
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
    // console.log(storedUser);
    
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  }

   const validateToken = async () => {
    try {
      const response = await axios.get('http://localhost:8080/courtmaster/auth/validate-token');
      if(response.status === 200){
        console.log("valid token");
      }
      return response.status === 200;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  };
 /*
  const getBookingScheduleHitories = async () => {
    try {
        console.log('Sending payload:', payload.value);
        const response = await axios.post('http://localhost:8080/courtmaster/filter/history/booking-schedules', payload.value);
        console.log('Response:', response.data);
        bookingScheduleHistoies.value = response.data;
    } catch (err) {
        console.error('Error fetching BookingScheduleHitories:', err);
    }
};
*/

  // Logout function to remove user data from localStorage
  function logout() {
    clearUser();
    deleteCookie("uwu");
    router.push("/login"); // Redirect to login page after logout
  }

  function clearUser(){
    localStorage.removeItem("user");
    user.value = {
      userId: "",
      email: "",
      phoneNumber: "",
      birthDay: "",
      RegisterDate: "",
      role: "",
      imageURL:"",
      firstName:"",
      lastName:"",
    };
  }

  const checkCookieExists = (cookieName) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie starts with the name we're looking for
      if (cookie.startsWith(cookieName + '=')) {
        return true;
      }
    }
    return false;
  };

  const checkLocalStorageExists = (key) => {
    try {
      return localStorage.getItem(key) !== null;
    } catch (e) {
      // This catch is mainly for catching SecurityError when localStorage is not available
      console.error('localStorage is not available:', e);
      return false;
    }
  };

  // Validate token every time load page.
const checkTokenValidity = async () => { // Hàm này chỉ được gọi khi đã có thông tin trong local Storage.
  const isValid = await validateToken();
  if (!isValid) {
    // Handle invalid token (e.g., redirect to login)
    clearUser();
    deleteCookie("uwu");
  }
};

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

  // Load user data from localStorage on store initialization
  loadUserFromLocalStorage();
  return {
    user,
    updateUser,
    saveUserToLocalStorage,
    loadUserFromLocalStorage,
    validateToken,
    logout,
    clearUser,
    checkCookieExists,
    checkLocalStorageExists,
    deleteCookie,
    checkTokenValidity
  };
});