import axios from 'axios';
import { Critter } from './models/critter';
import { CritterApi } from './models/critterApi';

const getMonths = function(monthsArr: number[]): number[][] {
  let startMonth: number[] = [];
  let endMonth: number[] = [];
  switch (monthsArr.length) {
    case 1:
      startMonth = endMonth = monthsArr;
      break;
    case 2:
      startMonth = monthsArr.slice(0, 1);
      endMonth = monthsArr.slice(1, 2);
      break;
    case 4:
      startMonth = monthsArr.slice(0, 1).concat(monthsArr.slice(2, 3));
      endMonth = monthsArr.slice(1, 2).concat(monthsArr.slice(3, 4));
      break;
  }
  return [startMonth, endMonth];
};

const createCritter = function(
  critter: CritterApi,
  lang: string,
  buyer: string,
  critterType: string,
  hemisphere: string,
): Critter {
  const monthsArr = critter.availability[`month-${hemisphere}`]
    .split(' & ')
    .join('-')
    .split('-')
    .map((num: number) => +num - 1);
  const [startMonth, endMonth] = critter.availability.isAllYear
    ? [[0], [11], [...Array(12).keys()]]
    : getMonths(monthsArr);
  const availableMonths = critter.availability[`month-array-${hemisphere}`].map(
    (month: number) => month - 1,
  );
  const critterObj: Critter = {
    id: critter.id,
    name: critter.name[lang],
    startMonth,
    endMonth,
    availableMonths,
    allYear: critter.availability.isAllYear,
    time: critter.availability.time ? critter.availability.time : 'All Day',
    timeArray: critter.availability['time-array'].map(num => num++),
    location: critter.availability.location,
    state: '',
    rarity: critter.availability.rarity || 'Common',
    price: critter.price,
    priceCjFlick: critter[buyer],
    shadow: critter.shadow,
    img: critter.image_uri,
    icon: critter.icon_uri,
    type: critterType,
    checked: false,
  };
  return critterObj;
};

const getCritters = async function(
  critterType = 'fish',
  lang = 'name-EUen',
  hemisphere = 'northern',
): Promise<Critter[]> {
  let buyer = '';
  const response = await axios.get(
    `${process.env.VUE_APP_API_URL}/${critterType}`,
  );
  const critterList: CritterApi[] = response.data;
  buyer =
    critterType === 'bugs'
      ? 'price-flick'
      : critterType === 'fish'
      ? 'price-cj'
      : '';
  return critterList.map(critter =>
    createCritter(critter, lang, buyer, critterType, hemisphere),
  );
};

const loadCritters = async function(
  critterType = 'fish',
  lang = 'name-EUen',
  hemi = 'northern',
): Promise<Critter[]> {
  const critters = await getCritters(critterType, lang, hemi);
  return critters;
};

export const crittersData = {
  getCritters,
  loadCritters,
};
