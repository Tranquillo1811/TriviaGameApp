<script setup>
  import { reactive, ref, computed } from 'vue';
  import { useStore } from 'vuex';
  
  const difficulties = ["easy", "medium", "hard"];
  const selectedDifficulty = ref("");
  const selectedCategoryId = ref("");
  const categories = reactive([]);
  const username = ref('') 
  const Qnumber = ref(10)

  const emit = defineEmits(["start-game"]);
  const store = useStore();

const onSubmit = () => {

  //////////////////////////////////username validation
  if (username.value==''){
    alert("Write a username")
  }else{
    //--- write the username to the store
    store.commit("setUserName", username.value); 
   //------     This is Michel's part     ----- 
        console.log(username.value)
        const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
        const apiKey = 'hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge'


///////////////////////////////////////fetch user, if doesnt exist create a new one
      fetch(`${apiURL}trivia?username=${username.value}`)
      .then(response => response.json())  
      .then(response => {
            if (!(Object.keys(response).length===0)){
              console.log("Welcome back "+username.value) 
              console.log(Object.keys(response))
              console.log(response)
              console.log("highscore "+response[0].highScore)

              /////////////////////////////if no highscore exists for existing user create one
              if(response[0].highScore==null){
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

          //////////////creating new user
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
  
    ////Testing update score
    const newScore = 20
    console.log(username.value)
  //  fetch(`${apiURL}trivia?username=${username.value}`)
  //     .then(response => response.json())
  //     .then(response => {
  //         console.log(response)
  //         if (response[0].highScore < newScore){
              
  //             fetch(`${apiURL}trivia/${response[0].id}`, {
  //                   method: 'PATCH', // NB: Set method to PATCH
  //                   headers: {
  //                   'X-API-Key': apiKey,
  //                   'Content-Type': 'application/json'
  //                   },
  //                   body: JSON.stringify({
  //                     // Provide new highScore to add to user with id 1
  //                     highScore: newScore  
  //                   })
  //             })
  //             .then(response => {
  //                  if (!response.ok) {
  //                      throw new Error('Could not update high score')
  //                   }
  //                  return response.json()
  //                  })
  //             .then(updatedUser => {
  //                // updatedUser is the user with the Patched data
  //                console.log("New Highscore")
  //             })
  //             .catch(error => {
  //             })
  //         }else{
  //           console.log("Your score is "+newScore)
  //         }
  //   })

      
 
    //------     This is Oliver's part     -----    


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