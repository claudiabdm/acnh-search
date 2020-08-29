export interface ArtApi {
  id: number;
  'file-name': string;
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
  hasFake: boolean;
  'buy-price': number;
  'sell-price': number;
  image_uri: string;
  'museum-desc': string;
}