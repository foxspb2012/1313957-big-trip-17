import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventSectionView from '../view/event-section-view.js';
import PointNewPresenter from './point-new-presenter.js';
import PointPresenter from './point-presenter.js';
import NoEventsView from '../view/no-events-view.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import {sortPointsDay, sortPointsTime, sortPointsPrice} from '../utils/sorting.js';
import {filter} from '../utils/filter.js';
import {FilterType, SortType, UpdateType, UserAction} from '../constants.js';

export default class EventsPresenter {

  #eventComponent = new EventSectionView();
  #eventsListComponent = new EventsListView();
  #sortComponent = null;
  #noEventsComponent = null;

  #eventContainer = null;
  #eventModel = null;
  #filterModel = null;

  #eventPresenter = new Map();
  #pointNewPresenter = null;

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  constructor(eventContainer, eventModel, filterModel) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#eventsListComponent.element, this.#handleViewAction);

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch(this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredEvents.sort(sortPointsDay);
      case SortType.TIME:
        return filteredEvents.sort(sortPointsTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortPointsPrice);
    }

    return filteredEvents;
  }

  init = () => {
    this.#renderEventSection();
  };

  createEvent = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventSection();
        this.#renderEventSection();
        break;
      case UpdateType.MAJOR:
        this.#clearEventSection({resetSortType: true});
        this.#renderEventSection();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventSection();
    this.#renderEventSection();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderEvent = (item) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(item);
    this.#eventPresenter.set(item.id, pointPresenter);
  };

  #renderEvents = (events) => {
    events.forEach((event) => this.#renderEvent(event));
  };

  #renderNoEvents = () => {
    this.#noEventsComponent = new NoEventsView(this.#filterType);
    render(this.#noEventsComponent, this.#eventContainer);
  };

  #clearEventSection = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderEventSection = () => {
    const events = this.events;
    const eventCount = events.length;

    render(this.#eventComponent, this.#eventContainer);

    if (eventCount === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    render(this.#eventsListComponent, this.#eventComponent.element);
    this.#renderEvents(events);
  };
}
