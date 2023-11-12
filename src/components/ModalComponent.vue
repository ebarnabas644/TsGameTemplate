<script setup lang="ts">
import { onMounted, pushScopeId, reactive, ref } from 'vue';
//import { networkSystemComponent } from '@/core/gameMain';
//import { usePlayerStatStore } from '@/stores/entity';

const props = defineProps({
  defaultX: Number,
  defaultY: Number,
  modalwidth: Number,
  modalheight: Number
})
let dragging = ref(false)
let modalTop = ref((props.defaultY! / window.devicePixelRatio) * window.innerHeight)
let modalLeft = ref((props.defaultX!) * window.innerWidth)
let mouseX = 0
let mouseY = 0
let initialModalTop = 0
let initialModalLeft = 0
//const playerStat = usePlayerStatStore()

function startDrag(event: any) {
  dragging.value = true;
  mouseX = event.clientX;
  mouseY = event.clientY;
  initialModalTop = modalTop.value;
  initialModalLeft = modalLeft.value;
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDrag);
}

function stopDrag() {
  dragging.value = false;
  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', stopDrag);
}

function drag(event: any) {
  const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;
    modalTop.value = initialModalTop + deltaY;
    modalLeft.value = initialModalLeft + deltaX;
}

</script>

<template>
    <div class="p-2 absolute" :style="{ top: modalTop + 'px', left: modalLeft + 'px' }">
      <div class="cursor-move py-1" @mouseup="stopDrag" @mousedown="startDrag">
        <hr class="my-0.5 border-gray-700">
        <hr class="my-0.5 border-gray-700">
      </div>
      <div :style="{width: modalwidth + 'px'}">
        <slot></slot>
      </div>
    </div>
  </template>