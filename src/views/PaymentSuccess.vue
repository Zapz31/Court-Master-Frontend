<template>
    <div class="payment-success">
      <div class="message">
        <span class="icon">✔️</span>
        <h1>Payment Success</h1>
      </div>
      <div class="actions">
        <router-link to="/" class="button">Back Home</router-link>
        <router-link to="/customer/booking" class="button"
          >View my booking</router-link
        >
      </div>
      <p class="redirect-message">Back to homepage in {{ seconds }} seconds...</p>
    </div>
  </template>
    
    <script setup>
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  
  const seconds = ref(60);
  const router = useRouter();
  
  onMounted(() => {
    const interval = setInterval(() => {
      if (seconds.value > 0) {
        seconds.value -= 1;
      } else {
        clearInterval(interval);
        router.push("/");
      }
    }, 1000);
  });
  </script>
    
    <style scoped>
  .payment-success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  
  .message {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: #4caf50;
  }
  
  .icon {
    font-size: 3rem;
    margin-right: 0.5rem;
  }
  
  .actions {
    margin-top: 2rem;
  }
  
  .button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    color: white;
    background-color: #4caf50;
    border: none;
    border-radius: 0.25rem;
    text-decoration: none;
  }
  
  .redirect-message {
    margin-top: 2rem;
    font-size: 1rem;
    color: gray;
  }
  </style>
  