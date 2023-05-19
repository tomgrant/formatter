<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useFormatterStore } from '@/stores/formatter';

const store = useFormatterStore();
const { inputBody, outputBody } = store 


function handleUserInput(event: InputEvent): void {
  const userInput = (event.target as HTMLTextAreaElement).value;
  store.inputBody = userInput;
  const formattedJson = store.convertStringToJSON(userInput);
  store.outputBody = formattedJson; // Parse and stringify the object
}

function handleConvert(type: string) {
  if (type === 'csv') {
    store.outputBody = store.convertJSONToCSV(store.inputBody);
  }
}

const formattedJsonString = computed(() => {
  return store.outputBody;
})

</script>

<template>
  <div class="container">
    <div class="input">
      <h3>Input JSON</h3>
      <span class="input-error"></span>
      <textarea id="userInput" v-model="inputBody" @input="handleUserInput"></textarea>
    </div>
    <div class="controls">
    <button @click="handleConvert('csv')">Convert to CSV</button>
    </div>
    <div class="output">
      <h3>Output JSON</h3>
      <textarea :innerText="formattedJsonString"></textarea>
    </div>
  </div>
</template>

<style scoped>

</style>