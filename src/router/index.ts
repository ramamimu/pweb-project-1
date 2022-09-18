import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "clock",
      component: () => import("../views/Clock.vue"),
    },
  ],
});

export default router;
