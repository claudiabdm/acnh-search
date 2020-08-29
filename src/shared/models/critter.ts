export interface Critter {
  id: number;
  name: string;
  startMonth: number[];
  endMonth: number[];
  availableMonths: number[];
  allYear: boolean;
  time: string;
  timeArray: number[];
  location: string;
  state: string;
  rarity: string;
  img?: string;
  icon?: string;
  price: number;
  priceCjFlick: number;
  shadow?: string;
  type: string;
  checked: boolean;
}
