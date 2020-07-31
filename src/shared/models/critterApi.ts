export interface CritterApi {
  id: number;
  fileName?: string;
  name: {
    'name-CNzh': string;
    'name-EUde': string;
    'name-EUen': string;
    'name-EUes': string;
    'name-EUfr': string;
    'name-EUit': string;
    'name-EUnl': string;
    'name-EUru': string;
    'name-JPja': string;
    'name-KRko': string;
    'name-TWzh': string;
    'name-USen': string;
    'name-USes': string;
    'name-USfr': string;
  };
  shadow?: string;
  availability: {
    'month-array-northern': number[];
    'month-array-southern': number[];
    'month-northern': string;
    'month-southern': string;
    time: string;
    'time-array': number[];
    isAllDay: boolean;
    isAllYear: boolean;
    location: string;
    rarity: string;
  };
  price: number;
  'price-flick'?: number;
  'price-cj'?: number;
  'catch-phrase': string;
  'museum-phrase': string;
  'icon_uri': string;
  'image_uri': string;
}
