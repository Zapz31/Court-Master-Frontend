





<template>
  <div class="register">
    <h1>You did not have account?</h1>
    <div class="btn_block">
      <router-link class="button" to="/register">Register</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* ---------------------------------------------------------------------------------------------------- */
.register {
  margin-top: -165px;
  text-align: center;
  align-items: center;
  color: white;
}
.btn_block {
  display: flex;
  align-items: center;
  justify-content: center;
}
.button {
  width: 25%;
  align-items: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  --blueCourtMaster: #6babf4;
  background-color: white;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--blueCourtMaster);
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 20px;
  text-decoration: none;
}

.icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;
}

.button:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.button:hover .icon {
  transform: translate(4px);
}

.button:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.button::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
  top: 0;
  left: -100px;
  opacity: 0.6;
}

@keyframes shine {
  0% {
    left: -100px;
  }

  60% {
    left: 100%;
  }

  to {
    left: 100%;
  }
}

/* ---------------------------------------------------------------------------------------------------- */
</style>

