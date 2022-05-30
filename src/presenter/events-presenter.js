import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventCreateView from '../view/event-create-view.js';

import {render, RenderPosition} from '../render.js';

export default class EventsPresenter {
  eventsListComponent =  new EventsListView();

  init = (eventContainer, eventModel) => {
    this.eventContainer = eventContainer;
    this.eventModel = eventModel;
    this.eventsList = [...this.eventModel.getEvents()];
    this.newEvent = this.eventModel.getNewEvent(true);

    render(new SortView(), this.eventContainer);

    for (let i=0; i<this.eventsList.length; i++) {
      render(new EventEditView(this.eventsList[i]), this.eventsListComponent.getElement());
    }

    render(new EventCreateView(this.newEvent[0]), this.eventsListComponent.getElement(), RenderPosition.AFTERBEGIN);

    render(this.eventsListComponent, this.eventContainer);
  };
}
