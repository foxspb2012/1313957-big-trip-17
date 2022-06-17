import {getRandomInteger} from '../utils/common.js';
import {EVENT_TYPES, OFFERS_BY_TYPE} from '../constants.js';
import dayjs from 'dayjs';
import {customAlphabet} from 'nanoid';
import {DESTINATIONS} from './destinations.js';

const nanoid = customAlphabet('1234567890',6);


const generateDate = () => dayjs().add(getRandomInteger(-10, 10), 'day');
const generateDateStart = (date) => dayjs(date).add(getRandomInteger(1,6), 'hour').toISOString();
const generateDateTo = (dateStart) => dayjs(dateStart).add(getRandomInteger(10, 240), 'minute').toISOString();

const generateType = () => EVENT_TYPES[getRandomInteger(0, EVENT_TYPES.length - 1)].toLowerCase();
const generatePrice = () => getRandomInteger(10, 100);
const generateOffers = (type) => {
  const offers = [];
  const offerByType = OFFERS_BY_TYPE.filter((item) => item.type === type);
  if(offerByType.length > 0) {
    const randomIndex = getRandomInteger(0, offerByType[0].offers.length);
    for (let i = 0; i < randomIndex; i++) {
      offers.push(offerByType[0].offers[i]);
    }
  }
  return offers;
};

export const generateEventPoints = () => {
  const date = generateDate();
  const dateFrom = generateDateStart(date);
  const dateTo = generateDateTo(dateFrom);
  const type = generateType();

  return {
    'base_price': generatePrice(),
    'date_from': dateFrom,
    'date_to': dateTo,
    destination: DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)],
    id: nanoid(),
    'is_favorite': Boolean(getRandomInteger(0,1)),
    offers: generateOffers(type),
    type,
  };
};

