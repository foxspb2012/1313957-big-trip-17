const COUNT_POINTS = 20;

const OFFERS = [
  {
    'id': 1,
    'title': 'Order Uber',
    'price': 20,
  },
  {
    'id': 2,
    'title': 'Add luggage',
    'price': 50,
  },
  {
    'id': 3,
    'title': 'Switch to comfort',
    'price': 80,
  },
  {
    'id': 4,
    'title': 'Rent a car',
    'price': 200,
  },
  {
    'id': 5,
    'title': 'Add breakfast',
    'price': 50,
  },
  {
    'id': 6,
    'title': 'Book tickets',
    'price': 40,
  },
  {
    'id': 7,
    'title': 'Lunch in city',
    'price': 70,
  },
];

const OFFERS_BY_TYPE = [
  {
    'type': 'taxi',
    'offers': [1,4],
  },
  {
    'type': 'bus',
    'offers': [3,4,6],
  },
  {
    'type': 'train',
    'offers': [2,3,6],
  },
  {
    'type': 'drive',
    'offers': [1,4],
  },
  {
    'type': 'flight',
    'offers': [2,3,4],
  },
  {
    'type': 'check-in',
    'offers': [5,7],
  },
  {
    'type': 'sightseeing',
    'offers': [6,7],
  },
];

const CITIES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'Rome',
  'Saint-Petersburg',
];

const EVENT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
  DEFAULT: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export {
  COUNT_POINTS,
  OFFERS,
  OFFERS_BY_TYPE,
  CITIES,
  EVENT_TYPES,
  Mode,
  FilterType,
  SortType,
  UpdateType,
  UserAction,
};
