<!-- represents the user view for a question -->

<script setup>
  import {reactive, ref} from 'vue'
  import App from '../App.vue'
  import QuestionItemVue from './QuestionItem.vue';

  //--- this event is subscribed to in component app.vue and signals the user has answered the current question
  const emits = defineEmits("next-question");

  const props = defineProps({
    question: {
      type: Object,
      required: true
    }
  });

  //--- function called when question-answered event is triggered in the QuestionItem component
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