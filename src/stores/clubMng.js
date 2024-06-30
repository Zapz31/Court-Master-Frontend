// src/stores/clubStore.js
import axios from 'axios'
import { defineStore } from 'pinia'
axios.defaults.withCredentials = true;

export const useClubStore = defineStore('club', {
  state: () => ({
    clubs: [],
    currentClub: null,
  }),
  actions: {
    async fetchClubs() {
      try {
        const response = await axios.get("http://localhost:8080/courtmaster/clubs/clubsView")
        this.clubs = response.data 
      } catch (error) {
        console.error("Failed to fetch clubs:", error)
      }
    },
    async fetchClubById(clubId, userId) {
      try {
        const response = await axios.get(`http://localhost:8080/courtmaster/clubs/detail/${clubId}/${userId}`)
        this.currentClub = response.data
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch club details:", error)
      }
    },
    setCurrentClub(club) {
      this.currentClub = club
    },
     async getFilteredClubs(dataFilter){
      const response = await axios.post("http://localhost:8080/courtmaster/filter/getClubs", dataFilter)
      this.clubs = response.data
     }
  }
})

// try {
//   const response = await axios.get("http://localhost:8080/courtmaster/filter/getClubs")
  
//  } catch (error) {
  
//  }