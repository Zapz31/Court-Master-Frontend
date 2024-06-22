<template>
  <div v-if="currentClub">
    <div class="name">
      <h1>{{ currentClub.clubName }}</h1>
    </div>

    <div
      v-if="currentClub.imageNames && currentClub.imageNames.length > 0"
      class="album"
    >
      <div class="image-container">
        <img
          :src="
            getImageUrl(currentClub.imageNames[currentImageIndex].imageName)
          "
          alt="Club Image"
          class="main-image"
          @click="openImagePopup(currentImageIndex)"
        />

        <div class="navigation-buttons">
          <button @click="prevImage">❮</button>
          <button @click="nextImage">❯</button>
        </div>
      </div>
    </div>

    <div class="clubAddress">
      <p>{{ currentClub.clubAddress }}</p>
    </div>
    <button class="button">
      <router-link to="/schedule">View Schedule</router-link>
    </button>

    <div class="time-frame-container">
      <table
        v-for="frame in currentClub.timeFrame"
        :key="frame.timeFrameId"
        class="time-frame-table"
      >
        <thead>
          <tr>
            <th colspan="8">
              Time Frame {{ frame.timeFrameId }} - {{ frame.starTime }} to
              {{ frame.endTime }}
            </th>
          </tr>
          <tr>
            <th>PLAY-MODE</th>
            <th
              v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
              :key="day"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mode in ['flexible', 'oneTimePlay', 'fixed']" :key="mode">
            <td>{{ mode }}</td>
            <td
              v-for="pricing in frame.pricingServiceList"
              :key="pricing.dateOfWeek"
            >
              {{ pricing[mode] }} ₫
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="detail">
      <p>{{ currentClub.clubDescription }}</p>
    </div>

    <div class="comments-container">
      <form @submit.prevent="submitComment">
        <div class="commenter">
          <div class="user-info">
            <div class="avatar">
              <img
                src="../../../public/img/avatarCourtMaster.jpg"
                alt="Avatar"
              />
            </div>
            <h4>Doan Minh Tien</h4>
          </div>

          <div class="form">
            <textarea
              v-model="newComment"
              class="input"
              placeholder="Comment....."
              required=""
              @keydown.enter="handleEnterKey"
              maxlength="1000"
            ></textarea>

            <div class="rating">
              <input
                value="5"
                name="rate"
                v-model="newRating"
                id="star5"
                type="radio"
              />
              <label title="text" for="star5"></label>
              <input
                value="4"
                name="rate"
                id="star4"
                v-model="newRating"
                type="radio"
              />
              <label title="text" for="star4"></label>
              <input
                value="3"
                name="rate"
                id="star3"
                v-model="newRating"
                type="radio"
                checked=""
              />
              <label title="text" for="star3"></label>
              <input
                value="2"
                name="rate"
                id="star2"
                v-model="newRating"
                type="radio"
              />
              <label title="text" for="star2"></label>
              <input
                value="1"
                name="rate"
                id="star1"
                v-model="newRating"
                type="radio"
              />
              <label title="text" for="star1"></label>
            </div>
          </div>
        </div>

        <div class="comment" v-for="(comment, index) in comments" :key="index">
          <div class="avatar1">
            <img src="../../../public/img/avatarCourtMaster.jpg" alt="Avatar" />
          </div>
          <div class="user-info1">
            <h4>
              {{ comment.name }} <span class="date">{{ comment.date }}</span>
            </h4>
            <p>{{ comment.text }}</p>
            <div class="rating1">
              <span class="star-icon" :class="{ filled: comment.rating >= 1 }"
                >&#9733;</span
              >
              <span class="star-icon" :class="{ filled: comment.rating >= 2 }"
                >&#9733;</span
              >
              <span class="star-icon" :class="{ filled: comment.rating >= 3 }"
                >&#9733;</span
              >
              <span class="star-icon" :class="{ filled: comment.rating >= 4 }"
                >&#9733;</span
              >
              <span class="star-icon" :class="{ filled: comment.rating >= 5 }"
                >&#9733;</span
              >
            </div>
          </div>
        </div>
      </form>
    </div>

    <div v-if="showPopup" class="popup-overlay" @click="closeImagePopup">
      <div class="popup-content">
        <span class="close" @click="closeImagePopup">&times;</span>
        <img
          :src="
            getImageUrl(currentClub.imageNames[currentImageIndex].imageName)
          "
          class="popup-image"
        />
        <!-- <a class="prev" @click="prevImage">&#10094;</a>
        <a class="next" @click="nextImage">&#10095;</a> -->
      </div>
    </div>
  </div>
