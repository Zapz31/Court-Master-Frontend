<template>
  <div class="dashboard">
    <header class="header">
      <div class="logo">
        <img
          src="../../public/img/mono_white_crop.png"
          alt="Logo Court Master"
        />
      </div>
      <h1>Bảng Điều Khiển</h1>
      <div class="user-info">
        <img
          src="../../public/img/avatarCourtMaster.jpg"
          alt="Avatar Người Dùng"
        />
      </div>
    </header>

    <section class="summary">
      <div class="summary-card">
        <h2>Tổng Doanh Thu</h2>
        <p>{{ formatCurrency(totalRevenue) }} ₫</p>
        <span :class="getPercentageClass(revenuePercentage)"
          >{{ revenuePercentage }}% tháng trước</span
        >
      </div>
      <div class="summary-card">
        <h2>Tổng Đặt Sân</h2>
        <p>{{ totalBookings }}</p>
        <span :class="getPercentageClass(bookingsPercentage)"
          >{{ bookingsPercentage }}% tháng trước</span
        >
      </div>
      <div class="summary-card">
        <h2>Tổng Khách Hàng</h2>
        <p>{{ totalCustomers }}</p>
        <span :class="getPercentageClass(customersPercentage)"
          >{{ customersPercentage }}% tháng trước</span
        >
      </div>
    </section>

    <section class="charts">
      <div class="chart">
        <h3>Doanh Thu Tháng</h3>
        <canvas id="revenueChart"></canvas>
      </div>
      <div class="chart">
        <h3>Số Lượng Đặt Sân</h3>
        <canvas id="bookingsChart"></canvas>
      </div>
    </section>

    <section class="customers">
      <h3>Top 5 Khách Hàng Thân Thiết</h3>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Thời Gian Chơi (giờ)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in loyalCustomers" :key="customer.id">
            <td><img :src="customer.avatar" alt="Avatar Khách Hàng" /></td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.playTime }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
  
  <script setup>
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import axios from "axios";

// Dữ liệu mẫu
const totalRevenue = ref();
const totalBookings = ref();
const totalCustomers = ref();

const authStore = useAuthStore();

const clubId = ref('');

const revenuePercentage = ref();
const bookingsPercentage = ref();
const customersPercentage = ref();

const loyalCustomers = ref([
  {
    id: 1,
    name: "Helena",
    email: "helena@example.com",
    avatar: "../../public/img/avatarCourtMaster.jpg",
    playTime: 120,
    loyaltyPoints: 1500,
  },
  {
    id: 2,
    name: "Oscar",
    email: "oscar@example.com",
    avatar: "../../public/img/avatarCourtMaster.jpg",
    playTime: 100,
    loyaltyPoints: 1200,
  },
  // Thêm nhiều khách hàng khác nếu cần
]);

const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);

const dailyRevenue = ref([]);
const dailyBookings = ref([]);



// Lay club id thong qua court manager id
const fetchClubId = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/courtmaster/courtmanager/get-clubId-by-cId`, {
      params: {
        userId: authStore.user.userId
      }
    });
    clubId.value = response.data.clubId;
  } catch (error) {
    console.error('Error fetching clubId:', error);
  }
};

const fetchDashboardData = async () => {
  if (!clubId.value) {
    console.error('ClubId is not set');
    return;
  }

  const requestBody = {
    clubId: "C0000001",
    year: year.value,
    month: 8
  };

  try {
    const [revenueResponse, bookingsResponse, totalRevenueResponse, totalBookingResponse, totalCustomerResponse] = await Promise.all([
      axios.post('http://localhost:8080/courtmaster/courtmanager/get-daily-revenue', requestBody),
      axios.post('http://localhost:8080/courtmaster/courtmanager/get-daily-booking', requestBody),
      axios.post('http://localhost:8080/courtmaster/courtmanager/gettotalrevenueinfor', requestBody),
      axios.post('http://localhost:8080/courtmaster/courtmanager/gettotalbookinginfor', requestBody),
      axios.post('http://localhost:8080/courtmaster/courtmanager/gettotalcustomernumber', requestBody),
    ]);

    dailyRevenue.value = transformDailyData(revenueResponse.data);
    dailyBookings.value = bookingsResponse.data;
    totalRevenue.value = totalRevenueResponse.data.totalRevenue;
    revenuePercentage.value = totalRevenueResponse.data.percentVariation;
    totalBookings.value = totalBookingResponse.data.totalBookingSlot;
    bookingsPercentage.value = totalBookingResponse.data.percentVariation;
    totalCustomers.value = totalCustomerResponse.data.totalCustomer;
    customersPercentage.value = totalCustomerResponse.data.percentVariation;


  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

const transformDailyData = (data) => {
  // Create an object to store aggregated data by date
  const aggregatedData = {};

  // Aggregate the data by date
  data.forEach(item => {
    const date = new Date(item.paymentTime).getDate();
    if (!aggregatedData[date]) {
      aggregatedData[date] = { paymentTime: date, amount: 0 };
    }
    aggregatedData[date].amount += item.amount;
  });

  // Convert the aggregated data object back to an array
  return Object.values(aggregatedData).sort((a, b) => a.paymentTime - b.paymentTime);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN").format(value);
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const generateDailyData = (days, startValue, increment) => {
  let data = [];
  for (let day = 1; day <= days; day++) {
    data.push({
      day: day,
      value: startValue + day * increment,
    });
  }
  return data;
};

// Lấy tháng và năm hiện tại
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

// Dữ liệu doanh thu hàng ngày
// const dailyRevenue = ref(
//   generateDailyData(daysInCurrentMonth, 50000000, 1000000)
// );

// Dữ liệu đặt sân hàng ngày
// const dailyBookings = ref(generateDailyData(daysInCurrentMonth, 100, 5));

onMounted(async () => {
  await fetchClubId();
  await fetchDashboardData();


  // Biểu đồ doanh thu
  const ctxRevenue = document.getElementById("revenueChart").getContext("2d");
  new Chart(ctxRevenue, {
    type: "bar",
    data: {
      labels: dailyRevenue.value.map((item) => item.paymentTime),
      datasets: [
        {
          label: "Doanh Thu",
          data: dailyRevenue.value.map((item) => item.amount),
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return formatCurrency(value) + "₫";
            },
          },
        },
      },
    },
  });

  // Biểu đồ đặt sân
  const ctxBookings = document.getElementById("bookingsChart").getContext("2d");
  new Chart(ctxBookings, {
    type: "bar",
    data: {
      labels: dailyBookings.value.map((item) => item.bookingDate),
      datasets: [
        {
          label: "Đặt Sân",
          data: dailyBookings.value.map((item) => item.numberOfBooking),
          backgroundColor: "rgba(75, 192, 192, 0.7)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value.toLocaleString();
            },
          },
        },
      },
    },
  });
});

const getPercentageClass = (percentage) => {
  return percentage >= 0 ? "percentage-increase" : "percentage-decrease";
};
</script>
  
  <style scoped>
.dashboard {
  font-family: Arial, sans-serif;
  padding: 50px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6babf4;
  color: white;
  border-radius: 10px;
  padding: 10px 30px;
}

.logo img {
  width: 100px;
  margin-right: 10px;
  border-radius: 0;
}

.user-info img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.summary {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.summary-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  flex: 1;
  margin: 0 10px;
}

.charts {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.chart {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  margin: 0 10px;
}

.customers,
.court-rankings {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.percentage-increase {
  color: green;
}

.percentage-decrease {
  color: red;
}
</style>
  