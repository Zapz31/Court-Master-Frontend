<template>
    <div class="container">
        <div class="logo">
            <logo />
            <page-name/>
            <user-avatar />
        </div>
        <div class="content">
            <general/>
            <location/>
            <booking-type/>
        </div>
        <div class="footer">
            <h2>Developed by Court Master team</h2>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Logo from "../components/ClubRegister/Logo.vue";
import UserAvatar from "../components/ClubRegister/UserAvatar.vue";
import PageName from "../components/ClubRegister/PageName.vue";
import General from "../components/ClubRegister/General.vue";
import Location from "../components/ClubRegister/Location.vue";
import BookingType from "../components/ClubRegister/BookingType.vue";
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