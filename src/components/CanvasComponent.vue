<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
//import { initGame, setRenderer } from '@/core/gameMain';
import * as PIXI from 'pixi.js'
import ChatComponent from "@/components/ChatComponent.vue";
//import { io, Socket } from 'socket.io-client'

const pixiContainer = ref<HTMLElement | null>(null)
let app: PIXI.Application | null = null
onMounted(() => {
      window.addEventListener("resize", resizeCanvas)
      pixiContainer.value?.focus()
      app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        view: pixiContainer.value!.appendChild(document.createElement('canvas')),
        backgroundColor: 0x5c812f
      });
      //globalThis.__PIXI_APP__ = app //for debugging pixi app with browser extension
      //setRenderer(app)
    }
)

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas)
})

function resizeCanvas(event: any){
  app?.renderer.resize(window.innerWidth, window.innerHeight)
}

</script>

<template>
  <div ref="pixiContainer"></div>
  <ChatComponent :defaultX="0.05" :defaultY="0.7"></ChatComponent>
  <!--<StatusBar :defaultX="0.05" :defaultY="0.05"></StatusBar>
  <Minimap :defaultX="0.90" :defaultY="0.05"></Minimap>-->
</template>

<style scoped>
canvas {
  border: 1px solid white;
}
</style>
