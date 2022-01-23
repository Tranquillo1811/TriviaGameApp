<script setup>
import {reactive, ref} from 'vue';
const username = ref('') 
const Qnumber = ref('')

const emit = defineEmits(['toggle-visibilityStart'])

const onSubmit = () => {
    emit('toggle-visibilityStart') 
}

    const difficulties = ref(["easy", "medium", "hard"]);

    const questions = reactive([]);
    fetch("https://opentdb.com/api.php?amount=10")
      .then(response => response.json())
      .then(result => { 
        for (const iterator of result.results) {
          questions.push(iterator);
        }
      })

    const categories = reactive([]);
    fetch("https://opentdb.com/api_category.php")
    .then(response => response.json())
    .then(result => { 
      console.log("result", result.trivia_categories)
      for (const iterator of result.trivia_categories) {
           categories.push(iterator);
      }
    })



</script>

<template>
  <div>
  <h2>The is the StartView</h2><br>
  <label>Please type in your Username</label><br>
  <input type="text" placeholder="Type in your username!" v-model="username"><br><br>
  
  <label>Please select your difficulty</label><br>
  <select v-model="difficulties">
    <option v-for="difficulty in difficulties" :key="difficulty" >{{difficulty}}</option> 
  </select><br><br>
  
  <label>Please select number of questions</label><br>
  <input type="number" min="1" max="10" placeholder="Type in a number between 1 and 10" v-model="Qnumber"><br><br>
  
  <label>Please select your category</label><br>
  <select v-model="categories">
    <option v-for="category in categories" :key="category.id" >{{category.name}}</option> 
  </select><br><br>

  <button @click="onSubmit">Start quiz</button>
  </div>
</template>

<style scoped>
h2 {
  color: #42b983;
}
</style>