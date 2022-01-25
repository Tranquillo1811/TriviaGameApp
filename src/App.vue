<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import StartView from "./components/StartView.vue"
  import QuestionView from "./components/QuestionView.vue"
  import ResultView from "./components/ResultView.vue"

  import {reactive, onBeforeMount, ref, computed} from 'vue'

  const isVisibleStart = ref(true)
  const isVisibleQuestion = ref(false)
  const isVisibleResult = ref(false)

  const questions = reactive([]);
  const currentQuestionID = ref(0);

  const onStartGame = (arg) => { 
    console.log("entered OnStartGame");
    isVisibleStart.value = false;
    isVisibleQuestion.value = true;
    isVisibleResult.value = false;
    let url = `https://opentdb.com/api.php?amount=${arg.qnumber}`;
      if(arg.categoryId != "") {
        url += `&category=${arg.categoryId}`;
      }
      if(arg.difficulty != "") {
        url += `&difficulty=${arg.difficulty}`;
      }
      console.log("url",url);
      fetch(url)
      .then(response => response.json())
      .then(result => { 
        //for (const iterator of result.results) {
        for (let index = 0; index < result.results.length; index++) {
          result.results[index].Id = index + 1;
          questions.push(result.results[index]);
        }
      })
  }

 const OnNextQuestion = (previousQuestion) => {
    console.log("previousQuestion", previousQuestion);
    questions[previousQuestion.Id - 1].given_answer = previousQuestion.given_answer;
    if(previousQuestion.Id == questions.length) {
      //---   reached last question
      console.log("questions",questions);
      //---   call result view
      isVisibleStart.value = false;
      isVisibleQuestion.value = false;
      isVisibleResult.value = true;
    }
    else {
      //---   set value for given_answer in previousQuestion to the
      //      accordant element in questions array
      currentQuestionID.value += 1;
    }
  }

/////////////////////////calculate score

  ///////////////////////Fetch user and update highscore
  const updateScore = () => { 
    
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
  <div>

    <StartView v-if="isVisibleStart" @start-game="onStartGame" />
    <QuestionView v-if="isVisibleQuestion" 
      :question="questions[currentQuestionID]" 
      @next-question="OnNextQuestion" />
   
    <ResultView v-if="isVisibleResult" @HighScore="updateScore" :questions="questions" />


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
