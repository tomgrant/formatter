<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useFormatterStore } from '@/stores/formatter';

const store = useFormatterStore();
const { inputBody, outputBody } = store 


function handleUserInput(event: InputEvent): void {
  const userInput = (event.target as HTMLTextAreaElement).value;
  // updateLineNumbers();
  store.inputBody = userInput;
  const formattedJson = store.convertStringToJSON(userInput);
  store.outputBody = formattedJson; // Parse and stringify the object
}

function handleConvert(type: string) {
  switch (type) {
    case 'csv':
      store.outputBody = store.convertJSONToCSV(store.inputBody);
      break;
    case 'json':
      store.outputBody = store.convertStringToJSON(store.inputBody);
      break;
    default:
      text = "Looking forward to the Weekend";
  }
}

function updateLineNumbers() {
  // Force Vue to update the computed property
  this.$forceUpdate();
};

const formattedJsonString = computed(() => {
  return store.outputBody;
});

const inputLineNumbers = computed(() => {
  return store.inputBody.split('\n');
});

const outputLineNumbers = computed(() => {
  return store.outputBody.split('\n');
});

</script>

<template>
  <div class="container">
    <div class="input">
      <h3>Input JSON</h3>
      <span class="input-error"></span>
      <div class="textarea-container">
        <div class="line-numbers">
          <div v-for="(line, index) in inputLineNumbers" :key="index">{{ index + 1 }}</div>
        </div>
        <textarea 
          id="userInput"
          v-model="inputBody" 
          class="numbered"
          @input="handleUserInput"
          contenteditable
        ></textarea>
      </div>
    </div>
    <div class="controls">
      <button @click="handleConvert('csv')">Convert to CSV</button>
      <button @click="handleConvert('json')">Convert to json</button>
    </div>
    <div class="output">
      <h3>Output</h3>
       <div class="textarea-container">
        <div class="line-numbers">
          <div v-for="(line, index) in outputLineNumbers" :key="index">{{ index + 1 }}</div>
        </div>
      <textarea 
        class="numbered"
        :innerText="formattedJsonString"
      ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}
.input, .output {
  flex: 2;
}
textarea.numbered {
  padding-left: 35px;
  padding-top: 10px;
  border-color: #ccc;
  display: block;
  resize: none;
  width: 100%;
  box-sizing: border-box;
  height: 500px;
  max-height: 90vh;
}
.textarea-container {
  position: relative;
  overflow: hidden;
}
.line-numbers {
  position: absolute;
  color: #777;
  top: 0;
  left: 0;
  width: 32px;
  height: 100%;
  padding: 0.5em;
  font-family: monospace;
  background-color: #f6f6f6;
  border: 1px solid #ccc;
  pointer-events: none;
  user-select: none;
  box-sizing: border-box;
}
.line-numbers:before {
  content: attr(data-line);
  display: block;
}
.controls {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>