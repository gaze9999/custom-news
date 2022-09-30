import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routePages = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/ffxiv",
    name: "FFXIV",
  },
  {
    path: "/mhr",
    name: "Monster hunter Rise",
  },
  {
    path: "/splatoon3",
    name: "Splatoon 3",
  },
  {
    path: "/about",
    name: "about",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/ffxiv",
      name: "FFXIV",
      component: () => import("../views/FFXIVView.vue"),
    },
    {
      path: "/mhr",
      name: "Monster hunter Rise",
      component: () => import("../views/MHRView.vue"),
    },
    {
      path: "/splatoon3",
      name: "Splatoon 3",
      component: () => import("../views/SplatoonView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
export { routePages };
