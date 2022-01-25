<script setup>
  import { reactive, ref, computed } from 'vue';
  //import { store } from '../store';
  import { useStore } from 'vuex'; 
  
  const store = useStore();
  //--- hard-coded values for various difficulty levels (no API found to retrieve that)
  const difficulties = ["easy", "medium", "hard"];

  const selectedDifficulty = ref("");
  const selectedCategoryId = ref("");
  //--- retrieved question categories will be stored in here
  const categories = reactive([]);
  const username = ref('') 
  //--- number of Questions
  const Qnumber = ref(10)

  //--- event when game is started by user. subscribed to in app.vue
  const emit = defineEmits(["start-game"]);

  //--- action when button to start the quiz is clicked
  const onSubmit = () => {
    //---   username validation
  if (username.value==''){
    alert("Write a username")
  }
  else {
    //---   write the username to the store
    store.commit("setUserName", username.value); 
    const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
    const apiKey = 'hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge'
    //---   fetch user, if doesnt exist create a new one
    fetch(`${apiURL}trivia?username=${username.value}`)
    .then(response => response.json())  
    .then(response => {
      if (!(Object.keys(response).length===0)) {
        //---   if no highscore exists for existing user create one
        if(response[0].highScore==null) {
          fetch(`${apiURL}trivia/${response[0].id}`, {
            method: 'PATCH', // NB: Set method to PATCH
            headers: {
             'X-API-Key': apiKey,
             'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            // Provide new highScore to add to user with id 1
            highScore: 0  
            })
          })
        }
        
      } 
      else {   //---   user does not exist in DB so far
        //---   creating new user
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
        .catch(error => {
          console.log("error "+error)})
        }
    })
    .catch(error => {
      console.log("error " + error)
    }) 
    //--- validating the number of questions is between 1 and 10
    if(Qnumber.value <= 10 && Qnumber.value >= 1) {
      emit("start-game", { 
        qnumber: Qnumber.value,
        categoryId: selectedCategoryId.value,
        difficulty: selectedDifficulty.value 
      });
    }
    else {
      alert("Number of questions must be between 1 and 10...");
    }
  
  }} 

  //---   Get all available question categories to populate into select element
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
    <h2>Trivia Game App</h2>
    
    <section title="UserName">
      <label>Please type in your Username</label><br>
      <input type="text" placeholder="Type in your username...!" v-model="username">
    </section>

    <section title="Difficulty">
      <label>Please select your difficulty</label><br />
      <label style="font-size: 10pt;">
        (leave blank for random difficulty on each question)
      </label><br />
      <select v-model="selectedDifficulty">
        <option 
          v-for="difficulty in difficulties" 
          :key="difficulty">{{difficulty}}</option> 
      </select>
    </section>

    <section title="QuestionNumbers">
      <label>Please select number of questions</label><br />
      <input 
        type="number" min="1" max="10" 
        placeholder="Type in a number between 1 and 10" v-model="Qnumber" />
    </section>
    
    <section title="Category">
      <label>Please select your category</label><br />
      <label style="font-size: 10pt;">
        (leave blank for random category on each question)
      </label><br />
      <select v-model="selectedCategoryId">
        <option 
          v-for="category in categories" 
          :key="category.id"
          :value="category.id">{{category.name}}</option> 
      </select>
    </section>

    <section>
      <button @click="onSubmit">Start quiz</button>
    </section>
  </div>
</template>

<style scoped>
  section {
    padding: 10px 5px;
  }
  h2 {
    color: #42b983;
  }
</style>