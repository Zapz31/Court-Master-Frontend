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
            @mouseenter="handleMouseEnter(time, court, $event)"
            @mouseup="handleMouseUp"
            @mouseleave="hidePopup"
          >
            <slot-popup
              v-if="showPopup"
              :show="true"
              :style="{
                left: popupPosition.x + 'px',
                top: popupPosition.y + 'px',
              }"
              class="slot-popup"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template> 

<script setup>
import { computed, defineProps, ref, watch } from "vue";
import { useScheduleStore } from "../../stores/scheduleStore";
import SlotPopup from "../Schedule/SessionPopup.vue";

const props = defineProps({
  selectedDate: {
    type: String,
    required: true,
  },
});

const scheduleStore = useScheduleStore();

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

// Tạo danh sách để lưu trữ các phiên chơi
const sessions = ref([]);

//dữ liệu cần truyền cho 1 phiên chơi
// =====================================TEST BACKEND DATA===========================================
const initializeSessions = () => {
  sessions.value.push({
    startTime: "16:30",
    endTime: "18:30",
    court: 9,
    status: "booked",
    date: "18/06/2024",
  });
  sessions.value.push({
    startTime: "14:30",
    endTime: "16:00",
    court: 5,
    status: "booked",
    date: "19/06/2024",
  });

  sessions.value.push({
    startTime: "14:30",
    endTime: "16:00",
    court: 8,
    status: "booked",
    date: "20/06/2024",
  });

  sessions.value.push({
    startTime: "06:30",
    endTime: "08:00",
    court: 1,
    status: "booked",
    date: "21/06/2024",
  });

  sessions.value.push({
    startTime: "12:30",
    endTime: "15:00",
    court: 3,
    status: "booked",
    date: "22/06/2024",
  });

  sessions.value.push({
    startTime: "15:00",
    endTime: "20:00",
    court: 3,
    status: "bookedByUser",
    date: "23/06/2024",
  });
};

// =================================================================================================

// Khởi tạo dữ liệu mẫu
initializeSessions();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const filteredSessions = ref([]);

watch(
  () => props.selectedDate,
  (newDate) => {
    filterSessionsByDate(newDate);
  },
  { immediate: true }
);

function filterSessionsByDate(date) {
  if (date === "") {
    // Nếu không có ngày được chọn, không hiển thị bất kỳ session nào
    filteredSessions.value = [];
  } else {
    const formattedDate = formatDate(date); // Chuyển đổi ngày sang định dạng "dd/mm/yyyy"
    filteredSessions.value = sessions.value.filter(
      (session) => session.date === formattedDate
    );
  }
}

let isDragging = ref(false);
let dragStartCell = ref(null);
let selectedCells = ref([]);

//Xanh duong dam: cua người khác đặt (đẩy từ BE)
//Cam: cua người dùng đặt từ trước đó (đẩy từ BE)
//Xanh lá: Chọn giờ chơi mới (FE)
const handleMouseDown = (time, court) => {
  const startTime = formatTime(time);
  const cell = filteredSessions.value.find(
    (session) =>
      session.court === court &&
      startTime >= session.startTime &&
      startTime < session.endTime
  );

  if (cell) {
    if (cell.status === "selected") {
      // Xóa dữ liệu khung giờ chơi hiện tại
      scheduleStore.startTime = "";
      scheduleStore.endTime = "";
      scheduleStore.court = null;
      scheduleStore.price = 0;

      // Hiển thị lại thông tin của khung giờ chơi trước đó (nếu có)
      const previousSession = filteredSessions.value.find(
        (session) =>
          session.court === court &&
          session.endTime < cell.startTime &&
          session.status === "selected"
      );

      if (previousSession) {
        scheduleStore.updateScheduleInfo(
          previousSession.startTime,
          previousSession.endTime,
          court
        );
      }

      // Xóa các ô đã được chọn
      filteredSessions.value = filteredSessions.value.filter(
        (session) =>
          !(
            session.court === court &&
            session.startTime === cell.startTime &&
            session.status === "selected"
          )
      );
      return;
    }
    return; // Không làm gì nếu ô đã được đặt chỗ hoặc đã được đặt bởi người dùng
  }

  isDragging.value = true;
  dragStartCell.value = { time: startTime, court: court };
  selectedCells.value = [{ time: startTime, court: court }];
  updateSession(startTime, court, true);
};

