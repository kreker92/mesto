import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, { name, link }) {
    super(selector);
    this._popupEl = document.querySelector(this._selector);
    this._name = name;
    this._link = link;
    this._imageEl = this._popupEl.querySelector('.popup__slide-image');
    this._titleEl = this._popupEl.querySelector('.popup__slide-title');
  }

  open() {
    super.open();
    this._imageEl.setAttribute('alt', this._name);
    this._imageEl.setAttribute('src', this._link);
    this._titleEl.textContent = this._name;
  }
}
