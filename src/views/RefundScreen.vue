<template>
  <div class="container">
    <div class="logo">
      <logo />
      <h1>Danh sách chờ hoàn tiền</h1>
      <user-avatar />
    </div>
    <div class="filter_search">
      <filter-search class="filter-search" />
    </div>
    <div class="content">
      <!-- Table here -->
      <div class="table-container">
        <table class="fixed-header">
          <thead>
            <tr>
              <th>Customer Phone Number</th>
              <th>Customer Name</th>
              <th>Court Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Booking Date</th>
              <th>Check-in Status</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="booking in pendingCheckIns"
              :key="
                booking.customerPhoneNumber +
                booking.startTime +
                booking.bookingDate +
                booking.badmintonCourtName
              "
            >
              <td>{{ booking.customerPhoneNumber }}</td>
              <td>{{ booking.customerFullName }}</td>
              <td>{{ booking.badmintonCourtName }}</td>
              <td>{{ formatTime(booking.startTime) }}</td>
              <td>{{ booking.endTime }}</td>
              <td>{{ formatDate(booking.bookingDate) }}</td>
              <td class="status-cell">
                <button
                  @click="checkInStore.performCheckIn(booking.bookingSlotId)"
                  class="check-in"
                >
                  Check-in
                </button>
              </td>
              <td>{{ formatPrice(booking.price) }}₫</td>
            </tr>
          </tbody>
        </table>
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
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import FilterSearch from "../components/Check-in/FilterSearch.vue";
import Logo from "../components/StaffHomepage/Logo.vue";
import UserAvatar from "../components/StaffHomepage/UserAvatar.vue";
import { useCheckInStore } from "../stores/checkInStore";

const checkInStore = useCheckInStore();
const { pendingCheckIns } = storeToRefs(checkInStore);

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatTime = (time) => {
  if (!time) return "";
  const parts = time.split(":");
  if (parts.length < 2) return time;
  const hours = parts[0].padStart(2, "0");
  const minutes = parts[1].padStart(2, "0");
  return `${hours}:${minutes}`;
};

onMounted(async () => {
  await checkInStore.fetchUnCheckinList();
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

.content {
  max-width: 3000px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem;
}

.filter_search {
  padding: 0;
  display: flex;
  justify-content: center;
}

.filter-search {
  width: 100%;
}

.table-container {
  max-height: 500px; /* Set the height you want for the table container */
  overflow-y: auto;
}

.fixed-header {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  border: 2px solid #ddd; /* Đường viền đậm hơn */
}

.fixed-header thead th {
  position: sticky;
  top: 0;
  background-color: #6babf4; /* Light blue background for headers */
  color: white; /* White text color for headers */
  text-align: left;
  z-index: 1;
}

.fixed-header th,
.fixed-header td {
  text-align: center;
  border: 1px solid #ddd; /* Đường viền đậm hơn */
  padding: 8px;
}

.fixed-header tr:hover {
  background-color: #f1f1f1; /* Light grey background for row hover */
}

.status-cell button {
  padding: 5px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.status-cell button:hover {
  background-color: #6babf4; /* Light blue background for button hover */
  color: white; /* White text color for button hover */
}

.status-cell button.checked-in {
  background-color: #4caf50;
  color: white;
}

.status-cell button:not(.checked-in) {
  background-color: #f44336;
  color: white;
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
    padding: 0.5rem;
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