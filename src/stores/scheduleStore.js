import { defineStore } from 'pinia'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    selectedDate: '',
    startTime: '',
    endTime: '',
    court: null,
    price: 0,
  }),
  actions: {
    updateScheduleInfo(start, end, courtNumber) {
      this.startTime = start
      this.endTime = end
      this.court = courtNumber
      this.calculatePrice()
    },
    calculatePrice() {
      const [startHour, startMinute] = this.startTime.split(':').map(Number)
      const [endHour, endMinute] = this.endTime.split(':').map(Number)
      const startTotalMinutes = startHour * 60 + startMinute
      const endTotalMinutes = endHour * 60 + endMinute
      const totalMinutes = endTotalMinutes - startTotalMinutes
      const hours = totalMinutes / 60
      this.price = hours * 80000 // Giá mặc định 80.000 VNĐ/giờ
    },
    updateSelectedDate(date) {
      this.selectedDate = date
    },
  },
})