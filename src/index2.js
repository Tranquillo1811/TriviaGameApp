import Vue from 'vue'
import Vuex from 'Vuex'
import { LoginAPI } from '../components/Login/LoginAPI'

Vue.use(Veux)
export default new Veux.Trivia({
    state:{
        username: '',
        difficulty: '',
        Qnumber: '',
        catagory:'',
        profile: {},
        searchTest: '',
        error: '',
    },
    mutation: {
        setUsername: (state, payload) => {
            state.username = payload
        },
    
        setDifficulty: (state, payload) => {
            state.difficulty = payload
        },
        setQnumber: (state, payload) => {
            state.Qnumber = payload
        },
        setCatagory: (state, payload) => {
            state.catagory = payload
        },
        setProfile: (state, payload) => {
            state.profile = payload
        },
        setSearchText: (state, payload) => {
            state.searchTest = payload
        },
        setError: (state, payload) => {
            state.error = payload
        }
    },
    getters:{

    },
    actions:{
      async LoginUser({state,commit}){
        try{
            const loginDetails = JSON.stringify({
                user:  {
                    username: state.username,
                    difficulty: state.password,
                    Qnumber: state.Qnumber,
                    catagory: state.catagory,

                }
            })
           const user = await LoginAPI.login(loginDetails)
           
           if (user){
               commit('setProfile', user)
           }else{
               commit('setError', 'User was not found')  
           }
           
        }catch (e){
               commit('setError', e.message)  
      }  
    },
    async RegisterUser({state,commit}){
        try{
            const registerDetails = JSON.stringify({
                user:  {
                    username: state.username,
                    difficulty: state.password,
                    Qnumber: state.Qnumber,
                    catagory: state.catagory,

                }
            })
           const user = await LoginAPI.register(registerDetails)
           
           if (user){
               commit('setProfile', user)
           }else{
               commit('setError', 'User was not registered')  
           }
           
        }catch (e){
               commit('setError', e.message)  
      }
}
})
