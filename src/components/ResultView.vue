<script setup>
  import { ref, computed } from "vue";
  import { useStore } from 'vuex'; 
  
  const store = useStore();
  //--- access to questions array in store (containing the questions picked up by the API)
  const questions = computed(() => store.state.questions);
  const newScore=ref(0);   //--- overall user score of current game
  const score=ref([]);    //--- array containing score per question
 
  //--- populates newScore and score
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
  }
  calcScore();

  //--- checkes if the achieved result is higher then the current highscore in the DB
  //--- and if, updates it accordingly
  const updateScore = () => { 
    const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
    const apiKey = 'hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge'
    const username = computed(() => store.state.userName);
    const newScore1 = computed(() => store.state.newScore).value;
    console.log("username.value:",username.value);
    console.log("newScore1:",newScore1);
    fetch(`${apiURL}trivia?username=${username.value}`)
      .then(response => response.json())
      .then(result => {
          console.log("json username:"+ result)
          if (result[0].highScore < newScore1){
              
              fetch(`${apiURL}trivia/${result[0].id}`, {
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
const highScore = computed(() => store.state.highScore) ;

//---   used to signal a new game start by changing visibilty of different components
const emit = defineEmits(["reset"]);
const reset = () => {
  emit("reset", true, false, false)
}
</script>

<template>
  <div>
    <h2>Let's see what you achieved...</h2>    
    <h3>Your total score is {{ newScore }} </h3>
    <h3>Your high-score is {{ highScore }}</h3>
    <ol>
    <li v-for="question in questions" :key="question.Id" >
        <tr v-html="question.question"></tr>
        <tr>Your answer: <span v-html="question.given_answer"></span></tr>
        <tr>Correct answer: <span v-html="question.correct_answer"></span></tr>
        <tr>Score gained: {{ score[question.Id - 1] }}</tr>
        <br><br>
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