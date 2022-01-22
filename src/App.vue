<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import StartView from "./components/StartView.vue"
import QuestionView from "./components/QuestionView.vue"
import ResultView from "./components/ResultView.vue"
import {reactive, ref, computed}from 'vue'

let isVisible1 = ref('')
let isVisible2 = ref('false')

const newVisibility = () => { 
  isVisible1 = false }


const props = defineProps({
    isVisible1:{
      type: Boolean,
      required: true,
    },
})

</script>


<template>
<div id="app">
  <StartView v-show="isVisible1=true" @toggle-visibility="newVisibility" />
  <QuestionView v-show="isVisible1==false"/>
  <ResultView v-show="isVisible2==true"/>
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
