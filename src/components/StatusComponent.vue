<script setup lang="ts">
import ModalComponent from "@/components/ModalComponent.vue";
import { ref, type HTMLAttributes } from 'vue';
import { networkSystemComponent } from '@/core/gameMain';
import { reactive } from 'vue';
//import { usePlayerStatStore } from '@/stores/entity';
import { inputSystemComponent } from '@/core/gameMain';
import { useStatusStore } from '@/stores/statusStore'

const chatInput = ref("")
const chatbox = ref<HTMLElement>()
const chat: string[] = reactive([])
const message = ref<HTMLElement>()

const statusStore = useStatusStore()

//const playerStore = usePlayerStatStore()

</script>

<template>
  <ModalComponent :default-x="0.5" :default-y="0.6" :modalheight="200" :modalwidth="250">
    <div>
      X: {{ statusStore.cordinateX }} <br> Y: {{ statusStore.cordinateY }}
    </div>
  </ModalComponent>
</template>