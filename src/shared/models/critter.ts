export interface Critter {
  id: number;
  name: string;
  startMonth: number[];
  endMonth: number[];
  availableMonths: number[];
  allYear: boolean;
  time: string;
  location: string;
  state: string;
  rarity: string;
  img?: string;
  price: number;
  priceCjFlick: number;
  shadow?: string;
  type: string;
}
