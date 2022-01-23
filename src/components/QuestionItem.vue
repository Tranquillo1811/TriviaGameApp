<script setup>

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


</script>

<template>
  <div v-if="QuestionType=='MultipleChoice'">
    <h2>The is the QuestionView</h2>
    <h2>{{question}}</h2>
    <ol> 
      <li v-for="(answer, i) in Answers" :key="i" >
         <button type="button" > {{ answer }}</button><br><br>
     </li>
    </ol>
  </div>

  <div v-if="QuestionType=='TrueOrFalse'">
    <h2>The is the QuestionView</h2>
    <h2>{{question}}</h2>
         <button type="button">True</button><br><br>
         <button type="button">False</button><br><br>
  </div>

  <table>
    <tbody>
      <tr>
        <td>Question {{ id }}:</td>
        <td v-html="question"></td>
        <!-- <td>{{ props.question }}</td> -->
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