import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import light from './theme';
import '@mdi/font/css/materialdesignicons.css';
import CustomIcon from '@/components/CustomIcon.vue';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: { light },
    options: {
      variations: false,
      customProperties: true,
    },
  },
  icons: {
    iconfont: 'mdi',
    values: {
      bugs: {
        component: CustomIcon,
        props: {
          name: 'bugs',
        }
      },
      fish: {
        component: CustomIcon,
        props: {
          name: 'fish',
        }
      },
      seaCreature: {
        component: CustomIcon,
        props: {
          name: 'sea',
        }
      }
    },
  },
});
