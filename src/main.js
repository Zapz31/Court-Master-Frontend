import axios from 'axios'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import axiosInstance from "./axiosInterceptor"

import App from './App.vue'
import router from './router'
import './style.css'
window.axios = axios;

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

app.use(router).mount('#app')

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarDays, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCalendarDays,faEye)

export default {
  install(app) {
    app.component('font-awesome-icon', FontAwesomeIcon)
  }
}
app.config.globalProperties.$axios = axiosInstance
window.axios = axiosInstance
