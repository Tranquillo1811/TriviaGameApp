import { createStore } from "vuex";

const store = createStore({
    state: {
        userName: "initial name"
    },
    mutations: {
        setUserName: (state, payload) => {
            state.userName = payload;
        }
    }
})

export default store;