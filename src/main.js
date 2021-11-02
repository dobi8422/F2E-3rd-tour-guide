import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'

createApp(App).use(VueAxios, axios).mount('#app')
