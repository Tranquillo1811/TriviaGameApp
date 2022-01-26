<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import StartView from "./components/StartView.vue"
  import QuestionView from "./components/QuestionView.vue"
  import ResultView from "./components/ResultView.vue"
  import store from "./store";
  import {reactive, onBeforeMount, ref, computed} from 'vue'

  //--- control the visibilty of the respective views (components)
  const isVisibleStart = ref(true);
  const isVisibleQuestion = ref(false);
  const isVisibleResult = ref(false);

  //--- used to store retrieved questions from API
  const questions = reactive([]);

  //--- id of the current question being displayed
  const currentQuestionID = ref(0);

  //--- stores session token for question API call 
  const sessionToken = ref('')
  
  //---- retrieve session token
  const getSessionToken = () => {
    fetch('https://opentdb.com/api_token.php?command=request')
    .then(response => response.json())
    .then(result => {
      sessionToken.value = result.token
    })
  }
  getSessionToken()

  //--- function that is executed when a new round of questions is initiated
  const onStartGame = (arg) => { 
    //--- ensure that question array is empty
    while(questions.length > 0) {
      questions.pop();
    }
    currentQuestionID.value =0;
    //--- set initital visibility
    isVisibleStart.value = false;
    isVisibleQuestion.value = true;
    isVisibleResult.value = false;

    //--- generating URL for Question API call
    let url = `https://opentdb.com/api.php?amount=${arg.qnumber}`;
      if(arg.categoryId != "") {
        url += `&category=${arg.categoryId}`;
      }
      if(arg.difficulty != "") {
        url += `&difficulty=${arg.difficulty}`;
      }
      url +=("&token="+sessionToken.value)
      //--- actually call the question API
      fetch(url)
      .then(response => response.json())
      .then(result => { 
        if (result.results.length!=0){
        //--- push retrieved questions to questions array
        for (let index = 0; index < result.results.length; index++) {
          result.results[index].Id = index + 1;
          questions.push(result.results[index]);
        }
        //--- If no more questions reset token
        }else{
          alert("Not enough questions!")
          let url2=`https://opentdb.com/api_token.php?command=reset&token=${sessionToken.value}`
          fetch(url2)
          .then(response => response.json())
          .then(result => { })
        }
      })
      //--- store questions array into store state
      .then(store.commit("setQuestions",questions))
  }

//---   function that is called on "next-question" event (triggered when the user answered the previous question)
//---   previousQuestion contains the question object returned from the next-question event in the QuestionView
const OnNextQuestion = (previousQuestion) => {
  //---   set value for given_answer in previousQuestion to the
  //      accordant element in questions array
  questions[previousQuestion.Id - 1].given_answer = previousQuestion.given_answer;
  if(previousQuestion.Id == questions.length) {
    //---   reached last question
    //---   set new visibility status
    isVisibleStart.value = false;
    isVisibleQuestion.value = false;
    isVisibleResult.value = true;
  }
  else {   //---   last question is not yet reached
      //---   raise the counter for the current question
      //---   This actually automatically refreshed the QuestionView component with the next question
      currentQuestionID.value += 1;
    }
  }

//---   function to return to the StartView
const onReset = (start, question, result) => {     
    isVisibleStart.value = start;
    isVisibleQuestion.value = question;
    isVisibleResult.value = result;
}  
</script>


<template>
  <div>

    <StartView v-show="isVisibleStart" @start-game="onStartGame" />
    <QuestionView v-if="questions[currentQuestionID] != undefined && isVisibleQuestion" 
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
