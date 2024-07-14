// src/stores/clubStore.js
import { defineStore } from 'pinia';
import axiosInstance from '../axiosInterceptor';

export const useClubStore = defineStore('club', {
  state: () => ({
    clubs: [],
    currentClub: null,
  }),
  actions: {
    async fetchClubs() {
      try {
        const response = await axiosInstance.get("/courtmaster/clubs/clubsView");
        this.clubs = response.data;
      } catch (error) {
        console.error("Failed to fetch clubs:", error);
        throw error;
      }
    },
    async fetchClubById(clubId, userId) {
      try {
        const response = await axiosInstance.get(`/courtmaster/clubs/detail/${clubId}/${userId}`);
        this.currentClub = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch club details:", error);
        throw error;
      }
    },
    setCurrentClub(club) {
      this.currentClub = club;
    },
    async getFilteredClubs(dataFilter) {
      try {
        const response = await axiosInstance.post("/courtmaster/filter/getClubs", dataFilter);
        this.clubs = response.data;
      } catch (error) {
        console.error("Failed to get filtered clubs:", error);
        throw error;
      }
    }
  }
});