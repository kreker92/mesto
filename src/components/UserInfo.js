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
  }

  get() {
    return {
      name: this._nameEl.textContent,
      about: this._rankEl.textContent,
      avatar: this._avatarEl.src,
    }
  }

  set(data) {
    const { name, about, avatar } = data;

    this._nameEl.textContent = name;
    this._rankEl.textContent = about;
    if (avatar) {
      this._avatarEl.src = avatar;
      this._avatarEl.classList.add('profile__avatar_loaded');
    }
  }
}
