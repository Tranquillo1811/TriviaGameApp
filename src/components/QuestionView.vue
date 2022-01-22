<script setup>
import {reactive, ref} from 'vue'
import App from '../App.vue'

const Answers = reactive(["HelloMeoo", "Jhonny","mahh","boosboos"]) 
const question = "What is the cutest neckname?"

const MultipleChoice= ref(false)
const TrueOrFalse= ref(false)

const Questiontype = props.QuestionType

const props = defineProps({
  QuestionType: String
})

console.log(props.QuestionType)

</script>

<template>

  <div v-show="Questiontype=='MultipleChoice'">
    <h2>The is the QuestionView</h2>
    <h2>{{question}}</h2>
    <ul> 
      <li v-for="(answer, i) in Answers" :key="i" >
         <button type="button" > {{ answer }}</button><br><br>
     </li>
    </ul>
  </div>

  <div v-show="Questiontype=='TrueOrFalse'">
    <h2>The is the QuestionView</h2>
    <h2>{{question}}</h2>
         <button type="button">True</button><br><br>
         <button type="button">False</button><br><br>
  </div>
  
</template>

<style scoped>
h2 {
  color: blue;
}
</style>