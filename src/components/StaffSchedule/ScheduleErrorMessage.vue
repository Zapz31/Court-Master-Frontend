<template>
  <div v-if="isVisible" class="error-message">
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

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

const isVisible = ref(props.visible);

watch(
  () => props.visible,
  (newVal) => {
    isVisible.value = newVal;
  }
);
</script>

<style>
.error-message {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f44336;
  color: white;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  border-radius: 4px;
}
</style>