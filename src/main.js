import {render} from './render.js';
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const tripMainElement = document.querySelector('.trip-main');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');
const eventPresenter = new EventsPresenter();

render(new FilterView(), tripFilterElement);

eventPresenter.init(tripEventsElement);