const showPopup = ref(false);
const hoveredSession = ref(null);
const popupPosition = ref({ x: 0, y: 0 });

const handleMouseEnter = (time, court, event) => {
  if (isDragging.value) {
    const startTime = dragStartCell.value.time;
    const currentTime = formatTime(time);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [currentHour, currentMinute] = currentTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    const timeDiff = Math.abs(currentTotalMinutes - startTotalMinutes);
    const steps = timeDiff / 30;

    selectedCells.value = [];

    for (let i = 0; i <= steps; i++) {
      const newTime =
        startTotalMinutes +
        (currentTotalMinutes > startTotalMinutes ? i : -i) * 30;
      selectedCells.value.push({ time: formatTime(newTime), court: court });
      updateSession(formatTime(newTime), court, false);
    }
  } else {
    const session = filteredSessions.value.find(
      (session) =>
        session.court === court &&
        session.startTime <= formatTime(time) &&
        formatTime(time) < session.endTime &&
        (session.status === "bookedByUser" || session.status === "selected")
    );
    if (session) {
      showPopup.value = true;
      hoveredSession.value = session;
      const cellRect = event.currentTarget.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const popupHeight = 80; // Chiều cao ước tính của popup

      // Kiểm tra xem popup có bị che bởi thanh thông tin hay không
      const bottomOffset = windowHeight - cellRect.bottom;
      if (bottomOffset < popupHeight) {
        // Nếu có, hiển thị popup ở phía trên ô
        popupPosition.value = {
          x: cellRect.right,
          y: cellRect.top - popupHeight,
        };
      } else {
        // Nếu không, hiển thị popup bên cạnh ô
        popupPosition.value = {
          x: cellRect.right,
          y: cellRect.top,
        };
      }
    } else {
      hidePopup();
    }
  }
};
const hidePopup = () => {
  showPopup.value = false;
  hoveredSession.value = null;
};
const handleMouseUp = () => {
  isDragging.value = false;
  const sessionStart = selectedCells.value[0].time;
  const sessionEnd = selectedCells.value[selectedCells.value.length - 1].time;
  const court = selectedCells.value[0].court;
  const existingSession =
    scheduleStore.court === court && scheduleStore.endTime === sessionStart;
  if (existingSession) {
    scheduleStore.endTime = sessionEnd;
    scheduleStore.calculatePrice();
  } else {
    scheduleStore.updateScheduleInfo(sessionStart, sessionEnd, court);
  }
  selectedCells.value = [];
};
const updateSession = (time, court, isStart) => {
  const cell = filteredSessions.value.find(
    (session) =>
      session.court === court &&
      time >= session.startTime &&
      time < session.endTime
  );
  if (cell) {
    return; // Không làm gì nếu ô đã được đặt chỗ hoặc đã được đặt bởi người dùng
  }
  const existingSession = filteredSessions.value.find(
    (session) =>
      session.court === court &&
      session.endTime === time &&
      session.status === "selected"
  );
  if (existingSession && !isStart) {
    existingSession.endTime = formatTime(
      parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]) + 30
    );
  } else if (isStart) {
    filteredSessions.value.push({
      startTime: time,
      endTime: formatTime(
        parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]) + 30
      ),
      court: court,
      status: "selected",
    });
  }
};
const getCellClass = (time, court) => {
  const formattedTime = formatTime(time);
  const session = filteredSessions.value.find(
    (session) =>
      session.court === court &&
      formattedTime >= session.startTime &&
      formattedTime < session.endTime
  );
  if (session) {
    if (session.status === "booked") {
      return "booked";
    } else if (session.status === "bookedByUser") {
      return "bookedByUser ";
    } else if (session.status === "selected") {
      return "selected";
    }
  }
  return "";
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