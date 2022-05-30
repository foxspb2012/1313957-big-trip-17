import {getRandomInteger, shuffle} from '../utils.js';
import {OFFERS, CITIES, EVENT_TYPES, DESCRIPTION} from '../constants.js';
import dayjs from 'dayjs';

const generateDate = () => dayjs().add(getRandomInteger(0, 10), 'day');

const generateType = () => EVENT_TYPES[getRandomInteger(0, EVENT_TYPES.length - 1)].toLowerCase();
const generateCity = () => CITIES[getRandomInteger(0, CITIES.length - 1)];
const generatePrice = () => getRandomInteger(10, 100);
const generateOffers = () => {
  const offers = [];
  const randomIndex = getRandomInteger(0, 3);
  for (let i = 0; i <= randomIndex; i++) {
    offers.push(OFFERS[i].id);
  }
  return shuffle(offers);
};

const generateDescription = () => {
  const descriptionPhrase = [];
  const randomIndex = getRandomInteger(0, DESCRIPTION.length-1);
  for (let i = 0; i < randomIndex; i++) {
    descriptionPhrase.push(DESCRIPTION[i]);
  }

  return shuffle(descriptionPhrase).join();
};

const getPicture = () => `https://picsum.photos/248/152?r=${getRandomInteger(100, 10000)}`;

const generatePictures = () => {
  const pictureArray = [];
  const count = getRandomInteger(0, 3);
  if (count > 0) {
    for(let i=0; i < count; i++) {
      const picture = {
        src: getPicture(),
        alt: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length-1)],
      };
      pictureArray.push(picture);
    }
  }

  return  pictureArray;
};

const generateDescriptionDestination = () => ({
  description: generateDescription(),
  name: generateCity(),
  pictures: generatePictures(),
});

const generateId = () => getRandomInteger(0, 1000);

export const generateEventEdit = () => {
  const date = generateDate();

  return {
    'base_price': generatePrice(),
    'date_from': date,
    'date_to': date,
    destination: generateDescriptionDestination(),
    id: generateId(),
    'is_favorite': false,
    offers: generateOffers(),
    type: generateType(),
  };
};

