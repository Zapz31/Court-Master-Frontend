import axios from 'axios';
import { defineStore } from 'pinia';
axios.defaults.withCredentials = true;

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    selectedDate: '',
    slots: [],
    slotsToPost: [],
    hourlyRate: 80000,
    currentBookingType: 'one-time',
  }),
  actions: {
    setCurrentBookingType(type) {
      this.currentBookingType = type;
    },

    async postSlotsToBackend() {
      const slotsToPost = this.slotsToPost.map(slot => ({
        courtId: slot.court,
        startBooking: slot.startTime,
        endBooking: slot.endTime,
        bookingDate: this.formatDateForBackend(slot.date),
        bookingType: this.formatBookingType(slot.bookingType || this.currentBookingType),
      }));

      try {
        const response = await axios.post('http://localhost:8080/courtmaster/booking/unpaidbookings', slotsToPost);
        console.log('Bookings posted successfully:', response.data);
        this.slotsToPost = []; // Clear the array after successful post
      } catch (error) {
        console.error('Error posting bookings:', error);
        throw error;
      }
    },

    addSlot(start, end, courtNumber, status, date) {
      const hours = this.calculateHours(start, end);
      const price = this.calculatePrice(hours);
      const newSlot = {
        startTime: start,
        endTime: end,
        court: courtNumber,
        status: status,
        date: date,
        hours: hours,
        price: price,
        bookingType: this.currentBookingType,
      };
      this.slots.push(newSlot);

      if (status === 'selected') {
        this.slotsToPost.push(newSlot);
      }
    },

    updateSlot(updatedSlot) {
      const index = this.slots.findIndex(
        slot => slot.startTime === updatedSlot.startTime && slot.court === updatedSlot.court
      );
      if (index !== -1) {
        this.slots[index] = { ...this.slots[index], ...updatedSlot };
        if (updatedSlot.status === 'selected') {
          const postIndex = this.slotsToPost.findIndex(
            slot => slot.startTime === updatedSlot.startTime && slot.court === updatedSlot.court
          );
          if (postIndex === -1) {
            this.slotsToPost.push(this.slots[index]);
          } else {
            this.slotsToPost[postIndex] = this.slots[index];
          }
        } else {
          // Remove from slotsToPost if status is not 'selected'
          this.slotsToPost = this.slotsToPost.filter(
            slot => slot.startTime !== updatedSlot.startTime || slot.court !== updatedSlot.court
          );
        }
      }
    },

    removeSlot(startTime, court) {
      const index = this.slots.findIndex(
        slot => slot.startTime === startTime && slot.court === court && slot.status === "selected"
      );
      if (index !== -1) {
        this.slots.splice(index, 1);
        this.slotsToPost = this.slotsToPost.filter(
          slot => slot.startTime !== startTime || slot.court !== court
        );
      }
    },

    calculateHours(start, end) {
      start = String(start);
      end = String(end);

      const [startHour, startMinute] = start.split(':').map(Number);
      const [endHour, endMinute] = end.split(':').map(Number);
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;
      const totalMinutes = endTotalMinutes - startTotalMinutes;
      return totalMinutes / 60;
    },

    calculatePrice(hours) {
      return hours * this.hourlyRate;
    },

    formatDateForBackend(date) {
      const [day, month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },

    formatBookingType(type) {
      switch (type) {
        case 'one-time':
          return 'one_time_play';
        case 'flexible':
          return 'flexible';
        case 'fixed':
          return 'fixed';
        default:
          return type;
      }
    },

    updateSlotEndTime(index, newEndTime) {
      if (index !== -1 && index < this.slots.length) {
        const slot = this.slots[index];
        slot.endTime = newEndTime;
        slot.hours = this.calculateHours(slot.startTime, newEndTime);
        slot.price = this.calculatePrice(slot.hours);
      }
    },

    initializeSelectedDate() {
      const today = new Date().toISOString().split('T')[0];
      this.selectedDate = today;
    },

    updateSelectedDate(date) {
      this.selectedDate = date;
    },

    clearSlots() {
      this.slots = [];
    },

    setBookingType(type) {
      this.bookingType = type;
    },
  },
});
