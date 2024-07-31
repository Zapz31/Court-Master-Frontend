import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
axios.defaults.withCredentials = true;

export const usePaymentStore = defineStore("paymentStore", ()=> {
  
    const tempBookingId = ref('');
    const paymentPayload = ref({
      currentClubInfo : "",
      bookingSchedule : "",
      tempBookingId : ""
    })

    const currentClubInfo = ref({
      courtManagerPhone: "",
      clubId: "",
      clubName: ""
    })
    const bookingSchedule = ref({
        customerFullName: "", //"Giap",
        customerPhoneNumber: "", //"0867901057",
        bookingScheduleStatus: "",  //"Deposited 25%",
        startDate: "", //"2024-06-25",              ***********
        endDate: "", //"2024-06-25",                ***********
        scheduleType: "", //"One-time play",
        customerId: "", //"STF000002",
        totalPlayingTime: "", //"08:00",
        bookingSlotResponseDTOs:[
            // { courtId: "CO000005", startBooking: "13:30", endBooking:"14:00", bookingDate:"2024-06-19", bookingType:"One-time play", price:32},
            // { courtId: "CO000011", startBooking: "08:00", endBooking:"09:30", bookingDate:"2024-06-19", bookingType:"One-time play", price:32},
            // { courtId: "CO000012", startBooking: "07:00", endBooking:"12:30", bookingDate:"2024-06-19", bookingType:"One-time play", price:32}
        ],
        totalPrice: ""
    });

    // private String courtId;
    // private LocalTime startBooking;
    // private LocalTime endBooking;
    // private LocalDate bookingDate;
    // private String bookingType;

    function setBookingSchedule(values) {
        for (const key in values) {
            if (bookingSchedule.value.hasOwnProperty(key)) {
                bookingSchedule.value[key] = values[key];
            }
        }
    }

    function clearBookingSchedule(){
      bookingSchedule.value = {
        customerFullName:"",
        customerPhoneNumber:"",
        bookingScheduleStatus:"",
        startDate:"",
        endDate:"",
        scheduleType:"",
        customerId:"",
        pricePerSlotRequestDTOList:[]
      };
    }

    function saveBookingScheduleToSessionStorage() {
      try {
        sessionStorage.setItem('bookingSchedule', JSON.stringify(bookingSchedule.value));
        console.log('Booking schedule saved to sessionStorage');
      } catch (error) {
        console.error('Failed to save booking schedule to sessionStorage:', error);
      }
    }

    
  function loadBookingScheduleFromSessionStorage() {
    try {
      const savedSchedule = sessionStorage.getItem('bookingSchedule');
      if (savedSchedule) {
        bookingSchedule.value = JSON.parse(savedSchedule);
        console.log('Booking schedule loaded from sessionStorage');
      }
    } catch (error) {
      console.error('Failed to load booking schedule from sessionStorage:', error);
    }
  }

  function loadPaymentPayloadSessionStorage() {
    try {
      const savePaymentPayload = sessionStorage.getItem('paymentPayload');
      if (savePaymentPayload) {
        paymentPayload.value = JSON.parse(savePaymentPayload);
        console.log('Booking schedule loaded from sessionStorage');
      }
    } catch (error) {
      console.error('Failed to load booking schedule from sessionStorage:', error);
    }
  }

  function savePaymentPayloadToSessionStorage() {
    try {
      sessionStorage.setItem('paymentPayload', JSON.stringify(paymentPayload.value));
      console.log('Payment payload saved to sessionStorage');
    } catch (error) {
      console.error('Failed to save Payment payload to sessionStorage:', error);
    }
  }

  function deletePaymentPayloadFromSessionStorage() {
    try {
      sessionStorage.removeItem('paymentPayload');
      console.log('Payment payload deleted from sessionStorage');
    } catch (error) {
      console.error('Failed to delete Payment payload from sessionStorage:', error);
    }
  }

  
  return {
    bookingSchedule,
    currentClubInfo,
    paymentPayload,
    tempBookingId,
    setBookingSchedule,
    clearBookingSchedule,
    saveBookingScheduleToSessionStorage,
    loadBookingScheduleFromSessionStorage,
    savePaymentPayloadToSessionStorage,
    loadPaymentPayloadSessionStorage,
    deletePaymentPayloadFromSessionStorage
  };
});