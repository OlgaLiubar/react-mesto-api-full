class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._url}cards/`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }


  uploadCard({name, link}) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  uploadUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

  //аватар
  setUserAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(link)
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._url}cards/${id}/likes`, {
        method: isLiked ? 'PUT' : 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
        .then(this._checkResponse);
    }
  }

const api = new Api({
  url: 'https://api.olgaliubar.students.nomoredomains.monster/',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default api;
