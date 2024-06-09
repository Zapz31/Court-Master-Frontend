import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css'
window.axios = axios;

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)


app.use(router).mount('#app')

