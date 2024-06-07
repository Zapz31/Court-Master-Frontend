import axios from 'axios'
import { createApp } from 'vue'


import App from './App.vue'
import router from './router'
import './style.css'
window.axios = axios;


createApp(App).use(router).mount('#app')

