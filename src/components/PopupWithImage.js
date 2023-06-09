import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupEl = document.querySelector(this._selector);
    this._imageEl = this._popupEl.querySelector('.popup__slide-image');
    this._titleEl = this._popupEl.querySelector('.popup__slide-title');
  }

  open({ name, link }) {
    this._imageEl.setAttribute('alt', name);
    this._imageEl.setAttribute('src', link);
    this._titleEl.textContent = name;
    super.open();
  }
}
