<template>
  <div class="container">
    <div class="logo">
      <logo />
      <h1>Trang chủ nhân viên</h1>
      <user-avatar />
    </div>

    <div class="staff-homepage">
      <div class="button-container">
        <router-link to="/staff/checkin" class="nav-button">
          <div class="icon-text">
            <svg
              height="60"
              viewBox="0 0 60.601004 60.601004"
              width="60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m7.7705009 56.04988c-1.7775001 0-3.2187503-1.44125-3.2187503-3.21875v-45.0612539c0-1.7775001 1.4412502-3.2187502 3.2187503-3.2187502h45.0600041c1.7775 0 3.21875 1.4412501 3.21875 3.2187502v45.0612539c0 1.7775-1.44125 3.21875-3.21875 3.21875z"
                fill="#fff"
                stroke="#000"
                stroke-width=".60625"
              />
              <path
                d="m40.389252 16.706128c1.56375 0 2.83125-1.26875 2.83125-2.8325s-1.2675-2.83125-2.83125-2.83125c-1.565 0-2.8325 1.2675-2.8325 2.83125s1.2675 2.8325 2.8325 2.8325"
              />
              <path
                d="m51.460503 30.867379h-4.47875l.44875-8.560001c.155-2.19125-1.39875-4.17-3.608751-4.4975-1.12-.165-2.2675-.25375-3.4325-.25375-1.82125 0-3.59125.21125-5.29125.6075-.18375.0425-.33375.17-.41125.3375l-5.322501 11.401251h2.95l2.807501-4.855.41125 5.82h-26.4287524v1.93h26.5637524l1.16125 16.478751h3.07625v-16.146251h.965v16.146251h3.0775l1.15625-16.478751h6.356251z"
              />
              <path
                d="m20.143001 16.706128c1.565 0 2.83375-1.26875 2.83375-2.8325s-1.26875-2.83125-2.83375-2.83125c-1.5625 0-2.83125 1.2675-2.83125 2.83125s1.26875 2.8325 2.83125 2.8325"
              />
              <path
                d="m16.416751 22.022378.90875 3.935c-.8475 1.21375-1.55625 2.533751-2.105 3.932501l9.847501.0012c-.54875-1.4-1.2575-2.720001-2.10625-3.935001l.90875-3.93375 1.5525 2.69c.2775.48.79625.805 1.39125.805.64625 0 1.2-.3825 1.4575-.93l2.26625-4.86375h-2.41l-1.08625 2.04375-1.71-3.085c-.0825-.14875-.2175-.2675-.38125-.3225-1.50625-.52-3.123751-.80375-4.807501-.80375-1.2275 0-2.42.1525-3.56125.43625-1.5675.39-2.68 1.665-2.945 3.16l-1.54875 8.750001h2.2275l2.10125-7.880001"
              />
            </svg>
            <span>Danh sách check-in</span>
          </div>
        </router-link>
        <router-link to="/staff/checkedin" class="nav-button">
          <div class="icon-text">
            <svg
              height="60"
              viewBox="0 0 60.601004 60.601004"
              width="60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m7.7705009 56.04988c-1.7775001 0-3.2187503-1.44125-3.2187503-3.21875v-45.0612539c0-1.7775001 1.4412502-3.2187502 3.2187503-3.2187502h45.0600041c1.7775 0 3.21875 1.4412501 3.21875 3.2187502v45.0612539c0 1.7775-1.44125 3.21875-3.21875 3.21875z"
                fill="#fff"
                stroke="#000"
                stroke-width=".60625"
              />
              <path
                d="m40.389252 16.706128c1.56375 0 2.83125-1.26875 2.83125-2.8325s-1.2675-2.83125-2.83125-2.83125c-1.565 0-2.8325 1.2675-2.8325 2.83125s1.2675 2.8325 2.8325 2.8325"
              />
              <path
                d="m51.460503 30.867379h-4.47875l.44875-8.560001c.155-2.19125-1.39875-4.17-3.608751-4.4975-1.12-.165-2.2675-.25375-3.4325-.25375-1.82125 0-3.59125.21125-5.29125.6075-.18375.0425-.33375.17-.41125.3375l-5.322501 11.401251h2.95l2.807501-4.855.41125 5.82h-26.4287524v1.93h26.5637524l1.16125 16.478751h3.07625v-16.146251h.965v16.146251h3.0775l1.15625-16.478751h6.356251z"
              />
              <path
                d="m20.143001 16.706128c1.565 0 2.83375-1.26875 2.83375-2.8325s-1.26875-2.83125-2.83375-2.83125c-1.5625 0-2.83125 1.2675-2.83125 2.83125s1.26875 2.8325 2.83125 2.8325"
              />
              <path
                d="m16.416751 22.022378.90875 3.935c-.8475 1.21375-1.55625 2.533751-2.105 3.932501l9.847501.0012c-.54875-1.4-1.2575-2.720001-2.10625-3.935001l.90875-3.93375 1.5525 2.69c.2775.48.79625.805 1.39125.805.64625 0 1.2-.3825 1.4575-.93l2.26625-4.86375h-2.41l-1.08625 2.04375-1.71-3.085c-.0825-.14875-.2175-.2675-.38125-.3225-1.50625-.52-3.123751-.80375-4.807501-.80375-1.2275 0-2.42.1525-3.56125.43625-1.5675.39-2.68 1.665-2.945 3.16l-1.54875 8.750001h2.2275l2.10125-7.880001"
              />
            </svg>
            <span>Danh sách đã check-in</span>
          </div>
        </router-link>
        <router-link to="/staff/court" class="nav-button">
          <div class="icon-text">
            <svg
              height="60"
              viewBox="0 0 64 64"
              width="60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C10.89 2 10 2.89 10 4V8H4C2.89 8 2 8.89 2 10V60C2 61.11 2.89 62 4 62H60C61.11 62 62 61.11 62 60V10C62 8.89 61.11 8 60 8H54V4C54 2.89 53.11 2 52 2S50 2.89 50 4V8H14V4C14 2.89 13.11 2 12 2zM4 22H60V60H4V22zM26 36H14V48H26V36zM30 36V48H44V36H30zM48 36V48H58V36H48z"
              />
            </svg>
            Hoạt động sân động sân
          </div>
        </router-link>

        <div @click="navigateToSchedule" class="nav-button">
          <div class="icon-text">
            <svg
              height="60"
              viewBox="0 0 64 64"
              width="60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C10.89 2 10 2.89 10 4V8H4C2.89 8 2 8.89 2 10V60C2 61.11 2.89 62 4 62H60C61.11 62 62 61.11 62 60V10C62 8.89 61.11 8 60 8H54V4C54 2.89 53.11 2 52 2S50 2.89 50 4V8H14V4C14 2.89 13.11 2 12 2zM4 22H60V60H4V22zM26 36H14V48H26V36zM30 36V48H44V36H30zM48 36V48H58V36H48z"
              />
            </svg>
            Đặt sân cho khách
          </div>
        </div>

        <div @click="navigateToStaffSchedule" class="nav-button">
          <div class="icon-text">
            <svg
              height="60"
              viewBox="0 0 64 64"
              width="60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C10.89 2 10 2.89 10 4V8H4C2.89 8 2 8.89 2 10V60C2 61.11 2.89 62 4 62H60C61.11 62 62 61.11 62 60V10C62 8.89 61.11 8 60 8H54V4C54 2.89 53.11 2 52 2S50 2.89 50 4V8H14V4C14 2.89 13.11 2 12 2zM4 22H60V60H4V22zM26 36H14V48H26V36zM30 36V48H44V36H30zM48 36V48H58V36H48z"
              />
            </svg>
            Lịch vận hành câu lạc bộ
          </div>
        </div>

        <!-- <router-link to="/staff/refund" class="nav-button">
          <i class="fas fa-calendar-alt"></i>
          Danh sách chờ hoàn tiền 
        </router-link> -->
      </div>
    </div>
    <br />

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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import UserAvatar from "../components/Homepage/UserAvatar.vue";
import Logo from "../components/StaffHomepage/Logo.vue";
import { useAuthStore } from "../stores/auth";
import { useClubStore } from "../stores/clubMng";
const API_END_POINT = import.meta.env.VITE_API_URL;
const clubStore = useClubStore();
const router = useRouter();
const authStore = useAuthStore();
const clubId = ref(null);

