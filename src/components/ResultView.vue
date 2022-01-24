<script setup>
  import QuestionListVue from './QuestionList.vue';
  
  const emit = defineEmits(["HighScore"]);
  const props = defineProps({  
  })

  //---   Start Test Data   ---
  const questions = [{"category":"Entertainment: Video Games","type":"multiple",
  "difficulty":"easy","question":"What is the name of the main healing item in Dark Souls?",
  "correct_answer":"Estus Flask","incorrect_answers":["Health Potion","Orange Juice","Ashen Flask"]},
  {"category":"Mythology","type":"boolean","difficulty":"easy","question":"According to Greek Mythology,Atlas was an Olympian God.","correct_answer":"False","incorrect_answers":["True"]},
  {"category":"Politics","type":"multiple","difficulty":"easy","question":"Who was the 45th President of the United States?","correct_answer":"Donald Trump","incorrect_answers":["Barack Obama","Bill Clinton","George Bush"]},{"category":"Entertainment: Television","type":"boolean","difficulty":"medium","question":"In &quot;Star Trek&quot;, Klingons respect William Shakespeare, they even suspect him having a Klingon lineage.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"hard","question":"Which actors made up the trio in &quot;The Good, the Bad, and the Ugly&quot;? ","correct_answer":"Clint Eastwood, Eli Wallach, and Lee Van Cleef","incorrect_answers":["Sergio Leone, Ennio Morricone, and Tonino Delli Colli","Yul Brynner, Steve McQueen, and Charles Bronson","Aldo Giuffr&egrave;, Mario Brega, and Luigi Pistilli"]},{"category":"History","type":"boolean","difficulty":"easy","question":"The French Kingdom helped the United States gain their independence over Great Britain during the Revolutionary War.","correct_answer":"True","incorrect_answers":["False"]},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"When someone is inexperienced they are said to be what color?","correct_answer":"Green","incorrect_answers":["Red","Blue","Yellow"]},{"category":"History","type":"multiple","difficulty":"medium","question":"What was the name of the planned invasion of Japan towards the end of World War II?","correct_answer":"Operation Downfall","incorrect_answers":["Operation Boarding Party","Operation Ironclad","Operation Aflame"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"Which two teams played in Super Bowl XLII?","correct_answer":"The New York Giants &amp; The New England Patriots","incorrect_answers":["The Green Bay Packers &amp; The Pittsburgh Steelers","The Philadelphia Eagles &amp; The New England Patriots","The Seattle Seahawks &amp; The Denver Broncos"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"What is a Tetris piece called?","correct_answer":"Tetromino","incorrect_answers":["Tetratile","Tetris","Tetripiece"]}]
  //---   End Test Data   ---
 /////////////////////////////////
 const calcScore = () => {
    let newScore=ref(0)
    const score=[]
    for(let i =0; i<questions.length ; i++){
      if (questions[i].given_answer == questions[i].correct_answer){
          newScore += 10
          score.push(10)
      }else{
        score.push(0)
      }
    } 
     emit('HighScore', newScore)
  }


</script>

<template>
  <div>
    <h2>This is the ResultView</h2>
    <QuestionListVue :questions="questions">

    </QuestionListVue>
    
    <h3>Your total score is {{newScore}} </h3>
    <ol>
    <li v-for="(question, i) in questions" :key="i" >
        <tr>
          <td>Your answer: {{question[i].given_answer}}</td>
          <td>----</td>
          <td>Correct answer: {{question[i].correct_answer}}</td>
          <td>----</td>
          <td>Score: {{score[i]}}</td>
        </tr>
    </li>
    </ol>
   </div>
</template>

<style scoped>
h2 {
  color: red;
}
</style>