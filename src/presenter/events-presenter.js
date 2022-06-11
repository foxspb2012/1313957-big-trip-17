import PointPresenter from './point-presenter.js';
import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import ListEmpty from '../view/list-empty-view.js';
import {render, RenderPosition} from '../framework/render.js';
import {updatePoint} from '../utils/common.js';
import {sortPointsTime, sortPointsPrice} from '../utils/sorting.js';
import {SortType} from '../constants.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFilterContainer = tripMainElement.querySelector('.trip-controls__filters');

export default class EventsPresenter {

  #tripInfoComponent = new TripInfoView();
  #filterComponent = new FilterView();
  #sortComponent = new SortView();
  #listEmptyComponent = new ListEmpty();
  #eventsListComponent = new EventsListView();

  #eventContainer = null;
  #eventModel = null;
  #eventsList = [];
  #eventPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourceEventPoints = [];

  constructor(eventContainer, eventModel) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#eventsList = [...this.#eventModel.events];
    this.#sourceEventPoints = [...this.#eventModel.events];
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

  #sortPoints = (sortType) => {
    switch(sortType) {
      case SortType.TIME:
        this.#eventsList.sort(sortPointsTime);
        break;
      case SortType.PRICE:
        this.#eventsList.sort(sortPointsPrice);
        break;
      default:
        this.#eventsList = [...this.#sourceEventPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearEventsList();
    this.#renderPoints();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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

  #clearEventsList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  };

  #renderPoints = () =>{
    this.#eventsList.forEach(this.#renderEvent);
  };

  #renderEvents = () => {
    if (!this.#eventsList.length) {
      this.#renderNoEvents();
      return;
    }
    this.#renderTripInfo();
    this.#renderFilter();
    this.#renderSort();
    this.#renderComponentList();
    this.#renderPoints();
  };
}
