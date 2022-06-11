import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../constants.js';

const createFilterTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    ${Object.values(FilterType).map((value) =>
    `<div class="trip-filters__filter">
      <input
       id="filter-${value}"
       class="trip-filters__filter-input  visually-hidden"
       type="radio"
       name="trip-filter"
       value="${value}"
       ${value === 'everything' ? 'checked' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${value}">${value}</label>
    </div>`).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
