<script setup>
    import QuestionItemVue from './QuestionItem.vue';

    const props = defineProps({
        questions: {
            type: Array,
            required: true
        } 
    })

</script>

<template>
<div>
  <h3>I am the questions list</h3>
  <QuestionItemVue v-for="(question, index) in questions" :key="index"
    :id="index + 1"
    :category="question.category" 
    :type="question.type"
    :difficulty="question.difficulty"
    :question="question.question"
    :correct_answer="question.correct_answer"
    :show_correct_answer="true"
    :given_answer="question.given_answer"
    :show_given_answer="true"               />
</div>
</template>

<style scoped>

</style>