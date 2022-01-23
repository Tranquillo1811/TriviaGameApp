<script setup>
import {reactive, ref} from 'vue'
import App from '../App.vue'
import QuestionItemVue from './QuestionItem.vue';

const incorrectAnswers = reactive(["Jhonny","mahh","boosboos"]) 
const correctAnswer = "HelloMeoo"
const question = "What is the cutest nickname?"


const props = defineProps({
  QuestionType: String
})

console.log("from child " +props.QuestionType)

</script>

<template>
  
  <QuestionItemVue id="1" :question="question" :incorrect_answers="incorrectAnswers" :correct_answer="correctAnswer" show_correct_answer="false"></QuestionItemVue>


</template>

<style scoped>
h2 {
  color: blue;
}
ol {
  width: 100px;
  margin-left: auto;
  margin-right: auto;
}

</style>