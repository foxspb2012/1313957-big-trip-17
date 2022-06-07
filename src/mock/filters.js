import {filter} from '../utils/filter.js';

export const generateFilter = (eventList) => Object.entries(filter).map(
  ([filterName, filterEvents]) => ({
    name: filterName,
    count: filterEvents(eventList).length,
  }),
);
