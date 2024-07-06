// api.js
import axios from 'axios';

const API_URL = 'http://your-api-url';

export const submitClubData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/clubs`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};