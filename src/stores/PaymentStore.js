import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaymentStore = defineStore("paymentStore", ()=> {
    const bookingSchedule = ref({
        customerFullName:"Giap",
        customerPhoneNumber:"010101010",
        bookingScheduleStatus:"yessir",
        startDate:"2024-06-12",
        endDate:"2024-06-25",
        scheduleType:"oneTime",
        customerId:"STF0000002",
        pricePerSlotRequestDTOList:[
            { courtId: "CO000001", startBooking: "18:30", endBooking:"22:00", bookingDate:"2024-06-15", bookingType:"one_time_play"},
            { courtId: "CO000001", startBooking: "18:00", endBooking:"22:00", bookingDate:"2024-06-15", bookingType:"one_time_play"},
        ]
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