import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
const API_END_POINT = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const useFilterHistoryStore = defineStore("filterHistory", () => {
  const currentBookingScheduleId = ref("");
  const currentClubName = ref("");
  const bookingSlots = ref([]);
  const bookingScheduleHistoies = ref([]);
  const payload = ref({
    clubNameOrCMPhone: "",
    customerId: "",
    startDate: "",
    endDate: "",
    scheduleType: "",
  });

  // Call API to get booking schedule histories
  const getBookingScheduleHitories = async () => {
    try {
      console.log("Sending payload:", payload.value);
      const response = await axios.post(
        `${API_END_POINT}/courtmaster/filter/history/booking-schedules`,
        payload.value
      );
      console.log("Response:", response.data);
      bookingScheduleHistoies.value = response.data;
    } catch (err) {
      console.error("Error fetching BookingScheduleHitories:", err);
    }
  };

  // Call API to get booking slots history by scheduleId
  const getBookingSlots = async (scheduleId) => {
    try {
      const response = await axios.get(
        `${API_END_POINT}/courtmaster/booking/history/slots?scheduleId=${scheduleId}`
      );
      console.log(response.data);
      bookingSlots.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Call API to filter booking slots history
  const getFilterBookingSlots = async (filterPayLoad) => {
    try {
      console.log(filterPayLoad.value);
      console.log(currentBookingScheduleId.value);
      const response = await axios.post(
        `${API_END_POINT}/courtmaster/filter/history/booking-slots`,
        {
          bookingScheduleId: currentBookingScheduleId.value,
          bookingDate: filterPayLoad.bookingDate,
          startTime: filterPayLoad.startTime,
          endTime: filterPayLoad.endTime,
          isCheckIn: filterPayLoad.isCheckIn,
        }
      );
      console.log(response.data);
      bookingSlots.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getBookingScheduleHitories,
    bookingScheduleHistoies,
    payload,
    getBookingSlots,
    bookingSlots,
    getFilterBookingSlots,
    currentBookingScheduleId,
    currentClubName,
  };
});
