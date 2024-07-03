<template>
  <!-- Phân quyền cho từng role (có thể chỉnh sửa nhanh) -->
  <div class="dropdown" @click="toggleMenu">
    <div v-if="userRole === 'guest'" class="box-login">
      <router-link class="button" to="/login"><h5>Login</h5></router-link>
    </div>
    <div v-else class="box">
      <div class="username">
        <h4>{{ authStore.user.firstName }} {{ authStore.user.lastName }}</h4>
      </div>
      <div class="avatar">
        <img :src="getImageUrl(authStore.user.imageURL)" :alt="userName" />
      </div>
      <div v-if="menuVisible" class="dropdown-content">
        <template v-if="userRole === 'customer'">
          <router-link to="/customer/profile">View Profile</router-link>
          <router-link to="/customer/booking">My Booking</router-link>

          <button @click="signout">Log out</button>
          <!-- Thêm các router-link khác cho customer -->
        </template>
        <template v-else-if="userRole === 'staff'">
          <router-link to="/staff/orders">Manage Orders</router-link>
          <router-link to="/staff/customers">Manage Customers</router-link>
          <router-link to="/customer/profile">My Profile</router-link>

          <button @click="signout">Log out</button>
          <!-- Thêm các router-link khác cho staff -->
        </template>
        <template v-else-if="userRole === 'manager'">
          <router-link to="/manager/reports">Reports</router-link>
          <router-link to="/manager/settings">Settings</router-link>
          <router-link to="/customer/profile">My Profile</router-link>
          <router-link to="/customer/profile">Manage my court</router-link>

          <button @click="signout">Log out</button>
          <!-- Thêm các router-link khác cho manager -->
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

// const { user } = storeToRefs(authStore);
const link = ref("");
const userName = ref("");
//  link.value = user.value.imageURL;
//  userName.value = user.value.firstName;

// ===========================================DATA TEST==============================================
const props = defineProps({
  userRole: {
    type: String,
    //de test nhap role bang tay vao
    default: "customer",
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
const getImageUrl = (base64String) => {
  return `data:image/png;base64,${base64String}`;
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
  authStore.loadUserFromLocalStorage();
  console.log(authStore.user.imageURL);
  console.log(1);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const signout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/courtmaster/auth/signout",
      {},
      { withCredentials: true }
    );

    console.log(response.data);
    authStore.logout();
    deleteCookie('uwu')
    // router.push("/login");
    window.location.replace("/login");
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
  }
};

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

const getImageUrl = (base64String) => {
  return `data:image/png;base64,${base64String}`;
};

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

.dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 16.5px;
}

.dropdown-content button:hover {
  background-color: #ddd;
}
</style>
