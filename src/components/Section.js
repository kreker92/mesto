export default class Section {
  constructor({ items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
    this._wrapperEl = document.querySelector(selector);
  }

  setCurrentUserId(id) {
    this._currentUserId = id;
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

  initItems(items) {
    this._items = items;
  }

  addItem(item) {
    this._wrapperEl.prepend(this._renderer(item, this._currentUserId));
  }
}
