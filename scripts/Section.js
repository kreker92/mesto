export default class Section {
  constructor({ items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
    this._wrapperEl = document.querySelector(selector);
  }

  _clear() {
    this._wrapperEl.innerHTML = '';
  }

  setItems() {
    this._clear();
    this._items.forEach(item => {
      this.addItem(item);
    });
  }

  addItem(item) {
    this._wrapperEl.prepend(this._renderer(item));
  }
}
