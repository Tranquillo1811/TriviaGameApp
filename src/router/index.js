import { createWebHistory, createRouter } from "vue-router";
import StartView from "../components/StartView.vue"
import QuestionView from "../components/QuestionView.vue"
import ResultView from "../components/ResultView.vue"


const routes = [
  {
    path: "/start",
    name: "start",
    component: StartView,
  },
  {
    path: "/question",
    name: "question",
    component: QuestionView,
  },
  {
    path: "/result",
    name: "result",
    component: ResultView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;