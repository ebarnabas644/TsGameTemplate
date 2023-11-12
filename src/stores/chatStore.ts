import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStatStore = defineStore('playerStat', () => {
    const messages = ref<string[]>([])
    return { messages }
})