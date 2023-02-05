import { createRouter, createWebHistory } from "vue-router";
import { useRoute } from "vue-router";
import AddCity from "../views/AddCity.vue";
import WeatherView from "../views/WeatherView.vue";
import LoginSignUp from "../views/LoginSignUp.vue";
import { auth } from "../firebase/firebaseinit.js";
const routes = [
  {
    path: "/",
    name: "AddCity",
    component: AddCity,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/weather/:city",
    name: "WeatherView",
    component: WeatherView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "LoginSignUp",
    component: LoginSignUp,
    meta: {
      requiresAuth: false,
    },
  },
];
const route = useRoute();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === "./login" && auth.currentUser) {
    next("/");
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/login");
    return;
  }

  next();
});
export { route };
export default router;
