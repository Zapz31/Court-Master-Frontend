import axios from 'axios';
import { defineStore } from 'pinia';
axios.defaults.withCredentials = true;

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    duplicateSlotError: null,
    selectedDate: '',
    endDate: '', // Thêm endDate vào state
    slots: [],
    invalidSlots: [],
    slotsToPost: [],
    selectedSlots: [],
    bookingResponse: null,
    errorMessage: "",
    errorMessageVisible: false,
    pendingSlots: [],
    currentBookingType: 'one-time',
    errorMessageTimer: null
  }),
  actions: {
    setCurrentBookingType(type) {
      this.currentBookingType = type;
    },

    

    setDateRange(startDate, endDate) {
      this.selectedDate = startDate;
      this.endDate = endDate;
    },
    updateEndDate(endDate) {
      this.endDate = endDate;
    },


    async addSlot(start, end, courtNumber, status, date) {
      const hours = this.calculateHours(start, end);
      const price = this.calculatePrice(hours);
      const newSlot = {
        startTime: start,
        endTime: end,
        court: courtNumber,
        status: status,
        date: date, // Đã được format thành DD/MM/YYYY từ addFixedSlots
        hours: hours,
        price: price,
        bookingType: this.currentBookingType,
      };
      this.slots.push(newSlot);
    
      if (status === 'selected') {
        this.slotsToPost.push(newSlot);
        await this.postSlotsToBackend();
      }
    },


    saveSelectedSlots() {
      this.selectedSlots = this.slots.filter(slot => slot.status === 'selected');
    },
  
    restoreSelectedSlots() {
      this.selectedSlots.forEach(slot => {
        const existingSlot = this.slots.find(s => 
          s.startTime === slot.startTime && 
          s.court === slot.court && 
          s.date === slot.date
        );
        if (existingSlot) {
          existingSlot.status = 'selected';
        } else {
          this.slots.push({...slot, status: 'selected'});
        }
      });
      this.slotsToPost = [...this.selectedSlots];
    },
  
    clearSelectedSlots() {
      this.selectedSlots = [];
    },


    parseDate(dateString) {
      const [day, month, year] = dateString.split('/');
      return new Date(year, month - 1, day);
    },

    convertDateStringToDate(dateString) {
      if (!dateString || typeof dateString !== 'string') {
        throw new Error('Invalid dateString');
      }
      const [day, month, year] = dateString.split('/');
      return new Date(`${year}-${month}-${day}`);
    },
    


    async addFixedSlots(startTime, endTime, courtNumber, status, startDate) {
      let currentDate = this.convertDateStringToDate(startDate);
      const endDate = this.convertDateStringToDate(this.endDate);
      this.pendingSlots = [];
    
      while (currentDate <= endDate) {
        const formattedDate = this.formatDate(currentDate);
        const newSlot = {
          startTime,
          endTime,
          court: courtNumber,
          status,
          date: formattedDate,
          bookingType: 'Fixed'
        };
        this.pendingSlots.push(newSlot);
        currentDate.setDate(currentDate.getDate() + 7);
      }
    
      const validationPassed = await this.validateAndAddPendingSlots();
    
      if (!validationPassed) {
        // Clear invalid slots from the view
        this.pendingSlots.forEach(slot => {
          const index = this.slots.findIndex(
            existingSlot =>
              existingSlot.startTime === slot.startTime &&
              existingSlot.court === slot.court &&
              existingSlot.date === slot.date
          );
          if (index !== -1) {
            this.slots.splice(index, 1);
          }
        });
      }
    },
    
    generateFixedSlots(initialSlot) {
      let currentDate = this.convertDateStringToDate(this.initialSlot.date);
      const endDate = this.convertDateStringToDate(this.endDate);

      while (currentDate <= endDate) {
        const newFixedSlot = {
          ...initialSlot,
          date: this.currentDate,
        };
        this.addFixedSlots(newFixedSlot.startTime, newFixedSlot.endTime, newFixedSlot.court, newFixedSlot.status, newFixedSlot.date);
        currentDate.setDate(currentDate.getDate() + 7);
      }
    },



    async updateSlot(updatedSlot) {
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
        await this.postSlotsToBackend();
      }
    },

    async removeSlot(startTime, court) {
      const slotsToRemove = this.slots.filter(
        slot => slot.startTime === startTime && slot.court === court && slot.status === "selected"
      );
    
      for (const slot of slotsToRemove) {
        const index = this.slots.findIndex(s => s === slot);
        if (index !== -1) {
          this.slots.splice(index, 1);
          this.slotsToPost = this.slotsToPost.filter(
            s => s !== slot
          );
        }
      }
    
      await this.postSlotsToBackend();
    },

    async validateSlots(slotsToValidate) {
      try {
        const response = await axios.post('http://localhost:8080/courtmaster/api/test/getDuplicateBookingSlot', slotsToValidate);
        return response.data;
      } catch (error) {
        console.error('Error validating slots:', error);
        throw error;
      }
    },
    //check trung
    async validateAndAddPendingSlots() {
      const slotsToValidate = this.pendingSlots.map(slot => ({
        courtId: slot.court,
        startBooking: slot.startTime,
        endBooking: slot.endTime,
        bookingDate: this.formatDateForBackend(slot.date),
        bookingType: this.formatBookingType(slot.bookingType),
      }));
    
      try {
        const duplicateSlots = await this.validateSlots(slotsToValidate);
    
        if (duplicateSlots.length > 0) {
          this.invalidSlots = duplicateSlots;
          const errorMessages = duplicateSlots.map(slot =>
            `Slot at court ${slot.courtName} from ${slot.startTime.slice(0, 5)} to ${slot.endTime.slice(0, 5)} - ${this.formatDate(slot.bookingDate)} is already booked, please try another time.\n`
          );
          this.duplicateSlotError = errorMessages.join('\n');
          this.setErrorMessage(this.duplicateSlotError, 10000, true); // Display error for 10s and mark as duplicate error
          this.pendingSlots = [];
          return false;
        }
    
        this.duplicateSlotError = null;
        this.pendingSlots.forEach(slot => {
          this.slots.push(slot);
          this.slotsToPost.push(slot);
        });
        this.pendingSlots = [];
        return true;
      } catch (error) {
        console.error('Error validating slots:', error);
        this.setErrorMessage('An error occurred while validating slots. Please try again.');
        this.pendingSlots = [];
        return false;
      }
    },

    async postSlotsToBackend() {
      if (this.slotsToPost.length === 0) {
        console.log('No slots to post');
        this.bookingResponse = null;
        return;
      }
    
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
        this.setBookingResponse(response.data);
        this.clearErrorMessage();
        // this.slotsToPost = []; // Clear slotsToPost after successful posting
      } catch (error) {
        console.error('Error posting bookings:', error);
        this.setErrorMessage('An error occurred while booking. Please try again.');
      }
    },

    removeInvalidSlots() {
      this.invalidSlots.forEach(invalidSlot => {
        const index = this.slots.findIndex(slot => 
          slot.court === invalidSlot.courtId &&
          slot.startTime === invalidSlot.startTime.slice(0, 5) &&
          slot.endTime === invalidSlot.endTime.slice(0, 5) &&
          slot.date === this.formatDate(invalidSlot.bookingDate)
        );
        if (index !== -1) {
          this.slots.splice(index, 1);
        }
      });
      this.slotsToPost = this.slots.filter(slot => slot.status === 'selected');
      this.invalidSlots = [];
    },



    
    setErrorMessage(message, duration = 0, isDuplicateError = false) {
      this.errorMessage = message;
      this.errorMessageVisible = true;
      this.isDuplicateError = isDuplicateError;
    
      if (this.errorMessageTimer) {
        clearTimeout(this.errorMessageTimer);
      }
    
      if (duration > 0 && !isDuplicateError) {
        this.errorMessageTimer = setTimeout(() => {
          this.clearErrorMessage();
        }, duration);
      }
    },
    
    clearErrorMessage() {
      if (this.isDuplicateError) {
        return;
      }
      this.errorMessage = "";
      this.errorMessageVisible = false;
      if (this.errorMessageTimer) {
        clearTimeout(this.errorMessageTimer);
        this.errorMessageTimer = null;
      }
    },
    
    clearDuplicateSlotError() {
      this.isDuplicateError = false;
      this.clearErrorMessage();
    },

    setBookingResponse(response) {
      this.bookingResponse = response;
    },

    setCurrentBookingType(type) {
      this.currentBookingType = type;
    },
    updateSelectedDate(date) {
      this.selectedDate = date;
    },
    updateEndDate(date) {
      this.endDate = date;
    },
    updateSelectedDateRange(dateRange) {
      this.selectedDate = dateRange.start;
      this.endDate = dateRange.end;
    },
    getFormattedBookings() {
      if (!this.bookingResponse) return [];
      return this.bookingResponse.unpaidBookingList.map((booking) => {
        return {
          id: booking.id,
          date: booking.date,
          type: booking.bookingType,
        };
      });
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

    formatDate(date) {
      if (date instanceof Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      } else if (typeof date === 'string') {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
      }
      return '';
    },
    

    formatDateForBackend(date) {
      const [day, month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },

    formatBookingType(type) {
      switch (type) {
        case 'one-time':
          return 'One-time play';
        case 'flexible':
          return 'Flexible';
        case 'fixed':
          return 'Fixed';
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


    updateSelectedDateRange({ start, end }) {
      this.startDate = start;
      this.endDate = end;
    },

    updateSelectedDate(date) {
      this.selectedDate = date;
    },

    clearSlots() {
      this.slots = [];
    },

    formatDateFromBackend(date) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },

    formatTimeFromBackend(time) {
      return time.slice(0, 5);
    },

    setBookingType(type) {
      this.bookingType = type;
    },
    
    formatBookingTypeFromBackend(type) {
      switch (type) {
        case 'one_time_play':
          return 'One time';
        case 'flexible':
          return 'Flexible';
        case 'fixed':
          return 'Fixed';
        default:
          return type;
      }
    },

  },
});