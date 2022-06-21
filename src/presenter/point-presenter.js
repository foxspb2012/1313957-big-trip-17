import EventPointView from '../view/event-point-view.js';
import EventCreateEditView from '../view/event-create-edit-view.js';
import {Mode, UserAction, UpdateType} from '../constants.js';
import {render, replace, remove} from '../framework/render.js';
import {isDatesEqual} from '../utils/event.js';

export default class PointPresenter {
  #eventListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #formEditComponent = null;

  #event = null;
  #mode = Mode.DEFAULT;

  constructor(eventListContainer, changeData, changeMode) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#event = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#pointComponent = new EventPointView(point);
    this.#formEditComponent = new EventCreateEditView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#formEditComponent.setEditClickHandler(this.#handleRollUpClick);
    this.#formEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this.#pointComponent, this.#eventListContainer);
      return;
    }

    switch (this.#mode) {
      case Mode.DEFAULT:
        replace(this.#pointComponent, prevPointComponent);
        break;
      case Mode.EDIT:
        replace(this.#formEditComponent, prevFormEditComponent);
        break;
      default:
        throw new Error('Mode undefined');
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#formEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#formEditComponent.reset(this.#event);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    this.#changeMode();
    this.#mode = Mode.EDIT;
    replace(this.#formEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    this.#mode = Mode.DEFAULT;
    replace(this.#pointComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #onEscKeyDownHandler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#formEditComponent.reset(this.#event);
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleRollUpClick = () => {
    this.#formEditComponent.reset(this.#event);
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#event.date_to, update.date_to) ||
      !isDatesEqual(this.#event.date_from, update.date_from);

    this.#changeData(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = (event) => {
    this.#changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      {...this.#event, 'is_favorite': !this.#event.is_favorite},
    );
  };
}
