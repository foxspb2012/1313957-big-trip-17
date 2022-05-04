import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventPointView from '../view/event-point.js';
import EventNewView from '../view/event-new-view.js';
import EventEditView from '../view/event-edit-view.js';

import {render, RenderPosition} from '../render.js';

export default class EventsPresenter {
  eventsListComponent =  new EventsListView();

  init = (eventContainer) => {
    this.eventContainer = eventContainer;

    render(new SortView(), this.eventContainer);

    for (let i=0; i<3; i++) {
      render(new EventPointView(), this.eventsListComponent.getElement());
    }
    render(this.eventsListComponent, this.eventContainer);

    render(new EventNewView(), this.eventsListComponent.getElement());

    render(new EventEditView(), this.eventsListComponent.getElement(), RenderPosition.AFTERBEGIN);
  };
}
