<script setup>
  import {reactive, ref} from 'vue'
  import App from '../App.vue'
  import QuestionItemVue from './QuestionItem.vue';

  //const question = {"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"What is the name of the main healing item in Dark Souls?","correct_answer":"Estus Flask","incorrect_answers":["Health Potion","Orange Juice","Ashen Flask"]}

  const emits = defineEmits("next-question");

  const props = defineProps({
    question: {
      type: Object,
      required: true
    }
  });

  const OnQuestionAnswered = (arg) => {
    const questionObj = JSON.parse(JSON.stringify(props.question));
    questionObj.given_answer = arg;
    emits("next-question", questionObj);
  }
</script>

<template>

  <QuestionItemVue v-if="props.question != undefined" 
    id="1" 
    :type="props.question.type" 
    :category="props.question.category" 
    :question="props.question.question" 
    :incorrect_answers="question.incorrect_answers" 
    :correct_answer="question.correct_answer" 
    show_correct_answer="false"
    @question-answered="OnQuestionAnswered">
  </QuestionItemVue>

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