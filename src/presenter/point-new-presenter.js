import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../constants.js';
import EventCreateEditView from '../view/event-create-edit-view.js';

export default class PointNewPresenter {
  #eventListContainer = null;
  #changeData = null;
  #eventEditComponent = null;
  #destroyCallback = null;
  #mode = null;
  #newPoint = null;

  constructor(eventListContainer, changeData) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (callback, destinations, offers, mode) => {
    this.#destroyCallback = callback;

    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#mode = mode;
    this.#newPoint = undefined;

    this.#eventEditComponent = new EventCreateEditView(this.#newPoint, destinations, offers, mode);
    this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setDeleteClickHandler(this.#handleCancelClick);

    render(this.#eventEditComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#eventEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#eventEditComponent.shake(resetFormState);
  };

  #handleFormSubmit = (event) => {
    this.#changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event,
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
