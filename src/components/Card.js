export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    template,
    handleLinkClick,
    setLike,
    currentUserId,
    confirm,
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._template = template;
    this._handleLinkClick = handleLinkClick;
    this._setLike = setLike;
    this._ownerId = owner?._id;
    this._currentUserId = currentUserId;
    this._confirm = confirm;
  }
  _card = null
  _cardLikeActiveClass = 'cards__like_active'

  get() {
    if (!this._card) {
      this._set();
    }

    return this._card;
  }

  getId() {
    return this._id;
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
    this._likeCountEl = card.querySelector('.cards__like-count');

    nameEl.textContent = name;
    imageEl.setAttribute('alt', name);
    imageEl.setAttribute('src', link);

    if (this._doIlikeIt()) {
      this._likeEl.classList.toggle(this._cardLikeActiveClass);
    }
    linkEl.addEventListener('click',
      (evt) => this._handleLinkClick(evt, {name, link})
    );
    this._likeEl.addEventListener('click', this._toggleLike);
    this._likeCountEl.textContent = this._renderLikesCount();
    if (this._currentUserId === this._ownerId) {
      trashEl.addEventListener('click', () => this._confirm());
    } else {
      trashEl.remove();
    }

    this._card = card;
  }

  remove = () => {
    this._card.remove();
    this._card = null;
  }

  _toggleLike = () => {
    this._likeEl.classList.toggle(this._cardLikeActiveClass);
    this._setLike();
  }

  _doIlikeIt = () => {
    return this._likes.some(user => user._id === this._currentUserId);
  }

  _renderLikesCount() {
    return this._likes.length ? this._likes.length : '';
  }

}
