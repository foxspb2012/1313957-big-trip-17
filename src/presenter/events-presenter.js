import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import PointNewPresenter from './point-new-presenter.js';
import PointPresenter from './point-presenter.js';
import NoEventsView from '../view/no-events-view.js';
import LoadingView from '../view/loading-view.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import {sortPointsDay, sortPointsTime, sortPointsPrice} from '../utils/sorting.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {FilterType, SortType, UpdateType, UserAction, TimeLimit, Mode} from '../constants.js';
import {filter} from '../utils/filter.js';

export default class EventsPresenter {

  #eventContainer = null;
  #eventModel = null;
  #filterModel = null;

  #loadingComponent = new LoadingView();
  #eventsListComponent = new EventsListView();
  #eventPresenter = new Map();
  #sortComponent = null;
  #noEventsComponent = null;
  #pointNewPresenter = null;

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(eventContainer, eventModel, filterModel) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#eventsListComponent.element, this.#handleViewAction);

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#eventModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch(this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints.sort(sortPointsDay);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsPrice);
    }

    return filteredPoints;
  }

  get offers() {
    return this.#eventModel.offers;
  }

  get destinations() {
    return this.#eventModel.destinations;
  }

  init = () => {
    this.#renderEventSection();
  };

  createEvent = (callback, destinations, offers) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback, destinations, offers, Mode.DEFAULT);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch(actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenter.get(update.id).setSaving();
        try {
          await this.#eventModel.updateEvent(updateType, update);
        } catch {
          this.#eventPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#eventModel.addEvent(updateType, update);
        } catch {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenter.get(update.id).setDeleting();
        try {
          await this.#eventModel.deleteEvent(updateType, update);
        } catch {
          this.#eventPresenter.get(update.id).setAborting();
        }
        break;
      default:
        throw new Error(`actionType: ${actionType} not exist`);
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UpdateType.MINOR:
        this.#clearEventSection();
        this.#renderEventSection();
        break;
      case UpdateType.MAJOR:
        this.#clearEventSection({resetSortType: true});
        this.#renderEventSection();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEventSection();
        break;
      default:
        throw new Error('updateType not exist');
    }
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
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

    render(this.#sortComponent, this.#eventContainer, RenderPosition.AFTERBEGIN);
  };

  #renderEvent = (item, destinations, offers) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(item, destinations, offers);
    this.#eventPresenter.set(item.id, pointPresenter);
  };

  #renderEventSection = () => {
    render(this.#eventsListComponent, this.#eventContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.points.length) {
      this.#noEventsComponent = new NoEventsView(this.#filterType);
      render(this.#noEventsComponent, this.#eventContainer);
      return;
    }

    this.#renderSort();
    this.points.forEach((item) => this.#renderEvent(item, this.destinations, this.offers));
    this.points.sort(sortPointsDay);
  };

  #clearEventSection = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };
}
