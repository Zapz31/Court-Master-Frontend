import axios from 'axios';
import { defineStore } from 'pinia';
axios.defaults.withCredentials = true;

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    selectedDate: '',
    endDate: '', // Thêm endDate vào state
    slots: [],
    slotsToPost: [],
    bookingResponse: null,
    currentBookingType: 'one-time',
  }),
  actions: {
    setCurrentBookingType(type) {
      this.currentBookingType = type;
    },

    formatDateToDDMMYYYY(date) {
      if (date instanceof Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      // Nếu đã là chuỗi, giả định nó đã ở định dạng YYYY-MM-DD
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },

    // Trong scheduleStore

    

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
      let currentDate = this.convertDateStringToDate(startDate); // Chuyển đổi từ chuỗi thành Date
      const endDate = this.convertDateStringToDate(this.endDate); // Chuyển đổi endDate từ state
    
      while (currentDate <= endDate) {
        const formattedDate = this.formatDate(currentDate); // Định dạng lại thành dd/MM/yyyy
        await this.addSlot(startTime, endTime, courtNumber, status, formattedDate);
        currentDate.setDate(currentDate.getDate() + 7); // Tăng ngày lên 7 ngày
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
      const index = this.slots.findIndex(
        slot => slot.startTime === startTime && slot.court === court && slot.status === "selected"
      );
      if (index !== -1) {
        this.slots.splice(index, 1);
        this.slotsToPost = this.slotsToPost.filter(
          slot => slot.startTime !== startTime || slot.court !== court
        );
        await this.postSlotsToBackend();
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
        this.bookingResponse = response.data;
      } catch (error) {
        console.error('Error posting bookings:', error);
        throw error;
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
