import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {initGame} from "@/core/gameMain";
import { useStatusStore } from './stores/statusStore'
import { setUIStore } from './core/gameState'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const uiStore = useStatusStore()
setUIStore(uiStore)
app.mount('#app')

initGame()