import Vue from 'vue';
import { MdList, MdDialog } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/helpers/filters';

Vue.config.productionTip = false;
Vue.use(MdList);
Vue.use(MdDialog);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
