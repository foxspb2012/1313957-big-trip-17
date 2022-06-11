import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../constants.js';

const createSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((value) =>
    `<div class="trip-sort__item trip-sort__item--${value}">
      <input id="sort-${value}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort"
        value="sort-${value}"
        data-sort-type="${value}"
        ${value === 'day' ? 'checked' : ''}
        ${value === 'event' ? 'disabled' : ''}
        ${value === 'offer' ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${value}" data-sort-type="${value}">${value}</label>
    </div>`)
    .join('')}
  </form>`
);

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'LABEL') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
