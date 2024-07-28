import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth'; // Import auth store

const API_URL = 'http://localhost:8080/courtmaster/courtmanager';

export const useClubRegister = defineStore('clubRegister', {
  state: () => ({
    isLoading: false,
    error: null,
    clubId: null,
  }),

  actions: {
    async registerClub(clubData) {
      this.isLoading = true;
      this.error = null;

      const authStore = useAuthStore();
      
      try {
        const formData = new FormData();

        // Ensure courtManagerId is set
        clubData.badmintonClub.courtManagerId = clubData.badmintonClub.courtManagerId || authStore.user.userId;

        formData.append('badmintonClub', JSON.stringify(clubData.badmintonClub));
        formData.append('address', JSON.stringify(clubData.address));
        formData.append('courtList', JSON.stringify(clubData.courtList));
        formData.append('timeFramesList', JSON.stringify(clubData.timeFramesList));

        if (clubData.avatar) {
          formData.append('avatar', clubData.avatar);
        }

        clubData.descriptionImages.forEach((image, index) => {
          formData.append(`descriptionImage${index}`, image);
        });

        const response = await axios.post(`${API_URL}/register-club`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        this.clubId = response.data.clubId;
        this.isLoading = false;
        return response.data;

      } catch (error) {
        this.isLoading = false;
        this.error = error.response?.data?.message || 'There was an error!';
        throw error;
      }
    },
  },
});