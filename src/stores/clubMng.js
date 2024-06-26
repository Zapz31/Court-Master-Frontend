// src/stores/clubStore.js
import axios from 'axios'
import { defineStore } from 'pinia'

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
    async fetchClubById(clubId) {
      try {
        const response = await axios.get(`http://localhost:8080/courtmaster/clubs/detail/${clubId}`)
        this.currentClub = response.data
      } catch (error) {
        console.error("Failed to fetch club details:", error)
      }
    },
    setCurrentClub(club) {
      this.currentClub = club
    }
  }
})