import {render, replace, remove} from '../framework/render.js';
import EventCreateEditView from '../view/event-create-edit-view.js';
import EventPointView from '../view/event-point-view.js';
import {Mode} from '../constants.js';

export default class PointPresenter {
  #pointComponent = null;
  #formEditComponent = null;
  #eventListContainer = null;
  #changeData = null;
  #event = null;
  #changeMode = null;
  #mode = Mode.CREATE;

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
      case Mode.CREATE:
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
    if (this.#mode !== Mode.CREATE) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#formEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDIT;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    this.#mode = Mode.CREATE;
  };

  #onEscKeyDownHandler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleRollUpClick = () => {
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = () => {
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#event, 'is_favorite': !this.#event.is_favorite});
  };
}
