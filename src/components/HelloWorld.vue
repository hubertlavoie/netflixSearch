<template>
  <h1>{{ msg }}</h1>

  <a-button type="primary">Primary</a-button>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
    >
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button @click="count = 4">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";
import { defineProps, defineEmit, useContext } from "vue";
import { useStore } from "../store/store";

const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
});

const count = ref(0);
const other = ref<string | number>("Helloo");
const store = useStore();

store.commit("increment");
console.log(store.state.count);

const consoleTheValue = (value: number | string): void => {
  console.log(value);
};

watch(count, (count, prevCount) => {
  consoleTheValue(count);
  consoleTheValue(prevCount);
  other.value = 5;
});
watch(other, (other, prevOther) => {
  consoleTheValue(other);
  consoleTheValue(prevOther);
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
