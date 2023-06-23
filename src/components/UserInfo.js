export default class UserInfo {
  constructor(
    {
      nameSelector,
      aboutSelector,
      avatarSelector,
    },
    api,
    url
  ) {
    this._nameEl = document.querySelector(nameSelector);
    this._rankEl = document.querySelector(aboutSelector);
    this._avatarEl = document.querySelector(avatarSelector);
    this._data = null;
    this._api = api;
    this._url = url;
  }

  get() {
    if (this._data) {
      return this._data;
    } else {
      return this._api.getUserInfo(this._url)
      .then(res => {
        this._data = res
        return this._data;
      });
    }
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
