export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        return result
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  }

  // other methods for working with the API
}
