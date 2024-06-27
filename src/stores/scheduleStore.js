import { defineStore } from 'pinia';

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    selectedDate: '',
    slots: [],
  }),
  actions: {
    addslot(start, end, courtNumber) {
      const price = this.calculatePrice(start, end);
      this.slots.push({
        startTime: start,
        endTime: end,
        court: courtNumber,
        price: price,
      });
    },
    removeslot(startTime, court) {
      const index = this.slots.findIndex(
        slot => slot.startTime === startTime && slot.court === court
      );
      if (index !== -1) {
        this.slots.splice(index, 1);
      }
    },

    removeslotByTimeAndCourt(startTime, court) {
      const index = this.slots.findIndex(
        slot => slot.startTime === startTime && slot.court === court
      );
      if (index !== -1) {
        this.slots.splice(index, 1);
      }
    },

    updateslotEndTime(startTime, court, newEndTime) {
      const slotIndex = this.slots.findIndex(
        slot => slot.startTime === startTime && slot.court === court
      );
      if (slotIndex !== -1) {
        const slot = this.slots[slotIndex];
        slot.endTime = newEndTime;
        slot.price = this.calculatePrice(slot.startTime, newEndTime);
      }
    },

    calculatePrice(start, end) {
      const [startHour, startMinute] = start.split(':').map(Number);
      const [endHour, endMinute] = end.split(':').map(Number);
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;
      const totalMinutes = endTotalMinutes - startTotalMinutes;
      const hours = totalMinutes / 60;
      return hours * 80000; // Giá mặc định 80.000 VNĐ/giờ
    },
    initializeSelectedDate() {
      const today = new Date().toISOString().split('T')[0];
      this.selectedDate = today;
    },
    updateSelectedDate(date) {
      this.selectedDate = date;
    },
    clearslots() {
      this.slots = [];
    },
  },
});