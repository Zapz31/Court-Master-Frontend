<template>
  <div class="parent_container">
    <div class="Register_title">
      <p class="title">Register</p>
    </div>

    <div class="form_container">
      <form class="form">
        <p class="message">Signup now and get full access to our app.</p>

        <div class="flex">
          <label>
            <input class="input" type="text" placeholder="" required="" />
            <span>Firstname</span>
          </label>

          <label>
            <input class="input" type="text" placeholder="" required="" />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input class="input" type="phone-number" placeholder="" required="" />
          <span>Phone Number</span>
        </label>

        <label>
          <input class="input" type="email" placeholder="" required="" />
          <span>Email</span>
        </label>

        <label>
          <input class="input" type="password" placeholder="" required="" />
          <span>Password</span>
        </label>
        <label>
          <input class="input" type="password" placeholder="" required="" />
          <span>Confirm password</span>
        </label>
        <button class="submit">Submit</button>
        <p class="signin">Already have an acount ? <a href="#">Signin</a></p>
      </form>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.form_container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
}

.title {
  margin-bottom: 6px;
  font-size: 28px;
  color: black;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .title::before,
.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
} */

.message,
.signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: royalblue;
}

.signin a:hover {
  text-decoration: underline royalblue;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
  display: block; /* Ensure label takes full width */
  margin-bottom: 20px; /* Add some space between labels */
}

.form label .input {
  width: 100%;
  padding: 10px;
  padding-top: 20px; /* Add extra padding on top to make space for the label */
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  font-size: 1em; /* Ensure consistent font size */
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 10px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
  pointer-events: none; /* Prevent the span from interfering with input focus */
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,
.form label .input:not(:placeholder-shown) + span {
  top: -10px;
  font-size: 0.7em;
  font-weight: 600;
  background-color: white; /* Add background color to prevent text overlap */
  padding: 0 5px; /* Add padding to create space around the text */
}

.form label .input:valid + span {
  color: green;
}

.submit {
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: 0.3s ease;
}

.submit:hover {
  background-color: rgb(56, 90, 194);
  cursor: pointer;
}

/* ----------------------------------------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------------------------------------- */

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>