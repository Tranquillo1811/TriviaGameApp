<script setup>
  import { ref, computed } from "vue";
  import QuestionListVue from './QuestionList.vue';
  import { useStore } from "vuex";
  
  const store = useStore();
  const questions = computed(() => store.state.questions);
  const newScore=ref(0);
  const score=ref([]);
 
  const calcScore = () => {   
    for(let i =0; i<questions.value.length ; i++){
      if ((questions.value)[i].given_answer ==(questions.value)[i].correct_answer){
          newScore.value += 10
          score.value.push(10)
      }else{
        score.value.push(0)
      }
    } 
    store.commit("setNewScore", newScore.value)
    // emit('HighScore', newScore.value )
  }
  calcScore();
</script>

<template>
  <div>
    <h2>Let's see what you achieved...</h2>    
    <h3>Your total score is {{ newScore }} </h3>
    <ol>
    <li v-for="question in questions" :key="question.Id" >
        <tr>
          <td>Your answer: {{ question.given_answer }}</td>
          <td>Correct answer: {{ question.correct_answer }}</td>
          <td>Score: {{ score[question.Id - 1] }}</td>
        </tr>
    </li>
    </ol>
   </div>
</template>

<style scoped>
  h2 {
    color: red;
  }
  td {
    padding: 10px 20px;
  }
</style>