export default class FormValidator {
  constructor(selectors, formEl) {
    this._formEl = formEl;
    this._selectors = selectors;
    this._buttonEl =
      this._formEl.querySelector(this._selectors.submitButtonSelector);
    this._inputList =
      Array.from(this._formEl.querySelectorAll(this._selectors.inputSelector));
  }

  _getErrorEl(inputEl) {
    return this._formEl.querySelector(`.${inputEl.id}-error`);
  }

  _showInputError(inputEl) {
    const errorEl = this._getErrorEl(inputEl);

    errorEl.classList.add(this._selectors.errorClass);
    errorEl.textContent = inputEl.validationMessage;

    inputEl.classList.add(this._selectors.inputErrorClass);
  }

  _hideInputError(inputEl) {
    const errorEl = this._getErrorEl(inputEl);
    errorEl.classList.remove(this._selectors.errorClass);
    errorEl.textContent = '';

    inputEl.classList.remove(this._selectors.inputErrorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  toggleButtonState() {
    const { _buttonEl } = this;

    if (this._inputList.some(inputEl => !inputEl.validity.valid)) {
      _buttonEl.classList.add(this._selectors.inactiveButtonClass);
      _buttonEl.disabled = true;
    } else {
      _buttonEl.classList.remove(this._selectors.inactiveButtonClass);
      _buttonEl.disabled = false;
    }
  }

  _setValidationEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState();
      })
    });
  }

  resetFormValidation = () => {
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }

  enableValidation() {
    this._setValidationEventListeners();
  }
}
