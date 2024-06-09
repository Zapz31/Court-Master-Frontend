<template>
  <div>
    <table>
      <thead>
        <tr>
          <th class="time-column">Time</th>
          <th v-for="court in courtCount" :key="court">Court {{ court }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(time, timeIndex) in times" :key="time">
          <td class="time-column">{{ formatTime(time) }}</td>
          <td
            v-for="court in courtCount"
            :key="court"
            :class="getCellClass(time, court)"
            @mousedown="handleMouseDown(time, court)"
            @mouseenter="handleMouseEnter(time, court)"
            @mouseup="handleMouseUp"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script setup>
import { computed, ref } from "vue";

const courtCount = 10; // Thay đổi giá trị này tùy theo số sân của CLB

// Time được fixed cố định 24h tức 48 hàng
const times = computed(() => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      times.push(hour * 60 + minute);
    }
  }
  return times;
});

const formatTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

// Tạo danh sách để lưu trữ trạng thái của các ô
const cellStates = ref([]);

// Hàm khởi tạo dữ liệu mẫu
const initializeCellStates = () => {
  for (let time of times.value) {
    for (let court = 1; court <= courtCount; court++) {
      cellStates.value.push({
        time: formatTime(time),
        court: court,
        status: "empty",
      });
    }
  }
};

// Khởi tạo dữ liệu mẫu
initializeCellStates();

// ========================================DATA TEST================================================
cellStates.value.find(
  (cell) => cell.time === "00:30" && cell.court === 9
).status = "booked"; // Ví dụ một ô đã được đặt chỗ
cellStates.value.find(
  (cell) => cell.time === "01:30" && cell.court === 5
).status = "booked"; // Ví dụ một ô đã được đặt chỗ
cellStates.value.find(
  (cell) => cell.time === "02:00" && cell.court === 3
).status = "bookedByUser"; // Ví dụ một ô đã được đặt bởi người dùng
// =================================================================================================

let isDragging = ref(false);
let dragStartCell = ref(null);

const handleMouseDown = (time, court) => {
  const cell = cellStates.value.find(
    (cell) => cell.time === formatTime(time) && cell.court === court
  );

  if (cell.status === "booked" || cell.status === "bookedByUser") {
    return; // Không làm gì nếu ô đã được đặt chỗ hoặc đã được đặt bởi người dùng
  }

  isDragging.value = true;
  dragStartCell.value = { time: formatTime(time), court: court };
  updateCellState(time, court);
};

const handleMouseEnter = (time, court) => {
  if (isDragging.value) {
    updateCellState(time, court);
  }
};

const handleMouseUp = () => {
  isDragging.value = false;
};

const updateCellState = (time, court) => {
  const cell = cellStates.value.find(
    (cell) => cell.time === formatTime(time) && cell.court === court
  );

  if (cell.status === "booked" || cell.status === "bookedByUser") {
    return; // Không làm gì nếu ô đã được đặt chỗ hoặc đã được đặt bởi người dùng
  }

  if (cell.status === "empty") {
    cell.status = "selected";
  } else if (cell.status === "selected") {
    cell.status = "empty";
  }
};

const getCellClass = (time, court) => {
  const cell = cellStates.value.find(
    (cell) => cell.time === formatTime(time) && cell.court === court
  );

  if (cell.status === "booked") {
    return "booked";
  } else if (cell.status === "bookedByUser") {
    return "bookedByUser";
  } else if (cell.status === "selected") {
    return "selected";
  } else {
    return "";
  }
};
</script>
  
  <style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1.5px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  color: white;
  background-color: #6babf4;
  font-weight: bold;
  position: sticky;
  top: 64px;
  z-index: 5;
  border-bottom: 2px solid #ddd; /* Thêm viền ngăn cách phía dưới các thẻ <th> */
}

.time-column {
  font-style: bold;
  color: white;
  background-color: #6babf4;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #e6e6e6;
}

td {
  cursor: pointer;
}

td.booked {
  background-color: cornflowerblue;
  cursor: not-allowed;
}

td.bookedByUser {
  background-color: orange;
  cursor: not-allowed;
}

td.selected {
  background-color: #32cd32; /* Màu xanh lá */
}

tbody tr:first-child td {
  border-top: 2px solid #ddd; /* Thêm viền ngăn cách phía trên hàng đầu tiên của bảng */
}
</style>
  