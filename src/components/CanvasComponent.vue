<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
//import { initGame, setRenderer } from '@/core/gameMain';
import ChatComponent from "@/components/ChatComponent.vue";
import {emitCustomEvent} from "@/core/utilities/customEventEmitter";
//import { io, Socket } from 'socket.io-client'

/*function resizeCanvas(event: any){
  app?.renderer.resize(window.innerWidth, window.innerHeight)
}*/
onMounted(() => {
  console.log("canvas mounted")
  emitCustomEvent('canvas-ready', null)
})
</script>

<template>
  <div id="pixiContainer"></div>
  <ChatComponent :defaultX="0.05" :defaultY="0.7"></ChatComponent>
  <!--<StatusBar :defaultX="0.05" :defaultY="0.05"></StatusBar>
  <Minimap :defaultX="0.90" :defaultY="0.05"></Minimap>-->
</template>

<style scoped>
canvas {
  border: 1px solid white;
}
</style>