</template>


<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useClubStore } from "../../stores/clubMng";

const props = defineProps({
  clubId: {
    type: String,
    required: true,
  },
});

const clubStore = useClubStore();
const { currentClub } = storeToRefs(clubStore);

const showPopup = ref(false);
const currentImageIndex = ref(0);
let autoSlideInterval = null;

const fetchClubData = async () => {
  try {
    await clubStore.fetchClubById(props.clubId);
    // Start auto slide after data is fetched
    startAutoSlide();
  } catch (error) {
    console.error("Error fetching club data:", error);
    // You might want to set an error state here and display it in the template
  }
};

onMounted(fetchClubData);

watch(
  () => props.clubId,
  () => {
    stopAutoSlide();
    fetchClubData();
  }
);

const getImageUrl = (base64String) => {
  return base64String ? `data:image/png;base64,${base64String}` : "";
};

const openImagePopup = (index) => {
  if (currentClub.value && currentClub.value.imageNames) {
    currentImageIndex.value = index;
    showPopup.value = true;
  }
};

const closeImagePopup = () => {
  showPopup.value = false;
};

const prevImage = () => {
  if (currentClub.value && currentClub.value.imageNames) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + currentClub.value.imageNames.length) %
      currentClub.value.imageNames.length;
  }
};

const nextImage = () => {
  if (currentClub.value && currentClub.value.imageNames) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % currentClub.value.imageNames.length;
  }
};

