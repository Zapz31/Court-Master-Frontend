import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';

export const useFilterHistoryStore = defineStore("filterHistory", () => {
    const bookingScheduleHistoies = ref([]);
    const payload = ref({
        clubNameOrCMPhone: "",
        customerId: "",
        startDate: "",
        endDate: "",
        scheduleType: ""
    });

    // Call API to get booking schedule histories
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

    return {
        getBookingScheduleHitories,
        bookingScheduleHistoies,
        payload
    };
});
