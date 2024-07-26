import { defineStore } from 'pinia';
import axiosInstance from '../axiosInterceptor';
import { useAuthStore } from './auth';

export const useCheckInStore = defineStore('checkIn', {
  state: () => ({
    checkedInBookings: [],
    pendingCheckIns: [],
    clubId: null
  }),
  actions: {
    async fetchClubId() {
        const authStore = useAuthStore();
        const staffId = authStore.user.userId;
      
        try {
          const response = await axiosInstance.get(`http://localhost:8080/courtmaster/staff/get-clubId-by-userId?staffId=${staffId}`);
          this.clubId = response.data.clubId; // Lấy trực tiếp giá trị clubId
          console.log('Club ID:', this.clubId);
        } catch (error) {
          console.error('Error fetching clubId:', error);
        }
      },

      async fetchUnCheckinList() {
        if (!this.clubId) {
          await this.fetchClubId();
        }
      
        if (!this.clubId) {
          console.error('Invalid clubId:', this.clubId);
          return;
        }
      
        try {
          const response = await axiosInstance.get(`http://localhost:8080/courtmaster/staff/get-all-uncheckIn-bslist?clubId=${this.clubId}`);
          this.pendingCheckIns = response.data;
          console.log('Pending Check-ins:', this.pendingCheckIns);
        } catch (error) {
          console.error('Error fetching pending check-ins:', error);
          if (error.response && error.response.status === 400) {
            console.error('Bad Request:', error.response.data);
          }
        }
      },


      async fetchCheckedInList() {
        if (!this.clubId) {
          await this.fetchClubId();
        }
      
        if (!this.clubId) {
          console.error('Invalid clubId:', this.clubId);
          return;
        }
      
        try {
          const response = await axiosInstance.get(`http://localhost:8080/courtmaster/staff/get-all-checkdIn-bslist?clubId=${this.clubId}`);
          this.checkedInBookings = response.data;
          console.log('Checked-in Bookings:', this.checkedInBookings);
        } catch (error) {
          console.error('Error fetching checked-in bookings:', error);
          if (error.response && error.response.status === 400) {
            console.error('Bad Request:', error.response.data);
          }
        }
      },

      async performCheckIn(slotId) {
        try {
          const response = await axiosInstance.post(`http://localhost:8080/courtmaster/staff/staffCheckIn?slotId=${slotId}`);
          if (response.data === "success") {
            // Cập nhật danh sách
            await this.fetchUnCheckinList();
            await this.fetchCheckedInList();
          }
        } catch (error) {
          console.error('Error performing check-in:', error);
        }
      },
  
      async performCheckedIn(slotId) {
        try {
          const response = await axiosInstance.post(`http://localhost:8080/courtmaster/staff/staffCheckIn?slotId=${slotId}`);
          if (response.data === "success") {
            // Cập nhật danh sách
            await this.fetchUnCheckinList();
            await this.fetchCheckedInList();
          }
        } catch (error) {
          console.error('Error performing check-out:', error);
        }
      }
  }
});