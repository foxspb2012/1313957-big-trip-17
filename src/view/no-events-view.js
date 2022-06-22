import AbstractView from '../framework/view/abstract-view.js';
import {NoEventValues} from '../constants.js';

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
