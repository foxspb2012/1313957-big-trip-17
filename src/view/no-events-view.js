import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../constants.js';

const NoEventValues = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createNoEventTemplate = (filterType) => {
  const listEmptyText = NoEventValues[filterType];

  return(
    ` <p class="trip-events__msg">${listEmptyText}</p>`
  );
};

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventTemplate(this.#filterType);
  }
}
