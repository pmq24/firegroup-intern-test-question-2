import { createApp } from "vue";
import App from "./App.vue";
import { plugin, defaultConfig } from "@formkit/vue";
import "@picocss/pico/css/pico.min.css";

createApp(App).use(plugin, defaultConfig).mount("#app");
