import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;

axios.defaults.withCredentials = true;
