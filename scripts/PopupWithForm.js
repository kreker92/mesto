import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, { handleSubmit, form, validation, inputNames }) {
    super(selector);
    this._popupEl = document.querySelector(this._selector);
    this._handleSubmit = handleSubmit;
    this._form = form;
    this._validation = validation;
    this._inputNames = inputNames;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit',
      (evt) => {
        this._handleSubmit(
          evt,
          this._form,
          this._validation,
          this._getInputValues(),
        );
        this.close();
      }
    );
  }

  _getInputValues = () => {
    return Object.fromEntries(
      this._inputNames.map((name) => [
        name,
        this._form.elements[name].value
      ])
    );
  }

  close() {
    super.close();
  }
}
