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

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
library.add(faCalendarDays,faEye)

export default {
  install(app) {
    app.component('font-awesome-icon', FontAwesomeIcon)
  }
}
