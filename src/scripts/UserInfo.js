export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
    this._nameEl = document.querySelector(this._nameSelector);
    this._rankEl = document.querySelector(this._infoSelector);
  }

  getUserInfo() {
    return {
      name: this._nameEl.textContent,
      rank: this._rankEl.textContent,
    };
  }

  setUserInfo({name, rank}) {
    this._nameEl.textContent = name;
    this._rankEl.textContent = rank;
  }
}