onMounted(async () => {
  await fetchClubId();
});

async function fetchClubId() {
  const staffId = authStore.user.userId;
  try {
    const response = await axios.get(
      `${API_END_POINT}/courtmaster/staff/get-clubId-by-userId?staffId=${staffId}`
    );
    clubId.value = response.data.clubId;
    console.log("Club ID:", clubId.value);
  } catch (error) {
    console.error("Error fetching clubId:", error);
  }
}

async function navigateToSchedule() {
  try {
    if (!clubId.value) {
      await fetchClubId();
    }

    if (clubId.value) {
      await clubStore.fetchClubById(clubId.value, authStore.user.userId);
      router.push({
        name: "ScheduleScreen",
        params: { clubId: clubId.value },
      });
    } else {
      console.error("Club ID is not available");
      alert(
        "Unable to navigate to the schedule. Please ensure you're associated with a club."
      );
    }
  } catch (error) {
    console.error("Error navigating to staff schedule:", error);
    alert(
      "An error occurred while trying to navigate to the schedule. Please try again."
    );
  }
}

async function navigateToStaffSchedule() {
  try {
    if (!clubId.value) {
      await fetchClubId();
    }

    if (clubId.value) {
      await clubStore.fetchClubById(clubId.value, authStore.user.userId);
      router.push({
        name: "ViewScheduleScreen",
        params: { clubId: clubId.value },
      });
    } else {
      console.error("Club ID is not available");
      alert(
        "Unable to navigate to the schedule. Please ensure you're associated with a club."
      );
    }
  } catch (error) {
    console.error("Error navigating to staff schedule:", error);
    alert(
      "An error occurred while trying to navigate to the schedule. Please try again."
    );
  }
}

onMounted(async () => {
  if (!currentClub.value) {
    await clubStore.fetchClubById(route.params.clubId, authStore.userId);
  }
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

.filter_search {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px;
  margin-bottom: auto;
  margin-top: -100px;
}

.content {
  max-width: 3000px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.staff-homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.button-container {
  margin-top: -80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.nav-button {
  margin: 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  text-decoration: none;
  font-size: 1.2rem;
  color: black;
  background-color: whitesmoke;
  /*box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); Box shadow */
  border: 2px solid #6babf4; /* Added border */
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.nav-button:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Shadow on hover */
}

.nav-button i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.icon-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-text svg {
  margin-bottom: 8px;
}

.icon-text span {
  font-size: 16px; /* Adjust as necessary */
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

.club-list {
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.club-card {
  padding: 20px;
  width: 250px;
  height: 350px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.club-card:hover {
  transform: scale(1.05);
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */
}

.club-image {
  border-radius: 20px;
  width: 100%;
  height: 200px;
  object-fit: cover;
}

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