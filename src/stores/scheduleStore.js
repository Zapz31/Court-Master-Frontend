import { defineStore } from 'pinia';

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    selectedDate: '',
    slots: [],
    hourlyRate: 80000, // Default rate of 80,000 VND/hour
  }),
  actions: {
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
      });
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
  },
});