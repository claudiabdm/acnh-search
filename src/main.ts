import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueCompositionAPI from '@vue/composition-api'
import formatMonthFilter from '@/shared/format-month-filter';

Vue.use(VueCompositionAPI)
Vue.filter('formatMonth', formatMonthFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
