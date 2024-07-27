import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initGame, gameState } from "@/core/gameMain";
import { useStatusStore } from './stores/statusStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const uiStore = useStatusStore()
gameState.setUIStore(uiStore)
app.mount('#app')

await initGame()