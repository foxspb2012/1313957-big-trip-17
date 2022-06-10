import PointPresenter from './point-presenter.js';
import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import EventsListView from '../view/events-list-view.js';
import ListEmpty from '../view/list-empty-view.js';
import {render, RenderPosition} from '../framework/render.js';
import {updatePoint} from '../utils/common.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFilterContainer = tripMainElement.querySelector('.trip-controls__filters');

export default class EventsPresenter {

  #tripInfoComponent = new TripInfoView();
  #sortComponent = new SortView();
  #filterComponent = new FilterView();
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
    render(this.#filterComponent, tripFilterContainer);
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
