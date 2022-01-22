<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import StartView from "./components/StartView.vue"
import QuestionView from "./components/QuestionView.vue"
import ResultView from "./components/ResultView.vue"
import {reactive, ref, computed}from 'vue'

const isVisibleStart = ref(true)
const isVisible2 = ref(false)

const onToggleVisibilityStart = () => { 
  console.log("ToggleStartVisibility: " + isVisibleStart)
  isVisibleStart.value = !isVisibleStart
}


</script>


<template>
  <div id="app">
    <StartView v-show="isVisibleStart" @toggle-visibilityStart="onToggleVisibilityStart()" />
    <QuestionView v-show="!isVisibleStart"/>
    <ResultView v-show="isVisible2"/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
