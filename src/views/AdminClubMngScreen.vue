<template>
  <div class="container">
    <div class="logo">
      <logo />
      <h1>Quản lí câu lạc bộ</h1>
      <user-avatar />
    </div>
    <div class="filter_search">
      <div class="box-search">
        <div class="search">
          <input
            v-model="searchTerm"
            placeholder="Nhập tên câu lạc bộ hoặc ID"
            type="text"
          />
          <div class="button-func">
            <div class="button">
              <button @click="searchClubs" type="submit" class="button">
                <svg
                  width="24"
                  height="24"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5 15.5L19 19"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="table-actions">
        <div class="actions">
          <button @click="updateClubs" class="action-button update">
            Cập nhật
          </button>
          <button @click="closeSelectedClubs" class="action-button close">
            Đóng
          </button>
          <button @click="openSelectedClubs" class="action-button open">
            Mở
          </button>

          <div class="status-filter">
            <select
              class="dropdown-status"
              v-model="selectedStatus"
              @change="filterClubsByStatus"
            >
              <option value="all">All Clubs</option>
              <option value="active">Active Clubs</option>
              <option value="inactive">Inactive Clubs</option>
            </select>
          </div>
        </div>
        <div class="table-container">
          <table class="fixed-header">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleAll"
                  />
                  Chọn tất cả
                </th>
                <th>ID</th>
                <th>Tên</th>
                <th>Số nhà</th>
                <th>Phường/Xã</th>
                <th>Quận/Huyện</th>
                <th>Tỉnh/Thành phố</th>
                <th>
                  <span> </span><span> </span>Mô tả<span> </span><span> </span>
                </th>
                <th>
                  <p>Trạng</p>
                  <p>thái</p>
                </th>
                <th>Tên chủ CLB</th>
                <th>ID CLB</th>
                <!-- <th></th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="club in clubs" :key="club.clubId">
                <td>
                  <input
                    type="checkbox"
                    v-model="club.selected"
                    @change="() => toggleEditable(club)"
                  />
                </td>
                <td>{{ club.clubId }}</td>
                <td>
                  <input
                    v-model="club.clubName"
                    :disabled="!club.editable"
                    class="editable-input"
                  />
                </td>
                <td>{{ club.unitNumber }}</td>
                <td>{{ club.ward }}</td>
                <td>{{ club.district }}</td>
                <td>{{ club.province }}</td>
                <td>
                  <textarea
                    v-model="club.description"
                    :disabled="!club.editable"
                    class="editable-textarea"
                  ></textarea>
                </td>
                <td>{{ club.badmintonClubStatus }}</td>
                <td>{{ club.fullCourtManagerName }}</td>
                <td>{{ club.courtManagerId }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h2>Giới Thiệu</h2>
          <p>
            Court Master là một nền tảng hấp dẫn cho những người yêu thích cầu
            lông. Chúng tôi giúp bạn dễ dàng tìm và đặt sân cầu lông. Sứ mệnh
            của chúng tôi là tạo ra một cách liền mạch và hiệu quả để kết nối
            những người đam mê cầu lông với các sân có sẵn trong khu vực . 🏸🌟
          </p>
        </div>
        <div class="footer-section contact">
          <h2>Liên hệ</h2>
          <p>Trung tâm dịch vụ Court Master</p>

          <p>Phone: +84 23456 7890</p>
          <p>Email: courtmaster@company.com</p>
        </div>
        <div class="footer-section follow-us">
          <h2>Hãy để chúng tôi đến gần với bạn hơn</h2>
          <ul class="wrapper">
            <li class="icon facebook">
              <span class="tooltip">Facebook</span>
              <svg
                viewBox="0 0 320 512"
                height="1.2em"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                ></path>
              </svg>
            </li>
            <li class="icon twitter">
              <span class="tooltip">Twitter</span>
              <svg
                height="1.8em"
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                class="twitter"
              >
                <path
                  d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                ></path>
              </svg>
            </li>
            <li class="icon instagram">
              <span class="tooltip">Instagram</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.2em"
                fill="currentColor"
                class="bi bi-instagram"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0c2.13 0 2.406.01 3.25.047.844.037 1.42.16 1.937.34.522.182.966.426 1.406.865.44.44.683.884.865 1.406.18.516.303 1.093.34 1.937C15.99 5.594 16 5.87 16 8s-.01 2.406-.047 3.25c-.037.844-.16 1.42-.34 1.937-.182.522-.426.966-.865 1.406-.44.44-.884.683-1.406.865-.516.18-1.093.303-1.937.34C10.406 15.99 10.13 16 8 16s-2.406-.01-3.25-.047c-.844-.037-1.42-.16-1.937-.34-.522-.182-.966-.426-1.406-.865-.44-.44-.683-.884-.865-1.406-.18-.516-.303-1.093-.34-1.937C.01 10.406 0 10.13 0 8s.01-2.406.047-3.25c.037-.844.16-1.42.34-1.937.182-.522.426-.966.865-1.406.44-.44.884-.683 1.406-.865.516-.18 1.093-.303 1.937-.34C5.594.01 5.87 0 8 0zm0 1.459c-2.085 0-2.333.01-3.157.045-.807.035-1.245.166-1.535.276-.386.15-.662.326-.95.614-.287.288-.463.564-.614.95-.11.29-.241.728-.276 1.535-.036.824-.045 1.072-.045 3.157 0 2.085.01 2.333.045 3.157.035.807.166 1.245.276 1.535.15.386.326.662.614.95.288.287.564.463.95.614.29.11.728.241 1.535.276.824.036 1.072.045 3.157.045 2.085 0 2.333-.01 3.157-.045.807-.035 1.245-.166 1.535-.276.386-.15.662-.326.95-.614.287-.288.463-.564.614-.95.11-.29.241-.728.276-1.535.036-.824.045-1.072.045-3.157 0-2.085-.01-2.333-.045-3.157-.035-.807-.166-1.245-.276-1.535-.15-.386-.326-.662-.614-.95-.288-.287-.564-.463-.95-.614-.29-.11-.728-.241-1.535-.276-.824-.036-1.072-.045-3.157-.045zM8 3.918a4.082 4.082 0 1 0 0 8.164 4.082 4.082 0 0 0 0-8.164zM8 10.7a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4zm5.243-6.558a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z"
                ></path>
              </svg>
            </li>
          </ul>
        </div>
      </div>
      <img src="../../public/img/mono_blue_text.png" alt="Logo" />
    </div>
  </div>
</template>
  
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import Logo from "../components/AdminHomepage/Logo.vue";
import UserAvatar from "../components/AdminHomepage/UserAvatar.vue";
const API_END_POINT = import.meta.env.VITE_API_URL;

const searchTerm = ref("");
const selectAll = ref(false);
const clubs = ref([]);
const error = ref(null);
const selectedStatus = ref("all");

const fetchClubs = async () => {
  try {
    const response = await axios.get(
      `${API_END_POINT}/courtmaster/admin/get-all-club`
    );
    clubs.value = response.data.map((club) => ({
      ...club,
      selected: false,
      editable: false,
    }));
    console.log("Fetched clubs:", clubs.value); // For debugging
  } catch (error) {
    console.error("Error fetching clubs:", error);
    error.value = "Failed to fetch clubs. Please try again later.";
  }
};

const searchClubs = async () => {
  try {
    const response = await axios.post(
      `${API_END_POINT}/courtmaster/admin/search-club`,
      { search: searchTerm.value }
    );
    clubs.value = response.data.map((club) => ({
      ...club,
      selected: false,
      editable: false,
    }));
    console.log("Search results:", clubs.value); // For debugging
  } catch (error) {
    console.error("Error searching clubs:", error);
    error.value = "Failed to search clubs. Please try again later.";
  }
};

const filterClubsByStatus = async () => {
  let url;
  switch (selectedStatus.value) {
    case "active":
      url = `${API_END_POINT}/courtmaster/admin/get-all-active-club`;
      break;
    case "inactive":
      url = `${API_END_POINT}/courtmaster/admin/get-all-inactive-club`;
      break;
    default:
      url = `${API_END_POINT}/courtmaster/admin/get-all-club`;
  }

  try {
    const response = await axios.get(url);
    clubs.value = response.data.map((club) => ({
      ...club,
      selected: false,
      editable: false,
    }));
    console.log("Filtered clubs:", clubs.value);
  } catch (error) {
    console.error("Error filtering clubs:", error);
    error.value = "Failed to filter clubs. Please try again later.";
  }
};

const closeSelectedClubs = async () => {
  const selectedClubs = clubs.value.filter((club) => club.selected);
  for (const club of selectedClubs) {
    try {
      await axios.get(
        `${API_END_POINT}/courtmaster/admin/close-club?clubId=${club.clubId}`
      );
    } catch (error) {
      console.error(`Error closing club ${club.clubId}:`, error);
      error.value = `Failed to close club ${club.clubId}. Please try again later.`;
    }
  }
  await fetchClubs(); // Refresh the club list
};

const openSelectedClubs = async () => {
  const selectedClubs = clubs.value.filter((club) => club.selected);
  for (const club of selectedClubs) {
    try {
      await axios.get(
        `${API_END_POINT}/courtmaster/admin/open-club?clubId=${club.clubId}`
      );
    } catch (error) {
      console.error(`Error opening club ${club.clubId}:`, error);
      error.value = `Failed to open club ${club.clubId}. Please try again later.`;
    }
  }
  await fetchClubs(); // Refresh the club list
};
const toggleEditable = (club) => {
  club.editable = club.selected;
};

const toggleAll = () => {
  clubs.value.forEach((club) => {
    club.selected = selectAll.value;
    club.editable = selectAll.value;
  });
};

onMounted(() => {
  fetchClubs();
});

const updateClubs = async () => {
  const selectedClubs = clubs.value.filter((club) => club.selected);

  for (const club of selectedClubs) {
    try {
      const updateData = {
        clubName: club.clubName,
        description: club.description,
        clubId: club.clubId,
      };

      const response = await axios.post(
        `${API_END_POINT}/courtmaster/admin/update-club`,
        updateData
      );

      console.log(`Club ${club.clubId} updated successfully:`, response.data);
    } catch (error) {
      console.error(`Error updating club ${club.clubId}:`, error);
      error.value = `Failed to update club ${club.clubId}. Please try again later.`;
    }
  }

  // Refresh the club list after updates
  await fetchClubs();
};

const deleteClubs = () => {
  // Implement delete logic
  console.log("Deleting selected clubs...");
};
</script>

  <style>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.logo {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.logo h1 {
  margin-top: 48px;
  color: #6babf4;
}

.table-actions {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
}

.dropdown-status {
  width: 150px;
  height: 40px;
  color: #0d0d0d;
  background: white;
  border-radius: 10px;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.filter_search {
  padding: 36px;
  display: flex;
  justify-content: center;
}

.filter-search {
  width: 100%;
}

.box-search {
  width: 100%;
  font-style: bold;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border: solid #6babf4;
  border-radius: 25px;
  max-width: 50%;
  transition: transform 0.3s ease;
  flex-wrap: wrap;
}

.search {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.search input[type="text"] {
  background-color: white;
  color: black;
  padding: 8px 16px;
  border: none;
  border-radius: 20px 0 0 20px;
  font-size: 16px;
  outline: none;
  width: 100%;
  max-width: 600px;
}

.button-func {
  display: flex;
  flex-wrap: wrap;
}

.button {
  display: flex;
}

.button button[type="submit"] {
  margin-left: -20px;
  background-color: #6babf4;
  border: none;
  color: white;
  font-style: bold;
  cursor: pointer;
  padding: 8px 28px;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
}

.button button[type="submit"]:hover {
  border-radius: 20px 20px 20px 20px;
  transform: scale(1.05);
  color: white;
  background-color: royalblue;
}

.table-container {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: auto;
  border: 2px solid #ddd;
  border-radius: 8px;
}
.table {
  width: 100%;
  border-collapse: collapse;
}

.editable-textarea {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
}

.fixed-header {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.fixed-header thead {
  position: sticky;
  top: 0;
  z-index: 1;
}

.fixed-header th {
  background-color: #6babf4;
  color: white;
  text-align: left;
  padding: 12px;
}

.fixed-header td {
  background-color: white;
  padding: 6px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.fixed-header tr:hover td {
  background-color: #f1f1f1;
}

.actions {
  display: flex;
  justify-content: space-around;
  padding: 18px 0;
  position: sticky;
  top: 0;
  background-color: #6babf4;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-button {
  margin-left: 18px;
  border-radius: 8px;
  margin: 0 10px;
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
}

.action-button.register,
.action-button.update,
.action-button.delete {
  background-color: white;
  color: black;
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.1);
}

.editable-input {
  width: 100%;
  padding: 0px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 15px;
  box-sizing: border-box;
}

.editable-input:focus {
  outline: none;
  border-color: #6babf4;
  box-shadow: 0 0 0 2px rgba(107, 171, 244, 0.2);
}

/* ------------------------------------------------------ */
.footer {
  background-color: #d3d3d3;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
  margin: -5px;
}

.footer img {
  margin-top: -20px;
  padding: 10px;
  width: 20%;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  padding: 1rem 0;
}

.footer-section {
  flex: 1;
  margin: 0 1rem;
}

.footer-section h2 {
  margin-bottom: 0.5rem;
}

.footer-section p,
.footer-section a {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
}

.footer-section svg.icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
  fill: #0d0d0d;
}

/* Center align Contact Us section */
.footer-section.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-section.contact p {
  justify-content: center;
}

/* Center align Follow Us section */
.footer-section.follow-us {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper {
  display: inline-flex;
  list-style: none;
  height: 120px;
  width: 100%;
  font-family: "Poppins", sans-serif;
  justify-content: center;
  padding: 0;
}

.wrapper .icon {
  position: relative;
  background: #fff;
  border-radius: 50%;
  margin: 10px;
  width: 50px;
  height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 14px;
  background: #fff;
  color: #fff;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  background: #fff;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

.wrapper .facebook:hover,
.wrapper .facebook:hover .tooltip,
.wrapper .facebook:hover .tooltip::before {
  background: #1877f2;
  color: #fff;
}

.wrapper .twitter:hover,
.wrapper .twitter:hover .tooltip,
.wrapper .twitter:hover .tooltip::before {
  background: #1da1f2;
  color: #fff;
}

.wrapper .instagram:hover,
.wrapper .instagram:hover .tooltip,
.wrapper .instagram:hover .tooltip::before {
  background: #e4405f;
  color: #fff;
}

.footer-section p i {
  margin-right: 5px;
}

/* ------------------------------------------------------ */

@media (max-width: 768px) {
  .filter_search {
    padding: 20px;
    margin-top: 0;
  }

  .content {
    margin-left: 0;
    padding: 5rem;
  }

  .footer {
    padding: 0.5rem;
  }
}

.no-results {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
}

@media (max-width: 480px) {
  .filter_search {
    padding: 10px;
  }

  .footer {
    font-size: 0.8rem;
  }
}
</style>