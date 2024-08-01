<template>
    <div class="container">
        <div class="logo">
            <logo />
            <page-name />
            <user-avatar />
        </div>
        <div class="filter_search" v-click-outside="closeDropdowns">
            <filter-search ref="filterSearchRef" />
        </div>
        <div class="content">
            <slot-detail />
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
                            <svg viewBox="0 0 320 512" height="1.2em" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                                </path>
                            </svg>
                        </li>
                        <li class="icon twitter">
                            <span class="tooltip">Twitter</span>
                            <svg height="1.8em" fill="currentColor" viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg" class="twitter">
                                <path
                                    d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429">
                                </path>
                            </svg>
                        </li>
                        <li class="icon instagram">
                            <span class="tooltip">Instagram</span>

                            <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" fill="currentColor"
                                class="bi bi-instagram" viewBox="0 0 16 16">
                                <path
                                    d="M8 0c2.13 0 2.406.01 3.25.047.844.037 1.42.16 1.937.34.522.182.966.426 1.406.865.44.44.683.884.865 1.406.18.516.303 1.093.34 1.937C15.99 5.594 16 5.87 16 8s-.01 2.406-.047 3.25c-.037.844-.16 1.42-.34 1.937-.182.522-.426.966-.865 1.406-.44.44-.884.683-1.406.865-.516.18-1.093.303-1.937.34C10.406 15.99 10.13 16 8 16s-2.406-.01-3.25-.047c-.844-.037-1.42-.16-1.937-.34-.522-.182-.966-.426-1.406-.865-.44-.44-.683-.884-.865-1.406-.18-.516-.303-1.093-.34-1.937C.01 10.406 0 10.13 0 8s.01-2.406.047-3.25c.037-.844.16-1.42.34-1.937.182-.522.426-.966.865-1.406.44-.44.884-.683 1.406-.865.516-.18 1.093-.303 1.937-.34C5.594.01 5.87 0 8 0zm0 1.459c-2.085 0-2.333.01-3.157.045-.807.035-1.245.166-1.535.276-.386.15-.662.326-.95.614-.287.288-.463.564-.614.95-.11.29-.241.728-.276 1.535-.036.824-.045 1.072-.045 3.157 0 2.085.01 2.333.045 3.157.035.807.166 1.245.276 1.535.15.386.326.662.614.95.288.287.564.463.95.614.29.11.728.241 1.535.276.824.036 1.072.045 3.157.045 2.085 0 2.333-.01 3.157-.045.807-.035 1.245-.166 1.535-.276.386-.15.662-.326.95-.614.287-.288.463-.564.614-.95.11-.29.241-.728.276-1.535.036-.824.045-1.072.045-3.157 0-2.085-.01-2.333-.045-3.157-.035-.807-.166-1.245-.276-1.535-.15-.386-.326-.662-.614-.95-.288-.287-.564-.463-.95-.614-.29-.11-.728-.241-1.535-.276-.824-.036-1.072-.045-3.157-.045zM8 3.918a4.082 4.082 0 1 0 0 8.164 4.082 4.082 0 0 0 0-8.164zM8 10.7a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4zm5.243-6.558a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z">
                                </path>
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
import { ref, onMounted } from "vue";
import FilterSearch from "../components/BookingSlot/FilerSearch.vue";
import Logo from "../components/BookingSlot/Logo.vue";
import UserAvatar from "../components/BookingSlot/UserAvatar.vue";
import PageName from "../components/BookingSlot/PageName.vue";
import SlotDetail from "../components/BookingSlot/SlotDetail.vue";


const filterSearchRef = ref(null);


const closeDropdowns = () => {
    if (filterSearchRef.value) {
        filterSearchRef.value.closeAllDropdowns();
    }
};

</script>

<style>
.filter_search {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 36px;
    margin-bottom: auto;
    margin-top: -100px;
}

.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.logo {
    display: flex;
    justify-content: space-between;
}

.content {
    flex-grow: 1;
    padding: 1rem;
}

.footer {
    margin: -6px;
    background-color: lightgray;
    padding: 1rem;
    text-align: center;
    margin-top: auto;
    /* Đẩy footer xuống cuối trang */
}
</style>