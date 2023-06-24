export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._userUrl = options.userUrl;
    this.headers = options.headers;
  }

  getInitialCards(urlPostfix) {
    return this._fetch(`${this._baseUrl}/${urlPostfix}`)
  }

  addCard(urlPostfix, body) {
    return this._fetch(`${this._baseUrl}/${urlPostfix}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  delCard(urlPostfix) {
    return this._fetch(`${this._baseUrl}/${urlPostfix}`, {
      method: 'DELETE',
    });
  }

  setLike(urlPostfix, likeFetchParams) {
    return this._fetch(`${this._baseUrl}/${urlPostfix}`, likeFetchParams);
  }

  getUserInfo() {
    return this._fetch(this._userUrl);
  }

  setUserInfo(body, urlPostfix) {
    return this._fetch(
      urlPostfix ? `${this._baseUrl}/${urlPostfix}` : this._userUrl,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
      }
    );
  }

  _fetch = (url, customFetchParams = {}) => {
    const fetchParams = {
      headers: this.headers,
      ...customFetchParams,
    };

    return fetch(url, fetchParams)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  };
}


