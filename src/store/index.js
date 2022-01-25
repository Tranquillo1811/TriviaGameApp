import { createStore } from "vuex";

const store = createStore({
    state: {
        userName: "initial name",
        newScore: 0,
        questions: [2,3,4]
    },
    mutations: {
        setUserName: (state, payload) => {
            state.userName = payload;
        },
        setNewScore: (state, payload) => {
            state.newScore = payload;
        },
        setQuestions: (state, payload) => {
            state.questions = payload;
        }
    }
})

export default store;