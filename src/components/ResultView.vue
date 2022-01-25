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

  console.log(newScore.value)
  console.log(score.value)
  console.log(questions)

  const updateScore = () => { 
   // const newScore = computed(() => store.state.newScore).value;
    const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
    const apiKey = 'hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge'
    const username = computed(() => store.state.userName);
    const newScore1 = computed(() => store.state.newScore).value;
    console.log(username.value)
   fetch(`${apiURL}trivia?username=${username.value}`)
      .then(response => response.json())
      .then(response => {
          console.log("update score "+response)
          if (response[0].highScore < newScore1){
              
              fetch(`${apiURL}trivia/${response[0].id}`, {
                    method: 'PATCH', // NB: Set method to PATCH
                    headers: {
                    'X-API-Key': apiKey,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      // Provide new highScore to add to user with id 1
                      highScore: newScore1 
                    })
              })
              .then(response => {
                   if (!response.ok) {
                       throw new Error('Could not update high score')
                    }
                   return response.json()
                   })
              .then(updatedUser => {
                 // updatedUser is the user with the Patched data
                 console.log("New Highscore")
              })
              .then(store.commit("setHighScore",newScore1))
              .catch(error => {
              })
          }else{
            console.log("Your score is "+newScore1)
          }
    })
  }
updateScore()
const highScore = computed(() => store.state.highScore);

 const emit = defineEmits(["reset"]);
const reset = () => {
  emit("reset", true, false, false)
 
}
</script>

<template>
  <div>
    <h2>Let's see what you achieved...</h2>    
    <h3>Your total score is {{ newScore }} </h3>
    <h3>Your high-score is {{highScore}}</h3>
    <ol>
    <li v-for="question in questions" :key="question.Id" >
        <tr>{{question.question}}</tr>
        <tr>Your answer: {{ question.given_answer }}</tr>
        <tr>Correct answer: {{ question.correct_answer }}</tr>
        <tr>Score gained: {{ score[question.Id - 1] }}</tr>
    </li>
    </ol>
    <button @click="reset">Back to start</button>
   </div>
</template>

<style scoped>
  h2 {
    color: red;
  }
  td {
    padding: 10px 20px;
  }
  ol {
  text-align: left;
  }
</style>