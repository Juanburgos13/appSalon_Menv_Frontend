import "./assets/main.css";
import "vue-toast-notification/dist/theme-sugar.css";

import { defaultConfig, plugin } from "@formkit/vue";

import App from "./App.vue";
import config from "../formkit.config";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { useToast } from "vue-toast-notification";

const $toast = useToast({
  duration: 5000,
  position: "top-right",
});

const app = createApp(App);

app.provide("toast", $toast);
app.use(plugin, defaultConfig(config));
app.use(createPinia());
app.use(router);

app.mount("#app");
