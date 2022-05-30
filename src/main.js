import {render} from './render.js';
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventModel from './model/event-model.js';

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const tripMainElement = document.querySelector('.trip-main');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');

const eventModel = new EventModel();
const eventPresenter = new EventsPresenter();

render(new FilterView(), tripFilterElement);

eventPresenter.init(tripEventsElement, eventModel);
