import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._form = this._popupEl.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit',
      (evt) => {
        const btnSubmit = evt.target.querySelector('button[type="submit"]');
        const btnSubmitText = btnSubmit.textContent;
        this._renderLoading(btnSubmit);
        this._handleSubmit(
          evt,
          this._getInputValues(),
          () => {
            btnSubmit.textContent = btnSubmitText;
          },
        );
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
