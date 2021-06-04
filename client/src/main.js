import { createApp } from 'vue'
import App from "./App.vue"
import './assets/css/bootstrap.css'
import router from './router'
import "@/assets/styles/main.css";

createApp(App).use(router).mount('#app')