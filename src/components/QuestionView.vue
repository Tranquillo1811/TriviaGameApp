<script setup>
  import {reactive, ref} from 'vue'
  import App from '../App.vue'
  import QuestionItemVue from './QuestionItem.vue';

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
    :id="props.question.Id" 
    :type="props.question.type" 
    :category="props.question.category" 
    :difficulty="props.question.difficulty" 
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