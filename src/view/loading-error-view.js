import AbstractView from '../framework/view/abstract-view.js';

const createErrorLoadingTemplate = () => '<p class="trip-events__msg">Error loading from server..</p>';

export default class ErrorLoadingView extends AbstractView {
  get template() {
    return createErrorLoadingTemplate();
  }
}
