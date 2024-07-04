<template>
  <div v-if="visible" class="error-message">
    <p>{{ message }}</p>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});
</script>
  
  <style>
.error-message {
  position: fixed;
  top: 70px; /* Adjust this value based on your layout */
  left: 50%;
  transform: translateX(-50%);
  background-color: #f44336;
  color: white;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10; /* Ensure it's above other elements */
  border-radius: 4px;
}
</style>
  