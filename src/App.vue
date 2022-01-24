<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import StartView from "./components/StartView.vue"
  import QuestionView from "./components/QuestionView.vue"
  import ResultView from "./components/ResultView.vue"

  import {reactive,onBeforeMount, ref, computed}from 'vue'

  const question = {"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"What is the name of the main healing item in Dark Souls?","correct_answer":"Estus Flask","incorrect_answers":["Health Potion","Orange Juice","Ashen Flask"]}

  const isVisibleStart = ref(true)
  const isVisibleQuestion = ref(false)
  const isVisibleResult = ref(false)

  const questions = reactive([]);
  const onStartGame = () => { 
    console.log("entered OnStartGame");
    isVisibleStart.value = false;
    isVisibleQuestion.value = true;
    isVisibleResult.value = false;
    let url = `https://opentdb.com/api.php?amount=${Qnumber.value}`;
      if(selectedCategoryId.value != "") {
        url += `&category=${selectedCategoryId.value}`;
      }
      if(selectedDifficulty.value != "") {
        url += `&difficulty=${selectedDifficulty.value}`;
      }
      console.log("url",url);
      fetch(url)
      .then(response => response.json())
      .then(result => { 
        for (const iterator of result.results) {
          questions.push(iterator);
        }
      })
  }
  ///////////////////////Fetch user and update highscore
  const updateScore = () => { 
    
    const newScore = 20
    console.log(username.value)
   fetch(`${apiURL}trivia?username=${username.value}`)
      .then(response => response.json())
      .then(response => {
          console.log(response)
          if (response[0].highScore < newScore){
              
              fetch(`${apiURL}trivia/${response[0].id}`, {
                    method: 'PATCH', // NB: Set method to PATCH
                    headers: {
                    'X-API-Key': apiKey,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      // Provide new highScore to add to user with id 1
                      highScore: newScore  
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
              .catch(error => {
              })
          }else{
            console.log("Your score is "+newScore)
          }
    })
  }

</script>


<template>
  <div id="app">

    <StartView v-if="isVisibleStart" @start-game="onStartGame()" />
    <QuestionView v-if="isVisibleQuestion" :question="question"  />
    <ResultView v-if="isVisibleResult"  @XXX="updateScore()"/>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
