export interface CritterApi {
  id: number;
  fileName?: string;
  name: {
    nameEn: string,
    nameCn: string,
    nameDe: string,
    nameSp: string,
    nameFr: string,
    nameIt: string,
    nameJp: string,
    nameKr: string,
    nameNl: string,
    nameRu: string,
  };
  shadow?: string;
  availability: {
    monthNorthern: string,
    monthSouthern: string,
    time: string,
    isAllDay: boolean,
    isAllYear: boolean,
    location: string,
    rarity: string
  };
  price: number;
  priceFlick?: number;
  priceCj?: number;
  catchPhrase: string;
  museumPhrase: string;
}
