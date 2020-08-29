import axios from 'axios';
import { Art } from './models/art';
import { ArtApi } from './models/artApi';

const createArtItem = function(artItem: ArtApi, lang: string): Art {
  const artObj: Art = {
    id: artItem.id,
    name: artItem.name[lang],
    hasFake: artItem.hasFake,
    buyPrice: artItem['buy-price'],
    sellPrice: artItem['sell-price'],
    img: artItem.image_uri,
  };
  return artObj;
};

const getArt = async function(lang = 'name-EUen'): Promise<Art[]> {
  const response = await axios.get(`${process.env.VUE_APP_API_URL}/art`);
  const artList: ArtApi[] = response.data;
  return artList.map(artItem => createArtItem(artItem, lang));
};

const loadArt = async function(lang = 'name-EUen'): Promise<Art[]> {
  const art = await getArt(lang);
  return art;
};

export const artData = {
  getArt,
  loadArt,
};
