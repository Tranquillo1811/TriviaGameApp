<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import StartView from "./components/StartView.vue"
import QuestionView from "./components/QuestionView.vue"
import ResultView from "./components/ResultView.vue"
import {reactive, computed}from 'vue'

// let app = Vue.createApp({
//         data: function() {
//           return {
//             // isVisible1: true,
//             // isVisible2: false,
//             // isVisible3: false,
//           }
//         }
// })
// app.mount("#app")


</script>


<template>
<div id="app" v-cloak>
  <StartView  />
  <QuestionView  />
  <ResultView />
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
