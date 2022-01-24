<script setup>
import {reactive, ref} from 'vue';

const username = ref('') 
const difficulty = ref('')
const Qnumber = ref('')
const catagory = ref('')

const emit = defineEmits(['toggle-visibilityStart'])

const onSubmit = () => {
    emit('toggle-visibilityStart') 
///////////////////////////////////////registering user with API
console.log(username.value)
const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
const apiKey = 'hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge'


///////////////////////////////////////fetch user, if doesnt exist create a new one

fetch(`${apiURL}trivia?username=${username.value}`)
    .then(response => response.json())
    .then(response => {
          if (!(Object.keys(response).length === 0)){
             console.log("Welcome back "+username.value) 
          }else{
             console.log("Welcome "+username.value)
            
                fetch(`${apiURL}trivia`, {
                        method: 'POST',
                        headers: {
                        'X-API-Key': apiKey,
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                        username: username.value, 
                        highScore: 0  
                        })
                })
                .then(response => {
                        if (!response.ok) {
                        throw new Error('Could not create new user')
                        }
                        return response.json()
                })
                .then(newUser => {
                console.log("Created: "+newUser.username.value) 
                })
                .catch(error => {
                console.log("error "+error)})
          }
    }).catch(error => {
                console.log("error "+error)})
      

/////////////////////////////////
}

</script>

<template>

  <div>
  <h2>The is the StartView</h2><br>
  <label>Please type in your Username</label><br>
  <input type="text" placeholder="Type in your username!" v-model="username"><br><br>
  
  <label>Please select your difficulty</label><br>
  <select v-model="difficulty"><br>
   // <option v-for="(choice, i) in difficultyList" :key="i" >{{choice}}</option> 
  </select><br><br>
  
  <label>Please select number of questions</label><br>
  <input type="number" min="1" max="10" placeholder="Type in a number between 1 and 10" v-model="Qnumber"><br><br>
  
  <label>Please select your catagory</label><br>
  <select v-model="catagory"><br>
   // <option v-for="(catagory, i) in catagoryList" :key="i" >{{catagory}}</option> 
  </select><br><br>

  <button @click="onSubmit">Start quiz</button>
  </div> 

</template>

<style scoped>
h2 {
  color: #42b983;
}
</style>