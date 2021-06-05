import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import "./assets/style/main.scss";
import { store, key } from "./store/store";

const app = createApp(App);

app.use(Antd);
app.use(store, key);

app.mount("#app");
