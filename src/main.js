import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { auth } from "./firebase/firebaseinit.js";
import "firebase/auth";

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    createApp(App).use(store).use(router).mount("#app");
  }
});
// createApp(App).use(store).use(router).mount("#app");
