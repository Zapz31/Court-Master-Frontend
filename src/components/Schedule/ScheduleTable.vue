<template>
  <div>
    <table
      @mousedown.prevent="handleTableMouseDown"
      @mouseup="handleTableMouseUp"
      @mouseleave="handleTableMouseLeave"
    >
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
            @mousedown.prevent="handleMouseDown(time, court)"
            @mouseenter="handleMouseEnter(time, court, $event)"
            @mouseup="handleMouseUp"
            @mouseleave="hidePopup"
          >
            <!-- <slot-popup
              v-if="showPopup"
              :show="true"
              :style="{
                left: popupPosition.x + 'px',
                top: popupPosition.y + 'px',
              }"
              class="slot-popup"
            /> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template> 

<script setup>
import { computed, ref, watch } from "vue";
import { useScheduleStore } from "../../stores/scheduleStore";

const scheduleStore = useScheduleStore();

const courtCount = 10;

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

const slots = ref([]);

const initializeslots = () => {
  slots.value = [
    {
      startTime: "16:30",
      endTime: "18:30",
      court: 9,
      status: "booked",
      date: "18/06/2024",
    },

    {
      startTime: "16:30",
      endTime: "18:30",
      court: 1,
      status: "booked",
      date: "18/06/2024",
    },

    {
      startTime: "18:30",
      endTime: "20:30",
      court: 1,
      status: "booked",
      date: "18/06/2024",
    },

    {
      startTime: "14:30",
      endTime: "16:00",
      court: 5,
      status: "booked",
      date: "19/06/2024",
    },
    {
      startTime: "14:30",
      endTime: "16:00",
      court: 8,
      status: "booked",
      date: "20/06/2024",
    },
    {
      startTime: "06:30",
      endTime: "08:00",
      court: 1,
      status: "booked",
      date: "21/06/2024",
    },
    {
      startTime: "12:30",
      endTime: "15:00",
      court: 3,
      status: "booked",
      date: "22/06/2024",
    },
    {
      startTime: "15:00",
      endTime: "20:00",
      court: 3,
      status: "bookedByUser",
      date: "23/06/2024",
    },
  ];
};

initializeslots();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const filteredslots = ref([]);

watch(
  () => scheduleStore.selectedDate,
  (newDate) => {
    filterslotsByDate(newDate);
  },
  { immediate: true }
);

function filterslotsByDate(date) {
  if (date === "") {
    filteredslots.value = [];
  } else {
    const formattedDate = formatDate(date);
    filteredslots.value = slots.value.filter(
      (slot) => slot.date === formattedDate
    );
  }
}

let isDragging = ref(false);
let dragStartCell = ref(null);
let selectedCells = ref([]);

const handleTableMouseDown = (event) => {
  event.preventDefault();
};

const handleTableMouseUp = () => {
  if (isDragging.value) {
    handleMouseUp();
  }
};

const handleTableMouseLeave = () => {
  if (isDragging.value) {
    handleMouseUp();
  }
};

const handleMouseDown = (time, court) => {
  const startTime = formatTime(time);
  const cell = filteredslots.value.find(
    (slot) =>
      slot.court === court &&
      startTime >= slot.startTime &&
      startTime < slot.endTime
  );

  if (cell && cell.status === "selected") {
    scheduleStore.removeslotByTimeAndCourt(cell.startTime, court);
    filteredslots.value = filteredslots.value.filter(
      (slot) =>
        !(
          slot.court === court &&
          slot.startTime === cell.startTime &&
          slot.status === "selected"
        )
    );
    return;
  }

  if (cell) return;

  isDragging.value = true;
  dragStartCell.value = { time: startTime, court: court };
  selectedCells.value = [{ time: startTime, court: court }];
  updateslot(startTime, court, true);
};

const showPopup = ref(false);
const hoveredslot = ref(null);
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
      updateslot(formatTime(newTime), court, false);
    }
  } else {
    const slot = filteredslots.value.find(
      (slot) =>
        slot.court === court &&
        slot.startTime <= formatTime(time) &&
        formatTime(time) < slot.endTime &&
        (slot.status === "bookedByUser" || slot.status === "selected")
    );
    if (slot) {
      showPopup.value = true;
      hoveredslot.value = slot;
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
  hoveredslot.value = null;
};
const handleMouseUp = () => {
  if (!isDragging.value) return;

  isDragging.value = false;
  let slotStart = selectedCells.value[0].time;
  let slotEnd = selectedCells.value[selectedCells.value.length - 1].time;
  const court = selectedCells.value[0].court;

  // Ensure start time is always before end time
  if (slotStart > slotEnd) {
    [slotStart, slotEnd] = [slotEnd, slotStart];
  }

  const existingslotIndex = scheduleStore.slots.findIndex(
    (slot) => slot.startTime === slotStart && slot.court === court
  );

  if (existingslotIndex === -1) {
    scheduleStore.addslot(slotStart, slotEnd, court);
  } else {
    scheduleStore.updateslotEndTime(existingslotIndex, slotEnd);
  }

  // Recalculate hours and price
  const startMinutes = timeToMinutes(slotStart);
  const endMinutes = timeToMinutes(slotEnd);
  const hours = Math.abs(endMinutes - startMinutes) / 60;
  const price = hours * scheduleStore.hourlyRate;

  // Update the slot with correct values
  scheduleStore.updateslot({
    startTime: slotStart,
    endTime: slotEnd,
    court,
    hours,
    price,
  });

  selectedCells.value = [];
};
const removeslot = (time, court) => {
  const slotIndex = scheduleStore.slots.findIndex(
    (slot) => slot.startTime === time && slot.court === court
  );
  if (slotIndex !== -1) {
    scheduleStore.removeslot(slotIndex);
  }
};

const updateslot = (time, court, isStart) => {
  const cell = filteredslots.value.find(
    (slot) =>
      slot.court === court && time >= slot.startTime && time < slot.endTime
  );
  if (cell) {
    return; // Không làm gì nếu ô đã được đặt chỗ hoặc đã được đặt bởi người dùng
  }
  const existingslot = filteredslots.value.find(
    (slot) =>
      slot.court === court &&
      slot.endTime === time &&
      slot.status === "selected"
  );
  if (existingslot && !isStart) {
    existingslot.endTime = formatTime(
      parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]) + 30
    );
  } else if (isStart) {
    filteredslots.value.push({
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
  const slot = filteredslots.value.find(
    (slot) =>
      slot.court === court &&
      formattedTime >= slot.startTime &&
      formattedTime < slot.endTime
  );
  if (slot) {
    if (slot.status === "booked") {
      return "booked";
    } else if (slot.status === "bookedByUser") {
      return "bookedByUser";
    } else if (slot.status === "selected") {
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