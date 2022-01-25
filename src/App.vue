<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import StartView from "./components/StartView.vue"
  import QuestionView from "./components/QuestionView.vue"
  import ResultView from "./components/ResultView.vue"
  import store from "./store";
  import {reactive, onBeforeMount, ref, computed} from 'vue'

  const isVisibleStart = ref(true);
  const isVisibleQuestion = ref(false);
  const isVisibleResult = ref(false);



  const questions = reactive([]);
  const history = reactive([]);
  const currentQuestionID = ref(0);

  const sessionToken = ref('')
  
  const getSessionToken = () => {

  fetch('https://opentdb.com/api_token.php?command=request')
  .then(response => response.json())
  .then(result => {
      sessionToken.value = result.token
  })
  }
  getSessionToken()

  const onStartGame = (arg) => { 
    console.log("entered OnStartGame");
    currentQuestionID.value =0;
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
      url +=("&token="+sessionToken.value)

      console.log("url",url);
      fetch(url)
      .then(response => response.json())
      .then(result => { 
        //for (const iterator of result.results) {
        for (let index = 0; index < result.results.length; index++) {
          result.results[index].Id = index + 1;
          questions.push(result.results[index]);
          history.push(result.results[index])
        }
      })
      .then(store.commit("setQuestions",questions))
  }

const OnNextQuestion = (previousQuestion) => {
  //---   set value for given_answer in previousQuestion to the
  //      accordant element in questions array
  questions[previousQuestion.Id - 1].given_answer = previousQuestion.given_answer;
  if(previousQuestion.Id == questions.length) {
    //---   reached last question
    isVisibleStart.value = false;
    isVisibleQuestion.value = false;
    isVisibleResult.value = true;
  }
  else {
      currentQuestionID.value += 1;
    }
  }
const onReset = (start, question, result) => { 
    
    isVisibleStart.value = start;
    isVisibleQuestion.value = question;
    isVisibleResult.value = result;

}  
</script>


<template>
  <div>

    <StartView v-show="isVisibleStart" @start-game="onStartGame" />
    <QuestionView v-if="isVisibleQuestion" 
      :question="questions[currentQuestionID]" 
      @next-question="OnNextQuestion" />
   
    <ResultView v-if="isVisibleResult" @reset="onReset" />


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
