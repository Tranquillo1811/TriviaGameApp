<script setup>
  import { ref, onMounted, onBeforeUpdate } from 'vue';

  const emits = defineEmits(["question-answered"]);

  const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    show_correct_answer: {
        type: Boolean,
        required: true
    },
    incorrect_answers: {
        type: Array,
        required: true
    },
    given_answer: {
        type: String,
        required: true
    },
    show_given_answer: {
        type: Boolean,
        required: true
    }
    })

  const onSubmit = (answer) => {
    //props.given_answer = answer;  //--- is readonly here...

    emits("question-answered", answer);
  };

  const AnswerIndex = ref(0);
  const Answers = ref([]); 
  
  const shuffleAnswers = () => {
    console.log("onMounted entered");
    const incorrect_answers = JSON.parse(JSON.stringify(props.incorrect_answers));
    console.log("incorrect_answers",incorrect_answers);
    Answers.value = [];
    //////////////////////Shuffle answers and display on buttons
    console.log("AnswerIndex",AnswerIndex)
    console.log("Answers",Answers)
    AnswerIndex.value = Math.ceil(Math.random()*4);
    for (let i = 0; i < incorrect_answers.length; i++) {
      Answers.value.push(incorrect_answers[i]);
    }
    const correct_answer = JSON.parse(JSON.stringify(props.correct_answer));
    console.log("correct_answer",correct_answer);
    Answers.value.splice(AnswerIndex.value, 0, correct_answer);
  }
  
  onMounted(shuffleAnswers)

  onBeforeUpdate(shuffleAnswers);
  
</script>

<template>
  <div>
    <h2 v-html="question"></h2>
    <div v-if="props.type=='multiple'">
      <ol> 
        <li v-for="(answer, i) in Answers" :key="i" >
          <button type="button" @click="onSubmit(answer)" v-html="answer"></button><br><br>
        </li>
      </ol>
    </div>

    <div v-if="props.type=='boolean'">
      <button type="button" @click="onSubmit('true')">True</button><br><br>
      <button type="button" @click="onSubmit('false')">False</button><br><br>
    </div>

    <table v-if="props.type=='result'">
      <tbody>
        <tr>
          <td>Question {{ id }}:</td>
          <td v-html="question"></td>
        </tr>
        <tr>
          <td>Difficulty:</td>
          <td>{{ difficulty }}</td>
        </tr>
        <tr v-show="show_correct_answer">
          <td>Correct answer:</td>
          <td>{{ correct_answer }}</td>
        </tr>
        <tr v-show="show_given_answer">
          <td>Given answer:</td>
          <td>{{ given_answer }}</td>
        </tr>
        <tr>
          <td>Incorrect answers:</td>
          <td>{{ incorrect_answers }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  
</template>

<style scoped>
h2 {
  color: royalblue;
}
td {
    text-align: left;
    padding: 5px 10px;
}
</style>
