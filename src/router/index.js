import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Main.vue"),
  },
  // {
  //   path: "/basic",
  //   name: "basic",
  //   component: () => import("../views/basic.vue"),
  // },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
