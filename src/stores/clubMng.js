// src/stores/clubStore.js
import { defineStore } from "pinia";
import axiosInstance from "../axiosInterceptor";
axios.defaults.withCredentials = true;

export const useClubStore = defineStore("club", {
  state: () => ({
    clubs: [],
    currentClub: null,
    clubId: null, // Thêm clubId vào state
  }),

  actions: {
    async fetchClubIdByManagerId(managerId) {
      try {
        const response = await axiosInstance.get(
          "/courtmaster/courtmanager/get-clubId-by-mngid",
          {
            params: { id: managerId },
          }
        );
        this.clubId = response.data.massage; // Lưu clubId vào state
        return this.clubId;
      } catch (error) {
        console.error("Failed to fetch clubId:", error);
        throw error;
      }
    },

    async fetchClubs() {
      try {
        const response = await axiosInstance.get(
          "/courtmaster/clubs/clubsView"
        );
        this.clubs = response.data;
      } catch (error) {
        console.error("Failed to fetch clubs:", error);
        throw error;
      }
    },
    async fetchClubById(clubId, userId) {
      if (!clubId || !userId) {
        console.error("Invalid clubId or userId");
        return;
      }
      try {
        console.log(`cludid: ${clubId}, userid: ${userId}`);
        const response = await axiosInstance.get(
          `/courtmaster/clubs/detail/${clubId}/${userId}`
        );
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
        const response = await axiosInstance.post(
          "/courtmaster/filter/getClubs",
          dataFilter
        );
        this.clubs = response.data;
      } catch (error) {
        console.error("Failed to get filtered clubs:", error);
        throw error;
      }
    },
  },
});