const startAutoSlide = () => {
  if (
    currentClub.value &&
    currentClub.value.imageNames &&
    currentClub.value.imageNames.length > 1
  ) {
    stopAutoSlide(); // Ensure any existing interval is cleared
    autoSlideInterval = setInterval(nextImage, 5678);
  }
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

onBeforeUnmount(stopAutoSlide);
//===========================FIXED FUNCTION OF COMMENT================================================
const comments = ref([
  {
    name: "Thanh Nhan Vo",
    date: "18:03 15/05/2024",
    text: "This is a great place for badminton! The courts are well-maintained, and the staff is friendly. Highly recommended!",
    rating: 5,
  },
  {
    name: "Hans Hoffmann",
    date: "11:14 13/06/2024",
    text: "Noice, bruh!",
    rating: 3,
  },
]);

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

const newComment = ref("");
const newRating = ref(1);

const handleEnterKey = (event) => {
  if (event.shiftKey) {
    return; // Allow Shift+Enter to create a new line
  }
  event.preventDefault(); // Prevent default Enter behavior
  submitComment(); // Submit the form
};

const submitComment = () => {
  if (!newComment.value.trim()) return; // Do nothing if the comment is empty

  comments.value.push({
    name: "Doan Minh Tien",
    date: formatDate(new Date()),
    text: newComment.value,
    rating: newRating.value,
  });

  newComment.value = ""; // Clear the comment input
  newRating.value = 1; // Reset the rating
};

//======================================================================================================
</script>


<style scoped>
.name {
  font-size: medium;
  color: #6babf4;
}

.button {
  border-radius: 50%;
}

.comments-container,
h4 {
  margin-left: 26px;
  margin-top: 11px;
}

.album {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.image-container {
  margin-left: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.main-image {
  width: 998px;
  height: 355px;
  border-radius: 8px;
  object-fit: cover;
}

.navigation-buttons {
  display: flex;
  gap: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  justify-content: space-between;
  transition: transform 1s ease;
}

.navigation-buttons button {
  background: none;
  border: 1px;
  font-size: 2rem;
  cursor: pointer;
  color: grey;
  transform: scale(1.2);
}

.navigation-buttons button:hover {
  color: #6babf4; /* Change to blue on hover */
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
}

.popup-image {
  max-width: 1000px;
  max-height: 488px;
  border-radius: 15px;
  object-fit: cover;
}

.close,
.prev,
.next {
  position: absolute;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: white;
}

.close {
  top: 10px;
  right: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  /* Align the button to the right */
  margin-bottom: 20px;
  /* Add some spacing */
}

.button {
  appearance: button;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  line-height: 20px;
  margin-bottom: 20px;
  outline: none;
  overflow: visible;
  padding: 13px 19px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter 0.2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  float: right;
}

.button:after {
  background-clip: padding-box;
  background-color: #6babf4;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  bottom: -4px;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}

.button:main,
.button:focus {
  user-select: auto;
}

.button:hover {
  transform: scale(1.05);
}

.button:disabled {
  cursor: auto;
}

.button:active {
  padding-bottom: 10px;
}

.button a {
  color: inherit;
  /* Inherit text color from parent */
  text-decoration: none;
  /* Remove underline */
}

.table-container {
  margin-bottom: 20px;
  color: black;
}

.time-frame-container {
  display: block;
  justify-content: center;
  font-family: Arial, sans-serif;
}

.time-frame-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.time-frame-table th,
.time-frame-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: 12px;
}

.time-frame-table thead {
  background-color: #6babf4;
  color: white;
}

.time-frame-table th {
  font-weight: bold;
}

.time-frame-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.pricing-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

.pricing-table th,
.pricing-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.pricing-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.nested-table {
  width: 100%;
  border-collapse: collapse;
}

.nested-table td {
  padding: 4px;
  border: none;
}

.comments-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.comments-container,
h4 {
  margin-left: 26px;
  margin-top: 11px;
}

.comment {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  row-gap: 30px;
  width: 695px;
}

.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: -2px;
  flex-grow: 1;
  display: flex;
}

.avatar1 img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 30px;
  flex-grow: 1;
  display: flex;
}

.user-info1 {
  margin-left: 20px;
  flex-grow: 2;
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: 20px;
  flex-grow: 2;
}

.date {
  font-size: 12px;
  color: #888;
}

.rating1 {
  margin-top: 10px;
  display: flex;
  gap: 5px;
}

.rating:not(:checked) > input {
  position: absolute;
  appearance: none;
}

.rating:not(:checked) > label {
  float: right;
  cursor: pointer;
  font-size: 30px;
  color: #666;
}

.rating:not(:checked) > label:before {
  content: "★";
}

.rating > input:checked + label:hover,
.rating > input:checked + label:hover ~ label,
.rating > input:checked ~ label:hover,
.rating > input:checked ~ label:hover ~ label,
.rating > label:hover ~ input:checked ~ label {
  color: #e58e09;
}

.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
  color: #ff9e0b;
}

.rating > input:checked ~ label {
  color: #ffa723;
}

.star-icon {
  font-size: 20px;
  color: #666;
  cursor: default;
}

.filled {
  color: #ffa723;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev {
  left: 0;
  border-radius: 3px 3px 0 0;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.form {
  --width-of-input: 688px;
  --border-height: 1px;
  --border-before-color: rgba(221, 221, 221, 0.39);
  --border-after-color: #5891ff;
  --input-hovered-color: #4985e01f;
  position: relative;
  width: var(--width-of-input);
  margin-left: -7px;
  margin-top: -45px;
  line-height: 1.5;
}

.input {
  color: #000000;
  font-size: 0.9rem;
  background-color: transparent;
  margin-top: 53px;
  width: 656px;
  height: 61px;
  margin-left: 19px;
  box-sizing: border-box;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  position: relative;
}

.input-border {
  position: absolute;
  background: var(--border-after-color);
  width: 0%;
  height: 2px;
  bottom: 0;
  left: 0;
  transition: 0.3s;
}

input:focus {
  outline: none;
}

textarea:focus {
  outline: none;
}

.commenter {
  width: 686px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
}

.image-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
}

.popup-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.close {
  position: absolute;
  top: 10px;
  right: 25px;
  color: #fff;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}
</style>
