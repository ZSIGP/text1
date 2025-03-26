import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);

// 添加全局事件总线
app.config.globalProperties.$bus = createApp({});

app.mount("#app");
