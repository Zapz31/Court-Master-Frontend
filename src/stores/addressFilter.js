import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
axios.defaults.withCredentials = true;
export const useAddressFilter = defineStore("address", () => {
  const citiesList = ref([]);
  const districtsList = ref([]);
  const wardsList = ref([]);

  const API_END_POINT = import.meta.env.VITE_API_URL;

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `${API_END_POINT}/courtmaster/filter/address/provinces`
      );
      // Lấy toàn bộ giá trị của thuộc tính fullName
      const fullNameValues = response.data.map((item) => item.fullName);

      // Gán giá trị cho mảng cities
      citiesList.value = fullNameValues;
      console.log(citiesList);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDistrict = async (cityName) => {
    try {
      const params = new URLSearchParams();
      params.append("fullName", cityName);
      const response = await axios.get(
        `${API_END_POINT}/courtmaster/filter/address/districts`,
        {
          params: params,
        }
      );
      // Lấy toàn bộ giá trị của thuộc tính fullName
      const fullNameValues = response.data.map((item) => item.fullName);

      // Gán giá trị cho mảng cities
      districtsList.value = fullNameValues;
      console.log(districtsList);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchWards = async (citieName, districtName) => {
    try {
      const body = JSON.stringify({
        provinceFullName: citieName,
        districtFullName: districtName,
      });
      const response = await axios.post(
        `${API_END_POINT}/courtmaster/filter/address/wards`,
        body,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      // Lấy toàn bộ giá trị của thuộc tính fullName
      const fullNameValues = response.data.map((item) => item.fullName);
      // Gán giá trị cho mảng cities
      wardsList.value = fullNameValues;
      console.log("this is wardsList: ");
      console.log(wardsList);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return {
    citiesList,
    districtsList,
    wardsList,
    fetchCities,
    fetchDistrict,
    fetchWards,
  };
});
