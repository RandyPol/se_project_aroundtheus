export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  /**
   *
   * @returns {Promise} Promise object represents the result of fetching the initial cards from the server
   */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  /**
   *
   * @returns {Promise} Promise object represents the result of fetching the user info from the server
   */
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  /**
   *
   * @returns {Promise} Promise object represents the result of fetching the user info and the initial cards from the server using Promise.all
   */
  loadData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  /**
   *
   * @param {} data user info to be updated
   * @returns The update user info from the server
   */
  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  /**
   *
   * @param {*} data card info to be posted
   * @returns
   */
  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  /**
   *
   * @param {*} cardId card id to be deleted
   * @returns
   */
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  /**
   *
   * @param {*} cardId card id to be liked
   * @returns
   */
  putCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  deleteCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  /**
   *
   * @param {*} data avatar info to be updated
   * @retuns The updated avatar info from the server
   */
  patchUserAvatar(data) {
    console.log(`In api call ${JSON.stringify(data, null, 2)}`)
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
  }
}
