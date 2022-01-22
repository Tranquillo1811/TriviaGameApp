<script setup>
import {reactive, ref} from 'vue';
const username = ref('') 
const difficulty = ref('')
const Qnumber = ref('')
const catagory = ref('')

let isVisible1 = reactive('true')

const emit = defineEmits(['toggle-visibility'])

const onSubmit = () => {
    emit('toggle-visibility', props.isVisible1) 
}


let props = defineProps({
    isVisible1:{
      type: Boolean,
      required: true,
    },
})

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