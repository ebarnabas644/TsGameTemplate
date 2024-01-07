<script setup lang="ts">
import ModalComponent from "@/components/ModalComponent.vue";
import { ref, type HTMLAttributes } from 'vue';
import { networkSystemComponent } from '@/core/gameMain';
import { reactive } from 'vue';
//import { usePlayerStatStore } from '@/stores/entity';
//import { inputSystemComponent } from '@/core/gameMain';

const chatInput = ref("")
const chatbox = ref<HTMLElement>()
const chat: string[] = reactive([])
const message = ref<HTMLElement>()
//const playerStore = usePlayerStatStore()

function sendChat(message: string){
  let packet = {
    Type: "chat",
    Data: message
  }
  networkSystemComponent.sendMessage('ClientMessage', packet)
  //chat.push(playerStore.entities.find(entity => entity.tags['controlledby'] == networkSystemComponent.getConnectionId())?.name+ ": "+message)
  //chat.push(message)
  scrollToEnd()
  chatInput.value = ""
}

function scrollToEnd(){
  setTimeout(() => {
    chatbox.value?.scrollTo({
      top: chatbox.value.scrollHeight,
      behavior: 'smooth'
    })
  }, 0)
}

function inputFocus(){
  //inputSystemComponent.disableInput()
}

function inputFocusOut(){
  //inputSystemComponent.enableInput()
}

document.addEventListener('chatMessage', (event: Event) => {
  const customEvent = event as CustomEvent
  const data: any = customEvent.detail

  chat.push(data)
  scrollToEnd()
})

</script>

<template>
  <ModalComponent :default-x="0.1" :default-y="0.6" :modalheight="200" :modalwidth="250">
    <div ref="chatbox" class="flex-row p-1 bg-gray-900 bg-opacity-10 h-48 overflow-y-scroll overflow-x-hidden content-end">
      <div class="">
        <div v-for="msg in chat">
          <p ref="message" class="break-words">
            {{ msg }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-between bg-gray-900 bg-opacity-10 border-t-black border-t-[1px]">
      <input @focus="inputFocus()" @focusout="inputFocusOut()" class="border-b-black bg-transparent focus:outline-none" type="text" v-model="chatInput">
      <button @click="sendChat(chatInput)">Send</button>
    </div>
  </ModalComponent>
</template>