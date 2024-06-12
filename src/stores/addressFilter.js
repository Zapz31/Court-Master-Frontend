import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useAddressFilter = defineStore("address", ()=> {
    const citiesList = ref([]);
    const districtsList = ref([]);
    const wardsList = ref([]);

    const fetchCities = async () => {
        try {
          const response = await axios.get("http://localhost:8080/courtmaster/filter/address/provinces");
          // Lấy toàn bộ giá trị của thuộc tính fullName
          const fullNameValues = response.data.map(item => item.fullName);
    
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
            params.append('fullName', cityName);
          const response = await axios.get("http://localhost:8080/courtmaster/filter/address/districts",
            {
                params: params
            }
        
        );
          // Lấy toàn bộ giá trị của thuộc tính fullName
          const fullNameValues = response.data.map(item => item.fullName);
    
          // Gán giá trị cho mảng cities
          districtsList.value = fullNameValues;
          console.log(districtsList);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      const fetchWards = async (citieName, districtName) => {
        try {
          const response = await axios.get("http://localhost:8080/courtmaster/filter/address/wards",{
            provinceFullName: citieName,
            districtFullName: districtName
          });
          // Lấy toàn bộ giá trị của thuộc tính fullName
          const fullNameValues = response.data.map(item => item.fullName);
          // Gán giá trị cho mảng cities
          wardsList.value = fullNameValues;
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
    fetchWards
  };
});