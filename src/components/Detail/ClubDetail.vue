<template>

  <div class="name">
    <h1>BadmintonSpace Arena</h1>
  </div>
  <div id="app">
    <div class="images" v-viewer>
      <div id="image-column1">
        <img src="https://sieuthicaulong.vn/userfiles/files/san-cau-long-quan-3-1.jpg" />
      </div>
      <div id="image-column2">
        <img src="https://sieuthicaulong.vn/userfiles/files/san-cau-long-quan-3-1.jpg" />
      </div>
      <div id="image-column3">
        <img id="image" src="https://sieuthicaulong.vn/userfiles/files/san-cau-long-quan-3-1.jpg" />
        <div class="image-container">
          <img src="https://sieuthicaulong.vn/userfiles/files/san-cau-long-quan-3-1.jpg" />
          <div class="overlay">See more +10</div>
        </div>
      </div>
    </div>
  </div>
  <div class="address">
    <p>Nguyễn Văn Tăng, Phường Long Thạnh Mỹ, Tp. Thủ Đức</p>
  </div>

  <button>
    <router-link to="/schedule">View Schedule</router-link>
  </button>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Day Week</th>
          <th>Time Slots</th>
          <th>One Time</th>
          <th>Long-term</th>
          <th>Flexible</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2">Mon - Fri</td>
          <td>5h - 17h</td>
          <td>79.000VNĐ</td>
          <td>68.000VNĐ</td>
          <td>68.000VNĐ</td>
        </tr>
        <tr>
          <td>22h - 17h</td>
          <td>89.000VNĐ</td>
          <td>79.000VNĐ</td>
          <td>79.000VNĐ</td>
        </tr>
        <tr>
          <td rowspan="2">Sat - Sun<br>Holiday</td>
          <td>5h - 17h</td>
          <td>99.000VNĐ</td>
          <td>88.000VNĐ</td>
          <td>78.000VNĐ</td>
        </tr>
        <tr>
          <td>5h - 17h</td>
          <td>109.000VNĐ</td>
          <td>98.000VNĐ</td>
          <td>98.000VNĐ</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="detail">
    <p>
      BadmintonSpace Arena is a premier destination for badminton enthusiasts, combining modern design with
      top-notch amenities. The spacious courts feature advanced LED lighting and international-standard surfaces,
      ensuring optimal play conditions.<br><br>
      Beyond excellent facilities, BadmintonSpace Arena prides itself on outstanding customer service, with friendly
      and professional staff. Relax in comfortable lounges, utilize modern locker rooms, and rejuvenate in
      fully-equipped recovery areas.<br><br>
      Regular tournaments and social events offer players of all levels the chance to compete and connect.
      Experience the passion and excellence of badminton at BadmintonSpace Arena – where the sport's finest come
      together!
    </p>
  </div>

  <div class="comments-container">
    <div class="commenter">
      <div class="comment-header">
        <div class="avatar">
          <img src="../../../public/img/avatarCourtMaster.jpg" alt="Avatar">
        </div>
        <div class="user-info">
          <h4>Doan Minh Tien</h4>
          <div class="rating">
            <input value="5" name="rate" id="star5" type="radio">
            <label title="text" for="star5"></label>
            <input value="4" name="rate" id="star4" type="radio">
            <label title="text" for="star4"></label>
            <input value="3" name="rate" id="star3" type="radio">
            <label title="text" for="star3"></label>
            <input value="2" name="rate" id="star2" type="radio">
            <label title="text" for="star2"></label>
            <input value="1" name="rate" id="star1" type="radio" checked="">
            <label title="text" for="star1"></label>
          </div>
        </div>
      </div>
      <div class="form">
        <input class="input" placeholder="Comment....." required="" type="text">
        <span class="input-border"></span>
      </div>
    </div>
    <div class="comment">
      <div class="comment-header">
        <div class="avatar">
          <img src="../../../public/img/avatarCourtMaster.jpg" alt="Avatar">
        </div>
        <div class="user-info">
          <h4>Thanh Nhan Vo <span class="date">18:03 15/05/2024</span></h4>
          <div class="rating1">
            <span class="star-icon" :class="{ filled: rating >= 1 }">&#9733;</span>
            <span class="star-icon" :class="{ filled: rating >= 2 }">&#9733;</span>
            <span class="star-icon" :class="{ filled: rating >= 3 }">&#9733;</span>
            <span class="star-icon" :class="{ filled: rating >= 4 }">&#9733;</span>
            <span class="star-icon" :class="{ filled: rating >= 5 }">&#9733;</span>
          </div>
        </div>
      </div>
      <div class="comment-body">
        <p>This is a great place for badminton! The courts are well-maintained, and the staff is friendly. Highly
          recommended!</p>
      </div>
    </div> 
    <div class="comment">
      <div class="comment-header">
        <div class="avatar">
          <img src="../../../public/img/avatarCourtMaster.jpg" alt="Avatar">
        </div>
        <div class="user-info">
          <h4>Hans Hoffmann <span class="date">11:14 13/06/2024</span></h4>
          <div class="rating1">
            <span class="star-icon" :class="{ filled: rating1 >= 1 }">&#9733;</span>
            <span class="star-icon" :class="{ filled: rating1 >= 2 }">&#9733;</span>
            <span class="star-icon" :class="{ filled: rating1 >= 3 }">&#9733;</span>
            <span class="star-icon" :class="{ filled: rating1 >= 4 }">&#9733;</span>
            <span class="star-icon" :class="{ filled: rating1 >= 5 }">&#9733;</span>
          </div>
        </div>
      </div>
      <div class="comment-body">
        <p>Noice, bruh!</p>
      </div>
    </div>     
     <!-- Add more comments here --> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: 5,
      rating1: 3 // Set the initial rating value here
    }
  }
}
</script>

