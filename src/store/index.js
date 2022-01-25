import { createStore } from "vuex";

const store = createStore({
    state: {
        highScore: 0,
        userName: "initial name",
        newScore: 0,
        questions: [],
        isVisibleStart: true,
        isVisibleQuestion: false,
        isVisibleResult: false,
    },
    mutations: {
        setHighScore: (state, payload) => {
            state.highScore = payload;
        },
        setUserName: (state, payload) => {
            state.userName = payload;
        },
        setNewScore: (state, payload) => {
            state.newScore = payload;
        },
        setQuestions: (state, payload) => {
            state.questions = payload;
        },
        setVisStart: (state, payload) => {
            state.isVisibleStart = payload;
        },
        setVisQuestion: (state, payload) => {
            state.isVisibleQuestion = payload;
        },
        setVisResult: (state, payload) => {
            state.isVisibleResult = payload;
        }
    }
})

export default store;