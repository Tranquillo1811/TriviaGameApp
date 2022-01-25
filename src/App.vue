<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import StartView from "./components/StartView.vue"
  import QuestionView from "./components/QuestionView.vue"
  import ResultView from "./components/ResultView.vue"

  import {reactive, onBeforeMount, ref, computed} from 'vue'

  //const question = {"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"What is the name of the main healing item in Dark Souls?","correct_answer":"Estus Flask","incorrect_answers":["Health Potion","Orange Juice","Ashen Flask"]}
  
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
    if(previousQuestion.Id == questions.length) {
      //---   reached last question
      console.log("questions",questions);
      //---   call resultview

    }
    else {
      //---   set value for given_answer in previousQuestion to the
      //      accordant element in questions array
      questions[previousQuestion.Id - 1].given_answer = previousQuestion.given_answer;
      currentQuestionID.value += 1;
    }
  }
</script>


<template>
  <div>

    <StartView v-if="isVisibleStart" @start-game="onStartGame" />
    <QuestionView v-if="isVisibleQuestion" 
      :question="questions[currentQuestionID]" 
      @next-question="OnNextQuestion" />
    <ResultView v-if="isVisibleResult" />

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
