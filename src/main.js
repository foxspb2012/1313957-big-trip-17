import EventsPresenter from './presenter/events-presenter.js';
import EventModel from './model/event-model.js';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import {generateFilter} from './mock/filters.js';
import {render, RenderPosition} from './framework/render.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const eventModel = new EventModel();
const eventPresenter = new EventsPresenter(tripEventsContainer, eventModel);

const filters = generateFilter(eventModel.events);

render(new FilterView(filters), tripFilterElement);
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

eventPresenter.init();
