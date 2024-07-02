<template>
  <div>
    <table
      ref="scheduleTable"
      @mousedown.prevent="handleTableMouseDown"
      @mouseup="handleTableMouseUp"
      @mouseleave="handleTableMouseLeave"
    >
      <thead>
        <tr>
          <th class="time-column">Time</th>
          <th v-for="court in sortedCourts" :key="court.courtId">
            {{ court.courtName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(time, timeIndex) in times" :key="time">
          <td
            class="time-column"
            :class="{
              'disabled-time': !isTimeWithinTimeframes(formatTime(time)),
            }"
          >
            {{ formatTime(time) }}
          </td>
          <td
            v-for="court in sortedCourts"
            :key="court.courtId"
            :class="[
              getCellClass(time, court.courtId),
              {
                dragging:
                  isDragging &&
                  selectedCells.some(
                    (cell) =>
                      cell.time === formatTime(time) &&
                      cell.court === court.courtId
                  ),
                'disabled-cell': !isTimeWithinTimeframes(formatTime(time)),
              },
            ]"
            @mousedown.prevent="handleMouseDown(time, court.courtId)"
            @mouseenter="handleMouseEnter(time, court.courtId, $event)"
            @mouseup="handleMouseUp"
            @mouseleave="hidePopup"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useClubStore } from "../../stores/clubMng";
import { useScheduleStore } from "../../stores/scheduleStore";

const props = defineProps({
  clubId: {
    type: String,
    required: true,
  },
});

const scheduleStore = useScheduleStore();
const clubStore = useClubStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { currentClub } = storeToRefs(clubStore);

const sortedCourts = computed(() => {
  if (currentClub.value && currentClub.value.courtList) {
    return [...currentClub.value.courtList].sort((a, b) =>
      a.courtId.localeCompare(b.courtId)
    );
  }
  return [];
});

const times = computed(() => {
  const times = [];
  for (let minutes = 0; minutes <= 24 * 60; minutes += 30) {
    times.push(minutes);
  }
  return times;
});

const currentTime = ref(new Date());

const currentTimeInMinutes = computed(() => {
  const hours = currentTime.value.getHours();
  const minutes = currentTime.value.getMinutes();
  return hours * 60 + minutes;
});

const updateCurrentTime = () => {
  currentTime.value = new Date();
};

onMounted(() => {
  fetchBookings();
  updateCurrentTime();
  setInterval(updateCurrentTime, 60000); // Cập nhật mỗi phút
  scrollToCurrentTime();
});

const isCurrentDate = computed(() => {
  const today = new Date();
  const selectedDate = new Date(scheduleStore.selectedDate);
  return (
    today.getDate() === selectedDate.getDate() &&
    today.getMonth() === selectedDate.getMonth() &&
    today.getFullYear() === selectedDate.getFullYear()
  );
});

