import { defineStore } from 'pinia';

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    selectedDate: '',
    sessions: [],
  }),
  actions: {
    addSession(start, end, courtNumber) {
      const price = this.calculatePrice(start, end);
      this.sessions.push({
        startTime: start,
        endTime: end,
        court: courtNumber,
        price: price,
      });
    },
    removeSession(index) {
      this.sessions.splice(index, 1);
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
    clearSessions() {
      this.sessions = [];
    },
  },
});