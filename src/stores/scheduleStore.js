import { defineStore } from 'pinia';

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    selectedDate: '',
    slots: [],
    hourlyRate: 80000,
    currentBookingType: 'one-time', // Mặc định là 'one-time'
  }),
  actions: {
    setCurrentBookingType(type) {
      this.currentBookingType = type;
    },
    addSlot(start, end, courtNumber, status, date) {
      const hours = this.calculateHours(start, end);
      const price = this.calculatePrice(hours);
      this.slots.push({
        startTime: start,
        endTime: end,
        court: courtNumber,
        status: status,
        date: date,
        hours: hours,
        price: price,
        bookingType: this.currentBookingType, // Sử dụng currentBookingType khi thêm slot mới
      });
    },
    updateSlotBookingType(index, newBookingType) {
      if (index >= 0 && index < this.slots.length) {
        this.slots[index].bookingType = newBookingType;
      }
    },

  

    removeSlot(startTime, court) {
      const index = this.slots.findIndex(
        slot => slot.startTime === startTime && slot.court === court && slot.status === "selected"
      );
      if (index !== -1) {
        this.slots.splice(index, 1);
      }
    },
    updateSlot(updatedSlot) {
      const index = this.slots.findIndex(
        slot => slot.startTime === updatedSlot.startTime && slot.court === updatedSlot.court
      );
      if (index !== -1) {
        this.slots[index] = { ...this.slots[index], ...updatedSlot };
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
    calculateHours(start, end) {
      // Đảm bảo start và end là chuỗi
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


  formatDate(date) {
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
});

  // async calculateAndUpdateSlot(slot) {
  //   try {
  //     const response = await axios.post('http://localhost:8080/courtmaster/booking/unpaidbookings', {
  //       courtId: slot.court,
  //       startBooking: slot.startTime,
  //       endBooking: slot.endTime,
  //       bookingDate: this.formatDate(slot.date),
  //       bookingType: "one_time_play" // Có thể cần điều chỉnh dựa trên logic của bạn
  //     });

  //     const bookingDetails = response.data.unpaidBookingList[0];
      
  //     this.updateSlot({
  //       ...slot,
  //       hours: bookingDetails.playTime,
  //       price: bookingDetails.price
  //     });
  //   } catch (error) {
  //     console.error('Error calculating booking details:', error);
  //   }
  // },