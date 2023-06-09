import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit, /* { handleSubmit, form, validation, inputNames } */) {
    super(selector);
    this._popupEl = document.querySelector(this._selector);
    this._handleSubmit = handleSubmit;
    /* this._form = form;
    this._validation = validation;
    this._inputNames = inputNames; */
    this._form = this._popupEl.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit',
      (evt) => {
        this._handleSubmit(
          evt,
          /* this._form,
          this._validation, */
          this._getInputValues(),
        );
        this.close();
      }
    );
  }

  _getInputValues = () => {
    return Object.fromEntries(
      Array.from(this._inputList).map((input) => [
        input.name,
        input.value,
      ])
    );
  }
}
