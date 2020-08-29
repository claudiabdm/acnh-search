import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import CrittersSearch from '@/views/CrittersSearch.vue';
import CrittersMonthly from '@/views/CrittersMonthly.vue';
import UserPage from '@/views/UserPage.vue';
import ArtSearch from '@/views/ArtSearch.vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/critters/bugs'},
  { path: '/search', name: 'search', component: CrittersSearch },
  { path: '/critters/:critterType', name: 'critters', component: CrittersMonthly, props:true },
  { path: '/me', name: 'me', component: UserPage },
  { path: '/art', name: 'art', component: ArtSearch },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'navbar__link--active',
});

export default router;