<style scoped>
.name {
  font-size: medium;
  color: rgb(79, 167, 250);
}

.button {
  border-radius: 50%;
}

.images {
  display: grid;
  grid-template-columns: 350px 350px 200px;
  gap: 10px;
  cursor: pointer;
}

.images-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#image-column1 img {
  max-width: 400px;
  max-height: 265px;
  border-radius: 15px;
  grid-row: 1/3;
}

#image-column1:hover {
  transform: scale(1.02);
}

#image-column2 img {
  max-width: 400px;
  max-height: 265px;
  border-radius: 15px;
  grid-row: 1/3;
}

#image-column2:hover {
  transform: scale(1.02);
}

#image-column3 img {
  max-width: 400px;
  max-height: 130px;
  border-radius: 15px;
}

#image:hover {
  transform: scale(1.02);
}

.image-container {
  position: relative;
}

.image-container .overlay {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 53px 14px 53px;
  border-radius: 15px;
  font-size: 20px;
}

.image-container:hover {
  transform: scale(1.02);
}

.address p {
  font-size: 16px;
  color: #555;
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  /* Align the button to the right */
  margin-bottom: 20px;
  /* Add some spacing */
}

button {
  appearance: button;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .8px;
  line-height: 20px;
  margin-bottom: 20px;
  outline: none;
  overflow: visible;
  padding: 13px 19px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter .2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  float: right;
}

button:after {
  background-clip: padding-box;
  background-color: #1CB0F6;
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

button:main,
button:focus {
  user-select: auto;
}

button:hover {
  transform: scale(1.05);
}

button:disabled {
  cursor: auto;
}

button:active {
  padding-bottom: 10px;
}

button a {
  color: inherit;
  /* Inherit text color from parent */
  text-decoration: none;
  /* Remove underline */
}

.table-container {
  margin-bottom: 20px;
  color: black;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px 15px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.comments-container {
  margin-bottom: 20px;
}

.comment {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 100px;
  padding: 15px;
  margin-bottom: 10px;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 0px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info h4 {
  margin-top: -10px;
}

.date {
  font-size: 12px;
  color: #888;
}

.comment-body p {
  margin-left: 50px;
  margin-right: 180px;
  margin-top: -45px;
  margin-bottom: -10px;
  line-height: 1.5;
}

.rating {
  padding-left: 650px;
  margin-top: -30px;
}

.rating:not(:checked)>input {
  position: absolute;
  appearance: none;
}

.rating:not(:checked)>label {
  float: right;
  cursor: pointer;
  font-size: 30px;
  color: #666;
}

.rating:not(:checked)>label:before {
  content: '★';
}

.rating>input:checked+label:hover,
.rating>input:checked+label:hover~label,
.rating>input:checked~label:hover,
.rating>input:checked~label:hover~label,
.rating>label:hover~input:checked~label {
  color: #e58e09;
}

.rating:not(:checked)>label:hover,
.rating:not(:checked)>label:hover~label {
  color: #ff9e0b;
}

.rating>input:checked~label {
  color: #ffa723;
}

.form {
  --width-of-input: 200px;
  --border-height: 1px;
  --border-before-color: rgba(221, 221, 221, 0.39);
  --border-after-color: #5891ff;
  --input-hovered-color: #4985e01f;
  position: relative;
  width: var(--width-of-input);
  margin-left: 50px;
  margin-right: 200px;
  margin-top: -45px;
  margin-bottom: -5px;
  line-height: 1.5;
}

/* styling of Input */
.input {
  color: #000000;
  font-size: 0.9rem;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
}

/* styling of animated border */
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

.commenter {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
}

.commenter-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.commenter-body p {
  margin-left: 50px;
  margin-right: 180px;
  margin-top: -45px;
  margin-bottom: -10px;
  line-height: 1.5;
}

.rating1 {
  padding-left: 650px;
  margin-top: -30px;
  display: flex;
  align-items: center;
}

.star-icon {
  font-size: 30px;
  color: #666;
  cursor: default;
}

.filled {
  color: #ffa723;
}
</style>