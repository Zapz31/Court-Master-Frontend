import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:8080/courtmaster/courtmanager';

export const useClubRegister = defineStore('clubRegister', {
  state: () => ({
    isLoading: false,
    error: null,
    clubId: null,
  }),
  actions: {
    async registerClub(formData) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post(`${API_URL}/register-club`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        this.clubId = response.data.clubId;
        this.isLoading = false;
        console.log('Club registration successful:', response.data);
        return response.data;
      } catch (error) {
        this.isLoading = false;
        this.error = error.response?.data?.message || 'There was an error!';
        console.error('Club registration failed:', error);
        throw error;
      }
    }
  },
});