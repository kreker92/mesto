export default class Card {
  constructor({ name, link }, template, handleLinkClick) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._handleLinkClick = handleLinkClick;
  }
  _card = null

  get() {
    if (!this._card) {
      this._set();
    }

    return this._card;
  }

  _set() {
    const name = this._name;
    const link = this._link;

    const card = this._template.querySelector('.cards__card').cloneNode(true);

    const nameEl = card.querySelector('.cards__name');
    const linkEl = card.querySelector('.cards__image-link');
    const imageEl = card.querySelector('.cards__image');
    const trashEl = card.querySelector('.cards__trash');
    this._likeEl = card.querySelector('.cards__like');

    nameEl.textContent = name;
    imageEl.setAttribute('alt', name);
    imageEl.setAttribute('src', link);

    linkEl.addEventListener('click',
      (evt) => this._handleLinkClick(evt, {name, link})
    );
    this._likeEl.addEventListener('click', this._toggleLike);
    trashEl.addEventListener('click', this._remove);

    this._card = card;
  }

  _remove = () => {
    this._card.remove();
    this._card = null;
  }

  _toggleLike = () => {
    this._likeEl.classList.toggle('cards__like_active');
  }

}
