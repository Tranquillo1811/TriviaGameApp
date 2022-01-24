<script setup>
import {reactive, ref} from 'vue';
const username = ref('') 
const Qnumber = ref(10)
const questions = reactive([]); 

const emit = defineEmits(["start-game"]);

    const onSubmit = () => {
        if(Qnumber.value <= 10 && Qnumber.value >= 1) {
          emit("start-game");
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
        else {
          alert("Number of questions must be between 1 and 10...");
        }
        
    }

    const difficulties = ["easy", "medium", "hard"];
    const selectedDifficulty = ref("");
    const selectedCategoryId = ref("");

    const categories = reactive([]);
    fetch("https://opentdb.com/api_category.php")
    .then(response => response.json())
    .then(result => { 
      for (const iterator of result.trivia_categories) {
           categories.push(iterator);
      }
    })



</script>

<template>
  <div>
    <h2>This is the StartView</h2><br>
    <label>Please type in your Username</label><br>
    <input type="text" placeholder="Type in your username...!" v-model="username"><br><br>
    
    <label>Please select your difficulty</label><br>
    <select v-model="selectedDifficulty">
      <option 
        v-for="difficulty in difficulties" 
        :key="difficulty">{{difficulty}}</option> 
    </select><br><br>
    
    <label>Please select number of questions</label><br />
    <input 
      type="number" min="1" max="10" 
      placeholder="Type in a number between 1 and 10" v-model="Qnumber" />
  
      <br><br>
    
    <label>Please select your category</label><br>
    <select v-model="selectedCategoryId">
      <option 
        v-for="category in categories" 
        :key="category.id"
        :value="category.id">{{category.name}}</option> 
    </select><br><br>

    <button @click="onSubmit">Start quiz</button>
  </div>
</template>

<style scoped>
h2 {
  color: #42b983;
}
</style>