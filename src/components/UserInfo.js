export default class UserInfo {
  constructor(
    {
      nameSelector,
      aboutSelector,
      avatarSelector,
    }
  ) {
    this._nameEl = document.querySelector(nameSelector);
    this._rankEl = document.querySelector(aboutSelector);
    this._avatarEl = document.querySelector(avatarSelector);
    this._data = null;
  }

  get() {
    return this._data;
  }

  getId() {
    return this._data?._id;
  }

  set(data) {
    this._data = data;

    const { name, about, avatar } = this._data;
    this._nameEl.textContent = name;
    this._rankEl.textContent = about;
    if (avatar) {
      this._avatarEl.src = avatar;
      this._avatarEl.classList.add('profile__avatar_loaded');
    }
  }
}
