export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popupEl = document.querySelector(this._selector);
    this._class = 'popup';
    this._openedClass = 'popup_opened';
    this._btnCloseClass = 'popup__close';
  }

  _renderLoading(btn) {
    btn.textContent = 'Сохранение...';
  }

  open() {
    this._popupEl.classList.add(this._openedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close = () => {
    this._popupEl.classList.remove(this._openedClass);

    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupEl.addEventListener('click', (evt) => {
      const isOverlay = evt.target.classList.contains(this._class);
      const isCloseBtn = evt.target.classList.contains(this._btnCloseClass)

      if (isOverlay || isCloseBtn) {
        this.close();
      }
    });
  }
}
