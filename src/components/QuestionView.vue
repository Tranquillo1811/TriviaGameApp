<script setup>
import {reactive, ref} from 'vue'
import App from '../App.vue'
import QuestionItemVue from './QuestionItem.vue';

const question = {"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"What is the name of the main healing item in Dark Souls?","correct_answer":"Estus Flask","incorrect_answers":["Health Potion","Orange Juice","Ashen Flask"]}


const props = defineProps({
  QuestionType: String
})

console.log("from child " +props.QuestionType)

</script>

<template>

  <QuestionItemVue id="1" :type="question.type" :category="question.category" :question="question.question" :incorrect_answers="question.incorrect_answers" :correct_answer="question.correct_answer" show_correct_answer="false"></QuestionItemVue>


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