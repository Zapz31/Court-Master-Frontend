<template>
  <div class="container">
    <div class="logo">
      <logo />
      <h1>Quản lí nhân viên</h1>
      <user-avatar />
    </div>
    <div class="filter_search">
      <div class="box-search">
        <div class="search">
          <input
            v-model="searchTerm"
            placeholder="Nhập số điện thoại hoặc tên"
            type="text"
          />
          <div class="button-func">
            <div class="button">
              <button @click="searchStaff" type="submit" class="button">
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
          <a href="/register-staff" class="action-button register">Đăng ký</a>
          <button @click="updateUsers" class="action-button update">
            Cập nhật
          </button>

          <button @click="deleteUsers" class="action-button delete">Xóa</button>
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
                <th>Họ</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Ngày sinh</th>
                <!-- <th>Ngày tham gia</th> -->
                <th>Ảnh</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.userId">
                <td>
                  <input
                    type="checkbox"
                    v-model="user.selected"
                    @change="toggleEditable(user)"
                  />
                </td>
                <td>{{ user.userId }}</td>
                <td>
                  <input
                    v-model="user.firstName"
                    :disabled="!user.editable"
                    class="editable-input"
                  />
                </td>
                <td>
                  <input
                    v-model="user.lastName"
                    :disabled="!user.editable"
                    class="editable-input"
                  />
                </td>
                <td>
                  <input
                    v-model="user.email"
                    type="email"
                    :disabled="!user.editable"
                    class="editable-input"
                  />
                </td>
                <td>
                  <input
                    v-model="user.phoneNumber"
                    type="tel"
                    :disabled="!user.editable"
                    class="editable-input"
                  />
                </td>
                <td>
                  <input
                    v-model="user.birthDay"
                    type="date"
                    :disabled="!user.editable"
                    class="editable-input"
                  />
                </td>
                <!-- <td>{{ formatDate(user.registerDate) }}</td> -->
                <td>
                  <img
                    :src="user.avatarImage || defaultAvatarPath"
                    :alt="user.name"
                    class="avatar-image"
                    @error="handleImageError"
                  />
                </td>
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
import Logo from "../components/Homepage/Logo.vue";
import UserAvatar from "../components/Homepage/UserAvatar.vue";
const defaultAvatarPath = "../../public/img/default.png";
const searchTerm = ref("");
const actionStatus = ref("");
const updateStatus = ref("");

const handleImageError = (event) => {
  event.target.src = defaultAvatarPath;
};
const users = ref([]);
const selectAll = ref(false);

const getUserIdFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    return user.userId ? user.userId.trim() : null;
  }
  return null;
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const [year, month, day] = dateString.split("-");
  return day && month && year ? `${day}/${month}/${year}` : "N/A";
};

const fetchUsers = async () => {
  const courtManagerId = getUserIdFromLocalStorage();
  if (!courtManagerId) {
    console.error("Court manager ID not found in localStorage");
    return;
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/courtmaster/courtmanager/get-all-staff?court_manager_id=${courtManagerId}`
    );
    users.value = response.data.map((user) => ({
      ...user,
      selected: false,
      name:
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : "N/A",
      registerDate: user.registerDate || "N/A",
      avatarImage: user.imageUrlString || "N/A",
      firstName: user.firstName || "N/A",
      lastName: user.lastName || "N/A",
      phoneNumber: user.phoneNumber || "N/A",
      email: user.email || "N/A",
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
const searchStaff = async () => {
  const courtManagerId = getUserIdFromLocalStorage();
  if (!courtManagerId) {
    console.error("Court manager ID not found in localStorage");
    return;
  }

  try {
    const query = searchTerm.value;
    const payload = {
      courtManagerId: courtManagerId.trim(), // Ensure no trailing spaces
      search: query,
    };
    const response = await axios.post(
      `http://localhost:8080/courtmaster/courtmanager/search-staff`,
      payload
    );
    users.value = response.data.map((user) => ({
      ...user,
      selected: false,
      name: `${user.firstName}  ${user.lastName}`,
      registerDate: "N/A", // This field is not provided in the API response
      avatarImage: user.imageUrlString,
    }));
  } catch (error) {
    console.error(
      "Error searching staff:",
      error.response ? error.response.data : error.message
    );
  }
};

const toggleEditable = (user) => {
  user.editable = user.selected;
};

const toggleAll = () => {
  users.value.forEach((user) => {
    user.selected = selectAll.value;
    user.editable = selectAll.value;
  });
};

const updateSingleUser = async (user) => {
  const courtManagerId = getUserIdFromLocalStorage();
  if (!courtManagerId) {
    console.error("Court manager ID not found in localStorage");
    return false;
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/courtmaster/courtmanager/update-staff",
      {
        staffId: user.userId.trim(),
        courtManagerId: courtManagerId.trim(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthday: user.birthDay,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};

const updateUsers = async () => {
  const selectedUsers = users.value.filter((user) => user.selected);
  if (selectedUsers.length === 0) {
    updateStatus.value = "Không có nhân viên nào được chọn để cập nhật.";
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const user of selectedUsers) {
    const result = await updateSingleUser(user);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
  }

  updateStatus.value = `Cập nhật hoàn tất. Thành công: ${successCount}, Thất bại: ${failCount}`;

  await fetchUsers();
};

function addUser() {
  // Implement add user logic
}

const deleteSingleUser = async (user) => {
  const courtManagerId = getUserIdFromLocalStorage();
  if (!courtManagerId) {
    console.error("Court manager ID not found in localStorage");
    return false;
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/courtmaster/courtmanager/delete-staff`,
      {
        params: {
          staff_id: user.userId.trim(),
          court_manager_id: courtManagerId.trim(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};

const deleteUsers = async () => {
  const selectedUsers = users.value.filter((user) => user.selected);
  if (selectedUsers.length === 0) {
    actionStatus.value = "Không có nhân viên nào được chọn để xóa.";
    return;
  }

  if (
    !confirm(
      `Bạn có chắc chắn muốn xóa ${selectedUsers.length} nhân viên đã chọn?`
    )
  ) {
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const user of selectedUsers) {
    const result = await deleteSingleUser(user);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
  }

  actionStatus.value = `Xóa hoàn tất. Thành công: ${successCount}, Thất bại: ${failCount}`;

  await fetchUsers();
};

onMounted(() => {
  fetchUsers();
});
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
  border: 2px solid #ddd;
  border-radius: 8px;
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
  justify-content: flex-start;
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
}

.editable-input:focus {
  outline: none;
  border-color: #6babf4;
  box-shadow: 0 0 0 2px rgba(107, 171, 244, 0.2);
}

.avatar-image {
  align-items: center;
  width: 100px; /* Adjust this value as needed */
  height: 130px; /* Adjust this value as needed */
  object-fit: cover;
  border-radius: 5%;
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