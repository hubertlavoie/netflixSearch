import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import "./assets/style/main.scss";
import { store, key } from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faExternalLinkSquareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faEye, faExternalLinkSquareAlt);

const app = createApp(App);

app.use(Antd);
app.use(store, key);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
