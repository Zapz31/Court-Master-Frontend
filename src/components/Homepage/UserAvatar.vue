<template>
  <!-- Phân quyền cho từng role (có thể chỉnh sửa nhanh) -->
  <div class="dropdown" @click="toggleMenu">
    <div v-if="userRole === 'guest'" class="box-login">
      <router-link class="button" to="/login"><h5>Login</h5></router-link>
    </div>
    <div v-else class="box">
      <div class="username">
        <h4>{{ userName }}</h4>
      </div>
      <div class="avatar">
        <img :src="userAvatar" :alt="userName" />
      </div>
      <div v-if="menuVisible" class="dropdown-content">
        <template v-if="userRole === 'customer'">
          <router-link to="/customer/orders">My Orders</router-link>
          <router-link to="/customer/profile">My Profile</router-link>
          <router-link to="/logout">Logout</router-link>
          <!-- Thêm các router-link khác cho customer -->
        </template>
        <template v-else-if="userRole === 'staff'">
          <router-link to="/staff/orders">Manage Orders</router-link>
          <router-link to="/staff/customers">Manage Customers</router-link>
          <router-link to="/logout">Logout</router-link>
          <!-- Thêm các router-link khác cho staff -->
        </template>
        <template v-else-if="userRole === 'manager'">
          <router-link to="/manager/reports">Reports</router-link>
          <router-link to="/manager/settings">Settings</router-link>
          <router-link to="/logout">Logout</router-link>
          <!-- Thêm các router-link khác cho manager -->
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

// ===========================================DATA TEST==============================================
const props = defineProps({
  userRole: {
    type: String,
    //de test nhap role bang tay vao
    default: "manager",
  },
  userName: {
    type: String,
    default: "Doan Minh Tien",
  },
  userAvatar: {
    type: String,
    default: "../../../public/img/avatarCourtMaster.jpg",
  },
});

// ===========================================DATA TEST==============================================

const menuVisible = ref(false);

const toggleMenu = () => {
  if (props.userRole !== "guest") {
    menuVisible.value = !menuVisible.value;
  }
};

//handle outside click
const handleOutsideClick = (event) => {
  const dropdown = event.target.closest(".dropdown");
  if (!dropdown) {
    menuVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});
//
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
/* ------------------------------------------ */

.box-login {
  margin-top: 58px;
  background: #6babf4;
  border-radius: 48px;
  padding: 0px 56px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}
.box-login,
.button {
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}
.box-login:hover {
  background-color: royalblue;
}

/* ------------------------------------------ */

.box {
  margin-top: 50px;
  background: #6babf4;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}
.box:hover {
  background-color: royalblue;
}
.username h4 {
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  color: white;
  text-decoration: none; /* Loại bỏ gạch dưới */
}
.avatar img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
.dropdown-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 12px;
  z-index: 1;
  border-radius: 8px;
  top: 68%;
  left: 10px;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: #ddd;
}
</style>