const formatTime = (time) => {
  if (typeof time === "number") {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
  return time;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const normalizeEndTime = (time) => {
  if (time === "23:59:59" || time === "23:59") {
    return "24:00";
  }
  return time.slice(0, 5);
};

const bookings = ref([]);
const fetchBookings = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/courtmaster/api/test/get-all-bookedlist-${props.clubId}`
    );
    const formattedBookings = formatBookings(response.data);
    bookings.value = formattedBookings;

    scheduleStore.clearSlots();
    formattedBookings.forEach((booking) => {
      scheduleStore.addSlot(
        booking.startTime,
        booking.endTime,
        booking.court,
        booking.status,
        booking.date,
        user.value?.userId
      );
    });

    // Wait for the DOM to update before scrolling
    await nextTick();
    scrollToCurrentTime();
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

const formatBookings = (bookings) => {
  if (!user.value || !user.value.userId) {
    console.error("User is not logged in or user ID is not set.");
    return bookings.map((booking) => ({
      startTime: formatTime(booking.startTime.split(":").slice(0, 2).join(":")),
      endTime: normalizeEndTime(booking.endTime),
      date: formatDate(booking.bookingDate),
      court: booking.courtId,
      status: "booked",
    }));
  }

  return bookings.map((booking) => ({
    startTime: formatTime(booking.startTime.split(":").slice(0, 2).join(":")),
    endTime: normalizeEndTime(booking.endTime),
    date: formatDate(booking.bookingDate),
    court: booking.courtId,
    status:
      booking.userId.trim() === user.value.userId.trim()
        ? "bookedByUser"
        : "booked",
  }));
};

const filteredSlots = computed(() => {
  if (scheduleStore.selectedDate === "") {
    return [];
  }
  const formattedDate = formatDate(scheduleStore.selectedDate);
  return scheduleStore.slots.filter((slot) => slot.date === formattedDate);
});

onMounted(fetchBookings);

watch(() => props.clubId, fetchBookings);

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

const isPastTime = (date, time) => {
  const selectedDateTime = new Date(date);
  const [hours, minutes] = time.split(":").map(Number);
  selectedDateTime.setHours(hours, minutes, 0, 0);
  return selectedDateTime < new Date();
};

// New function to check if a given time is within any of the club's timeframes
const isTimeWithinTimeframes = (time) => {
  if (!currentClub.value || !currentClub.value.timeFrame) return false;

  const [hours, minutes] = time.split(":").map(Number);
  const currentMinutes = hours * 60 + minutes;

  return currentClub.value.timeFrame.some((frame) => {
    const [startHours, startMinutes] = frame.starTime.split(":").map(Number);
    const [endHours, endMinutes] = frame.endTime.split(":").map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    return (
      currentMinutes >= startTotalMinutes && currentMinutes < endTotalMinutes
    );
  });
};

const handleMouseDown = (time, court) => {
  const startTime = formatTime(time);
  if (!isTimeWithinTimeframes(startTime)) return;

  // Kiểm tra thời gian quá khứ cho tất cả các ngày
  if (isPastTime(scheduleStore.selectedDate, startTime)) return;

  // Chỉ kiểm tra thời gian trong quá khứ nếu là ngày hiện tại
  if (
    isCurrentDate.value &&
    timeToMinutes(startTime) < currentTimeInMinutes.value
  )
    return;

  const cell = filteredSlots.value.find(
    (slot) =>
      slot.court === court &&
      startTime >= slot.startTime &&
      startTime < slot.endTime
  );

  if (cell && cell.status === "selected") {
    scheduleStore.removeSlot(cell.startTime, court);
    return;
  }

  if (cell) return;

  isDragging.value = true;
  dragStartCell.value = { time: startTime, court: court };
  selectedCells.value = [{ time: startTime, court: court }];
};

const updateSlot = async (time, court, isStart) => {
  const formattedDate = formatDate(scheduleStore.selectedDate);
  const cell = filteredSlots.value.find(
    (slot) =>
      slot.court === court &&
      slot.date === formattedDate &&
      time >= slot.startTime &&
      time <= slot.endTime
  );
  if (cell) {
    return;
  }
  const existingSlot = filteredSlots.value.find(
    (slot) =>
      slot.court === court &&
      slot.date === formattedDate &&
      slot.endTime === time &&
      slot.status === "selected"
  );

  if (existingSlot && !isStart) {
    const newEndTime = formatTime(
      Math.min(
        24 * 60,
        parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]) + 30
      )
    );
    try {
      await scheduleStore.updateSlot({
        ...existingSlot,
        endTime: newEndTime,
        status: "selected", // Đảm bảo trạng thái là 'selected'
      });
    } catch (error) {
      console.error("Error updating slot:", error);
    }
  } else if (isStart) {
    const endTime = formatTime(
      Math.min(
        24 * 60,
        parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]) + 30
      )
    );
    try {
      await scheduleStore.addSlot(
        time,
        endTime,
        court,
        "selected",
        formattedDate
      );
    } catch (error) {
      console.error("Error adding slot:", error);
    }
  }
};

const handleMouseEnter = (time, court, event) => {
  const currentTime = formatTime(time);
  if (!isTimeWithinTimeframes(currentTime)) return;

  // Kiểm tra thời gian quá khứ
  if (isPastTime(scheduleStore.selectedDate, currentTime)) return;
  if (isDragging.value && isTimeWithinTimeframes(formatTime(time))) {
    if (isDragging.value) {
      const startTime = dragStartCell.value.time;
      const currentTime = formatTime(time);
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [currentHour, currentMinute] = currentTime.split(":").map(Number);

      const startTotalMinutes = startHour * 60 + startMinute;
      const currentTotalMinutes = currentHour * 60 + currentMinute;

      const timeDiff = Math.abs(currentTotalMinutes - startTotalMinutes);
      const steps = Math.floor(timeDiff / 30);

      selectedCells.value = [];

      for (let i = 0; i <= steps; i++) {
        const newTime =
          startTotalMinutes +
          (currentTotalMinutes >= startTotalMinutes ? i : -i) * 30;
        const formattedNewTime = formatTime(newTime);
        selectedCells.value.push({ time: formattedNewTime, court: court });
      }
    }
  } else {
    const slot = filteredSlots.value.find(
      (slot) =>
        slot.court === court &&
        slot.startTime <= formatTime(time) &&
        formatTime(time) < slot.endTime &&
        (slot.status === "bookedByUser" || slot.status === "selected")
    );
  }
};

const handleMouseUp = async () => {
  if (!isDragging.value) return;

  isDragging.value = false;
  let slotStart = selectedCells.value[0].time;
  let slotEnd = selectedCells.value[selectedCells.value.length - 1].time;
  const court = selectedCells.value[0].court;

  if (slotStart > slotEnd) {
    [slotStart, slotEnd] = [slotEnd, slotStart];
  }
  // Kiểm tra xem thời gian bắt đầu có nằm trong quá khứ không
  if (isPastTime(scheduleStore.selectedDate, slotStart)) {
    selectedCells.value = [];
    return;
  }

  const formattedDate = formatDate(scheduleStore.selectedDate);

  // Ensure the slotEnd does not exceed 24:00
  if (slotEnd === "23:59") {
    slotEnd = "24:00";
  }

  // Check if the start and end times are the same
  if (slotStart === slotEnd) {
    // Do not add or update slot
    selectedCells.value = [];
    return;
  }

  const existingSlotIndex = scheduleStore.slots.findIndex(
    (slot) =>
      slot.startTime === slotStart &&
      slot.court === court &&
      slot.date === formattedDate
  );

  if (existingSlotIndex === -1) {
    await scheduleStore.addSlot(
      slotStart,
      slotEnd,
      court,
      "selected",
      formattedDate
    );
  } else {
    await scheduleStore.updateSlotEndTime(existingSlotIndex, slotEnd);
  }

  const startMinutes = timeToMinutes(slotStart);
  const endMinutes = timeToMinutes(slotEnd);
  const hours = Math.abs(endMinutes - startMinutes) / 60;
  const price = hours * scheduleStore.hourlyRate;

  await scheduleStore.updateSlot({
    startTime: slotStart,
    endTime: slotEnd,
    court,
    hours,
    price,
    date: formattedDate,
    status: "selected",
  });

  selectedCells.value = [];
};
const getCellClass = (time, court) => {
  const formattedTime = formatTime(time);
  const cellTimeInMinutes = timeToMinutes(formattedTime);
  const slot = filteredSlots.value.find(
    (slot) =>
      slot.court === court &&
      formattedTime >= slot.startTime &&
      (formattedTime < slot.endTime || formattedTime === slot.endTime)
  );

  const classes = [];

  if (slot) {
    classes.push(slot.status);
  }

  if (
    isDragging.value &&
    selectedCells.value.some(
      (cell) => cell.time === formattedTime && cell.court === court
    )
  ) {
    classes.push("selected");
  }

  if (!isTimeWithinTimeframes(formattedTime)) {
    classes.push("disabled-cell");
  }

  if (isCurrentDate.value) {
    // Thêm lớp cho ô hiện tại
    if (
      cellTimeInMinutes <= currentTimeInMinutes.value &&
      cellTimeInMinutes + 30 > currentTimeInMinutes.value
    ) {
      classes.push("current-time");
    }

    // Vô hiệu hóa các ô trong quá khứ chỉ cho ngày hiện tại
    if (cellTimeInMinutes < currentTimeInMinutes.value) {
      classes.push("past-time");
    }
  }
  if (isPastTime(scheduleStore.selectedDate, formattedTime)) {
    classes.push("past-time");
  }

  return classes.join(" ");
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const scrollToCurrentTime = () => {
  if (!isCurrentDate.value) return;

  const currentTimeStr = formatTime(currentTimeInMinutes.value);

  const rows = document.querySelectorAll("td.time-column");
  for (const row of rows) {
    if (row.textContent.trim() === currentTimeStr) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
      break;
    }
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
  border-bottom: 2px solid #ddd;
}

.time-column {
  font-style: bold;
  color: white;
  background-color: #6babf4;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.current-time {
  position: relative;
}

.current-time::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ff00ae3d;
  pointer-events: none;
}

.past-time {
  cursor: not-allowed;
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

.disabled-cell {
  background-color: lightgrey;
  cursor: not-allowed;
}

td.bookedByUser {
  background-color: orange;
  cursor: not-allowed;
}

td.selected {
  background-color: #32cd32 !important;
}

tbody tr:first-child td {
  border-top: 2px solid #ddd;
}
</style>