import { fish } from './data/fish';
import { bugs } from './data/bugs';
import { Critter } from './models/critter';
import { CritterApi } from './models/critterApi';

const getSearch = function(critterSearch: string) {
  const critterType = critterSearch.slice(0, 4);
  const lang = critterSearch.slice(4) === 'ES' ? 'name-sp' : 'name-en';
  return [critterType, lang];
};

const getAvailableMonths = function(
  startMonth: number,
  endMonth: number,
): number[] {
  let availableMonths: number[] = [];
  if (startMonth < endMonth) {
    for (let i = startMonth; i <= endMonth; i++) {
      availableMonths.push(i);
    }
  } else {
    availableMonths = [...Array(endMonth + 1).keys()];
    for (let i = startMonth; i <= 11; i++) {
      availableMonths.push(i);
    }
  }
  return availableMonths;
};

const getMonths = function(monthsArr: number[]): number[][] {
  let startMonth: number[] = [];
  let endMonth: number[] = [];
  let availableMonths: number[] = [];
  switch (monthsArr.length) {
    case 1:
      startMonth = endMonth = availableMonths = monthsArr;
      break;
    case 2:
      startMonth = monthsArr.slice(0, 1);
      endMonth = monthsArr.slice(1, 2);
      availableMonths = getAvailableMonths(startMonth[0], endMonth[0]);
      break;
    case 4:
      startMonth = monthsArr.slice(0, 1).concat(monthsArr.slice(2, 3));
      endMonth = monthsArr.slice(1, 2).concat(monthsArr.slice(3, 4));
      availableMonths = getAvailableMonths(startMonth[0], endMonth[0]).concat(
        getAvailableMonths(startMonth[1], endMonth[1]),
      );
      break;
  }
  return [startMonth, endMonth, availableMonths];
};

const createCritter = function(
  critter: CritterApi,
  lang: string,
  buyer: string,
  critterType: string,
): Critter {
  const monthsArr = critter.availability.monthNorthern
    .split(' & ')
    .join('-')
    .split('-')
    .map(num => +num - 1);
  const [startMonth, endMonth, availableMonths] = critter.availability.isAllYear
    ? [[0], [11], [...Array(12).keys()]]
    : getMonths(monthsArr);

  const critterObj: Critter = {
    id: critter.id,
    name: critter.name[lang],
    startMonth,
    endMonth,
    availableMonths,
    allYear: critter.availability.isAllYear,
    time: critter.availability.time ? critter.availability.time : 'All Day',
    location: critter.availability.location,
    state: '',
    rarity: critter.availability.rarity,
    price: critter.price,
    priceCjFlick: critter[buyer],
    shadow: critter.shadow,
    img: `/img/critters/${critterType}-${critter.id}.png`,
    type: critterType,
  };
  return critterObj;
};

const getCritters = function(search: string): Critter[] {
  const [critterType, lang] = getSearch(search);
  let buyer = '';
  if (critterType === 'bugs') {
    const bugsList: any = bugs;
    buyer = 'priceFlick';
    return Object.keys(bugsList).map(critter =>
      createCritter(bugsList[critter], lang, buyer, critterType),
    );
  } else {
    const fishList: any = fish;
    buyer = 'priceCj';
    return Object.keys(fishList).map(critter =>
      createCritter(fishList[critter], lang, buyer, critterType),
    );
  }
};

export const crittersService = {
  getCritters,
};
