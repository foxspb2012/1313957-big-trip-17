import PointPresenter from './point-presenter.js';
import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import EventsListView from '../view/events-list-view.js';
import ListEmpty from '../view/list-empty-view.js';
import {updatePoint} from '../utils/common.js';
import {generateFilter} from '../mock/filters.js';
import {render, RenderPosition} from '../framework/render.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');

export default class EventsPresenter {

  #tripInfoComponent = new TripInfoView();
  #sortComponent = new SortView();
  #filterComponent = null;
  #listEmptyComponent = new ListEmpty();
  #eventsListComponent = new EventsListView();

  #eventContainer = null;
  #eventModel = null;
  #eventsList = [];
  #eventPresenter = new Map();

  constructor(eventContainer, eventModel) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#eventsList = [...this.#eventModel.events];
    this.#filterComponent = new FilterView(generateFilter(this.#eventsList));
    this.#renderEvents();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#eventsList = updatePoint(this.#eventsList, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #renderTripInfo = () => {
    render(this.#tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventContainer);
  };

  #renderFilter = () => {
    render(this.#filterComponent, tripFilterElement);
  };

  #renderComponentList = () => {
    render(this.#eventsListComponent, this.#eventContainer);
  };

  #renderNoEvents = () => {
    render(this.#listEmptyComponent, this.#eventContainer);
  };

  #renderEvent = (item) => {
    const eventPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(item);
    this.#eventPresenter.set(item.id, eventPresenter);
  };

  #clearEventList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  };

  #renderEvents = () => {
    if (!this.#eventsList.length) {
      this.#renderNoEvents();
      return;
    }
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderFilter();
    this.#renderComponentList();
    this.#eventsList.forEach(this.#renderEvent);
  };
}
