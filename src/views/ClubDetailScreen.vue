<template>
  <div class="container">
    <div class="logo">
      <logo />
      <user-avatar />
    </div>

    <div class="content">
      <!-- Nội dung của trang ở đây -->
      <club-detail :clubId="clubId" />
    </div>

    <div class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h2>About Us</h2>
          <p>
            Court Master is a platform that allows you to find and book
            badminton courts easily. Our mission is to provide a seamless and
            efficient way for badminton enthusiasts to connect with available
            courts in their area.
          </p>
        </div>
        <div class="footer-section contact">
          <h2>Contact Us</h2>
          <p>
            <svg
              viewBox="0 0 576 512"
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
            >
              <path
                d="m528 32h-480c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48v-352c0-26.5-21.5-48-48-48zm0 400h-480v-352h480zm-320-176c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2zm241.6-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8h-112c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8h-112c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8h-112c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8z"
              />
            </svg>
            Court Master Service
          </p>

          <p>
            <svg
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
            >
              <path
                d="m497.39 361.8-112-48a24 24 0 0 0 -28 6.9l-49.6 60.6a370.66 370.66 0 0 1 -177.19-177.19l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112a24.16 24.16 0 0 0 -27.5-13.9l-104 24a24 24 0 0 0 -18.6 23.39c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0 -14.01-27.6z"
              />
            </svg>
            Phone: +84 23456 7890
          </p>
          <p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
            >
              <path
                d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm3.519 0L12 11.671 18.481 6H5.52zM20 7.329l-7.341 6.424a1 1 0 0 1-1.318 0L4 7.329V18h16V7.329z"
                fill="#0D0D0D"
              />
            </svg>
            Email: courtmaster@company.com
          </p>
        </div>
        <div class="footer-section follow-us">
          <h2>Follow Us</h2>
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
import { useRoute } from "vue-router";
import ClubDetail from "../components/Detail/ClubDetail.vue";
import Logo from "../components/Detail/Logo.vue";
import UserAvatar from "../components/Detail/UserAvatar.vue";

const route = useRoute();
const clubId = ref(route.params.clubId);

onMounted(() => {
  console.log("Club ID:", clubId.value);
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
  margin-bottom: auto;
}

.content {
  flex-grow: 1;
  padding: 1rem;
  margin: 0 20%;
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

/* Responsive styles */
@media (max-width: 1200px) {
  .content {
    margin: 0 10%;
  }
}

@media (max-width: 768px) {
  .content {
    margin: 0 5%;
  }

  .logo {
    flex-direction: column;
    align-items: center;
  }

  .footer {
    padding: 0.5rem;
  }
}
</style>