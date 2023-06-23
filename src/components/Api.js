export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._userUrl = options.userUrl;
    this.headers = options.headers;
  }

  getInitialCards(urlPostfix) {
    return this._fetch(`${this._baseUrl}/${urlPostfix}`)
      .catch(() => []);
  }

  addCard(urlPostfix, body) {
    return this._fetch(`${this._baseUrl}/${urlPostfix}`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .catch(() => ({}));
  }

  delCard(urlPostfix) {
    return this._fetch(`${this._baseUrl}/${urlPostfix}`, {
      method: 'DELETE',
    })
      .catch(() => {});
  }

  setLike(urlPostfix, likeFetchParams) {
    return this._fetch(`${this._baseUrl}/${urlPostfix}`, likeFetchParams)
      .catch(() => []);
  }

  getUserInfo() {
    return this._fetch(this._userUrl)
      .catch(() => {});
  }

  setUserInfo(body, urlPostfix) {
    return this._fetch(
      urlPostfix ? `${this._baseUrl}/${urlPostfix}` : this._userUrl,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
      }
    ).catch((err) => {
      return {};
    });
  }

  _fetch = (url, customFetchParams = {}) => {
    const fetchParams = {
      headers: this.headers,
      ...customFetchParams,
    };
    // console.log('fetchParams', fetchParams);
    return fetch(url, fetchParams)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        // console.log(url, 'res', res);
        return res;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        return Promise.reject();
      });
  };
}


