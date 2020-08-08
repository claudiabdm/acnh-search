import { VuetifyIcon } from 'vuetify/types/services/icons'
import { Critter } from './critter';

export interface CritterTypeObj {
  text: string,
  value: string,
  icon: VuetifyIcon,
  list: Critter[],
  selected: boolean,
}