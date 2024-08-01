<template>
    <div class="name">
        <h2><font-awesome-icon :icon="['fas', 'calendar-days']" size="lg" style="color: #007dfa;" /> Club Update</h2>
    </div>

</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Registering the component
const components = {
  FontAwesomeIcon
};
</script>

<style scoped>
.name {
    margin-top: 30px;
    top: -60px;
    left: 0;
    padding: 1rem;
    font-size: 20px;
}
</style>