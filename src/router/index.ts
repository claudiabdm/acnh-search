import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Search from '@/views/Search.vue';
import Bugs from '@/views/Bugs.vue';
import Fish from '@/views/Fish.vue';
import SeaCreature from '@/views/SeaCreature.vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/bugs'},
  { path: '/bugs', name: 'bugs' , component: Bugs },
  { path: '/fish', name: 'fish',  component: Fish },
  { path: '/sea-creature', name:'sea-creature', component: SeaCreature },
  { path: '/search', name: 'search', component: Search},
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'navbar__link--active',
});

export default router;
