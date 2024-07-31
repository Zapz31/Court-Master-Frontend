<template>
  <!-- Phân quyền cho từng role (có thể chỉnh sửa nhanh) -->
  <div class="dropdown" @click="toggleMenu">
    <div v-if="authStore.user.userId === ''" class="box-login">
      <button class="button" @click="backToLogin"><h5>Đăng nhập</h5></button>
    </div>
    <div v-else class="box">
      <div class="username">
        <h4>{{ authStore.user.firstName }} {{ authStore.user.lastName }}</h4>
      </div>
      <div class="avatar">
        <img :src="getImageUrl(authStore.user.imageURL)" :alt="userName" />
      </div>
      <div
        v-if="menuVisible"
        class="dropdown-overlay"
        @click="toggleMenu"
      ></div>
      <div :class="['dropdown-content', { active: menuVisible }]">
        <div class="dropdown-items">
          <div class="info-dropdown">
            <div class="username">
              <h4>
                {{ authStore.user.firstName }} {{ authStore.user.lastName }}
              </h4>
            </div>
            <div class="avatar">
              <img
                :src="getImageUrl(authStore.user.imageURL)"
                :alt="userName"
              />
            </div>
          </div>

          <template v-if="authStore.user.role === 'USER_CUSTOMER'">
            <router-link to="/customer/profile">Xem hồ sơ</router-link>
            <router-link to="/customer/booking">Lịch đã đặt</router-link>

            <button @click="signout">Log out</button>
            <!-- Thêm các router-link khác cho customer -->
          </template>
          <template
            class="staff"
            v-else-if="authStore.user.role === 'USER_COURT_STAFF'"
          >
            <router-link to="/staff/orders">Quản lý lịch đặt</router-link>
            <router-link to="/staff/customers">Quản lí khách hàng</router-link>
            <router-link to="/customer/profile">Xem hồ sơ</router-link>

            <button @click="signout">Log out</button>
          </template>
          <template v-else-if="authStore.user.role === 'USER_COURT_MANAGER'">
            <a @click="navigateToClub">Câu lạc bộ của tôi</a>
            <!-- <a @click="navigateToSchedule">Đặt sân cho khách</a> -->
            <router-link to="/manager/dashboard">Báo cáo</router-link>
            <a href="/register-staff">Đăng kí tài khoản nhân viên</a>
            <router-link to="/customer/profile">Xem hồ sơ cá nhân</router-link>
            <router-link to="/manager/court">Quản lí sân</router-link>
            <router-link to="/manager-staffs">Quản lí nhân viên</router-link>

            <button @click="signout">Log out</button>
            <!-- Thêm các router-link khác cho manager -->
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useClubStore } from "../../stores/clubMng";
const clubStore = useClubStore();
const authStore = useAuthStore();

// const { user } = storeToRefs(authStore);
const link = ref("");
const userName = ref("");

const backToLogin = () => {
  window.location.replace("/login");
};
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

const router = useRouter();

const navigateToClub = async () => {
  try {
    if (!clubStore.clubId) {
      await clubStore.fetchClubIdByManagerId(authStore.user.userId);
    }
    if (clubStore.clubId) {
      console.log("Navigating to club:", clubStore.clubId);
      router.push(`/clubs/${clubStore.clubId}`);
    } else {
      console.log("ClubId not available, redirecting to club registration");
      router.push("/clubs");
    }
  } catch (error) {
    console.error("Error fetching clubId:", error);
    console.log("Redirecting to club registration due to error");
    router.push("/clubs");
  }
};

// const navigateToSchedule = async () => {
//   try {
//     if (!clubStore.clubId) {
//       await clubStore.fetchClubIdByManagerId(authStore.user.userId);
//     }
//     if (clubStore.clubId) {
//       console.log("Navigating to schedule:", clubStore.clubId);
//       router.push(`/schedule/${clubStore.clubId}`);
//     } else {
//       console.log("ClubId not available, redirecting to club registration");
//       router.push("/clubs");
//     }
//   } catch (error) {
//     console.error("Error fetching clubId:", error);
//     console.log("Redirecting to club registration due to error");
//     router.push("/clubs");
//   }
// };

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

onMounted(async () => {
  document.addEventListener("click", handleOutsideClick);
  authStore.loadUserFromLocalStorage();
  try {
    await clubStore.fetchClubIdByManagerId(authStore.user.userId);
  } catch (error) {
    console.error("Error fetching clubId on mount:", error);
  }
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
    // router.push("/login");
    window.location.replace("/login");
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
  }
};

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
  z-index: 1000;
}

.box-login {
  margin-top: 58px;
  background: #6babf4;
  border-radius: 48px;
  padding: 0px 56px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.box-login .button {
  font-size: 18px;
  font-weight: bold;
  border: none;
  color: white;
  text-decoration: none;
  background: #6babf4;
}

.box {
  z-index: 1999;
  margin-top: 50px;
  background: #6babf4;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.box:hover {
  background-color: #5a9ae3;
}

.username h4 {
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.avatar img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-left: 10px;
}

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.dropdown-content {
  position: fixed;
  top: 0;
  right: -400px;
  width: 300px;
  height: 100vh;
  background-color: #f8f9fa;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.dropdown-content.active {
  right: 0;
}

.info-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.info-dropdown .username {
  margin-right: 15px;
}

.info-dropdown .username h4 {
  color: #333;
  font-size: 18px;
  margin: 0;
}

.info-dropdown .avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #6babf4;
}

.dropdown-content a,
.dropdown-content button {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 16px;
  transition: background-color 0.2s;
  border-radius: 5px;
}

.dropdown-content a:hover,
.dropdown-content button:hover {
  background-color: #e9ecef;
}

.dropdown-content button:last-child {
  margin-top: 20px;
  color: #dc3545;
  font-weight: bold;
}
</style>

