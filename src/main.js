import { createApp } from 'vue'
import App from './App.vue'
import store from './store.js'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
