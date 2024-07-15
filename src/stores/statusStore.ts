import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', () => {
    const cordinateX = ref(0)
    const cordinateY = ref(0)
    return { cordinateX, cordinateY }
})