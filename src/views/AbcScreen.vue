<template>
    <div class="container">
        <div class="logo">
            <logo />
            <page-name />
            <user-avatar />
        </div>
        <div class="content">
            <add-court />
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import AddCourt from "../components/History/FilerSearch.vue";
</script>