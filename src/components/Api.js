export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
  }

  /**
   *
   * @returns {Promise} Promise object represents the result of fetching the initial cards from the server
   */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  }
}
