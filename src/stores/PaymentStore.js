import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
axios.defaults.withCredentials = true;

export const usePaymentStore = defineStore("paymentStore", ()=> {
    const bookingSchedule = ref({
        customerFullName:"Giap",
        customerPhoneNumber:"0867901057",
        bookingScheduleStatus:"Deposited 25%",
        startDate:"2024-06-25",
        endDate:"2024-06-25",
        scheduleType:"One-time play",
        customerId:"STF000002",
        bookingSlotResponseDTOs:[
            { courtId: "CO000005", startBooking: "13:30", endBooking:"14:00", bookingDate:"2024-06-18", bookingType:"One-time play", price:32},
            //{ courtId: "CO000011", startBooking: "08:00", endBooking:"09:30", bookingDate:"2024-06-18", bookingType:"One-time play", price:32},
            //{ courtId: "CO000012", startBooking: "07:00", endBooking:"12:30", bookingDate:"2024-06-18", bookingType:"One-time play", price:32}
        ],
        totalPrice: 320000
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

  return {
    bookingSchedule,
    setBookingSchedule,
    clearBookingSchedule
  };
});